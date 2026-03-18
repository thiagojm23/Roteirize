<template lang="pug">
AppCollapsible(:title="`${entry.hourStart} — ${entry.hourEnd}: ${entry.locationName}`" v-model="isOpen")
  .space-y-3.pt-2
    .grid.gap-3(class="grid-cols-1 md:grid-cols-2")
      AppInput(v-model="entry.locationName" label="Local" placeholder="Nome do local")
      AppInput(v-model.number="costStr" label="Custo (R$)" type="number" placeholder="0,00")

    .grid.gap-3(class="grid-cols-1 md:grid-cols-2")
      AppInput(v-model="entry.hourStart" label="Início" placeholder="09:00")
      AppInput(v-model="entry.hourEnd" label="Fim" placeholder="12:00")

    AppSelect(
      v-model="entry.classification"
      label="Classificação"
      :options="classificationOptions"
    )

    AppTextarea(v-model="entry.notes" label="Observações" placeholder="Notas sobre a atividade..." :rows="2")

    .flex.items-center.justify-between
      .flex.items-center.gap-2
        AppBadge(:variant="classificationVariant" size="sm") {{ classificationLabel }}
        span.text-sm.text-muted-foreground(v-if="entry.cost") R$ {{ entry.cost.toFixed(2) }}
      AppButton(variant="ghost" size="icon-sm" class="text-destructive" @click="$emit('remove')")
        Trash2.h-4.w-4
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import AppCollapsible from '@/Components/App/AppCollapsible.vue'
import AppInput from '@/Components/App/AppInput.vue'
import AppSelect from '@/Components/App/AppSelect.vue'
import AppTextarea from '@/Components/App/AppTextarea.vue'
import AppBadge from '@/Components/App/AppBadge.vue'
import AppButton from '@/Components/App/AppButton.vue'
import { Trash2 } from 'lucide-vue-next'
import type { DayEntry, ActivityClassification } from '@/Types/itinerary'

interface Props {
  entry: DayEntry
}

const props = defineProps<Props>()
defineEmits<{ remove: [] }>()

const isOpen = ref(false)

const costStr = computed({
  get: () => (props.entry.cost ? String(props.entry.cost) : ''),
  set: (v: string) => { props.entry.cost = Number(v) || 0 },
})

const classificationOptions = [
  { label: 'Alimentação', value: 'food' },
  { label: 'Passeio', value: 'tour' },
  { label: 'Museu', value: 'museum' },
  { label: 'Transporte', value: 'transport' },
  { label: 'Hospedagem', value: 'hotel' },
  { label: 'Compras', value: 'shopping' },
  { label: 'Entretenimento', value: 'entertainment' },
  { label: 'Outro', value: 'other' },
]

const classificationLabels: Record<ActivityClassification, string> = {
  food: 'Alimentação',
  tour: 'Passeio',
  museum: 'Museu',
  transport: 'Transporte',
  hotel: 'Hospedagem',
  shopping: 'Compras',
  entertainment: 'Entretenimento',
  other: 'Outro',
}

const classificationLabel = computed(() => classificationLabels[props.entry.classification] ?? props.entry.classification)

const classificationVariant = computed(() => {
  const map: Record<string, 'default' | 'secondary' | 'success' | 'warning' | 'destructive'> = {
    food: 'warning',
    tour: 'success',
    museum: 'secondary',
    transport: 'default',
    hotel: 'destructive',
    shopping: 'warning',
    entertainment: 'success',
    other: 'default',
  }
  return map[props.entry.classification] ?? 'default'
})
</script>
