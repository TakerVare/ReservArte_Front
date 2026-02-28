<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BannerPrincipal from '../components/c_bannerPrincipal.vue'
import CNewUser from '../components/c_newUser.vue'
import NavBottom from '../components/c_bottomNavBar.vue'
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
  router.push('/user/management')
}

function onDelete() {
  alert('Eliminar usuario')
}

function onAvatarCamera() {
  alert('Abrir cámara')
}

function onAvatarUpload() {
  alert('Subir imagen')
}

function onAvatarDelete() {
  avatarUrl.value = ''
}

function onSave() {
  alert('Guardar: ' + JSON.stringify(formData.value))
}

function onCancel() {
  router.push('/user/management')
}

function onNavNavigate(index: number) {
  if (index === 0) router.push('/booking')
  if (index === 1) router.push('/contact')
  if (index === 2) router.push('/user')
}
</script>

<script lang="ts">
export default {
  name: 'NewUserView',
}
</script>

<template>
  <div class="new-user-page">
    <BannerPrincipal :size="size" />
    <main class="new-user-page__main">
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
    </main>
    <NavBottom
      :size="size"
      :active-index="2"
      @navigate="onNavNavigate"
    />
  </div>
</template>

<style scoped>
.new-user-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fff;
}

.new-user-page__main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
}
</style>