<template lang="pug">
Dialog(:open="open" @update:open="$emit('update:open', $event)")
  DialogContent(:class="maxWidthClass")
    DialogHeader(v-if="title || description")
      DialogTitle(v-if="title") {{ title }}
      DialogDescription(v-if="description") {{ description }}
    //- Default content slot
    slot
    //- Footer slot (e.g. action buttons)
    DialogFooter(v-if="$slots.footer")
      slot(name="footer")
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface Props {
  open: boolean
  title?: string
  description?: string
  /** Controls the max-width of the dialog content */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

const props = withDefaults(defineProps<Props>(), {
  maxWidth: 'md',
})

defineEmits<{ 'update:open': [value: boolean] }>()

const maxWidthMap: Record<NonNullable<Props['maxWidth']>, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
}

const maxWidthClass = computed(() => maxWidthMap[props.maxWidth])
</script>
