<template lang="pug">
.space-y-4
  .flex.items-center.justify-between
    DaySelector(v-model="currentDay" :totalDays="totalDays")
    AppButton(size="sm" @click="$emit('addEntry', currentDay)")
      Plus.mr-1.h-4.w-4
      | Adicionar atividade

  .space-y-2(v-if="currentEntries.length")
    HourBlock(
      v-for="entry in currentEntries"
      :key="entry.id"
      :entry="entry"
      @remove="$emit('removeEntry', currentDay, entry.id)"
    )

  .text-center.py-8.text-muted-foreground(v-else)
    p Nenhuma atividade para este dia.
    p.text-sm.mt-1 Clique em "Adicionar atividade" para começar.
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import AppButton from '@/components/app/AppButton.vue'
import DaySelector from '@/features/itinerary/components/DaySelector.vue'
import HourBlock from '@/features/itinerary/components/HourBlock.vue'
import { Plus } from 'lucide-vue-next'
import type { DayPlan } from '@/features/itinerary/types'

interface Props {
  dayPlans: DayPlan[]
  totalDays: number
}

const props = defineProps<Props>()
defineEmits<{
  addEntry: [dayNumber: number]
  removeEntry: [dayNumber: number, entryId: string]
}>()

const currentDay = ref(1)

const currentEntries = computed(() => {
  const plan = props.dayPlans.find((d) => d.dayNumber === currentDay.value)
  return plan?.entries ?? []
})
</script>
