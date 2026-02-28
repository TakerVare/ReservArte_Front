import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const AUTH_TOKEN_KEY = 'auth_token'
const AUTH_USER_KEY = 'auth_user'

export interface AuthUser {
  id: string
  email: string
  role: 'admin' | 'user' | 'employee'
}

/** Decodifica el payload de un JWT (solo lectura; la verificación es responsabilidad del backend). */
function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const base64url = parts[1]
    if (!base64url) return null
    const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/')
    const binary = atob(base64)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
    const json = new TextDecoder().decode(bytes)
    return JSON.parse(json) as Record<string, unknown>
  } catch {
    return null
  }
}

function getStoredToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY)
}

function getStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY)
    if (!raw) return null
    return JSON.parse(raw) as AuthUser
  } catch {
    return null
  }
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(getStoredToken())
  const user = ref<AuthUser | null>(getStoredUser())

  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  /** true si el usuario puede ver el área de administración (admin o employee) */
  const showAdminArea = computed(
    () => user.value?.role === 'admin' || user.value?.role === 'employee'
  )

  function setAuth(newToken: string, userData: AuthUser) {
    token.value = newToken
    user.value = userData
    localStorage.setItem(AUTH_TOKEN_KEY, newToken)
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(userData))
  }

  /**
   * Establece la sesión a partir del token JWT: decodifica el payload
   * y extrae id (nameid), email y role. Si el token no se puede decodificar,
   * usa emailFallback y role 'user'.
   */
  function setAuthFromToken(newToken: string, emailFallback = '') {
    const payload = decodeJwtPayload(newToken)
    if (!payload) {
      setAuth(newToken, { id: '', email: emailFallback, role: 'user' })
      return
    }
    const id = String(payload.nameid ?? payload.sub ?? '')
    const email = String(payload.email ?? emailFallback ?? '')
    const roleRaw = String(payload.role ?? 'user').toLowerCase()
    const role: AuthUser['role'] =
      roleRaw === 'admin' || roleRaw === 'employee' ? roleRaw : 'user'
    setAuth(newToken, { id, email, role })
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem(AUTH_TOKEN_KEY)
    localStorage.removeItem(AUTH_USER_KEY)
  }

  return {
    token,
    user,
    isAuthenticated,
    isAdmin,
    showAdminArea,
    setAuth,
    setAuthFromToken,
    logout,
  }
})
