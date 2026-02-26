<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BannerPrincipal from '../components/c_bannerPrincipal.vue'
import CUserManagement from '../components/c_userManagement.vue'
import NavBottom from '../components/c_bottomNavBar.vue'
import { useViewportSize } from '../composables/useViewportSize'

const router = useRouter()
const { size } = useViewportSize()

const searchQuery = ref('')

const users = ref([
  { id: '1', name: 'Marcos Aguilar Fernández' },
  { id: '2', name: 'Elena Torres Delgado' },
  { id: '3', name: 'Rubén Castillo Moreno' },
  { id: '4', name: 'Paula Sánchez Robles' },
  { id: '5', name: 'Adriana López Carmona' },
])

function onBack() {
  router.push('/user')
}

function onNew() {
  alert('Nuevo usuario')
}

function onEditUser(userId: string) {
  alert(`Editar usuario: ${userId}`)
}

function onDeleteUser(userId: string) {
  alert(`Eliminar usuario: ${userId}`)
}

function onViewUser(userId: string) {
  alert(`Ver usuario: ${userId}`)
}

function onNavNavigate(index: number) {
  if (index === 0) router.push('/booking')
  if (index === 1) router.push('/contact')
  if (index === 2) router.push('/user')
}
</script>

<template>
  <div class="user-management-page">
    <BannerPrincipal :size="size" />
    <main class="user-management-page__main">
      <CUserManagement
        :size="size"
        title="Gestión de Usuarios"
        v-model:search-query="searchQuery"
        :users="users"
        @back="onBack"
        @new="onNew"
        @edit-user="onEditUser"
        @delete-user="onDeleteUser"
        @view-user="onViewUser"
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
.user-management-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fff;
}

.user-management-page__main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
}
</style>