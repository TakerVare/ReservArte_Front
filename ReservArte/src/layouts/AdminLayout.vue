<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

/** Título dinámico del header según la ruta */
const headerTitle = computed(() => {
  const titles: Record<string, string> = {
    'admin-users': 'Gestión de Usuarios',
    'admin-new-user': 'Nuevo Usuario',
    'admin-edit-user': 'Editar Usuario',
    'admin-services': 'Gestión de Servicios',
    'admin-bookings': 'Gestión de Citas',
  }
  return titles[route.name as string] ?? 'Administración'
})

function goBack() {
  router.back()
}

function goToPanel() {
  router.push({ name: 'user' })
}

function logout() {
  authStore.logout()
  router.push({ name: 'login' })
}
</script>

<script lang="ts">
export default {
  name: 'AdminLayout',
}
</script>

<template>
  <div class="admin-layout">
    <!-- Header admin: distinto al público (sin banner logo, con nav admin) -->
    <header class="admin-layout__header">
      <div class="admin-layout__header-inner">
        <button
          class="admin-layout__back-btn"
          type="button"
          @click="goBack"
          aria-label="Volver"
        >
          ← Volver
        </button>
        <h1 class="admin-layout__title">{{ headerTitle }}</h1>
        <div class="admin-layout__header-actions">
          <button
            class="admin-layout__panel-btn"
            type="button"
            @click="goToPanel"
            aria-label="Panel"
          >
            Panel
          </button>
          <button
            class="admin-layout__logout-btn"
            type="button"
            @click="logout"
            aria-label="Cerrar sesión"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>

    <main class="admin-layout__main">
      <router-view />
    </main>

    <!-- Footer admin: distinto al público (sin nav con iconos) -->
    <footer class="admin-layout__footer">
      <div class="admin-layout__footer-inner">
        <span class="admin-layout__footer-text">
          Panel de Administración — ReservArte
        </span>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fff;
}

/* ---- Header admin ---- */
.admin-layout__header {
  width: 100%;
  background-color: #FFB6C1;
  border-bottom: 2px solid #f5a0ab;
}

.admin-layout__header-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  box-sizing: border-box;
}

.admin-layout__header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.admin-layout__title {
  margin: 0;
  font-family: Georgia, serif;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.5px;
}

.admin-layout__back-btn,
.admin-layout__panel-btn,
.admin-layout__logout-btn {
  background: none;
  border: 1px solid #fff;
  color: #fff;
  font-family: Georgia, serif;
  font-size: 14px;
  font-weight: 700;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 0;
  transition: background-color 0.2s;
}

.admin-layout__back-btn:hover,
.admin-layout__panel-btn:hover,
.admin-layout__logout-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

/* ---- Main ---- */
.admin-layout__main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

/* ---- Footer admin ---- */
.admin-layout__footer {
  width: 100%;
  background-color: #FFB6C1;
  border-top: 2px solid #f5a0ab;
}

.admin-layout__footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  box-sizing: border-box;
}

.admin-layout__footer-text {
  font-family: Georgia, serif;
  font-size: 14px;
  font-weight: 400;
  color: #fff;
  letter-spacing: 0.3px;
}
</style>