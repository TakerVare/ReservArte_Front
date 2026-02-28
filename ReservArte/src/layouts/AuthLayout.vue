<script setup lang="ts">
</script>

<script lang="ts">
export default {
  name: 'AuthLayout',
}
</script>

<template>
  <div class="auth-layout">
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
}

.auth-layout__main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
</style>