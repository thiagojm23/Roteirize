<template lang="pug">
.space-y-6
  h2.text-xl.font-semibold Orçamento

  .grid.gap-4(class="grid-cols-1 md:grid-cols-2")
    AppInput(
      ref="totalBudgetRef"
      v-model="totalBudgetStr"
      label="Orçamento total (R$)"
      type="number"
      placeholder="0,00"
      required
      :rules="[validators.required]"
    )
    AppInput(
      v-model.number="budget.maxPerDay"
      label="Máximo por dia (R$)"
      type="number"
      placeholder="Opcional"
    )

  .grid.gap-4(class="grid-cols-1 md:grid-cols-2")
    AppInput(
      ref="travelersRef"
      v-model="travelersStr"
      label="Número de viajantes"
      type="number"
      placeholder="1"
      required
      :rules="[validators.required]"
    )
    AppInput(
      v-model.number="budget.luggageItems"
      label="Itens de bagagem"
      type="number"
      placeholder="Opcional"
    )

  AppSelect(
    v-model="budget.currency"
    label="Moeda"
    :options="currencyOptions"
    size="md"
  )
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import AppInput from '@/components/app/AppInput.vue'
import AppSelect from '@/components/app/AppSelect.vue'
import { validators } from '@/lib/validation'
import { useItineraryStore } from '@/features/itinerary/stores/itinerary'

const store = useItineraryStore()
const budget = store.budgetData

const totalBudgetStr = computed({
  get: () => (budget.totalBudget ? String(budget.totalBudget) : ''),
  set: (v: string) => { budget.totalBudget = Number(v) || 0 },
})

const travelersStr = computed({
  get: () => (budget.travelers ? String(budget.travelers) : ''),
  set: (v: string) => { budget.travelers = Number(v) || 0 },
})

const totalBudgetRef = ref<InstanceType<typeof AppInput> | null>(null)
const travelersRef = ref<InstanceType<typeof AppInput> | null>(null)

const currencyOptions = [
  { label: 'Real (BRL)', value: 'BRL' },
  { label: 'Dólar (USD)', value: 'USD' },
  { label: 'Euro (EUR)', value: 'EUR' },
  { label: 'Libra (GBP)', value: 'GBP' },
  { label: 'Iene (JPY)', value: 'JPY' },
]

function validate(): boolean {
  const refs = [totalBudgetRef, travelersRef]
  let allValid = true
  for (const r of refs) {
    if (r.value && !r.value.validate()) allValid = false
  }
  return allValid
}

defineExpose({ validate })
</script>
