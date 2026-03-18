<template lang="pug">
//- Desktop sidebar
aside.hidden.flex-col.border-r.border-border.bg-card.min-h-screen.transition-all.duration-300(
  v-if="collapseMode !== 'full' || !sidebar.collapsed"
  :class="[desktopWidthClass, 'lg:flex']"
)
  .flex.items-center.gap-2.h-16.border-b.border-border(:class="isIconsCollapsed ? 'px-3 justify-center' : 'px-6'")
    Compass.h-5.w-5.text-primary
    span.font-bold.text-lg.text-primary(v-if="!isIconsCollapsed") Roteirize

  nav.flex-1.py-4.px-3.space-y-1
    template(v-for="item in navItems" :key="item.to")
      AppTooltip(v-if="isIconsCollapsed" :content="item.label" side="right")
        Link(
          :href="item.to"
          :class="[navItemBaseClass, isActive(item.to) ? activeClass : inactiveClass, 'justify-center']"
        )
          component(:is="item.icon" class="h-4 w-4 shrink-0")
      Link(
        v-else
        :href="item.to"
        :class="[navItemBaseClass, isActive(item.to) ? activeClass : inactiveClass]"
      )
        component(:is="item.icon" class="h-4 w-4 shrink-0")
        | {{ item.label }}

  .border-t.border-border.p-3.space-y-1
    //- Collapse toggle button (only if collapseMode is not 'none')
    template(v-if="collapseMode !== 'none'")
      AppTooltip(v-if="isIconsCollapsed" :content="sidebar.collapsed ? 'Expandir menu' : 'Recolher menu'" side="right")
        button.flex.items-center.rounded-lg.px-3.py-2.text-base.font-medium.text-muted-foreground.transition-colors.w-full(
          class="hover:bg-accent hover:text-accent-foreground justify-center"
          @click="sidebar.toggle()"
        )
          PanelLeftOpen.h-4.w-4(v-if="sidebar.collapsed")
          PanelLeftClose.h-4.w-4(v-else)
      button.flex.items-center.gap-3.rounded-lg.px-3.py-2.text-base.font-medium.text-muted-foreground.transition-colors.w-full(
        v-else
        class="hover:bg-accent hover:text-accent-foreground"
        @click="sidebar.toggle()"
      )
        PanelLeftClose.h-4.w-4
        | Recolher menu

    //- Theme toggle
    template(v-if="isIconsCollapsed")
      AppTooltip(:content="theme.isDark ? 'Modo claro' : 'Modo escuro'" side="right")
        button.flex.items-center.rounded-lg.px-3.py-2.text-base.font-medium.text-muted-foreground.transition-colors.w-full(
          class="hover:bg-accent hover:text-accent-foreground justify-center"
          @click="theme.toggle()"
        )
          Sun.h-4.w-4(v-if="theme.isDark")
          Moon.h-4.w-4(v-else)
    button.flex.items-center.gap-3.rounded-lg.px-3.py-2.text-base.font-medium.text-muted-foreground.transition-colors.w-full(
      v-else
      class="hover:bg-accent hover:text-accent-foreground"
      @click="theme.toggle()"
    )
      Sun.h-4.w-4(v-if="theme.isDark")
      Moon.h-4.w-4(v-else)
      | {{ theme.isDark ? 'Modo claro' : 'Modo escuro' }}

    //- Logout
    template(v-if="isIconsCollapsed")
      AppTooltip(content="Sair" side="right")
        button.flex.items-center.rounded-lg.px-3.py-2.text-base.font-medium.text-muted-foreground.transition-colors.w-full(
          class="hover:bg-destructive/10 hover:text-destructive justify-center"
          @click="handleLogout"
        )
          LogOut.h-4.w-4
    button.flex.items-center.gap-3.rounded-lg.px-3.py-2.text-base.font-medium.text-muted-foreground.transition-colors.w-full(
      v-else
      class="hover:bg-destructive/10 hover:text-destructive"
      @click="handleLogout"
    )
      LogOut.h-4.w-4
      | Sair

//- Floating toggle for full collapse mode when sidebar is hidden
button.hidden.fixed.top-4.left-4.z-50.rounded-lg.border.border-border.bg-card.p-2.text-muted-foreground.shadow-md.transition-colors(
  v-if="collapseMode === 'full' && sidebar.collapsed"
  :class="'lg:block'"
  class="hover:bg-accent hover:text-accent-foreground"
  @click="sidebar.toggle()"
)
  PanelLeftOpen.h-5.w-5

//- Mobile top bar + sheet
.flex.items-center.justify-between.h-14.px-4.border-b.border-border.bg-card(class="lg:hidden")
  .flex.items-center.gap-2
    Compass.h-5.w-5.text-primary
    span.font-bold.text-primary Roteirize

  button.p-2.text-muted-foreground(@click="mobileOpen = true")
    Menu.h-5.w-5

AppSheet(v-model="mobileOpen" side="left" title="Roteirize" size="sm" class="p-0")
  nav.py-4.px-3.space-y-1
    Link(
      v-for="item in navItems"
      :key="item.to"
      :href="item.to"
      :class="[navItemBaseClass, isActive(item.to) ? activeClass : inactiveClass]"
      @click="mobileOpen = false"
    )
      component(:is="item.icon" class="h-4 w-4 shrink-0")
      | {{ item.label }}
  .border-t.border-border.p-3
    button.flex.items-center.gap-3.rounded-lg.px-3.py-2.text-base.font-medium.text-muted-foreground.transition-colors.w-full(
      class="hover:bg-destructive/10 hover:text-destructive"
      @click="handleLogout"
    )
      LogOut.h-4.w-4
      | Sair
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Link, router } from '@inertiajs/vue3'
import { useTheme } from '@/Composables/useTheme'
import { useSidebar } from '@/Composables/useSidebar'
import {
  LayoutDashboard,
  Map,
  Settings,
  LogOut,
  Compass,
  Sun,
  Moon,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-vue-next'
import AppSheet from '@/Components/App/AppSheet.vue'
import AppTooltip from '@/Components/App/AppTooltip.vue'

interface Props {
  collapseMode?: 'icons' | 'full' | 'none'
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  collapseMode: 'none',
  class: undefined,
})

const theme = useTheme()
const sidebar = useSidebar()
const mobileOpen = ref(false)

const isIconsCollapsed = computed(() => props.collapseMode === 'icons' && sidebar.collapsed)

const desktopWidthClass = computed(() => {
  if (isIconsCollapsed.value) return 'w-16'
  return 'w-64'
})

const navItemBaseClass = 'flex items-center gap-3 rounded-lg px-3 py-2 text-base font-medium transition-colors'
const activeClass = 'bg-primary text-primary-foreground'
const inactiveClass = 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'

const navItems = [
  { label: 'Painel', to: '/app', icon: LayoutDashboard },
  { label: 'Meus Roteiros', to: '/app/itineraries', icon: Map },
  { label: 'Configurações', to: '/app/settings', icon: Settings },
]

function isActive(path: string): boolean {
  return window.location.pathname === path
}

function handleLogout() {
  router.post('/auth/logout')
}

onMounted(() => {
  sidebar.initialize()
})
</script>
