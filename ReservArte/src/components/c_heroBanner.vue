<template>
  <div
    class="c_heroBanner"
    :class="`c_heroBanner--${size.toLowerCase()}`"
  >
    <div class="c_heroBanner__container">
      <!-- Título (barra rosa + c_heroTitle) -->
      <div class="c_heroBanner__title-wrap">
        <c_heroTitle
          :text="title"
          :size="size"
        />
      </div>

      <!-- Área de navegación: Volver + Nuevo (ocultables) -->
      <div
        v-if="showBackButton || showNewButton"
        class="c_heroBanner__nav-area"
        :class="{
          'c_heroBanner__nav-area--secondary-only': showNewButton && !showBackButton,
        }"
      >
        <CNavAreaPrimaryButton
          v-if="showBackButton"
          :text="primaryTextComputed"
          :size="size"
          icon-position="before"
          :aria-label="primaryTextComputed"
          @click="emit('back')"
        >
          <template #icon>
            <img src="../assets/arrowLeft.svg" alt="" width="16" height="16" />
          </template>
        </CNavAreaPrimaryButton>
        <CNavAreaSecondaryButton
          v-if="showNewButton"
          :text="secondaryTextComputed"
          :size="size"
          icon-position="after"
          :aria-label="secondaryTextComputed"
          @click="onSecondaryClick"
        >
          <template #icon>
            <img :src="secondaryIcon" alt="" width="16" height="16" />
          </template>
          <template #icon-hover>
            <img :src="secondaryIconHover" alt="" width="16" height="16" />
          </template>
        </CNavAreaSecondaryButton>
      </div>

      <!-- Barra de búsqueda (ocultable) -->
      <div
        v-if="showSearchBar"
        class="c_heroBanner__search-area"
      >
        <c_searchBar
          v-model="searchValue"
          :placeholder="searchPlaceholder"
          :size="searchBarSize"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import c_heroTitle from './c_heroTitle.vue'
import c_searchBar from './c_searchBar.vue'
import CNavAreaPrimaryButton from './Buttons/c_navAreaPrimaryButton.vue'
import CNavAreaSecondaryButton from './Buttons/c_navAreaSecondaryButton.vue'
import userPlusIcon from '../assets/userPlus.svg'
import userPlusIconHover from '../assets/userPlusWhite.svg'
import trashIcon from '../assets/trashUser.svg'
import trashIconHover from '../assets/trashUserWhite.svg'

export type HeroBannerSize = 'XXL' | 'XL' | 'LG' | 'MD' | 'SM' | 'XS'

const props = withDefaults(
  defineProps<{
    /** Título del banner */
    title?: string
    /** Tamaño del banner (define anchos y espaciados) */
    size?: HeroBannerSize
    /** Mostrar botón primario (Volver) */
    showBackButton?: boolean
    /** Mostrar botón secundario (Nuevo) */
    showNewButton?: boolean
    /** Mostrar barra de búsqueda */
    showSearchBar?: boolean
    /** Texto del botón primario (Volver) */
    primaryText?: string
    /** Texto del botón secundario (Nuevo / Eliminar) */
    secondaryText?: string
    /** Acción del botón secundario: 'new' (Nuevo) o 'delete' (Eliminar) */
    secondaryAction?: 'new' | 'delete'
    /** Placeholder de la barra de búsqueda */
    searchPlaceholder?: string
    /** Valor del campo de búsqueda (v-model) */
    modelValue?: string
  }>(),
  {
    title: 'Título pantalla',
    size: 'MD',
    showBackButton: true,
    showNewButton: true,
    showSearchBar: true,
    primaryText: undefined,
    secondaryText: undefined,
    secondaryAction: 'new',
    searchPlaceholder: undefined,
    modelValue: '',
  }
)

const { t } = useI18n()
const primaryTextComputed = computed(() => props.primaryText ?? t('common.back'))
const secondaryTextComputed = computed(() =>
  props.secondaryText ?? (props.secondaryAction === 'delete' ? t('common.delete') : t('common.new'))
)
const secondaryIcon = computed(() => (props.secondaryAction === 'delete' ? trashIcon : userPlusIcon))
const secondaryIconHover = computed(() => (props.secondaryAction === 'delete' ? trashIconHover : userPlusIconHover))

function onSecondaryClick() {
  if (props.secondaryAction === 'delete') {
    emit('delete')
  } else {
    emit('new')
  }
}

const searchValue = computed({
  get: () => props.modelValue ?? '',
  set: (v: string) => emit('update:modelValue', v),
})

/** c_searchBar solo tiene XL | XS */
const searchBarSize = computed(() => (props.size === 'SM' || props.size === 'XS' ? 'XS' : 'XL'))

const emit = defineEmits<{
  back: []
  new: []
  delete: []
  'update:modelValue': [value: string]
}>()
</script>

<script lang="ts">
export default {
  name: 'CHeroBanner',
}
</script>

<style lang="scss" scoped>
.c_heroBanner {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  background-color: #fff;
}

.c_heroBanner__container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.c_heroBanner__title-wrap {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: #ffc0cb;
  padding: 24px 16px;
  min-height: 32px;
  box-sizing: border-box;
}

.c_heroBanner__nav-area {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 26px 0;
  gap: 16px;
  flex-wrap: nowrap;
}

.c_heroBanner__nav-area--secondary-only {
  justify-content: flex-end;
}

.c_heroBanner__search-area {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 0;
  min-height: 71px;
  border-top: 1px solid #f5f5f5;
  border-bottom: 1px solid #f5f5f5;
  box-sizing: border-box;
}

/* Variantes de tamaño: alineadas con useViewportSize (XS: 0, SM: 576, MD: 768, LG: 992, XL: 1200, XXL: 1440).
   Contenedor: mismo valor que breakpoint; XS usa 375px por convención móvil del proyecto. */
.c_heroBanner--xxl .c_heroBanner__container {
  max-width: 1440px;
  margin: 0 auto;
}
.c_heroBanner--xxl .c_heroBanner__title-wrap {
  padding: 64px;
  gap: 32px;
}
.c_heroBanner--xxl .c_heroBanner__nav-area {
  max-width: 1024px;
  margin: 0 auto;
  width: 100%;
  gap: 436px;
}
.c_heroBanner--xxl .c_heroBanner__search-area {
  max-width: 1024px;
  margin: 0 auto;
  padding-left: 32px;
  padding-right: 32px;
}

.c_heroBanner--xl .c_heroBanner__container {
  max-width: 1200px;
  margin: 0 auto;
}
.c_heroBanner--xl .c_heroBanner__title-wrap {
  padding: 48px;
  gap: 32px;
}
.c_heroBanner--xl .c_heroBanner__nav-area {
  max-width: 1024px;
  margin: 0 auto;
  width: 100%;
  gap: 498px;
}
.c_heroBanner--xl .c_heroBanner__search-area {
  max-width: 1024px;
  margin: 0 auto;
  padding-left: 24px;
  padding-right: 24px;
}

.c_heroBanner--lg .c_heroBanner__container {
  max-width: 992px;
  margin: 0 auto;
}
.c_heroBanner--lg .c_heroBanner__title-wrap {
  padding: 32px;
  gap: 32px;
}
.c_heroBanner--lg .c_heroBanner__nav-area {
  max-width: 768px;
  margin: 0 auto;
  width: 100%;
  gap: 294px;
}
.c_heroBanner--lg .c_heroBanner__search-area {
  max-width: 768px;
  margin: 0 auto;
  padding-left: 16px;
  padding-right: 16px;
}

.c_heroBanner--md .c_heroBanner__container {
  max-width: 768px;
  margin: 0 auto;
}
.c_heroBanner--md .c_heroBanner__title-wrap {
  padding: 24px;
  gap: 24px;
}
.c_heroBanner--md .c_heroBanner__nav-area {
  max-width: 768px;
  margin: 0 auto;
  width: 100%;
  gap: 350px;
}
.c_heroBanner--md .c_heroBanner__search-area {
  max-width: 768px;
  margin: 0 auto;
  padding-left: 12px;
  padding-right: 12px;
}

.c_heroBanner--sm .c_heroBanner__container {
  max-width: 576px;
  margin: 0 auto;
}
.c_heroBanner--sm .c_heroBanner__title-wrap {
  padding: 16px;
  gap: 16px;
}
.c_heroBanner--sm .c_heroBanner__nav-area {
  max-width: 576px;
  margin: 0 auto;
  width: 100%;
  gap: 204px;
}
.c_heroBanner--sm .c_heroBanner__search-area {
  max-width: 576px;
  margin: 0 auto;
  padding-left: 12px;
  padding-right: 12px;
}

/* XS: diseño según Figma (node 346-3037) — una línea, misma altura */
.c_heroBanner--xs .c_heroBanner__container {
  max-width: 375px;
  margin: 0 auto;
  width: 100%;
}
.c_heroBanner--xs .c_heroBanner__title-wrap {
  padding: 8px;
  gap: 8px;
  width: 100%;
  max-width: 375px;
  box-sizing: border-box;
}
.c_heroBanner--xs .c_heroBanner__nav-area {
  max-width: 375px;
  margin: 0 auto;
  width: 100%;
  padding: 26px 4px;
  gap: 0;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  min-height: 55px;
  box-sizing: border-box;
}
.c_heroBanner--xs .c_heroBanner__nav-area > * {
  flex-shrink: 0;
  align-self: center;
  height: 55px;
  display: flex;
  align-items: center;
}

.c_heroBanner--xs .c_heroBanner__nav-area :deep(.c_navAreaPrimaryButton__btn),
.c_heroBanner--xs .c_heroBanner__nav-area :deep(.c_navAreaSecondaryButton__btn) {
  height: 55px;
  min-height: 55px;
}
.c_heroBanner--xs .c_heroBanner__search-area {
  max-width: 375px;
  margin: 0 auto;
  width: 100%;
  padding: 10px 12px;
  box-sizing: border-box;
}
</style>
