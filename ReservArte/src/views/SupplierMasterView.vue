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

</style>