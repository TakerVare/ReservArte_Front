<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import CPageTittle from './c_pageTittle.vue'
import CNavAreaPrimaryButton from './Buttons/c_navAreaPrimaryButton.vue'
import CNavAreaSecondaryButton from './Buttons/c_navAreaSecondaryButton.vue'
import CInputField from './c_inputField.vue'
import CSelectField from './c_selectField.vue'
import type { PageTitleSize } from './c_pageTittle.vue'
import type { ButtonSize } from './Buttons/c_navAreaPrimaryButton.vue'
import type { InputFieldSize } from './c_inputField.vue'
import type { SelectOption } from './c_selectField.vue'
import type { AppointmentDetail } from '../stores/appointment.store'

export type AppointmentDetailManagementSize = 'XXL' | 'XL' | 'LG' | 'MD' | 'SM' | 'XS'

/** Estado del formulario para crear cita */
export interface CreateAppointmentFormState {
  customerId: string
  employeeId: string
  appointmentDate: string
  startTime: string
  serviceIds: string[]
  paymentMethodId: string
  notes: string
}

const props = withDefaults(
  defineProps<{
    size?: AppointmentDetailManagementSize
    title?: string
    backText?: string
    deleteText?: string
    showDeleteButton?: boolean
    formTitle?: string
    /** Modo creación: formulario para nueva cita */
    isEditMode?: boolean
    /** En creación: estado del formulario */
    createForm?: CreateAppointmentFormState
    /** En edición: cita cargada */
    detail?: AppointmentDetail | null
    customerOptions?: SelectOption[]
    employeeOptions?: SelectOption[]
    serviceOptions?: { id: number; name: string }[]
    statusOptions?: { value: string; labelKey: string }[]
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
    isEditMode: false,
    createForm: undefined,
    detail: undefined,
    customerOptions: () => [],
    employeeOptions: () => [],
    serviceOptions: () => [],
    statusOptions: () => [],
    saveText: '',
    cancelText: '',
  }
)

const { t } = useI18n()

const titleComputed = computed(() => props.title || (props.isEditMode ? t('admin.editBooking') : t('admin.newBooking')))
const backTextComputed = computed(() => props.backText || t('common.back'))
const deleteTextComputed = computed(() => props.deleteText || t('common.delete'))
const formTitleComputed = computed(() => props.formTitle || t('appointment.formTitle'))
const saveTextComputed = computed(() => props.saveText || t('common.save'))
const cancelTextComputed = computed(() => props.cancelText || t('common.cancel'))

const emit = defineEmits<{
  back: []
  delete: []
  'update:createForm': [data: CreateAppointmentFormState]
  'update:detail': [data: AppointmentDetail]
  save: []
  cancel: []
}>()

const containerMaxWidth = computed(() => {
  const map: Record<AppointmentDetailManagementSize, string> = {
    XXL: '1440px', XL: '1200px', LG: '992px', MD: '768px', SM: '576px', XS: '375px',
  }
  return map[props.size]
})

const innerWidth = computed(() => {
  const map: Record<AppointmentDetailManagementSize, string> = {
    XXL: '1024px', XL: '1024px', LG: '768px', MD: '768px', SM: '576px', XS: '375px',
  }
  return map[props.size]
})

const titleSize = computed<PageTitleSize>(() => props.size as PageTitleSize)
const buttonSize = computed<ButtonSize>(() => props.size as ButtonSize)
const fieldSize = computed<InputFieldSize>(() => {
  const map: Record<AppointmentDetailManagementSize, InputFieldSize> = {
    XXL: 'LG', XL: 'LG', LG: 'MD', MD: 'MD', SM: 'SM', XS: 'XS',
  }
  return map[props.size]
})

const customerSelectOptions = computed<SelectOption[]>(() =>
  (props.customerOptions ?? []).map((c) => ({ label: c.label, value: c.value }))
)
const employeeSelectOptions = computed<SelectOption[]>(() =>
  (props.employeeOptions ?? []).map((e) => ({ label: e.label, value: e.value }))
)

function updateCreateFormField<K extends keyof CreateAppointmentFormState>(
  field: K,
  value: CreateAppointmentFormState[K]
) {
  if (!props.createForm) return
  emit('update:createForm', { ...props.createForm, [field]: value })
}

function updateCreateFormServiceIds(index: number, value: string) {
  if (!props.createForm) return
  const next = [...props.createForm.serviceIds]
  next[index] = value
  emit('update:createForm', { ...props.createForm, serviceIds: next })
}

function addServiceSlot() {
  if (!props.createForm) return
  emit('update:createForm', {
    ...props.createForm,
    serviceIds: [...props.createForm.serviceIds, ''],
  })
}

function removeServiceSlot(index: number) {
  if (!props.createForm || props.createForm.serviceIds.length <= 1) return
  const next = props.createForm.serviceIds.filter((_, i) => i !== index)
  emit('update:createForm', { ...props.createForm, serviceIds: next })
}

function updateDetailField<K extends keyof AppointmentDetail>(field: K, value: AppointmentDetail[K]) {
  if (!props.detail) return
  emit('update:detail', { ...props.detail, [field]: value })
}

function onCustomerChange(value: string) {
  if (!props.detail) return
  const label = props.customerOptions?.find((c) => c.value === value)?.label ?? ''
  emit('update:detail', {
    ...props.detail,
    customerId: Number(value),
    customerName: label,
  })
}

function onEmployeeChange(value: string) {
  if (!props.detail) return
  const label = props.employeeOptions?.find((e) => e.value === value)?.label ?? ''
  emit('update:detail', {
    ...props.detail,
    employeeId: Number(value),
    employeeName: label,
  })
}
</script>

<script lang="ts">
export default {
  name: 'CAppointmentDetailManagement',
}
</script>

<template>
  <div
    class="c_appointmentDetailManagement"
    :class="`c_appointmentDetailManagement--${size.toLowerCase()}`"
  >
    <div class="c_appointmentDetailManagement__container" :style="{ maxWidth: containerMaxWidth }">
      <div class="c_appointmentDetailManagement__title-wrap">
        <CPageTittle :text="titleComputed" :size="titleSize" />
      </div>

      <div class="c_appointmentDetailManagement__nav-area" :style="{ maxWidth: innerWidth }">
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
          v-if="showDeleteButton && isEditMode"
          :text="deleteTextComputed"
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

      <div class="c_appointmentDetailManagement__form-area" :style="{ maxWidth: innerWidth }">
        <div class="c_appointmentDetailManagement__form-legend">
          <p class="c_appointmentDetailManagement__form-title">{{ formTitleComputed }}</p>
        </div>

        <!-- Modo creación -->
        <template v-if="!isEditMode && createForm">
          <CSelectField
            :label="t('appointment.customer')"
            :model-value="createForm.customerId"
            :options="customerSelectOptions"
            :disabled="customerSelectOptions.length === 0"
            :size="fieldSize"
            @update:model-value="updateCreateFormField('customerId', $event)"
          />
          <CSelectField
            :label="t('appointment.employee')"
            :model-value="createForm.employeeId"
            :options="employeeSelectOptions"
            :disabled="employeeSelectOptions.length === 0"
            :size="fieldSize"
            @update:model-value="updateCreateFormField('employeeId', $event)"
          />
          <CInputField
            :label="t('appointment.date')"
            type="date"
            :model-value="createForm.appointmentDate"
            :size="fieldSize"
            @update:model-value="updateCreateFormField('appointmentDate', $event)"
          />
          <CInputField
            :label="t('appointment.startTime')"
            type="time"
            :model-value="createForm.startTime"
            :size="fieldSize"
            @update:model-value="updateCreateFormField('startTime', $event)"
          />
          <div class="c_appointmentDetailManagement__field">
            <label class="c_appointmentDetailManagement__label">{{ t('appointment.services') }}</label>
            <div
              v-for="(sid, idx) in createForm.serviceIds"
              :key="idx"
              class="c_appointmentDetailManagement__service-row"
            >
              <select
                :value="sid"
                class="c_appointmentDetailManagement__select"
                :disabled="!serviceOptions || serviceOptions.length === 0"
                @change="updateCreateFormServiceIds(idx, ($event.target as HTMLSelectElement).value)"
              >
                <option value="">{{ t('appointment.selectService') }}</option>
                <option
                  v-for="svc in serviceOptions"
                  :key="svc.id"
                  :value="String(svc.id)"
                >
                  {{ svc.name }}
                </option>
              </select>
              <button
                v-if="createForm.serviceIds.length > 1"
                type="button"
                class="c_appointmentDetailManagement__remove-svc"
                @click="removeServiceSlot(idx)"
              >
                {{ t('common.delete') }}
              </button>
            </div>
            <button
              type="button"
              class="c_appointmentDetailManagement__add-svc"
              @click="addServiceSlot"
            >
              + {{ t('appointment.services') }}
            </button>
          </div>
          <CInputField
            :label="t('appointment.paymentMethod')"
            type="number"
            :model-value="createForm.paymentMethodId"
            :size="fieldSize"
            placeholder="1"
            @update:model-value="updateCreateFormField('paymentMethodId', $event)"
          />
          <div class="c_appointmentDetailManagement__field">
            <label class="c_appointmentDetailManagement__label">{{ t('appointment.notes') }}</label>
            <textarea
              :value="createForm.notes"
              class="c_appointmentDetailManagement__textarea"
              rows="3"
              @input="updateCreateFormField('notes', ($event.target as HTMLTextAreaElement).value)"
            />
          </div>
        </template>

        <!-- Modo edición -->
        <template v-else-if="isEditMode && detail">
          <CSelectField
            :label="t('appointment.customer')"
            :model-value="String(detail.customerId)"
            :options="customerSelectOptions"
            :disabled="customerSelectOptions.length === 0"
            :size="fieldSize"
            @update:model-value="onCustomerChange($event)"
          />
          <CSelectField
            :label="t('appointment.employee')"
            :model-value="String(detail.employeeId)"
            :options="employeeSelectOptions"
            :disabled="employeeSelectOptions.length === 0"
            :size="fieldSize"
            @update:model-value="onEmployeeChange($event)"
          />
          <CInputField
            :label="t('appointment.date')"
            type="date"
            :model-value="detail.appointmentDate"
            :size="fieldSize"
            @update:model-value="updateDetailField('appointmentDate', $event)"
          />
          <CInputField
            :label="t('appointment.startTime')"
            type="time"
            :model-value="detail.startTime"
            :size="fieldSize"
            @update:model-value="updateDetailField('startTime', $event)"
          />
          <CInputField
            :label="t('appointment.endTime')"
            type="time"
            :model-value="detail.endTime"
            :size="fieldSize"
            @update:model-value="updateDetailField('endTime', $event)"
          />
          <div class="c_appointmentDetailManagement__field" v-if="statusOptions && statusOptions.length">
            <label class="c_appointmentDetailManagement__label">{{ t('appointment.status') }}</label>
            <select
              :value="detail.status"
              class="c_appointmentDetailManagement__select"
              @change="updateDetailField('status', ($event.target as HTMLSelectElement).value)"
            >
              <option
                v-for="opt in statusOptions"
                :key="opt.value"
                :value="opt.value"
              >
                {{ t(opt.labelKey) }}
              </option>
            </select>
          </div>
          <div class="c_appointmentDetailManagement__field">
            <label class="c_appointmentDetailManagement__label">{{ t('appointment.notes') }}</label>
            <textarea
              :value="detail.notes ?? ''"
              class="c_appointmentDetailManagement__textarea"
              rows="3"
              @input="updateDetailField('notes', ($event.target as HTMLTextAreaElement).value || null)"
            />
          </div>
        </template>

        <div class="c_appointmentDetailManagement__form-buttons">
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
.c_appointmentDetailManagement {
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

  &__textarea {
    width: 100%;
    padding: 12px 16px;
    box-sizing: border-box;
    border: 1px solid #d9d9d9;
    font: inherit;
    resize: vertical;
    min-height: 80px;
  }

  &__service-row {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  &__service-row &__select {
    flex: 1;
  }

  &__remove-svc {
    padding: 0.35rem 0.5rem;
    font-size: 0.875rem;
    color: #b71c1c;
    background: transparent;
    border: 1px solid #b71c1c;
    border-radius: 4px;
    cursor: pointer;
  }

  &__add-svc {
    margin-top: 0.5rem;
    padding: 0.35rem 0.5rem;
    font-size: 0.875rem;
    color: #666;
    background: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
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

  &--xxl { max-width: 1440px; margin: 0 auto; }
  &--xl  { max-width: 1200px; margin: 0 auto; }
  &--lg  { max-width: 992px;  margin: 0 auto; }
  &--md  { max-width: 768px;  margin: 0 auto; }
  &--sm  { max-width: 576px;  margin: 0 auto; }
  &--xs  { max-width: 375px;  margin: 0 auto; }
}
</style>
