<template lang="pug">
div
  label.checkbox
    input(
      type="checkbox"
      :id="checkboxId"
      :checked="modelValue"
      :disabled="disabled"
      @change="onCheckChange"
    )
    span {{ label }}
  span.helper.error-text(v-if="displayError") {{ displayError }}
  span.helper(v-else-if="hint") {{ hint }}
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  label?: string
  hint?: string
  error?: string
  required?: boolean
  disabled?: boolean
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  disabled: false,
})

const modelValue = defineModel<boolean>({ default: false })
const internalError = ref('')

const checkboxId = computed(() => props.id ?? `checkbox-${Math.random().toString(36).slice(2, 8)}`)
const displayError = computed(() => internalError.value || props.error || '')

const onCheckChange = (e: Event) => {
  modelValue.value = (e.target as HTMLInputElement).checked
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

defineExpose({ validate })
</script>
