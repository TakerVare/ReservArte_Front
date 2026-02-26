<script setup lang="ts">
import { useRouter } from 'vue-router'
import BannerPrincipal from '../components/c_bannerPrincipal.vue'
import CUserMenu from '../components/c_userMenu.vue'
import NavBottom from '../components/c_bottomNavBar.vue'
import { useViewportSize } from '../composables/useViewportSize'

const router = useRouter()
const { size } = useViewportSize()

function onMenuItemClick(itemId: string) {
  alert(`Navegando a: ${itemId}`)
  // Futuro: router.push(`/user/${itemId}`)
}

function onNavNavigate(index: number) {
  if (index === 0) router.push('/booking')
  if (index === 1) router.push('/contact')
}
</script>

<template>
  <div class="user-page">
    <BannerPrincipal :size="size" />
    <main class="user-page__main">
      <CUserMenu
        :size="size"
        :is-admin="true"
        @menu-item-click="onMenuItemClick"
      />
    </main>
    <NavBottom
      :size="size"
      :active-index="2"
      @navigate="onNavNavigate"
    />
  </div>
</template>

<style scoped>
.user-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fff;
}

.user-page__main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 16px 0;
}
</style>