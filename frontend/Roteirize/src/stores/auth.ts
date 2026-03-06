import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { logoutUser, type User } from '@/shared/utils'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => user.value !== null)

  const clearError = () => {
    error.value = null
  }

  /** Attempts to log in with email/password. The server sets httponly cookies on success. */
  const login = async (email: string, password: string): Promise<void> => {
    isLoading.value = true
    error.value = null
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.message ?? 'E-mail ou senha inválidos')
      }
      const data = await res.json()
      user.value = data.user
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao fazer login'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /** Registers a new user account. */
  const register = async (name: string, email: string, password: string): Promise<void> => {
    isLoading.value = true
    error.value = null
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
        credentials: 'include',
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.message ?? 'Erro ao criar conta')
      }
      const data = await res.json()
      user.value = data.user
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao criar conta'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /** Sends a password reset email. */
  const forgotPassword = async (email: string): Promise<void> => {
    isLoading.value = true
    error.value = null
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.message ?? 'Erro ao enviar e-mail')
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao enviar e-mail'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /** Resets the password using a token from the query string. */
  const resetPassword = async (token: string, password: string): Promise<void> => {
    isLoading.value = true
    error.value = null
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.message ?? 'Token inválido ou expirado')
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao redefinir senha'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /** Fetches the currently authenticated user using the httponly access token cookie. */
  const fetchCurrentUser = async (): Promise<void> => {
    try {
      const res = await fetch('/api/auth/me', { credentials: 'include' })
      if (res.ok) {
        const data = await res.json()
        user.value = data.user
      } else {
        user.value = null
      }
    } catch {
      user.value = null
    }
  }

  /** Logs out the current user, clearing the server-side session and local state. */
  const logout = async (): Promise<void> => {
    await logoutUser()
    user.value = null
  }

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    clearError,
    login,
    register,
    forgotPassword,
    resetPassword,
    fetchCurrentUser,
    logout,
  }
})
