<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import CNewUser from '../components/c_newUser.vue'
import { useViewportSize } from '../composables/useViewportSize'
import type { UserFormData } from '../components/c_newUser.vue'

const router = useRouter()
const { size } = useViewportSize()

// ─── Esquema Yup para nuevo usuario ───
const validationSchema = yup.object({
  nombre: yup
    .string()
    .required('El nombre es obligatorio')
    .min(2, 'El nombre debe tener al menos 2 caracteres'),
  apellidos: yup
    .string()
    .required('Los apellidos son obligatorios')
    .min(2, 'Los apellidos deben tener al menos 2 caracteres'),
  email: yup
    .string()
    .required('El email es obligatorio')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'El formato del email no es válido (ej: usuario@dominio.com)'
    ),
  telefono: yup
    .string()
    .required('El teléfono es obligatorio')
    .matches(/^[0-9+\-\s()]{6,20}$/, 'El formato del teléfono no es válido'),
  rol: yup
    .string()
    .required('Selecciona un rol')
    .oneOf(['cliente', 'admin', 'empleado'], 'Rol no válido'),
  estado: yup
    .string()
    .required('Selecciona un estado')
    .oneOf(['activo', 'inactivo'], 'Estado no válido'),
})

// ─── VeeValidate ───
const { errors, validate } = useForm({
  validationSchema,
  initialValues: {
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    rol: 'cliente',
    estado: 'activo',
  },
})

// useField para sincronizar con VeeValidate
const { value: nombre } = useField<string>('nombre')
const { value: apellidos } = useField<string>('apellidos')
const { value: email } = useField<string>('email')
const { value: telefono } = useField<string>('telefono')
const { value: rol } = useField<string>('rol')
const { value: estado } = useField<string>('estado')

// formData que se pasa al componente c_newUser como prop
const formData = ref<UserFormData>({
  nombre: '',
  apellidos: '',
  email: '',
  telefono: '',
  rol: 'cliente',
  estado: 'activo',
})

const avatarUrl = ref('')

/**
 * Sincroniza cambios del componente c_newUser con VeeValidate.
 */
function onFormDataUpdate(newData: UserFormData) {
  formData.value = newData
  nombre.value = newData.nombre
  apellidos.value = newData.apellidos
  email.value = newData.email
  telefono.value = newData.telefono
  rol.value = newData.rol
  estado.value = newData.estado
}

function onBack() {
  router.push({ name: 'admin-users' })
}

function onDelete() {
  console.log('Eliminar usuario')
}

function onAvatarCamera() {
  console.log('Abrir cámara')
}

function onAvatarUpload() {
  console.log('Subir imagen')
}

function onAvatarDelete() {
  avatarUrl.value = ''
}

/**
 * Valida con VeeValidate + Yup antes de guardar.
 * Si hay errores, se muestran debajo del formulario.
 */
const validationErrors = ref<string[]>([])

async function onSave() {
  validationErrors.value = []

  const { valid } = await validate()

  if (!valid) {
    validationErrors.value = Object.values(errors.value).filter(Boolean) as string[]
    return
  }

  // TODO: llamar al store para guardar
  console.log('Guardar:', JSON.stringify(formData.value))
  router.push({ name: 'admin-users' })
}

function onCancel() {
  router.push({ name: 'admin-users' })
}
</script>

<script lang="ts">
export default {
  name: 'NewUserView',
}
</script>

<template>
  <div class="new-user-view">
    <CNewUser
      :size="size"
      title="Nuevo Usuario"
      :avatar-url="avatarUrl"
      :form-data="formData"
      @back="onBack"
      @delete="onDelete"
      @avatar-camera="onAvatarCamera"
      @avatar-upload="onAvatarUpload"
      @avatar-delete="onAvatarDelete"
      @update:form-data="onFormDataUpdate"
      @save="onSave"
      @cancel="onCancel"
    />

    <!-- Errores de validación VeeValidate + Yup -->
    <div v-if="validationErrors.length > 0" class="new-user-view__errors">
      <p
        v-for="(err, i) in validationErrors"
        :key="i"
        class="new-user-view__error"
      >
        {{ err }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.new-user-view {
  width: 100%;
}

.new-user-view__errors {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 12px 24px;
  box-sizing: border-box;
}

.new-user-view__error {
  margin: 0 0 4px;
  color: #b71c1c;
  font-size: 13px;
  font-family: Roboto, system-ui, sans-serif;
  line-height: 18px;
}
</style>