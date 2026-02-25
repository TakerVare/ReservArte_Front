<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  text: string
  size?: 'SM' | 'XS'
}>()

const maxWidth = computed(() => {
  if (!props.size) return undefined

  const sizeMap = {
    'SM': '416px',
    'XS': '209px',
  }

  return sizeMap[props.size]
})

const fontSize = computed(() => {
  if (props.size === 'XS') return '24px'
  return '48px'
})
</script>

<template>
  <div class="c_bookingTitle" :style="{ maxWidth: maxWidth }">
    <p class="c_bookingTitle__text" :style="{ fontSize: fontSize }">{{ text }}</p>
  </div>
</template>

<style scoped>
.c_bookingTitle {
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
}

.c_bookingTitle__text {
  margin: 0;
  color: #1e1e1e;
  font-size: 48px;
  font-style: normal;
  font-family: Georgia, serif;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 1px;
  text-align: center;
}
</style>