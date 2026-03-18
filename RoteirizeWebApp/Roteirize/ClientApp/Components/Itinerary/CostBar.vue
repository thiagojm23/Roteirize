<template lang="pug">
.space-y-1
  .flex.items-center.justify-between.text-sm
    span {{ label }}
    span.font-medium R$ {{ value.toFixed(2) }}
  .h-2.rounded-full.bg-muted.overflow-hidden
    .h-full.rounded-full.transition-all.duration-300(
      :class="barColorClass"
      :style="{ width: `${percentage}%` }"
    )
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  label: string
  value: number
  max: number
  color?: 'primary' | 'success' | 'warning' | 'destructive'
}

const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
})

const percentage = computed(() => {
  if (props.max <= 0) return 0
  return Math.min(100, (props.value / props.max) * 100)
})

const barColorClass = computed(() => {
  const map: Record<string, string> = {
    primary: 'bg-primary',
    success: 'bg-success',
    warning: 'bg-warning',
    destructive: 'bg-destructive',
  }
  return map[props.color] ?? 'bg-primary'
})
</script>
