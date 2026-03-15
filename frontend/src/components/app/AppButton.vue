<template lang="pug">
Button(
  :variant="variant"
  :size="size"
  :type="type"
  :disabled="disabled || loading"
  :class="[$props.class, { 'opacity-70 cursor-not-allowed': loading }]"
  @click="$emit('click', $event)"
)
  AppSpinner.mr-2(v-if="loading" size="sm")
  slot
</template>
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import AppSpinner from './AppSpinner.vue'

interface Props {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  loading?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  class?: string
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default',
  loading: false,
  disabled: false,
  type: 'button',
  class: '',
})

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>
