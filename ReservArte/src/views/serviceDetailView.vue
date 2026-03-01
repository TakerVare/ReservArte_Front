<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import CServiceDetailManagement from '../components/c_serviceDetailManagement.vue'
import type { ServiceFormData } from '../components/c_serviceDetailManagement.vue'
import { useAuthStore } from '../stores/auth.store'
import { useViewportSize } from '../composables/useViewportSize'
import i18n from '../i18n'

const SERVICE_API_URL = 'http://localhost:5297/api/Service'
const CATEGORIES_API_URL = 'http://localhost:5297/api/Service/categories'

type ServiceCategory = {
  id: number
  name: string
  description?: string
  color?: string
  displayOrder?: number
  isActive?: boolean
  createdAt?: string
}

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const { t } = useI18n()
const { size } = useViewportSize()

const serviceId = computed(() => {
  const id = route.params.id
  if (id === undefined || id === 'new' || id === '') return undefined
  return String(id)
})

const isEditMode = computed(() => !!serviceId.value)

const formData = ref<ServiceFormData>({
  name: '',
  description: '',
  durationMinutes: '',
  basePrice: '',
  categoryName: '',
  imageUrl: '',
  isActive: true,
  requiresAllergyTest: false,
})

const categories = ref<ServiceCategory[]>([])
const loading = ref(false)
const error = ref('')

const categoriesSorted = computed(() =>
  [...categories.value].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
)

function applyApiServiceToForm(s: {
  name: string
  description?: string | null
  durationMinutes?: number
  basePrice?: number
  categoryName?: string | null
  imageUrl?: string | null
  isActive?: boolean
  requiresAllergyTest?: boolean
}) {
  formData.value = {
    name: s.name ?? '',
    description: s.description ?? '',
    durationMinutes: s.durationMinutes != null ? String(s.durationMinutes) : '',
    basePrice: s.basePrice != null ? String(s.basePrice) : '',
    categoryName: s.categoryName ?? '',
    imageUrl: s.imageUrl ?? '',
    isActive: s.isActive !== false,
    requiresAllergyTest: s.requiresAllergyTest === true,
  }
}

async function fetchService(id: string) {
  loading.value = true
  error.value = ''
  const token = authStore.token
  if (!token) {
    error.value = i18n.global.t('service.errors.noSession')
    loading.value = false
    return
  }
  try {
    const response = await fetch(`${SERVICE_API_URL}/${id}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      error.value = i18n.global.t('service.errors.loadOneFailedStatus', { status: response.status })
      loading.value = false
      return
    }
    const data = await response.json()
    applyApiServiceToForm(data)
  } catch {
    error.value = i18n.global.t('service.errors.connection')
  } finally {
    loading.value = false
  }
}

async function fetchCategories() {
  const token = authStore.token
  if (!token) return
  try {
    const response = await fetch(CATEGORIES_API_URL, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) return
    const data = await response.json()
    categories.value = Array.isArray(data) ? data : []
  } catch {
    categories.value = []
  }
}

function resetForm() {
  formData.value = {
    name: '',
    description: '',
    durationMinutes: '',
    basePrice: '',
    categoryName: '',
    imageUrl: '',
    isActive: true,
    requiresAllergyTest: false,
  }
  error.value = ''
}

onMounted(() => {
  fetchCategories()
  if (serviceId.value) {
    fetchService(serviceId.value)
  } else {
    resetForm()
  }
})

watch(serviceId, (newId) => {
  if (newId) {
    fetchService(newId)
  } else {
    resetForm()
  }
})

const pageTitle = computed(() =>
  isEditMode.value ? t('admin.editService') : t('admin.newService')
)

function onBack() {
  router.push({ name: 'admin-services' })
}

async function onDelete() {
  if (!serviceId.value) return
  if (!confirm('¿Eliminar este servicio? Esta acción no se puede deshacer.')) return
  const token = authStore.token
  if (!token) {
    error.value = i18n.global.t('service.errors.noSession')
    return
  }
  error.value = ''
  try {
    const response = await fetch(`${SERVICE_API_URL}/${serviceId.value}`, {
      method: 'DELETE',
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      error.value = i18n.global.t('service.errors.deleteFailedStatus', { status: response.status })
      return
    }
    router.push({ name: 'admin-services' })
  } catch {
    error.value = i18n.global.t('service.errors.connection')
  }
}

function buildServicePayload() {
  return {
    name: formData.value.name.trim(),
    description: formData.value.description.trim() || null,
    durationMinutes: formData.value.durationMinutes.trim() ? parseInt(formData.value.durationMinutes, 10) : 0,
    basePrice: formData.value.basePrice.trim() ? parseFloat(formData.value.basePrice) : 0,
    categoryName: formData.value.categoryName.trim() || null,
    imageUrl: formData.value.imageUrl.trim() || null,
    isActive: formData.value.isActive,
    requiresAllergyTest: formData.value.requiresAllergyTest,
  }
}

async function onSave() {
  error.value = ''
  const token = authStore.token
  if (!token) {
    error.value = i18n.global.t('service.errors.noSession')
    return
  }
  const payload = buildServicePayload()
  try {
    if (isEditMode.value && serviceId.value) {
      const response = await fetch(`${SERVICE_API_URL}/${serviceId.value}`, {
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
        error.value = text || i18n.global.t('service.errors.saveFailedStatus', { status: response.status })
        return
      }
    } else {
      const response = await fetch(SERVICE_API_URL, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })
      if (!response.ok) {
        const text = await response.text()
        error.value = text || i18n.global.t('service.errors.saveFailedStatus', { status: response.status })
        return
      }
    }
    router.push({ name: 'admin-services' })
  } catch {
    error.value = i18n.global.t('service.errors.connection')
  }
}

function onCancel() {
  router.push({ name: 'admin-services' })
}

function onUpdateFormData(data: ServiceFormData) {
  formData.value = data
}
</script>

<script lang="ts">
export default {
  name: 'ServiceDetailView',
}
</script>

<template>
  <div class="service-detail-view">
    <p v-if="error" class="service-detail-view__error">{{ error }}</p>
    <CServiceDetailManagement
      v-else
      :size="size"
      :title="pageTitle"
      :form-title="t('form.serviceData')"
      :form-data="formData"
      :categories="categoriesSorted"
      :show-delete-button="isEditMode"
      @back="onBack"
      @delete="onDelete"
      @update:form-data="onUpdateFormData"
      @save="onSave"
      @cancel="onCancel"
    />
    <p v-if="loading" class="service-detail-view__loading">{{ t('service.loading') }}</p>
  </div>
</template>

<style scoped>
.service-detail-view {
  width: 100%;
  position: relative;
}
.service-detail-view__error {
  color: #b71c1c;
  padding: 1rem;
  margin: 0;
}
.service-detail-view__loading {
  position: absolute;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  color: #666;
}
</style>
