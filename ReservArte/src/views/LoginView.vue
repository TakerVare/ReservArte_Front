<script setup lang="ts">
import { useRouter } from 'vue-router'
import CLoginForm from '../components/c_loginForm.vue'
import { useViewportSize } from '../composables/useViewportSize'

const router = useRouter()
const { size } = useViewportSize()

function onLoginSuccess() {
  router.push({ name: 'booking' })
}

function onLoginError() {
  // El formulario ya muestra el mensaje de error
}

function onRegisterSuccess() {
  // Registro exitoso: el formulario vuelve a modo login automáticamente
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
    @success="onLoginSuccess"
    @error="onLoginError"
    @register-success="onRegisterSuccess"
  />
</template>