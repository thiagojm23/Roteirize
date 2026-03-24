<template lang="pug">
//- ===== FIXED MODE =====
template(v-if="mode === 'fixed'")
  //- Desktop sidebar — always visible, toggles between full and icons-only
  aside.hidden.flex-col.border-r.border-border.bg-card.min-h-screen.transition-all.duration-300(
    :class="[collapsed ? 'w-16' : 'w-64', 'lg:flex']"
  )
    //- Header
    .flex.items-center.h-16.border-b.border-border.transition-all(
      :class="collapsed ? 'px-3 justify-center' : 'px-6 gap-2'"
    )
      component(v-if="logo" :is="logo" class="h-5 w-5 text-primary shrink-0")
      span.font-bold.text-lg.text-primary(v-if="title && !collapsed") {{ title }}

    //- Nav items
    nav.flex-1.py-4.px-3.space-y-1
      template(v-for="item in items" :key="item.name")
        AppTooltip(v-if="collapsed" :content="item.label" side="right")
          Link(
            :href="item.href"
            :class="[navItemBase, isActive(item.href) ? activeClass : inactiveClass, 'justify-center']"
          )
            component(:is="item.icon" class="h-4 w-4 shrink-0")
        Link(
          v-else
          :href="item.href"
          :class="[navItemBase, isActive(item.href) ? activeClass : inactiveClass]"
        )
          component(:is="item.icon" class="h-4 w-4 shrink-0")
          | {{ item.label }}

    //- Bottom section
    .border-t.border-border.p-3.space-y-1
      //- Collapse toggle
      template(v-if="showCollapseToggle")
        AppTooltip(v-if="collapsed" content="Expandir menu" side="right")
          button.flex.items-center.rounded-lg.px-3.py-2.text-muted-foreground.transition-colors.w-full(
            class="hover:bg-accent hover:text-accent-foreground justify-center"
            @click="toggle"
          )
            PanelLeftOpen.h-4.w-4
        button.flex.items-center.gap-3.rounded-lg.px-3.py-2.text-muted-foreground.transition-colors.w-full(
          v-else
          class="hover:bg-accent hover:text-accent-foreground"
          @click="toggle"
        )
          PanelLeftClose.h-4.w-4
          | Recolher menu

      //- Theme toggle
      template(v-if="showThemeToggle")
        AppTooltip(v-if="collapsed" :content="theme.isDark ? 'Modo claro' : 'Modo escuro'" side="right")
          button.flex.items-center.rounded-lg.px-3.py-2.text-muted-foreground.transition-colors.w-full(
            class="hover:bg-accent hover:text-accent-foreground justify-center"
            @click="theme.toggle()"
          )
            Sun.h-4.w-4(v-if="theme.isDark")
            Moon.h-4.w-4(v-else)
        button.flex.items-center.gap-3.rounded-lg.px-3.py-2.text-muted-foreground.transition-colors.w-full(
          v-else
          class="hover:bg-accent hover:text-accent-foreground"
          @click="theme.toggle()"
        )
          Sun.h-4.w-4(v-if="theme.isDark")
          Moon.h-4.w-4(v-else)
          | {{ theme.isDark ? 'Modo claro' : 'Modo escuro' }}

      //- Custom bottom action items
      template(v-for="item in bottomItems" :key="item.name")
        AppTooltip(v-if="collapsed" :content="item.label" side="right")
          button.flex.items-center.rounded-lg.px-3.py-2.text-muted-foreground.transition-colors.w-full(
            :class="[item.variant === 'destructive' ? 'hover:bg-destructive/10 hover:text-destructive' : 'hover:bg-accent hover:text-accent-foreground', 'justify-center']"
            @click="item.onClick()"
          )
            component(:is="item.icon" class="h-4 w-4")
        button.flex.items-center.gap-3.rounded-lg.px-3.py-2.text-muted-foreground.transition-colors.w-full(
          v-else
          :class="item.variant === 'destructive' ? 'hover:bg-destructive/10 hover:text-destructive' : 'hover:bg-accent hover:text-accent-foreground'"
          @click="item.onClick()"
        )
          component(:is="item.icon" class="h-4 w-4")
          | {{ item.label }}

      //- Logout
      template(v-if="showLogout")
        AppTooltip(v-if="collapsed" content="Sair" side="right")
          button.flex.items-center.rounded-lg.px-3.py-2.text-muted-foreground.transition-colors.w-full(
            class="hover:bg-destructive/10 hover:text-destructive justify-center"
            @click="handleLogout"
          )
            LogOut.h-4.w-4
        button.flex.items-center.gap-3.rounded-lg.px-3.py-2.text-muted-foreground.transition-colors.w-full(
          v-else
          class="hover:bg-destructive/10 hover:text-destructive"
          @click="handleLogout"
        )
          LogOut.h-4.w-4
          | Sair

  //- Mobile top bar
  .flex.items-center.justify-between.h-14.px-4.border-b.border-border.bg-card(class="lg:hidden")
    .flex.items-center.gap-2
      component(v-if="logo" :is="logo" class="h-5 w-5 text-primary")
      span.font-bold.text-primary(v-if="title") {{ title }}
    button.p-2.text-muted-foreground(@click="mobileOpen = true")
      Menu.h-5.w-5

  //- Mobile sheet
  AppSheet(v-model="mobileOpen" :title="title ?? ''" side="left" size="sm" class="p-0")
    nav.py-4.px-3.space-y-1
      Link(
        v-for="item in items"
        :key="item.name"
        :href="item.href"
        :class="[navItemBase, isActive(item.href) ? activeClass : inactiveClass]"
        @click="mobileOpen = false"
      )
        component(:is="item.icon" class="h-4 w-4 shrink-0")
        | {{ item.label }}
    .border-t.border-border.p-3.space-y-1
      button.flex.items-center.gap-3.rounded-lg.px-3.py-2.text-muted-foreground.transition-colors.w-full(
        v-for="item in bottomItems"
        :key="item.name"
        :class="item.variant === 'destructive' ? 'hover:bg-destructive/10 hover:text-destructive' : 'hover:bg-accent hover:text-accent-foreground'"
        @click="item.onClick(); mobileOpen = false"
      )
        component(:is="item.icon" class="h-4 w-4")
        | {{ item.label }}
      button.flex.items-center.gap-3.rounded-lg.px-3.py-2.text-muted-foreground.transition-colors.w-full(
        v-if="showLogout"
        class="hover:bg-destructive/10 hover:text-destructive"
        @click="handleLogout"
      )
        LogOut.h-4.w-4
        | Sair

//- ===== OVERLAY MODE =====
template(v-else)
  Teleport(to="body")
    Transition(
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-to-class="opacity-0"
    )
      .fixed.inset-0.z-40(
        v-if="isOpen"
        class="bg-black/50"
        @click="close"
      )

    Transition(
      enter-active-class="transition-transform duration-300 ease-out"
      :enter-from-class="side === 'left' ? '-translate-x-full' : 'translate-x-full'"
      leave-active-class="transition-transform duration-200 ease-in"
      :leave-to-class="side === 'left' ? '-translate-x-full' : 'translate-x-full'"
    )
      aside.fixed.top-0.h-full.z-50.flex.flex-col.bg-card.border-border(
        v-if="isOpen"
        :class="side === 'left' ? 'left-0 border-r' : 'right-0 border-l'"
        :style="{ width: `${overlayWidthPercent}vw` }"
      )
        //- Header
        .flex.items-center.justify-between.h-16.border-b.border-border.px-6
          .flex.items-center.gap-2
            component(v-if="logo" :is="logo" class="h-5 w-5 text-primary")
            span.font-bold.text-lg.text-primary(v-if="title") {{ title }}
          button.rounded-lg.p-1.text-muted-foreground(
            class="hover:bg-accent hover:text-accent-foreground"
            @click="close"
          )
            X.h-4.w-4

        //- Nav items
        nav.flex-1.overflow-y-auto.py-4.px-3.space-y-1
          Link(
            v-for="item in items"
            :key="item.name"
            :href="item.href"
            :class="[navItemBase, isActive(item.href) ? activeClass : inactiveClass]"
            @click="close"
          )
            component(:is="item.icon" class="h-4 w-4 shrink-0")
            | {{ item.label }}

        //- Bottom section
        .border-t.border-border.p-3.space-y-1(v-if="bottomItems.length || showLogout")
          button.flex.items-center.gap-3.rounded-lg.px-3.py-2.text-muted-foreground.transition-colors.w-full(
            v-for="item in bottomItems"
            :key="item.name"
            :class="item.variant === 'destructive' ? 'hover:bg-destructive/10 hover:text-destructive' : 'hover:bg-accent hover:text-accent-foreground'"
            @click="item.onClick(); close()"
          )
            component(:is="item.icon" class="h-4 w-4")
            | {{ item.label }}
          button.flex.items-center.gap-3.rounded-lg.px-3.py-2.text-muted-foreground.transition-colors.w-full(
            v-if="showLogout"
            class="hover:bg-destructive/10 hover:text-destructive"
            @click="handleLogout"
          )
            LogOut.h-4.w-4
            | Sair
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Component } from "vue";
import { Link } from "@inertiajs/vue3";
import { useTheme } from "@/Composables/useTheme";
import {
  LogOut,
  Sun,
  Moon,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from "lucide-vue-next";
import AppSheet from "@/Components/App/AppSheet.vue";
import AppTooltip from "@/Components/App/AppTooltip.vue";

export interface NavItem {
  name: string;
  label: string;
  icon: Component;
  href: string;
  badge?: string | number;
}

export interface ActionItem {
  name: string;
  label: string;
  icon: Component;
  onClick: () => void;
  variant?: "default" | "destructive";
}

interface Props {
  items?: NavItem[];
  bottomItems?: ActionItem[];
  logo?: Component;
  title?: string;
  // "full" = starts expanded (default), "icons" = starts collapsed (icons-only)
  collapseMode?: "full" | "icons";
  showCollapseToggle?: boolean;
  showThemeToggle?: boolean;
  showLogout?: boolean;
  onLogout?: () => void;
  mode?: "fixed" | "overlay";
  side?: "left" | "right";
  overlayWidthPercent?: number;
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  bottomItems: () => [],
  collapseMode: "full",
  showCollapseToggle: true,
  showThemeToggle: true,
  showLogout: true,
  mode: "fixed",
  side: "left",
  overlayWidthPercent: 25,
});

const theme = useTheme();
// starts collapsed only when collapseMode is explicitly "icons"
const collapsed = ref(props.collapseMode === "icons");
const mobileOpen = ref(false);
const isOpen = ref(false);

const navItemBase =
  "flex items-center gap-3 rounded-lg px-3 py-2 text-base font-medium transition-colors";
const activeClass = "bg-primary text-primary-foreground";
const inactiveClass =
  "text-muted-foreground hover:bg-accent hover:text-accent-foreground";

function isActive(href: string): boolean {
  return window.location.pathname === href;
}

function toggle() {
  collapsed.value = !collapsed.value;
}

function handleLogout() {
  props.onLogout?.();
}

function open() {
  isOpen.value = true;
}

function close() {
  isOpen.value = false;
  mobileOpen.value = false;
}

defineExpose({ open, close });
</script>
