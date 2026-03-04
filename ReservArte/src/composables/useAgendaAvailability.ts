import { ref, watch } from 'vue'
import { useAuthStore } from '../stores/auth.store'
import type { EmployeeWithSlots } from '../components/c_employeeAvailability.vue'

const AGENDA_API_URL = '/api/Appointment/agenda'

/** Horario de trabajo y duración de slot para calcular disponibilidad */
const WORK_START_MINUTES = 9 * 60 // 09:00
const WORK_END_MINUTES = 18 * 60 // 18:00
const SLOT_DURATION_MINUTES = 45

/** Respuesta del endpoint GET /api/Appointment/agenda */
interface AgendaAppointment {
  id: number
  appointmentDate: string
  startTime: string
  endTime: string
  employeeId: number
  employeeName: string
  [key: string]: unknown
}

interface AgendaDay {
  date: string
  appointments: AgendaAppointment[]
}

interface AgendaResponse {
  startDate: string
  endDate: string
  days: AgendaDay[]
}

/** Convierte "HH:mm:ss" o "HH:mm" a minutos desde medianoche */
function timeToMinutes(time: string): number {
  const parts = time.trim().split(':')
  const h = parseInt(parts[0] ?? '0', 10)
  const m = parseInt(parts[1] ?? '0', 10)
  return h * 60 + m
}

/** Genera slots libres en el rango [workStart, workEnd) restando los bloques ocupados. Formato "HH:mm". */
function computeAvailableSlots(busyBlocks: { start: number; end: number }[]): string[] {
  const slots: string[] = []
  for (let slotStart = WORK_START_MINUTES; slotStart + SLOT_DURATION_MINUTES <= WORK_END_MINUTES; slotStart += SLOT_DURATION_MINUTES) {
    const slotEnd = slotStart + SLOT_DURATION_MINUTES
    const overlaps = busyBlocks.some(
      (b) => slotStart < b.end && slotEnd > b.start
    )
    if (!overlaps) {
      const h = Math.floor(slotStart / 60)
      const m = slotStart % 60
      slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`)
    }
  }
  return slots
}

export interface AgendaEmployeeInput {
  id: string | number
  name: string
}

/**
 * Obtiene los tramos disponibles por empleado para una fecha llamando al endpoint de agenda
 * y calculando huecos libres (horario 09:00–18:00, slots de 45 min).
 */
export function useAgendaAvailability(
  selectedDate: () => Date | null,
  getEmployees: () => AgendaEmployeeInput[]
) {
  const authStore = useAuthStore()
  const employeesWithSlots = ref<EmployeeWithSlots[]>([])
  const loading = ref(false)
  const error = ref('')

  async function fetchAvailability() {
    const date = selectedDate()
    const employees = getEmployees()
    if (!date || employees.length === 0) {
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
    const results: EmployeeWithSlots[] = []

    try {
      for (const emp of employees) {
        const employeeId = typeof emp.id === 'number' ? emp.id : parseInt(String(emp.id), 10)
        if (Number.isNaN(employeeId)) continue

        const url = `${AGENDA_API_URL}?StartDate=${dateStr}&EndDate=${dateStr}&EmployeeId=${employeeId}`
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          error.value = `Error ${response.status}`
          loading.value = false
          return
        }

        const data = (await response.json()) as AgendaResponse
        const day = data.days?.find((d) => d.date === dateStr)
        const appointments = day?.appointments ?? []

        const busyBlocks = appointments.map((a) => ({
          start: timeToMinutes(a.startTime),
          end: timeToMinutes(a.endTime),
        }))

        const slots = computeAvailableSlots(busyBlocks)
        if (slots.length > 0) {
          results.push({
            id: emp.id,
            name: emp.name,
            slots,
          })
        }
      }
      employeesWithSlots.value = results
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
      employeeCount: getEmployees().length,
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
