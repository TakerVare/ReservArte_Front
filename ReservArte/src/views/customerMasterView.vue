<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CItemMasterManagement from '../components/c_itemMasterManagement.vue'
import type { ItemData } from '../components/c_itemMasterManagement.vue'
import { useAuthStore } from '../stores/auth.store'
import { useViewportSize } from '../composables/useViewportSize'

const CUSTOMER_API_URL = 'http://localhost:5297/api/Customer'

const router = useRouter()
const authStore = useAuthStore()
const { size } = useViewportSize()

const searchQuery = ref('')
const customersRaw = ref<Array<{
  id: number
  fullName: string
  email: string
  phone: string
  category: string
  loyaltyPoints: number
  isBlocked: boolean
  createdAt: string
}>>([])
const loading = ref(true)
const error = ref('')

/** Lista de clientes en formato ItemData para el componente */
const customersAsItems = computed<ItemData[]>(() =>
  customersRaw.value.map((c) => ({
    id: String(c.id),
    name: c.fullName,
  }))
)

/** Filtrado por búsqueda (fullName o email) */
const items = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return customersAsItems.value
  return customersAsItems.value.filter(
    (item) =>
      item.name.toLowerCase().includes(q) ||
      customersRaw.value
        .find((c) => String(c.id) === item.id)
        ?.email.toLowerCase()
        .includes(q)
  )
})

async function fetchCustomers() {
  loading.value = true
  error.value = ''
  const token = authStore.token
  if (!token) {
    error.value = 'No hay sesión activa.'
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
      error.value = `Error ${response.status}. No se pudieron cargar los clientes.`
      loading.value = false
      return
    }
    const data = await response.json()
    customersRaw.value = Array.isArray(data) ? data : []
  } catch (e) {
    error.value = 'No se pudo conectar con el servidor.'
    customersRaw.value = []
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchCustomers()
})

function onBack() {
  router.push({ name: 'user' })
}

function onNew() {
  router.push({ name: 'admin-new-customer' })
}

function onEditItem(itemId: string) {
  router.push({ name: 'admin-edit-customer', params: { id: itemId } })
}

async function onDeleteItem(itemId: string) {
  if (!confirm('¿Eliminar este cliente? Esta acción no se puede deshacer.')) return
  const token = authStore.token
  if (!token) {
    error.value = 'No hay sesión activa.'
    return
  }
  error.value = ''
  try {
    const response = await fetch(`${CUSTOMER_API_URL}/${itemId}`, {
      method: 'DELETE',
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      error.value = `Error ${response.status}. No se pudo eliminar el cliente.`
      return
    }
    await fetchCustomers()
  } catch {
    error.value = 'No se pudo conectar con el servidor.'
  }
}

function onViewItem(itemId: string) {
  router.push({ name: 'admin-edit-customer', params: { id: itemId } })
}
</script>

<script lang="ts">
export default {
  name: 'CustomerMasterView',
}
</script>

<template>
  <div class="customer-master-view">
    <p v-if="error" class="customer-master-view__error">{{ error }}</p>
    <CItemMasterManagement
      v-else
      :size="size"
      item-label="clientes"
      new-text="Nuevo cliente"
      v-model:search-query="searchQuery"
      :items="loading ? [] : items"
      @back="onBack"
      @new="onNew"
      @edit-item="onEditItem"
      @delete-item="onDeleteItem"
      @view-item="onViewItem"
    />
    <p v-if="loading" class="customer-master-view__loading">Cargando clientes...</p>
  </div>
</template>

<style scoped>
.customer-master-view {
  width: 100%;
  position: relative;
}

.customer-master-view__error {
  color: #b71c1c;
  padding: 1rem;
  margin: 0;
}

.customer-master-view__loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  color: #666;
}
</style>
