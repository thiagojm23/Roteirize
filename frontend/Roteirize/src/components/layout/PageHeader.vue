<template lang="pug">
div(class="mb-6 space-y-1")
  //- Breadcrumbs
  nav(v-if="breadcrumbs?.length" aria-label="Breadcrumb" class="flex items-center gap-1 text-sm text-muted-foreground")
    template(v-for="(crumb, i) in breadcrumbs" :key="crumb.label")
      RouterLink(
        v-if="crumb.to && i < breadcrumbs.length - 1"
        :to="crumb.to"
        class="transition-colors hover:text-foreground"
      ) {{ crumb.label }}
      span(v-else) {{ crumb.label }}
      ChevronRight(
        v-if="i < breadcrumbs.length - 1"
        class="size-3.5"
      )

  //- Title + actions row
  div(class="flex flex-wrap items-start justify-between gap-3")
    div
      h1(class="text-2xl font-semibold tracking-tight text-foreground") {{ title }}
      p(v-if="subtitle" class="mt-1 text-sm text-muted-foreground") {{ subtitle }}
    //- Slot for action buttons
    div(v-if="$slots.actions" class="flex shrink-0 items-center gap-2")
      slot(name="actions")
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ChevronRight } from 'lucide-vue-next'

interface Breadcrumb {
  label: string
  to?: string | object
}

interface Props {
  title: string
  subtitle?: string
  breadcrumbs?: Breadcrumb[]
}

defineProps<Props>()
</script>
