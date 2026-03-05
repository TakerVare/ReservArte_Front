import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from './auth.store'
import i18n from '../i18n'

const APPOINTMENT_API_URL = 'http://localhost:5173/api/Appointment'

/** Elemento de la lista GET /api/Appointment */
export interface AppointmentListItem {
  id: number
  customerId: string
  employeeId: string
  appointmentDate: string
  startTime: string
  endTime: string
  status: string
}

/** Servicio dentro de una cita (detalle) */
export interface AppointmentServiceItem {
  id?: number
  serviceId: number
  serviceName?: string
  serviceVariationId?: number | null
  variationName?: string | null
  price?: number
  durationMinutes?: number
  order?: number
}

/** Cita completa (GET /api/Appointment/:id, respuesta POST, body PUT) */
export interface AppointmentDetail {
  id: number
  customerId: number
  customerName?: string
  employeeId: number
  employeeName?: string
  appointmentDate: string
  startTime: string
  endTime: string
  status: string
  totalPrice?: number
  depositAmount?: number
  redsysOrderNumber?: string | null
  paymentMethodId?: number | null
  paymentMethodLast4?: string | null
  cancellationReason?: string | null
  cancelledAt?: string | null
  cancelledById?: string | null
  cancelledByType?: string | null
  cancelledByName?: string | null
  notes?: string | null
  createdAt?: string
  updatedAt?: string | null
  services?: AppointmentServiceItem[]
}

/** Payload para crear cita POST /api/Appointment */
export interface CreateAppointmentPayload {
  customerId: number
  employeeId: number
  appointmentDate: string
  startTime: string
  services: { serviceId: number; serviceVariationId?: number | null }[]
  paymentMethodId?: number | null
  notes?: string | null
}

/** Payload para cancelar cita PUT /api/Appointment/:id/cancel */
export interface CancelAppointmentPayload {
  reason: string
  cancelledById: number
  cancelledByType: 'Customer' | 'Employee' | 'Admin'
  isJustified: boolean
}

/** Respuesta de PUT /api/Appointment/:id/cancel */
export interface CancelAppointmentResponse {
  appointmentId: number
  status: string
  cancelledAt: string
  penaltyApplied: boolean
  penaltyAmount: number
  penaltyPercentage: number
  message: string
}

/** Formato ítem para CItemMasterManagement */
export interface AppointmentItemData {
  id: string
  name: string
}

export const useAppointmentStore = defineStore('appointment', () => {
  const authStore = useAuthStore()

  const appointments = ref<AppointmentListItem[]>([])
  const loading = ref(true)
  const error = ref('')
  const searchQuery = ref('')
  const filterDateFrom = ref('')
  const filterDateTo = ref('')
  const filterStatus = ref('')
  const filterEmployeeId = ref('')

  const appointmentsAsItems = computed<AppointmentItemData[]>(() =>
    appointments.value.map((a) => ({
      id: String(a.id),
      name: `${a.appointmentDate} ${a.startTime.slice(0, 5)} — ${a.status}`,
    }))
  )

  const itemsFiltered = computed<AppointmentItemData[]>(() => {
    let list = appointmentsAsItems.value
    const from = filterDateFrom.value.trim()
    const to = filterDateTo.value.trim()
    const status = filterStatus.value.trim()
    const empId = filterEmployeeId.value.trim()
    const q = searchQuery.value.trim().toLowerCase()

    if (from) {
      list = list.filter((item) => {
        const a = appointments.value.find((x) => String(x.id) === item.id)
        return a && a.appointmentDate >= from
      })
    }
    if (to) {
      list = list.filter((item) => {
        const a = appointments.value.find((x) => String(x.id) === item.id)
        return a && a.appointmentDate <= to
      })
    }
    if (status) {
      list = list.filter((item) => {
        const a = appointments.value.find((x) => String(x.id) === item.id)
        return a && a.status === status
      })
    }
    if (empId) {
      list = list.filter((item) => {
        const a = appointments.value.find((x) => String(x.id) === item.id)
        return a && String(a.employeeId) === empId
      })
    }
    if (q) {
      list = list.filter(
        (item) =>
          item.id.toLowerCase().includes(q) ||
          item.name.toLowerCase().includes(q)
      )
    }
    return list
  })

  const items = computed<AppointmentItemData[]>(() =>
    loading.value ? [] : itemsFiltered.value
  )

  /** Próxima cita del usuario actual (fecha/hora >= ahora, ordenada por fecha). */
  const nextAppointment = computed<AppointmentListItem | null>(() => {
    const userId = authStore.user?.id
    if (!userId) return null
    const now = new Date()
    const today = now.toISOString().slice(0, 10)
    const currentTime = now.toTimeString().slice(0, 5)

    const upcoming = appointments.value
      .filter(
        (a) =>
          String(a.customerId) === String(userId) &&
          a.status?.toLowerCase() !== 'cancelled' &&
          (a.appointmentDate > today ||
            (a.appointmentDate === today && a.startTime.slice(0, 5) >= currentTime))
      )
      .sort((a, b) => {
        const da = `${a.appointmentDate}T${a.startTime.slice(0, 5)}`
        const db = `${b.appointmentDate}T${b.startTime.slice(0, 5)}`
        return da.localeCompare(db)
      })
    return upcoming[0] ?? null
  })

  async function fetchAppointments() {
    loading.value = true
    error.value = ''
    const token = authStore.token
    if (!token) {
      error.value = i18n.global.t('appointment.errors.noSession')
      loading.value = false
      return
    }
    try {
      const response = await fetch(APPOINTMENT_API_URL, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        error.value = i18n.global.t('appointment.errors.loadFailedStatus', {
          status: response.status,
        })
        loading.value = false
        return
      }
      const data = await response.json()
      const rawList = Array.isArray(data) ? data : []
      appointments.value = rawList.map((item: Record<string, unknown>) => ({
        id: Number(item.id ?? item.Id ?? 0),
        customerId: String(item.customerId ?? item.CustomerId ?? ''),
        employeeId: String(item.employeeId ?? item.EmployeeId ?? ''),
        appointmentDate: String(item.appointmentDate ?? item.AppointmentDate ?? ''),
        startTime: String(item.startTime ?? item.StartTime ?? ''),
        endTime: String(item.endTime ?? item.EndTime ?? ''),
        status: String(item.status ?? item.Status ?? ''),
      }))
    } catch {
      error.value = i18n.global.t('appointment.errors.connection')
      appointments.value = []
    } finally {
      loading.value = false
    }
  }

  async function fetchAppointment(id: string): Promise<AppointmentDetail | null> {
    const token = authStore.token
    if (!token) {
      error.value = i18n.global.t('appointment.errors.noSession')
      return null
    }
    try {
      const response = await fetch(`${APPOINTMENT_API_URL}/${id}`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        error.value = i18n.global.t('appointment.errors.loadOneFailedStatus', {
          status: response.status,
        })
        return null
      }
      return await response.json()
    } catch {
      error.value = i18n.global.t('appointment.errors.connection')
      return null
    }
  }

  async function createAppointment(
    payload: CreateAppointmentPayload
  ): Promise<AppointmentDetail | null> {
    const token = authStore.token
    if (!token) {
      error.value = i18n.global.t('appointment.errors.noSession')
      return null
    }
    try {
      const response = await fetch(APPOINTMENT_API_URL, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })
      if (!response.ok) {
        const text = await response.text()
        error.value =
          text ||
          i18n.global.t('appointment.errors.saveFailedStatus', {
            status: response.status,
          })
        return null
      }
      const created = await response.json()
      await fetchAppointments()
      return created
    } catch {
      error.value = i18n.global.t('appointment.errors.connection')
      return null
    }
  }

  /** PUT /api/Appointment/:id — body es el objeto completo de la cita */
  async function updateAppointment(
    id: string,
    body: AppointmentDetail
  ): Promise<AppointmentDetail | null> {
    const token = authStore.token
    if (!token) {
      error.value = i18n.global.t('appointment.errors.noSession')
      return null
    }
    try {
      const response = await fetch(`${APPOINTMENT_API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      })
      if (!response.ok) {
        const text = await response.text()
        error.value =
          text ||
          i18n.global.t('appointment.errors.saveFailedStatus', {
            status: response.status,
          })
        return null
      }
      const updated = await response.json()
      await fetchAppointments()
      return updated
    } catch {
      error.value = i18n.global.t('appointment.errors.connection')
      return null
    }
  }

  async function cancelAppointment(
    appointmentId: number,
    reason?: string
  ): Promise<CancelAppointmentResponse | null> {
    const token = authStore.token
    const user = authStore.user
    if (!token || !user) {
      error.value = i18n.global.t('appointment.errors.noSession')
      return null
    }
    const cancelledById = Number(user.id) || 0
    const cancelledByType: CancelAppointmentPayload['cancelledByType'] =
      user.role === 'admin' ? 'Admin' : user.role === 'employee' ? 'Employee' : 'Customer'
    const body: CancelAppointmentPayload = {
      reason: reason ?? i18n.global.t('appointment.cancelReasonDefault'),
      cancelledById,
      cancelledByType,
      isJustified: false,
    }
    try {
      const response = await fetch(`${APPOINTMENT_API_URL}/${appointmentId}/cancel`, {
        method: 'PUT',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      })
      if (!response.ok) {
        const text = await response.text()
        error.value =
          text ||
          i18n.global.t('appointment.errors.cancelFailedStatus', {
            status: response.status,
          })
        return null
      }
      const result: CancelAppointmentResponse = await response.json()
      await fetchAppointments()
      return result
    } catch {
      error.value = i18n.global.t('appointment.errors.connection')
      return null
    }
  }

  async function deleteAppointment(id: string): Promise<boolean> {
    const token = authStore.token
    if (!token) {
      error.value = i18n.global.t('appointment.errors.noSession')
      return false
    }
    error.value = ''
    try {
      const response = await fetch(`${APPOINTMENT_API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          accept: '*/*',
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok && response.status !== 204) {
        error.value = i18n.global.t('appointment.errors.deleteFailedStatus', {
          status: response.status,
        })
        return false
      }
      await fetchAppointments()
      return true
    } catch {
      error.value = i18n.global.t('appointment.errors.connection')
      return false
    }
  }

  function setSearchQuery(q: string) {
    searchQuery.value = q
  }

  function setFilterDateFrom(value: string) {
    filterDateFrom.value = value
  }

  function setFilterDateTo(value: string) {
    filterDateTo.value = value
  }

  function setFilterStatus(value: string) {
    filterStatus.value = value
  }

  function setFilterEmployeeId(value: string) {
    filterEmployeeId.value = value
  }

  return {
    appointments,
    loading,
    error,
    searchQuery,
    filterDateFrom,
    filterDateTo,
    filterStatus,
    filterEmployeeId,
    items,
    nextAppointment,
    fetchAppointments,
    fetchAppointment,
    createAppointment,
    updateAppointment,
    cancelAppointment,
    deleteAppointment,
    setSearchQuery,
    setFilterDateFrom,
    setFilterDateTo,
    setFilterStatus,
    setFilterEmployeeId,
  }
})
