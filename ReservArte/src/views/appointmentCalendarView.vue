<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import c_heroBanner from '../components/c_heroBanner.vue'
import CAppointmentCalendar from '../components/c_appointmentCalendar.vue'
import c_employeeAvailability from '../components/c_employeeAvailability.vue'
import CSelectField from '../components/c_selectField.vue'
import type { EmployeeWithSlots } from '../components/c_employeeAvailability.vue'
import type { SelectOption } from '../components/c_selectField.vue'
import type { AppointmentDetail } from '../stores/appointment.store'
import { useViewportSize } from '../composables/useViewportSize'
import { useAgendaAvailability } from '../composables/useAgendaAvailability'
import { useCustomerStore } from '../stores/customer.store'
import { useAuthStore } from '../stores/auth.store'
import { useAppointmentStore } from '../stores/appointment.store'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const { size } = useViewportSize()
const authStore = useAuthStore()
const customerStore = useCustomerStore()
const appointmentStore = useAppointmentStore()

/** Id de cita a editar cuando se llega desde "Modificar" en c_bookingAssigned */
const editAppointmentId = computed(() => {
  const q = route.query.edit
  return typeof q === 'string' && q.trim() !== '' ? q.trim() : undefined
})

/** Cita cargada en modo edición (solo cuando query edit está presente) */
const appointmentToEdit = ref<AppointmentDetail | null>(null)

/** Fecha seleccionada; por defecto hoy al cargar la pantalla */
const selectedDate = ref<Date | null>(new Date())

/** Cliente seleccionado en el desplegable (solo admin/empleado). */
const selectedCustomerId = ref('')

/** Opcional: fechas disponibles (ej. desde API). Vacío = todos los días seleccionables. */
const availableDates = ref<Date[]>([])

/** Si el usuario es admin o empleado, ver desplegable de clientes. */
const showCustomerDropdown = computed(() => authStore.showAdminArea)

/** Clientes activos (no bloqueados) para el desplegable. */
const activeCustomers = computed(() =>
  customerStore.customers.filter((c) => {
    const b = (c as { isBlocked?: boolean; IsBlocked?: boolean }).isBlocked
      ?? (c as { isBlocked?: boolean; IsBlocked?: boolean }).IsBlocked
    return b !== true
  })
)

/** Opciones del select: label = fullName, value = id. */
const customerSelectOptions = computed<SelectOption[]>(() =>
  activeCustomers.value.map((c) => {
    const raw = c as { id: number; fullName?: string; FullName?: string }
    const name = raw.fullName ?? raw.FullName ?? String(raw.id)
    return { label: name, value: String(raw.id) }
  })
)

const { employeesWithSlots, loading: loadingAgenda, error: agendaError } = useAgendaAvailability(
  () => selectedDate.value,
  { serviceId: 1 }
)

async function loadAppointmentToEdit(id: string) {
  const detail = await appointmentStore.fetchAppointment(id)
  appointmentToEdit.value = detail ?? null
  if (detail?.appointmentDate) {
    selectedDate.value = new Date(`${detail.appointmentDate}T12:00:00`)
  }
}

onMounted(() => {
  if (showCustomerDropdown.value && customerStore.customers.length === 0) {
    customerStore.fetchCustomers()
  }
  if (editAppointmentId.value) {
    loadAppointmentToEdit(editAppointmentId.value)
  }
})

watch(
  () => route.query.edit,
  (editId) => {
    if (typeof editId === 'string' && editId.trim()) {
      loadAppointmentToEdit(editId.trim())
    } else {
      appointmentToEdit.value = null
    }
  }
)

function goBack() {
  router.push({ name: 'booking' })
}

/** Convierte "10:00" o "10:00:00" a "10:00:00". */
function toTimeSeconds(time: string): string {
  const parts = time.trim().split(':')
  const h = parts[0] ?? '00'
  const m = parts[1] ?? '00'
  const s = parts[2] ?? '00'
  return `${h.padStart(2, '0')}:${m.padStart(2, '0')}:${s.padStart(2, '0')}`
}

/** Suma minutos a una hora "HH:mm:ss" y devuelve "HH:mm:ss". */
function addMinutesToTime(timeStr: string, minutes: number): string {
  const parts = timeStr.trim().split(':').map(Number)
  const h = parts[0] ?? 0
  const m = parts[1] ?? 0
  const date = new Date(2000, 0, 1, h, m, 0)
  date.setMinutes(date.getMinutes() + minutes)
  return date.toTimeString().slice(0, 8)
}

/** Construye el body para PUT /api/Appointment/:id a partir del detalle y la nueva fecha/hora (y opcionalmente empleado). */
function buildUpdateBody(
  detail: AppointmentDetail,
  appointmentDate: string,
  startTime: string,
  employeeId?: number,
  employeeName?: string
): AppointmentDetail {
  const totalMinutes = detail.services?.reduce((acc, s) => acc + (s.durationMinutes ?? 0), 0) ?? 30
  const endTime = addMinutesToTime(startTime, totalMinutes)
  const body: AppointmentDetail = {
    ...detail,
    appointmentDate,
    startTime,
    endTime,
  }
  if (employeeId != null) body.employeeId = employeeId
  if (employeeName != null) body.employeeName = employeeName
  return body
}

async function onSelectSlot(payload: { employee: EmployeeWithSlots; time: string }) {
  appointmentStore.error = ''
  const date = selectedDate.value
  if (!date) return

  const dateStr = date.toISOString().slice(0, 10)
  const startTime = toTimeSeconds(payload.time)
  const employeeId = Number(payload.employee.id)
  if (Number.isNaN(employeeId)) return

  // Modo edición: llegamos desde "Modificar" con una cita existente → PUT
  if (editAppointmentId.value) {
    if (!appointmentToEdit.value) {
      appointmentStore.error = t('appointment.loading') || 'Cargando cita...'
      return
    }
    const empId = Number(payload.employee.id)
    const empName = typeof payload.employee.name === 'string' ? payload.employee.name : undefined
    const body = buildUpdateBody(
      appointmentToEdit.value,
      dateStr,
      startTime,
      Number.isNaN(empId) ? undefined : empId,
      empName
    )
    const updated = await appointmentStore.updateAppointment(editAppointmentId.value, body)
    if (updated) {
      router.push({ name: 'booking' })
    }
    return
  }


  // Modo creación: POST nueva cita
  let customerId: number
  if (showCustomerDropdown.value) {
    const id = selectedCustomerId.value
    if (!id) {
      appointmentStore.error = t('appointment.selectCustomer')
      return
    }
    customerId = Number(id)
    if (Number.isNaN(customerId)) return
  } else {
    const userId = authStore.user?.id
    if (!userId) {
      appointmentStore.error = t('appointment.errors.noSession')
      return
    }
    customerId = Number(userId)
    if (Number.isNaN(customerId)) return
  }

  const created = await appointmentStore.createAppointment({
    customerId,
    employeeId,
    appointmentDate: dateStr,
    startTime,
    services: [{ serviceId: 1 }],
    paymentMethodId: 0,
    notes: '',
  })

  if (created) {
    router.push({ name: 'booking' })
  }
}
</script>

<script lang="ts">
export default {
  name: 'AppointmentCalendarView',
}
</script>

<template>
  <div class="appointmentCalendarView">
    <c_heroBanner
      :title="t('calendar.title')"
      :size="size"
      :show-new-button="false"
      :show-search-bar="false"
      @back="goBack"
    />
    <section
      v-if="showCustomerDropdown"
      class="appointmentCalendarView__customer-wrap"
    >
      <CSelectField
        v-model="selectedCustomerId"
        :label="t('appointment.customer')"
        :options="customerSelectOptions"
        :disabled="customerSelectOptions.length === 0"
        :size="size === 'XS' || size === 'SM' ? 'XS' : 'MD'"
      />
    </section>
    <CAppointmentCalendar
      v-model="selectedDate"
      :available-dates="availableDates"
      :size="size"
    />
    <p
      v-if="agendaError || appointmentStore.error"
      class="appointmentCalendarView__error"
      role="alert"
    >
      {{ agendaError || appointmentStore.error }}
    </p>
    <c_employeeAvailability
      v-else-if="selectedDate && !loadingAgenda && employeesWithSlots.length > 0"
      :employees="employeesWithSlots"
      :size="size"
      @select-slot="onSelectSlot"
    />
    <p
      v-else-if="selectedDate && !loadingAgenda && employeesWithSlots.length === 0"
      class="appointmentCalendarView__empty"
    >
      {{ t('calendar.unavailable') }}
    </p>
    <p
      v-else-if="selectedDate && loadingAgenda"
      class="appointmentCalendarView__loading"
    >
      {{ t('appointment.loading') }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.appointmentCalendarView {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0 16px;
}

.appointmentCalendarView__customer-wrap {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 16px;
  box-sizing: border-box;
}

.appointmentCalendarView__error {
  color: #c00;
  margin: 16px;
}

.appointmentCalendarView__empty,
.appointmentCalendarView__loading {
  margin: 16px;
  color: #666;
}
</style>
