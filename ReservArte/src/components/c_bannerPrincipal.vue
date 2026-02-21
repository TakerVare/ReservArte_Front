<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  size?: 'XXL' | 'XL' | 'LG' | 'MD' | 'SM' | 'XS'
}>()

const maxWidth = computed(() => {
  if (!props.size) return undefined

  const sizeMap = {
    'XXL': '1440px',
    'XL': '1200px',
    'LG': '992px',
    'MD': '768px',
    'SM': '576px',
    'XS': '375px'
  }

  return sizeMap[props.size]
})
</script>

<template>
  <div class="banner-principal" :style="{ maxWidth: maxWidth }">
    <div class="banner-content">
      <img
        src="/resources/images/Logo_Recto_More_Than_Brows_SIN_fondo.png"
        alt="More Than Brows"
        class="banner-logo"
      />
    </div>
  </div>
</template>

<style scoped>
.banner-principal {
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.banner-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 170px;
  padding: 10px;
  width: 100%;
}

.banner-logo {
  height: 49px;
  width: 100%;
  object-fit: contain;
}
</style>
