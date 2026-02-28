<script setup lang="ts">
import { ref } from 'vue'
import CBookingEmpty from '../components/c_bookingEmpty.vue'
import CBookingAssigned from '../components/c_bookingAssigned.vue'
import { useViewportSize } from '../composables/useViewportSize'

const { size } = useViewportSize()

const hasBooking = ref(false)

function onBook() {
  hasBooking.value = true
}

function onModify() {
  // TODO: reemplazar por toast con Pinia
  console.log('Modificar cita')
}

function onCancel() {
  hasBooking.value = false
}
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
    @modify="onModify"
    @cancel="onCancel"
  />
  <CBookingEmpty
    v-else
    :size="size"
    @book="onBook"
  />
</template>