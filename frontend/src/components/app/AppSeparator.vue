<template lang="pug">
Separator(
  data-slot="separator"
  :orientation="orientation"
  :decorative="decorative"
  :class="cn('bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px', props.class)"
)
</template>

<script setup lang="ts">
import { Separator } from 'reka-ui'
import { cn } from '@/lib/utils'

interface Props {
  orientation?: 'horizontal' | 'vertical'
  decorative?: boolean
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  orientation: 'horizontal',
  decorative: true,
  class: undefined,
})
</script>
