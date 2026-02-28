<script setup lang="ts">
import CContactMap from '../components/c_contactMap.vue'
import CContactInfo from '../components/c_contactInfo.vue'
import { useViewportSize } from '../composables/useViewportSize'

const { size } = useViewportSize()
</script>

<script lang="ts">
export default {
  name: 'ContactInfoView',
}
</script>

<template>
  <CContactMap :size="size" />
  <CContactInfo :size="size" />
</template>