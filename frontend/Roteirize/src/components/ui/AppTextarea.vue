<template lang="pug">
div(class="flex flex-col gap-1.5")
  Label(v-if="label" :for="textareaId" class="text-sm font-medium")
    | {{ label }}
    span(v-if="required" class="ml-0.5 text-destructive") *
  Textarea(
    :id="textareaId"
    v-model="modelValue"
    :placeholder="placeholder"
    :required="required"
    :disabled="disabled"
    :rows="rows"
    :aria-invalid="!!error || undefined"
    :class="props.class"
  )
  p(v-if="error" class="text-xs text-destructive") {{ error }}
  p(v-else-if="hint" class="text-xs text-muted-foreground") {{ hint }}
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { HTMLAttributes } from 'vue'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface Props {
  id?: string
  label?: string
  placeholder?: string
  error?: string
  hint?: string
  required?: boolean
  disabled?: boolean
  rows?: number
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  disabled: false,
  rows: 4,
})

const modelValue = defineModel<string>()

const textareaId = computed(
  () => props.id ?? `textarea-${Math.random().toString(36).slice(2, 8)}`,
)
</script>
