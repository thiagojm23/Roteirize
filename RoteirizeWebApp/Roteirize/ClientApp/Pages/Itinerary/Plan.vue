<template lang="pug">
.flex.min-h-screen.bg-background
  AppSidenav(collapseMode="icons")

  .flex-1.flex.flex-col
    .border-b.border-border.bg-card.px-6.py-4(class="lg:px-8")
      .flex.items-center.justify-between
        .flex.items-center.gap-3
          Link(href="/app/itineraries")
            AppButton(variant="ghost" size="icon-sm")
              ArrowLeft.h-4.w-4
          div
            h1.text-2xl.font-bold {{ itinerary.title }}
            p.text-base.text-muted-foreground {{ totalDays }} dias de viagem
        AppButton(variant="outline" size="sm" @click="showSettings = !showSettings")
          Settings.mr-2.h-4.w-4
          | Editar configurações

    .flex-1.p-6(class="lg:p-8")
      AppTabs(:tabs="planTabs" v-model="activeTab")
        template(#tab-map)
          .py-4
            MapPanel(:destinations="itinerary.destinations")
        template(#tab-days)
          .py-4
            DayPlanner(
              :dayPlans="dayPlans"
              :totalDays="totalDays"
              @addEntry="handleAddEntry"
              @removeEntry="handleRemoveEntry"
            )
        template(#tab-timeline)
          .py-4
            TimelinePanel(:dayPlans="dayPlans")
        template(#tab-costs)
          .py-4
            CostInsightsPanel(
              v-if="costSummary"
              :costSummary="costSummary"
              :budget="budget"
            )
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Link, router } from '@inertiajs/vue3'
import AppSidenav from '@/Components/Layout/AppSidenav.vue'
import AppButton from '@/Components/App/AppButton.vue'
import AppTabs from '@/Components/App/AppTabs.vue'
import MapPanel from '@/Components/Itinerary/MapPanel.vue'
import DayPlanner from '@/Components/Itinerary/DayPlanner.vue'
import TimelinePanel from '@/Components/Itinerary/TimelinePanel.vue'
import CostInsightsPanel from '@/Components/Itinerary/CostInsightsPanel.vue'
import { ArrowLeft, Settings } from 'lucide-vue-next'
import type { Itinerary, DayPlan, CostSummary, Budget } from '@/Types/itinerary'

const props = defineProps<{
  itinerary: Itinerary
  dayPlans: DayPlan[]
  costSummary: CostSummary | null
  budget: Budget
}>()

const activeTab = ref('map')
const showSettings = ref(false)

const planTabs = [
  { key: 'map', label: 'Mapa' },
  { key: 'days', label: 'Dia a dia' },
  { key: 'timeline', label: 'Linha do tempo' },
  { key: 'costs', label: 'Custos' },
]

const totalDays = computed(() => {
  if (!props.itinerary.startDate || !props.itinerary.endDate) return 0
  const start = new Date(props.itinerary.startDate)
  const end = new Date(props.itinerary.endDate)
  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
})

function handleAddEntry(dayNumber: number) {
  router.post(`/app/itineraries/${props.itinerary.id}/days/${dayNumber}/entries`, {
    hourStart: '09:00',
    hourEnd: '10:00',
    locationName: 'Nova atividade',
    cost: 0,
    classification: 'other',
    photos: [],
    notes: '',
  }, { preserveScroll: true })
}

function handleRemoveEntry(dayNumber: number, entryId: string) {
  router.delete(`/app/itineraries/${props.itinerary.id}/days/${dayNumber}/entries/${entryId}`, {
    preserveScroll: true,
  })
}
</script>
