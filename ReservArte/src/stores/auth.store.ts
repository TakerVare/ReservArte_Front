import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const AUTH_TOKEN_KEY = 'auth_token'
const AUTH_USER_KEY = 'auth_user'

export interface AuthUser {
  id: string
  email: string
  role: 'admin' | 'user'
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

  function setAuth(newToken: string, userData: AuthUser) {
    token.value = newToken
    user.value = userData
    localStorage.setItem(AUTH_TOKEN_KEY, newToken)
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(userData))
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem(AUTH_TOKEN_KEY)
    localStorage.removeItem(AUTH_USER_KEY)
  }

  return { token, user, isAuthenticated, isAdmin, setAuth, logout }
})
