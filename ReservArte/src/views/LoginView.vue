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

function onRegisterSuccess() {
  // Registro exitoso: el formulario vuelve a modo login automáticamente
  // El usuario solo tiene que iniciar sesión con las credenciales que acaba de crear
  console.log('Registro exitoso')
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
    @register-success="onRegisterSuccess"
  />
</template>