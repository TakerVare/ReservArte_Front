<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CBookingEmpty from '../components/c_bookingEmpty.vue'
import CBookingAssigned from '../components/c_bookingAssigned.vue'
import { useViewportSize } from '../composables/useViewportSize'
import { useAppointmentStore } from '../stores/appointment.store'

const router = useRouter()
const { size } = useViewportSize()
const appointmentStore = useAppointmentStore()

const hasBooking = computed(() => !!appointmentStore.nextAppointment)

/** Formato de la próxima cita para CBookedDate (ej: "24 Dic - 10:00h"). */
const nextAppointmentDateText = computed(() => {
  const next = appointmentStore.nextAppointment
  if (!next) return ''
  const date = new Date(`${next.appointmentDate}T12:00:00`)
  const day = date.getDate()
  const month = date.toLocaleDateString('es-ES', { month: 'short' }).replace('.', '')
  const time = next.startTime.slice(0, 5)
  return `${day} ${month} - ${time}h`
})

function goToCalendar() {
  router.push({ name: 'appointment-calendar' })
}

async function onCancel() {
  const next = appointmentStore.nextAppointment
  if (!next) return
  const result = await appointmentStore.cancelAppointment(next.id)
  if (result) {
    // fetchAppointments ya se llama dentro de cancelAppointment; la vista se actualiza
    // (hasBooking pasa a false si no hay más citas y se muestra CBookingEmpty)
  }
}

onMounted(() => {
  appointmentStore.fetchAppointments()
})
</script>

<script lang="ts">
export default {
  name: 'BookingView',
}
</script>

<template>
  <CBookingAssigned
    v-if="hasBooking"
    :size="size"
    :date-time="nextAppointmentDateText"
    @modify="goToCalendar"
    @cancel="onCancel"
  />
  <CBookingEmpty
    v-else
    :size="size"
    @book="goToCalendar"
  />
</template>