<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import cameraIcon from '../assets/camera.svg'
import uploadIcon from '../assets/upload.svg'
import trashIcon from '../assets/trashAvatar.svg'
import avatarPlaceholder from '../assets/avatarPlaceholder.svg'

export type AvatarUploadSize = 'LG' | 'MD' | 'SM' | 'XS'

const props = withDefaults(
  defineProps<{
    /** URL de la imagen del avatar (si hay) */
    avatarUrl?: string
    /** Texto alternativo */
    alt?: string
    /** Tamaño responsive */
    size?: AvatarUploadSize
  }>(),
  {
    avatarUrl: '',
    alt: undefined,
    size: 'XS',
  }
)

const { t } = useI18n()
const altText = computed(() => props.alt ?? t('actions.avatarAlt'))

const emit = defineEmits<{
  camera: []
  upload: []
  delete: []
}>()

/**
 * Tamaño del avatar según breakpoint:
 * LG: 160px — grande en escritorio
 * MD: 140px
 * SM: 120px — tamaño base del diseño XS de Figma
 * XS: 120px
 */
const avatarDimension = computed(() => {
  const map: Record<AvatarUploadSize, string> = {
    LG: '160px',
    MD: '140px',
    SM: '120px',
    XS: '120px',
  }
  return map[props.size]
})

/**
 * Gap entre avatar y los iconos:
 * LG/MD: más pegados (32px)
 * SM/XS: gap original amplio (118px Figma → 80px ajustado)
 */
const containerGap = computed(() => {
  const map: Record<AvatarUploadSize, string> = {
    LG: '32px',
    MD: '40px',
    SM: '80px',
    XS: '80px',
  }
  return map[props.size]
})
</script>

<script lang="ts">
export default {
  name: 'CAvatarUpload',
}
</script>

<template>
  <div
    class="c_avatarUpload"
    :style="{ gap: containerGap }"
  >
    <!-- Avatar circular -->
    <div
      class="c_avatarUpload__avatar"
      :style="{ width: avatarDimension, height: avatarDimension }"
    >
      <img
        v-if="avatarUrl"
        :src="avatarUrl"
        :alt="altText"
        class="c_avatarUpload__image"
      />
      <img
        v-else
        :src="avatarPlaceholder"
        :alt="altText"
        class="c_avatarUpload__image"
      />
    </div>

    <!-- Iconos de acción -->
    <div class="c_avatarUpload__actions">
      <button class="c_avatarUpload__action c_avatarUpload__action--camera" @click="emit('camera')" :aria-label="t('actions.takePhoto')">
        <img :src="cameraIcon" :alt="t('actions.takePhoto')" />
      </button>
      <button class="c_avatarUpload__action c_avatarUpload__action--upload" @click="emit('upload')" :aria-label="t('actions.uploadImage')">
        <img :src="uploadIcon" :alt="t('actions.uploadImage')" />
      </button>
      <button class="c_avatarUpload__action c_avatarUpload__action--trash" @click="emit('delete')" :aria-label="t('actions.deleteImage')">
        <img :src="trashIcon" :alt="t('actions.deleteImage')" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.c_avatarUpload {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 0;
  box-sizing: border-box;
}

.c_avatarUpload__avatar {
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  /* width, height vienen por :style */
}

.c_avatarUpload__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.c_avatarUpload__actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.c_avatarUpload__action {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  border: none;
  background: transparent;
  cursor: pointer;
}

.c_avatarUpload__action--camera {
  width: 40px;
  height: 40px;
}
.c_avatarUpload__action--camera img {
  width: 40px;
  height: 40px;
  display: block;
}

.c_avatarUpload__action--upload {
  width: 40px;
  height: 40px;
}
.c_avatarUpload__action--upload img {
  width: 40px;
  height: 40px;
  display: block;
}

.c_avatarUpload__action--trash {
  width: 40px;
  height: 40px;
}
.c_avatarUpload__action--trash img {
  width: 40px;
  height: 40px;
  display: block;
}
</style>