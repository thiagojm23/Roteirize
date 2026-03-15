<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useThemeStore } from '@/stores/theme'
import { useAuthStore } from '@/features/auth/stores/auth'
import {
  LayoutDashboard,
  Map,
  Settings,
  LogOut,
  Compass,
  Sun,
  Moon,
  Menu,
  X,
} from 'lucide-vue-next'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

const theme = useThemeStore()
const auth = useAuthStore()
const route = useRoute()
const mobileOpen = ref(false)

const navItems = [
  { label: 'Painel', to: '/app', icon: LayoutDashboard },
  { label: 'Meus Roteiros', to: '/app/itineraries', icon: Map },
  { label: 'Configurações', to: '/app/settings', icon: Settings },
]

function isActive(path: string): boolean {
  return route.path === path
}

async function handleLogout() {
  await auth.logout()
  window.location.href = '/login'
}
</script>

<template lang="pug">
//- Desktop sidebar
aside.hidden.flex-col.w-64.border-r.border-border.bg-card.min-h-screen(class="lg:flex")
  .flex.items-center.gap-2.px-6.h-16.border-b.border-border
    Compass.h-5.w-5.text-primary
    span.font-bold.text-lg.text-primary Roteirize

  nav.flex-1.py-4.px-3.space-y-1
    RouterLink(
      v-for="item in navItems"
      :key="item.to"
      :to="item.to"
      :class="['flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors', isActive(item.to) ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground']"
    )
      component(:is="item.icon" class="h-4 w-4")
      | {{ item.label }}

  .border-t.border-border.p-3.space-y-1
    button.flex.items-center.gap-3.rounded-lg.px-3.py-2.text-sm.font-medium.text-muted-foreground.transition-colors.w-full(
      class="hover:bg-accent hover:text-accent-foreground"
      @click="theme.toggle()"
    )
      Sun.h-4.w-4(v-if="theme.isDark")
      Moon.h-4.w-4(v-else)
      | {{ theme.isDark ? 'Modo claro' : 'Modo escuro' }}

    button.flex.items-center.gap-3.rounded-lg.px-3.py-2.text-sm.font-medium.text-muted-foreground.transition-colors.w-full(
      class="hover:bg-destructive/10 hover:text-destructive"
      @click="handleLogout"
    )
      LogOut.h-4.w-4
      | Sair

//- Mobile top bar + sheet
.flex.items-center.justify-between.h-14.px-4.border-b.border-border.bg-card(class="lg:hidden")
  .flex.items-center.gap-2
    Compass.h-5.w-5.text-primary
    span.font-bold.text-primary Roteirize

  Sheet(:open="mobileOpen" @update:open="mobileOpen = $event")
    SheetTrigger(as-child)
      button.p-2.text-muted-foreground
        Menu.h-5.w-5
    SheetContent(side="left" class="w-64 p-0")
      SheetHeader.px-6.h-16.border-b.border-border.flex.items-center
        SheetTitle.flex.items-center.gap-2
          Compass.h-5.w-5.text-primary
          | Roteirize
      nav.py-4.px-3.space-y-1
        RouterLink(
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          :class="['flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors', isActive(item.to) ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground']"
          @click="mobileOpen = false"
        )
          component(:is="item.icon" class="h-4 w-4")
          | {{ item.label }}
      .border-t.border-border.p-3
        button.flex.items-center.gap-3.rounded-lg.px-3.py-2.text-sm.font-medium.text-muted-foreground.transition-colors.w-full(
          class="hover:bg-destructive/10 hover:text-destructive"
          @click="handleLogout"
        )
          LogOut.h-4.w-4
          | Sair
</template>
