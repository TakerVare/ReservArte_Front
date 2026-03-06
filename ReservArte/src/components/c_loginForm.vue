<template>
  <div
    class="c_loginForm"
    :class="`c_loginForm--${size.toLowerCase()}`"
  >
    <form
      class="c_loginForm__form"
      @submit.prevent="onSubmit"
    >
      <!-- Email -->
      <div class="c_loginForm__field">
        <label class="c_loginForm__label" for="login-email">{{ $t('auth.email') }}</label>
        <input
          id="login-email"
          v-model="email"
          type="email"
          class="c_loginForm__input"
          :class="{ 'c_loginForm__input--error': emailError }"
          autocomplete="username"
          @blur="emailBlur"
        />
        <span v-if="emailError" class="c_loginForm__field-error">
          {{ emailError }}
        </span>
      </div>

      <!-- Contraseña -->
      <div class="c_loginForm__field">
        <label class="c_loginForm__label" for="login-password">{{ $t('auth.password') }}</label>
        <input
          id="login-password"
          v-model="password"
          type="password"
          class="c_loginForm__input"
          :class="{ 'c_loginForm__input--error': passwordError }"
          autocomplete="current-password"
          @blur="passwordBlur"
        />
        <span v-if="passwordError" class="c_loginForm__field-error">
          {{ passwordError }}
        </span>
      </div>

      <!-- Checkboxes -->
      <div class="c_loginForm__checkbox-row">
        <div class="c_loginForm__checkbox-wrap">
          <input
            id="login-terms"
            v-model="acceptTerms"
            type="checkbox"
            class="c_loginForm__checkbox"
          />
          <label class="c_loginForm__checkbox-label" for="login-terms">
            <router-link to="/terms" class="c_loginForm__terms-link">
              Acepto los términos y condiciones
            </router-link>
          </label>
        </div>
        <span v-if="acceptTermsError" class="c_loginForm__field-error">
          {{ acceptTermsError }}
        </span>

        <div class="c_loginForm__forgot-row">
          <button
            type="button"
            class="c_loginForm__forgot-link"
            @click="showForgotModal = true"
          >
            {{ $t('auth.forgotPassword') }}
          </button>
        </div>
      </div>

      <!-- Error del servidor -->
      <p v-if="serverError" class="c_loginForm__error">
        {{ serverError }}
      </p>

      <!-- Botón -->
      <div class="c_loginForm__submit-wrap">
        <C_contentAreaPrimaryButton
          :text="submitButtonText"
          :size="submitButtonSize"
          :disabled="isLoading"
          @click="onSubmit"
        />
      </div>
    </form>

    <!-- Modal olvidé contraseña -->
    <div v-if="showForgotModal" class="c_loginForm__modal-overlay" @click.self="showForgotModal = false">
      <div class="c_loginForm__modal">
        <p class="c_loginForm__modal-text">
          Para recuperar tu contraseña contacta con nosotros en
          <strong>info@morethanbrows.com</strong> o llámanos al
          <strong>649 227 139</strong>.
        </p>
        <button class="c_loginForm__modal-close" @click="showForgotModal = false">
          Cerrar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../stores/auth.store'
import C_contentAreaPrimaryButton from './Buttons/c_contentAreaPrimaryButton.vue'
import type { ButtonSize } from './Buttons/c_contentAreaPrimaryButton.vue'

export type LoginFormSize = 'XXL' | 'XL' | 'LG' | 'MD' | 'SM' | 'XS'

const props = withDefaults(
  defineProps<{
    size?: LoginFormSize
    forgotPasswordUrl?: string
  }>(),
  {
    size: 'MD',
    forgotPasswordUrl: '',
  }
)

const { t } = useI18n()

const emit = defineEmits<{
  submit: [{ email: string; password: string; acceptTerms: boolean }]
  success: [{ token: string }]
  error: [error: unknown]
}>()

const validationSchema = computed(() =>
  yup.object({
    email: yup
      .string()
      .required(t('validation.loginEmailRequired'))
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        t('validation.emailInvalid')
      ),
    password: yup
      .string()
      .required(t('validation.loginPasswordRequired'))
      .min(8, t('validation.loginPasswordMin'))
      .matches(/[a-z]/, t('validation.loginPasswordLower'))
      .matches(/[A-Z]/, t('validation.loginPasswordUpper'))
      .matches(/[0-9]/, t('validation.loginPasswordNumber'))
      .matches(/[^a-zA-Z0-9]/, t('validation.loginPasswordSymbol')),
    acceptTerms: yup
      .boolean()
      .oneOf([true], t('validation.acceptTermsRequired')),
  })
)

const { handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    email: '',
    password: '',
    acceptTerms: false,
  },
})

const { value: email, errorMessage: emailError, handleBlur: emailBlur } = useField<string>('email')
const { value: password, errorMessage: passwordError, handleBlur: passwordBlur } = useField<string>('password')
const { value: acceptTerms, errorMessage: acceptTermsError } = useField<boolean>('acceptTerms')

const isLoading = ref(false)
const serverError = ref('')
const showForgotModal = ref(false)

const LOGIN_API_URL = '/api/Auth/Login'

const submitButtonSize = computed<ButtonSize>(() => {
  switch (props.size) {
    case 'XXL':
    case 'XL':
    case 'LG':
    case 'MD':
      return 'Form-L'
    case 'SM':
      return 'Form-M'
    case 'XS':
      return 'Form-S'
    default:
      return 'Form-L'
  }
})

const submitButtonText = computed(() =>
  isLoading.value ? t('auth.loggingIn') : t('auth.login')
)

const onSubmit = handleSubmit(async (values) => {
  serverError.value = ''
  await handleLogin(values.email, values.password)
})

async function handleLogin(emailVal: string, passwordVal: string) {
  isLoading.value = true
  try {
    const response = await fetch(LOGIN_API_URL, {
      method: 'POST',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: emailVal.trim(),
        password: passwordVal,
      }),
    })

    if (!response.ok) {
      const text = await response.text()
      serverError.value = text || `Error ${response.status}. Vuelve a intentarlo.`
      emit('error', new Error(serverError.value))
      return
    }

    const token = await response.text()
    if (token) {
      const authStore = useAuthStore()
      authStore.setAuthFromToken(token, emailVal.trim())
      emit('success', { token })
      emit('submit', {
        email: emailVal,
        password: passwordVal,
        acceptTerms: acceptTerms.value,
      })
    } else {
      serverError.value = 'No se recibió token de sesión.'
      emit('error', new Error(serverError.value))
    }
  } catch (err) {
    serverError.value = 'No se pudo conectar con el servidor. Comprueba tu conexión.'
    emit('error', err)
  } finally {
    isLoading.value = false
  }
}
</script>

<script lang="ts">
export default {
  name: 'CLoginForm',
}
</script>

<style lang="scss" scoped>
.c_loginForm {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #fff;

  &__form {
    width: 100%;
    max-width: 600px;
    min-width: 320px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    padding: 17px 0;
  }

  &__field {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: flex-start;
    color: #1a1a1a;
  }

  &__label {
    width: 100%;
    margin: 0;
    text-align: left;
    color: #1a1a1a;
    font-size: 16px;
    font-style: normal;
    font-family: Roboto, system-ui, sans-serif;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0;
  }

  &__input {
    width: 100%;
    padding: 12px 16px;
    box-sizing: border-box;
    border: 1px solid #d9d9d9;
    background-color: #fff;
    min-width: 120px;
    font: inherit;
    color: inherit;
    transition: border-color 0.2s;

    &::placeholder {
      color: #999;
    }

    &--error {
      border-color: #b71c1c;
    }
  }

  &__field-error {
    color: #b71c1c;
    font-size: 13px;
    font-family: Roboto, system-ui, sans-serif;
    line-height: 18px;
    margin-top: 2px;
  }

  &__checkbox-row {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  &__checkbox-wrap {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 120px;
  }

  &__checkbox {
    width: 16px;
    height: 16px;
    margin: 0;
    flex-shrink: 0;
    accent-color: #2c2c2c;
    cursor: pointer;
  }

  &__checkbox-label {
    margin: 0;
    color: #1e1e1e;
    font-size: 16px;
    font-style: normal;
    font-family: Inter, system-ui, sans-serif;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0;
    cursor: pointer;
  }

  &__terms-link {
    color: #FFB6C1;
    text-decoration: underline;
    font-family: inherit;
    font-size: inherit;
  }

  &__forgot-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__forgot-link {
    background: none;
    border: none;
    padding: 0;
    color: #757575;
    font-size: 16px;
    font-style: normal;
    font-family: Inter, system-ui, sans-serif;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  &__error {
    width: 100%;
    margin: 0;
    padding: 8px 0;
    color: #b71c1c;
    font-size: 14px;
    font-family: Roboto, system-ui, sans-serif;
  }

  &__submit-wrap {
    width: 100%;
    max-width: 584px;
    min-height: 84px;
    box-sizing: border-box;
  }

  &__modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
  }

  &__modal {
    background: #fff;
    padding: 32px 24px;
    max-width: 360px;
    width: 90%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    border-radius: 4px;
  }

  &__modal-text {
    font-family: Georgia, serif;
    font-size: 16px;
    color: #333;
    line-height: 1.6;
    margin: 0;
  }

  &__modal-close {
    align-self: flex-end;
    background: #FFB6C1;
    border: none;
    color: #fff;
    font-family: Georgia, serif;
    font-size: 14px;
    font-weight: 700;
    padding: 10px 20px;
    cursor: pointer;

    &:hover {
      background: #f0a0b0;
    }
  }

  &--xxl {
    gap: 64px;
    padding: 64px;
    max-width: 1440px;
    margin: 0 auto;
    min-height: 374px;
  }

  &--xl {
    gap: 48px;
    padding: 48px;
    max-width: 1200px;
    margin: 0 auto;
    min-height: 374px;
  }
  &--xl &__form { gap: 24px; }
  &--xl &__submit-wrap { max-width: 584px; }

  &--lg {
    gap: 32px;
    padding: 32px;
    max-width: 992px;
    margin: 0 auto;
    min-height: 374px;
  }

  &--md {
    padding: 24px;
    max-width: 768px;
    margin: 0 auto;
    min-height: 374px;
  }
  &--md &__form { gap: 24px; }

  &--sm {
    padding: 16px;
    max-width: 576px;
    margin: 0 auto;
    min-height: 348px;
  }
  &--sm &__form {
    gap: 16px;
    max-width: 544px;
  }
  &--sm &__submit-wrap { max-width: 544px; }

  &--xs {
    padding: 16px;
    max-width: 375px;
    margin: 0 auto;
    min-height: 348px;
  }
  &--xs &__form {
    gap: 16px;
    max-width: 343px;
  }
  &--xs &__submit-wrap { max-width: 343px; }
}
</style>