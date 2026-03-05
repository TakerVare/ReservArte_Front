<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../stores/auth.store'
import CLocaleSwitcher from '../components/c_localeSwitcher.vue'
import c_bottomNavBar from '../components/c_bottomNavBar.vue'
import { useViewportSize } from '../composables/useViewportSize'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const { t } = useI18n()
const { size } = useViewportSize()

/** Clave i18n del título según la ruta */
const headerTitleKey = computed(() => {
  const keyMap: Record<string, string> = {
    'admin-customers': 'admin.customers',
    'admin-new-customer': 'admin.newCustomer',
    'admin-edit-customer': 'admin.editCustomer',
    'admin-employees': 'admin.employees',
    'admin-new-employee': 'admin.newEmployee',
    'admin-edit-employee': 'admin.editEmployee',
    'admin-services': 'admin.services',
    'admin-new-service': 'admin.newService',
    'admin-edit-service': 'admin.editService',
    'admin-bookings': 'admin.bookings',
    'admin-new-booking': 'admin.newBooking',
    'admin-edit-booking': 'admin.editBooking',
  }
  return keyMap[route.name as string] ?? 'admin.title'
})

const headerTitle = computed(() => t(headerTitleKey.value))

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

/** Índice activo del nav bottom: 0 = Inicio, 1 = Ubicación, 2 = Perfil. En admin no coincide con ruta pública. */
const activeNavIndex = computed(() => 0)

function onNavNavigate(index: number) {
  switch (index) {
    case 0:
      router.push({ name: 'home' })
      break
    case 1:
      router.push({ name: 'contact' })
      break
    case 2:
      router.push({ name: 'user' })
      break
  }
}
</script>

<script lang="ts">
export default {
  name: 'AdminLayout',
}
</script>

<template>
  <div class="admin-layout">

    <header class="admin-layout__header">
      <div class="admin-layout__header-inner">
        <div class="admin-layout__header-actions">
          <button class="admin-layout__back-btn" @click="goBack">
            ← {{ t('common.back') }}
          </button>
          <button class="admin-layout__panel-btn" @click="goToPanel">
            {{ t('admin.panel') }}
          </button>
        </div>

        <span class="admin-layout__title">{{ headerTitle }}</span>

        <div class="admin-layout__header-actions">
          <CLocaleSwitcher />
          <button class="admin-layout__logout-btn" @click="logout">
            {{ t('auth.logout') }}
          </button>
        </div>
      </div>
    </header>

    <main class="admin-layout__main">
      <router-view />
    </main>

    <c_bottomNavBar :size="size" :active-index="activeNavIndex" @navigate="onNavNavigate" />
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
</style>