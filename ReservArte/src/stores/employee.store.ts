import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from './auth.store'
import i18n from '../i18n'

const EMPLOYEE_API_URL = 'http://localhost:5297/api/Employee'

export interface EmployeeListItem {
  id: number
  fullName: string
  email: string
  phone?: string
  role?: string
  isBlocked?: boolean
  createdAt?: string
}

/** Formato de ítem para listados (id + name para el componente CItemMasterManagement) */
export interface EmployeeItemData {
  id: string
  name: string
}

export const useEmployeeStore = defineStore('employee', () => {
  const authStore = useAuthStore()

  const employees = ref<EmployeeListItem[]>([])
  const loading = ref(true)
  const error = ref('')
  const searchQuery = ref('')

  /** Lista en formato ItemData para el componente de listado */
  const employeesAsItems = computed<EmployeeItemData[]>(() =>
    employees.value.map((e) => ({
      id: String(e.id),
      name: e.fullName,
    }))
  )

  /** Lista filtrada por búsqueda (fullName o email) */
  const itemsFiltered = computed<EmployeeItemData[]>(() => {
    const q = searchQuery.value.trim().toLowerCase()
    if (!q) return employeesAsItems.value
    return employeesAsItems.value.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        employees.value
          .find((e) => String(e.id) === item.id)
          ?.email?.toLowerCase()
          .includes(q)
    )
  })

  /** Items a mostrar en el listado (vacío mientras carga) */
  const items = computed<EmployeeItemData[]>(() =>
    loading.value ? [] : itemsFiltered.value
  )

  async function fetchEmployees() {
    loading.value = true
    error.value = ''
    const token = authStore.token
    if (!token) {
      error.value = i18n.global.t('employee.errors.noSession')
      loading.value = false
      return
    }
    try {
      const response = await fetch(EMPLOYEE_API_URL, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        error.value = i18n.global.t('employee.errors.loadFailedStatus', { status: response.status })
        loading.value = false
        return
      }
      const data = await response.json()
      const rawList = Array.isArray(data) ? data : (data?.data && Array.isArray(data.data) ? data.data : [])
      employees.value = rawList.map((item: Record<string, unknown>) => ({
        id: Number(item.id ?? item.Id ?? 0),
        fullName: String(item.fullName ?? item.FullName ?? ''),
        email: String(item.email ?? item.Email ?? ''),
        phone: item.phone != null || item.Phone != null ? String(item.phone ?? item.Phone) : undefined,
        role: item.role != null || item.Role != null ? String(item.role ?? item.Role) : undefined,
        isBlocked: Boolean(item.isBlocked ?? item.IsBlocked),
        createdAt: item.createdAt != null || item.CreatedAt != null ? String(item.createdAt ?? item.CreatedAt) : undefined,
      }))
    } catch {
      error.value = i18n.global.t('employee.errors.connection')
      employees.value = []
    } finally {
      loading.value = false
    }
  }

  async function deleteEmployee(id: string) {
    const token = authStore.token
    if (!token) {
      error.value = i18n.global.t('employee.errors.noSession')
      return
    }
    error.value = ''
    try {
      const response = await fetch(`${EMPLOYEE_API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          accept: '*/*',
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        error.value = i18n.global.t('employee.errors.deleteFailedStatus', { status: response.status })
        return
      }
      await fetchEmployees()
    } catch {
      error.value = i18n.global.t('employee.errors.connection')
    }
  }

  function setSearchQuery(q: string) {
    searchQuery.value = q
  }

  return {
    employees,
    loading,
    error,
    searchQuery,
    items,
    fetchEmployees,
    deleteEmployee,
    setSearchQuery,
  }
})
