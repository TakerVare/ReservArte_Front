<script setup lang="ts">
import { computed } from 'vue'

export type InputFieldSize = 'LG' | 'MD' | 'SM' | 'XS'

const props = withDefaults(
  defineProps<{
    /** Texto de la etiqueta */
    label: string
    /** Valor del input */
    modelValue?: string
    /** Placeholder del input */
    placeholder?: string
    /** Tipo del input */
    type?: string
    /** Desactivado */
    disabled?: boolean
    /** Tamaño responsive */
    size?: InputFieldSize
  }>(),
  {
    modelValue: '',
    placeholder: 'Value',
    type: 'text',
    disabled: false,
    size: 'MD',
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

/**
 * Tipografía del label según tamaño — mismo patrón que c_userRow:
 * LG: Georgia Regular 24px, letterSpacing 0.24px
 * MD: Georgia Regular 18px, letterSpacing 0.18px
 * SM: Georgia Bold 16px, letterSpacing 0.16px
 * XS: Georgia Bold 16px, letterSpacing 0.16px
 */
const labelStyle = computed(() => {
  const cfg: Record<InputFieldSize, {
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
 * Tipografía del input según tamaño
 */
const inputStyle = computed(() => {
  const cfg: Record<InputFieldSize, {
    fontSize: string
    padding: string
  }> = {
    LG: { fontSize: '18px', padding: '14px 16px' },
    MD: { fontSize: '16px', padding: '12px 16px' },
    SM: { fontSize: '14px', padding: '10px 14px' },
    XS: { fontSize: '14px', padding: '10px 14px' },
  }
  return cfg[props.size]
})
</script>

<script lang="ts">
export default {
  name: 'CInputField',
}
</script>

<template>
  <div class="c_inputField">
    <label class="c_inputField__label" :style="labelStyle">{{ label }}</label>
    <input
      class="c_inputField__input"
      :style="inputStyle"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="onInput"
    />
  </div>
</template>

<style scoped>
.c_inputField {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-sizing: border-box;
}

.c_inputField__label {
  font-family: 'Georgia', serif;
  font-style: normal;
  color: #1e1e1e;
  line-height: normal;
  /* fontSize, fontWeight, letterSpacing vienen por :style */
}

.c_inputField__input {
  width: 100%;
  min-width: 120px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  background-color: #fff;
  font-family: 'Georgia', serif;
  font-weight: 400;
  color: #1e1e1e;
  line-height: 1;
  box-sizing: border-box;
  outline: none;
  /* fontSize, padding vienen por :style */
}

.c_inputField__input::placeholder {
  color: #b3b3b3;
}

.c_inputField__input:focus {
  border-color: #FFB6C1;
}

.c_inputField__input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>