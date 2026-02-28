<script setup lang="ts">
import { computed } from 'vue'
import CPageTittle from './c_pageTittle.vue'
import CNavAreaPrimaryButton from './Buttons/c_navAreaPrimaryButton.vue'
import CNavAreaSecondaryButton from './Buttons/c_navAreaSecondaryButton.vue'
import CInputField from './c_inputField.vue'
import type { PageTitleSize } from './c_pageTittle.vue'
import type { ButtonSize } from './Buttons/c_navAreaPrimaryButton.vue'
import type { InputFieldSize } from './c_inputField.vue'

export type ServiceDetailManagementSize = 'XXL' | 'XL' | 'LG' | 'MD' | 'SM' | 'XS'

export interface ServiceFormData {
  name: string
  description: string
  durationMinutes: string
  basePrice: string
  categoryName: string
  imageUrl: string
  isActive: boolean
  requiresAllergyTest: boolean
}

export interface ServiceCategoryOption {
  id: number
  name: string
  displayOrder?: number
}

const props = withDefaults(
  defineProps<{
    size?: ServiceDetailManagementSize
    title?: string
    backText?: string
    deleteText?: string
    showDeleteButton?: boolean
    formTitle?: string
    formData?: ServiceFormData
    /** Lista de categorías para el select (ordenadas por displayOrder en el padre) */
    categories?: ServiceCategoryOption[]
    saveText?: string
    cancelText?: string
  }>(),
  {
    size: 'MD',
    title: 'Servicio',
    backText: 'Volver',
    deleteText: 'Eliminar',
    showDeleteButton: true,
    formTitle: 'Datos del servicio',
    formData: () => ({
      name: '',
      description: '',
      durationMinutes: '',
      basePrice: '',
      categoryName: '',
      imageUrl: '',
      isActive: true,
      requiresAllergyTest: false,
    }),
    categories: () => [],
    saveText: 'Guardar',
    cancelText: 'Cancelar',
  }
)

const emit = defineEmits<{
  back: []
  delete: []
  'update:formData': [data: ServiceFormData]
  save: []
  cancel: []
}>()

function updateField<K extends keyof ServiceFormData>(field: K, value: ServiceFormData[K]) {
  emit('update:formData', { ...props.formData, [field]: value })
}

const containerMaxWidth = computed(() => {
  const map: Record<ServiceDetailManagementSize, string> = {
    'XXL': '1440px', 'XL': '1200px', 'LG': '992px', 'MD': '768px', 'SM': '576px', 'XS': '375px',
  }
  return map[props.size]
})

const innerWidth = computed(() => {
  const map: Record<ServiceDetailManagementSize, string> = {
    'XXL': '1024px', 'XL': '1024px', 'LG': '768px', 'MD': '768px', 'SM': '576px', 'XS': '375px',
  }
  return map[props.size]
})

const titleSize = computed<PageTitleSize>(() => props.size as PageTitleSize)
const buttonSize = computed<ButtonSize>(() => props.size as ButtonSize)
const fieldSize = computed<InputFieldSize>(() => {
  const map: Record<ServiceDetailManagementSize, InputFieldSize> = {
    'XXL': 'LG', 'XL': 'LG', 'LG': 'MD', 'MD': 'MD', 'SM': 'SM', 'XS': 'XS',
  }
  return map[props.size]
})
</script>

<script lang="ts">
export default {
  name: 'CServiceDetailManagement',
}
</script>

<template>
  <div
    class="c_serviceDetailManagement"
    :class="`c_serviceDetailManagement--${size.toLowerCase()}`"
  >
    <div class="c_serviceDetailManagement__container" :style="{ maxWidth: containerMaxWidth }">
      <div class="c_serviceDetailManagement__title-wrap">
        <CPageTittle :text="title" :size="titleSize" />
      </div>

      <div class="c_serviceDetailManagement__nav-area" :style="{ maxWidth: innerWidth }">
        <CNavAreaPrimaryButton
          :text="backText"
          :size="buttonSize"
          icon-position="before"
          @click="emit('back')"
        >
          <template #icon>
            <img src="../assets/arrowLeft.svg" alt="" />
          </template>
        </CNavAreaPrimaryButton>
        <CNavAreaSecondaryButton
          v-if="showDeleteButton"
          :text="deleteText"
          :size="buttonSize"
          icon-position="after"
          @click="emit('delete')"
        >
          <template #icon>
            <img src="../assets/trashUser.svg" alt="" />
          </template>
          <template #icon-hover>
            <img src="../assets/trashUser.svg" alt="" />
          </template>
        </CNavAreaSecondaryButton>
      </div>

      <div class="c_serviceDetailManagement__form-area" :style="{ maxWidth: innerWidth }">
        <div class="c_serviceDetailManagement__form-legend">
          <p class="c_serviceDetailManagement__form-title">{{ formTitle }}</p>
        </div>

        <CInputField
          label="Nombre"
          :model-value="formData.name"
          :size="fieldSize"
          placeholder="Nombre del servicio"
          @update:model-value="updateField('name', $event)"
        />
        <div class="c_serviceDetailManagement__field">
          <label class="c_serviceDetailManagement__label">Descripción</label>
          <textarea
            :value="formData.description"
            class="c_serviceDetailManagement__textarea"
            placeholder="Descripción del servicio"
            rows="3"
            @input="updateField('description', ($event.target as HTMLTextAreaElement).value)"
          />
        </div>
        <CInputField
          label="Duración (minutos)"
          type="number"
          :model-value="formData.durationMinutes"
          :size="fieldSize"
          placeholder="Ej: 30"
          @update:model-value="updateField('durationMinutes', $event)"
        />
        <CInputField
          label="Precio base (€)"
          type="number"
          :model-value="formData.basePrice"
          :size="fieldSize"
          placeholder="Ej: 25"
          @update:model-value="updateField('basePrice', $event)"
        />
        <div class="c_serviceDetailManagement__field">
          <label for="service-category-select" class="c_serviceDetailManagement__label">Categoría</label>
          <select
            id="service-category-select"
            :value="formData.categoryName"
            class="c_serviceDetailManagement__select"
            :disabled="!categories || categories.length === 0"
            @change="updateField('categoryName', ($event.target as HTMLSelectElement).value)"
          >
            <option value="">Seleccione categoría</option>
            <option
              v-for="cat in categories"
              :key="cat.id"
              :value="cat.name"
            >
              {{ cat.name }}
            </option>
          </select>
        </div>
        <CInputField
          label="URL imagen"
          :model-value="formData.imageUrl"
          :size="fieldSize"
          placeholder="https://..."
          @update:model-value="updateField('imageUrl', $event)"
        />
        <div class="c_serviceDetailManagement__checkbox-row">
          <div class="c_serviceDetailManagement__checkbox-wrap">
            <input
              id="service-is-active"
              type="checkbox"
              :checked="formData.isActive"
              class="c_serviceDetailManagement__checkbox"
              @change="updateField('isActive', ($event.target as HTMLInputElement).checked)"
            />
            <label for="service-is-active" class="c_serviceDetailManagement__checkbox-label">Activo</label>
          </div>
          <div class="c_serviceDetailManagement__checkbox-wrap">
            <input
              id="service-requires-allergy"
              type="checkbox"
              :checked="formData.requiresAllergyTest"
              class="c_serviceDetailManagement__checkbox"
              @change="updateField('requiresAllergyTest', ($event.target as HTMLInputElement).checked)"
            />
            <label for="service-requires-allergy" class="c_serviceDetailManagement__checkbox-label">Requiere prueba de alergia</label>
          </div>
        </div>

        <div class="c_serviceDetailManagement__form-buttons">
          <CNavAreaPrimaryButton :text="saveText" size="XS" @click="emit('save')" />
          <CNavAreaSecondaryButton :text="cancelText" size="XS" @click="emit('cancel')" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.c_serviceDetailManagement {
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
    padding: 10px 0;
  }

  &__form-title {
    margin: 0;
    font-family: Georgia, serif;
    font-size: 24px;
    font-weight: 400;
    letter-spacing: 0.24px;
    color: #1e1e1e;
  }

  &__field {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__label {
    font-family: Georgia, serif;
    font-size: 18px;
    font-weight: 400;
    letter-spacing: 0.18px;
    color: #1e1e1e;
  }

  &__textarea {
    width: 100%;
    padding: 12px 16px;
    box-sizing: border-box;
    border: 1px solid #d9d9d9;
    font: inherit;
    resize: vertical;
    min-height: 80px;
  }

  &__select {
    width: 100%;
    padding: 12px 16px;
    box-sizing: border-box;
    border: 1px solid #d9d9d9;
    font: inherit;
    font-size: 16px;
    color: #1e1e1e;
    background-color: #fff;
  }

  &__select:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &__checkbox-row {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__checkbox-wrap {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__checkbox {
    width: 18px;
    height: 18px;
    margin: 0;
    accent-color: #2c2c2c;
    cursor: pointer;
  }

  &__checkbox-label {
    margin: 0;
    font-family: Roboto, system-ui, sans-serif;
    font-size: 16px;
    color: #1e1e1e;
    cursor: pointer;
  }

  &__form-buttons {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 16px;
    > * { flex: 1; }
  }

  &--xxl { max-width: 1440px; margin: 0 auto; }
  &--xl  { max-width: 1200px; margin: 0 auto; }
  &--lg  { max-width: 992px;  margin: 0 auto; }
  &--md  { max-width: 768px;  margin: 0 auto; }
  &--sm  { max-width: 576px;  margin: 0 auto; }
  &--xs  { max-width: 375px;  margin: 0 auto; }
}
</style>
