import { ref, watch } from 'vue'
import { useAuthStore } from '../stores/auth.store'
import type { EmployeeWithSlots } from '../components/c_employeeAvailability.vue'

const SLOTS_API_URL = '/api/Appointment/slots'

/** Slot devuelto por GET /api/Appointment/slots (por empleado) */
interface SlotItem {
  startTime: string
  endTime: string
}

/** Empleado con slots en la respuesta de GET /api/Appointment/slots */
interface EmployeeSlotsFromApi {
  employeeId: number
  employeeName: string
  slots: SlotItem[]
}

/** Respuesta de GET /api/Appointment/slots */
interface SlotsApiResponse {
  date: string
  serviceId: number
  serviceName?: string
  durationMinutes?: number
  employeeSlots: EmployeeSlotsFromApi[]
  totalSlotsAvailable?: number
}

export interface UseAgendaAvailabilityOptions {
  /** ID del servicio para filtrar slots (por defecto 1) */
  serviceId?: number
}

/**
 * Obtiene los tramos disponibles por empleado para una fecha mediante
 * GET /api/Appointment/slots?Date=...&ServiceId=... (una sola petición).
 */
export function useAgendaAvailability(
  selectedDate: () => Date | null,
  options: UseAgendaAvailabilityOptions = {}
) {
  const { serviceId = 1 } = options
  const authStore = useAuthStore()
  const employeesWithSlots = ref<EmployeeWithSlots[]>([])
  const loading = ref(false)
  const error = ref('')

  async function fetchAvailability() {
    const date = selectedDate()
    if (!date) {
      employeesWithSlots.value = []
      return
    }

    const token = authStore.token
    if (!token) {
      error.value = 'No hay sesión'
      employeesWithSlots.value = []
      return
    }

    const dateStr = date.toISOString().slice(0, 10)
    loading.value = true
    error.value = ''

    try {
      const url = `${SLOTS_API_URL}?Date=${encodeURIComponent(dateStr)}&ServiceId=${serviceId}`
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        error.value = `Error ${response.status}`
        employeesWithSlots.value = []
        return
      }

      const data = (await response.json()) as SlotsApiResponse
      const employeeSlots = data.employeeSlots ?? []

      employeesWithSlots.value = employeeSlots.map((emp) => ({
        id: emp.employeeId,
        name: emp.employeeName,
        slots: emp.slots.map((s) => s.startTime.slice(0, 5)),
      }))
    } catch {
      error.value = 'Error de conexión'
      employeesWithSlots.value = []
    } finally {
      loading.value = false
    }
  }

  watch(
    () => ({
      dateStr: selectedDate()?.toISOString().slice(0, 10) ?? null,
      serviceId,
    }),
    ({ dateStr }) => {
      if (!dateStr) {
        employeesWithSlots.value = []
        return
      }
      fetchAvailability()
    },
    { immediate: true }
  )

  return { employeesWithSlots, loading, error, refetch: fetchAvailability }
}
