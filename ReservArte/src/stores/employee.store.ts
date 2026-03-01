import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from './auth.store'

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
      error.value = 'No hay sesión activa.'
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
        error.value = `Error ${response.status}. No se pudieron cargar los empleados.`
        loading.value = false
        return
      }
      const data = await response.json()
      employees.value = Array.isArray(data) ? data : []
    } catch {
      error.value = 'No se pudo conectar con el servidor.'
      employees.value = []
    } finally {
      loading.value = false
    }
  }

  async function deleteEmployee(id: string) {
    const token = authStore.token
    if (!token) {
      error.value = 'No hay sesión activa.'
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
        error.value = `Error ${response.status}. No se pudo eliminar el empleado.`
        return
      }
      await fetchEmployees()
    } catch {
      error.value = 'No se pudo conectar con el servidor.'
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
