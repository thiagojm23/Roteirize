<template lang="pug">
div(:class="props.class")
  .flex(data-timeline :class="orientation === 'horizontal' ? 'flex-row gap-4' : 'flex-col gap-0'")
    .flex(
      v-for="(item, idx) in items"
      :key="item.id"
      data-timeline-node
      :class="orientation === 'horizontal' ? 'flex-col items-center gap-2' : 'gap-4'"
    )
      //- Node + line (vertical)
      .flex.flex-col.items-center(v-if="orientation !== 'horizontal'")
        .rounded-full.bg-primary.shrink-0(class="size-3")
        .w-px.flex-1.bg-border.min-h-6(v-if="idx < items.length - 1")

      //- Node (horizontal)
      .flex.flex-row.items-center(v-else)
        .rounded-full.bg-primary.shrink-0(class="size-3")
        .h-px.flex-1.bg-border.min-w-8(v-if="idx < items.length - 1")

      //- Content
      .pb-4(:class="orientation === 'horizontal' ? 'text-center' : ''")
        p.text-base.font-medium {{ item.title }}
        p.text-sm.text-muted-foreground(v-if="item.description") {{ item.description }}
</template>

<script setup lang="ts">
interface TimelineItem {
  id: string
  title: string
  description?: string
}

interface Props {
  items: TimelineItem[]
  orientation?: 'vertical' | 'horizontal'
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  orientation: 'vertical',
  class: undefined,
})
</script>
