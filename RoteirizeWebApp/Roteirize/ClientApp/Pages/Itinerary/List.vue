<template lang="pug">
.flex.min-h-screen.bg-background
  AppSidenav(collapseMode="icons")

  .flex-1.flex.flex-col
    .border-b.border-border.bg-card.px-6.py-4(class="lg:px-8")
      .flex.items-center.justify-between
        div
          h1.text-2xl.font-bold Meus Roteiros
          p.text-base.text-muted-foreground Gerencie e acompanhe suas viagens
        Link(href="/app/itineraries/new")
          AppButton
            Plus.mr-2.h-4.w-4
            | Nova viagem

    .flex-1.p-6(class="lg:p-8")
      template(v-if="itineraries.length")
        .grid.gap-6(class="grid-cols-1 md:grid-cols-2 lg:grid-cols-3")
          Link(
            v-for="itin in itineraries"
            :key="itin.id"
            :href="`/app/itineraries/${itin.id}`"
            class="block"
          )
            AppCard.transition-shadow(class="hover:shadow-md" :title="itin.title")
              template(#header)
                .px-6
                  .flex.items-center.justify-between.mb-1
                    h3.font-semibold {{ itin.title }}
                    AppBadge(:variant="statusVariant(itin.status)" size="sm") {{ statusLabel(itin.status) }}
                  p.text-sm.text-muted-foreground {{ formatDates(itin.startDate, itin.endDate) }}
              .flex.items-center.gap-4.text-sm.text-muted-foreground
                .flex.items-center.gap-1
                  MapPin.h-4.w-4
                  | {{ itin.destinations.length }} destino(s)
                .flex.items-center.gap-1
                  Calendar.h-4.w-4
                  | {{ dayCount(itin) }} dias

      .flex.flex-col.items-center.justify-center.text-center.py-16(v-else)
        .h-16.w-16.rounded-full.flex.items-center.justify-center.mb-4(class="bg-primary/10")
          MapPin.h-8.w-8.text-primary
        h3.text-lg.font-semibold.mb-2 Nenhum roteiro ainda
        p.text-base.text-muted-foreground.mb-6.max-w-sm Comece criando sua primeira viagem!
        Link(href="/app/itineraries/new")
          AppButton
            Plus.mr-2.h-4.w-4
            | Criar meu primeiro roteiro
</template>

<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import AppSidenav from '@/Components/Layout/AppSidenav.vue'
import AppButton from '@/Components/App/AppButton.vue'
import AppCard from '@/Components/App/AppCard.vue'
import AppBadge from '@/Components/App/AppBadge.vue'
import { MapPin, Plus, Calendar } from 'lucide-vue-next'
import type { Itinerary } from '@/Types/itinerary'

const props = defineProps<{
  itineraries: Itinerary[]
}>()

function statusVariant(status: string) {
  const map: Record<string, 'default' | 'secondary' | 'success' | 'warning'> = {
    draft: 'secondary',
    planning: 'warning',
    ready: 'success',
    completed: 'default',
  }
  return map[status] ?? 'default'
}

function statusLabel(status: string) {
  const map: Record<string, string> = {
    draft: 'Rascunho',
    planning: 'Planejando',
    ready: 'Pronto',
    completed: 'Concluído',
  }
  return map[status] ?? status
}

function formatDates(start: string, end: string) {
  if (!start || !end) return 'Datas não definidas'
  const fmt = (d: string) =>
    new Date(d + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
  return `${fmt(start)} — ${fmt(end)}`
}

function dayCount(itin: Itinerary) {
  if (!itin.startDate || !itin.endDate) return 0
  const start = new Date(itin.startDate)
  const end = new Date(itin.endDate)
  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
}
</script>
