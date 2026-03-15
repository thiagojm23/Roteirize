<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff } from 'lucide-vue-next'
import { masks, type MaskType, type ValidatorFn } from '@/lib/validation'

interface Props {
  modelValue: string
  label?: string
  placeholder?: string
  type?: 'text' | 'email' | 'password' | 'confirmPassword' | 'number'
  mask?: MaskType
  required?: boolean
  disabled?: boolean
  hint?: string
  error?: string
  rules?: ValidatorFn[]
  id?: string
  autocomplete?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  placeholder: '',
  type: 'text',
  mask: undefined,
  required: false,
  disabled: false,
  hint: '',
  error: '',
  rules: () => [],
  id: '',
  autocomplete: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const showPassword = ref(false)
const internalError = ref('')
const touched = ref(false)

const isPasswordType = computed(() => props.type === 'password' || props.type === 'confirmPassword')

const inputType = computed(() => {
  if (isPasswordType.value) {
    return showPassword.value ? 'text' : 'password'
  }
  if (props.type === 'email') return 'email'
  if (props.type === 'number') return 'number'
  return 'text'
})

const displayError = computed(() => props.error || internalError.value)

const inputId = computed(() => props.id || `input-${Math.random().toString(36).slice(2, 9)}`)

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  let value = target.value

  if (props.mask && masks[props.mask]) {
    value = masks[props.mask](value)
    target.value = value
  }

  emit('update:modelValue', value)

  if (touched.value) {
    validate()
  }
}

function handleBlur() {
  touched.value = true
  validate()
}

function validate(): boolean {
  internalError.value = ''

  for (const rule of props.rules) {
    const result = rule(props.modelValue)
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

watch(() => props.modelValue, () => {
  if (touched.value && internalError.value) {
    validate()
  }
})

defineExpose({ validate, reset })
</script>

<template lang="pug">
div(class="space-y-1.5")
  Label.text-sm.font-medium(v-if="label" :for="inputId")
    | {{ label }}
    span.text-destructive(v-if="required" class="ml-0.5") *
  .relative
    Input(
      :id="inputId"
      :type="inputType"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :autocomplete="autocomplete"
      :class="[{ 'border-destructive focus-visible:ring-destructive': displayError, 'pr-10': isPasswordType }]"
      @input="handleInput"
      @blur="handleBlur"
    )
    button.absolute.right-3.text-muted-foreground(class="top-1/2 -translate-y-1/2"
      v-if="isPasswordType"
      type="button"
      tabindex="-1"
      @click="showPassword = !showPassword"
    )
      EyeOff.h-4.w-4(v-if="showPassword")
      Eye.h-4.w-4(v-else)
  p.text-xs.text-muted-foreground(v-if="hint && !displayError") {{ hint }}
  p.text-xs.text-destructive(v-if="displayError") {{ displayError }}
</template>
