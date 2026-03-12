<template lang="pug">
div.field.label.border.suffix(
  :class="fieldClass"
)
  select(
    :id="selectId"
    v-model="internalValue"
    :required="required"
    :disabled="disabled"
    @change="onChange"
    @blur="onBlur"
  )
    option(value="" disabled :selected="!internalValue") {{ placeholder || 'Selecione...' }}
    option(v-for="opt in options" :key="opt.value" :value="opt.value") {{ opt.label }}
  label(:for="selectId")
    | {{ label }}
    span.error-text(v-if="required") {{ ' *' }}
  i arrow_drop_down
  span.helper.error-text(v-if="displayError") {{ displayError }}
  span.helper(v-else-if="hint") {{ hint }}
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

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
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  disabled: false,
})

const modelValue = defineModel<string>({ default: '' })
const internalError = ref('')

const selectId = computed(() => props.id ?? `select-${Math.random().toString(36).slice(2, 8)}`)
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

const onChange = () => {
  if (internalError.value) internalError.value = ''
}

const validate = (): boolean => {
  if (props.required && !modelValue.value) {
    internalError.value = 'Campo obrigatório'
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
