import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '@/features/auth/stores/auth'

describe('useAuthStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('is not authenticated initially', () => {
    const store = useAuthStore()
    expect(store.isAuthenticated).toBe(false)
    expect(store.user).toBeNull()
  })

  describe('login()', () => {
    it('sets user and returns true on valid credentials', async () => {
      const store = useAuthStore()
      const result = await store.login('joao@example.com', 'Senha123')

      expect(result).toBe(true)
      expect(store.isAuthenticated).toBe(true)
      expect(store.user?.email).toBe('joao@example.com')
      expect(store.error).toBe('')
    })

    it('sets error and returns false on invalid credentials', async () => {
      const store = useAuthStore()
      const result = await store.login('wrong@example.com', 'wrongpassword')

      expect(result).toBe(false)
      expect(store.isAuthenticated).toBe(false)
      expect(store.user).toBeNull()
      expect(store.error).not.toBe('')
    })

    it('sets isLoading to false after request completes', async () => {
      const store = useAuthStore()
      await store.login('joao@example.com', 'Senha123')
      expect(store.isLoading).toBe(false)
    })
  })

  describe('register()', () => {
    it('registers a new user and returns true', async () => {
      const store = useAuthStore()
      const result = await store.register({
        name: 'Maria Souza',
        email: 'maria@example.com',
        cpf: '11144477735',
        password: 'Senha123',
      })

      expect(result).toBe(true)
      expect(store.isAuthenticated).toBe(true)
      expect(store.user?.name).toBe('Maria Souza')
    })
  })

  describe('forgotPassword()', () => {
    it('returns true on success', async () => {
      const store = useAuthStore()
      const result = await store.forgotPassword('joao@example.com')
      expect(result).toBe(true)
    })
  })

  describe('fetchCurrentUser()', () => {
    it('populates user after a successful login', async () => {
      const store = useAuthStore()
      // Login first to simulate a session
      await store.login('joao@example.com', 'Senha123')

      // Reset user manually to simulate page refresh
      store.user = null

      await store.fetchCurrentUser()
      expect(store.user?.email).toBe('joao@example.com')
    })
  })

  describe('logout()', () => {
    it('clears user after logout', async () => {
      const store = useAuthStore()
      await store.login('joao@example.com', 'Senha123')
      expect(store.isAuthenticated).toBe(true)

      await store.logout()
      expect(store.isAuthenticated).toBe(false)
      expect(store.user).toBeNull()
    })
  })
})
