<template lang="pug">
//- Flexible card/article — highly customizable via props, further tweakable with class
div(:class="cardClass")
  slot
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  /**
   * Visual style variant:
   * - default: white bg, subtle border, small shadow
   * - bordered: only border, no shadow
   * - elevated: shadow without border
   * - ghost: transparent bg, no border/shadow
   * - muted: muted bg
   */
  variant?: 'default' | 'bordered' | 'elevated' | 'ghost' | 'muted'
  /** Inner padding size */
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  /** Text alignment inside the card */
  textAlign?: 'left' | 'center' | 'right'
  /** Border radius override */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  /** Full width */
  fullWidth?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  padding: 'md',
  textAlign: 'left',
  rounded: 'lg',
  fullWidth: false,
})

const variantMap: Record<NonNullable<Props['variant']>, string> = {
  default: 'bg-card text-card-foreground border border-border shadow-xs',
  bordered: 'bg-card text-card-foreground border border-border',
  elevated: 'bg-card text-card-foreground shadow-md',
  ghost: 'bg-transparent text-foreground',
  muted: 'bg-muted text-muted-foreground',
}

const paddingMap: Record<NonNullable<Props['padding']>, string> = {
  none: 'p-0',
  xs: 'p-2',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-6',
  xl: 'p-8',
}

const textAlignMap: Record<NonNullable<Props['textAlign']>, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

const roundedMap: Record<NonNullable<Props['rounded']>, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
}

const cardClass = computed(() =>
  cn(
    variantMap[props.variant],
    paddingMap[props.padding],
    textAlignMap[props.textAlign],
    roundedMap[props.rounded],
    props.fullWidth ? 'w-full' : '',
    props.class,
  ),
)
</script>
