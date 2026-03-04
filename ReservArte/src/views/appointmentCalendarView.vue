<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import c_heroBanner from '../components/c_heroBanner.vue'
import CAppointmentCalendar from '../components/c_appointmentCalendar.vue'
import { useViewportSize } from '../composables/useViewportSize'

const router = useRouter()
const { t } = useI18n()
const { size } = useViewportSize()
const selectedDate = ref<Date | null>(null)

/** Opcional: fechas disponibles (ej. desde API). Vacío = todos los días seleccionables. */
const availableDates = ref<Date[]>([])

function goBack() {
  router.push({ name: 'booking' })
}
</script>

<script lang="ts">
export default {
  name: 'AppointmentCalendarView',
}
</script>

<template>
  <div class="appointmentCalendarView">
    <c_heroBanner
      :title="t('calendar.title')"
      :size="size"
      :show-new-button="false"
      :show-search-bar="false"
      @back="goBack"
    />
    <CAppointmentCalendar
      v-model="selectedDate"
      :available-dates="availableDates"
      :size="size"
    />
  </div>
</template>

<style lang="scss" scoped>
.appointmentCalendarView {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0 16px;
}
</style>
