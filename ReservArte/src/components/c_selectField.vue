<script setup lang="ts">
import { computed } from 'vue'

export type SelectFieldSize = 'LG' | 'MD' | 'SM' | 'XS'

export interface SelectOption {
  label: string
  value: string
}

const props = withDefaults(
  defineProps<{
    /** Texto de la etiqueta */
    label: string
    /** Valor seleccionado */
    modelValue?: string
    /** Opciones del desplegable */
    options: SelectOption[]
    /** Desactivado */
    disabled?: boolean
    /** Tamaño responsive */
    size?: SelectFieldSize
  }>(),
  {
    modelValue: '',
    disabled: false,
    size: 'MD',
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function onChange(event: Event) {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}

/**
 * Tipografía del label — mismo patrón que c_inputField
 */
const labelStyle = computed(() => {
  const cfg: Record<SelectFieldSize, {
    fontSize: string
    fontWeight: number
    letterSpacing: string
  }> = {
    LG: { fontSize: '24px', fontWeight: 400, letterSpacing: '0.24px' },
    MD: { fontSize: '18px', fontWeight: 400, letterSpacing: '0.18px' },
    SM: { fontSize: '16px', fontWeight: 700, letterSpacing: '0.16px' },
    XS: { fontSize: '16px', fontWeight: 700, letterSpacing: '0.16px' },
  }
  const c = cfg[props.size]
  return {
    fontSize: c.fontSize,
    fontWeight: c.fontWeight,
    letterSpacing: c.letterSpacing,
  }
})

/**
 * Tipografía del select según tamaño
 */
const selectStyle = computed(() => {
  const cfg: Record<SelectFieldSize, {
    fontSize: string
    height: string
    padding: string
  }> = {
    LG: { fontSize: '18px', height: '48px', padding: '12px 36px 12px 16px' },
    MD: { fontSize: '16px', height: '40px', padding: '12px 36px 12px 16px' },
    SM: { fontSize: '14px', height: '36px', padding: '8px 32px 8px 14px' },
    XS: { fontSize: '14px', height: '36px', padding: '8px 32px 8px 14px' },
  }
  return cfg[props.size]
})
</script>

<script lang="ts">
export default {
  name: 'CSelectField',
}
</script>

<template>
  <div class="c_selectField">
    <label class="c_selectField__label" :style="labelStyle">{{ label }}</label>
    <div class="c_selectField__select-wrap">
      <select
        class="c_selectField__select"
        :style="selectStyle"
        :value="modelValue"
        :disabled="disabled"
        @change="onChange"
      >
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.c_selectField {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-sizing: border-box;
}

.c_selectField__label {
  font-family: 'Georgia', serif;
  font-style: normal;
  color: #1e1e1e;
  line-height: normal;
  /* fontSize, fontWeight, letterSpacing vienen por :style */
}

.c_selectField__select-wrap {
  position: relative;
  width: 100%;
  min-width: 120px;
}

.c_selectField__select {
  width: 100%;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  background-color: #fff;
  font-family: 'Georgia', serif;
  font-weight: 400;
  color: #1e1e1e;
  line-height: 1;
  box-sizing: border-box;
  outline: none;
  cursor: pointer;

  /* Quitar flecha nativa */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  /* Chevron custom */
  background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 6L8 10L12 6' stroke='%23999' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px 16px;
  /* fontSize, height, padding vienen por :style */
}

.c_selectField__select:focus {
  border-color: #FFB6C1;
}

.c_selectField__select:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>