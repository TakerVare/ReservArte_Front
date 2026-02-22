<template>
  <div
    class="c_navAreaSecondaryButton"
    :class="[
      { 'c_navAreaSecondaryButton--disabled': disabled },
      `c_navAreaSecondaryButton--${size}`,
    ]"
  >
    <button
      type="button"
      class="c_navAreaSecondaryButton__btn"
      :disabled="disabled"
      :aria-disabled="disabled"
      @click="handleClick"
    >
      <span class="c_navAreaSecondaryButton__inner">
        <span
          v-if="hasIcon && iconPosition === 'before'"
          class="c_navAreaSecondaryButton__icon"
          aria-hidden="true"
        >
          <slot name="icon" />
        </span>
        <span class="c_navAreaSecondaryButton__text">{{ text }}</span>
        <span
          v-if="hasIcon && iconPosition === 'after'"
          class="c_navAreaSecondaryButton__icon"
          aria-hidden="true"
        >
          <slot name="icon" />
        </span>
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useSlots, computed } from 'vue'

export type ButtonSize = 'XXL' | 'XL' | 'LG' | 'MD' | 'SM' | 'XS'
export type IconPosition = 'before' | 'after'

const props = withDefaults(
  defineProps<{
    text: string
    disabled?: boolean
    size?: ButtonSize
    iconPosition?: IconPosition
  }>(),
  {
    disabled: false,
    size: 'MD',
    iconPosition: 'after',
  }
)

const slots = useSlots()
const hasIcon = computed(() => !!(slots.icon?.()?.length))

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
  name: 'CNavAreaSecondaryButton',
}
</script>

<style lang="scss" scoped>
.c_navAreaSecondaryButton {
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
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    background-color: #FFFFFF;
    color: #FFB6C1;
    cursor: pointer;
    margin: 0;
    font: inherit;

    /* Hold (hover / active) – secundario */
    &:hover:not(:disabled) {
      border-color: #FFC0CB;
      background-color: #FFC0CB;
      color: white;
    }

    &:active:not(:disabled) {
      border-color: #FFC0CB;
      background-color: #FFC0CB;
      color: white;
    }

    &:disabled {
      cursor: not-allowed;
      background-color: #FFB6C1;
      color: white;
    }

    &:focus-visible {
      outline: 2px solid #FFC0CB;
      outline-offset: 2px;
    }
  }

  &__inner {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  &__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    :deep(svg) {
      width: 1em;
      height: 1em;
      font-size: inherit;
    }

    :deep(img) {
      width: 1em;
      height: 1em;
      object-fit: contain;
    }
  }

  &__text {
    margin: 0;
    text-align: center;
    color: inherit;
    font-style: normal;
    font-family: Georgia, serif;
    font-weight: 700;
    letter-spacing: 0.55px;
    word-wrap: break-word;
    text-transform: none;
    text-decoration: none;
  }

  /* Size variants – mismas dimensiones que Nav Area Primary */
  &--XS {
    width: 163px;
    padding: 0 4px;
    box-sizing: border-box;
  }
  &--XS &__btn {
    width: 100%;
    height: 55px;
    padding: 4px 8px;
  }
  &--XS &__inner {
    gap: 4px;
  }
  &--XS &__icon {
    width: 16px;
    height: 16px;
  }
  &--XS &__icon :deep(svg),
  &--XS &__icon :deep(img) {
    width: 16px;
    height: 16px;
  }
  &--XS &__text {
    font-size: 20px;
    font-family: Georgia, serif;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0.55px;
    word-wrap: break-word;
  }

  &--SM {
    width: 186px;
    padding: 0 8px;
    box-sizing: border-box;
  }
  &--SM &__btn {
    width: 100%;
    height: 60px;
    padding: 8px 16px;
  }
  &--SM &__inner {
    gap: 8px;
  }
  &--SM &__icon {
    width: 16px;
    height: 16px;
  }
  &--SM &__icon :deep(svg),
  &--SM &__icon :deep(img) {
    width: 16px;
    height: 16px;
  }
  &--SM &__text {
    font-size: 20px;
    font-family: Georgia, serif;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0.55px;
    word-wrap: break-word;
  }

  &--MD {
    width: 209px;
    padding: 0 12px;
    box-sizing: border-box;
  }
  &--MD &__btn {
    width: 100%;
    height: 65px;
    padding: 12px 24px;
  }
  &--MD &__inner {
    gap: 12px;
  }
  &--MD &__icon {
    width: 16px;
    height: 16px;
  }
  &--MD &__icon :deep(svg),
  &--MD &__icon :deep(img) {
    width: 16px;
    height: 16px;
  }
  &--MD &__text {
    font-size: 20px;
    font-family: Georgia, serif;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0.55px;
    word-wrap: break-word;
  }

  &--LG {
    width: 232px;
    padding: 0 16px;
    box-sizing: border-box;
  }
  &--LG &__btn {
    width: 100%;
    height: 70px;
    padding: 16px 32px;
  }
  &--LG &__inner {
    gap: 16px;
  }
  &--LG &__icon {
    width: 16px;
    height: 16px;
  }
  &--LG &__icon :deep(svg),
  &--LG &__icon :deep(img) {
    width: 16px;
    height: 16px;
  }
  &--LG &__text {
    font-size: 20px;
    font-family: Georgia, serif;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0.55px;
    word-wrap: break-word;
  }

  &--XL {
    width: 263px;
    padding: 0 24px;
    box-sizing: border-box;
  }
  &--XL &__btn {
    width: 100%;
    height: 75px;
    padding: 32px 64px;
  }
  &--XL &__inner {
    gap: 16px;
  }
  &--XL &__icon {
    width: 16px;
    height: 16px;
  }
  &--XL &__icon :deep(svg),
  &--XL &__icon :deep(img) {
    width: 16px;
    height: 16px;
  }
  &--XL &__text {
    font-size: 20px;
    font-family: Georgia, serif;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0.55px;
    word-wrap: break-word;
  }

  &--XXL &__btn {
    width: 230px;
    height: 75px;
    padding: 32px 64px;
  }
  &--XXL &__text {
    font-size: 20px;
    font-family: Georgia, serif;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0.55px;
    word-wrap: break-word;
  }
}
</style>
