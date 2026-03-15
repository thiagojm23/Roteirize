import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { api } from '@/lib/api'

export interface User {
  id: string
  name: string
  email: string
  avatarUrl?: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref('')

  const isAuthenticated = computed(() => !!user.value)

  async function login(email: string, password: string): Promise<boolean> {
    isLoading.value = true
    error.value = ''
    const result = await api.post<{ user: User }>('/auth/login', { email, password })
    isLoading.value = false

    if (result.error) {
      error.value = result.error.message
      return false
    }

    user.value = result.data.user
    return true
  }

  async function register(data: {
    name: string
    email: string
    cpf: string
    password: string
  }): Promise<boolean> {
    isLoading.value = true
    error.value = ''
    const result = await api.post<{ user: User }>('/auth/register', data)
    isLoading.value = false

    if (result.error) {
      error.value = result.error.message
      return false
    }

    user.value = result.data.user
    return true
  }

  async function forgotPassword(email: string): Promise<boolean> {
    isLoading.value = true
    error.value = ''
    const result = await api.post('/auth/forgot-password', { email })
    isLoading.value = false

    if (result.error) {
      error.value = result.error.message
      return false
    }

    return true
  }

  async function fetchCurrentUser(): Promise<void> {
    isLoading.value = true
    const result = await api.get<{ user: User }>('/auth/me')
    isLoading.value = false

    if (result.data) {
      user.value = result.data.user
    }
  }

  async function logout(): Promise<void> {
    await api.post('/auth/logout')
    user.value = null
  }

  return { user, isLoading, error, isAuthenticated, login, register, forgotPassword, fetchCurrentUser, logout }
})
