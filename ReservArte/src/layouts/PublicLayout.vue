<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import BannerPrincipal from '../components/c_bannerPrincipal.vue'
import NavBottom from '../components/c_bottomNavBar.vue'
import { useAuthStore } from '../stores/auth.store'
import { useViewportSize } from '../composables/useViewportSize'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const { size } = useViewportSize()

/**
 * Índice activo del nav bottom según la ruta actual.
 * 0 = Inicio (home/booking)
 * 1 = Ubicación (contact)
 * 2 = Perfil (user)
 */
const activeNavIndex = computed(() => {
  const name = route.name as string
  if (name === 'contact') return 1
  if (name === 'user' || name?.startsWith('user')) return 2
  return 0
})

function onNavNavigate(index: number) {
  switch (index) {
    case 0:
      router.push({ name: 'home' })
      break
    case 1:
      router.push({ name: 'contact' })
      break
    case 2:
      if (authStore.isAuthenticated) {
        router.push({ name: 'user' })
      } else {
        router.push({ name: 'booking' })
      }
      break
  }
}
</script>

<script lang="ts">
export default {
  name: 'PublicLayout',
}
</script>

<template>
  <div class="public-layout">
    <BannerPrincipal :size="size" />
    <main class="public-layout__main">
      <router-view />
    </main>
    <NavBottom
      :size="size"
      :active-index="activeNavIndex"
      @navigate="onNavNavigate"
    />
  </div>
</template>

<style scoped>
.public-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fff;
}

.public-layout__main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
</style>