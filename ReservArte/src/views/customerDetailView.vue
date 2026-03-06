<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import CUserDetailManagement from '../components/c_userDetailManagement.vue'
import CInputField from '../components/c_inputField.vue'
import CSelectField from '../components/c_selectField.vue'
import type { UserFormData } from '../components/c_userDetailManagement.vue'
import { useAuthStore } from '../stores/auth.store'
import { useViewportSize } from '../composables/useViewportSize'
import i18n from '../i18n'

const CUSTOMER_API_URL = '/api/Customer'

/** Valores aceptados para preferredContactMethod */
const PREFERRED_CONTACT_VALUES = ['Email', 'WhatsApp', 'SMS'] as const

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const { t } = useI18n()
const { size } = useViewportSize()

/** true si el usuario logueado es cliente (no admin/employee) */
const isCustomer = computed(() => authStore.user?.role === 'user')

/** Id del cliente en edición; undefined en creación */
const customerId = computed(() => {
  const id = route.params.id
  if (id === undefined || id === 'new' || id === '') return undefined
  return String(id)
})

const isEditMode = computed(() => !!customerId.value)

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
const uploadingAvatar = ref(false)

/** Campos extra solo para cliente (API Customer) */
const birthDate = ref('')
const preferredContactMethod = ref<string>('Email')
const marketingConsent = ref(false)

/** Opciones de categoría de cliente (mapeo API: category) */
const categoryOptions = computed(() => [
  { label: t('options.regular'), value: 'regular' },
  { label: t('options.vip'), value: 'vip' },
])

const estadoOptions = computed(() => [
  { label: t('options.active'), value: 'activo' },
  { label: t('options.inactive'), value: 'inactivo' },
])

const preferredContactOptions = computed(() => [
  { label: t('options.email'), value: 'Email' },
  { label: t('options.whatsapp'), value: 'WhatsApp' },
  { label: t('options.sms'), value: 'SMS' },
])

/** Tamaño de campos extra (alineado con el componente) */
const fieldSize = computed(() => (size.value === 'SM' || size.value === 'XS' ? 'SM' : 'MD'))

/** Mapea respuesta API de cliente al formulario y campos extra */
function applyApiCustomerToForm(c: {
  firstName?: string
  lastName?: string
  fullName?: string
  email: string
  phone: string
  category: string
  isBlocked: boolean
  birthDate?: string | null
  preferredContactMethod?: string | null
  marketingConsent?: boolean
  profileImageUrl?: string | null
}) {
  const firstName = c.firstName ?? (c.fullName ? c.fullName.trim().split(/\s+/)[0] : '') ?? ''
  const lastName = c.lastName ?? (c.fullName ? c.fullName.trim().split(/\s+/).slice(1).join(' ') : '') ?? ''
  formData.value = {
    nombre: firstName,
    apellidos: lastName,
    email: c.email ?? '',
    telefono: c.phone ?? '',
    rol: (c.category ?? 'regular').toLowerCase(),
    estado: c.isBlocked ? 'inactivo' : 'activo',
  }
  birthDate.value = c.birthDate ? c.birthDate.slice(0, 10) : ''
  preferredContactMethod.value = c.preferredContactMethod && PREFERRED_CONTACT_VALUES.includes(c.preferredContactMethod as typeof PREFERRED_CONTACT_VALUES[number])
    ? c.preferredContactMethod
    : 'Email'
  marketingConsent.value = c.marketingConsent ?? false
  avatarUrl.value = c.profileImageUrl ?? null
}

async function fetchCustomer(id: string) {
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
    applyApiCustomerToForm(data)
  } catch {
    error.value = i18n.global.t('customer.errors.connection')
  } finally {
    loading.value = false
  }
}

function resetForm() {
  formData.value = {
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    rol: 'regular',
    estado: 'activo',
  }
  birthDate.value = ''
  preferredContactMethod.value = 'Email'
  marketingConsent.value = false
  avatarUrl.value = null
  error.value = ''
}

onMounted(() => {
  if (customerId.value) {
    fetchCustomer(customerId.value)
  } else {
    resetForm()
  }
})

watch(customerId, (newId) => {
  if (newId) fetchCustomer(newId)
  else resetForm()
})

const pageTitle = computed(() =>
  isCustomer.value
    ? t('menu.userData')
    : isEditMode.value ? t('admin.editCustomer') : t('admin.newCustomer')
)

function onBack() {
  if (isCustomer.value) {
    router.push({ name: 'user' })
  } else {
    router.push({ name: 'admin-customers' })
  }
}

function onDelete() {
  if (!customerId.value) return
  console.log('Eliminar cliente:', customerId.value)
  router.push({ name: 'admin-customers' })
}

function onAvatarDelete() {
  avatarUrl.value = null
}

/** Sube la imagen de perfil al endpoint POST /api/Customer/:id/profile-image */
async function onAvatarUpload(file: File) {
  const id = customerId.value
  if (!id) return

  const token = authStore.token
  if (!token) {
    error.value = i18n.global.t('customer.errors.noSession')
    return
  }

  uploadingAvatar.value = true
  error.value = ''

  try {
    const formDataUpload = new FormData()
    formDataUpload.append('file', file)

    const response = await fetch(`${CUSTOMER_API_URL}/${id}/profile-image`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formDataUpload,
    })

    if (!response.ok) {
      const text = await response.text()
      error.value = text || i18n.global.t('customer.errors.saveFailedStatus', { status: response.status })
      return
    }

    const data = await response.json()
    // El backend devuelve { message, customer } — actualizamos la URL del avatar
    avatarUrl.value = data.customer?.profileImageUrl ?? avatarUrl.value
  } catch {
    error.value = i18n.global.t('customer.errors.connection')
  } finally {
    uploadingAvatar.value = false
  }
}

function buildCustomerPayload() {
  const birth = birthDate.value.trim()
  return {
    firstName: formData.value.nombre.trim(),
    lastName: formData.value.apellidos.trim(),
    email: formData.value.email.trim(),
    phone: formData.value.telefono.trim(),
    profileImageUrl: avatarUrl.value && avatarUrl.value.trim() !== '' ? avatarUrl.value.trim() : null,
    birthDate: birth ? `${birth}T00:00:00.000Z` : new Date().toISOString(),
    preferredContactMethod: preferredContactMethod.value,
    marketingConsent: marketingConsent.value,
  }
}

async function onSave() {
  error.value = ''
  const token = authStore.token
  if (!token) {
    error.value = i18n.global.t('customer.errors.noSession')
    return
  }
  const payload = buildCustomerPayload()
  try {
    if (isEditMode.value && customerId.value) {
      const response = await fetch(`${CUSTOMER_API_URL}/${customerId.value}`, {
        method: 'PUT',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })
      if (!response.ok) {
        const text = await response.text()
        error.value = text || i18n.global.t('customer.errors.saveFailedStatus', { status: response.status })
        return
      }
    } else {
      const response = await fetch(CUSTOMER_API_URL, {
        method: 'POST',
        headers: {
          accept: 'text/plain',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })
      if (!response.ok) {
        const text = await response.text()
        error.value = text || i18n.global.t('customer.errors.saveFailedStatus', { status: response.status })
        return
      }
    }
    // Redirigir según rol
    if (isCustomer.value) {
      router.push({ name: 'user' })
    } else {
      router.push({ name: 'admin-customers' })
    }
  } catch {
    error.value = i18n.global.t('customer.errors.connection')
  }
}

function onCancel() {
  if (isCustomer.value) {
    router.push({ name: 'user' })
  } else {
    router.push({ name: 'admin-customers' })
  }
}

function onUpdateFormData(data: UserFormData) {
  formData.value = data
}
</script>

<script lang="ts">
export default {
  name: 'CustomerDetailView',
}
</script>

<template>
  <div class="customer-detail-view">
    <p v-if="error" class="customer-detail-view__error">{{ error }}</p>
    <CUserDetailManagement
      v-else
      :size="size"
      :title="pageTitle"
      :form-title="t('form.customerData')"
      :form-data="formData"
      :rol-options="categoryOptions"
      :estado-options="estadoOptions"
      :show-delete-button="isEditMode && !isCustomer"
      :hide-role-status="isCustomer"
      :avatar-url="avatarUrl ?? ''"
      @back="onBack"
      @delete="onDelete"
      @update:form-data="onUpdateFormData"
      @save="onSave"
      @cancel="onCancel"
      @avatar-upload="onAvatarUpload"
      @avatar-delete="onAvatarDelete"
    >
      <template #extra-fields>
        <p v-if="uploadingAvatar" class="customer-detail-view__uploading">
          {{ t('actions.uploadImage') }}...
        </p>
        <CInputField
          v-model="birthDate"
          :label="t('form.birthDate')"
          type="date"
          :size="fieldSize"
          :placeholder="t('form.datePlaceholder')"
        />
        <CSelectField
          v-model="preferredContactMethod"
          :label="t('form.preferredContact')"
          :options="preferredContactOptions"
          :size="fieldSize"
        />
        <div class="customer-detail-view__checkbox-wrap">
          <input
            id="customer-marketing-consent"
            v-model="marketingConsent"
            type="checkbox"
            class="customer-detail-view__checkbox"
          />
          <label for="customer-marketing-consent" class="customer-detail-view__checkbox-label">
            {{ t('form.marketingConsent') }}
          </label>
        </div>
      </template>
    </CUserDetailManagement>
    <p v-if="loading" class="customer-detail-view__loading">{{ t('customer.loading') }}</p>
  </div>
</template>

<style scoped>
.customer-detail-view {
  width: 100%;
  position: relative;
}

.customer-detail-view__error {
  color: #b71c1c;
  padding: 1rem;
  margin: 0;
}

.customer-detail-view__uploading {
  color: #888;
  font-size: 14px;
  font-family: Roboto, system-ui, sans-serif;
  margin: 0;
}

.customer-detail-view__checkbox-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
}

.customer-detail-view__checkbox {
  width: 18px;
  height: 18px;
  margin: 0;
  accent-color: #2c2c2c;
  cursor: pointer;
}

.customer-detail-view__checkbox-label {
  margin: 0;
  font-family: Roboto, system-ui, sans-serif;
  font-size: 16px;
  color: #1e1e1e;
  cursor: pointer;
}

.customer-detail-view__loading {
  position: absolute;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  color: #666;
}
</style>