<script setup lang="ts">
import CLocaleSwitcher from '../components/c_localeSwitcher.vue'
</script>

<script lang="ts">
export default {
  name: 'AuthLayout',
}
</script>

<template>
  <div class="auth-layout">
    <div class="auth-layout__locale">
      <CLocaleSwitcher />
    </div>
    <main class="auth-layout__main">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.auth-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fff;
  position: relative;
}

.auth-layout__locale {
  position: absolute;
  top: 12px;
  right: 12px;
  color: #333;
  z-index: 10;
}

.auth-layout__main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
</style>