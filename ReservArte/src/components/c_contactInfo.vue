<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import CContactMainTitle from './c_contactMainTitle.vue'
import COpeningDays from './c_openingDays.vue'
import COpeningHours from './c_openingHours.vue'
import CContactData from './c_contactData.vue'
import phoneIcon from '../assets/phone.svg'
import instagramIcon from '../assets/instagram.svg'

export type ContactInfoSize = 'XXL' | 'XL' | 'LG' | 'MD' | 'SM' | 'XS'

const props = withDefaults(
  defineProps<{
    size?: ContactInfoSize
    /** Título de la sección de horarios */
    openingTitle?: string
    /** Días de apertura (ej: "Lunes a viernes:") */
    openingDays?: string
    /** Primera franja horaria (ej: "de 10:00 a 14:00") */
    openingHours1?: string
    /** Segunda franja horaria (ej: "de 15:00 a 20:00") */
    openingHours2?: string
    /** Título de la sección de datos de contacto */
    contactTitle?: string
    /** Texto del teléfono */
    phone?: string
    /** Texto de Instagram */
    instagram?: string
  }>(),
  {
    size: 'MD',
    openingTitle: undefined,
    openingDays: undefined,
    openingHours1: undefined,
    openingHours2: undefined,
    contactTitle: undefined,
    phone: '649 227 139',
    instagram: '@morethanbrows.zgz',
  }
)

const { t } = useI18n()
const openingTitleText = computed(() => props.openingTitle ?? t('contact.openingTitle'))
const openingDaysText = computed(() => props.openingDays ?? t('contact.openingDays'))
const openingHours1Text = computed(() => props.openingHours1 ?? t('contact.openingHours1'))
const openingHours2Text = computed(() => props.openingHours2 ?? t('contact.openingHours2'))
const contactTitleText = computed(() => props.contactTitle ?? t('contact.contactTitle'))

/** Ancho máximo del contenedor interno según size */
const containerMaxWidth = computed(() => {
  const sizeMap: Record<ContactInfoSize, string> = {
    'XXL': '800px',
    'XL': '800px',
    'LG': '600px',
    'MD': '600px',
    'SM': '397px',
    'XS': '375px',
  }
  return sizeMap[props.size]
})

/** Tamaño que reciben los átomos hijos */
const atomSize = computed<'XL' | 'MD' | 'SM' | 'XS'>(() => {
  switch (props.size) {
    case 'XXL':
    case 'XL':
      return 'XL'
    case 'LG':
    case 'MD':
      return 'MD'
    case 'SM':
      return 'SM'
    case 'XS':
      return 'XS'
    default:
      return 'MD'
  }
})
</script>

<script lang="ts">
export default {
  name: 'CContactInfo',
}
</script>

<template>
  <div
    class="c_contactInfo"
    :class="`c_contactInfo--${size.toLowerCase()}`"
  >
    <div class="c_contactInfo__container" :style="{ maxWidth: containerMaxWidth }">
      <!-- Sección: Horario de apertura -->
      <CContactMainTitle :text="openingTitleText" :size="atomSize" />
      <COpeningDays :text="openingDaysText" :size="atomSize" />
      <COpeningHours :text="openingHours1Text" :size="atomSize" />
      <COpeningHours :text="openingHours2Text" :size="atomSize" />

      <!-- Sección: Datos de contacto -->
      <CContactMainTitle :text="contactTitleText" :size="atomSize" />
      <CContactData :text="phone" :size="atomSize">
        <template #icon>
          <img :src="phoneIcon" :alt="$t('contact.phone')" />
        </template>
      </CContactData>
      <CContactData :text="instagram" :size="atomSize">
        <template #icon>
          <img :src="instagramIcon" :alt="$t('contact.instagram')" />
        </template>
      </CContactData>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.c_contactInfo {
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
    padding: 64px 0;
  }

  /* Variantes de tamaño — mismo patrón que loginForm */
  &--xxl {
    max-width: 1440px;
    margin: 0 auto;
  }
  &--xxl &__container {
    padding: 64px;
  }

  &--xl {
    max-width: 1200px;
    margin: 0 auto;
  }
  &--xl &__container {
    padding: 48px;
  }

  &--lg {
    max-width: 992px;
    margin: 0 auto;
  }
  &--lg &__container {
    padding: 32px;
  }

  &--md {
    max-width: 768px;
    margin: 0 auto;
  }
  &--md &__container {
    padding: 24px;
  }

  &--sm {
    max-width: 576px;
    margin: 0 auto;
  }
  &--sm &__container {
    padding: 16px;
  }

  &--xs {
    max-width: 375px;
    margin: 0 auto;
  }
  &--xs &__container {
    padding: 16px;
  }
}
</style>