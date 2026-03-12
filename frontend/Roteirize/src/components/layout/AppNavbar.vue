<template lang="pug">
header.secondary-container.fixed
  nav
    RouterLink.row.no-space.middle-align(:to="brandLink")
      h6.primary-text.bold Roteirize
    div.max
    template(v-if="!isAuthenticated")
      RouterLink.link(to="#features") Funcionalidades
      RouterLink.link(to="#how-it-works") Como funciona
      RouterLink.link(to="#pricing") Preços
    button.circle.transparent(@click="themeStore.toggle()")
      i {{ themeStore.isDark ? 'light_mode' : 'dark_mode' }}
    template(v-if="!isAuthenticated")
      RouterLink.button.border.small(:to="{ name: 'login' }") Entrar
      RouterLink.button.small(:to="{ name: 'register' }") Cadastrar
    div(v-else)
      button.circle.transparent(@click="showUserMenu = !showUserMenu")
        i account_circle
      menu.right(:class="{ 'active': showUserMenu }")
        li
          a(@click="navigateTo('dashboard')")
            i dashboard
            span Painel
        li
          a(@click="navigateTo('profile')")
            i settings
            span Perfil
        li.divider
        li
          a(@click="handleLogout")
            i logout
            span Sair
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useThemeStore } from '@/stores/theme'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const themeStore = useThemeStore()
const authStore = useAuthStore()
const showUserMenu = ref(false)

const isAuthenticated = computed(() => authStore.isAuthenticated)

const brandLink = computed(() => (isAuthenticated.value ? { name: 'dashboard' } : { name: 'home' }))

const navigateTo = (name: string) => {
  showUserMenu.value = false
  router.push({ name })
}

const handleLogout = async () => {
  showUserMenu.value = false
  await authStore.logout()
  router.push({ name: 'home' })
}
</script>
