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
  <div class="c_contactMainTitle" :style="{ maxWidth: maxWidth }">
    <p class="c_contactMainTitle__text">{{ text }}</p>
  </div>
</template>

<style scoped>
.c_contactMainTitle {
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  padding: 32px 0;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #fff;
}

.c_contactMainTitle__text {
  margin: 0;
  color: #1e1e1e;
  font-size: 36px;
  font-style: normal;
  font-family: Georgia, serif;
  font-weight: 400;
  line-height: normal;
  text-align: left;
}
</style>