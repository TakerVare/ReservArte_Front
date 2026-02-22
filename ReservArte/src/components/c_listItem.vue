<template>
  <div
    class="c_listItem"
    :class="`c_listItem--${size.toLowerCase()}`"
  >
    <div class="c_listItem__row">
      <div class="c_listItem__title-wrap">
        <p class="c_listItem__title">{{ title }}</p>
      </div>
      <div class="c_listItem__actions">
        <button
          type="button"
          class="c_listItem__action"
          aria-label="Editar"
          @click="$emit('edit')"
        >
          <slot name="icon-edit">
            <img :src="editIcon" alt="Editar" class="c_listItem__action-img" />
          </slot>
        </button>
        <button
          type="button"
          class="c_listItem__action"
          aria-label="Eliminar"
          @click="$emit('delete')"
        >
          <slot name="icon-delete">
            <img :src="deleteIcon" alt="Eliminar" class="c_listItem__action-img" />
          </slot>
        </button>
        <button
          type="button"
          class="c_listItem__action"
          aria-label="Confirmar"
          @click="$emit('check')"
        >
          <slot name="icon-check">
            <img :src="checkIcon" alt="Confirmar" class="c_listItem__action-img" />
          </slot>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import editIcon from '../assets/edit.svg'
import deleteIcon from '../assets/delete.svg'
import checkIcon from '../assets/check.svg'

export type ListItemSize = 'LG' | 'MD' | 'SM' | 'XS'

withDefaults(
  defineProps<{
    title: string
    size?: ListItemSize
  }>(),
  {
    size: 'MD',
  }
)

defineEmits<{
  edit: []
  delete: []
  check: []
}>()
</script>

<script lang="ts">
export default {
  name: 'CListItem',
}
</script>

<style lang="scss" scoped>
.c_listItem {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  background-color: #fff;

  &__row {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    border-top: 1px solid #f5f5f5;
    box-sizing: border-box;
  }

  &__title-wrap {
    flex: 1;
    min-width: 0;
  }

  &__title {
    margin: 0;
    text-align: left;
    color: #1a1a1a;
    font-style: normal;
    font-family: Georgia, serif;
    line-height: normal;
    letter-spacing: 0;
    text-transform: none;
    text-decoration: none;
  }

  &__actions {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    gap: 20px;
  }

  &__action {
    padding: 0;
    margin: 0;
    border: none;
    background: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    :deep(svg),
    :deep(img) {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__action-img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  /* LG */
  &--lg {
    max-width: 960px;
    margin: 0 auto;
  }
  &--lg &__row {
    padding: 32px 20px;
  }
  &--lg &__title-wrap {
    max-width: 720px;
  }
  &--lg &__title {
    font-size: 36px;
    font-weight: 400;
  }
  &--lg &__action {
    width: 56px;
    height: 56px;
  }

  /* MD */
  &--md {
    max-width: 744px;
    margin: 0 auto;
  }
  &--md &__row {
    padding: 24px 20px;
  }
  &--md &__title-wrap {
    max-width: 480px;
  }
  &--md &__title {
    font-size: 24px;
    font-weight: 400;
  }
  &--md &__action {
    width: 56px;
    height: 56px;
  }

  /* SM */
  &--sm {
    max-width: 552px;
    margin: 0 auto;
  }
  &--sm &__row {
    padding: 11px 20px;
  }
  &--sm &__title {
    font-size: 18px;
    font-weight: 700;
  }
  &--sm &__actions {
    gap: 4px;
  }
  &--sm &__action {
    width: 44px;
    height: 44px;
  }

  /* XS */
  &--xs {
    max-width: 351px;
    margin: 0 auto;
  }
  &--xs &__row {
    padding: 11px 20px;
  }
  &--xs &__title-wrap {
    max-width: 203px;
  }
  &--xs &__title {
    font-size: 18px;
    font-weight: 700;
  }
  &--xs &__actions {
    gap: 4px;
  }
  &--xs &__action {
    width: 44px;
    height: 44px;
  }
}
</style>
