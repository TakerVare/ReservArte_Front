import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from './auth.store'

const SUPPLIER_API_URL = '/api/Supplier'

export interface SupplierItem {
  id: number
  name: string
  phone: string | null
  address: string | null
  type: string
}

export const useSupplierStore = defineStore('supplier', () => {
  const authStore = useAuthStore()

  const suppliers = ref<SupplierItem[]>([])
  const loading = ref(false)
  const error = ref('')
  const selectedType = ref('')

  /** Tipos únicos extraídos de los datos (para los botones) */
  const supplierTypes = computed(() => {
    const types = new Set(suppliers.value.map(s => s.type))
    return Array.from(types).sort()
  })

  /** Lista filtrada por tipo seleccionado */
  const filteredSuppliers = computed(() => {
    if (!selectedType.value) return suppliers.value
    return suppliers.value.filter(s => s.type === selectedType.value)
  })

  async function fetchSuppliers() {
    loading.value = true
    error.value = ''
    const token = authStore.token
    if (!token) {
      error.value = 'No hay sesión activa.'
      loading.value = false
      return
    }
    try {
      const response = await fetch(SUPPLIER_API_URL, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        error.value = `Error ${response.status}. No se pudieron cargar los proveedores.`
        loading.value = false
        return
      }
      const data = await response.json()
      suppliers.value = Array.isArray(data) ? data : []
    } catch {
      error.value = 'No se pudo conectar con el servidor.'
      suppliers.value = []
    } finally {
      loading.value = false
    }
  }

  function setSelectedType(type: string) {
    selectedType.value = type
  }

  return {
    suppliers,
    loading,
    error,
    selectedType,
    supplierTypes,
    filteredSuppliers,
    fetchSuppliers,
    setSelectedType,
  }
})