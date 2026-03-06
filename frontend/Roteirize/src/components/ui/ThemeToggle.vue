<template lang="pug">
TooltipProvider(:delay-duration="400")
  Tooltip
    TooltipTrigger(as-child)
      button(
        @click="themeStore.toggle()"
        :aria-label="themeStore.isDark ? 'Mudar para modo claro' : 'Mudar para modo escuro'"
        class="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
      )
        Moon(v-if="themeStore.isDark" class="size-4")
        Sun(v-else class="size-4")
    TooltipContent(:side-offset="6")
      | {{ themeStore.isDark ? 'Modo claro' : 'Modo escuro' }}
</template>

<script setup lang="ts">
import { Sun, Moon } from 'lucide-vue-next'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
</script>
