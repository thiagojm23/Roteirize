<template lang="pug">
.flex.min-h-screen.bg-background
  AppSidenav(collapseMode="icons")

  .flex-1.flex.flex-col
    .border-b.border-border.bg-card.px-6.py-4(class="lg:px-8")
      .flex.items-center.gap-3
        RouterLink(to="/app/itineraries")
          AppButton(variant="ghost" size="icon-sm")
            ArrowLeft.h-4.w-4
        div
          h1.text-2xl.font-bold Nova viagem
          p.text-base.text-muted-foreground Preencha as informações para criar seu roteiro

    .flex-1.p-6(class="lg:p-8")
      .max-w-3xl.mx-auto
        AppStepper.mb-8(:steps="wizardSteps" :currentStep="store.wizardStep")

        SetupStep(v-if="store.wizardStep === 1" ref="setupStepRef")
        BudgetStep(v-else-if="store.wizardStep === 2" ref="budgetStepRef")

        .flex.justify-between.mt-8
          AppButton(
            v-if="store.wizardStep > 1"
            variant="outline"
            @click="store.wizardStep--"
          )
            ArrowLeft.mr-2.h-4.w-4
            | Voltar

          .flex-1
          AppButton(
            v-if="store.wizardStep < 2"
            @click="nextStep"
          )
            | Próximo
            ArrowRight.ml-2.h-4.w-4

          AppButton(
            v-if="store.wizardStep === 2"
            :loading="store.isLoading"
            @click="handleCreate"
          )
            Check.mr-2.h-4.w-4
            | Criar roteiro
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import AppSidenav from '@/components/layout/AppSidenav.vue'
import AppButton from '@/components/app/AppButton.vue'
import AppStepper from '@/components/app/AppStepper.vue'
import SetupStep from '@/features/itinerary/components/SetupStep.vue'
import BudgetStep from '@/features/itinerary/components/BudgetStep.vue'
import { ArrowLeft, ArrowRight, Check } from 'lucide-vue-next'
import { useItineraryStore } from '@/features/itinerary/stores/itinerary'

const router = useRouter()
const store = useItineraryStore()

const setupStepRef = ref<InstanceType<typeof SetupStep> | null>(null)
const budgetStepRef = ref<InstanceType<typeof BudgetStep> | null>(null)

const wizardSteps = [
  { label: 'Configuração' },
  { label: 'Orçamento' },
]

function nextStep() {
  if (store.wizardStep === 1 && setupStepRef.value) {
    if (!setupStepRef.value.validate()) return
  }
  store.wizardStep++
}

async function handleCreate() {
  if (budgetStepRef.value && !budgetStepRef.value.validate()) return

  const title = store.setupData.destinations.map((d) => d.name).filter(Boolean).join(' → ') || 'Nova viagem'
  const result = await store.createItinerary({
    title,
    setup: store.setupData,
    budget: store.budgetData,
  })

  if (result) {
    store.resetWizard()
    router.push(`/app/itineraries/${result.id}`)
  }
}
</script>
