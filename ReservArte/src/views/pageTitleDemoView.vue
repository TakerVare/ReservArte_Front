<script setup lang="ts">
import CPageTittle from '../components/c_pageTittle.vue'
import { useViewportSize } from '../composables/useViewportSize'

const { size } = useViewportSize()
</script>

<script lang="ts">
export default {
  name: 'PageTitleDemoView',
}
</script>

<template>
  <div class="pageTitleDemoView">
    <CPageTittle text="Selección de cita" :size="size" />
  </div>
</template>

<style scoped>
.pageTitleDemoView {
  width: 100%;
  min-height: 100%;
  box-sizing: border-box;
  background-color: #fff;
  padding: 24px;
}
</style>
