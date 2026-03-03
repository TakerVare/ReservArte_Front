<script setup lang="ts">
import { ref } from 'vue'
import CAppointmentCalendar from '../components/c_appointmentCalendar.vue'
import { useViewportSize } from '../composables/useViewportSize'

const { size } = useViewportSize()
const selectedDate = ref<Date | null>(null)

/** Opcional: fechas disponibles (ej. desde API). Vacío = todos los días seleccionables. */
const availableDates = ref<Date[]>([])
</script>

<script lang="ts">
export default {
  name: 'AppointmentCalendarView',
}
</script>

<template>
  <div class="appointmentCalendarView">
    <CAppointmentCalendar
      v-model="selectedDate"
      :available-dates="availableDates"
      :size="size"
    />
  </div>
</template>

<style scoped>
.appointmentCalendarView {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
}
</style>
