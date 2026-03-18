<template lang="pug">
div.flex.items-center.gap-2(:class="props.class")
  template(v-for="(step, idx) in steps" :key="idx")
    .flex.items-center.gap-2(
      :data-step="stepState(idx)"
    )
      .flex.items-center.justify-center.rounded-full.text-sm.font-semibold.shrink-0.transition-colors(
        :class="stepCircleClasses(idx)"
        class="size-8"
      )
        Check.size-4(v-if="idx + 1 < currentStep")
        span(v-else) {{ idx + 1 }}
      span.text-sm.font-medium.whitespace-nowrap(:class="stepLabelClasses(idx)") {{ step.label }}
    .h-px.flex-1.bg-border(v-if="idx < steps.length - 1" :class="idx + 1 < currentStep ? 'bg-primary' : ''")
</template>

<script setup lang="ts">
import { Check } from 'lucide-vue-next'

interface StepItem {
  label: string
}

interface Props {
  steps: StepItem[]
  currentStep: number
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  class: undefined,
})

function stepState(idx: number): string {
  if (idx + 1 < props.currentStep) return 'completed'
  if (idx + 1 === props.currentStep) return 'active'
  return 'pending'
}

function stepCircleClasses(idx: number): string {
  const state = stepState(idx)
  if (state === 'completed') return 'bg-primary text-primary-foreground'
  if (state === 'active') return 'bg-primary text-primary-foreground'
  return 'bg-muted text-muted-foreground'
}

function stepLabelClasses(idx: number): string {
  const state = stepState(idx)
  if (state === 'pending') return 'text-muted-foreground'
  return 'text-foreground'
}
</script>
