<template lang="pug">
.flex.flex-wrap.gap-2(v-if="photos.length" :class="props.class")
  .relative.rounded-md.overflow-hidden(
    v-for="(photo, idx) in displayPhotos"
    :key="idx"
    class="size-16"
  )
    img.w-full.h-full.object-cover(:src="photo" :alt="`Foto ${idx + 1}`")
  .relative.rounded-md.overflow-hidden.flex.items-center.justify-center.bg-muted.text-muted-foreground.text-sm.font-medium(
    v-if="remaining > 0"
    class="size-16"
  ) +{{ remaining }}
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  photos: string[]
  maxVisible?: number
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  maxVisible: 4,
  class: undefined,
})

const displayPhotos = computed(() => props.photos.slice(0, props.maxVisible))
const remaining = computed(() => Math.max(0, props.photos.length - props.maxVisible))
</script>
