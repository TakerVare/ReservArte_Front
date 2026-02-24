<script setup lang="ts">
import { computed } from 'vue'
import CContactMainTitle from './c_contactMainTitle.vue'
import COpeningDays from './c_openingDays.vue'
import COpeningHours from './c_openingHours.vue'
import CContactData from './c_contactData.vue'

export interface ContactItem {
  text: string
  iconSrc?: string
  iconAlt?: string
  iconComponent?: object
}

const props = withDefaults(
  defineProps<{
    scheduleTitle?: string
    days?: string
    hours?: string[]
    contactTitle?: string
    contactItems?: ContactItem[]
  }>(),
  {
    scheduleTitle: 'Horario de apertura',
    days: 'Lunes a viernes:',
    hours: () => ['· de 10:00 a 14:00', '· de 15:00 a 19:00'],
    contactTitle: 'Datos de contacto',
    contactItems: () => [],
  }
)
</script>

<template>
  <section class="c_contactInfo">
    <div class="c_contactInfo__content">
      <CContactMainTitle :text="scheduleTitle" />
      <COpeningDays :text="days" />
      <COpeningHours
        v-for="(hour, index) in hours"
        :key="'hour-' + index"
        :text="hour"
      />
      <CContactMainTitle :text="contactTitle" />
      <CContactData
        v-for="(item, index) in contactItems"
        :key="'contact-' + index"
        :text="item.text"
      >
        <template #icon>
          <component :is="item.iconComponent" v-if="item.iconComponent" />
          <img
            v-else-if="item.iconSrc"
            :src="item.iconSrc"
            :alt="item.iconAlt || ''"
          />
        </template>
      </CContactData>
    </div>
  </section>
</template>

<style scoped>
.c_contactInfo {
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
}

.c_contactInfo__content {
  width: 100%;
  display: flex;
  padding: 64px 0;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

/* XS: < 576px */
@media (max-width: 575px) {
  .c_contactInfo {
    max-width: 375px;
  }
  .c_contactInfo__content {
    max-width: 375px;
  }
}

/* SM: 576px – 767px */
@media (min-width: 576px) and (max-width: 767px) {
  .c_contactInfo {
    max-width: 576px;
  }
  .c_contactInfo__content {
    max-width: 397px;
  }
}

/* MD: 768px – 991px */
@media (min-width: 768px) and (max-width: 991px) {
  .c_contactInfo {
    max-width: 768px;
  }
  .c_contactInfo__content {
    max-width: 600px;
  }
}

/* LG: 992px – 1199px */
@media (min-width: 992px) and (max-width: 1199px) {
  .c_contactInfo {
    max-width: 992px;
  }
  .c_contactInfo__content {
    max-width: 600px;
  }
}

/* XL: 1200px – 1439px */
@media (min-width: 1200px) and (max-width: 1439px) {
  .c_contactInfo {
    max-width: 1200px;
  }
  .c_contactInfo__content {
    max-width: 800px;
  }
}

/* XXL: ≥ 1440px */
@media (min-width: 1440px) {
  .c_contactInfo {
    max-width: 1440px;
  }
  .c_contactInfo__content {
    max-width: 800px;
  }
}
</style>