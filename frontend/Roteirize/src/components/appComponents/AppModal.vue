<template lang="pug">
dialog.modal(
  :id="dialogId"
  :class="{ 'active': open, 'small': maxWidth === 'sm', 'large': maxWidth === 'lg', 'max': maxWidth === 'xl' }"
)
  h5(v-if="title") {{ title }}
  p(v-if="description") {{ description }}
  slot
  nav.right-align(v-if="$slots.footer")
    slot(name="footer")
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'

interface Props {
  open: boolean
  title?: string
  description?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<Props>(), {
  maxWidth: 'md',
})

const emit = defineEmits<{ 'update:open': [value: boolean] }>()

const dialogId = computed(() => `modal-${Math.random().toString(36).slice(2, 8)}`)

watch(() => props.open, (val) => {
  if (!val) {
    emit('update:open', false)
  }
})

const close = () => {
  emit('update:open', false)
}

defineExpose({ close })
</script>
