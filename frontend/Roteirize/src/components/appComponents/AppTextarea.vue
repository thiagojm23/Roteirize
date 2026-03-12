<template lang="pug">
div.field.label.border(
  :class="fieldClass"
)
  textarea(
    :id="textareaId"
    v-model="internalValue"
    :placeholder="placeholder || ' '"
    :required="required"
    :disabled="disabled"
    :rows="rows"
    :maxlength="maxLength"
    @blur="onBlur"
  )
  label(:for="textareaId")
    | {{ label }}
    span.error-text(v-if="required") {{ ' *' }}
  span.helper.error-text(v-if="displayError") {{ displayError }}
  span.helper(v-else-if="hint || maxLength")
    | {{ hint ? hint + ' ' : '' }}
    span(v-if="maxLength") {{ (modelValue ?? '').length }} / {{ maxLength }}
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  id?: string
  label?: string
  placeholder?: string
  error?: string
  hint?: string
  required?: boolean
  disabled?: boolean
  rows?: number
  maxLength?: number
  minLength?: number
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  disabled: false,
  rows: 4,
})

const modelValue = defineModel<string>({ default: '' })
const internalError = ref('')

const textareaId = computed(() => props.id ?? `textarea-${Math.random().toString(36).slice(2, 8)}`)
const displayError = computed(() => internalError.value || props.error || '')

const fieldClass = computed(() => ({
  'invalid': !!displayError.value,
}))

const internalValue = computed({
  get: () => modelValue.value ?? '',
  set: (val: string) => {
    modelValue.value = val
    if (internalError.value) internalError.value = ''
  },
})

const validate = (): boolean => {
  const val = modelValue.value ?? ''

  if (props.required && !val.trim()) {
    internalError.value = 'Campo obrigatório'
    return false
  }

  if (props.minLength !== undefined && val.length < props.minLength) {
    internalError.value = `Mínimo de ${props.minLength} caracteres`
    return false
  }

  if (props.maxLength !== undefined && val.length > props.maxLength) {
    internalError.value = `Máximo de ${props.maxLength} caracteres`
    return false
  }

  internalError.value = ''
  return true
}

const onBlur = () => {
  if (props.required) validate()
}

defineExpose({ validate })
</script>
