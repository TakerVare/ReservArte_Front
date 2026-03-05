<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()
</script>

<script lang="ts">
export default {
  name: 'AboutView',
}
</script>

<template>
  <div class="about-view">
    <div class="about-view__container">
      <button class="about-view__back" @click="router.back()">
        ← {{ t('common.back') }}
      </button>

      <h1 class="about-view__title">{{ t('about.title') }}</h1>
      <p class="about-view__subtitle">{{ t('about.subtitle') }}</p>

      <div class="about-view__hero">
        <p class="about-view__hero-text">{{ t('about.hero') }}</p>
      </div>

      <section class="about-view__section">
        <h2>{{ t('about.whoWeAre.title') }}</h2>
        <p>{{ t('about.whoWeAre.text') }}</p>
      </section>

      <section class="about-view__section">
        <h2>{{ t('about.ourValues.title') }}</h2>
        <p>{{ t('about.ourValues.text') }}</p>
        <ul>
          <li>{{ t('about.ourValues.value1') }}</li>
          <li>{{ t('about.ourValues.value2') }}</li>
          <li>{{ t('about.ourValues.value3') }}</li>
          <li>{{ t('about.ourValues.value4') }}</li>
        </ul>
      </section>

      <section class="about-view__section">
        <h2>{{ t('about.services.title') }}</h2>
        <p>{{ t('about.services.text') }}</p>
      </section>

      <section class="about-view__section">
        <h2>{{ t('about.contact.title') }}</h2>
        <p>{{ t('about.contact.text') }} <strong>info@morethanbrows.com</strong> {{ t('about.contact.or') }} <strong>649 227 139</strong>.</p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.about-view {
  width: 100%;
  padding: 24px 16px 48px;
  box-sizing: border-box;
}

.about-view__container {
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.about-view__back {
  align-self: flex-start;
  background: none;
  border: none;
  color: #FFB6C1;
  font-family: Georgia, serif;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  padding: 8px 0;
}

.about-view__back:hover {
  text-decoration: underline;
}

.about-view__title {
  font-family: Georgia, serif;
  font-size: 36px;
  font-weight: 400;
  color: #1e1e1e;
  margin: 16px 0 0;
}

.about-view__subtitle {
  font-family: Georgia, serif;
  font-size: 14px;
  color: #999;
  margin: 0 0 8px;
}

.about-view__hero {
  background: #fff5f6;
  border-left: 4px solid #FFB6C1;
  border-radius: 8px;
  padding: 20px 24px;
  margin: 8px 0 16px;
}

.about-view__hero-text {
  font-family: Georgia, serif;
  font-size: 18px;
  font-style: italic;
  color: #555;
  line-height: 1.7;
  margin: 0;
}

.about-view__section {
  border-top: 1px solid #f5f5f5;
  padding: 20px 0;
}

.about-view__section h2 {
  font-family: Georgia, serif;
  font-size: 20px;
  font-weight: 700;
  color: #1e1e1e;
  margin: 0 0 12px;
}

.about-view__section p,
.about-view__section li {
  font-family: Georgia, serif;
  font-size: 16px;
  color: #333;
  line-height: 1.6;
}

.about-view__section ul {
  padding-left: 20px;
  margin: 8px 0 0;
}

.about-view__section li {
  margin-bottom: 4px;
}
</style>