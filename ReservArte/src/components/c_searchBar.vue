<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

export type SearchBarSize = 'XL' | 'XS'

const { t } = useI18n()

const props = withDefaults(
  defineProps<{
    size?: SearchBarSize
    placeholder?: string
    modelValue?: string
  }>(),
  {
    size: 'XL',
    placeholder: undefined,
    modelValue: '',
  }
)

const placeholderText = computed(() => props.placeholder ?? t('search.placeholder'))

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<script lang="ts">
export default {
  name: 'CSearchBar',
}
</script>

<template>
  <div class="c_searchBar">
    <div class="c_searchBar__field">
      <!-- Lupa -->
      <svg
        class="c_searchBar__icon"
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="6.5" cy="6.5" r="5.5" stroke="#999" stroke-width="1.5" />
        <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="#999" stroke-width="1.5" stroke-linecap="round" />
      </svg>
      <!-- Input -->
      <input
        class="c_searchBar__input"
        type="text"
        :placeholder="placeholderText"
        :value="modelValue"
        @input="onInput"
      />
      <!-- Micrófono -->
      <svg
        class="c_searchBar__icon"
        width="12"
        height="17"
        viewBox="0 0 12 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="3.5" y="0.5" width="5" height="10" rx="2.5" stroke="#999" stroke-width="1" />
        <path d="M1 8C1 10.7614 3.23858 13 6 13C8.76142 13 11 10.7614 11 8" stroke="#999" stroke-width="1.2" stroke-linecap="round" />
        <line x1="6" y1="13" x2="6" y2="16" stroke="#999" stroke-width="1.2" stroke-linecap="round" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.c_searchBar {
  width: 100%;
  box-sizing: border-box;
  padding: 0 23px;
}

.c_searchBar__field {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 11px;
  box-sizing: border-box;
  border-radius: 100px;
  background-color: rgba(120, 120, 128, 0.16);
}

.c_searchBar__icon {
  flex-shrink: 0;
}

.c_searchBar__input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  margin: 0;
  padding: 0 8px;
  color: #1d1b20;
  font-family: 'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 17px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: -0.08px;
}

.c_searchBar__input::placeholder {
  color: #999;
}
</style>