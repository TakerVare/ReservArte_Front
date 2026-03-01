<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  size?: 'XXL' | 'XL' | 'LG' | 'MD' | 'SM' | 'XS'
  activeIndex?: number
}>()

const emit = defineEmits<{
  navigate: [index: number]
}>()


  const minWidth = computed(() => {
  if (!props.size) return undefined

  const sizeMap = {
    'XXL': '1440px',
    'XL': '1200px',
    'LG': '992px',
    'MD': '768px',
    'SM': '576px',
    'XS': '375px'
  }

  return sizeMap[props.size]
})

const navItems = [
  { icon: '/resources/images/home.svg', labelKey: 'nav.home' },
  { icon: '/resources/images/map.svg', labelKey: 'nav.location' },
  { icon: '/resources/images/user.svg', labelKey: 'nav.profile' },
]

const handleClick = (index: number) => {
  emit('navigate', index)
}
</script>

<template>
  <div class="nav-bottom" :style="{ minWidth: minWidth }">
    <div class="nav-content">
      <div class="nav-bar">
        <button
          v-for="(item, index) in navItems"
          :key="index"
          class="nav-item"
          :class="{ active: activeIndex === index }"
          @click="handleClick(index)"
        >
          <div class="icon-container">
            <img :src="item.icon" :alt="$t(item.labelKey)" class="nav-icon" />
          </div>
          <span class="nav-label">{{ $t(item.labelKey) }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nav-bottom {
  position: sticky;
  bottom: 0;
  z-index: 100;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  margin-top: auto;
}

.nav-content {
  background-color: white;
  border-top: 2px solid #F5F5F5;
  display: flex;
  flex-direction: column;
  height: 100px;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.nav-bar {
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 412px;
  overflow: hidden;
}

.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 6px 0;
  height: 100%;
  border: none;
  background: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 32px;
  border-radius: 16px;
  overflow: hidden;
  transition: background-color 0.3s ease;
}
/*
.nav-item.active .icon-container {
  background-color: #F5F5F5;
}
*/

.nav-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.nav-label {
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.5px;
  text-align: center;
  color: #49454f;
  transition: color 0.3s ease;
}


.nav-item.active .nav-label {
  color: #625b71;
}


.nav-item:hover .icon-container {
  /*background-color: rgba(232, 222, 248, 0.5);*/
  background-color: #FFE4E1;
}

.nav-item.active:hover .icon-container {
  background-color: #FFE4E1;
}
</style>
