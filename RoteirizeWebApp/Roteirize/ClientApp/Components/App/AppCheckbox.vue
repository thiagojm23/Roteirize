<template lang="pug">
div.flex.items-start.gap-2(:class="props.class")
  CheckboxRoot(
    :id="checkboxId"
    v-model="model"
    :disabled="disabled"
    :class="cn('peer border-input data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50', sizeClasses[size])"
    @update:checked="handleChange"
  )
    CheckboxIndicator.grid.text-current(class="place-content-center" style="transition: none")
      Check(:class="checkIconClasses[size]")
  div.flex.flex-col(v-if="label || $slots.default")
    label.cursor-pointer.font-normal.select-none(:for="checkboxId" :class="labelSizeClasses[size]")
      slot {{ label }}
    p.text-sm.text-muted-foreground(v-if="hint") {{ hint }}
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { CheckboxRoot, CheckboxIndicator } from 'reka-ui'
import { Check } from 'lucide-vue-next'
import { cn } from '@/Utils/utils'

interface Props {
  label?: string
  hint?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  id?: string
  class?: string
}

const model = defineModel<boolean>({ default: false })

const props = withDefaults(defineProps<Props>(), {
  label: '',
  hint: '',
  disabled: false,
  size: 'md',
  id: '',
  class: undefined,
})

const checkboxId = computed(() => props.id || `checkbox-${Math.random().toString(36).slice(2, 9)}`)

const sizeClasses: Record<string, string> = {
  sm: 'size-3',
  md: 'size-4',
  lg: 'size-5',
  xl: 'size-6',
}

const checkIconClasses: Record<string, string> = {
  sm: 'size-2.5',
  md: 'size-3.5',
  lg: 'size-4',
  xl: 'size-5',
}

const labelSizeClasses: Record<string, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
}

function handleChange(val: boolean | 'indeterminate') {
  model.value = val === true
}
</script>
