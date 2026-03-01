<script setup lang="ts">
import { computed } from 'vue'
import pencilIcon from '../assets/pencilUser.svg'
import trashIcon from '../assets/trashUser.svg'
import eyeIcon from '../assets/eyeUser.svg'

export type UserRowSize = 'LG' | 'MD' | 'SM' | 'XS'

const props = withDefaults(
  defineProps<{
    /** Nombre completo del usuario */
    name: string
    /** Tamaño responsive del componente */
    size?: UserRowSize
  }>(),
  {
    size: 'LG',
  }
)

const emit = defineEmits<{
  edit: []
  delete: []
  view: []
}>()

/* ---- Estilos responsive por tamaño ---- */

/**
 * Figma variants:
 * LG  → 960px, py 32px, Georgia Regular 36px, name-max 700px, icons gap 20px, actions-w 240px
 * MD  → 744px, py 24px, Georgia Regular 24px, name-max 480px, icons gap 20px, actions-w 240px
 * SM  → 552px, py 11px, Georgia Bold   18px, name-max 404px, icons gap  4px, actions-w 148px
 * XS  → 351px, py 11px, Georgia Bold   18px, name-max 203px (h:20px), icons gap 4px, actions-w 148px
 */

const barStyle = computed(() => {
  const paddingMap: Record<UserRowSize, string> = {
    LG: '32px 18px',
    MD: '24px 18px',
    SM: '11px 18px',
    XS: '11px 18px',
  }
  return { padding: paddingMap[props.size] }
})

const nameStyle = computed(() => {
  const cfg: Record<UserRowSize, {
    fontSize: string
    fontWeight: number
    maxWidth: string
    letterSpacing: string
    height?: string
    overflow?: string
    lineHeight?: string
  }> = {
    LG: {
      fontSize: '36px',
      fontWeight: 400,
      maxWidth: '700px',
      letterSpacing: '0.36px',
    },
    MD: {
      fontSize: '24px',
      fontWeight: 400,
      maxWidth: '480px',
      letterSpacing: '0.24px',
    },
    SM: {
      fontSize: '18px',
      fontWeight: 700,
      maxWidth: '404px',
      letterSpacing: '0.18px',
    },
    XS: {
      fontSize: '18px',
      fontWeight: 700,
      maxWidth: '203px',
      letterSpacing: '0.18px',
      height: '20px',
      overflow: 'hidden',
      lineHeight: 'normal',
    },
  }
  const c = cfg[props.size]
  return {
    fontSize: c.fontSize,
    fontWeight: c.fontWeight,
    maxWidth: c.maxWidth,
    letterSpacing: c.letterSpacing,
    ...(c.height ? { height: c.height, overflow: c.overflow, lineHeight: c.lineHeight } : {}),
  }
})

const actionsStyle = computed(() => {
  const cfg: Record<UserRowSize, { gap: string; width: string }> = {
    LG: { gap: '20px', width: '240px' },
    MD: { gap: '20px', width: '240px' },
    SM: { gap: '4px', width: '148px' },
    XS: { gap: '4px', width: '148px' },
  }
  return cfg[props.size]
})
</script>

<script lang="ts">
export default {
  name: 'CUserRow',
}
</script>

<template>
  <div class="c_userRow">
    <div class="c_userRow__bar" :style="barStyle">
      <div class="c_userRow__name-wrap">
        <p class="c_userRow__name" :style="nameStyle">{{ name }}</p>
      </div>
      <div
        class="c_userRow__actions"
        :style="{ gap: actionsStyle.gap, width: actionsStyle.width }"
      >
        <button class="c_userRow__action c_userRow__action--small" @click="emit('edit')" :aria-label="$t('actions.edit')">
          <img :src="pencilIcon" :alt="$t('actions.edit')" width="24" height="24" />
        </button>
        <button class="c_userRow__action c_userRow__action--small" @click="emit('delete')" :aria-label="$t('actions.delete')">
          <img :src="trashIcon" :alt="$t('actions.delete')" width="24" height="24" />
        </button>
        <button class="c_userRow__action c_userRow__action--eye" @click="emit('view')" :aria-label="$t('actions.view')">
          <img :src="eyeIcon" :alt="$t('actions.view')" width="48" height="48" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.c_userRow {
  width: 100%;
  box-sizing: border-box;
}

.c_userRow__bar {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  border-top: 1px solid #f5f5f5;
  background-color: #fff;
}

.c_userRow__name-wrap {
  flex: 1;
  min-width: 0;
}

.c_userRow__name {
  margin: 0;
  color: #1a1a1a;
  font-family: 'Georgia', serif;
  font-style: normal;
  line-height: normal;
  text-align: left;
  text-transform: none;
  text-decoration: none;
  /* fontSize, fontWeight, maxWidth, letterSpacing, height, overflow vienen por :style */
}

.c_userRow__actions {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background-color: #fff;
}

.c_userRow__action {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  border: none;
  background: transparent;
  cursor: pointer;
}

.c_userRow__action--small {
  width: 24px;
  height: 24px;
}

.c_userRow__action--small img {
  width: 24px;
  height: 24px;
  display: block;
}

.c_userRow__action--eye {
  width: 48px;
  height: 48px;
}

.c_userRow__action--eye img {
  width: 48px;
  height: 48px;
  display: block;
}
</style>