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

  </div>
</template>

<style scoped>

</style>