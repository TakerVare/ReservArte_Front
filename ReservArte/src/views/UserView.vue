<script setup lang="ts">
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import CUserMenu from '../components/c_userMenu.vue'
import { useAuthStore } from '../stores/auth.store'
import { useViewportSize } from '../composables/useViewportSize'

const router = useRouter()
const authStore = useAuthStore()
const { showAdminArea } = storeToRefs(authStore)
const { size } = useViewportSize()

function onMenuItemClick(itemId: string) {
  switch (itemId) {
    case 'cerrar-sesion':
      authStore.logout()
      router.push({ name: 'login' })
      break
    case 'usuarios':
      router.push({ name: 'admin-users' })
      break
    case 'clientes':
      router.push({ name: 'admin-customers' })
      break
    case 'empleados':
      router.push({ name: 'admin-employees' })
      break
    case 'citas':
      // TODO: router.push({ name: 'admin-bookings' })
      console.log('Navegando a citas')
      break
    case 'servicios':
      router.push({ name: 'admin-services' })
      break
    default:
      console.log(`Navegando a: ${itemId}`)
      break
  }
}
</script>

<script lang="ts">
export default {
  name: 'UserView',
}
</script>

<template>
  <div class="user-view">
    <CUserMenu
      :size="size"
      :is-admin="showAdminArea"
      @menu-item-click="onMenuItemClick"
    />
  </div>
</template>

<style scoped>
.user-view {
  width: 100%;
  padding: 16px 0;
}
</style>