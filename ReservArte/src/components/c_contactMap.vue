<template>
  <div
    class="c_contactMap"
    :class="`c_contactMap--${size.toLowerCase()}`"
  >
    <div class="c_contactMap__map-wrap">
      <iframe
        class="c_contactMap__iframe"
        :src="mapEmbedUrl"
        style="border: 0;"
        allowfullscreen
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        :title="$t('contact.mapTitle')"
      />
    </div>
    <a
      v-if="viewLargerMapUrl"
      :href="viewLargerMapUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="c_contactMap__view-larger"
    >
      {{ $t('contact.viewLargerMap') }}
    </a>
  </div>
</template>

<script setup lang="ts">
export type ContactMapSize = 'XXL' | 'XL' | 'LG' | 'MD' | 'SM' | 'XS'

const props = withDefaults(
  defineProps<{
    size?: ContactMapSize
    /** URL del iframe de Google Maps (embed). */
    mapEmbedUrl?: string
    /** URL para el enlace "Ver mapa más grande" (abre en nueva pestaña). Opcional. */
    viewLargerMapUrl?: string
  }>(),
  {
    size: 'MD',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2981.4607548047325!2d-0.8956835240197405!3d41.645785971268246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd591541c47a8e2f%3A0x4e6eba888f90be14!2sMore%20than%20brows!5e0!3m2!1ses!2ses!4v1771785941041!5m2!1ses!2ses',
    viewLargerMapUrl: '',
  }
)
</script>

<script lang="ts">
export default {
  name: 'CContactMap',
}
</script>

<style lang="scss" scoped>
.c_contactMap {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  overflow: hidden;

  &__map-wrap {
    width: 100%;
    max-width: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__iframe {
    max-width: 100%;
    display: block;
    box-sizing: border-box;
  }

  &__view-larger {
    width: fit-content;
    padding: 4px 12px;
    color: #0369f0;
    font-size: 12px;
    font-style: normal;
    font-family: Inter, system-ui, sans-serif;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0;
    text-decoration: none;
    border-radius: 4px;
    background-color: #fff;

    &:hover {
      text-decoration: underline;
    }
  }

  /* Contenedor y ancho máximo del mapa por variante */
  &--xxl {
    padding: 0 100px;
    max-width: 1400px;
    margin: 0 auto;
  }
  &--xxl &__map-wrap {
    max-width: 800px;
  }
  &--xxl &__iframe {
    width: 800px;
    height: 600px;
  }

  &--xl {
    padding: 0 100px;
    max-width: 1200px;
    margin: 0 auto;
  }
  &--xl &__map-wrap {
    max-width: 800px;
  }
  &--xl &__iframe {
    width: 800px;
    height: 600px;
  }

  &--lg {
    padding: 0 100px;
    max-width: 992px;
    margin: 0 auto;
  }
  &--lg &__map-wrap {
    max-width: 600px;
  }
  &--lg &__iframe {
    width: 600px;
    height: 450px;
  }

  &--md {
    padding: 0 100px;
    max-width: 768px;
    margin: 0 auto;
  }
  &--md &__map-wrap {
    max-width: 600px;
  }
  &--md &__iframe {
    width: 600px;
    height: 450px;
  }

  &--sm {
    padding: 0 100px;
    max-width: 576px;
    margin: 0 auto;
  }
  &--sm &__map-wrap {
    max-width: 400px;
  }
  &--sm &__iframe {
    width: 400px;
    height: 300px;
  }

  &--xs {
    padding: 0 24px;
    max-width: 375px;
    margin: 0 auto;
  }
  &--xs &__map-wrap {
    max-width: 400px;
  }
  &--xs &__iframe {
    width: 100%;
    min-width: 280px;
    height: 300px;
  }
}
</style>
