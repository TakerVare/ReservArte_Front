<script setup lang="ts">
import { useRouter } from 'vue-router'
import CUserMenu from '../components/c_userMenu.vue'
import { useViewportSize } from '../composables/useViewportSize'

const router = useRouter()
const { size } = useViewportSize()

function onMenuItemClick(itemId: string) {
  switch (itemId) {
    case 'usuarios':
      router.push({ name: 'admin-users' })
      break
    case 'citas':
      // TODO: router.push({ name: 'admin-bookings' })
      console.log('Navegando a citas')
      break
    case 'servicios':
      // TODO: router.push({ name: 'admin-services' })
      console.log('Navegando a servicios')
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
      :is-admin="true"
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