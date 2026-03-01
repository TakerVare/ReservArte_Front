<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CItemMasterManagement from '../components/c_itemMasterManagement.vue'
import { useEmployeeStore } from '../stores/employee.store'
import { useViewportSize } from '../composables/useViewportSize'

const router = useRouter()
const employeeStore = useEmployeeStore()
const { size } = useViewportSize()

onMounted(() => {
  employeeStore.fetchEmployees()
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

function onViewItem(itemId: string) {
  router.push({ name: 'admin-edit-employee', params: { id: itemId } })
}

async function onDeleteItem(itemId: string) {
  if (!confirm('¿Eliminar este empleado? Esta acción no se puede deshacer.')) return
  await employeeStore.deleteEmployee(itemId)
}
</script>

<script lang="ts">
export default {
  name: 'EmployeeMasterView',
}
</script>

<template>
  <div class="employee-master-view">
    <p v-if="employeeStore.error" class="employee-master-view__error">{{ employeeStore.error }}</p>
    <CItemMasterManagement
      v-else
      :size="size"
      item-label="empleados"
      new-text="Nuevo empleado"
      :search-query="employeeStore.searchQuery"
      @update:search-query="employeeStore.setSearchQuery($event)"
      :items="employeeStore.items"
      @back="onBack"
      @new="onNew"
      @edit-item="onEditItem"
      @delete-item="onDeleteItem"
      @view-item="onViewItem"
    />
    <p v-if="employeeStore.loading" class="employee-master-view__loading">Cargando empleados...</p>
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
