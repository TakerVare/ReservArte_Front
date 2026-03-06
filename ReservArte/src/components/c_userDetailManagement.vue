<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import c_heroBanner from './c_heroBanner.vue'
import CAvatarUpload from './c_avatarUpload.vue'
import CInputField from './c_inputField.vue'
import CSelectField from './c_selectField.vue'
import CNavAreaPrimaryButton from './Buttons/c_navAreaPrimaryButton.vue'
import CNavAreaSecondaryButton from './Buttons/c_navAreaSecondaryButton.vue'
import type { SelectOption } from './c_selectField.vue'
import type { InputFieldSize } from './c_inputField.vue'
import type { AvatarUploadSize } from './c_avatarUpload.vue'

export type UserDetailManagementSize = 'XXL' | 'XL' | 'LG' | 'MD' | 'SM' | 'XS'

export interface UserFormData {
  nombre: string
  apellidos: string
  email: string
  telefono: string
  rol: string
  estado: string
}

const props = withDefaults(
  defineProps<{
    size?: UserDetailManagementSize
    title?: string
    backText?: string
    deleteText?: string
    showDeleteButton?: boolean
    avatarUrl?: string
    formTitle?: string
    formData?: UserFormData
    rolOptions?: SelectOption[]
    estadoOptions?: SelectOption[]
    saveText?: string
    cancelText?: string
    /** Si true, oculta los selects de Rol y Estado (para clientes editando su propio perfil) */
    hideRoleStatus?: boolean
    /** Si true, todos los campos son de solo lectura y se ocultan los botones */
    readonly?: boolean
  }>(),
  {
    size: 'MD',
    title: '',
    backText: '',
    deleteText: '',
    showDeleteButton: true,
    avatarUrl: '',
    formTitle: '',
    formData: () => ({
      nombre: '',
      apellidos: '',
      email: '',
      telefono: '',
      rol: 'cliente',
      estado: 'activo',
    }),
    rolOptions: undefined,
    estadoOptions: undefined,
    saveText: undefined,
    cancelText: undefined,
    hideRoleStatus: false,
    readonly: false,
  }
)

const { t } = useI18n()
const defaultRolOptions = computed(() => [
  { label: t('options.client'), value: 'cliente' },
  { label: t('options.employee'), value: 'empleado' },
])
const defaultEstadoOptions = computed(() => [
  { label: t('options.active'), value: 'activo' },
  { label: t('options.inactive'), value: 'inactivo' },
])
const rolOptionsComputed = computed(() => props.rolOptions ?? defaultRolOptions.value)
const estadoOptionsComputed = computed(() => props.estadoOptions ?? defaultEstadoOptions.value)
const backTextComputed = computed(() => props.backText || t('common.back'))
const deleteTextComputed = computed(() => props.deleteText || t('common.delete'))
const formTitleComputed = computed(() => props.formTitle || t('form.userData'))
const saveTextComputed = computed(() => props.saveText ?? t('common.save'))
const cancelTextComputed = computed(() => props.cancelText ?? t('common.cancel'))

const emit = defineEmits<{
  back: []
  delete: []
  'avatar-camera': []
  'avatar-upload': [file: File]
  'avatar-delete': []
  'update:formData': [data: UserFormData]
  save: []
  cancel: []
}>()

function updateField(field: keyof UserFormData, value: string) {
  if (props.readonly) return
  emit('update:formData', { ...props.formData, [field]: value })
}

const containerMaxWidth = computed(() => {
  const map: Record<UserDetailManagementSize, string> = {
    'XXL': '1440px', 'XL': '1200px', 'LG': '992px',
    'MD': '768px', 'SM': '576px', 'XS': '375px',
  }
  return map[props.size]
})

const innerWidth = computed(() => {
  const map: Record<UserDetailManagementSize, string> = {
    'XXL': '1024px', 'XL': '1024px', 'LG': '768px',
    'MD': '768px', 'SM': '576px', 'XS': '375px',
  }
  return map[props.size]
})

const fieldSize = computed<InputFieldSize>(() => {
  const map: Record<UserDetailManagementSize, InputFieldSize> = {
    'XXL': 'LG', 'XL': 'LG', 'LG': 'MD',
    'MD': 'MD', 'SM': 'SM', 'XS': 'XS',
  }
  return map[props.size]
})

const avatarSize = computed<AvatarUploadSize>(() => {
  const map: Record<UserDetailManagementSize, AvatarUploadSize> = {
    'XXL': 'LG', 'XL': 'LG', 'LG': 'MD',
    'MD': 'MD', 'SM': 'SM', 'XS': 'XS',
  }
  return map[props.size]
})

const buttonSize = computed(() => {
  const map: Record<UserDetailManagementSize, 'XS' | 'SM' | 'MD'> = {
    'XXL': 'MD', 'XL': 'MD', 'LG': 'SM',
    'MD': 'SM', 'SM': 'XS', 'XS': 'XS',
  }
  return map[props.size]
})
</script>

<script lang="ts">
export default {
  name: 'CUserDetailManagement',
}
</script>

<template>
  <div
    class="c_userDetailManagement"
    :class="`c_userDetailManagement--${size.toLowerCase()}`"
  >
    <c_heroBanner
      :title="title || t('form.userData')"
      :size="size"
      :primary-text="backTextComputed"
      :secondary-text="deleteTextComputed"
      :show-search-bar="false"
      :show-new-button="showDeleteButton && !readonly"
      secondary-action="delete"
      @back="emit('back')"
      @delete="emit('delete')"
    />
    <div class="c_userDetailManagement__container" :style="{ maxWidth: containerMaxWidth }">
      <!-- Avatar -->
      <div class="c_userDetailManagement__avatar-area" :style="{ maxWidth: innerWidth }">
        <CAvatarUpload
          :avatar-url="avatarUrl"
          :size="avatarSize"
          :readonly="readonly"
          @camera="emit('avatar-camera')"
          @upload="(file) => emit('avatar-upload', file)"
          @delete="emit('avatar-delete')"
        />
      </div>

      <!-- Formulario -->
      <div class="c_userDetailManagement__form-area" :style="{ maxWidth: innerWidth }">
        <div class="c_userDetailManagement__form-legend">
          <p class="c_userDetailManagement__form-title">{{ formTitleComputed }}</p>
        </div>

        <CInputField
          :label="t('form.name')"
          :model-value="formData.nombre"
          :size="fieldSize"
          :placeholder="t('common.placeholder')"
          :disabled="readonly"
          @update:model-value="updateField('nombre', $event)"
        />
        <CInputField
          :label="t('form.surname')"
          :model-value="formData.apellidos"
          :size="fieldSize"
          :placeholder="t('common.placeholder')"
          :disabled="readonly"
          @update:model-value="updateField('apellidos', $event)"
        />
        <CInputField
          :label="t('form.email')"
          type="email"
          :model-value="formData.email"
          :size="fieldSize"
          :placeholder="t('common.placeholder')"
          :disabled="readonly"
          @update:model-value="updateField('email', $event)"
        />
        <CInputField
          :label="t('form.phone')"
          type="tel"
          :model-value="formData.telefono"
          :size="fieldSize"
          :placeholder="t('common.placeholder')"
          :disabled="readonly"
          @update:model-value="updateField('telefono', $event)"
        />

        <!-- Rol y Estado: ocultos para clientes o en readonly -->
        <template v-if="!hideRoleStatus && !readonly">
          <CSelectField
            :label="t('form.role')"
            :model-value="formData.rol"
            :options="rolOptionsComputed"
            :size="fieldSize"
            @update:model-value="updateField('rol', $event)"
          />
          <CSelectField
            :label="t('form.status')"
            :model-value="formData.estado"
            :options="estadoOptionsComputed"
            :size="fieldSize"
            @update:model-value="updateField('estado', $event)"
          />
        </template>

        <div v-if="$slots['extra-fields']" class="c_userDetailManagement__extra-fields">
          <slot name="extra-fields" />
        </div>

        <!-- Botones guardar / cancelar: ocultos en modo readonly -->
        <div v-if="!readonly" class="c_userDetailManagement__form-buttons">
          <CNavAreaPrimaryButton
            :text="saveTextComputed"
            :size="buttonSize"
            @click="emit('save')"
          />
          <CNavAreaSecondaryButton
            :text="cancelTextComputed"
            :size="buttonSize"
            @click="emit('cancel')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.c_userDetailManagement {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;

  &__container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    background-color: #fff;
  }

  &__avatar-area {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 22px 0 26px;
    box-sizing: border-box;
  }

  &__form-area {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    padding: 10px 22px 100px 22px;
    box-sizing: border-box;
  }

  &__form-legend {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 10px 0;
  }

  &__form-title {
    margin: 0;
    font-family: 'Georgia', serif;
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: normal;
    letter-spacing: 0.24px;
    color: #1e1e1e;
  }

  &__extra-fields {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__form-buttons {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 16px;
    padding-top: 8px;

    > * {
      flex: 1;

      :deep(.c_navAreaPrimaryButton),
      :deep(.c_navAreaSecondaryButton) {
        width: 100%;
      }

      :deep(.c_navAreaPrimaryButton__btn),
      :deep(.c_navAreaSecondaryButton__btn) {
        width: 100%;
      }
    }
  }

  &--xxl { max-width: 1440px; margin: 0 auto; }
  &--xl  { max-width: 1200px; margin: 0 auto; }
  &--lg  { max-width: 992px;  margin: 0 auto; }
  &--md  { max-width: 768px;  margin: 0 auto; }
  &--sm  { max-width: 576px;  margin: 0 auto; }
  &--xs  { max-width: 375px;  margin: 0 auto; }
}
</style>