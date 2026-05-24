<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import CPageTittle from '../components/c_pageTittle.vue'
import CNavAreaPrimaryButton from '../components/Buttons/c_navAreaPrimaryButton.vue'
import CSupplierRow from '../components/c_supplierRow.vue'
import { useSupplierStore } from '../stores/supplier.store'
import { useViewportSize } from '../composables/useViewportSize'

const router = useRouter()
const { t } = useI18n()
const supplierStore = useSupplierStore()
const { size } = useViewportSize()

onMounted(() => {
  supplierStore.fetchSuppliers()
})

function onBack() {
  router.push({ name: 'user' })
}

function selectType(type: string) {
  if (supplierStore.selectedType === type) {
    supplierStore.setSelectedType('')
  } else {
    supplierStore.setSelectedType(type)
  }
}
</script>

<script lang="ts">
export default { name: 'SupplierMasterView' }
</script>

<template>
  <div class="supplier-master-view">
    <CPageTittle :text="t('supplier.title')" :size="size" />

    <div class="supplier-master-view__container">
      <div class="supplier-master-view__nav">
        <CNavAreaPrimaryButton
          :text="t('common.back')"
          :size="size"
          icon-position="before"
          @click="onBack"
        >
          <template #icon>
            <img src="../assets/arrowLeft.svg" alt="" />
          </template>
        </CNavAreaPrimaryButton>
      </div>

      <!-- Botones de filtro por tipo -->
      <div class="supplier-master-view__filters">
        <button
          v-for="type in supplierStore.supplierTypes"
          :key="type"
          class="supplier-master-view__filter-btn"
          :class="{ 'supplier-master-view__filter-btn--active': supplierStore.selectedType === type }"
          @click="selectType(type)"
        >
          {{ type }}
        </button>
      </div>

      <!-- Error -->
      <p v-if="supplierStore.error" class="supplier-master-view__error">
        {{ supplierStore.error }}
      </p>

      <!-- Loading -->
      <p v-else-if="supplierStore.loading" class="supplier-master-view__loading">
        {{ t('common.loading') }}
      </p>

      <!-- Lista -->
      <div v-else class="supplier-master-view__list">
        <CSupplierRow
          v-for="supplier in supplierStore.filteredSuppliers"
          :key="supplier.id"
          :name="supplier.name"
          :phone="supplier.phone"
          :address="supplier.address"
          :type="supplier.type"
        />
        <p v-if="supplierStore.filteredSuppliers.length === 0" class="supplier-master-view__empty">
          {{ t('supplier.empty') }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.supplier-master-view {
  width: 100%;
}

.supplier-master-view__container {
  max-width: 768px;
  margin: 0 auto;
  padding: 0 16px;
}

.supplier-master-view__nav {
  padding: 20px 0;
}

.supplier-master-view__filters {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  padding: 12px 0 20px;
}

.supplier-master-view__filter-btn {
  padding: 8px 20px;
  font-family: Georgia, serif;
  font-size: 14px;
  font-weight: 700;
  border: 1px solid #FFB6C1;
  border-radius: 24px;
  background: #fff;
  color: #FFB6C1;
  cursor: pointer;
  transition: all 0.2s ease;
}

.supplier-master-view__filter-btn:hover {
  background: #FFF0F3;
}

.supplier-master-view__filter-btn--active {
  background: #FFB6C1;
  color: #fff;
}

.supplier-master-view__list {
  display: flex;
  flex-direction: column;
}

.supplier-master-view__error {
  color: #b71c1c;
  padding: 1rem 0;
}

.supplier-master-view__loading {
  color: #666;
  padding: 1rem 0;
  text-align: center;
}

.supplier-master-view__empty {
  color: #999;
  text-align: center;
  padding: 32px 0;
  font-family: Georgia, serif;
  font-size: 16px;
}
</style>