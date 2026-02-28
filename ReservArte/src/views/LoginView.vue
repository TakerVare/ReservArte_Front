<script setup lang="ts">
import { useRouter } from 'vue-router'
import CLoginForm from '../components/c_loginForm.vue'
import { useViewportSize } from '../composables/useViewportSize'

const router = useRouter()
const { size } = useViewportSize()

function onLoginSubmit(payload: { email: string; password: string; acceptTerms: boolean }) {
  console.log('Login:', payload)
}

function onLoginSuccess() {
  router.push({ name: 'home' })
}

function onLoginError() {
  // El formulario ya muestra el mensaje de error
}
</script>

<script lang="ts">
export default {
  name: 'LoginView',
}
</script>

<template>
  <CLoginForm
    :size="size"
    @submit="onLoginSubmit"
    @success="onLoginSuccess"
    @error="onLoginError"
  />
</template>