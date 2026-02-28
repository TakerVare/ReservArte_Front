<template>
  <div
    class="c_loginForm"
    :class="`c_loginForm--${size.toLowerCase()}`"
  >
    <form
      class="c_loginForm__form"
      @submit.prevent="handleSubmit"
    >
      <div class="c_loginForm__field">
        <label class="c_loginForm__label" for="login-email">Email</label>
        <input
          id="login-email"
          v-model="email"
          type="email"
          class="c_loginForm__input"
          autocomplete="username"
        />
      </div>
      <div class="c_loginForm__field">
        <label class="c_loginForm__label" for="login-password">Contraseña</label>
        <input
          id="login-password"
          v-model="password"
          type="password"
          class="c_loginForm__input"
          autocomplete="current-password"
        />
      </div>
      <div class="c_loginForm__checkbox-row">
        <div class="c_loginForm__checkbox-wrap">
          <input
            id="login-terms"
            v-model="acceptTerms"
            type="checkbox"
            class="c_loginForm__checkbox"
          />
          <label class="c_loginForm__checkbox-label" for="login-terms">
            Acepto los términos y condiciones
          </label>
        </div>
        <div class="c_loginForm__checkbox-wrap">
          <input
            id="login-register"
            v-model="wantsRegister"
            type="checkbox"
            class="c_loginForm__checkbox"
          />
          <label class="c_loginForm__checkbox-label" for="login-register">
            No tengo cuenta, quiero registrarme
          </label>
        </div>
        <div class="c_loginForm__forgot-row">
          <a
            v-if="forgotPasswordUrl"
            :href="forgotPasswordUrl"
            class="c_loginForm__forgot-link"
          >
            He olvidado mi contraseña
          </a>
          <span v-else class="c_loginForm__forgot-link">He olvidado mi contraseña</span>
        </div>
      </div>
      <p v-if="errorMessage" class="c_loginForm__error">
        {{ errorMessage }}
      </p>
      <div class="c_loginForm__submit-wrap">
        <C_contentAreaPrimaryButton
          :text="submitButtonText"
          :size="submitButtonSize"
          :disabled="isLoading"
          @click="handleSubmit"
        />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import C_contentAreaPrimaryButton from './Buttons/c_contentAreaPrimaryButton.vue'
import type { ButtonSize } from './Buttons/c_contentAreaPrimaryButton.vue'

export type LoginFormSize = 'XXL' | 'XL' | 'LG' | 'MD' | 'SM' | 'XS'

const props = withDefaults(
  defineProps<{
    size?: LoginFormSize
    /** URL del enlace "He olvidado mi contraseña". Opcional. */
    forgotPasswordUrl?: string
  }>(),
  {
    size: 'MD',
    forgotPasswordUrl: '',
  }
)

/** Tamaño del botón de envío según la versión del formulario */
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

const LOGIN_API_URL = 'http://localhost:5297/api/Auth/Login'
const REGISTER_API_URL = 'http://localhost:5297/api/Auth/Register'

const emit = defineEmits<{
  submit: [{ email: string; password: string; acceptTerms: boolean }]
  success: [{ token: string }]
  error: [error: unknown]
  'register-success': []
}>()

const email = ref('')
const password = ref('')
const acceptTerms = ref(false)
const wantsRegister = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

/** Texto dinámico del botón según el modo */
const submitButtonText = computed(() => {
  if (isLoading.value) {
    return wantsRegister.value ? 'Registrando...' : 'Iniciando sesión...'
  }
  return wantsRegister.value ? 'Registrarme' : 'Reservar Cita'
})

async function handleSubmit() {
  errorMessage.value = ''

  if (!email.value.trim()) {
    errorMessage.value = 'Introduce tu email.'
    return
  }
  if (!password.value) {
    errorMessage.value = 'Introduce tu contraseña.'
    return
  }
  if (!acceptTerms.value) {
    errorMessage.value = 'Debes aceptar los términos y condiciones.'
    return
  }

  if (wantsRegister.value) {
    await handleRegister()
  } else {
    await handleLogin()
  }
}

async function handleLogin() {
  isLoading.value = true
  try {
    const response = await fetch(LOGIN_API_URL, {
      method: 'POST',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value.trim(),
        password: password.value,
      }),
    })

    if (!response.ok) {
      const text = await response.text()
      errorMessage.value = text || `Error ${response.status}. Vuelve a intentarlo.`
      emit('error', new Error(errorMessage.value))
      return
    }

    const token = await response.text()
    if (token) {
      localStorage.setItem('auth_token', token)
      emit('success', { token })
      emit('submit', {
        email: email.value,
        password: password.value,
        acceptTerms: acceptTerms.value,
      })
    } else {
      errorMessage.value = 'No se recibió token de sesión.'
      emit('error', new Error(errorMessage.value))
    }
  } catch (err) {
    errorMessage.value = 'No se pudo conectar con el servidor. Comprueba tu conexión.'
    emit('error', err)
  } finally {
    isLoading.value = false
  }
}

async function handleRegister() {
  isLoading.value = true
  try {
    const response = await fetch(REGISTER_API_URL, {
      method: 'POST',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value.trim(),
        password: password.value,
      }),
    })

    if (!response.ok) {
      const text = await response.text()
      errorMessage.value = text || `Error ${response.status}. Vuelve a intentarlo.`
      emit('error', new Error(errorMessage.value))
      return
    }

    // Registro exitoso: desmarcar checkbox y avisar al usuario
    wantsRegister.value = false
    errorMessage.value = ''
    emit('register-success')
  } catch (err) {
    errorMessage.value = 'No se pudo conectar con el servidor. Comprueba tu conexión.'
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
    gap: 8px;
    align-items: flex-start;
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

    &::placeholder {
      color: #999;
    }
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