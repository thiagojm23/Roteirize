<template lang="pug">
header(class="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md")
  nav(class="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8")

    //- Logo
    RouterLink(
      :to="authStore.isAuthenticated ? { name: 'dashboard' } : { name: 'home' }"
      class="flex items-center gap-2 font-semibold text-foreground"
    )
      span(class="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground")
        Film(class="size-4")
      span(class="hidden sm:block") Roteirize

    //- Desktop navigation links (public only)
    nav(
      v-if="!authStore.isAuthenticated"
      class="hidden items-center gap-1 md:flex"
      aria-label="Navegação principal"
    )
      a(
        v-for="link in navLinks"
        :key="link.label"
        :href="link.to"
        class="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
      ) {{ link.label }}

    //- Dashboard link (authenticated only)
    RouterLink(
      v-if="authStore.isAuthenticated"
      :to="{ name: 'dashboard' }"
      class="hidden items-center gap-1.5 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground md:flex"
    )
      LayoutDashboard(class="size-4")
      | Meus Roteiros

    //- Spacer
    div(class="flex-1")

    //- Theme toggle
    ThemeToggle

    //- Auth actions — logged out
    template(v-if="!authStore.isAuthenticated")
      RouterLink(
        :to="{ name: 'login' }"
        class="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-primary sm:block"
      ) Entrar
      RouterLink(:to="{ name: 'register' }" class="hidden sm:block")
        AppButton(size="sm") Criar conta

    //- Auth actions — logged in (avatar dropdown)
    DropdownMenu(v-else)
      DropdownMenuTrigger(as-child)
        button(
          class="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-foreground transition-colors hover:bg-accent"
          :aria-label="authStore.user?.name"
        )
          AppAvatar(:name="authStore.user?.name" size="xs")
          span(class="hidden max-w-[120px] truncate sm:block") {{ authStore.user?.name }}
          ChevronDown(class="size-3.5 text-muted-foreground")
      DropdownMenuContent(align="end" :side-offset="8" class="w-52")
        div(class="px-2 py-1.5")
          p(class="text-sm font-medium text-foreground") {{ authStore.user?.name }}
          p(class="text-xs text-muted-foreground") {{ authStore.user?.email }}
        DropdownMenuSeparator
        DropdownMenuItem(as-child)
          RouterLink(:to="{ name: 'dashboard' }" class="flex cursor-pointer items-center gap-2")
            LayoutDashboard(class="size-4")
            | Meus Roteiros
        DropdownMenuItem(as-child)
          RouterLink(:to="{ name: 'profile' }" class="flex cursor-pointer items-center gap-2")
            User(class="size-4")
            | Meu perfil
        DropdownMenuSeparator
        DropdownMenuItem(@click="handleLogout" class="text-destructive focus:text-destructive cursor-pointer")
          LogOut(class="size-4")
          | Sair

    //- Mobile menu button (logged out only)
    button(
      v-if="!authStore.isAuthenticated"
      @click="mobileMenuOpen = !mobileMenuOpen"
      class="flex size-9 items-center justify-center rounded-lg text-muted-foreground sm:hidden"
      :aria-label="mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'"
    )
      X(v-if="mobileMenuOpen" class="size-5")
      Menu(v-else class="size-5")

//- Mobile menu overlay
Transition(name="fade")
  div(
    v-if="mobileMenuOpen && !authStore.isAuthenticated"
    class="fixed inset-x-0 top-16 z-30 border-b border-border bg-background px-4 py-4 sm:hidden"
  )
    nav(class="flex flex-col gap-1")
      a(
        v-for="link in navLinks"
        :key="link.label"
        :href="link.to"
        @click="mobileMenuOpen = false"
        class="rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      ) {{ link.label }}
    div(class="mt-3 flex flex-col gap-2 border-t border-border pt-3")
      RouterLink(:to="{ name: 'login' }" @click="mobileMenuOpen = false")
        AppButton(variant="outline" class="w-full justify-center") Entrar
      RouterLink(:to="{ name: 'register' }" @click="mobileMenuOpen = false")
        AppButton(class="w-full justify-center") Criar conta grátis
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { Film, Menu, X, ChevronDown, LogOut, LayoutDashboard, User } from 'lucide-vue-next'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import ThemeToggle from '@/components/ui/ThemeToggle.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppAvatar from '@/components/ui/AppAvatar.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const mobileMenuOpen = ref(false)

const navLinks = [
  { label: 'Funcionalidades', to: '/#features' },
  { label: 'Como funciona', to: '/#how-it-works' },
  { label: 'Preços', to: '/#pricing' },
]

const handleLogout = async () => {
  await authStore.logout()
  router.push({ name: 'home' })
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
