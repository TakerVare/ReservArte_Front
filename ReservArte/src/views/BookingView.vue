<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BannerPrincipal from '../components/c_bannerPrincipal.vue'
import CBookingEmpty from '../components/c_bookingEmpty.vue'
import CBookingAssigned from '../components/c_bookingAssigned.vue'
import NavBottom from '../components/c_bottomNavBar.vue'
import { useViewportSize } from '../composables/useViewportSize'

const router = useRouter()
const { size } = useViewportSize()

const hasBooking = ref(false)

function onBook() {
  hasBooking.value = true
}

function onModify() {
  alert('Modificar cita')
}

function onCancel() {
  hasBooking.value = false
}

function onNavNavigate(index: number) {
  if (index === 1) router.push('/contact')
  if (index === 2) router.push('/login')
}
</script>

<template>
  <div class="booking-page">
    <BannerPrincipal :size="size" />
    <main class="booking-page__main">
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
    </main>
    <NavBottom
      :size="size"
      :active-index="0"
      @navigate="onNavNavigate"
    />
  </div>
</template>

<style scoped>
.booking-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fff;
}

.booking-page__main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}
</style>