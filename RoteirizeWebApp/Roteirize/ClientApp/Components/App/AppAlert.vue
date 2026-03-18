<template lang="pug">
div(role="alert" :class="cn(alertVariants({ variant }), props.class)")
  component.size-4.shrink-0(v-if="icon" :is="icon" class="translate-y-0.5")
  div
    h5.font-medium.leading-none.mb-1(v-if="title") {{ title }}
    .text-base(v-if="$slots.default" :class="descriptionClass")
      slot
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue'
import { cva } from 'class-variance-authority'
import { cn } from '@/Utils/utils'

interface Props {
  variant?: 'default' | 'destructive' | 'success' | 'warning'
  title?: string
  icon?: Component
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  title: '',
  icon: undefined,
  class: undefined,
})

const alertVariants = cva(
  'relative w-full rounded-lg border px-4 py-3 text-base grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:text-current',
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground',
        destructive: 'text-destructive bg-card border-destructive/50',
        success: 'text-success bg-success/10 border-success/50',
        warning: 'text-warning bg-warning/10 border-warning/50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

const descriptionClass = computed(() => {
  if (props.variant === 'destructive') return 'text-destructive/90'
  if (props.variant === 'success') return 'text-success/90'
  if (props.variant === 'warning') return 'text-warning/90'
  return ''
})
</script>
