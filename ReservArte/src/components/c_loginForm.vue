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
            {{ $t('auth.acceptTerms') }}
          </label>
        </div>
        <span v-if="acceptTermsError" class="c_loginForm__field-error">
          {{ acceptTermsError }}
        </span>

        <div class="c_loginForm__checkbox-wrap">
          <input
            id="login-register"
            v-model="wantsRegister"
            type="checkbox"
            class="c_loginForm__checkbox"
          />
          <label class="c_loginForm__checkbox-label" for="login-register">
            {{ $t('auth.wantRegister') }}
          </label>
        </div>

        <div class="c_loginForm__forgot-row">
          <a
            v-if="forgotPasswordUrl"
            :href="forgotPasswordUrl"
            class="c_loginForm__forgot-link"
          >
            {{ $t('auth.forgotPassword') }}
          </a>
          <span v-else class="c_loginForm__forgot-link">{{ $t('auth.forgotPassword') }}</span>
        </div>
      </div>

      <!-- Mensaje de éxito registro -->
      <p v-if="successMessage" class="c_loginForm__success">
        {{ successMessage }}
      </p>

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
  'register-success': []
}>()

// ─── Esquema Yup (traducido) ───
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

// ─── VeeValidate: useForm + useField ───
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

// ─── Estado local (no gestionado por VeeValidate) ───
const wantsRegister = ref(false)
const isLoading = ref(false)
const serverError = ref('')
const successMessage = ref('')

const LOGIN_API_URL = 'http://localhost:5297/api/Auth/Login'
const REGISTER_API_URL = 'http://localhost:5297/api/Auth/Register'

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

const submitButtonText = computed(() => {
  if (isLoading.value) {
    return wantsRegister.value ? t('auth.registering') : t('auth.loggingIn')
  }
  return wantsRegister.value ? t('auth.register') : t('auth.bookAppointment')
})

/**
 * onSubmit: VeeValidate valida con Yup.
 * Si pasa la validación, ejecuta handleLogin o handleRegister.
 * Si no pasa, los errores aparecen automáticamente debajo de cada campo.
 */
const onSubmit = handleSubmit(async (values) => {
  serverError.value = ''
  successMessage.value = ''

  if (wantsRegister.value) {
    await handleRegister(values.email, values.password)
  } else {
    await handleLogin(values.email, values.password)
  }
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

async function handleRegister(emailVal: string, passwordVal: string) {
  isLoading.value = true
  try {
    const response = await fetch(REGISTER_API_URL, {
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

    wantsRegister.value = false
    successMessage.value = t('auth.registerSuccess')
    emit('register-success')
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

  &__forgot-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__forgot-link {
    color: #757575;
    font-size: 16px;
    font-style: normal;
    font-family: Inter, system-ui, sans-serif;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0;
    text-decoration: none;

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

  &__success {
    width: 100%;
    margin: 0;
    padding: 8px 0;
    color: #2e7d32;
    font-size: 14px;
    font-family: Roboto, system-ui, sans-serif;
  }

  &__submit-wrap {
    width: 100%;
    max-width: 584px;
    min-height: 84px;
    box-sizing: border-box;
  }

  /* Variantes de tamaño */
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
  &--xl &__form {
    gap: 24px;
  }
  &--xl &__submit-wrap {
    max-width: 584px;
  }

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
  &--md &__form {
    gap: 24px;
  }

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
  &--sm &__submit-wrap {
    max-width: 544px;
  }

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
  &--xs &__submit-wrap {
    max-width: 343px;
  }
}
</style>