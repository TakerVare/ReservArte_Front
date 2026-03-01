<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import CItemMasterManagement from '../components/c_itemMasterManagement.vue'
import { useServiceStore } from '../stores/service.store'
import { useViewportSize } from '../composables/useViewportSize'

const { t: $t } = useI18n()
const router = useRouter()
const serviceStore = useServiceStore()
const { size } = useViewportSize()

/** Binding bidireccional para el select de categoría */
const selectedCategoryId = computed({
  get: () => serviceStore.selectedCategoryId,
  set: (v: string) => serviceStore.setSelectedCategoryId(v),
})

onMounted(() => {
  serviceStore.fetchServices()
  serviceStore.fetchCategories()
})

function onBack() {
  router.push({ name: 'user' })
}

function onNew() {
  router.push({ name: 'admin-new-service' })
}

function onEditItem(itemId: string) {
  router.push({ name: 'admin-edit-service', params: { id: itemId } })
}

function onViewItem(itemId: string) {
  router.push({ name: 'admin-edit-service', params: { id: itemId } })
}

async function onDeleteItem(itemId: string) {
  console.log($t('service.deleteConfirm'))
  await serviceStore.deleteService(itemId)
}
</script>

<script lang="ts">
export default {
  name: 'ServiceMasterView',
}
</script>

<template>
  <div class="service-master-view">
    <p v-if="serviceStore.error" class="service-master-view__error">{{ serviceStore.error }}</p>
    <CItemMasterManagement
      v-else
      :size="size"
      :back-text="$t('common.back')"
      :item-label="$t('service.label')"
      :new-text="$t('service.new')"
      :search-query="serviceStore.searchQuery"
      @update:search-query="serviceStore.setSearchQuery($event)"
      :items="serviceStore.items"
      @back="onBack"
      @new="onNew"
      @edit-item="onEditItem"
      @delete-item="onDeleteItem"
      @view-item="onViewItem"
    >
      <template #filters>
        <div class="service-master-view__category-filter">
          <label for="service-category-select" class="service-master-view__category-label">{{ $t('common.category') }}</label>
          <select
            id="service-category-select"
            v-model="selectedCategoryId"
            class="service-master-view__category-select"
            :disabled="serviceStore.categoriesLoading"
          >
            <option value="">{{ $t('common.allCategories') }}</option>
            <option
              v-for="cat in serviceStore.categoriesSorted"
              :key="cat.id"
              :value="String(cat.id)"
            >
              {{ cat.name }}
            </option>
          </select>
        </div>
      </template>
    </CItemMasterManagement>
    <p v-if="serviceStore.loading" class="service-master-view__loading">{{ $t('service.loading') }}</p>
  </div>
</template>

<style scoped>
.service-master-view {
  width: 100%;
  position: relative;
}
.service-master-view__error {
  color: #b71c1c;
  padding: 1rem;
  margin: 0;
}
.service-master-view__loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  color: #666;
}

.service-master-view__category-filter {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
}

.service-master-view__category-label {
  font-size: 0.9375rem;
  color: #333;
  white-space: nowrap;
}

.service-master-view__category-select {
  min-width: 12rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.9375rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
}

.service-master-view__category-select:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
