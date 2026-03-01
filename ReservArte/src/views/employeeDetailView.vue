<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import CUserDetailManagement from '../components/c_userDetailManagement.vue'
import type { UserFormData } from '../components/c_userDetailManagement.vue'
import { useAuthStore } from '../stores/auth.store'
import { useViewportSize } from '../composables/useViewportSize'
import i18n from '../i18n'

const EMPLOYEE_API_URL = '/api/Employee'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const { t } = useI18n()
const { size } = useViewportSize()

/** Id del empleado en edición; undefined en creación */
const employeeId = computed(() => {
  const id = route.params.id
  if (id === undefined || id === 'new' || id === '') return undefined
  return String(id)
})

const isEditMode = computed(() => !!employeeId.value)

const formData = ref<UserFormData>({
  nombre: '',
  apellidos: '',
  email: '',
  telefono: '',
  rol: 'empleado',
  estado: 'activo',
})

const loading = ref(false)
const error = ref('')
const avatarUrl = ref('')

/** Opciones de rol para empleados */
const rolOptions = computed(() => [
  { label: t('options.employee'), value: 'empleado' },
  { label: t('options.admin'), value: 'admin' },
])

const estadoOptions = computed(() => [
  { label: t('options.active'), value: 'activo' },
  { label: t('options.inactive'), value: 'inactivo' },
])

/** Mapea respuesta API de empleado al formulario (id, firstName, lastName, fullName, email, phone, profileImageUrl, hireDate, isActive) */
function applyApiEmployeeToForm(e: {
  firstName?: string
  lastName?: string
  fullName?: string
  email: string
  phone?: string | null
  profileImageUrl?: string | null
  isActive?: boolean
}) {
  const firstName = e.firstName ?? (e.fullName ? e.fullName.trim().split(/\s+/)[0] : '') ?? ''
  const lastName = e.lastName ?? (e.fullName ? e.fullName.trim().split(/\s+/).slice(1).join(' ') : '') ?? ''
  formData.value = {
    nombre: firstName,
    apellidos: lastName,
    email: e.email ?? '',
    telefono: e.phone ?? '',
    rol: 'empleado',
    estado: e.isActive === false ? 'inactivo' : 'activo',
  }
  avatarUrl.value = e.profileImageUrl ?? ''
}

async function fetchEmployee(id: string) {
  loading.value = true
  error.value = ''
  const token = authStore.token
  if (!token) {
    error.value = i18n.global.t('employee.errors.noSession')
    loading.value = false
    return
  }
  try {
    const response = await fetch(`${EMPLOYEE_API_URL}/${id}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      error.value = i18n.global.t('employee.errors.loadOneFailedStatus', { status: response.status })
      loading.value = false
      return
    }
    const data = await response.json()
    applyApiEmployeeToForm(data)
  } catch {
    error.value = i18n.global.t('employee.errors.connection')
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
    rol: 'empleado',
    estado: 'activo',
  }
  avatarUrl.value = ''
  error.value = ''
}

onMounted(() => {
  if (employeeId.value) {
    fetchEmployee(employeeId.value)
  } else {
    resetForm()
  }
})

watch(employeeId, (newId) => {
  if (newId) {
    fetchEmployee(newId)
  } else {
    resetForm()
  }
})

const pageTitle = computed(() =>
  isEditMode.value ? t('admin.editEmployee') : t('admin.newEmployee')
)

function onBack() {
  router.push({ name: 'admin-employees' })
}

function onDelete() {
  if (!employeeId.value) return
  // TODO: confirmar y llamar DELETE /api/Employee/:id
  router.push({ name: 'admin-employees' })
}

function buildEmployeePayload() {
  return {
    firstName: formData.value.nombre.trim(),
    lastName: formData.value.apellidos.trim(),
    email: formData.value.email.trim(),
    phone: formData.value.telefono.trim(),
    profileImageUrl: avatarUrl.value && avatarUrl.value.trim() !== '' ? avatarUrl.value.trim() : null,
    hireDate: null,
    isActive: formData.value.estado === 'activo',
  }
}

async function onSave() {
  error.value = ''
  const token = authStore.token
  if (!token) {
    error.value = i18n.global.t('employee.errors.noSession')
    return
  }
  const payload = buildEmployeePayload()
  try {
    if (isEditMode.value && employeeId.value) {
      const response = await fetch(`${EMPLOYEE_API_URL}/${employeeId.value}`, {
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
        error.value = text || i18n.global.t('employee.errors.saveFailedStatus', { status: response.status })
        return
      }
    } else {
      const response = await fetch(EMPLOYEE_API_URL, {
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
        error.value = text || i18n.global.t('employee.errors.saveFailedStatus', { status: response.status })
        return
      }
    }
    router.push({ name: 'admin-employees' })
  } catch {
    error.value = i18n.global.t('employee.errors.connection')
  }
}

function onCancel() {
  router.push({ name: 'admin-employees' })
}

function onUpdateFormData(data: UserFormData) {
  formData.value = data
}
</script>

<script lang="ts">
export default {
  name: 'EmployeeDetailView',
}
</script>

<template>
  <div class="employee-detail-view">
    <p v-if="error" class="employee-detail-view__error">{{ error }}</p>
    <CUserDetailManagement
      v-else
      :size="size"
      :title="pageTitle"
      :form-title="t('form.employeeData')"
      :form-data="formData"
      :rol-options="rolOptions"
      :estado-options="estadoOptions"
      :show-delete-button="isEditMode"
      :avatar-url="avatarUrl"
      @back="onBack"
      @delete="onDelete"
      @update:form-data="onUpdateFormData"
      @save="onSave"
      @cancel="onCancel"
    />
    <p v-if="loading" class="employee-detail-view__loading">{{ t('employee.loading') }}</p>
  </div>
</template>

<style scoped>
.employee-detail-view {
  width: 100%;
  position: relative;
}

.employee-detail-view__error {
  color: #b71c1c;
  padding: 1rem;
  margin: 0;
}

.employee-detail-view__loading {
  position: absolute;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  color: #666;
}
</style>
