<template>
  <div
    class="c_sectionTittle"
    :class="`c_sectionTittle--${size.toLowerCase()}`"
    role="heading"
    :aria-level="2"
  >
    <p class="c_sectionTittle__text">{{ text }}</p>
  </div>
</template>

<script setup lang="ts">
export type SectionTitleSize = 'LG' | 'MD' | 'SM' | 'XS'

const props = withDefaults(
  defineProps<{
    text: string
    size?: SectionTitleSize
  }>(),
  {
    size: 'MD',
  }
)
</script>

<script lang="ts">
export default {
  name: 'CSectionTittle',
}
</script>

<style lang="scss" scoped>
.c_sectionTittle {
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  min-width: 48px;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  &__text {
    margin: 0;
    width: 100%;
    max-width: 100%;
    text-align: left;
    color: #49454f;
    font-style: normal;
    font-family: Georgia, serif;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0;
    text-transform: none;
    text-decoration: none;
  }

  &--lg {
    padding: 32px 12px;
    gap: 32px;
    flex-direction: column;
    justify-content: center;
  }
  &--lg &__text {
    font-size: 36px;
  }

  &--md {
    padding: 24px 12px;
    gap: 24px;
    flex-direction: column;
    justify-content: center;
  }
  &--md &__text {
    font-size: 36px;
  }

  &--sm {
    padding: 16px 12px;
    gap: 16px;
    flex-direction: column;
    justify-content: center;
  }
  &--sm &__text {
    font-size: 24px;
  }

  &--xs {
    padding: 8px 12px;
    gap: 8px;
    flex-direction: column;
    justify-content: center;
  }
  &--xs &__text {
    font-size: 24px;
  }
}
</style>
