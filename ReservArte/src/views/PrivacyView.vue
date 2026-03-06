<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import CNavAreaPrimaryButton from '../components/Buttons/c_navAreaPrimaryButton.vue'

const router = useRouter()
const { t } = useI18n()
</script>

<script lang="ts">
export default {
  name: 'PrivacyView',
}
</script>

<template>
  <div class="privacy-view">
    <div class="privacy-view__container">
      <div class="privacy-view__back-wrap">
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

      <h1 class="privacy-view__title">Política de Privacidad</h1>
      <p class="privacy-view__date">Última actualización: enero 2025</p>

      <section class="privacy-view__section">
        <h2>1. Responsable del tratamiento</h2>
        <p>More Than Brows es la empresa responsable del tratamiento de tus datos personales recogidos a través de esta aplicación.</p>
      </section>

      <section class="privacy-view__section">
        <h2>2. Datos que recopilamos</h2>
        <p>Recopilamos los siguientes datos personales:</p>
        <ul>
          <li>Nombre y apellidos</li>
          <li>Correo electrónico</li>
          <li>Número de teléfono</li>
          <li>Fecha de nacimiento</li>
          <li>Historial de citas y servicios</li>
        </ul>
      </section>

      <section class="privacy-view__section">
        <h2>3. Finalidad del tratamiento</h2>
        <p>Tus datos se utilizan exclusivamente para:</p>
        <ul>
          <li>Gestionar tus reservas y citas</li>
          <li>Enviarte recordatorios y confirmaciones</li>
          <li>Mejorar nuestros servicios</li>
          <li>Cumplir con obligaciones legales</li>
        </ul>
      </section>

      <section class="privacy-view__section">
        <h2>4. Base legal</h2>
        <p>El tratamiento de tus datos se basa en la ejecución del contrato de prestación de servicios y, en su caso, en tu consentimiento expreso.</p>
      </section>

      <section class="privacy-view__section">
        <h2>5. Conservación de datos</h2>
        <p>Conservamos tus datos mientras mantengas una relación activa con nosotros y durante los plazos legalmente establecidos.</p>
      </section>

      <section class="privacy-view__section">
        <h2>6. Tus derechos</h2>
        <p>Puedes ejercer los siguientes derechos enviando un correo a <strong>info@morethanbrows.com</strong>:</p>
        <ul>
          <li>Acceso a tus datos</li>
          <li>Rectificación de datos incorrectos</li>
          <li>Supresión de tus datos</li>
          <li>Limitación del tratamiento</li>
          <li>Portabilidad de tus datos</li>
          <li>Oposición al tratamiento</li>
        </ul>
      </section>

      <section class="privacy-view__section">
        <h2>7. Contacto</h2>
        <p>Para cualquier consulta sobre privacidad puedes contactarnos en <strong>info@morethanbrows.com</strong> o llamarnos al <strong>649 227 139</strong>.</p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.privacy-view {
  width: 100%;
  padding: 24px 16px 48px;
  box-sizing: border-box;
}

.privacy-view__container {
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.privacy-view__back-wrap {
  align-self: flex-start;
  padding: 8px 0;
}

.privacy-view__title {
  font-family: Georgia, serif;
  font-size: 36px;
  font-weight: 400;
  color: #1e1e1e;
  margin: 16px 0 0;
}

.privacy-view__date {
  font-family: Georgia, serif;
  font-size: 14px;
  color: #999;
  margin: 0 0 16px;
}

.privacy-view__section {
  border-top: 1px solid #f5f5f5;
  padding: 20px 0;
}

.privacy-view__section h2 {
  font-family: Georgia, serif;
  font-size: 20px;
  font-weight: 700;
  color: #1e1e1e;
  margin: 0 0 12px;
}

.privacy-view__section p,
.privacy-view__section li {
  font-family: Georgia, serif;
  font-size: 16px;
  color: #333;
  line-height: 1.6;
}

.privacy-view__section ul {
  padding-left: 20px;
  margin: 8px 0 0;
}

.privacy-view__section li {
  margin-bottom: 4px;
}
</style>