<script setup lang="ts">
import { computed } from 'vue'
import arrowIcon from '../assets/arrowUser.svg'

export type MenuItemSize = 'XL' | 'XS'

const props = withDefaults(
  defineProps<{
    /** Texto del item */
    text: string
    /** Tamaño del componente */
    size?: MenuItemSize
  }>(),
  {
    size: 'XL',
  }
)

const emit = defineEmits<{
  click: []
}>()

const maxWidth = computed(() => {
  const sizeMap: Record<MenuItemSize, string> = {
    'XL': '690px',
    'XS': '393px',
  }
  return sizeMap[props.size]
})
</script>

<script lang="ts">
export default {
  name: 'CMenuItem',
}
</script>

<template>
  <button
    class="c_menuItem"
    :style="{ maxWidth }"
    @click="emit('click')"
  >
    <span class="c_menuItem__text">{{ text }}</span>
    <img
      :src="arrowIcon"
      alt=""
      class="c_menuItem__arrow"
    />
  </button>
</template>

<style scoped>
.c_menuItem {
  width: 100%;
  min-width: 48px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  padding: 2px 4px;
  box-sizing: border-box;
  background-color: #fff;
  border: none;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}

.c_menuItem:hover {
  background-color: #f7f2fa;
}

.c_menuItem__text {
  flex: 1;
  margin: 0;
  padding: 12px;
  text-align: left;
  color: #1d1b20;
  font-family: 'Georgia', serif;
  font-weight: 700;
  font-size: 18px;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0;
  text-transform: none;
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.c_menuItem__arrow {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  margin-right: 8px;
  object-fit: none;
  object-position: center;
}
</style>