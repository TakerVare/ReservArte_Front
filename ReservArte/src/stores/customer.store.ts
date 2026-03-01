import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from './auth.store'
import i18n from '../i18n'

const CUSTOMER_API_URL = '/api/Customer'

export interface CustomerListItem {
  id: number
  fullName: string
  email: string
  phone: string
  category: string
  loyaltyPoints: number
  isBlocked: boolean
  createdAt: string
}

/** Formato de ítem para listados (id + name para el componente CItemMasterManagement) */
export interface CustomerItemData {
  id: string
  name: string
}

export const useCustomerStore = defineStore('customer', () => {
  const authStore = useAuthStore()

  const customers = ref<CustomerListItem[]>([])
  const loading = ref(true)
  const error = ref('')
  const searchQuery = ref('')

  /** Lista en formato ItemData para el componente de listado */
  const customersAsItems = computed<CustomerItemData[]>(() =>
    customers.value.map((c) => ({
      id: String(c.id),
      name: c.fullName,
    }))
  )

  /** Lista filtrada por búsqueda (fullName o email) */
  const itemsFiltered = computed<CustomerItemData[]>(() => {
    const q = searchQuery.value.trim().toLowerCase()
    if (!q) return customersAsItems.value
    return customersAsItems.value.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        customers.value
          .find((c) => String(c.id) === item.id)
          ?.email.toLowerCase()
          .includes(q)
    )
  })

  /** Items a mostrar en el listado (vacío mientras carga) */
  const items = computed<CustomerItemData[]>(() =>
    loading.value ? [] : itemsFiltered.value
  )

  async function fetchCustomers() {
    loading.value = true
    error.value = ''
    const token = authStore.token
    if (!token) {
      error.value = i18n.global.t('customer.errors.noSession')
      loading.value = false
      return
    }
    try {
      const response = await fetch(CUSTOMER_API_URL, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        error.value = i18n.global.t('customer.errors.loadFailedStatus', { status: response.status })
        loading.value = false
        return
      }
      const data = await response.json()
      customers.value = Array.isArray(data) ? data : []
    } catch {
      error.value = i18n.global.t('customer.errors.connection')
      customers.value = []
    } finally {
      loading.value = false
    }
  }

  async function deleteCustomer(id: string) {
    const token = authStore.token
    if (!token) {
      error.value = i18n.global.t('customer.errors.noSession')
      return
    }
    error.value = ''
    try {
      const response = await fetch(`${CUSTOMER_API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          accept: '*/*',
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        error.value = i18n.global.t('customer.errors.deleteFailedStatus', { status: response.status })
        return
      }
      await fetchCustomers()
    } catch {
      error.value = i18n.global.t('customer.errors.connection')
    }
  }

  function setSearchQuery(q: string) {
    searchQuery.value = q
  }

  return {
    customers,
    loading,
    error,
    searchQuery,
    items,
    fetchCustomers,
    deleteCustomer,
    setSearchQuery,
  }
})
