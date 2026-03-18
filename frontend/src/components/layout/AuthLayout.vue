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
    AppCard.w-full.max-w-md(size="md")
      slot
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useThemeStore } from '@/stores/theme'
import { Compass, Sun, Moon } from 'lucide-vue-next'
import AppCard from '@/components/app/AppCard.vue'

const theme = useThemeStore()
</script>
