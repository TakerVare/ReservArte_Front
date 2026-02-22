<template>
  <div
    class="c_contentAreaPrimaryButton"
    :class="[
      { 'c_contentAreaPrimaryButton--disabled': disabled },
      `c_contentAreaPrimaryButton--${size}`,
    ]"
  >
    <button
      type="button"
      class="c_contentAreaPrimaryButton__btn"
      :disabled="disabled"
      :aria-disabled="disabled"
      @click="handleClick"
    >
      <span class="c_contentAreaPrimaryButton__text">{{ text }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
export type ButtonSize = 'XXL' | 'XL' | 'LG' | 'MD' | 'SM' | 'XS'

const props = withDefaults(
  defineProps<{
    text: string
    disabled?: boolean
    size?: ButtonSize
  }>(),
  {
    disabled: false,
    size: 'MD',
  }
)

const emit = defineEmits<{
  click: []
}>()

function handleClick() {
  if (props.disabled) return
  emit('click')
}
</script>

<script lang="ts">
export default {
  name: 'CContentAreaPrimaryButton',
}
</script>

<style lang="scss" scoped>
.c_contentAreaPrimaryButton {
  width: fit-content;
  box-sizing: border-box;

  &--disabled {
    opacity: 0.6;
  }

  &__btn {
    display: flex;
    overflow: hidden;
    position: relative;
    border: 1px solid #FFB6C1;
    border-radius: 0;
    align-items: center;
    justify-content: center;
    background-color: #FFB6C1;
    cursor: pointer;
    margin: 0;
    font: inherit;
    color: inherit;

    /* Hold (hover / active) */
    &:hover:not(:disabled) {
      border-color: #FFC0CB;
      background-color: #FFC0CB;
    }

    &:active:not(:disabled) {
      border-color: #FFC0CB;
      background-color: #FFC0CB;
    }

    &:disabled {
      cursor: not-allowed;
    }

    &:focus-visible {
      outline: 2px solid #FFC0CB;
      outline-offset: 2px;
    }
  }

  &__text {
    margin: 0;
    text-align: center;
    color: white;
    font-style: normal;
    font-family: Georgia, serif;
    font-weight: 700;
    letter-spacing: 0.55px;
    word-wrap: break-word;
    text-transform: none;
    text-decoration: none;
  }

  /* Size variants – ajustar según especificaciones exactas de Figma */
  &--XS &__btn {
    padding: 4px 8px;
  }
  &--XS &__text {
    color: white;
    font-size: 12px;
    font-family: Georgia, serif;
    font-weight: 700;
    line-height: 12px;
    letter-spacing: 0.55px;
    word-wrap: break-word;
  }

  &--SM &__btn {
    padding: 8px 16px;
  }
  &--SM &__text {
    color: white;
    font-size: 16px;
    font-family: Georgia, serif;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0.55px;
    word-wrap: break-word;
  }

  &--MD &__btn {
    padding: 12px 24px;
  }
  &--MD &__text {
    color: white;
    font-size: 16px;
    font-family: Georgia, serif;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0.55px;
    word-wrap: break-word;
  }

  &--LG &__btn {
    padding: 16px 32px;
  }
  &--LG &__text {
    color: white;
    font-size: 20px;
    font-family: Georgia, serif;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0.55px;
    word-wrap: break-word;
  }

  &--XL &__btn {
    padding: 24px 48px;
  }
  &--XL &__text {
    color: white;
    font-size: 20px;
    font-family: Georgia, serif;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0.55px;
    word-wrap: break-word;
  }

  &--XXL &__btn {
    padding: 32px 64px;
  }
  &--XXL &__text {
    color: white;
    font-size: 20px;
    font-family: Georgia, serif;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0.55px;
    word-wrap: break-word;
  }
}
</style>
