<template lang="pug">
.space-y-6
  h2.text-xl.font-semibold Configuração da viagem

  .grid.gap-4(class="grid-cols-1 md:grid-cols-2")
    AppInput(
      ref="originRef"
      v-model="setup.origin"
      label="Cidade de origem"
      placeholder="Ex: São Paulo"
      required
      :rules="[validators.required]"
    )
    div

  .grid.gap-4(class="grid-cols-1 md:grid-cols-2")
    AppInput(
      ref="departureDateRef"
      v-model="setup.departureDate"
      label="Data de ida"
      type="text"
      placeholder="AAAA-MM-DD"
      required
      :rules="[validators.required]"
    )
    AppInput(
      ref="arrivalDateRef"
      v-model="setup.arrivalDate"
      label="Data de volta"
      type="text"
      placeholder="AAAA-MM-DD"
      required
      :rules="[validators.required]"
    )

  .space-y-4
    .flex.items-center.justify-between
      h3.text-lg.font-medium Destinos
      AppButton(size="sm" variant="outline" @click="addDestination")
        Plus.mr-1.h-4.w-4
        | Adicionar destino

    .space-y-3(v-if="setup.destinations.length")
      .grid.gap-3.items-end.border.border-border.rounded-lg.p-4(
        v-for="(dest, idx) in setup.destinations"
        :key="idx"
        class="grid-cols-1 md:grid-cols-[1fr_1fr_auto_auto]"
      )
        AppInput(
          v-model="dest.name"
          label="Cidade"
          :placeholder="'Destino ' + (idx + 1)"
          required
        )
        AppInput(
          v-model="dest.country"
          label="País"
          placeholder="País"
          required
        )
        AppInput(
          v-model.number="dest.durationDays"
          label="Dias"
          type="number"
          placeholder="0"
          class="w-24"
        )
        AppButton(
          variant="ghost"
          size="icon-sm"
          class="text-destructive mt-6"
          @click="removeDestination(idx)"
        )
          Trash2.h-4.w-4

    p.text-base.text-muted-foreground.text-center.py-4(v-else) Nenhum destino adicionado ainda.
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppInput from '@/components/app/AppInput.vue'
import AppButton from '@/components/app/AppButton.vue'
import { Plus, Trash2 } from 'lucide-vue-next'
import { validators } from '@/lib/validation'
import { useItineraryStore } from '@/features/itinerary/stores/itinerary'

const store = useItineraryStore()
const setup = store.setupData

const originRef = ref<InstanceType<typeof AppInput> | null>(null)
const departureDateRef = ref<InstanceType<typeof AppInput> | null>(null)
const arrivalDateRef = ref<InstanceType<typeof AppInput> | null>(null)

function addDestination() {
  setup.destinations.push({
    name: '',
    country: '',
    lat: 0,
    lng: 0,
    durationDays: 1,
    order: setup.destinations.length + 1,
  })
}

function removeDestination(idx: number) {
  setup.destinations.splice(idx, 1)
  setup.destinations.forEach((d, i) => (d.order = i + 1))
}

function validate(): boolean {
  const refs = [originRef, departureDateRef, arrivalDateRef]
  let allValid = true
  for (const r of refs) {
    if (r.value && !r.value.validate()) allValid = false
  }
  if (setup.destinations.length === 0) allValid = false
  return allValid
}

defineExpose({ validate })
</script>
