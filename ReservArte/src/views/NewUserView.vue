<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CNewUser from '../components/c_newUser.vue'
import { useViewportSize } from '../composables/useViewportSize'
import type { UserFormData } from '../components/c_newUser.vue'

const router = useRouter()
const { size } = useViewportSize()

const formData = ref<UserFormData>({
  nombre: '',
  apellidos: '',
  email: '',
  telefono: '',
  rol: 'cliente',
  estado: 'activo',
})

const avatarUrl = ref('')

function onBack() {
  router.push({ name: 'admin-users' })
}

function onDelete() {
  // TODO: llamar al store para eliminar
  console.log('Eliminar usuario')
}

function onAvatarCamera() {
  // TODO: abrir cámara
  console.log('Abrir cámara')
}

function onAvatarUpload() {
  // TODO: abrir selector de archivos
  console.log('Subir imagen')
}

function onAvatarDelete() {
  avatarUrl.value = ''
}

function onSave() {
  // TODO: llamar al store para guardar
  console.log('Guardar:', JSON.stringify(formData.value))
  router.push({ name: 'admin-users' })
}

function onCancel() {
  router.push({ name: 'admin-users' })
}
</script>

<script lang="ts">
export default {
  name: 'NewUserView',
}
</script>

<template>
  <CNewUser
    :size="size"
    title="Nuevo Usuario"
    :avatar-url="avatarUrl"
    :form-data="formData"
    @back="onBack"
    @delete="onDelete"
    @avatar-camera="onAvatarCamera"
    @avatar-upload="onAvatarUpload"
    @avatar-delete="onAvatarDelete"
    @update:form-data="formData = $event"
    @save="onSave"
    @cancel="onCancel"
  />
</template>