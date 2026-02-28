<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import CUserDetailManagement from '../components/c_userDetailManagement.vue'
import CInputField from '../components/c_inputField.vue'
import CSelectField from '../components/c_selectField.vue'
import type { UserFormData } from '../components/c_userDetailManagement.vue'
import { useAuthStore } from '../stores/auth.store'
import { useViewportSize } from '../composables/useViewportSize'

const CUSTOMER_API_URL = 'http://localhost:5297/api/Customer'

/** Valores aceptados para preferredContactMethod */
const PREFERRED_CONTACT_VALUES = ['Email', 'WhatsApp', 'SMS'] as const

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const { size } = useViewportSize()

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

/** Campos extra solo para cliente (API Customer) */
const birthDate = ref('')
const preferredContactMethod = ref<string>('Email')
const marketingConsent = ref(false)

/** Opciones de categoría de cliente (mapeo API: category) */
const categoryOptions = [
  { label: 'Regular', value: 'regular' },
  { label: 'VIP', value: 'vip' },
]

const estadoOptions = [
  { label: 'Activo', value: 'activo' },
  { label: 'Inactivo', value: 'inactivo' },
]

const preferredContactOptions = [
  { label: 'Email', value: 'Email' },
  { label: 'WhatsApp', value: 'WhatsApp' },
  { label: 'SMS', value: 'SMS' },
]

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
    error.value = 'No hay sesión activa.'
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
      error.value = `Error ${response.status}. No se pudo cargar el cliente.`
      loading.value = false
      return
    }
    const data = await response.json()
    applyApiCustomerToForm(data)
  } catch {
    error.value = 'No se pudo conectar con el servidor.'
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
  if (newId) {
    fetchCustomer(newId)
  } else {
    resetForm()
  }
})

const pageTitle = computed(() =>
  isEditMode.value ? 'Editar Cliente' : 'Nuevo Cliente'
)

function onBack() {
  router.push({ name: 'admin-customers' })
}

function onDelete() {
  // TODO: confirmar y llamar DELETE /api/Customer/:id
  if (!customerId.value) return
  console.log('Eliminar cliente:', customerId.value)
  router.push({ name: 'admin-customers' })
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
    error.value = 'No hay sesión activa.'
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
        error.value = text || `Error ${response.status}. No se pudo actualizar el cliente.`
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
        error.value = text || `Error ${response.status}. No se pudo crear el cliente.`
        return
      }
    }
    router.push({ name: 'admin-customers' })
  } catch {
    error.value = 'No se pudo conectar con el servidor.'
  }
}

function onCancel() {
  router.push({ name: 'admin-customers' })
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
      form-title="Datos del cliente"
      :form-data="formData"
      :rol-options="categoryOptions"
      :estado-options="estadoOptions"
      :show-delete-button="isEditMode"
      :avatar-url="avatarUrl ?? ''"
      @back="onBack"
      @delete="onDelete"
      @update:form-data="onUpdateFormData"
      @save="onSave"
      @cancel="onCancel"
    >
      <template #extra-fields>
        <CInputField
          v-model="birthDate"
          label="Fecha de nacimiento"
          type="date"
          :size="fieldSize"
          placeholder="YYYY-MM-DD"
        />
        <CSelectField
          v-model="preferredContactMethod"
          label="Método de contacto preferido"
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
            Acepto recibir comunicaciones de marketing
          </label>
        </div>
      </template>
    </CUserDetailManagement>
    <p v-if="loading" class="customer-detail-view__loading">Cargando...</p>
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
