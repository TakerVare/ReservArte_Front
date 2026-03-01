<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../stores/auth.store'
import CLocaleSwitcher from '../components/c_localeSwitcher.vue'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const { t } = useI18n()

/** Clave i18n del título según la ruta */
const headerTitleKey = computed(() => {
  const keyMap: Record<string, string> = {
    'admin-users': 'admin.users',
    'admin-new-user': 'admin.newUser',
    'admin-edit-user': 'admin.editUser',
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
          :aria-label="$t('common.back')"
        >
          ← {{ $t('common.back') }}
        </button>
        <h1 class="admin-layout__title">{{ headerTitle }}</h1>
        <div class="admin-layout__header-actions">
          <CLocaleSwitcher />
          <button
            class="admin-layout__panel-btn"
            type="button"
            @click="goToPanel"
            :aria-label="$t('admin.panel')"
          >
            {{ $t('admin.panel') }}
          </button>
          <button
            class="admin-layout__logout-btn"
            type="button"
            @click="logout"
            :aria-label="$t('admin.logout')"
          >
            {{ $t('admin.logout') }}
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
          {{ $t('admin.footer') }}
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