<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CItemMasterManagement from '../components/c_itemMasterManagement.vue'
import { useCustomerStore } from '../stores/customer.store'
import { useViewportSize } from '../composables/useViewportSize'

const router = useRouter()
const customerStore = useCustomerStore()
const { size } = useViewportSize()

onMounted(() => {
  customerStore.fetchCustomers()
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

function onViewItem(itemId: string) {
  router.push({ name: 'admin-edit-customer', params: { id: itemId } })
}

async function onDeleteItem(itemId: string) {
  if (!confirm('¿Eliminar este cliente? Esta acción no se puede deshacer.')) return
  await customerStore.deleteCustomer(itemId)
}
</script>

<script lang="ts">
export default {
  name: 'CustomerMasterView',
}
</script>

<template>
  <div class="customer-master-view">
    <p v-if="customerStore.error" class="customer-master-view__error">{{ customerStore.error }}</p>
    <CItemMasterManagement
      v-else
      :size="size"
      item-label="clientes"
      new-text="Nuevo cliente"
      :search-query="customerStore.searchQuery"
      @update:search-query="customerStore.setSearchQuery($event)"
      :items="customerStore.items"
      @back="onBack"
      @new="onNew"
      @edit-item="onEditItem"
      @delete-item="onDeleteItem"
      @view-item="onViewItem"
    />
    <p v-if="customerStore.loading" class="customer-master-view__loading">Cargando clientes...</p>
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
