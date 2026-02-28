<script setup lang="ts">
import { computed } from 'vue'

export type HeroDescriptionSize = 'XXL' | 'XL' | 'LG' | 'MD' | 'SM' | 'XS'

const props = withDefaults(
  defineProps<{
    text: string
    size?: HeroDescriptionSize
  }>(),
  {
    size: 'MD',
  }
)

const maxWidth = computed(() => {
  const sizeMap: Record<HeroDescriptionSize, string> = {
    'XXL': '640px',
    'XL': '640px',
    'LG': '500px',
    'MD': '500px',
    'SM': '335px',
    'XS': '335px',
  }
  return sizeMap[props.size]
})

const fontSize = computed(() => {
  const sizeMap: Record<HeroDescriptionSize, string> = {
    'XXL': '36px',
    'XL': '36px',
    'LG': '32px',
    'MD': '32px',
    'SM': '28px',
    'XS': '28px',
  }
  return sizeMap[props.size]
})
</script>

<script lang="ts">
export default {
  name: 'CHeroDescription',
}
</script>

<template>
  <div class="c_heroDescription" :style="{ maxWidth }">
    <p class="c_heroDescription__text" :style="{ fontSize }">{{ text }}</p>
  </div>
</template>

<style scoped>
.c_heroDescription {
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  padding: 0 30px;
  align-items: center;
  justify-content: flex-start;
  background-color: transparent;
}

.c_heroDescription__text {
  margin: 0;
  color: #1e1e1e;
  font-style: normal;
  font-family: Georgia, serif;
  font-weight: 400;
  line-height: 1.29;
  text-align: left;
  letter-spacing: 0;
}
</style>