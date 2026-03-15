<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useThemeStore } from '@/stores/theme'
import { Compass, Sun, Moon } from 'lucide-vue-next'
import { Card, CardContent } from '@/components/ui/card'

const theme = useThemeStore()
</script>

<template lang="pug">
.min-h-screen.flex.flex-col.bg-background
  .flex.items-center.justify-between.p-4
    RouterLink.flex.items-center.gap-2.font-bold.text-lg.text-primary(to="/")
      Compass.h-5.w-5
      | Roteirize
    button.rounded-md.p-2.text-muted-foreground.transition-colors(class="hover:text-foreground"
      @click="theme.toggle()"
    )
      Sun.h-5.w-5(v-if="theme.isDark")
      Moon.h-5.w-5(v-else)

  .flex-1.flex.items-center.justify-center.px-4.pb-12
    Card.w-full.max-w-md
      CardContent.pt-6
        slot
</template>
