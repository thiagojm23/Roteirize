<template lang="pug">
div(class="space-y-1.5" :class="props.class")
  label.font-medium.select-none(v-if="label" :class="labelSizeClasses[size]")
    | {{ label }}
    span.text-destructive(v-if="required" class="ml-0.5") *
  SelectRoot(:model-value="model" :disabled="disabled" @update:model-value="handleChange")
    SelectTrigger(
      :class="cn(triggerBaseClasses, triggerSizeClasses[size], { 'border-destructive focus-visible:ring-destructive': displayError })"
    )
      SelectValue(:placeholder="placeholder")
      ChevronDown.size-4.opacity-50
    SelectPortal
      SelectContent(
        position="popper"
        :side-offset="4"
        class="bg-popover text-popover-foreground z-50 max-h-60 min-w-[8rem] overflow-hidden rounded-md border shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
      )
        SelectViewport(class="p-1 h-[var(--reka-select-trigger-height)] w-full min-w-[var(--reka-select-trigger-width)]")
          SelectItem(
            v-for="opt in options"
            :key="opt.value"
            :value="opt.value"
            :disabled="opt.disabled"
            class="relative flex w-full cursor-default items-center rounded-sm py-1.5 pr-8 pl-2 text-base outline-none select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
          )
            SelectItemIndicator.absolute.right-2.flex.items-center.justify-center
              Check.size-4
            SelectItemText {{ opt.label }}
  p.text-destructive.text-sm(v-if="displayError") {{ displayError }}
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectPortal,
  SelectContent,
  SelectViewport,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
} from 'reka-ui'
import { Check, ChevronDown } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import type { ValidatorFn } from '@/lib/validation'

interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

interface Props {
  label?: string
  placeholder?: string
  options: SelectOption[]
  disabled?: boolean
  required?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  error?: string
  rules?: ValidatorFn[]
  class?: string
}

const model = defineModel<string>({ default: '' })

const props = withDefaults(defineProps<Props>(), {
  label: '',
  placeholder: 'Selecione...',
  disabled: false,
  required: false,
  size: 'md',
  error: '',
  rules: () => [],
  class: undefined,
})

const internalError = ref('')
const touched = ref(false)

const displayError = computed(() => props.error || internalError.value)

const triggerBaseClasses = 'flex w-full items-center justify-between rounded-md border border-input bg-transparent px-3 shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 text-base placeholder:text-muted-foreground'

const triggerSizeClasses: Record<string, string> = {
  sm: 'h-8 text-sm',
  md: 'h-9',
  lg: 'h-11 text-lg',
  xl: 'h-12 text-xl',
}

const labelSizeClasses: Record<string, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
}

function handleChange(val: string) {
  model.value = val
  if (touched.value) validate()
}

function validate(): boolean {
  internalError.value = ''
  touched.value = true
  for (const rule of props.rules) {
    const result = rule(model.value)
    if (result !== true) {
      internalError.value = result
      return false
    }
  }
  return true
}

function reset() {
  internalError.value = ''
  touched.value = false
}

defineExpose({ validate, reset })
</script>
