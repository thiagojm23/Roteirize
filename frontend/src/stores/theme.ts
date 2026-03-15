import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false)

  function setTheme(dark: boolean) {
    isDark.value = dark
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('roteirize-theme', dark ? 'dark' : 'light')
  }

  function toggle() {
    setTheme(!isDark.value)
  }

  function initialize() {
    const stored = localStorage.getItem('roteirize-theme')
    if (stored) {
      setTheme(stored === 'dark')
    } else {
      setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
  }

  return { isDark, setTheme, toggle, initialize }
})
