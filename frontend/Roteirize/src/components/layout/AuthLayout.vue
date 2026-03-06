<template lang="pug">
div(class="flex min-h-screen flex-col bg-background")
  //- Top bar
  header(class="flex h-14 items-center justify-between px-4 sm:px-6")
    RouterLink(
      :to="{ name: 'home' }"
      class="flex items-center gap-2 text-sm font-semibold text-foreground"
    )
      span(class="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground")
        Film(class="size-3.5")
      | Roteirize
    ThemeToggle

  //- Main content — centered card
  main(class="flex flex-1 items-center justify-center px-4 py-12")
    div(class="w-full max-w-md")
      //- Card header
      div(v-if="title || subtitle" class="mb-8 text-center")
        h1(v-if="title" class="text-2xl font-semibold tracking-tight text-foreground") {{ title }}
        p(v-if="subtitle" class="mt-1.5 text-sm text-muted-foreground") {{ subtitle }}

      //- Card body
      div(class="rounded-2xl border border-border bg-card p-8 shadow-xs")
        slot

  //- Footer
  footer(class="py-6 text-center text-xs text-muted-foreground")
    | © {{ new Date().getFullYear() }} Roteirize. Todos os direitos reservados.
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Film } from 'lucide-vue-next'
import ThemeToggle from '@/components/ui/ThemeToggle.vue'

defineProps<{
  title?: string
  subtitle?: string
}>()
</script>
