<template lang="pug">
span(role="status" aria-label="Carregando" :class="spinnerClass")
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  /** Tailwind color class for the spinner (e.g. 'text-primary') */
  color?: string
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'text-primary',
})

const sizeMap: Record<NonNullable<Props['size']>, string> = {
  xs: 'size-3 border',
  sm: 'size-4 border-2',
  md: 'size-6 border-2',
  lg: 'size-8 border-[3px]',
  xl: 'size-12 border-4',
}

const spinnerClass = computed(() =>
  cn(
    'inline-block animate-spin rounded-full border-current border-t-transparent',
    sizeMap[props.size],
    props.color,
    props.class,
  ),
)
</script>
