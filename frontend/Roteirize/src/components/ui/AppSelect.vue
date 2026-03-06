<template lang="pug">
div(class="flex flex-col gap-1.5")
  Label(v-if="label" :for="selectId" class="text-sm font-medium")
    | {{ label }}
    span(v-if="required" class="ml-0.5 text-destructive") *
  Select(:model-value="modelValue" @update:model-value="modelValue = ($event as string)" :required="required" :disabled="disabled")
    SelectTrigger(:id="selectId" :aria-invalid="!!error || undefined" :class="props.class")
      SelectValue(:placeholder="placeholder ?? 'Selecione...'")
    SelectContent
      SelectGroup
        SelectItem(v-for="opt in options" :key="opt.value" :value="opt.value")
          | {{ opt.label }}
  p(v-if="error" class="text-xs text-destructive") {{ error }}
  p(v-else-if="hint" class="text-xs text-muted-foreground") {{ hint }}
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { HTMLAttributes } from 'vue'
import {
  Select, SelectContent, SelectGroup,
  SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'

export interface SelectOption {
  value: string
  label: string
}

interface Props {
  id?: string
  label?: string
  placeholder?: string
  options: SelectOption[]
  error?: string
  hint?: string
  required?: boolean
  disabled?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  disabled: false,
})

const modelValue = defineModel<string>()

const selectId = computed(
  () => props.id ?? `select-${Math.random().toString(36).slice(2, 8)}`,
)
</script>
