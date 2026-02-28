<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CItemMasterManagement from '../components/c_itemMasterManagement.vue'
import type { ItemData } from '../components/c_itemMasterManagement.vue'
import { useAuthStore } from '../stores/auth.store'
import { useViewportSize } from '../composables/useViewportSize'

const EMPLOYEE_API_URL = 'http://localhost:5297/api/Employee'

const router = useRouter()
const authStore = useAuthStore()
const { size } = useViewportSize()

const searchQuery = ref('')
const employeesRaw = ref<Array<{
  id: number
  fullName: string
  email: string
  phone?: string
  role?: string
  isBlocked?: boolean
  createdAt?: string
}>>([])
const loading = ref(true)
const error = ref('')

/** Lista de empleados en formato ItemData para el componente */
const employeesAsItems = computed<ItemData[]>(() =>
  employeesRaw.value.map((e) => ({
    id: String(e.id),
    name: e.fullName,
  }))
)

/** Filtrado por búsqueda (fullName o email) */
const items = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return employeesAsItems.value
  return employeesAsItems.value.filter(
    (item) =>
      item.name.toLowerCase().includes(q) ||
      employeesRaw.value
        .find((e) => String(e.id) === item.id)
        ?.email?.toLowerCase()
        .includes(q)
  )
})

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
    employeesRaw.value = Array.isArray(data) ? data : []
  } catch {
    error.value = 'No se pudo conectar con el servidor.'
    employeesRaw.value = []
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchEmployees()
})

function onBack() {
  router.push({ name: 'user' })
}

function onNew() {
  router.push({ name: 'admin-new-employee' })
}

function onEditItem(itemId: string) {
  router.push({ name: 'admin-edit-employee', params: { id: itemId } })
}

async function onDeleteItem(itemId: string) {
  if (!confirm('¿Eliminar este empleado? Esta acción no se puede deshacer.')) return
  const token = authStore.token
  if (!token) {
    error.value = 'No hay sesión activa.'
    return
  }
  error.value = ''
  try {
    const response = await fetch(`${EMPLOYEE_API_URL}/${itemId}`, {
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

function onViewItem(itemId: string) {
  router.push({ name: 'admin-edit-employee', params: { id: itemId } })
}
</script>

<script lang="ts">
export default {
  name: 'EmployeeMasterView',
}
</script>

<template>
  <div class="employee-master-view">
    <p v-if="error" class="employee-master-view__error">{{ error }}</p>
    <CItemMasterManagement
      v-else
      :size="size"
      item-label="empleados"
      new-text="Nuevo empleado"
      v-model:search-query="searchQuery"
      :items="loading ? [] : items"
      @back="onBack"
      @new="onNew"
      @edit-item="onEditItem"
      @delete-item="onDeleteItem"
      @view-item="onViewItem"
    />
    <p v-if="loading" class="employee-master-view__loading">Cargando empleados...</p>
  </div>
</template>

<style scoped>
.employee-master-view {
  width: 100%;
  position: relative;
}

.employee-master-view__error {
  color: #b71c1c;
  padding: 1rem;
  margin: 0;
}

.employee-master-view__loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  color: #666;
}
</style>
