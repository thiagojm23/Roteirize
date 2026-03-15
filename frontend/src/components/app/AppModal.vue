<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'

interface Props {
  open: boolean
  title?: string
  description?: string
}

withDefaults(defineProps<Props>(), {
  title: '',
  description: '',
})

defineEmits<{
  'update:open': [value: boolean]
}>()
</script>

<template lang="pug">
Dialog(:open="open" @update:open="$emit('update:open', $event)")
  DialogContent
    DialogHeader(v-if="title || description")
      DialogTitle(v-if="title") {{ title }}
      DialogDescription(v-if="description") {{ description }}
    .py-4
      slot
    DialogFooter(v-if="$slots.footer")
      slot(name="footer")
</template>
