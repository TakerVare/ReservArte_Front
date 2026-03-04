<template>
  <c_heroTitle
    text="c_heroTitle.vue"
    :size="size"
  />
  <c_heroDescription
    text="c_heroDescription.vue"
    :size="size"
  />
  <c_heroSection
    title="c_heroSection.vue"
    :size="size"
  />
  <div
    class="c_appointmentCalendar"
    :class="`c_appointmentCalendar--${size.toLowerCase()}`"
    role="application"
    :aria-label="$t('calendar.title')"
  >
    <div class="c_appointmentCalendar__inner">
      <header class="c_appointmentCalendar__month-picker">
        <div class="c_appointmentCalendar__month-year">
          <p
            class="c_appointmentCalendar__month"
            :id="monthHeadingId"
            aria-live="polite"
          >
            {{ displayedMonthLabel }}
          </p>
          <span class="c_appointmentCalendar__chevron" aria-hidden="true">
            <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M1 1L6 5.5L1 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </div>
        <div class="c_appointmentCalendar__arrows">
          <button
            type="button"
            class="c_appointmentCalendar__arrow c_appointmentCalendar__arrow--prev"
            :aria-label="$t('calendar.prevMonth')"
            @click="goPrevMonth"
          >
            <svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M8 1L2 8.5L8 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button
            type="button"
            class="c_appointmentCalendar__arrow c_appointmentCalendar__arrow--next"
            :aria-label="$t('calendar.nextMonth')"
            @click="goNextMonth"
          >
            <svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M2 1L8 8.5L2 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </header>

      <div class="c_appointmentCalendar__weekdays" role="row">
        <span
          v-for="key in weekdayKeys"
          :key="key"
          class="c_appointmentCalendar__weekday"
          role="columnheader"
          :aria-label="$t(`calendar.${key}`)"
        >
          {{ $t(`calendar.${key}`) }}
        </span>
      </div>

      <div
        class="c_appointmentCalendar__grid"
        role="grid"
        :aria-labelledby="monthHeadingId"
        aria-readonly="false"
      >
        <template v-for="(cell, index) in calendarCells" :key="index">
          <div
            v-if="cell.isEmpty"
            class="c_appointmentCalendar__day c_appointmentCalendar__day--empty"
            role="gridcell"
            aria-hidden="true"
          />
          <button
            v-else
            type="button"
            class="c_appointmentCalendar__day"
            :class="dayModifiers(cell)"
            role="gridcell"
            :aria-label="cell.ariaLabel"
            :aria-pressed="cell.isSelected"
            :aria-disabled="cell.isDisabled"
            :disabled="cell.isDisabled"
            @click="onDayClick(cell)"
          >
            <span class="c_appointmentCalendar__day-num">{{ cell.day }}</span>
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import c_heroDescription from './c_heroDescription.vue'
import c_heroSection from './c_heroSection.vue'
import c_heroTitle from './c_heroTitle.vue'

export type AppointmentCalendarSize = 'XXL' | 'XL' | 'LG' | 'MD' | 'SM' | 'XS'

const props = withDefaults(
  defineProps<{
    /** Fecha seleccionada (v-model) */
    modelValue?: Date | null
    /** Fechas disponibles para selección (opcional). Si no se pasa, todos los días del mes son seleccionables. */
    availableDates?: Date[] | string[]
    /** Tamaño del calendario (ancho máximo y contenedor). */
    size?: AppointmentCalendarSize
  }>(),
  {
    modelValue: null,
    availableDates: () => [],
    size: 'MD',
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: Date | null]
}>()

const { t: $t } = useI18n()

const weekdayKeys = [
  'weekdaySun',
  'weekdayMon',
  'weekdayTue',
  'weekdayWed',
  'weekdayThu',
  'weekdayFri',
  'weekdaySat',
] as const

const currentView = ref({
  year: props.modelValue ? props.modelValue.getFullYear() : new Date().getFullYear(),
  month: props.modelValue ? props.modelValue.getMonth() : new Date().getMonth(),
})

const monthHeadingId = 'c_appointmentCalendar-month-heading'

function toDate(d: Date | string): Date {
  return typeof d === 'string' ? new Date(d) : d
}

function dateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

const normalizedAvailable = computed(() => {
  if (!props.availableDates?.length) return null
  return new Set(
    props.availableDates.map((d) => dateKey(toDate(d)))
  )
})

const displayedMonthLabel = computed(() => {
  const d = new Date(currentView.value.year, currentView.value.month, 1)
  return d.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
})

interface DayCell {
  day: number
  date: Date
  isSelected: boolean
  isAvailable: boolean
  isDisabled: boolean
  isEmpty: boolean
  ariaLabel: string
}

const calendarCells = computed((): DayCell[] => {
  const { year, month } = currentView.value
  const first = new Date(year, month, 1)
  const last = new Date(year, month + 1, 0)
  const startWeekday = first.getDay()
  const daysInMonth = last.getDate()
  const hasAvailability = normalizedAvailable.value !== null

  const cells: DayCell[] = []

  for (let i = 0; i < startWeekday; i++) {
    cells.push({
      day: 0,
      date: new Date(0),
      isSelected: false,
      isAvailable: false,
      isDisabled: true,
      isEmpty: true,
      ariaLabel: '',
    })
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d)
    const key = dateKey(date)
    const isAvailable = !hasAvailability || normalizedAvailable.value!.has(key)
    const isSelected = !!(
      props.modelValue &&
      dateKey(props.modelValue) === key
    )
    const label = date.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })
    const aria = isSelected
      ? $t('calendar.selectedDate', { date: label })
      : isAvailable
        ? $t('calendar.selectDate', { date: label })
        : $t('calendar.unavailable')

    cells.push({
      day: d,
      date,
      isSelected,
      isAvailable,
      isDisabled: !isAvailable,
      isEmpty: false,
      ariaLabel: aria,
    })
  }

  const total = cells.length
  const remainder = total % 7
  const pad = remainder === 0 ? 0 : 7 - remainder
  for (let i = 0; i < pad; i++) {
    cells.push({
      day: 0,
      date: new Date(0),
      isSelected: false,
      isAvailable: false,
      isDisabled: true,
      isEmpty: true,
      ariaLabel: '',
    })
  }

  return cells
})

function dayModifiers(cell: DayCell): Record<string, boolean> {
  return {
    'c_appointmentCalendar__day--selected': cell.isSelected,
    'c_appointmentCalendar__day--available': cell.isAvailable && !cell.isSelected,
    'c_appointmentCalendar__day--disabled': cell.isDisabled,
  }
}

function goPrevMonth() {
  if (currentView.value.month === 0) {
    currentView.value = { year: currentView.value.year - 1, month: 11 }
  } else {
    currentView.value = { ...currentView.value, month: currentView.value.month - 1 }
  }
}

function goNextMonth() {
  if (currentView.value.month === 11) {
    currentView.value = { year: currentView.value.year + 1, month: 0 }
  } else {
    currentView.value = { ...currentView.value, month: currentView.value.month + 1 }
  }
}

function onDayClick(cell: DayCell) {
  if (cell.isEmpty || cell.isDisabled) return
  console.log('Fecha seleccionada:', cell.date)
  emit('update:modelValue', cell.date)
}
</script>

<script lang="ts">
export default {
  name: 'CAppointmentCalendar',
}
</script>

<style lang="scss" scoped>
.c_appointmentCalendar {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-family: Inter, system-ui, sans-serif;

  &__inner {
    background-color: #fff;
    height: 326px;
    width: 343px;
    position: relative;
    box-sizing: border-box;
    padding: 8px 16px 16px;
    box-shadow: 0 10px 60px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }

  &__month-picker {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 44px;
    padding: 7px 0;
    width: 100%;
  }

  &__month-year {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  &__month {
    margin: 0;
    color: #1a1a1a;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: 0.38px;
    white-space: nowrap;
  }

  &__chevron {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 6.69px;
    height: 11.44px;
    color: #1a1a1a;
  }

  &__arrows {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 51px;
    gap: 8px;
  }

  &__arrow {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 17.32px;
    height: 17.32px;
    padding: 0;
    border: none;
    background: transparent;
    color: #1a1a1a;
    cursor: pointer;
    border-radius: 4px;

    &:hover:not(:disabled) {
      background-color: rgba(0, 0, 0, 0.06);
    }
    &:focus-visible {
      outline: 2px solid #0369f0;
      outline-offset: 2px;
    }
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &__weekdays {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 0 10px;
    margin-top: 4px;
  }

  &__weekday {
    flex: 0 0 32px;
    width: 32px;
    text-align: center;
    font-size: 13px;
    font-weight: 600;
    line-height: 18px;
    letter-spacing: -0.078px;
    color: rgba(60, 60, 67, 0.3);
  }

  &__grid {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0;
    width: 100%;
    row-gap: 2px;
  }

  &__day {
    flex: 0 0 32px;
    width: 32px;
    height: 32px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: none;
    border-radius: 100px;
    background: transparent;
    color: #1a1a1a;
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.38px;
    font-family: inherit;
    cursor: pointer;
    box-sizing: border-box;

    &:hover:not(:disabled):not(&--selected) {
      background-color: rgba(0, 0, 0, 0.06);
    }
    &:focus-visible {
      outline: 2px solid #0369f0;
      outline-offset: 2px;
    }
    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    &--selected {
      background-color: #ffb6c1;
      color: #fff;
      font-weight: 600;
      cursor: default;
    }

    &--available {
      background-color: transparent;
    }

    &--empty {
      flex: 0 0 32px;
      width: 32px;
      height: 32px;
      pointer-events: none;
    }
  }

  /* Disponible (resaltado suave, como en Figma #ffe4e1) — opcional para “slots disponibles” */
  &__day--available:not(&__day--selected):hover {
    background-color: #ffe4e1;
  }

  /* Variantes de tamaño (referencia c_contactMap) */
  &--xxl &__inner {
    width: 343px;
  }
  &--xl &__inner {
    width: 343px;
  }
  &--lg &__inner {
    width: 343px;
  }
  &--md &__inner {
    width: 343px;
  }
  &--sm &__inner {
    width: 320px;
  }
  &--xs &__inner {
    width: 100%;
    min-width: 280px;
    max-width: 343px;
  }
}
</style>
