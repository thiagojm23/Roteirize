<template lang="pug">
div.flex.items-center.gap-3(:class="props.class")
  button(
    role="switch"
    type="button"
    :aria-checked="model"
    :data-state="model ? 'checked' : 'unchecked'"
    :disabled="disabled"
    :class="cn('peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50', model ? 'bg-primary' : 'bg-input', switchSizeClasses[size])"
    @click="toggle"
  )
    span(
      :data-state="model ? 'checked' : 'unchecked'"
      :class="cn('pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform', thumbSizeClasses[size], model ? thumbCheckedClasses[size] : 'translate-x-0')"
    )
  div.flex.flex-col(class="gap-0.5" v-if="label || description")
    label.text-base.font-medium.leading-none.select-none(v-if="label") {{ label }}
    p.text-sm.text-muted-foreground(v-if="description") {{ description }}
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'

interface Props {
  label?: string
  description?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  class?: string
}

const model = defineModel<boolean>({ default: false })

const props = withDefaults(defineProps<Props>(), {
  label: '',
  description: '',
  disabled: false,
  size: 'md',
  class: undefined,
})

function toggle() {
  if (!props.disabled) {
    model.value = !model.value
  }
}

const switchSizeClasses: Record<string, string> = {
  sm: 'h-4 w-7',
  md: 'h-5 w-9',
  lg: 'h-6 w-11',
}

const thumbSizeClasses: Record<string, string> = {
  sm: 'size-3',
  md: 'size-4',
  lg: 'size-5',
}

const thumbCheckedClasses: Record<string, string> = {
  sm: 'translate-x-3',
  md: 'translate-x-4',
  lg: 'translate-x-5',
}
</script>
