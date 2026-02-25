<script setup lang="ts">
import { useRouter } from 'vue-router'
import BannerPrincipal from '../components/c_bannerPrincipal.vue'
import CContactMap from '../components/c_contactMap.vue'
import CContactInfo from '../components/c_contactinfo.vue'
import NavBottom from '../components/c_bottomNavBar.vue'
import { useViewportSize } from '../composables/useViewportSize'

const router = useRouter()
const { size } = useViewportSize()

function onNavNavigate(index: number) {
  if (index === 0) router.push('/')
  // index 1: Ubicación, index 2: Perfil — definir rutas cuando existan
}
</script>

<template>
  <div class="contact-page">
    <BannerPrincipal :size="size" />
    <main class="contact-page__main">
      <CContactMap :size="size" />
      <CContactInfo :size="size" />
    </main>
    <NavBottom
      :size="size"
      :active-index="1"
      @navigate="onNavNavigate"
    />
  </div>
</template>

<style scoped>
.contact-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fff;
}

.contact-page__main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
</style>