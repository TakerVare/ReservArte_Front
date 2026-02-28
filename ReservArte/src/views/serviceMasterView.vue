<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CItemMasterManagement from '../components/c_itemMasterManagement.vue'
import type { ItemData } from '../components/c_itemMasterManagement.vue'
import { useAuthStore } from '../stores/auth.store'
import { useViewportSize } from '../composables/useViewportSize'

const SERVICE_API_URL = 'http://localhost:5297/api/Service'
const CATEGORIES_API_URL = 'http://localhost:5297/api/Service/categories'

type ServiceCategory = {
  id: number
  name: string
  description?: string
  color?: string
  displayOrder?: number
  isActive?: boolean
  createdAt?: string
}

const router = useRouter()
const authStore = useAuthStore()
const { size } = useViewportSize()

const searchQuery = ref('')
const selectedCategoryId = ref<string>('')
const servicesRaw = ref<Array<{
  id: number
  name: string
  description: string
  durationMinutes: number
  basePrice: number
  categoryName: string
  imageUrl: string | null
  isActive: boolean
  requiresAllergyTest: boolean
}>>([])
const categories = ref<ServiceCategory[]>([])
const loading = ref(true)
const categoriesLoading = ref(true)
const error = ref('')

const categoriesSorted = computed(() =>
  [...categories.value].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
)

const servicesAsItems = computed<ItemData[]>(() =>
  servicesRaw.value.map((s) => ({
    id: String(s.id),
    name: s.name,
  }))
)

/** Servicios filtrados por categoría (y luego por búsqueda) */
const items = computed(() => {
  let list = servicesAsItems.value
  const catId = selectedCategoryId.value.trim()
  if (catId) {
    const cat = categories.value.find((c) => String(c.id) === catId)
    if (cat) {
      list = list.filter((item) => {
        const s = servicesRaw.value.find((x) => String(x.id) === item.id)
        return s?.categoryName === cat.name
      })
    }
  }
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return list
  return list.filter((item) => {
    const s = servicesRaw.value.find((x) => String(x.id) === item.id)
    if (!s) return false
    return (
      s.name.toLowerCase().includes(q) ||
      (s.description?.toLowerCase().includes(q) ?? false) ||
      (s.categoryName?.toLowerCase().includes(q) ?? false)
    )
  })
})

async function fetchServices() {
  loading.value = true
  error.value = ''
  const token = authStore.token
  if (!token) {
    error.value = 'No hay sesión activa.'
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
      error.value = `Error ${response.status}. No se pudieron cargar los servicios.`
      loading.value = false
      return
    }
    const data = await response.json()
    servicesRaw.value = Array.isArray(data) ? data : []
  } catch {
    error.value = 'No se pudo conectar con el servidor.'
    servicesRaw.value = []
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

onMounted(() => {
  fetchServices()
  fetchCategories()
})

function onBack() {
  router.push({ name: 'user' })
}

function onNew() {
  router.push({ name: 'admin-new-service' })
}

function onEditItem(itemId: string) {
  router.push({ name: 'admin-edit-service', params: { id: itemId } })
}

async function onDeleteItem(itemId: string) {
  if (!confirm('¿Eliminar este servicio? Esta acción no se puede deshacer.')) return
  const token = authStore.token
  if (!token) {
    error.value = 'No hay sesión activa.'
    return
  }
  error.value = ''
  try {
    const response = await fetch(`${SERVICE_API_URL}/${itemId}`, {
      method: 'DELETE',
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      error.value = `Error ${response.status}. No se pudo eliminar el servicio.`
      return
    }
    await fetchServices()
  } catch {
    error.value = 'No se pudo conectar con el servidor.'
  }
}

function onViewItem(itemId: string) {
  router.push({ name: 'admin-edit-service', params: { id: itemId } })
}
</script>

<script lang="ts">
export default {
  name: 'ServiceMasterView',
}
</script>

<template>
  <div class="service-master-view">
    <p v-if="error" class="service-master-view__error">{{ error }}</p>
    <CItemMasterManagement
      v-else
      :size="size"
      item-label="servicios"
      new-text="Nuevo servicio"
      v-model:search-query="searchQuery"
      :items="loading ? [] : items"
      @back="onBack"
      @new="onNew"
      @edit-item="onEditItem"
      @delete-item="onDeleteItem"
      @view-item="onViewItem"
    >
      <template #filters>
        <div class="service-master-view__category-filter">
          <label for="service-category-select" class="service-master-view__category-label">Categoría</label>
          <select
            id="service-category-select"
            v-model="selectedCategoryId"
            class="service-master-view__category-select"
            :disabled="categoriesLoading"
          >
            <option value="">Todas las categorías</option>
            <option
              v-for="cat in categoriesSorted"
              :key="cat.id"
              :value="String(cat.id)"
            >
              {{ cat.name }}
            </option>
          </select>
        </div>
      </template>
    </CItemMasterManagement>
    <p v-if="loading" class="service-master-view__loading">Cargando servicios...</p>
  </div>
</template>

<style scoped>
.service-master-view {
  width: 100%;
  position: relative;
}
.service-master-view__error {
  color: #b71c1c;
  padding: 1rem;
  margin: 0;
}
.service-master-view__loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  color: #666;
}

.service-master-view__category-filter {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
}

.service-master-view__category-label {
  font-size: 0.9375rem;
  color: #333;
  white-space: nowrap;
}

.service-master-view__category-select {
  min-width: 12rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.9375rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
}

.service-master-view__category-select:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
