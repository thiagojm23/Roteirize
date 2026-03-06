<template lang="pug">
//- Sidebar wrapper — use with a Sheet on mobile or sticky aside on desktop
aside(:class="sidebarClass")

  //- Top area: logo + collapse toggle
  div(class="flex h-16 items-center justify-between px-3 border-b border-sidebar-border")
    RouterLink(
      v-if="!collapsed"
      to="/"
      class="flex items-center gap-2 font-semibold text-sidebar-foreground"
    )
      span(class="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground shrink-0")
        Film(class="size-3.5")
      span(class="truncate") Roteirize
    span(v-else class="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground mx-auto")
      Film(class="size-3.5")
    button(
      v-if="!collapsed"
      @click="$emit('update:collapsed', true)"
      class="ml-auto flex size-7 items-center justify-center rounded-md text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
      aria-label="Recolher menu"
    )
      PanelLeftClose(class="size-4")

  //- Expand button when collapsed
  div(v-if="collapsed" class="flex justify-center pt-2")
    button(
      @click="$emit('update:collapsed', false)"
      class="flex size-7 items-center justify-center rounded-md text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
      aria-label="Expandir menu"
    )
      PanelLeftOpen(class="size-4")

  //- Navigation items
  nav(class="flex flex-1 flex-col gap-0.5 overflow-y-auto p-2" aria-label="Menu lateral")
    template(v-for="item in items" :key="item.label")
      //- Section header
      p(
        v-if="item.section && !collapsed"
        class="mt-4 mb-1 px-2 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/40"
      ) {{ item.section }}

      //- Nav item
      TooltipProvider(v-if="collapsed" :delay-duration="0")
        Tooltip
          TooltipTrigger(as-child)
            RouterLink(
              :to="item.to"
              :class="navItemClass(item)"
            )
              component(:is="item.icon" class="size-4 shrink-0")
          TooltipContent(side="right")
            | {{ item.label }}
      RouterLink(
        v-else
        :to="item.to"
        :class="navItemClass(item)"
      )
        component(:is="item.icon" class="size-4 shrink-0")
        span(class="truncate") {{ item.label }}
        Badge(v-if="item.badge" variant="secondary" class="ml-auto text-[10px] h-4 px-1") {{ item.badge }}

  //- Footer slot (e.g. user info or settings)
  div(v-if="$slots.footer" class="border-t border-sidebar-border p-2")
    slot(name="footer")
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Film, PanelLeftClose, PanelLeftOpen } from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

export interface NavItem {
  label: string
  to: string | object
  icon: Component
  /** Optional counter badge */
  badge?: string | number
  /** Optional section header displayed above this item */
  section?: string
}

interface Props {
  items: NavItem[]
  collapsed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  collapsed: false,
})

defineEmits<{ 'update:collapsed': [value: boolean] }>()

const route = useRoute()

const sidebarClass = computed(() =>
  cn(
    'flex h-full flex-col border-r border-border bg-sidebar transition-all duration-200',
    props.collapsed ? 'w-16' : 'w-60',
  ),
)

function navItemClass(item: NavItem) {
  const isActive =
    typeof item.to === 'string'
      ? route.path === item.to || route.path.startsWith(item.to + '/')
      : route.name === (item.to as { name?: string }).name

  return cn(
    'flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium transition-colors',
    props.collapsed ? 'justify-center px-0 w-10 mx-auto' : '',
    isActive
      ? 'bg-sidebar-primary text-sidebar-primary-foreground'
      : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
  )
}
</script>
