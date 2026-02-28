<script setup lang="ts">
import { computed } from 'vue'
import CPageTittle from './c_pageTittle.vue'
import CNavAreaPrimaryButton from './Buttons/c_navAreaPrimaryButton.vue'
import CNavAreaSecondaryButton from './Buttons/c_navAreaSecondaryButton.vue'
import CSearchBar from './c_searchBar.vue'
import CUserRow from './c_userRow.vue'
import type { PageTitleSize } from './c_pageTittle.vue'
import type { ButtonSize } from './Buttons/c_navAreaPrimaryButton.vue'
import type { SearchBarSize } from './c_searchBar.vue'
import type { UserRowSize } from './c_userRow.vue'
import defaultNewIcon from '../assets/userPlus.svg'
import defaultNewIconHover from '../assets/userPlusWhite.svg'

export type ItemMasterManagementSize = 'XXL' | 'XL' | 'LG' | 'MD' | 'SM' | 'XS'

export interface ItemData {
  id: string
  name: string
}

/** Capitaliza la primera letra (para títulos) */
function capitalize(str: string): string {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

const props = withDefaults(
  defineProps<{
    size?: ItemMasterManagementSize
    /** Qué se está listando, en plural (ej: "servicios", "categorías", "usuarios"). Se usa para el título por defecto. */
    itemLabel?: string
    /** Título de la sección; si no se indica se construye como "Gestión de {itemLabel}" */
    title?: string
    /** Texto del botón volver */
    backText?: string
    /** Texto del botón nuevo (ej: "Nuevo servicio", "Nueva categoría") */
    newText?: string
    /** Ruta del icono del botón nuevo (ej: src/assets/userPlus.svg) */
    newButtonIcon?: string
    /** Ruta del icono del botón nuevo en estado hover (opcional; si no se indica se usa newButtonIcon) */
    newButtonIconHover?: string
    /** Lista de ítems */
    items?: ItemData[]
    /** Valor del buscador */
    searchQuery?: string
  }>(),
  {
    size: 'MD',
    itemLabel: 'ítems',
    title: '',
    backText: 'Volver',
    newText: '',
    newButtonIcon: defaultNewIcon,
    newButtonIconHover: defaultNewIconHover,
    items: () => [],
    searchQuery: '',
  }
)

const emit = defineEmits<{
  back: []
  new: []
  'update:searchQuery': [value: string]
  'edit-item': [itemId: string]
  'delete-item': [itemId: string]
  'view-item': [itemId: string]
}>()

/** Ancho máximo del contenedor externo */
const containerMaxWidth = computed(() => {
  const map: Record<ItemMasterManagementSize, string> = {
    'XXL': '1440px',
    'XL': '1200px',
    'LG': '992px',
    'MD': '768px',
    'SM': '576px',
    'XS': '375px',
  }
  return map[props.size]
})

/** Ancho interior para botones, search y lista (más estrecho que el título) */
const innerWidth = computed(() => {
  const map: Record<ItemMasterManagementSize, string> = {
    'XXL': '1024px',
    'XL': '1024px',
    'LG': '768px',
    'MD': '768px',
    'SM': '576px',
    'XS': '375px',
  }
  return map[props.size]
})

/** Título efectivo: el pasado por prop o "Gestión de {itemLabel}" */
const effectiveTitle = computed(() =>
  props.title || `Gestión de ${capitalize(props.itemLabel ?? 'ítems')}`
)

/** Texto efectivo del botón nuevo: el pasado por prop o "Nuevo {itemLabel en singular aproximado}" */
const effectiveNewText = computed(() => {
  if (props.newText) return props.newText
  const label = props.itemLabel ?? 'ítem'
  return `Nuevo ${label.endsWith('s') ? label.slice(0, -1) : label}`
})

/** Tamaño del pageTittle */
const titleSize = computed<PageTitleSize>(() => {
  return props.size as PageTitleSize
})

/** Tamaño de los nav buttons */
const buttonSize = computed<ButtonSize>(() => {
  return props.size as ButtonSize
})

/** Tamaño del searchBar */
const searchBarSize = computed<SearchBarSize>(() => {
  switch (props.size) {
    case 'SM':
    case 'XS':
      return 'XS'
    default:
      return 'XL'
  }
})

/** Tamaño de las filas de ítem */
const itemRowSize = computed<UserRowSize>(() => {
  const map: Record<ItemMasterManagementSize, UserRowSize> = {
    'XXL': 'LG',
    'XL': 'LG',
    'LG': 'MD',
    'MD': 'MD',
    'SM': 'SM',
    'XS': 'XS',
  }
  return map[props.size]
})
</script>

<script lang="ts">
export default {
  name: 'CItemMasterManagement',
}
</script>

<template>
  <div
    class="c_itemMasterManagement"
    :class="`c_itemMasterManagement--${size.toLowerCase()}`"
  >
    <div class="c_itemMasterManagement__container" :style="{ maxWidth: containerMaxWidth }">
      <!-- Título rosa — ocupa todo el ancho -->
      <div class="c_itemMasterManagement__title-wrap">
        <CPageTittle :text="effectiveTitle" :size="titleSize" />
      </div>

      <!-- Área de botones nav -->
      <div class="c_itemMasterManagement__nav-area" :style="{ maxWidth: innerWidth }">
        <CNavAreaPrimaryButton
          :text="backText"
          :size="buttonSize"
          icon-position="before"
          @click="emit('back')"
        >
          <template #icon>
            <img src="../assets/arrowLeft.svg" alt="" />
          </template>
        </CNavAreaPrimaryButton>
        <CNavAreaSecondaryButton
          :text="effectiveNewText"
          :size="buttonSize"
          icon-position="after"
          @click="emit('new')"
        >
          <template #icon>
            <img :src="newButtonIcon ?? defaultNewIcon" alt="" />
          </template>
          <template #icon-hover>
            <img :src="newButtonIconHover ?? newButtonIcon ?? defaultNewIconHover" alt="" />
          </template>
        </CNavAreaSecondaryButton>
      </div>

      <!-- Área de búsqueda -->
      <div class="c_itemMasterManagement__search-area" :style="{ maxWidth: innerWidth }">
        <CSearchBar
          :size="searchBarSize"
          :model-value="searchQuery"
          @update:model-value="emit('update:searchQuery', $event)"
        />
      </div>

      <!-- Slot opcional para filtros adicionales (ej. select de categoría) -->
      <div v-if="$slots.filters" class="c_itemMasterManagement__filters" :style="{ maxWidth: innerWidth }">
        <slot name="filters" />
      </div>

      <!-- Lista de ítems -->
      <div
        class="c_itemMasterManagement__item-list"
        :style="{ maxWidth: innerWidth }"
        :aria-label="`Lista de ${itemLabel}`"
        role="list"
      >
        <CUserRow
          v-for="item in items"
          :key="item.id"
          :name="item.name"
          :size="itemRowSize"
          @edit="emit('edit-item', item.id)"
          @delete="emit('delete-item', item.id)"
          @view="emit('view-item', item.id)"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.c_itemMasterManagement {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #fff;

  &__container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    background-color: #fff;
  }

  &__title-wrap {
    width: 100%;
    background-color: pink;
  }

  &__nav-area {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 26px 0;
    box-sizing: border-box;
    overflow: hidden;
    background-color: #fff;
  }

  &__search-area {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 10px 0;
    min-height: 71px;
    box-sizing: border-box;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
  }

  &__filters {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 8px 0;
    box-sizing: border-box;
  }

  &__item-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  /* Variantes de tamaño */
  &--xxl {
    max-width: 1440px;
    margin: 0 auto;
  }

  &--xl {
    max-width: 1200px;
    margin: 0 auto;
  }

  &--lg {
    max-width: 992px;
    margin: 0 auto;
  }

  &--md {
    max-width: 768px;
    margin: 0 auto;
  }

  &--sm {
    max-width: 576px;
    margin: 0 auto;
  }

  &--xs {
    max-width: 375px;
    margin: 0 auto;
  }
}
</style>
