<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import CUserDetailManagement from '../components/c_userDetailManagement.vue'
import type { UserFormData } from '../components/c_userDetailManagement.vue'
import { useAuthStore } from '../stores/auth.store'
import { useViewportSize } from '../composables/useViewportSize'
import i18n from '../i18n'

const CUSTOMER_API_URL = '/api/Customer'

const router = useRouter()
const authStore = useAuthStore()
const { t } = useI18n()
const { size } = useViewportSize()

const formData = ref<UserFormData>({
  nombre: '',
  apellidos: '',
  email: '',
  telefono: '',
  rol: 'regular',
  estado: 'activo',
})

const loading = ref(false)
const error = ref('')
const avatarUrl = ref<string | null>(null)

async function fetchCustomer() {
  const id = authStore.user?.id
  if (!id) return

  loading.value = true
  error.value = ''
  const token = authStore.token
  if (!token) {
    error.value = i18n.global.t('customer.errors.noSession')
    loading.value = false
    return
  }
  try {
    const response = await fetch(`${CUSTOMER_API_URL}/${id}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      error.value = i18n.global.t('customer.errors.loadOneFailedStatus', { status: response.status })
      loading.value = false
      return
    }
    const data = await response.json()
    const firstName = data.firstName ?? (data.fullName ? data.fullName.trim().split(/\s+/)[0] : '') ?? ''
    const lastName = data.lastName ?? (data.fullName ? data.fullName.trim().split(/\s+/).slice(1).join(' ') : '') ?? ''
    formData.value = {
      nombre: firstName,
      apellidos: lastName,
      email: data.email ?? '',
      telefono: data.phone ?? '',
      rol: (data.category ?? 'regular').toLowerCase(),
      estado: data.isBlocked ? 'inactivo' : 'activo',
    }
    avatarUrl.value = data.profileImageUrl ?? null
  } catch {
    error.value = i18n.global.t('customer.errors.connection')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchCustomer()
})

const pageTitle = computed(() => t('menu.userData'))

function onBack() {
  router.push({ name: 'user' })
}
</script>

<script lang="ts">
export default {
  name: 'ProfileView',
}
</script>

<template>
  <div class="profile-view">
    <p v-if="error" class="profile-view__error">{{ error }}</p>
    <CUserDetailManagement
      v-else
      :size="size"
      :title="pageTitle"
      :form-title="t('form.customerData')"
      :form-data="formData"
      :show-delete-button="false"
      :avatar-url="avatarUrl ?? ''"
      :readonly="true"
      @back="onBack"
    />
    <p v-if="loading" class="profile-view__loading">{{ t('customer.loading') }}</p>
  </div>
</template>

<style scoped>
.profile-view {
  width: 100%;
  position: relative;
}

.profile-view__error {
  color: #b71c1c;
  padding: 1rem;
  margin: 0;
}

.profile-view__loading {
  position: absolute;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  color: #666;
}
</style>