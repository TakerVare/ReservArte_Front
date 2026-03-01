import { createI18n } from 'vue-i18n'
import es from './locales/es'
import en from './locales/en'

const LOCALE_KEY = 'reservarte_locale'

function getSavedLocale(): string {
  try {
    const saved = localStorage.getItem(LOCALE_KEY)
    if (saved === 'es' || saved === 'en') return saved
  } catch {
    /* ignore */
  }
  return 'es'
}

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: getSavedLocale(),
  fallbackLocale: 'es',
  messages: {
    es,
    en,
  },
})

export function setLocale(locale: 'es' | 'en') {
  i18n.global.locale.value = locale
  try {
    localStorage.setItem(LOCALE_KEY, locale)
  } catch {
    /* ignore */
  }
}

export default i18n
