<template lang="pug">
.flex.items-center.gap-2
  AppButton(
    variant="outline"
    size="sm"
    :disabled="selectedDay <= 1"
    @click="$emit('update:modelValue', selectedDay - 1)"
  )
    ChevronLeft.h-4.w-4
  .relative(ref="selectorRef")
    AppButton(
      variant="outline"
      size="sm"
      @click="showGrid = !showGrid"
    ) Dia {{ selectedDay }} de {{ totalDays }}
    .absolute.top-full.mt-1.z-50.bg-card.border.border-border.rounded-lg.shadow-lg.p-2(
      v-if="showGrid"
      class="min-w-[200px]"
    )
      .grid.gap-1(class="grid-cols-7")
        button.rounded.text-sm.px-2.py-1.transition-colors(
          v-for="d in totalDays"
          :key="d"
          :class="d === selectedDay ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'"
          @click="selectDay(d)"
        ) {{ d }}
  AppButton(
    variant="outline"
    size="sm"
    :disabled="selectedDay >= totalDays"
    @click="$emit('update:modelValue', selectedDay + 1)"
  )
    ChevronRight.h-4.w-4
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppButton from '@/Components/App/AppButton.vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

interface Props {
  modelValue: number
  totalDays: number
}

const props = defineProps<Props>()
const emit = defineEmits<{ 'update:modelValue': [value: number] }>()

const selectedDay = ref(props.modelValue)
const showGrid = ref(false)

function selectDay(d: number) {
  selectedDay.value = d
  emit('update:modelValue', d)
  showGrid.value = false
}
</script>
