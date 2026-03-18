import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useThemeStore } from '@/stores/theme'

describe('useThemeStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('setTheme(true) adds .dark class and persists to localStorage', () => {
    const store = useThemeStore()
    store.setTheme(true)

    expect(store.isDark).toBe(true)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(localStorage.getItem('roteirize-theme')).toBe('dark')
  })

  it('setTheme(false) removes .dark class and persists to localStorage', () => {
    const store = useThemeStore()
    store.setTheme(true)
    store.setTheme(false)

    expect(store.isDark).toBe(false)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(localStorage.getItem('roteirize-theme')).toBe('light')
  })

  it('toggle() flips the current theme', () => {
    const store = useThemeStore()
    store.setTheme(false)
    store.toggle()
    expect(store.isDark).toBe(true)

    store.toggle()
    expect(store.isDark).toBe(false)
  })

  it('initialize() reads stored "dark" preference from localStorage', () => {
    localStorage.setItem('roteirize-theme', 'dark')
    const store = useThemeStore()
    store.initialize()

    expect(store.isDark).toBe(true)
  })

  it('initialize() reads stored "light" preference from localStorage', () => {
    localStorage.setItem('roteirize-theme', 'light')
    const store = useThemeStore()
    store.initialize()

    expect(store.isDark).toBe(false)
  })

  it('initialize() falls back to system preference when no localStorage entry exists', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn(() => ({ matches: true })),
    })

    const store = useThemeStore()
    store.initialize()

    expect(store.isDark).toBe(true)
  })

  it('initialize() defaults to light when system prefers light', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn(() => ({ matches: false })),
    })

    const store = useThemeStore()
    store.initialize()

    expect(store.isDark).toBe(false)
  })
})
