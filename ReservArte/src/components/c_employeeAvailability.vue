<template>
  <div
    class="c_employeeAvailability"
    :class="`c_employeeAvailability--${size.toLowerCase()}`"
  >
    <div class="c_employeeAvailability__container">
      <header class="c_employeeAvailability__header">
        <h2 class="c_employeeAvailability__title">
          {{ titleComputed }}
        </h2>
      </header>

      <div
        v-for="employee in employees"
        :key="employee.id"
        class="c_employeeAvailability__employee"
      >
        <p class="c_employeeAvailability__employee-name">
          {{ employee.name }}
        </p>
        <div class="c_employeeAvailability__slots">
          <CNavAreaPrimaryButton
            v-for="(slot, slotIndex) in employee.slots"
            :key="slotIndex"
            :text="slot"
            size="XS"
            :aria-label="$t('calendar.selectDate', { date: slot })"
            @click="onSlotClick(employee, slot)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import CNavAreaPrimaryButton from './Buttons/c_navAreaPrimaryButton.vue'

export type EmployeeAvailabilitySize = 'XXL' | 'XL' | 'LG' | 'MD' | 'SM' | 'XS'

export interface EmployeeWithSlots {
  id: string | number
  name: string
  slots: string[]
}

const props = withDefaults(
  defineProps<{
    /** Título de la sección (por defecto i18n calendar.availableSlotsTitle) */
    title?: string
    /** Tamaño del componente (alineado con breakpoints) */
    size?: EmployeeAvailabilitySize
    /** Lista de empleados con sus tramos horarios disponibles */
    employees?: EmployeeWithSlots[]
  }>(),
  {
    title: '',
    size: 'MD',
    employees: () => [],
  }
)

const { t } = useI18n()
const titleComputed = computed(() => props.title || t('calendar.availableSlotsTitle'))

const emit = defineEmits<{
  selectSlot: [payload: { employee: EmployeeWithSlots; time: string }]
}>()

function onSlotClick(employee: EmployeeWithSlots, time: string) {
  emit('selectSlot', { employee, time })
}
</script>

<script lang="ts">
export default {
  name: 'CEmployeeAvailability',
}
</script>

<style lang="scss" scoped>
.c_employeeAvailability {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  background-color: #fff;
}

.c_employeeAvailability__container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.c_employeeAvailability__header {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #fff;
}

.c_employeeAvailability__title {
  margin: 0;
  color: #1e1e1e;
  font-size: 36px;
  font-style: normal;
  font-family: Georgia, serif;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0;
  text-align: left;
}

.c_employeeAvailability__employee {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding: 29px 0;
}

.c_employeeAvailability__employee-name {
  margin: 0;
  color: #1e1e1e;
  font-size: 24px;
  font-style: normal;
  font-family: Georgia, serif;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0;
  text-align: left;
}

.c_employeeAvailability__slots {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 64px;
  padding: 8px 0 32px 16px;
  box-sizing: border-box;
}

/* ---- Variantes por tamaño (alineadas con useViewportSize) ---- */

/* XXL */
.c_employeeAvailability--xxl .c_employeeAvailability__container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 64px;
}
.c_employeeAvailability--xxl .c_employeeAvailability__header,
.c_employeeAvailability--xxl .c_employeeAvailability__employee {
  max-width: 1024px;
  width: 100%;
}
.c_employeeAvailability--xxl .c_employeeAvailability__slots {
  max-width: 1024px;
}

/* XL */
.c_employeeAvailability--xl .c_employeeAvailability__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 64px;
}
.c_employeeAvailability--xl .c_employeeAvailability__header,
.c_employeeAvailability--xl .c_employeeAvailability__employee {
  max-width: 1024px;
  width: 100%;
}
.c_employeeAvailability--xl .c_employeeAvailability__slots {
  max-width: 1024px;
}

/* LG */
.c_employeeAvailability--lg .c_employeeAvailability__container {
  max-width: 992px;
  margin: 0 auto;
  padding: 0 64px;
}
.c_employeeAvailability--lg .c_employeeAvailability__header,
.c_employeeAvailability--lg .c_employeeAvailability__employee {
  max-width: 600px;
  width: 100%;
}
.c_employeeAvailability--lg .c_employeeAvailability__slots {
  max-width: 600px;
}

/* MD */
.c_employeeAvailability--md .c_employeeAvailability__container {
  max-width: 768px;
  margin: 0 auto;
  padding: 0 64px;
}
.c_employeeAvailability--md .c_employeeAvailability__header,
.c_employeeAvailability--md .c_employeeAvailability__employee {
  max-width: 600px;
  width: 100%;
}
.c_employeeAvailability--md .c_employeeAvailability__slots {
  max-width: 600px;
}

/* SM: botones más pequeños, gap menor */
.c_employeeAvailability--sm .c_employeeAvailability__container {
  max-width: 576px;
  margin: 0 auto;
  padding: 0 16px;
}
.c_employeeAvailability--sm .c_employeeAvailability__header,
.c_employeeAvailability--sm .c_employeeAvailability__employee {
  max-width: 544px;
  width: 100%;
}
.c_employeeAvailability--sm .c_employeeAvailability__slots {
  max-width: 544px;
  gap: 48px;
}

/* XS */
.c_employeeAvailability--xs .c_employeeAvailability__container {
  max-width: 375px;
  margin: 0 auto;
  padding: 0 16px;
}
.c_employeeAvailability--xs .c_employeeAvailability__header,
.c_employeeAvailability--xs .c_employeeAvailability__employee {
  max-width: 343px;
  width: 100%;
}
.c_employeeAvailability--xs .c_employeeAvailability__slots {
  max-width: 343px;
  gap: 48px;
}
</style>
