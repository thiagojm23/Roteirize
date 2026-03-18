<template lang="pug">
div(
  data-slot="avatar"
  :class="cn('relative flex shrink-0 overflow-hidden rounded-full bg-muted', sizeClasses[size], props.class)"
)
  img.aspect-square.h-full.w-full(
    v-if="src"
    :src="src"
    :alt="alt"
    @error="imgError = true"
  )
  span.flex.h-full.w-full.items-center.justify-center.rounded-full.bg-muted.font-medium.text-muted-foreground(
    v-if="!src || imgError"
    :class="fallbackTextClasses[size]"
  ) {{ fallback }}
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  src?: string
  alt?: string
  fallback?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  src: '',
  alt: '',
  fallback: '',
  size: 'md',
  class: undefined,
})

const imgError = ref(false)

const sizeClasses: Record<string, string> = {
  sm: 'size-8',
  md: 'size-10',
  lg: 'size-12',
  xl: 'size-16',
}

const fallbackTextClasses: Record<string, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-lg',
}
</script>
