<template lang="pug">
span(:class="cn(badgeVariants({ variant }), sizeClasses[size], props.class)")
  slot
</template>

<script setup lang="ts">
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

interface Props {
  variant?: 'default' | 'secondary' | 'outline' | 'destructive' | 'success' | 'warning'
  size?: 'sm' | 'md' | 'lg'
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  class: undefined,
})

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2 py-0.5 font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
        destructive: 'border-transparent bg-destructive text-white',
        outline: 'text-foreground',
        success: 'border-transparent bg-success text-white',
        warning: 'border-transparent bg-warning text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

const sizeClasses: Record<string, string> = {
  sm: 'text-[10px] px-1.5 py-0',
  md: 'text-xs px-2 py-0.5',
  lg: 'text-sm px-3 py-1',
}
</script>
