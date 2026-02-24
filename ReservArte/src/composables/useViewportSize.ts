import { ref, onMounted, onUnmounted } from 'vue'

export type ViewportSize = 'XXL' | 'XL' | 'LG' | 'MD' | 'SM' | 'XS'

const BREAKPOINTS = {
  XS: 0,
  SM: 576,
  MD: 768,
  LG: 992,
  XL: 1200,
  XXL: 1440,
} as const

function getSizeFromWidth(width: number): ViewportSize {
  if (width >= BREAKPOINTS.XXL) return 'XXL'
  if (width >= BREAKPOINTS.XL) return 'XL'
  if (width >= BREAKPOINTS.LG) return 'LG'
  if (width >= BREAKPOINTS.MD) return 'MD'
  if (width >= BREAKPOINTS.SM) return 'SM'
  return 'XS'
}

export function useViewportSize() {
  const size = ref<ViewportSize>(getSizeFromWidth(typeof window !== 'undefined' ? window.innerWidth : 375))

  function update() {
    size.value = getSizeFromWidth(window.innerWidth)
  }

  onMounted(() => {
    update()
    window.addEventListener('resize', update)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', update)
  })

  return { size }
}
