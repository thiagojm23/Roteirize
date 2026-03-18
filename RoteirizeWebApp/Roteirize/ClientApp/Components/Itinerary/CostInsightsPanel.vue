<template lang="pug">
.space-y-6
  //- Summary cards
  .grid.gap-4(class="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4")
    AppCard(size="sm")
      p.text-sm.text-muted-foreground Total gasto
      p.text-2xl.font-bold R$ {{ costSummary.totalSpent.toFixed(2) }}
    AppCard(size="sm")
      p.text-sm.text-muted-foreground Orçamento restante
      p.text-2xl.font-bold(:class="costSummary.budgetRemaining < 0 ? 'text-destructive' : ''") R$ {{ costSummary.budgetRemaining.toFixed(2) }}
    AppCard(size="sm")
      p.text-sm.text-muted-foreground Média por dia
      p.text-2xl.font-bold R$ {{ costSummary.perDayAverage.toFixed(2) }}
    AppCard(size="sm")
      p.text-sm.text-muted-foreground Progresso do orçamento
      p.text-2xl.font-bold {{ budgetPercent }}%

  //- Budget progress bar
  .space-y-2
    h3.font-semibold Progresso do orçamento
    CostBar(
      label="Gasto"
      :value="costSummary.totalSpent"
      :max="budget.totalBudget"
      :color="budgetPercent > 90 ? 'destructive' : budgetPercent > 70 ? 'warning' : 'primary'"
    )

  //- Category breakdown
  .space-y-3
    h3.font-semibold Gastos por categoria
    CostBar(
      v-for="cat in categoryBars"
      :key="cat.key"
      :label="cat.label"
      :value="cat.value"
      :max="maxCategoryValue"
    )
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AppCard from '@/Components/App/AppCard.vue'
import CostBar from '@/Components/Itinerary/CostBar.vue'
import type { CostSummary, Budget, ActivityClassification } from '@/Types/itinerary'

interface Props {
  costSummary: CostSummary
  budget: Budget
}

const props = defineProps<Props>()

const budgetPercent = computed(() => {
  if (!props.budget.totalBudget) return 0
  return Math.round((props.costSummary.totalSpent / props.budget.totalBudget) * 100)
})

const categoryBars = computed(() =>
  Object.entries(props.costSummary.byCategory)
    .filter(([, v]) => v > 0)
    .map(([key, value]) => ({
      key,
      label: categoryLabel(key),
      value,
    })),
)

const maxCategoryValue = computed(() =>
  Math.max(...Object.values(props.costSummary.byCategory), 1),
)

const categoryLabels: Record<ActivityClassification, string> = {
  food: 'Alimentação',
  tour: 'Passeios',
  museum: 'Museus',
  transport: 'Transporte',
  hotel: 'Hospedagem',
  shopping: 'Compras',
  entertainment: 'Entretenimento',
  other: 'Outros',
}

function categoryLabel(key: string): string {
  return categoryLabels[key as ActivityClassification] ?? key
}
</script>
