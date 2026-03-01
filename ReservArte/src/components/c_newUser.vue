<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import CPageTittle from './c_pageTittle.vue'
import CNavAreaPrimaryButton from './Buttons/c_navAreaPrimaryButton.vue'
import CNavAreaSecondaryButton from './Buttons/c_navAreaSecondaryButton.vue'
import CAvatarUpload from './c_avatarUpload.vue'
import CInputField from './c_inputField.vue'
import CSelectField from './c_selectField.vue'
import type { PageTitleSize } from './c_pageTittle.vue'
import type { ButtonSize } from './Buttons/c_navAreaPrimaryButton.vue'
import type { SelectOption } from './c_selectField.vue'
import type { InputFieldSize } from './c_inputField.vue'
import type { AvatarUploadSize } from './c_avatarUpload.vue'

export type NewUserSize = 'XXL' | 'XL' | 'LG' | 'MD' | 'SM' | 'XS'

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
    size?: NewUserSize
    /** Título del hero */
    title?: string
    /** Texto botón volver */
    backText?: string
    /** Texto botón eliminar */
    deleteText?: string
    /** URL del avatar */
    avatarUrl?: string
    /** Título sección formulario */
    formTitle?: string
    /** Datos del formulario */
    formData?: UserFormData
    /** Opciones para el select de rol */
    rolOptions?: SelectOption[]
    /** Opciones para el select de estado */
    estadoOptions?: SelectOption[]
    /** Texto botón guardar */
    saveText?: string
    /** Texto botón cancelar */
    cancelText?: string
  }>(),
  {
    size: 'MD',
    title: '',
    backText: '',
    deleteText: '',
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
    saveText: '',
    cancelText: '',
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
const titleComputed = computed(() => props.title || t('admin.newUser'))
const backTextComputed = computed(() => props.backText || t('common.back'))
const deleteTextComputed = computed(() => props.deleteText || t('common.delete'))
const formTitleComputed = computed(() => props.formTitle || t('form.userData'))
const saveTextComputed = computed(() => props.saveText || t('common.save'))
const cancelTextComputed = computed(() => props.cancelText || t('common.cancel'))

const emit = defineEmits<{
  back: []
  delete: []
  'avatar-camera': []
  'avatar-upload': []
  'avatar-delete': []
  'update:formData': [data: UserFormData]
  save: []
  cancel: []
}>()

function updateField(field: keyof UserFormData, value: string) {
  emit('update:formData', { ...props.formData, [field]: value })
}

/** Ancho máximo del contenedor externo */
const containerMaxWidth = computed(() => {
  const map: Record<NewUserSize, string> = {
    'XXL': '1440px',
    'XL': '1200px',
    'LG': '992px',
    'MD': '768px',
    'SM': '576px',
    'XS': '375px',
  }
  return map[props.size]
})

/** Ancho interior para botones, avatar y formulario */
const innerWidth = computed(() => {
  const map: Record<NewUserSize, string> = {
    'XXL': '1024px',
    'XL': '1024px',
    'LG': '768px',
    'MD': '768px',
    'SM': '576px',
    'XS': '375px',
  }
  return map[props.size]
})

/** Tamaño del pageTittle */
const titleSize = computed<PageTitleSize>(() => {
  return props.size as PageTitleSize
})

/** Tamaño de los nav buttons */
const buttonSize = computed<ButtonSize>(() => {
  return props.size as ButtonSize
})

/** Tamaño de los campos input/select */
const fieldSize = computed<InputFieldSize>(() => {
  const map: Record<NewUserSize, InputFieldSize> = {
    'XXL': 'LG',
    'XL': 'LG',
    'LG': 'MD',
    'MD': 'MD',
    'SM': 'SM',
    'XS': 'XS',
  }
  return map[props.size]
})

/** Tamaño del avatar */
const avatarSize = computed<AvatarUploadSize>(() => {
  const map: Record<NewUserSize, AvatarUploadSize> = {
    'XXL': 'LG',
    'XL': 'LG',
    'LG': 'MD',
    'MD': 'MD',
    'SM': 'SM',
    'XS': 'XS',
  }
  return map[props.size]
})
</script>

<script lang="ts">
export default {
  name: 'CNewUser',
}
</script>

<template>
  <div
    class="c_newUser"
    :class="`c_newUser--${size.toLowerCase()}`"
  >
    <div class="c_newUser__container" :style="{ maxWidth: containerMaxWidth }">
      <!-- Título rosa — ocupa todo el ancho -->
      <div class="c_newUser__title-wrap">
        <CPageTittle :text="titleComputed" :size="titleSize" />
      </div>

      <!-- Área de botones nav -->
      <div class="c_newUser__nav-area" :style="{ maxWidth: innerWidth }">
        <CNavAreaPrimaryButton
          :text="backTextComputed"
          :size="buttonSize"
          icon-position="before"
          @click="emit('back')"
        >
          <template #icon>
            <img src="../assets/arrowLeft.svg" alt="" />
          </template>
        </CNavAreaPrimaryButton>
        <CNavAreaSecondaryButton
          :text="deleteTextComputed"
          :size="buttonSize"
          icon-position="after"
          @click="emit('delete')"
        >
          <template #icon>
            <img src="../assets/trashUser.svg" alt="" />
          </template>
          <template #icon-hover>
            <img src="../assets/trashUserWhite.svg" alt="" />
          </template>
        </CNavAreaSecondaryButton>
      </div>

      <!-- Avatar upload -->
      <div class="c_newUser__avatar-area" :style="{ maxWidth: innerWidth }">
        <CAvatarUpload
          :avatar-url="avatarUrl"
          :size="avatarSize"
          @camera="emit('avatar-camera')"
          @upload="emit('avatar-upload')"
          @delete="emit('avatar-delete')"
        />
      </div>

      <!-- Formulario datos de usuario -->
      <div class="c_newUser__form-area" :style="{ maxWidth: innerWidth }">
        <!-- Título sección -->
        <div class="c_newUser__form-legend">
          <p class="c_newUser__form-title">{{ formTitleComputed }}</p>
        </div>

        <!-- Campos de texto -->
        <CInputField
          :label="t('form.name')"
          :model-value="formData.nombre"
          :size="fieldSize"
          :placeholder="t('common.placeholder')"
          @update:model-value="updateField('nombre', $event)"
        />
        <CInputField
          :label="t('form.surname')"
          :model-value="formData.apellidos"
          :size="fieldSize"
          :placeholder="t('common.placeholder')"
          @update:model-value="updateField('apellidos', $event)"
        />
        <CInputField
          :label="t('form.email')"
          type="email"
          :model-value="formData.email"
          :size="fieldSize"
          :placeholder="t('common.placeholder')"
          @update:model-value="updateField('email', $event)"
        />
        <CInputField
          :label="t('form.phone')"
          type="tel"
          :model-value="formData.telefono"
          :size="fieldSize"
          :placeholder="t('common.placeholder')"
          @update:model-value="updateField('telefono', $event)"
        />

        <!-- Selects -->
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

        <!-- Botones guardar / cancelar -->
        <div class="c_newUser__form-buttons">
          <CNavAreaPrimaryButton
            :text="saveTextComputed"
            size="XS"
            @click="emit('save')"
          />
          <CNavAreaSecondaryButton
            :text="cancelTextComputed"
            size="XS"
            @click="emit('cancel')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.c_newUser {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #fff;

  &__container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    background-color: #fff;
  }

  &__title-wrap {
    width: 100%;
    background-color: pink;
  }

  &__nav-area {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 26px 0;
    box-sizing: border-box;
    overflow: hidden;
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
    padding: 10px 22px;
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

  &__form-buttons {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 16px;

    > * {
      flex: 1;
    }
  }

  /* Variantes de tamaño */
  &--xxl { max-width: 1440px; margin: 0 auto; }
  &--xl  { max-width: 1200px; margin: 0 auto; }
  &--lg  { max-width: 992px;  margin: 0 auto; }
  &--md  { max-width: 768px;  margin: 0 auto; }
  &--sm  { max-width: 576px;  margin: 0 auto; }
  &--xs  { max-width: 375px;  margin: 0 auto; }
}
</style>