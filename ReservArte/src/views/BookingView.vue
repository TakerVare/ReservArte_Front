<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CBookingEmpty from '../components/c_bookingEmpty.vue'
import CBookingAssigned from '../components/c_bookingAssigned.vue'
import { useViewportSize } from '../composables/useViewportSize'
import { useAppointmentStore } from '../stores/appointment.store'
import { useAuthStore } from '../stores/auth.store'

const router = useRouter()
const { size } = useViewportSize()
const appointmentStore = useAppointmentStore()
const authStore = useAuthStore()

/** Solo los clientes ven esta vista; empleados y administradores se redirigen al calendario. */
const isClient = computed(() => authStore.user?.role === 'user')

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

function goToModifyCalendar() {
  const next = appointmentStore.nextAppointment
  if (next?.id != null) {
    router.push({ name: 'appointment-calendar', query: { edit: String(next.id) } })
  } else {
    router.push({ name: 'appointment-calendar' })
  }
}

function goToCalendar() {
  router.push({ name: 'appointment-calendar' })
}

onMounted(async () => {
  if (authStore.showAdminArea) {
    router.replace({ name: 'appointment-calendar' })
    return
  }
  await appointmentStore.fetchAppointments()
})
</script>

<script lang="ts">
export default {
  name: 'BookingView',
}
</script>

<template>
  <template v-if="isClient">
    <CBookingAssigned
      v-if="hasBooking"
      :size="size"
      :date-time="nextAppointmentDateText"
      @modify="goToModifyCalendar"
      @cancel="goToCalendar"
    />
    <CBookingEmpty
      v-else
      :size="size"
      @book="goToCalendar"
    />
  </template>
</template>