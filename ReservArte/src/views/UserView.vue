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
    case 'clientes':
      router.push({ name: 'admin-customers' })
      break
    case 'empleados':
      router.push({ name: 'admin-employees' })
      break
    case 'citas':
      router.push({ name: 'admin-bookings' })
      break
    case 'servicios':
      router.push({ name: 'admin-services' })
      break
    case 'guia-estilo':
      router.push({ name: 'style-guide' })
      break
    case 'privacidad':
      router.push({ name: 'privacy' })
      break
    case 'metodos-pago':
      router.push({ name: 'payment-methods' });
      break
    case 'datos-usuario':
      router.push({ name: 'admin-edit-customer', params: { id: authStore.user?.id } })
      break
    case 'acerca':
      router.push({ name: 'about' })
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
    <CUserMenu :size="size" :is-admin="showAdminArea" @menu-item-click="onMenuItemClick" />
  </div>
</template>

<style scoped>
.user-view {
  width: 100%;
  padding: 16px 0;
}
</style>