<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  text: string
  size?: 'XL' | 'XS'
}>()

const maxWidth = computed(() => {
  if (!props.size) return undefined

  const sizeMap = {
    'XL': '690px',
    'XS': '393px',
  }

  return sizeMap[props.size]
})

const fontSize = computed(() => {
  if (props.size === 'XS') return '24px'
  return '36px'
})
</script>

<template>
  <div class="c_bookedDate" :style="{ maxWidth: maxWidth }">
    <p class="c_bookedDate__text" :style="{ fontSize: fontSize }">{{ text }}</p>
  </div>
</template>

<style scoped>
.c_bookedDate {
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  padding: 16px 0;
  align-items: center;
  justify-content: center;
  background-color: #fff;
}

.c_bookedDate__text {
  margin: 0;
  color: #1e1e1e;
  font-size: 36px;
  font-style: normal;
  font-family: Georgia, serif;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 1px;
  text-align: center;
}
</style>