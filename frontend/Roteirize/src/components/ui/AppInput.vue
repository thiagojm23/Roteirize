<template lang="pug">
div(class="flex flex-col gap-1.5")
  Label(v-if="label" :for="inputId" class="text-sm font-medium")
    | {{ label }}
    span(v-if="required" class="ml-0.5 text-destructive") *
  div(class="relative")
    Input(
      :id="inputId"
      v-model="modelValue"
      :type="inputType"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :autocomplete="autocomplete"
      :aria-invalid="!!error || undefined"
      :class="cn(props.type === 'password' ? 'pr-10' : '', props.inputClass)"
    )
    button(
      v-if="type === 'password'"
      type="button"
      @click="showPassword = !showPassword"
      class="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
      :aria-label="showPassword ? 'Ocultar senha' : 'Mostrar senha'"
    )
      EyeOff(v-if="showPassword" class="size-4")
      Eye(v-else class="size-4")
  p(v-if="error" class="text-xs text-destructive") {{ error }}
  p(v-else-if="hint" class="text-xs text-muted-foreground") {{ hint }}
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { HTMLAttributes } from 'vue'
import { Eye, EyeOff } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface Props {
  id?: string
  label?: string
  type?: 'text' | 'email' | 'password' | 'number'
  placeholder?: string
  error?: string
  hint?: string
  required?: boolean
  disabled?: boolean
  autocomplete?: string
  inputClass?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  required: false,
  disabled: false,
})

const modelValue = defineModel<string>()

const showPassword = ref(false)

const inputId = computed(() => props.id ?? `input-${Math.random().toString(36).slice(2, 8)}`)

const inputType = computed(() => {
  if (props.type === 'password') return showPassword.value ? 'text' : 'password'
  return props.type
})
</script>
