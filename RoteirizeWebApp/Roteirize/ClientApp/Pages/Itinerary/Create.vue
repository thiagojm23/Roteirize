<template lang="pug">
.flex.min-h-screen.bg-background
  AppSidenav(collapseMode="icons")

  .flex-1.flex.flex-col
    .border-b.border-border.bg-card.px-6.py-4(class="lg:px-8")
      .flex.items-center.gap-3
        Link(href="/app/itineraries")
          AppButton(variant="ghost" size="icon-sm")
            ArrowLeft.h-4.w-4
        div
          h1.text-2xl.font-bold Nova viagem
          p.text-base.text-muted-foreground Preencha as informações para criar seu roteiro

    .flex-1.p-6(class="lg:p-8")
      .max-w-3xl.mx-auto
        AppStepper.mb-8(:steps="wizardSteps" :currentStep="wizardStep")

        SetupStep(v-if="wizardStep === 1" ref="setupStepRef")
        BudgetStep(v-else-if="wizardStep === 2" ref="budgetStepRef")

        .flex.justify-between.mt-8
          AppButton(
            v-if="wizardStep > 1"
            variant="outline"
            @click="wizardStep--"
          )
            ArrowLeft.mr-2.h-4.w-4
            | Voltar

          .flex-1
          AppButton(
            v-if="wizardStep < 2"
            @click="nextStep"
          )
            | Próximo
            ArrowRight.ml-2.h-4.w-4

          AppButton(
            v-if="wizardStep === 2"
            :loading="isLoading"
            @click="handleCreate"
          )
            Check.mr-2.h-4.w-4
            | Criar roteiro
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Link, router } from '@inertiajs/vue3'
import AppSidenav from '@/Components/Layout/AppSidenav.vue'
import AppButton from '@/Components/App/AppButton.vue'
import AppStepper from '@/Components/App/AppStepper.vue'
import SetupStep from '@/Components/Itinerary/SetupStep.vue'
import BudgetStep from '@/Components/Itinerary/BudgetStep.vue'
import { ArrowLeft, ArrowRight, Check } from 'lucide-vue-next'

const wizardStep = ref(1)
const isLoading = ref(false)

const setupStepRef = ref<InstanceType<typeof SetupStep> | null>(null)
const budgetStepRef = ref<InstanceType<typeof BudgetStep> | null>(null)

const wizardSteps = [
  { label: 'Configuração' },
  { label: 'Orçamento' },
]

function nextStep() {
  if (wizardStep.value === 1 && setupStepRef.value) {
    if (!setupStepRef.value.validate()) return
  }
  wizardStep.value++
}

function handleCreate() {
  if (budgetStepRef.value && !budgetStepRef.value.validate()) return

  const setupData = setupStepRef.value?.getData()
  const budgetData = budgetStepRef.value?.getData()

  if (!setupData || !budgetData) return

  const title = setupData.destinations.map((d) => d.name).filter(Boolean).join(' → ') || 'Nova viagem'

  isLoading.value = true
  router.post('/app/itineraries', {
    title,
    setup: setupData,
    budget: budgetData,
  }, {
    onFinish: () => { isLoading.value = false },
  })
}
</script>
