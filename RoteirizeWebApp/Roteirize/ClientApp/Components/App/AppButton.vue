<template lang="pug">
button(
  :type="type"
  :disabled="disabled || loading"
  :class="cn(buttonVariants({ variant, size }), { 'opacity-70 cursor-not-allowed': loading }, props.class)"
  @click="$emit('click', $event)"
)
  AppSpinner.mr-2(v-if="loading" size="sm")
  slot
</template>

<script setup lang="ts">
import { cn } from '@/Utils/utils'
import { buttonVariants } from './buttonVariants'
import AppSpinner from './AppSpinner.vue'

interface Props {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'sm' | 'default' | 'lg' | 'xl' | 'icon' | 'icon-sm' | 'icon-lg'
  loading?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default',
  loading: false,
  disabled: false,
  type: 'button',
  class: undefined,
})

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>
