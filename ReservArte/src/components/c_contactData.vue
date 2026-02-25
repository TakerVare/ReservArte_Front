<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  text: string
  size?: 'XL' | 'MD' | 'SM' | 'XS'
}>()

const maxWidth = computed(() => {
  if (!props.size) return undefined

  const sizeMap = {
    'XL': '800px',
    'MD': '600px',
    'SM': '397px',
    'XS': '375px',
  }

  return sizeMap[props.size]
})
</script>

<template>
  <div class="c_contactData" :style="{ maxWidth: maxWidth }">
    <div class="c_contactData__row">
      <span class="c_contactData__icon" aria-hidden="true">
        <slot name="icon" />
      </span>
      <p class="c_contactData__text">{{ text }}</p>
    </div>
  </div>
</template>

<style scoped>
.c_contactData {
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  padding: 16px 0;
  min-height: 60px;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  background-color: #fff;
}

.c_contactData__row {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 24px;
}

.c_contactData__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  overflow: hidden;
}

.c_contactData__icon :deep(svg),
.c_contactData__icon :deep(img) {
  width: 40px;
  height: 40px;
  display: block;
  object-fit: contain;
}

.c_contactData__text {
  margin: 0;
  color: #1e1e1e;
  font-size: 24px;
  font-style: normal;
  font-family: Georgia, serif;
  font-weight: 400;
  line-height: normal;
  text-align: left;
}
</style>