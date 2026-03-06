<template lang="pug">
Separator(:orientation="orientation" :class="cn(decorativeClass, props.class)")
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

interface Props {
  orientation?: 'horizontal' | 'vertical'
  /** If true renders as visual-only (aria-hidden) */
  decorative?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  orientation: 'horizontal',
  decorative: true,
})

// Vertical separators need an explicit height to be visible
const decorativeClass = props.orientation === 'vertical' ? 'h-full' : ''
</script>
