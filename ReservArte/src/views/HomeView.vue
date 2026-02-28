<script setup lang="ts">
import { useRouter } from 'vue-router'
import CHeroSection from '../components/c_heroSection.vue'
import { useAuthStore } from '../stores/auth.store'
import { useViewportSize } from '../composables/useViewportSize'

const router = useRouter()
const authStore = useAuthStore()
const { size } = useViewportSize()

function onEnter() {
  if (authStore.isAuthenticated) {
    router.push({ name: 'booking' })
  } else {
    router.push({ name: 'login' })
  }
}
</script>

<script lang="ts">
export default {
  name: 'HomeView',
}
</script>

<template>
  <div class="home-view">
    <main class="home-view__main">
      <CHeroSection
        :size="size"
        @enter="onEnter"
      />
    </main>
  </div>
</template>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  background-color: #fff;
}

.home-view__main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}
</style>