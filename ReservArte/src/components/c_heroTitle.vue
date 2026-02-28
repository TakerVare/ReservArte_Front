<script setup lang="ts">
import { computed } from 'vue'

export type HeroTitleSize = 'XXL' | 'XL' | 'LG' | 'MD' | 'SM' | 'XS'

const props = withDefaults(
  defineProps<{
    text: string
    size?: HeroTitleSize
  }>(),
  {
    size: 'MD',
  }
)

const maxWidth = computed(() => {
  const sizeMap: Record<HeroTitleSize, string> = {
    'XXL': '800px',
    'XL': '800px',
    'LG': '600px',
    'MD': '600px',
    'SM': '393px',
    'XS': '393px',
  }
  return sizeMap[props.size]
})

const fontSize = computed(() => {
  const sizeMap: Record<HeroTitleSize, string> = {
    'XXL': '72px',
    'XL': '72px',
    'LG': '60px',
    'MD': '60px',
    'SM': '48px',
    'XS': '48px',
  }
  return sizeMap[props.size]
})
</script>

<script lang="ts">
export default {
  name: 'CHeroTitle',
}
</script>

<template>
  <div class="c_heroTitle" :style="{ maxWidth }">
    <p class="c_heroTitle__text" :style="{ fontSize }">{{ text }}</p>
  </div>
</template>

<style scoped>
.c_heroTitle {
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  padding: 32px 30px 0;
  align-items: center;
  justify-content: center;
  background-color: transparent;
}

.c_heroTitle__text {
  margin: 0;
  color: #1e1e1e;
  font-style: normal;
  font-family: Georgia, serif;
  font-weight: 700;
  line-height: 1.2;
  text-align: center;
  letter-spacing: -1px;
}
</style>