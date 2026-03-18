<template lang="pug">
div(class="space-y-1.5" :class="props.class")
  label.font-medium.select-none(v-if="label" :for="inputId" :class="labelSizeClasses[size]")
    | {{ label }}
    span.text-destructive(v-if="required" class="ml-0.5") *
  .relative.mt-1
    input(
      :id="inputId"
      :type="inputType"
      v-model="innerValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :autocomplete="autocomplete"
      :class="cn(inputBaseClasses, inputSizeClasses[size], { 'border-destructive focus-visible:ring-destructive': displayError, 'pr-10': isPasswordType })"
      @blur="handleBlur"
    )
    button.absolute.right-3.text-muted-foreground(
      class="top-1/2 -translate-y-1/2"
      v-if="isPasswordType"
      type="button"
      tabindex="-1"
      @click="showPassword = !showPassword"
    )
      EyeOff(:class="eyeIconClasses[size]" v-if="showPassword")
      Eye(:class="eyeIconClasses[size]" v-else)
  p.text-muted-foreground(v-if="hint && !displayError" :class="hintSizeClasses[size]") {{ hint }}
  p.text-destructive(v-if="displayError" :class="hintSizeClasses[size]") {{ displayError }}
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Eye, EyeOff } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { masks, type MaskType, type ValidatorFn } from '@/lib/validation'

interface Props {
  label?: string
  placeholder?: string
  type?: 'text' | 'email' | 'password' | 'confirmPassword' | 'number'
  mask?: MaskType
  size?: 'sm' | 'md' | 'lg' | 'xl'
  required?: boolean
  disabled?: boolean
  hint?: string
  error?: string
  rules?: ValidatorFn[]
  id?: string
  autocomplete?: string
  class?: string
}

const model = defineModel<string>({ default: '' })

const props = withDefaults(defineProps<Props>(), {
  label: '',
  placeholder: '',
  type: 'text',
  mask: undefined,
  size: 'md',
  required: false,
  disabled: false,
  hint: '',
  error: '',
  rules: () => [],
  id: '',
  autocomplete: '',
  class: undefined,
})

const showPassword = ref(false)
const internalError = ref('')
const touched = ref(false)

const isPasswordType = computed(() => props.type === 'password' || props.type === 'confirmPassword')

const inputType = computed(() => {
  if (isPasswordType.value) return showPassword.value ? 'text' : 'password'
  if (props.type === 'email') return 'email'
  if (props.type === 'number') return 'number'
  return 'text'
})

const displayError = computed(() => props.error || internalError.value)

const inputId = computed(() => props.id || `input-${Math.random().toString(36).slice(2, 9)}`)

const inputBaseClasses =
  'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'

const inputSizeClasses: Record<string, string> = {
  sm: 'h-8 text-sm px-2.5',
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

const hintSizeClasses: Record<string, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-base',
}

const eyeIconClasses: Record<string, string> = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
  xl: 'h-5 w-5',
}

const innerValue = computed({
  get: () => model.value,
  set: (val: string | number) => {
    let value = String(val)

    if (props.mask && masks[props.mask]) {
      value = masks[props.mask](value)
    }

    model.value = value

    if (touched.value) {
      validate()
    }
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
  if (touched.value && internalError.value) {
    validate()
  }
})

defineExpose({ validate, reset })
</script>
