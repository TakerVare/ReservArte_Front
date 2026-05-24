<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import CMenuItem from './c_menuItem.vue'
import type { MenuItemSize } from './c_menuItem.vue'

export type UserMenuSize = 'XXL' | 'XL' | 'LG' | 'MD' | 'SM' | 'XS'

export interface MenuItemData {
  id: string
  textKey: string
}

export interface MenuSection {
  id: string
  titleKey: string
  items: MenuItemData[]
}

const { t } = useI18n()

const props = withDefaults(
  defineProps<{
    size?: UserMenuSize
    sections?: MenuSection[]
    isAdmin?: boolean
  }>(),
  {
    size: 'MD',
    isAdmin: true,
    sections: () =>
      [
        {
          id: 'admin',
          titleKey: 'menu.adminArea',
          items: [
            { id: 'citas', textKey: 'menu.bookings' },
            { id: 'clientes', textKey: 'menu.customers' },
            { id: 'servicios', textKey: 'menu.services' },
            { id: 'empleados', textKey: 'menu.employees' },
            { id: 'proveedores', textKey: 'menu.suppliers' },
          ],
        },
        {
          id: 'user',
          titleKey: 'menu.userArea',
          items: [
            { id: 'datos-usuario', textKey: 'menu.userData' },
            { id: 'metodos-pago', textKey: 'menu.paymentMethods' },
            { id: 'notificaciones', textKey: 'menu.notifications' },
            { id: 'privacidad', textKey: 'menu.privacy' },
            { id: 'acerca', textKey: 'menu.about' },
            { id: 'guia-estilo', textKey: 'menu.styleGuide' },
            { id: 'cerrar-sesion', textKey: 'menu.logout' },
          ],
        },
      ] as MenuSection[],
  }
)

const emit = defineEmits<{
  'menu-item-click': [itemId: string]
}>()

/** Ancho máximo del contenedor externo */
const containerMaxWidth = computed(() => {
  const sizeMap: Record<UserMenuSize, string> = {
    'XXL': '690px',
    'XL': '690px',
    'LG': '690px',
    'MD': '690px',
    'SM': '393px',
    'XS': '393px',
  }
  return sizeMap[props.size]
})

/** Tamaño de los menuItems */
const itemSize = computed<MenuItemSize>(() => {
  switch (props.size) {
    case 'SM':
    case 'XS':
      return 'XS'
    default:
      return 'XL'
  }
})

/** Secciones visibles según rol */
const visibleSections = computed(() => {
  if (props.isAdmin) return props.sections
  return props.sections.filter(s => s.id !== 'admin')
})

/** Secciones con títulos e ítems traducidos */
const translatedSections = computed(() =>
  visibleSections.value.map(section => ({
    ...section,
    title: t(section.titleKey),
    items: section.items.map(item => ({ ...item, text: t(item.textKey) })),
  }))
)
</script>

<script lang="ts">
export default {
  name: 'CUserMenu',
}
</script>

<template>
  <div
    class="c_userMenu"
    :class="`c_userMenu--${size.toLowerCase()}`"
  >
    <div class="c_userMenu__container" :style="{ maxWidth: containerMaxWidth }">
      <div class="c_userMenu__card">
        <div
          v-for="(section, sIndex) in translatedSections"
          :key="sIndex"
          class="c_userMenu__list"
        >
          <!-- Label con fondo rosa -->
          <div class="c_userMenu__label">
            <div class="c_userMenu__label-content">
              <p class="c_userMenu__label-text">{{ section.title }}</p>
            </div>
            <div class="c_userMenu__divider-wrap">
              <hr class="c_userMenu__divider" />
            </div>
          </div>
          <!-- Items -->
          <CMenuItem
            v-for="item in section.items"
            :key="item.id"
            :text="item.text"
            :size="itemSize"
            @click="emit('menu-item-click', item.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.c_userMenu {
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
    padding: 0 10px;
    box-sizing: border-box;
  }

  &__card {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &__list {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 2px 0;
    background-color: #fff;
    overflow: hidden;
  }

  &__label {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 2px;
    min-width: 48px;
    min-height: 32px;
    padding: 0 4px;
    box-sizing: border-box;
    background-color: pink;
    overflow: hidden;
  }

  &__label-content {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    box-sizing: border-box;
    overflow: hidden;
  }

  &__label-text {
    margin: 0;
    flex: 1;
    color: #49454f;
    font-family: 'Georgia', serif;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0;
    text-align: left;
    text-transform: none;
    text-decoration: none;
  }

  &__divider-wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 2px 8px;
    min-height: 4px;
    box-sizing: border-box;
  }

  &__divider {
    width: 100%;
    height: 0;
    border: none;
    border-top: 1px solid #ffe4e1;
    margin: 0;
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