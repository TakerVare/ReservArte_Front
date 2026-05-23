<script setup lang="ts">
defineProps<{
  name: string
  phone: string | null
  address: string | null
  type: string
}>()
</script>

<script lang="ts">
export default { name: 'CSupplierRow' }
</script>

<template>
  <div class="c_supplierRow">
    <div class="c_supplierRow__info">
      <p class="c_supplierRow__name">{{ name }}</p>
      <p class="c_supplierRow__detail">{{ phone || '—' }}</p>
      <p class="c_supplierRow__detail">{{ address || '—' }}</p>
    </div>
    <span class="c_supplierRow__type">{{ type }}</span>
  </div>
</template>
