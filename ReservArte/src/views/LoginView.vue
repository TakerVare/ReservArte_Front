<script setup lang="ts">
import { useRouter } from 'vue-router'
import BannerPrincipal from '../components/c_bannerPrincipal.vue'
import CLoginForm from '../components/c_loginForm.vue'
import NavBottom from '../components/c_bottomNavBar.vue'
import { useViewportSize } from '../composables/useViewportSize'

const router = useRouter()
const { size } = useViewportSize()

function onLoginSubmit(payload: { email: string; password: string; acceptTerms: boolean }) {
  console.log('Login:', payload)
}

function onLoginSuccess() {
  router.push('/')
}

function onLoginError() {
  // El formulario ya muestra el mensaje de error
}

function onNavNavigate(index: number) {
  if (index === 0) router.push('/')
  // index 1: Ubicación, index 2: Perfil — definir rutas cuando existan
}
</script>

<template>
  <div class="login-page">
    <BannerPrincipal :size="size" />
    <main class="login-page__main">
      <CLoginForm
        :size="size"
        @submit="onLoginSubmit"
        @success="onLoginSuccess"
        @error="onLoginError"
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
.login-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fff;
}

.login-page__main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
</style>