<template lang="pug">
DialogRoot(:open="open" @update:open="open = $event")
  DialogPortal
    DialogOverlay(
      data-slot="dialog-overlay"
      class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80"
    )
    DialogContent(
      data-slot="dialog-content"
      :class="cn('bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg', sizeClasses[size], props.class)"
    )
      div(v-if="title || description")
        DialogTitle(v-if="title" data-slot="dialog-title") {{ title }}
        DialogDescription(v-if="description" data-slot="dialog-description") {{ description }}
      .py-4
        slot
      div(v-if="$slots.footer")
        slot(name="footer")
      DialogClose(
        data-slot="dialog-close"
        class="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
      )
        X
        span.sr-only Close
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next'
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogDescription,
} from 'reka-ui'
import { cn } from '@/Utils/utils'

interface Props {
  title?: string
  description?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  class?: string
}

const open = defineModel<boolean>('open', { default: false })

const props = withDefaults(defineProps<Props>(), {
  title: '',
  description: '',
  size: 'md',
  class: undefined,
})

const sizeClasses: Record<string, string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-[95vw]',
}
</script>
