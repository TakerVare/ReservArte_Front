<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import CNavAreaPrimaryButton from '../components/Buttons/c_navAreaPrimaryButton.vue'

const router = useRouter()
const { t } = useI18n()
</script>

<script lang="ts">
export default {
  name: 'TermsView',
}
</script>

<template>
  <div class="terms-view">
    <div class="terms-view__container">
      <div class="terms-view__back-wrap">
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

      <h1 class="terms-view__title">Términos y Condiciones</h1>
      <p class="terms-view__date">Última actualización: enero 2025</p>

      <section class="terms-view__section">
        <h2>1. Identificación</h2>
        <p>More Than Brows es un centro de estética profesional especializado en tratamientos de cejas y cuidado facial, con sede en Zaragoza, España. Al utilizar esta aplicación y reservar nuestros servicios, aceptas los presentes términos y condiciones en su totalidad.</p>
      </section>

      <section class="terms-view__section">
        <h2>2. Servicios ofrecidos</h2>
        <p>More Than Brows ofrece servicios de tratamiento y cuidado de cejas, incluyendo diseño, depilación, tinte, laminado y otros tratamientos faciales. Los servicios disponibles, precios y duración se muestran en la aplicación y pueden ser modificados sin previo aviso.</p>
      </section>

      <section class="terms-view__section">
        <h2>3. Reservas y citas</h2>
        <p>Las reservas realizadas a través de esta aplicación están sujetas a disponibilidad. Una vez confirmada tu cita, recibirás una notificación de confirmación. More Than Brows se reserva el derecho de modificar o cancelar citas en casos excepcionales, notificándolo con la mayor antelación posible.</p>
      </section>

      <section class="terms-view__section">
        <h2>4. Cancelaciones y modificaciones</h2>
        <p>Para cancelar o modificar una cita, debes hacerlo con al menos <strong>24 horas de antelación</strong>. En caso de cancelación tardía o no presentación (no-show), podrán aplicarse los siguientes cargos:</p>
        <ul>
          <li>Cancelación con más de 24h de antelación: sin coste.</li>
          <li>Cancelación con menos de 24h: cargo del 50% del servicio reservado.</li>
          <li>No presentación sin aviso: cargo del 100% del servicio reservado.</li>
        </ul>
      </section>

      <section class="terms-view__section">
        <h2>5. Precios y pagos</h2>
        <p>Los precios indicados en la aplicación incluyen los impuestos aplicables. El pago se realiza en el centro al finalizar el servicio, mediante tarjeta bancaria, efectivo o Bizum. More Than Brows se reserva el derecho de modificar los precios en cualquier momento, siendo los precios vigentes los mostrados en la aplicación en el momento de la reserva.</p>
      </section>

      <section class="terms-view__section">
        <h2>6. Responsabilidad</h2>
        <p>More Than Brows se compromete a prestar sus servicios con la máxima profesionalidad y cuidado. No obstante, no se hace responsable de reacciones alérgicas u otros efectos adversos derivados de condiciones médicas no comunicadas previamente por el cliente. Es responsabilidad del cliente informar de cualquier alergia, condición médica o tratamiento en curso antes de recibir cualquier servicio.</p>
      </section>

      <section class="terms-view__section">
        <h2>7. Prueba de alergia</h2>
        <p>Algunos de nuestros servicios requieren una prueba de alergia previa, especialmente aquellos que implican el uso de tintes o productos químicos. More Than Brows se reserva el derecho de no realizar un servicio si el cliente no ha completado la prueba requerida o si existe riesgo para su salud.</p>
      </section>

      <section class="terms-view__section">
        <h2>8. Uso de la aplicación</h2>
        <p>El acceso a esta aplicación es personal e intransferible. El usuario se compromete a hacer un uso responsable de la misma, no facilitando sus credenciales a terceros. More Than Brows se reserva el derecho de suspender el acceso a usuarios que hagan un uso indebido de la plataforma.</p>
      </section>

      <section class="terms-view__section">
        <h2>9. Protección de datos</h2>
        <p>El tratamiento de tus datos personales se rige por nuestra <router-link to="/privacy" class="terms-view__link">Política de Privacidad</router-link>, que forma parte integrante de estos términos y condiciones.</p>
      </section>

      <section class="terms-view__section">
        <h2>10. Modificaciones de los términos</h2>
        <p>More Than Brows se reserva el derecho de modificar estos términos y condiciones en cualquier momento. Las modificaciones entrarán en vigor en el momento de su publicación en la aplicación. El uso continuado de la aplicación tras la publicación de cambios implica la aceptación de los nuevos términos.</p>
      </section>

      <section class="terms-view__section">
        <h2>11. Legislación aplicable</h2>
        <p>Estos términos y condiciones se rigen por la legislación española. Para cualquier controversia derivada del uso de esta aplicación o de la prestación de servicios, las partes se someten a los juzgados y tribunales de Zaragoza, renunciando a cualquier otro fuero que pudiera corresponderles.</p>
      </section>

      <section class="terms-view__section">
        <h2>12. Contacto</h2>
        <p>Para cualquier consulta relacionada con estos términos puedes contactarnos en <strong>info@morethanbrows.com</strong> o llamarnos al <strong>649 227 139</strong>.</p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.terms-view {
  width: 100%;
  padding: 24px 16px 48px;
  box-sizing: border-box;
}

.terms-view__container {
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.terms-view__back-wrap {
  align-self: flex-start;
  padding: 8px 0;
}

.terms-view__title {
  font-family: Georgia, serif;
  font-size: 36px;
  font-weight: 400;
  color: #1e1e1e;
  margin: 16px 0 0;
}

.terms-view__date {
  font-family: Georgia, serif;
  font-size: 14px;
  color: #999;
  margin: 0 0 16px;
}

.terms-view__section {
  border-top: 1px solid #f5f5f5;
  padding: 20px 0;
}

.terms-view__section h2 {
  font-family: Georgia, serif;
  font-size: 20px;
  font-weight: 700;
  color: #1e1e1e;
  margin: 0 0 12px;
}

.terms-view__section p,
.terms-view__section li {
  font-family: Georgia, serif;
  font-size: 16px;
  color: #333;
  line-height: 1.6;
}

.terms-view__section ul {
  padding-left: 20px;
  margin: 8px 0 0;
}

.terms-view__section li {
  margin-bottom: 4px;
}

.terms-view__link {
  color: #FFB6C1;
  text-decoration: underline;
}
</style>