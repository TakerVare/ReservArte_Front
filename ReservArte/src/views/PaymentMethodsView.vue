<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()
</script>

<script lang="ts">
export default {
  name: 'PaymentMethodsView',
}
</script>

<template>
  <div class="payment-view">
    <div class="payment-view__container">
      <button class="payment-view__back" @click="router.back()">
        ← {{ t('common.back') }}
      </button>

      <h1 class="payment-view__title">{{ t('payment.title') }}</h1>
      <p class="payment-view__subtitle">{{ t('payment.subtitle') }}</p>

      <div class="payment-view__cards">

        <div class="payment-view__card">
          <div class="payment-view__card-icon">💳</div>
          <div class="payment-view__card-content">
            <h2>{{ t('payment.card.title') }}</h2>
            <p>{{ t('payment.card.description') }}</p>
          </div>
        </div>

        <div class="payment-view__card">
          <div class="payment-view__card-icon">💵</div>
          <div class="payment-view__card-content">
            <h2>{{ t('payment.cash.title') }}</h2>
            <p>{{ t('payment.cash.description') }}</p>
          </div>
        </div>

        <div class="payment-view__card">
          <div class="payment-view__card-icon">📱</div>
          <div class="payment-view__card-content">
            <h2>{{ t('payment.bizum.title') }}</h2>
            <p>{{ t('payment.bizum.description') }} <strong>649 227 139</strong> {{ t('payment.bizum.timing') }}</p>
          </div>
        </div>

      </div>

      <section class="payment-view__section">
        <h2>{{ t('payment.cancellation.title') }}</h2>
        <p>{{ t('payment.cancellation.description') }}</p>
        <ul>
          <li>{{ t('payment.cancellation.rule1') }}</li>
          <li>{{ t('payment.cancellation.rule2') }}</li>
          <li>{{ t('payment.cancellation.rule3') }}</li>
        </ul>
      </section>

      <section class="payment-view__section">
        <h2>{{ t('payment.vouchers.title') }}</h2>
        <p>{{ t('payment.vouchers.description') }} <strong>info@morethanbrows.com</strong>.</p>
      </section>

      <section class="payment-view__section">
        <h2>{{ t('payment.contact.title') }}</h2>
        <p>{{ t('payment.contact.description') }} <strong>info@morethanbrows.com</strong> {{ t('payment.contact.or') }} <strong>649 227 139</strong>.</p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.payment-view {
  width: 100%;
  padding: 24px 16px 48px;
  box-sizing: border-box;
}

.payment-view__container {
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.payment-view__back {
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

.payment-view__back:hover {
  text-decoration: underline;
}

.payment-view__title {
  font-family: Georgia, serif;
  font-size: 36px;
  font-weight: 400;
  color: #1e1e1e;
  margin: 16px 0 0;
}

.payment-view__subtitle {
  font-family: Georgia, serif;
  font-size: 14px;
  color: #999;
  margin: 0 0 16px;
}

.payment-view__cards {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 8px 0 16px;
}

.payment-view__card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background: #fafafa;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  padding: 20px;
}

.payment-view__card-icon {
  font-size: 28px;
  line-height: 1;
  flex-shrink: 0;
  margin-top: 2px;
}

.payment-view__card-content h2 {
  font-family: Georgia, serif;
  font-size: 18px;
  font-weight: 700;
  color: #1e1e1e;
  margin: 0 0 6px;
}

.payment-view__card-content p {
  font-family: Georgia, serif;
  font-size: 15px;
  color: #555;
  line-height: 1.6;
  margin: 0;
}

.payment-view__section {
  border-top: 1px solid #f5f5f5;
  padding: 20px 0;
}

.payment-view__section h2 {
  font-family: Georgia, serif;
  font-size: 20px;
  font-weight: 700;
  color: #1e1e1e;
  margin: 0 0 12px;
}

.payment-view__section p,
.payment-view__section li {
  font-family: Georgia, serif;
  font-size: 16px;
  color: #333;
  line-height: 1.6;
}

.payment-view__section ul {
  padding-left: 20px;
  margin: 8px 0 0;
}

.payment-view__section li {
  margin-bottom: 4px;
}
</style>