<template lang="pug">
DialogRoot(:open="model" @update:open="model = $event")
  DialogPortal
    DialogOverlay(
      data-slot="sheet-overlay"
      class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80"
    )
    DialogContent(
      data-slot="sheet-content"
      :class="cn(baseClasses, sideClasses[side], sizeClasses[side]?.[size], props.class)"
    )
      div.px-6.py-4.border-b.border-border(v-if="title || $slots.header")
        slot(name="header")
          DialogTitle.text-lg.font-semibold(v-if="title") {{ title }}
          DialogDescription.sr-only(v-if="!$slots.header") {{ title }}
      .flex-1.overflow-y-auto.p-6
        slot
      DialogClose(
        data-slot="sheet-close"
        class="absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none"
      )
        X.size-4
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
  side?: 'left' | 'right' | 'top' | 'bottom'
  title?: string
  size?: 'sm' | 'md' | 'lg'
  class?: string
}

const model = defineModel<boolean>({ default: false })

const props = withDefaults(defineProps<Props>(), {
  side: 'right',
  title: '',
  size: 'md',
  class: undefined,
})

const baseClasses = 'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-0 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500'

const sideClasses: Record<string, string> = {
  right: 'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full border-l',
  left: 'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full border-r',
  top: 'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b',
  bottom: 'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t',
}

const sizeClasses: Record<string, Record<string, string>> = {
  right: { sm: 'w-64', md: 'w-80 sm:max-w-sm', lg: 'w-96 sm:max-w-md' },
  left: { sm: 'w-64', md: 'w-80 sm:max-w-sm', lg: 'w-96 sm:max-w-md' },
  top: { sm: '', md: '', lg: '' },
  bottom: { sm: '', md: '', lg: '' },
}
</script>
