import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from './auth.store'
import i18n from '../i18n'

const SERVICE_API_URL = '/api/Service'
const CATEGORIES_API_URL = '/api/Service/categories'

export interface ServiceCategory {
  id: number
  name: string
  description?: string
  color?: string
  displayOrder?: number
  isActive?: boolean
  createdAt?: string
}

export interface ServiceListItem {
  id: number
  name: string
  description: string
  durationMinutes: number
  basePrice: number
  categoryName: string
  imageUrl: string | null
  isActive: boolean
  requiresAllergyTest: boolean
}

/** Formato de ítem para listados (id + name para el componente CItemMasterManagement) */
export interface ServiceItemData {
  id: string
  name: string
}

export const useServiceStore = defineStore('service', () => {
  const authStore = useAuthStore()

  const services = ref<ServiceListItem[]>([])
  const categories = ref<ServiceCategory[]>([])
  const loading = ref(true)
  const categoriesLoading = ref(true)
  const error = ref('')
  const searchQuery = ref('')
  const selectedCategoryId = ref<string>('')

  /** Categorías ordenadas por displayOrder */
  const categoriesSorted = computed(() =>
    [...categories.value].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
  )

  /** Lista en formato ItemData para el componente de listado */
  const servicesAsItems = computed<ServiceItemData[]>(() =>
    services.value.map((s) => ({
      id: String(s.id),
      name: s.name,
    }))
  )

  /** Lista filtrada por categoría y búsqueda (nombre, descripción, categoría) */
  const itemsFiltered = computed<ServiceItemData[]>(() => {
    let list = servicesAsItems.value
    const catId = selectedCategoryId.value.trim()
    if (catId) {
      const cat = categories.value.find((c) => String(c.id) === catId)
      if (cat) {
        list = list.filter((item) => {
          const s = services.value.find((x) => String(x.id) === item.id)
          return s?.categoryName === cat.name
        })
      }
    }
    const q = searchQuery.value.trim().toLowerCase()
    if (!q) return list
    return list.filter((item) => {
      const s = services.value.find((x) => String(x.id) === item.id)
      if (!s) return false
      return (
        s.name.toLowerCase().includes(q) ||
        (s.description?.toLowerCase().includes(q) ?? false) ||
        (s.categoryName?.toLowerCase().includes(q) ?? false)
      )
    })
  })

  /** Items a mostrar en el listado (vacío mientras carga) */
  const items = computed<ServiceItemData[]>(() =>
    loading.value ? [] : itemsFiltered.value
  )

  async function fetchServices() {
    loading.value = true
    error.value = ''
    const token = authStore.token
    if (!token) {
      error.value = i18n.global.t('service.errors.noSession')
      loading.value = false
      return
    }
    try {
      const response = await fetch(SERVICE_API_URL, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        error.value = i18n.global.t('service.errors.loadFailedStatus', { status: response.status })
        loading.value = false
        return
      }
      const data = await response.json()
      services.value = Array.isArray(data) ? data : []
    } catch {
      error.value = i18n.global.t('service.errors.connection')
      services.value = []
    } finally {
      loading.value = false
    }
  }

  async function fetchCategories() {
    categoriesLoading.value = true
    const token = authStore.token
    if (!token) {
      categoriesLoading.value = false
      return
    }
    try {
      const response = await fetch(CATEGORIES_API_URL, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        categories.value = []
        return
      }
      const data = await response.json()
      categories.value = Array.isArray(data) ? data : []
    } catch {
      categories.value = []
    } finally {
      categoriesLoading.value = false
    }
  }

  async function deleteService(id: string) {
    const token = authStore.token
    if (!token) {
      error.value = i18n.global.t('service.errors.noSession')
      return
    }
    error.value = ''
    try {
      const response = await fetch(`${SERVICE_API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          accept: '*/*',
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        error.value = i18n.global.t('service.errors.deleteFailedStatus', { status: response.status })
        return
      }
      await fetchServices()
    } catch {
      error.value = i18n.global.t('service.errors.connection')
    }
  }

  function setSearchQuery(q: string) {
    searchQuery.value = q
  }

  function setSelectedCategoryId(id: string) {
    selectedCategoryId.value = id
  }

  return {
    services,
    categories,
    loading,
    categoriesLoading,
    error,
    searchQuery,
    selectedCategoryId,
    categoriesSorted,
    items,
    fetchServices,
    fetchCategories,
    deleteService,
    setSearchQuery,
    setSelectedCategoryId,
  }
})
