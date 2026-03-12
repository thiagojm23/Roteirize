<template lang="pug">
div.field.label.border(
  :class="fieldClass"
)
  i(v-if="prefixIcon") {{ prefixIcon }}
  input(
    :id="inputId"
    v-model="internalValue"
    :type="inputType"
    :placeholder="placeholder || ' '"
    :required="required"
    :disabled="disabled"
    :autocomplete="autocomplete"
    :maxlength="maxLength"
    @blur="onBlur"
  )
  label(:for="inputId")
    | {{ label }}
    span.error-text(v-if="required") {{ ' *' }}
  i.pointer(
    v-if="showPasswordToggle"
    @click="showPassword = !showPassword"
  ) {{ showPassword ? 'visibility_off' : 'visibility' }}
  i(v-else-if="suffixIcon") {{ suffixIcon }}
  span.helper.error-text(v-if="displayError") {{ displayError }}
  span.helper(v-else-if="hint") {{ hint }}
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  formatCpf,
  formatCnpj,
  formatPhone,
  formatCep,
  validateCpf,
  validateCnpj,
} from '@/shared/utils'

interface Props {
  id?: string
  label?: string
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  mask?: 'cpf' | 'cnpj' | 'phone' | 'cep' | 'number' | 'letters' | 'uppercase' | 'none'
  placeholder?: string
  error?: string
  hint?: string
  required?: boolean
  disabled?: boolean
  autocomplete?: string
  maxLength?: number
  prefixIcon?: string
  suffixIcon?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  required: false,
  disabled: false,
})

const modelValue = defineModel<string>({ default: '' })
const showPassword = ref(false)
const internalError = ref('')

const inputId = computed(() => props.id ?? `input-${Math.random().toString(36).slice(2, 8)}`)
const displayError = computed(() => internalError.value || props.error || '')
const showPasswordToggle = computed(() => props.type === 'password')

const fieldClass = computed(() => ({
  'prefix': !!props.prefixIcon,
  'suffix': showPasswordToggle.value || !!props.suffixIcon,
  'invalid': !!displayError.value,
}))

const inputType = computed(() => {
  if (props.type === 'password') return showPassword.value ? 'text' : 'password'
  return props.type ?? 'text'
})

const applyMask = (val: string): string => {
  switch (props.mask) {
    case 'cpf': return formatCpf(val)
    case 'cnpj': return formatCnpj(val)
    case 'phone': return formatPhone(val)
    case 'cep': return formatCep(val)
    case 'number': return val.replace(/\D/g, '')
    case 'letters': return val.replace(/[^a-zA-ZÀ-ÿ\s]/g, '')
    case 'uppercase': return val.toUpperCase()
    default: return val
  }
}

const internalValue = computed({
  get: () => modelValue.value ?? '',
  set: (val: string) => {
    const processed = applyMask(val)
    modelValue.value = processed
    if (internalError.value) internalError.value = ''
  },
})

const validate = (): boolean => {
  const val = modelValue.value ?? ''

  if (props.required && !val.trim()) {
    internalError.value = 'Campo obrigatório'
    return false
  }

  if (val && props.type === 'email') {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      internalError.value = 'E-mail inválido'
      return false
    }
  }

  if (val && props.mask === 'cpf') {
    if (!validateCpf(val)) {
      internalError.value = 'CPF inválido'
      return false
    }
  }

  if (val && props.mask === 'cnpj') {
    if (!validateCnpj(val)) {
      internalError.value = 'CNPJ inválido'
      return false
    }
  }

  if (val && props.mask === 'phone' && val.length < 14) {
    internalError.value = 'Telefone inválido'
    return false
  }

  if (val && props.mask === 'cep' && val.length < 9) {
    internalError.value = 'CEP inválido'
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
