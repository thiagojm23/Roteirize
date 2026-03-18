<template lang="pug">
div.rounded-lg.border.border-border(:class="props.class")
  button.flex.w-full.items-center.justify-between.px-4.py-3.text-left.font-medium.transition-colors(
    data-collapsible-trigger
    class="hover:bg-muted/50"
    @click="$emit('update:modelValue', !modelValue)"
  )
    span {{ title }}
    ChevronDown.h-4.w-4.text-muted-foreground.transition-transform.duration-200(
      :class="modelValue ? 'rotate-180' : ''"
    )
  .px-4.pb-3(v-if="modelValue")
    slot
</template>

<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next'

interface Props {
  title: string
  modelValue?: boolean
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  class: undefined,
})

defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>
