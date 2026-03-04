<script setup lang="ts">
import { ref } from 'vue'
import c_pageTittle from '../components/c_pageTittle.vue'
import c_heroTitle from '../components/c_heroTitle.vue'
import c_heroDescription from '../components/c_heroDescription.vue'
import c_heroSection from '../components/c_heroSection.vue'
import c_sectionTittle from '../components/c_sectionTittle.vue'
import c_contactMap from '../components/c_contactMap.vue'
import c_bookingEmpty from '../components/c_bookingEmpty.vue'
import c_bookingAssigned from '../components/c_bookingAssigned.vue'
import c_appointmentCalendar from '../components/c_appointmentCalendar.vue'
import c_textlabel from '../components/c_textlabel.vue'
import c_listItem from '../components/c_listItem.vue'
import CContentAreaPrimaryButton from '../components/Buttons/c_contentAreaPrimaryButton.vue'
import CContentAreaSecondaryButton from '../components/Buttons/c_contentAreaSecondaryButton.vue'
import CNavAreaPrimaryButton from '../components/Buttons/c_navAreaPrimaryButton.vue'
import CNavAreaSecondaryButton from '../components/Buttons/c_navAreaSecondaryButton.vue'

const SIZES = ['XXL', 'XL', 'LG', 'MD', 'SM', 'XS'] as const
const SECTION_SIZES = ['LG', 'MD', 'SM', 'XS'] as const
const TEXTLABEL_VARIANTS = [
  'titulo-principal',
  'subtitulo',
  'titulo-seccion',
  'subseccion',
  'parrafo',
  'small',
  'empty-state',
] as const

const calendarDate = ref<Date | null>(null)
</script>

<script lang="ts">
export default {
  name: 'StileGuideView',
}
</script>

<template>
  <div class="stileGuideView">
    <h1 class="stileGuideView__main-title">Style Guide — Componentes y variantes</h1>

    <!-- c_pageTittle -->
    <section class="stileGuideView__section">
      <h2 class="stileGuideView__section-title">c_pageTittle</h2>
      <div v-for="s in SIZES" :key="'pageTittle-' + s" class="stileGuideView__variant">
        <span class="stileGuideView__variant-label">size: {{ s }}</span>
        <c_pageTittle :text="`c_pageTittle — ${s}`" :size="s" />
      </div>
    </section>

    <!-- c_heroTitle -->
    <section class="stileGuideView__section">
      <h2 class="stileGuideView__section-title">c_heroTitle</h2>
      <div v-for="s in SIZES" :key="'heroTitle-' + s" class="stileGuideView__variant">
        <span class="stileGuideView__variant-label">size: {{ s }}</span>
        <c_heroTitle :text="`c_heroTitle — ${s}`" :size="s" />
      </div>
    </section>

    <!-- c_heroDescription -->
    <section class="stileGuideView__section">
      <h2 class="stileGuideView__section-title">c_heroDescription</h2>
      <div v-for="s in SIZES" :key="'heroDesc-' + s" class="stileGuideView__variant">
        <span class="stileGuideView__variant-label">size: {{ s }}</span>
        <c_heroDescription :text="`c_heroDescription — ${s}`" :size="s" />
      </div>
    </section>

    <!-- c_heroSection -->
    <section class="stileGuideView__section">
      <h2 class="stileGuideView__section-title">c_heroSection</h2>
      <div v-for="s in SIZES" :key="'heroSection-' + s" class="stileGuideView__variant">
        <span class="stileGuideView__variant-label">size: {{ s }}</span>
        <c_heroSection :title="`c_heroSection — ${s}`" :size="s" />
      </div>
    </section>

    <!-- c_sectionTittle -->
    <section class="stileGuideView__section">
      <h2 class="stileGuideView__section-title">c_sectionTittle</h2>
      <div v-for="s in SECTION_SIZES" :key="'sectionTittle-' + s" class="stileGuideView__variant">
        <span class="stileGuideView__variant-label">size: {{ s }}</span>
        <c_sectionTittle :text="`c_sectionTittle — ${s}`" :size="s" />
      </div>
    </section>

    <!-- c_textlabel -->
    <section class="stileGuideView__section">
      <h2 class="stileGuideView__section-title">c_textlabel</h2>
      <div v-for="v in TEXTLABEL_VARIANTS" :key="'textlabel-' + v" class="stileGuideView__variant">
        <span class="stileGuideView__variant-label">variant: {{ v }}</span>
        <c_textlabel :text="`c_textlabel — ${v}`" :variant="v" />
      </div>
    </section>

    <!-- c_contactMap -->
    <section class="stileGuideView__section">
      <h2 class="stileGuideView__section-title">c_contactMap</h2>
      <div v-for="s in SIZES" :key="'contactMap-' + s" class="stileGuideView__variant">
        <span class="stileGuideView__variant-label">size: {{ s }}</span>
        <c_contactMap :size="s" />
      </div>
    </section>

    <!-- c_bookingEmpty -->
    <section class="stileGuideView__section">
      <h2 class="stileGuideView__section-title">c_bookingEmpty</h2>
      <div v-for="s in SIZES" :key="'bookingEmpty-' + s" class="stileGuideView__variant">
        <span class="stileGuideView__variant-label">size: {{ s }}</span>
        <c_bookingEmpty :size="s" />
      </div>
    </section>

    <!-- c_bookingAssigned -->
    <section class="stileGuideView__section">
      <h2 class="stileGuideView__section-title">c_bookingAssigned</h2>
      <div v-for="s in SIZES" :key="'bookingAssigned-' + s" class="stileGuideView__variant">
        <span class="stileGuideView__variant-label">size: {{ s }}</span>
        <c_bookingAssigned :size="s" />
      </div>
    </section>

    <!-- c_appointmentCalendar -->
    <section class="stileGuideView__section">
      <h2 class="stileGuideView__section-title">c_appointmentCalendar</h2>
      <div v-for="s in SIZES" :key="'calendar-' + s" class="stileGuideView__variant">
        <span class="stileGuideView__variant-label">size: {{ s }}</span>
        <c_appointmentCalendar v-model="calendarDate" :size="s" />
      </div>
    </section>

    <!-- c_listItem -->
    <section class="stileGuideView__section">
      <h2 class="stileGuideView__section-title">c_listItem</h2>
      <div v-for="s in SECTION_SIZES" :key="'listItem-' + s" class="stileGuideView__variant">
        <span class="stileGuideView__variant-label">size: {{ s }}</span>
        <c_listItem :title="`c_listItem — ${s}`" :size="s" />
      </div>
    </section>

    <!-- Botones -->
    <section class="stileGuideView__section">
      <h2 class="stileGuideView__section-title">Botones (Content Area)</h2>
      <div class="stileGuideView__variant">
        <span class="stileGuideView__variant-label">CContentAreaPrimaryButton</span>
        <div class="stileGuideView__button-row">
          <CContentAreaPrimaryButton v-for="s in SIZES" :key="'cap-' + s" :text="s" :size="s" />
        </div>
      </div>
      <div class="stileGuideView__variant">
        <span class="stileGuideView__variant-label">CContentAreaSecondaryButton</span>
        <div class="stileGuideView__button-row">
          <CContentAreaSecondaryButton v-for="s in SIZES" :key="'cas-' + s" :text="s" :size="s" />
        </div>
      </div>
    </section>

    <section class="stileGuideView__section">
      <h2 class="stileGuideView__section-title">Botones (Nav Area)</h2>
      <div class="stileGuideView__variant">
        <span class="stileGuideView__variant-label">CNavAreaPrimaryButton</span>
        <div class="stileGuideView__button-row">
          <CNavAreaPrimaryButton v-for="s in SIZES" :key="'nap-' + s" :text="s" :size="s" />
        </div>
      </div>
      <div class="stileGuideView__variant">
        <span class="stileGuideView__variant-label">CNavAreaSecondaryButton</span>
        <div class="stileGuideView__button-row">
          <CNavAreaSecondaryButton v-for="s in SIZES" :key="'nas-' + s" :text="s" :size="s" />
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.stileGuideView {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px 48px;
  box-sizing: border-box;
}

.stileGuideView__main-title {
  font-family: Georgia, serif;
  font-size: 32px;
  font-weight: 700;
  color: #1e1e1e;
  margin: 0 0 32px;
  padding-bottom: 16px;
  border-bottom: 2px solid #eee;
}

.stileGuideView__section {
  margin-bottom: 48px;
}

.stileGuideView__section-title {
  font-family: Inter, system-ui, sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0 0 16px;
}

.stileGuideView__variant {
  margin-bottom: 24px;
  padding: 16px;
  background: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #eee;
}

.stileGuideView__variant-label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: #666;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stileGuideView__button-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}
</style>
