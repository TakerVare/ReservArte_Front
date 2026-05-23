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

<style scoped>
.c_supplierRow {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-top: 1px solid #f5f5f5;
  box-sizing: border-box;
  background: #fff;
}

.c_supplierRow__info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.c_supplierRow__name {
  margin: 0;
  font-family: Georgia, serif;
  font-size: 18px;
  font-weight: 700;
  color: #1e1e1e;
}

.c_supplierRow__detail {
  margin: 0;
  font-family: Georgia, serif;
  font-size: 14px;
  color: #666;
}

.c_supplierRow__type {
  font-family: Georgia, serif;
  font-size: 12px;
  font-weight: 700;
  color: #FFB6C1;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 4px 12px;
  border: 1px solid #FFB6C1;
  border-radius: 20px;
  flex-shrink: 0;
}
</style>