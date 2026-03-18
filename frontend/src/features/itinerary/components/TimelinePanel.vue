<template lang="pug">
.space-y-4
  .flex.items-center.gap-2
    AppButton(
      v-for="z in zoomLevels"
      :key="z.key"
      :variant="zoom === z.key ? 'default' : 'outline'"
      size="sm"
      @click="zoom = z.key"
    ) {{ z.label }}

  AppTimeline(:items="timelineItems")
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import AppButton from '@/components/app/AppButton.vue'
import AppTimeline from '@/components/app/AppTimeline.vue'
import type { DayPlan } from '@/features/itinerary/types'

interface Props {
  dayPlans: DayPlan[]
}

const props = defineProps<Props>()

const zoom = ref<'hour' | 'day' | 'week'>('day')

const zoomLevels = [
  { key: 'hour' as const, label: 'Hora' },
  { key: 'day' as const, label: 'Dia' },
  { key: 'week' as const, label: 'Semana' },
]

const timelineItems = computed(() => {
  if (zoom.value === 'hour') {
    return props.dayPlans.flatMap((day) =>
      day.entries.map((entry) => ({
        id: entry.id,
        title: `${entry.hourStart} — ${entry.locationName}`,
        description: `Dia ${day.dayNumber} · R$ ${entry.cost.toFixed(2)}`,
      })),
    )
  }

  if (zoom.value === 'day') {
    return props.dayPlans.map((day) => ({
      id: `day-${day.dayNumber}`,
      title: `Dia ${day.dayNumber} — ${day.date}`,
      description: `${day.entries.length} atividade(s) · R$ ${day.entries.reduce((s, e) => s + e.cost, 0).toFixed(2)}`,
    }))
  }

  // week zoom: group by 7-day blocks
  const weeks: { id: string; title: string; description: string }[] = []
  for (let i = 0; i < props.dayPlans.length; i += 7) {
    const weekDays = props.dayPlans.slice(i, i + 7)
    const weekNum = Math.floor(i / 7) + 1
    const totalCost = weekDays.flatMap((d) => d.entries).reduce((s, e) => s + e.cost, 0)
    const totalEntries = weekDays.reduce((s, d) => s + d.entries.length, 0)
    weeks.push({
      id: `week-${weekNum}`,
      title: `Semana ${weekNum}`,
      description: `${weekDays.length} dias · ${totalEntries} atividades · R$ ${totalCost.toFixed(2)}`,
    })
  }
  return weeks
})
</script>
