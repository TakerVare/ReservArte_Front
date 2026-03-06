<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import BannerPrincipal from '../components/c_bannerPrincipal.vue'
import CLocaleSwitcher from '../components/c_localeSwitcher.vue'
import c_bottomNavBar from '../components/c_bottomNavBar.vue'
import { useViewportSize } from '../composables/useViewportSize'

const router = useRouter()
const { size } = useViewportSize()

const activeNavIndex = computed(() => 0)

function onNavNavigate(index: number) {
  switch (index) {
    case 0: router.push({ name: 'home' }); break
    case 1: router.push({ name: 'contact' }); break
    case 2: router.push({ name: 'user' }); break
  }
}
</script>

<script lang="ts">
export default {
  name: 'AdminLayout',
}
</script>

<template>
  <div class="admin-layout">
    <div class="admin-layout__header-wrap">
      <BannerPrincipal :size="size" />
      <div class="admin-layout__locale">
        <CLocaleSwitcher />
      </div>
    </div>

    <main class="admin-layout__main">
      <router-view />
    </main>

    <c_bottomNavBar :size="size" :active-index="activeNavIndex" @navigate="onNavNavigate" />
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fff;
}

.admin-layout__header-wrap {
  position: relative;
}

.admin-layout__locale {
  position: absolute;
  top: 12px;
  right: 12px;
  color: #333;
}

.admin-layout__main {
  flex: 1;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
</style>