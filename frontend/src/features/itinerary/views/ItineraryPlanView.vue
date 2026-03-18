<template lang="pug">
.flex.min-h-screen.bg-background
  AppSidenav(collapseMode="icons")

  .flex-1.flex.flex-col
    .border-b.border-border.bg-card.px-6.py-4(class="lg:px-8")
      .flex.items-center.justify-between
        .flex.items-center.gap-3
          RouterLink(to="/app/itineraries")
            AppButton(variant="ghost" size="icon-sm")
              ArrowLeft.h-4.w-4
          div
            h1.text-2xl.font-bold {{ store.currentItinerary?.title ?? 'Carregando...' }}
            p.text-base.text-muted-foreground(v-if="store.currentItinerary") {{ store.totalDays }} dias de viagem
        AppButton(v-if="store.currentItinerary" variant="outline" size="sm" @click="showSettings = !showSettings")
          Settings.mr-2.h-4.w-4
          | Editar configurações

    .flex-1.p-6(class="lg:p-8")
      AppSpinner.mx-auto(v-if="store.isLoading" size="lg")
      p.text-center.text-destructive(v-else-if="store.error") {{ store.error }}

      template(v-else-if="store.currentItinerary")
        AppTabs(:tabs="planTabs" v-model="activeTab")
          template(#tab-map)
            .py-4
              MapPanel(:destinations="store.currentItinerary.destinations")
          template(#tab-days)
            .py-4
              DayPlanner(
                :dayPlans="store.dayPlans"
                :totalDays="store.totalDays"
                @addEntry="handleAddEntry"
                @removeEntry="handleRemoveEntry"
              )
          template(#tab-timeline)
            .py-4
              TimelinePanel(:dayPlans="store.dayPlans")
          template(#tab-costs)
            .py-4
              CostInsightsPanel(
                v-if="store.costSummary"
                :costSummary="store.costSummary"
                :budget="store.budgetData"
              )
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import AppSidenav from '@/components/layout/AppSidenav.vue'
import AppButton from '@/components/app/AppButton.vue'
import AppSpinner from '@/components/app/AppSpinner.vue'
import AppTabs from '@/components/app/AppTabs.vue'
import MapPanel from '@/features/itinerary/components/MapPanel.vue'
import DayPlanner from '@/features/itinerary/components/DayPlanner.vue'
import TimelinePanel from '@/features/itinerary/components/TimelinePanel.vue'
import CostInsightsPanel from '@/features/itinerary/components/CostInsightsPanel.vue'
import { ArrowLeft, Settings } from 'lucide-vue-next'
import { useItineraryStore } from '@/features/itinerary/stores/itinerary'

const route = useRoute()
const store = useItineraryStore()
const activeTab = ref('map')
const showSettings = ref(false)

const planTabs = [
  { key: 'map', label: 'Mapa' },
  { key: 'days', label: 'Dia a dia' },
  { key: 'timeline', label: 'Linha do tempo' },
  { key: 'costs', label: 'Custos' },
]

async function handleAddEntry(dayNumber: number) {
  const id = route.params.id as string
  await store.addDayEntry(id, dayNumber, {
    hourStart: '09:00',
    hourEnd: '10:00',
    locationName: 'Nova atividade',
    cost: 0,
    classification: 'other',
    photos: [],
    notes: '',
  })
}

async function handleRemoveEntry(dayNumber: number, entryId: string) {
  const id = route.params.id as string
  await store.removeDayEntry(id, dayNumber, entryId)
}

onMounted(async () => {
  const id = route.params.id as string
  await store.fetchItinerary(id)
  await store.fetchDayPlans(id)
  await store.fetchCostSummary(id)
})
</script>
