<template lang="pug">
div(class="space-y-1.5" :class="props.class")
  label.font-medium.select-none(v-if="label" :for="textareaId" :class="labelSizeClasses[size]")
    | {{ label }}
    span.text-destructive(v-if="required" class="ml-0.5") *
  textarea(
    :id="textareaId"
    v-model="innerValue"
    :placeholder="placeholder"
    :rows="rows"
    :disabled="disabled"
    :class="cn(textareaBaseClasses, textareaSizeClasses[size], { 'border-destructive focus-visible:ring-destructive': displayError })"
    @blur="handleBlur"
  )
  p.text-muted-foreground(v-if="hint && !displayError" :class="hintSizeClasses[size]") {{ hint }}
  p.text-destructive(v-if="displayError" :class="hintSizeClasses[size]") {{ displayError }}
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { cn } from '@/lib/utils'
import type { ValidatorFn } from '@/lib/validation'

interface Props {
  label?: string
  placeholder?: string
  rows?: number
  required?: boolean
  disabled?: boolean
  hint?: string
  error?: string
  rules?: ValidatorFn[]
  size?: 'sm' | 'md' | 'lg' | 'xl'
  class?: string
}

const model = defineModel<string>({ default: '' })

const props = withDefaults(defineProps<Props>(), {
  label: '',
  placeholder: '',
  rows: 3,
  required: false,
  disabled: false,
  hint: '',
  error: '',
  rules: () => [],
  size: 'md',
  class: undefined,
})

const internalError = ref('')
const touched = ref(false)

const displayError = computed(() => props.error || internalError.value)

const textareaId = computed(() => `textarea-${Math.random().toString(36).slice(2, 9)}`)

const textareaBaseClasses = 'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50'

const textareaSizeClasses: Record<string, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
}

const labelSizeClasses: Record<string, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
}

const hintSizeClasses: Record<string, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-base',
}

const innerValue = computed({
  get: () => model.value,
  set: (val: string) => {
    model.value = val
    if (touched.value) validate()
  },
})

function handleBlur() {
  touched.value = true
  validate()
}

function validate(): boolean {
  internalError.value = ''
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

watch(model, () => {
  if (touched.value && internalError.value) validate()
})

defineExpose({ validate, reset })
</script>
