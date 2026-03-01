<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import CBookingTitle from './c_bookingTitle.vue'
import CNoBooked from './c_noBooked.vue'
import CContentAreaPrimaryButton from './Buttons/c_contentAreaPrimaryButton.vue'
import type { ButtonSize } from './Buttons/c_contentAreaPrimaryButton.vue'

export type BookingEmptySize = 'XXL' | 'XL' | 'LG' | 'MD' | 'SM' | 'XS'

const props = withDefaults(
  defineProps<{
    size?: BookingEmptySize
    /** Título de la sección */
    title?: string
    /** Mensaje de estado vacío */
    emptyMessage?: string
    /** Texto del botón */
    buttonText?: string
  }>(),
  {
    size: 'MD',
    title: undefined,
    emptyMessage: undefined,
    buttonText: undefined,
  }
)

const { t } = useI18n()
const titleText = computed(() => props.title ?? t('booking.nextAppointment'))
const emptyMessageText = computed(() => props.emptyMessage ?? t('booking.noAppointments'))
const buttonTextComputed = computed(() => props.buttonText ?? t('booking.bookButton'))

const emit = defineEmits<{
  book: []
}>()

/** Ancho máximo del contenedor interno */
const containerMaxWidth = computed(() => {
  const sizeMap: Record<BookingEmptySize, string> = {
    'XXL': '690px',
    'XL': '690px',
    'LG': '690px',
    'MD': '690px',
    'SM': '343px',
    'XS': '343px',
  }
  return sizeMap[props.size]
})

/** Tamaño del título */
const titleSize = computed<'SM' | 'XS'>(() => {
  switch (props.size) {
    case 'SM':
    case 'XS':
      return 'XS'
    default:
      return 'SM'
  }
})

/** Tamaño del mensaje vacío */
const emptySize = computed<'XL' | 'XS'>(() => {
  switch (props.size) {
    case 'SM':
    case 'XS':
      return 'XS'
    default:
      return 'XL'
  }
})

/** Tamaño del botón — siempre grande */
const buttonSize = computed<ButtonSize>(() => 'LG')
</script>

<script lang="ts">
export default {
  name: 'CBookingEmpty',
}
</script>

<template>
  <div
    class="c_bookingEmpty"
    :class="`c_bookingEmpty--${size.toLowerCase()}`"
  >
    <div class="c_bookingEmpty__container" :style="{ maxWidth: containerMaxWidth }">
      <div class="c_bookingEmpty__title-wrap">
        <CBookingTitle :text="titleText" :size="titleSize" />
      </div>
      <div class="c_bookingEmpty__message-wrap">
        <CNoBooked :text="emptyMessageText" :size="emptySize" />
      </div>
      <div class="c_bookingEmpty__button-wrap">
        <CContentAreaPrimaryButton
          :text="buttonTextComputed"
          :size="buttonSize"
          @click="emit('book')"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.c_bookingEmpty {
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
    justify-content: center;
  }

  &__title-wrap {
    padding: 32px 64px 64px;
  }

  &__message-wrap {
    padding: 32px 32px 64px;
  }

  &__button-wrap {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 90px;
    box-sizing: border-box;
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
  &--sm &__title-wrap {
    padding: 16px 32px 32px;
  }
  &--sm &__message-wrap {
    padding: 16px 16px 64px;
  }
  &--sm &__button-wrap {
    padding: 14px 10px;
  }

  &--xs {
    max-width: 375px;
    margin: 0 auto;
  }
  &--xs &__title-wrap {
    padding: 16px 32px 32px;
  }
  &--xs &__message-wrap {
    padding: 16px 16px 64px;
  }
  &--xs &__button-wrap {
    padding: 14px 10px;
  }
}
</style>