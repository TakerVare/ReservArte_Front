<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import CUserManagement from '../components/c_userManagement.vue'
import { useViewportSize } from '../composables/useViewportSize'

const { t } = useI18n()
const router = useRouter()
const { size } = useViewportSize()

const searchQuery = ref('')

const users = ref([
  { id: '1', name: 'Marcos Aguilar Fernández' },
  { id: '2', name: 'Elena Torres Delgado' },
  { id: '3', name: 'Rubén Castillo Moreno' },
  { id: '4', name: 'Paula Sánchez Robles' },
  { id: '5', name: 'Adriana López Carmona' },
])

function onBack() {
  router.push({ name: 'user' })
}

function onNew() {
  router.push({ name: 'admin-new-user' })
}

function onEditUser(userId: string) {
  // TODO: router.push({ name: 'admin-edit-user', params: { id: userId } })
  console.log(`Editar usuario: ${userId}`)
}

function onDeleteUser(userId: string) {
  // TODO: llamar al store para eliminar
  console.log(`Eliminar usuario: ${userId}`)
}

function onViewUser(userId: string) {
  // TODO: router.push({ name: 'admin-view-user', params: { id: userId } })
  console.log(`Ver usuario: ${userId}`)
}
</script>

<script lang="ts">
export default {
  name: 'UserManagementView',
}
</script>

<template>
  <CUserManagement
    :size="size"
    :title="t('admin.users')"
    :back-text="t('common.back')"
    :new-text="t('common.new')"
    v-model:search-query="searchQuery"
    :users="users"
    @back="onBack"
    @new="onNew"
    @edit-user="onEditUser"
    @delete-user="onDeleteUser"
    @view-user="onViewUser"
  />
</template>