<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import CUserDetailManagement from '../components/c_userDetailManagement.vue'
import type { UserFormData } from '../components/c_userDetailManagement.vue'
import { useAuthStore } from '../stores/auth.store'
import { useViewportSize } from '../composables/useViewportSize'

const EMPLOYEE_API_URL = 'http://localhost:5297/api/Employee'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
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
const rolOptions = [
  { label: 'Empleado', value: 'empleado' },
  { label: 'Administrador', value: 'admin' },
]

const estadoOptions = [
  { label: 'Activo', value: 'activo' },
  { label: 'Inactivo', value: 'inactivo' },
]

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
    error.value = 'No hay sesión activa.'
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
      error.value = `Error ${response.status}. No se pudo cargar el empleado.`
      loading.value = false
      return
    }
    const data = await response.json()
    applyApiEmployeeToForm(data)
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
  isEditMode.value ? 'Editar Empleado' : 'Nuevo Empleado'
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
    error.value = 'No hay sesión activa.'
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
        error.value = text || `Error ${response.status}. No se pudo actualizar el empleado.`
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
        error.value = text || `Error ${response.status}. No se pudo crear el empleado.`
        return
      }
    }
    router.push({ name: 'admin-employees' })
  } catch {
    error.value = 'No se pudo conectar con el servidor.'
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
      form-title="Datos del empleado"
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
    <p v-if="loading" class="employee-detail-view__loading">Cargando...</p>
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
