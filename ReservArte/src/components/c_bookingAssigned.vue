<script setup lang="ts">
import { computed } from 'vue'
import CBookingTitle from './c_bookingTitle.vue'
import CBookedDate from './c_bookedDate.vue'
import CContentAreaPrimaryButton from './Buttons/c_contentAreaPrimaryButton.vue'
import CContentAreaSecondaryButton from './Buttons/c_contentAreaSecondaryButton.vue'
import type { ButtonSize } from './Buttons/c_contentAreaPrimaryButton.vue'

export type BookingAssignedSize = 'XXL' | 'XL' | 'LG' | 'MD' | 'SM' | 'XS'

const props = withDefaults(
  defineProps<{
    size?: BookingAssignedSize
    /** Título de la sección */
    title?: string
    /** Fecha y hora de la cita (ej: "24 Dic - 10:00h") */
    dateTime?: string
    /** Texto del botón primario */
    primaryText?: string
    /** Texto del botón secundario */
    secondaryText?: string
  }>(),
  {
    size: 'MD',
    title: 'Próxima cita:',
    dateTime: '24 Dic - 10:00h',
    primaryText: 'Modificar',
    secondaryText: 'Cancelar',
  }
)

const emit = defineEmits<{
  modify: []
  cancel: []
}>()

/** Ancho máximo del contenedor interno */
const containerMaxWidth = computed(() => {
  const sizeMap: Record<BookingAssignedSize, string> = {
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

/** Tamaño de la fecha */
const dateSize = computed<'XL' | 'XS'>(() => {
  switch (props.size) {
    case 'SM':
    case 'XS':
      return 'XS'
    default:
      return 'XL'
  }
})

/** Tamaño de los botones — siempre grande */
const buttonSize = computed<ButtonSize>(() => 'LG')
</script>

<script lang="ts">
export default {
  name: 'CBookingAssigned',
}
</script>

<template>
  <div
    class="c_bookingAssigned"
    :class="`c_bookingAssigned--${size.toLowerCase()}`"
  >
    <div class="c_bookingAssigned__container" :style="{ maxWidth: containerMaxWidth }">
      <div class="c_bookingAssigned__title-wrap">
        <CBookingTitle :text="title" :size="titleSize" />
      </div>
      <div class="c_bookingAssigned__date-wrap">
        <CBookedDate :text="dateTime" :size="dateSize" />
      </div>
      <div class="c_bookingAssigned__buttons-wrap">
        <CContentAreaPrimaryButton
          :text="primaryText"
          :size="buttonSize"
          @click="emit('modify')"
        />
        <CContentAreaSecondaryButton
          :text="secondaryText"
          :size="buttonSize"
          @click="emit('cancel')"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.c_bookingAssigned {
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

  &__date-wrap {
    width: 100%;
    padding: 32px 32px 64px;
    box-sizing: border-box;
  }

  &__buttons-wrap {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
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
  &--sm &__date-wrap {
    padding: 8px 8px 16px;
  }
  &--sm &__buttons-wrap {
    padding: 10px 10px;
  }

  &--xs {
    max-width: 375px;
    margin: 0 auto;
  }
  &--xs &__title-wrap {
    padding: 16px 32px 32px;
  }
  &--xs &__date-wrap {
    padding: 8px 8px 16px;
  }
  &--xs &__buttons-wrap {
    padding: 10px 10px;
  }
}
</style>