<template lang="pug">
Alert(:variant="alertVariant" :class="props.class")
  component(:is="iconComponent" class="size-4")
  AlertTitle(v-if="title") {{ title }}
  AlertDescription(v-if="description") {{ description }}
  AlertDescription(v-else)
    slot
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { HTMLAttributes } from 'vue'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-vue-next'

interface Props {
  /** Semantic variant — maps to icon and color scheme */
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default'
  title?: string
  /** Short text description (alternative to default slot) */
  description?: string
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
})

// shadcn Alert only has 'default' | 'destructive' variants
const alertVariant = computed(() =>
  props.variant === 'error' ? 'destructive' : 'default',
)

const iconMap = {
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
  info: Info,
  default: Info,
}

const iconComponent = computed(() => iconMap[props.variant])
</script>
