<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import c_heroBanner from './c_heroBanner.vue'
import CInputField from './c_inputField.vue'
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
    title: '',
    backText: '',
    deleteText: '',
    showDeleteButton: true,
    formTitle: '',
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
    saveText: '',
    cancelText: '',
  }
)

const { t } = useI18n()
const titleComputed = computed(() => props.title || t('form.serviceData'))
const backTextComputed = computed(() => props.backText || t('common.back'))
const deleteTextComputed = computed(() => props.deleteText || t('common.delete'))
const formTitleComputed = computed(() => props.formTitle || t('form.serviceData'))
const saveTextComputed = computed(() => props.saveText || t('common.save'))
const cancelTextComputed = computed(() => props.cancelText || t('common.cancel'))

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
    <c_heroBanner
      :title="titleComputed"
      :size="size"
      :primary-text="backTextComputed"
      :secondary-text="deleteTextComputed"
      :show-search-bar="false"
      :show-new-button="showDeleteButton"
      secondary-action="delete"
      @back="emit('back')"
      @delete="emit('delete')"
    />
    <div class="c_serviceDetailManagement__container" :style="{ maxWidth: containerMaxWidth }">
      <div class="c_serviceDetailManagement__form-area" :style="{ maxWidth: innerWidth }">
        <div class="c_serviceDetailManagement__form-legend">
          <p class="c_serviceDetailManagement__form-title">{{ formTitleComputed }}</p>
        </div>

        <CInputField
          :label="t('form.name')"
          :model-value="formData.name"
          :size="fieldSize"
          :placeholder="t('form.placeholderName')"
          @update:model-value="updateField('name', $event)"
        />
        <div class="c_serviceDetailManagement__field">
          <label class="c_serviceDetailManagement__label">{{ t('form.description') }}</label>
          <textarea
            :value="formData.description"
            class="c_serviceDetailManagement__textarea"
            :placeholder="t('form.placeholderDescription')"
            rows="3"
            @input="updateField('description', ($event.target as HTMLTextAreaElement).value)"
          />
        </div>
        <CInputField
          :label="t('form.durationMinutes')"
          type="number"
          :model-value="formData.durationMinutes"
          :size="fieldSize"
          :placeholder="t('form.placeholderDuration')"
          @update:model-value="updateField('durationMinutes', $event)"
        />
        <CInputField
          :label="t('form.basePrice')"
          type="number"
          :model-value="formData.basePrice"
          :size="fieldSize"
          :placeholder="t('form.placeholderPrice')"
          @update:model-value="updateField('basePrice', $event)"
        />
        <div class="c_serviceDetailManagement__field">
          <label for="service-category-select" class="c_serviceDetailManagement__label">{{ t('common.category') }}</label>
          <select
            id="service-category-select"
            :value="formData.categoryName"
            class="c_serviceDetailManagement__select"
            :disabled="!categories || categories.length === 0"
            @change="updateField('categoryName', ($event.target as HTMLSelectElement).value)"
          >
            <option value="">{{ t('form.selectCategory') }}</option>
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
          :label="t('form.imageUrl')"
          :model-value="formData.imageUrl"
          :size="fieldSize"
          :placeholder="t('form.placeholderUrl')"
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
            <label for="service-is-active" class="c_serviceDetailManagement__checkbox-label">{{ t('form.active') }}</label>
          </div>
          <div class="c_serviceDetailManagement__checkbox-wrap">
            <input
              id="service-requires-allergy"
              type="checkbox"
              :checked="formData.requiresAllergyTest"
              class="c_serviceDetailManagement__checkbox"
              @change="updateField('requiresAllergyTest', ($event.target as HTMLInputElement).checked)"
            />
            <label for="service-requires-allergy" class="c_serviceDetailManagement__checkbox-label">{{ t('form.requiresAllergyTest') }}</label>
          </div>
        </div>

        <div class="c_serviceDetailManagement__form-buttons">
          <CNavAreaPrimaryButton :text="saveTextComputed" size="XS" @click="emit('save')" />
          <CNavAreaSecondaryButton :text="cancelTextComputed" size="XS" @click="emit('cancel')" />
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
