<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { setLocale } from '../i18n'

const { locale } = useI18n()

function switchTo(l: 'es' | 'en') {
  setLocale(l)
}
</script>

<script lang="ts">
export default {
  name: 'CLocaleSwitcher',
}
</script>

<template>
  <div class="c_localeSwitcher">
    <button
      type="button"
      class="c_localeSwitcher__btn"
      :class="{ 'c_localeSwitcher__btn--active': locale === 'es' }"
      :aria-label="$t('locale.spanish')"
      @click="switchTo('es')"
    >
      ES
    </button>
    <span class="c_localeSwitcher__sep">|</span>
    <button
      type="button"
      class="c_localeSwitcher__btn"
      :class="{ 'c_localeSwitcher__btn--active': locale === 'en' }"
      :aria-label="$t('locale.english')"
      @click="switchTo('en')"
    >
      EN
    </button>
  </div>
</template>

<style scoped>
.c_localeSwitcher {
  display: flex;
  align-items: center;
  gap: 4px;
}

.c_localeSwitcher__btn {
  padding: 4px 8px;
  font-size: 13px;
  font-weight: 600;
  border: 1px solid currentColor;
  background: transparent;
  color: inherit;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.2s, color 0.2s;
}

.c_localeSwitcher__btn:hover {
  opacity: 0.9;
}

.c_localeSwitcher__btn--active {
  background: currentColor;
  color: #fff;
}

.c_localeSwitcher__sep {
  opacity: 0.6;
  font-size: 12px;
}
</style>
