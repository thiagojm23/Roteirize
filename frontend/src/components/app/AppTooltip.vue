<template lang="pug">
TooltipRoot(:delay-duration="delayDuration")
  TooltipTrigger(as-child)
    slot
  TooltipPortal
    TooltipContent(
      :side="side"
      :side-offset="4"
      :class="cn('bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 z-50 overflow-hidden rounded-md px-3 py-1.5 text-xs', props.class)"
    )
      | {{ content }}
      TooltipArrow(class="fill-primary")
</template>

<script setup lang="ts">
import {
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
  TooltipPortal,
  TooltipArrow,
} from 'reka-ui'
import { cn } from '@/lib/utils'

interface Props {
  content: string
  side?: 'top' | 'right' | 'bottom' | 'left'
  delayDuration?: number
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  side: 'top',
  delayDuration: 200,
  class: undefined,
})
</script>
