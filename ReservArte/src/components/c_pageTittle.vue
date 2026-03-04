<template>
  <div
    class="c_pageTittle"
    :class="[`c_pageTittle--${size.toLowerCase()}`, className]"
    role="heading"
    :aria-level="1"
  >
    <div class="c_pageTittle__screen-title">
      <div class="c_pageTittle__content">
        <div class="c_pageTittle__label">{{ text }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export type PageTitleSize = 'XXL' | 'XL' | 'LG' | 'MD' | 'SM' | 'XS'

const props = withDefaults(
  defineProps<{
    text: string
    size?: PageTitleSize
    /** Clase CSS adicional para el contenedor raíz */
    className?: string
  }>(),
  {
    size: 'MD',
    className: '',
  }
)
</script>

<script lang="ts">
export default {
  name: 'CPageTittle',
}
</script>

<style lang="scss" scoped>
.c_pageTittle {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background-color: #ffffff;
}

.c_pageTittle__screen-title {
  display: flex;
  flex: 1;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 32px;
  min-width: 48px;
  background-color: #ffc0cb;
}

.c_pageTittle__content {
  display: flex;
  align-items: center;
  align-self: stretch;
  flex: 0 0 auto;
  gap: 8px;
  min-width: 48px;
  width: 100%;
}

.c_pageTittle__label {
  display: flex;
  flex: 1;
  align-items: center;
  color: #49454f;
  font-style: normal;
  font-family: Georgia, serif;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0;
}

/* Tamaños: padding del screen-title y content, tipografía del label */
.c_pageTittle--xxl .c_pageTittle__screen-title {
  padding: 64px;
  gap: 32px;
}
.c_pageTittle--xxl .c_pageTittle__label {
  font-size: 48px;
}

.c_pageTittle--xl .c_pageTittle__screen-title {
  padding: 48px;
  gap: 32px;
}
.c_pageTittle--xl .c_pageTittle__content {
  padding: 0 12px;
}
.c_pageTittle--xl .c_pageTittle__label {
  font-size: 48px;
}

.c_pageTittle--lg .c_pageTittle__screen-title {
  padding: 32px;
  gap: 32px;
}
.c_pageTittle--lg .c_pageTittle__content {
  padding: 5px 12px;
}
.c_pageTittle--lg .c_pageTittle__label {
  font-size: 36px;
}

.c_pageTittle--md .c_pageTittle__screen-title {
  padding: 24px;
  gap: 24px;
}
.c_pageTittle--md .c_pageTittle__content {
  padding: 5px 12px;
}
.c_pageTittle--md .c_pageTittle__label {
  font-size: 36px;
}

.c_pageTittle--sm .c_pageTittle__screen-title {
  padding: 16px;
  gap: 16px;
}
.c_pageTittle--sm .c_pageTittle__content {
  padding: 5px 12px;
}
.c_pageTittle--sm .c_pageTittle__label {
  font-size: 24px;
}

.c_pageTittle--xs .c_pageTittle__screen-title {
  padding: 8px;
  gap: 8px;
}
.c_pageTittle--xs .c_pageTittle__content {
  padding: 5px 12px;
}
.c_pageTittle--xs .c_pageTittle__label {
  font-size: 24px;
}
</style>
