<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import c_heroBanner from '../components/c_heroBanner.vue'
import CAppointmentCalendar from '../components/c_appointmentCalendar.vue'
import c_employeeAvailability from '../components/c_employeeAvailability.vue'
import CSelectField from '../components/c_selectField.vue'
import type { EmployeeWithSlots } from '../components/c_employeeAvailability.vue'
import type { SelectOption } from '../components/c_selectField.vue'
import { useViewportSize } from '../composables/useViewportSize'
import { useAgendaAvailability } from '../composables/useAgendaAvailability'
import { useEmployeeStore } from '../stores/employee.store'
import { useCustomerStore } from '../stores/customer.store'
import { useAuthStore } from '../stores/auth.store'
import { useAppointmentStore } from '../stores/appointment.store'

const router = useRouter()
const { t } = useI18n()
const { size } = useViewportSize()
const authStore = useAuthStore()
const employeeStore = useEmployeeStore()
const customerStore = useCustomerStore()
const appointmentStore = useAppointmentStore()
const selectedDate = ref<Date | null>(null)

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
  () => employeeStore.items
)

onMounted(() => {
  if (employeeStore.employees.length === 0) {
    employeeStore.fetchEmployees()
  }
  if (showCustomerDropdown.value && customerStore.customers.length === 0) {
    customerStore.fetchCustomers()
  }
})

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

async function onSelectSlot(payload: { employee: EmployeeWithSlots; time: string }) {
  appointmentStore.error = ''
  const date = selectedDate.value
  if (!date) return

  const dateStr = date.toISOString().slice(0, 10)
  const employeeId = Number(payload.employee.id)
  if (Number.isNaN(employeeId)) return

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
    startTime: toTimeSeconds(payload.time),
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
