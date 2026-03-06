<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import CNavAreaPrimaryButton from '../components/Buttons/c_navAreaPrimaryButton.vue'

const router = useRouter()
const { t } = useI18n()
</script>

<script lang="ts">
export default {
  name: 'NotificationsView',
}
</script>

<template>
  <div class="notifications-view">
    <div class="notifications-view__container">
      <div class="notifications-view__back-wrap">
        <CNavAreaPrimaryButton
          :text="t('common.back')"
          size="SM"
          icon-position="before"
          @click="router.back()"
        >
          <template #icon>
            <img src="../assets/arrowLeft.svg" alt="" />
          </template>
        </CNavAreaPrimaryButton>
      </div>

      <h1 class="notifications-view__title">{{ t('notifications.title') }}</h1>

      <div class="notifications-view__empty">
        <div class="notifications-view__empty-icon">🔔</div>
        <p class="notifications-view__empty-text">{{ t('notifications.empty') }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.notifications-view {
  width: 100%;
  padding: 24px 16px 48px;
  box-sizing: border-box;
}

.notifications-view__container {
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.notifications-view__back-wrap {
  align-self: flex-start;
  padding: 8px 0;
}

.notifications-view__title {
  font-family: Georgia, serif;
  font-size: 32px;
  font-weight: 400;
  color: #1e1e1e;
  margin: 16px 0 24px;
}

.notifications-view__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 64px 24px;
  border: 1px solid #f5f5f5;
  border-radius: 8px;
  background: #fafafa;
}

.notifications-view__empty-icon {
  font-size: 48px;
  opacity: 0.4;
}

.notifications-view__empty-text {
  font-family: Georgia, serif;
  font-size: 16px;
  color: #999;
  margin: 0;
  text-align: center;
}
</style>