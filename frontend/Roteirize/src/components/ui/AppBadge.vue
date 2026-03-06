<template lang="pug">
Badge(:variant="variant" :class="props.class")
  slot
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Badge } from '@/components/ui/badge'

interface Props {
  /**
   * Visual variant of the badge.
   * - default: purple background (primary color)
   * - secondary: muted background
   * - destructive: red
   * - outline: border only
   */
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
})
</script>
