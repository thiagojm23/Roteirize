<template lang="pug">
Button(
  :as="as"
  :type="type"
  :disabled="loading || disabled"
  :variant="shadcnVariant"
  :size="shadcnSize"
  :class="props.class"
)
  span(v-if="loading" class="size-4 animate-spin rounded-full border-2 border-current border-t-transparent shrink-0")
  slot
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { HTMLAttributes, ButtonHTMLAttributes } from 'vue'
import { Button } from '@/components/ui/button'

interface Props {
  /** Visual variant. Maps to shadcn Button variants. */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline' | 'link'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  loading?: boolean
  disabled?: boolean
  type?: ButtonHTMLAttributes['type']
  as?: string
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  loading: false,
  disabled: false,
  type: 'button',
  as: 'button',
})

import type { ButtonVariants } from '@/components/ui/button'

const variantMap: Record<NonNullable<Props['variant']>, NonNullable<ButtonVariants['variant']>> = {
  primary: 'default',
  secondary: 'secondary',
  ghost: 'ghost',
  danger: 'destructive',
  outline: 'outline',
  link: 'link',
}

const sizeMap: Record<NonNullable<Props['size']>, NonNullable<ButtonVariants['size']>> = {
  sm: 'sm',
  md: 'default',
  lg: 'lg',
  icon: 'icon',
}

const shadcnVariant = computed(() => variantMap[props.variant])
const shadcnSize = computed(() => sizeMap[props.size])
</script>
