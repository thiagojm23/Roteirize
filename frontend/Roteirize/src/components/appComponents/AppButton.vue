<template lang="pug">
button(
  :type="type"
  :disabled="loading || disabled"
  :class="buttonClass"
  @click="$emit('click', $event)"
)
  progress.circle.small(v-if="loading")
  i(v-if="leftIcon && !loading") {{ leftIcon }}
  span
    slot
  i(v-if="rightIcon") {{ rightIcon }}
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ButtonHTMLAttributes } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'outline' | 'transparent'
  size?: 'small' | 'medium' | 'large' | 'extra'
  loading?: boolean
  disabled?: boolean
  type?: ButtonHTMLAttributes['type']
  leftIcon?: string
  rightIcon?: string
  fullWidth?: boolean
  round?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  loading: false,
  disabled: false,
  type: 'button',
  round: false,
})

defineEmits<{ click: [e: MouseEvent] }>()

const buttonClass = computed(() => {
  const classes: string[] = []

  // Variant
  switch (props.variant) {
    case 'secondary': classes.push('secondary'); break
    case 'tertiary': classes.push('tertiary'); break
    case 'error': classes.push('error'); break
    case 'outline': classes.push('border'); break
    case 'transparent': classes.push('transparent'); break
    default: break // primary is default BeerCSS button
  }

  // Size
  if (props.size) classes.push(props.size)

  // Shape
  if (props.round) classes.push('round')

  // Full width
  if (props.fullWidth) classes.push('responsive')

  return classes.join(' ')
})
</script>
