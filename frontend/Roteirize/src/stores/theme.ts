import { defineStore } from 'pinia'
import { ref } from 'vue'

declare function ui(action: string, value?: string): string

export type Theme = 'light' | 'dark' | 'system'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false)

  const applyTheme = (dark: boolean) => {
    isDark.value = dark
    ui('mode', dark ? 'dark' : 'light')
  }

  /** Initializes the theme from localStorage or system preference. */
  const initialize = () => {
    const saved = localStorage.getItem('theme') as Theme | null
    if (saved === 'dark') {
      applyTheme(true)
    } else if (saved === 'light') {
      applyTheme(false)
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      applyTheme(prefersDark)
    }
  }

  /** Toggles between light and dark mode, persisting the choice. */
  const toggle = () => {
    const nextDark = !isDark.value
    applyTheme(nextDark)
    localStorage.setItem('theme', nextDark ? 'dark' : 'light')
  }

  /** Sets a specific theme explicitly. */
  const setTheme = (theme: Theme) => {
    if (theme === 'system') {
      localStorage.removeItem('theme')
      applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches)
    } else {
      localStorage.setItem('theme', theme)
      applyTheme(theme === 'dark')
    }
  }

  return { isDark, initialize, toggle, setTheme }
})
