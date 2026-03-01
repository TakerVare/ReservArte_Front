<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import CPageTittle from './c_pageTittle.vue'
import CNavAreaPrimaryButton from './Buttons/c_navAreaPrimaryButton.vue'
import CNavAreaSecondaryButton from './Buttons/c_navAreaSecondaryButton.vue'
import CSearchBar from './c_searchBar.vue'
import CUserRow from './c_userRow.vue'
import type { PageTitleSize } from './c_pageTittle.vue'
import type { ButtonSize } from './Buttons/c_navAreaPrimaryButton.vue'
import type { SearchBarSize } from './c_searchBar.vue'
import type { UserRowSize } from './c_userRow.vue'

export type UserManagementSize = 'XXL' | 'XL' | 'LG' | 'MD' | 'SM' | 'XS'

export interface UserData {
  id: string
  name: string
}

const props = withDefaults(
  defineProps<{
    size?: UserManagementSize
    /** Título de la sección */
    title?: string
    /** Texto del botón volver */
    backText?: string
    /** Texto del botón nuevo */
    newText?: string
    /** Lista de usuarios */
    users?: UserData[]
    /** Valor del buscador */
    searchQuery?: string
  }>(),
  {
    size: 'MD',
    title: '',
    backText: '',
    newText: '',
    users: () => [],
    searchQuery: '',
  }
)

const { t } = useI18n()
const titleComputed = computed(() => props.title || t('admin.users'))
const backTextComputed = computed(() => props.backText || t('common.back'))
const newTextComputed = computed(() => props.newText || t('common.new'))
const searchPlaceholder = computed(() => t('search.placeholder'))

const emit = defineEmits<{
  back: []
  new: []
  'update:searchQuery': [value: string]
  'edit-user': [userId: string]
  'delete-user': [userId: string]
  'view-user': [userId: string]
}>()

/** Ancho máximo del contenedor externo */
const containerMaxWidth = computed(() => {
  const map: Record<UserManagementSize, string> = {
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
  const map: Record<UserManagementSize, string> = {
    'XXL': '1024px',
    'XL': '1024px',
    'LG': '768px',
    'MD': '768px',
    'SM': '576px',
    'XS': '375px',
  }
  return map[props.size]
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

/** Tamaño de las filas de usuario */
const userRowSize = computed<UserRowSize>(() => {
  const map: Record<UserManagementSize, UserRowSize> = {
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
  name: 'CUserManagement',
}
</script>

<template>
  <div
    class="c_userManagement"
    :class="`c_userManagement--${size.toLowerCase()}`"
  >
    <div class="c_userManagement__container" :style="{ maxWidth: containerMaxWidth }">
      <!-- Título rosa — ocupa todo el ancho -->
      <div class="c_userManagement__title-wrap">
        <CPageTittle :text="titleComputed" :size="titleSize" />
      </div>

      <!-- Área de botones nav -->
      <div class="c_userManagement__nav-area" :style="{ maxWidth: innerWidth }">
        <CNavAreaPrimaryButton
          :text="backTextComputed"
          :size="buttonSize"
          icon-position="before"
          @click="emit('back')"
        >
          <template #icon>
            <img src="../assets/arrowLeft.svg" alt="" />
          </template>
        </CNavAreaPrimaryButton>
        <CNavAreaSecondaryButton
          :text="newTextComputed"
          :size="buttonSize"
          icon-position="after"
          @click="emit('new')"
        >
          <template #icon>
            <img src="../assets/userPlus.svg" alt="" />
          </template>
          <template #icon-hover>
            <img src="../assets/userPlusWhite.svg" alt="" />
          </template>
        </CNavAreaSecondaryButton>
      </div>

      <!-- Área de búsqueda -->
      <div class="c_userManagement__search-area" :style="{ maxWidth: innerWidth }">
        <CSearchBar
          :size="searchBarSize"
          :placeholder="searchPlaceholder"
          :model-value="searchQuery"
          @update:model-value="emit('update:searchQuery', $event)"
        />
      </div>

      <!-- Lista de usuarios -->
      <div class="c_userManagement__user-list" :style="{ maxWidth: innerWidth }">
        <CUserRow
          v-for="user in users"
          :key="user.id"
          :name="user.name"
          :size="userRowSize"
          @edit="emit('edit-user', user.id)"
          @delete="emit('delete-user', user.id)"
          @view="emit('view-user', user.id)"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.c_userManagement {
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

  &__user-list {
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