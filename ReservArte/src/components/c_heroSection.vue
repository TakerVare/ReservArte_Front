<script setup lang="ts">
import { computed } from 'vue'
import CHeroTitle from './c_heroTitle.vue'
import CHeroDescription from './c_heroDescription.vue'
import CContentAreaPrimaryButton from './Buttons/c_contentAreaPrimaryButton.vue'
import type { HeroTitleSize } from './c_heroTitle.vue'
import type { HeroDescriptionSize } from './c_heroDescription.vue'
import type { ButtonSize } from './Buttons/c_contentAreaPrimaryButton.vue'

export type HeroSectionSize = 'XXL' | 'XL' | 'LG' | 'MD' | 'SM' | 'XS'

const props = withDefaults(
  defineProps<{
    size?: HeroSectionSize
    /** Título principal del hero */
    title?: string
    /** Texto descriptivo del hero */
    description?: string
    /** Texto del botón */
    buttonText?: string
  }>(),
  {
    size: 'MD',
    title: 'Tu mirada habla de ti.',
    description: 'Tu espacio de confianza para el cuidado profesional de tus cejas. Unimos conocimiento experto con un trato cercano y humano.',
    buttonText: 'Entrar',
  }
)

const emit = defineEmits<{
  enter: []
}>()

/** Ancho máximo del contenedor interno */
const containerMaxWidth = computed(() => {
  const sizeMap: Record<HeroSectionSize, string> = {
    'XXL': '690px',
    'XL': '690px',
    'LG': '690px',
    'MD': '690px',
    'SM': '393px',
    'XS': '393px',
  }
  return sizeMap[props.size]
})

/** Tamaño del título */
const titleSize = computed<HeroTitleSize>(() => {
  switch (props.size) {
    case 'SM':
    case 'XS':
      return 'XS'
    default:
      return props.size as HeroTitleSize
  }
})

/** Tamaño de la descripción */
const descriptionSize = computed<HeroDescriptionSize>(() => {
  switch (props.size) {
    case 'SM':
    case 'XS':
      return 'XS'
    default:
      return props.size as HeroDescriptionSize
  }
})

/** Tamaño del botón — mismo patrón que c_loginForm */
const buttonSize = computed<ButtonSize>(() => {
  switch (props.size) {
    case 'XXL':
    case 'XL':
    case 'LG':
    case 'MD':
      return 'Form-L'
    case 'SM':
      return 'Form-M'
    case 'XS':
      return 'Form-S'
    default:
      return 'Form-S'
  }
})
</script>

<script lang="ts">
export default {
  name: 'CHeroSection',
}
</script>

<template>
  <div
    class="c_heroSection"
    :class="`c_heroSection--${size.toLowerCase()}`"
  >
    <div class="c_heroSection__container" :style="{ maxWidth: containerMaxWidth }">
      <div class="c_heroSection__title-wrap">
        <CHeroTitle :text="title" :size="titleSize" />
      </div>
      <div class="c_heroSection__description-wrap">
        <CHeroDescription :text="description" :size="descriptionSize" />
      </div>
      <div class="c_heroSection__button-wrap">
        <CContentAreaPrimaryButton
          :text="buttonText"
          :size="buttonSize"
          @click="emit('enter')"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.c_heroSection {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;

  /*
   * Imagen de fondo (líneas rosas decorativas).
   * Aplicada al contenedor padre para que cubra todo el ancho.
   */
  background-image: url('../assets/hero-bg.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  &__container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &__title-wrap {
    width: 100%;
  }

  &__description-wrap {
    width: 100%;
    padding: 10px 0;
  }

  &__button-wrap {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 30px;
    box-sizing: border-box;
    min-height: 109px;
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