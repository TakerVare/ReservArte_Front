<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import CAppointmentCalendar from '../components/c_appointmentCalendar.vue'
import CPageTittle from '../components/c_pageTittle.vue'
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
    <CPageTittle text="Selección de cita" :size="size" />
    <button
      type="button"
      class="appointmentCalendarView__back"
      :aria-label="t('common.back')"
      @click="goBack"
    >
      &lt; {{ t('common.back') }}
    </button>
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

.appointmentCalendarView__back {
  align-self: flex-start;
  margin: 16px 16px 24px;
  padding: 10px 20px;
  background-color: #fdb8c4;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-family: Inter, system-ui, sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.25;
  cursor: pointer;
}

.appointmentCalendarView__back:hover {
  background-color: #fc9caa;
}

.appointmentCalendarView__back:focus-visible {
  outline: 2px solid #0369f0;
  outline-offset: 2px;
}
</style>
