<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import CAppointmentDetailManagement from '../components/c_appointmentDetailManagement.vue'
import type { CreateAppointmentFormState } from '../components/c_appointmentDetailManagement.vue'
import type { CreateAppointmentPayload } from '../stores/appointment.store'
import type { AppointmentDetail } from '../stores/appointment.store'
import { useAppointmentStore } from '../stores/appointment.store'
import { useCustomerStore } from '../stores/customer.store'
import { useEmployeeStore } from '../stores/employee.store'
import { useServiceStore } from '../stores/service.store'
import { useViewportSize } from '../composables/useViewportSize'
import i18n from '../i18n'

const router = useRouter()
const route = useRoute()
const appointmentStore = useAppointmentStore()
const customerStore = useCustomerStore()
const employeeStore = useEmployeeStore()
const serviceStore = useServiceStore()
const { t } = useI18n()
const { size } = useViewportSize()

const bookingId = computed(() => {
  const id = route.params.id
  if (id === undefined || id === 'new' || id === '') return undefined
  return String(id)
})

const isEditMode = computed(() => !!bookingId.value)

const createForm = ref<CreateAppointmentFormState>({
  customerId: '',
  employeeId: '',
  appointmentDate: '',
  startTime: '',
  serviceIds: [''],
  paymentMethodId: '1',
  notes: '',
})

const detail = ref<AppointmentDetail | null>(null)
const loading = ref(false)
const error = ref('')

const customerOptions = computed(() =>
  customerStore.customers.map((c) => ({ label: c.fullName, value: String(c.id) }))
)
const employeeOptions = computed(() =>
  employeeStore.employees.map((e) => ({ label: e.fullName, value: String(e.id) }))
)
const serviceOptions = computed(() =>
  serviceStore.services.map((s) => ({ id: s.id, name: s.name }))
)

const statusOptions = [
  { value: 'pending', labelKey: 'appointment.statusPending' },
  { value: 'confirmed', labelKey: 'appointment.statusConfirmed' },
  { value: 'in_progress', labelKey: 'appointment.statusInProgress' },
  { value: 'completed', labelKey: 'appointment.statusCompleted' },
  { value: 'cancelled', labelKey: 'appointment.statusCancelled' },
  { value: 'cancelled_by_customer', labelKey: 'appointment.statusCancelledByCustomer' },
  { value: 'cancelled_by_business', labelKey: 'appointment.statusCancelledByBusiness' },
  { value: 'no_show', labelKey: 'appointment.statusNoShow' },
]

/** Asegura tiempo en formato HH:mm:ss */
function normalizeTime(value: string): string {
  if (!value || !value.trim()) return '00:00:00'
  const parts = value.trim().split(':')
  if (parts.length >= 3) return value.trim()
  if (parts.length === 2) return `${parts[0]}:${parts[1]}:00`
  return `${parts[0] || '00'}:00:00`
}

async function loadAppointment(id: string) {
  loading.value = true
  error.value = ''
  const result = await appointmentStore.fetchAppointment(id)
  detail.value = result
  if (!result) {
    error.value = appointmentStore.error || i18n.global.t('appointment.errors.loadOneFailed')
  }
  loading.value = false
}

function resetCreateForm() {
  createForm.value = {
    customerId: '',
    employeeId: '',
    appointmentDate: '',
    startTime: '',
    serviceIds: [''],
    paymentMethodId: '1',
    notes: '',
  }
  error.value = ''
}

onMounted(() => {
  customerStore.fetchCustomers()
  employeeStore.fetchEmployees()
  serviceStore.fetchServices()
  if (bookingId.value) {
    loadAppointment(bookingId.value)
  } else {
    resetCreateForm()
  }
})

watch(bookingId, (id) => {
  if (id) {
    loadAppointment(id)
  } else {
    detail.value = null
    resetCreateForm()
  }
})

const pageTitle = computed(() =>
  isEditMode.value ? t('admin.editBooking') : t('admin.newBooking')
)

function onBack() {
  router.push({ name: 'admin-bookings' })
}

async function onDelete() {
  if (!bookingId.value) return
  console.log(t('appointment.deleteConfirm'))
  const ok = await appointmentStore.deleteAppointment(bookingId.value)
  if (ok) {
    router.push({ name: 'admin-bookings' })
  } else {
    error.value = appointmentStore.error || i18n.global.t('appointment.errors.deleteFailed')
  }
}

function buildCreatePayload(): CreateAppointmentPayload | null {
  const f = createForm.value
  const customerId = f.customerId ? parseInt(f.customerId, 10) : NaN
  const employeeId = f.employeeId ? parseInt(f.employeeId, 10) : NaN
  const serviceIds = f.serviceIds
    .map((s) => (s ? parseInt(s, 10) : NaN))
    .filter((n) => !Number.isNaN(n))
  if (!f.appointmentDate.trim()) {
    error.value = t('form.datePlaceholder') || 'Indique la fecha'
    return null
  }
  if (!f.startTime.trim()) {
    error.value = t('appointment.startTime') || 'Indique la hora de inicio'
    return null
  }
  if (Number.isNaN(customerId) || customerId <= 0) {
    error.value = t('appointment.selectCustomer') || 'Seleccione un cliente'
    return null
  }
  if (Number.isNaN(employeeId) || employeeId <= 0) {
    error.value = t('appointment.selectEmployee') || 'Seleccione un empleado'
    return null
  }
  if (serviceIds.length === 0) {
    error.value = t('appointment.selectService') || 'Seleccione al menos un servicio'
    return null
  }
  return {
    customerId,
    employeeId,
    appointmentDate: f.appointmentDate.trim(),
    startTime: normalizeTime(f.startTime),
    services: serviceIds.map((serviceId) => ({ serviceId, serviceVariationId: null })),
    paymentMethodId: f.paymentMethodId ? parseInt(f.paymentMethodId, 10) || null : null,
    notes: f.notes.trim() || null,
  }
}

async function onSave() {
  error.value = ''
  if (isEditMode.value && detail.value && bookingId.value) {
    const updated = await appointmentStore.updateAppointment(bookingId.value, detail.value)
    if (updated) {
      detail.value = updated
      router.push({ name: 'admin-bookings' })
    } else {
      error.value = appointmentStore.error || i18n.global.t('appointment.errors.saveFailed')
    }
    return
  }
  const payload = buildCreatePayload()
  if (!payload) return
  const created = await appointmentStore.createAppointment(payload)
  if (created) {
    router.push({ name: 'admin-bookings' })
  } else {
    error.value = appointmentStore.error || i18n.global.t('appointment.errors.saveFailed')
  }
}

function onCancel() {
  router.push({ name: 'admin-bookings' })
}

function onUpdateCreateForm(data: CreateAppointmentFormState) {
  createForm.value = data
}

function onUpdateDetail(data: AppointmentDetail) {
  detail.value = data
}
</script>

<script lang="ts">
export default {
  name: 'AppointmentDetailView',
}
</script>

<template>
  <div class="appointment-detail-view">
    <p v-if="error" class="appointment-detail-view__error">{{ error }}</p>
    <CAppointmentDetailManagement
      v-else-if="!isEditMode || detail"
      :size="size"
      :title="pageTitle"
      :is-edit-mode="isEditMode"
      :create-form="isEditMode ? undefined : createForm"
      :detail="isEditMode ? detail : undefined"
      :customer-options="customerOptions"
      :employee-options="employeeOptions"
      :service-options="serviceOptions"
      :status-options="statusOptions"
      :show-delete-button="isEditMode"
      @back="onBack"
      @delete="onDelete"
      @update:create-form="onUpdateCreateForm"
      @update:detail="onUpdateDetail"
      @save="onSave"
      @cancel="onCancel"
    />
    <p v-else-if="loading" class="appointment-detail-view__loading">{{ t('appointment.loading') }}</p>
  </div>
</template>

<style scoped>
.appointment-detail-view {
  width: 100%;
  position: relative;
}

.appointment-detail-view__error {
  color: #b71c1c;
  padding: 1rem;
  margin: 0;
}

.appointment-detail-view__loading {
  margin: 1rem 0;
  color: #666;
}
</style>
