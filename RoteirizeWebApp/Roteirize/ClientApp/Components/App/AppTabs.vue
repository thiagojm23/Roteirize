<template lang="pug">
div(:class="props.class")
  .flex.border-b.border-border
    button(
      v-for="tab in tabs"
      :key="tab.key"
      role="tab"
      :aria-selected="modelValue === tab.key"
      :class="['px-4 py-2 text-base font-medium transition-colors border-b-2 -mb-px', modelValue === tab.key ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground']"
      @click="$emit('update:modelValue', tab.key)"
    ) {{ tab.label }}
  .pt-4
    template(v-for="tab in tabs" :key="tab.key")
      div(v-if="modelValue === tab.key")
        slot(:name="`tab-${tab.key}`")
</template>

<script setup lang="ts">
interface TabItem {
  key: string
  label: string
}

interface Props {
  tabs: TabItem[]
  modelValue: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  class: undefined,
})

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>
