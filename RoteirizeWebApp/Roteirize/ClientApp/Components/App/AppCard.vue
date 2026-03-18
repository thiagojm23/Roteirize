<template lang="pug">
div(data-slot="card" :class="cn('bg-card text-card-foreground flex flex-col gap-6 rounded-xl border shadow-sm', sizeClasses[size], props.class)")
  div.px-6(v-if="$slots.header")
    slot(name="header")
  div.px-6(v-else-if="title || description")
    h3.font-semibold.leading-none(v-if="title") {{ title }}
    p.text-base.text-muted-foreground.mt-1(v-if="description") {{ description }}
  .px-6(v-if="$slots.default")
    slot
  .px-6(v-if="$slots.footer")
    slot(name="footer")
</template>

<script setup lang="ts">
import { cn } from '@/Utils/utils'

interface Props {
  title?: string
  description?: string
  size?: 'sm' | 'md' | 'lg'
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  description: '',
  size: 'md',
  class: undefined,
})

const sizeClasses: Record<string, string> = {
  sm: 'py-4',
  md: 'py-6',
  lg: 'py-8',
}
</script>
