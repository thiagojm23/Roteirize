import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api } from '@/lib/api'
import type {
  Itinerary,
  DayPlan,
  DayEntry,
  CostSummary,
  TripSetup,
  Budget,
} from '@/features/itinerary/types'

export const useItineraryStore = defineStore('itinerary', () => {
  const itineraries = ref<Itinerary[]>([])
  const currentItinerary = ref<Itinerary | null>(null)
  const dayPlans = ref<DayPlan[]>([])
  const costSummary = ref<CostSummary | null>(null)
  const isLoading = ref(false)
  const error = ref('')

  // Wizard state
  const wizardStep = ref(1)
  const setupData = ref<TripSetup>({
    departureDate: '',
    arrivalDate: '',
    origin: '',
    destinations: [],
  })
  const budgetData = ref<Budget>({
    totalBudget: 0,
    travelers: 1,
    currency: 'BRL',
  })

  // Getters
  const totalDays = computed(() => {
    if (!currentItinerary.value) return 0
    const start = new Date(currentItinerary.value.startDate)
    const end = new Date(currentItinerary.value.endDate)
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
  })

  const currentDayPlan = computed(() => (dayNumber: number) =>
    dayPlans.value.find((d) => d.dayNumber === dayNumber) ?? null,
  )

  const budgetProgress = computed(() => {
    if (!costSummary.value || !budgetData.value.totalBudget) return 0
    return Math.round((costSummary.value.totalSpent / budgetData.value.totalBudget) * 100)
  })

  // Actions
  async function fetchItineraries() {
    isLoading.value = true
    error.value = ''
    const result = await api.get<{ itineraries: Itinerary[] }>('/itineraries')
    isLoading.value = false
    if (result.data) {
      itineraries.value = result.data.itineraries
    } else {
      error.value = result.error.message
    }
  }

  async function fetchItinerary(id: string) {
    isLoading.value = true
    error.value = ''
    const result = await api.get<{ itinerary: Itinerary }>(`/itineraries/${id}`)
    isLoading.value = false
    if (result.data) {
      currentItinerary.value = result.data.itinerary
    } else {
      error.value = result.error.message
    }
  }

  async function createItinerary(data: { title: string; setup: TripSetup; budget: Budget }) {
    isLoading.value = true
    error.value = ''
    const result = await api.post<{ itinerary: Itinerary }>('/itineraries', data)
    isLoading.value = false
    if (result.data) {
      itineraries.value.push(result.data.itinerary)
      currentItinerary.value = result.data.itinerary
      return result.data.itinerary
    } else {
      error.value = result.error.message
      return null
    }
  }

  async function updateItinerary(id: string, data: Partial<Itinerary>) {
    isLoading.value = true
    error.value = ''
    const result = await api.put<{ itinerary: Itinerary }>(`/itineraries/${id}`, data)
    isLoading.value = false
    if (result.data) {
      const idx = itineraries.value.findIndex((i) => i.id === id)
      if (idx !== -1) itineraries.value[idx] = result.data.itinerary
      if (currentItinerary.value?.id === id) currentItinerary.value = result.data.itinerary
    } else {
      error.value = result.error.message
    }
  }

  async function deleteItinerary(id: string) {
    isLoading.value = true
    error.value = ''
    const result = await api.delete(`/itineraries/${id}`)
    isLoading.value = false
    if (!result.error) {
      itineraries.value = itineraries.value.filter((i) => i.id !== id)
      if (currentItinerary.value?.id === id) currentItinerary.value = null
    } else {
      error.value = result.error.message
    }
  }

  async function fetchDayPlans(itineraryId: string) {
    isLoading.value = true
    error.value = ''
    const result = await api.get<{ days: DayPlan[] }>(`/itineraries/${itineraryId}/days`)
    isLoading.value = false
    if (result.data) {
      dayPlans.value = result.data.days
    } else {
      error.value = result.error.message
    }
  }

  async function addDayEntry(itineraryId: string, dayNumber: number, entry: Omit<DayEntry, 'id'>) {
    const result = await api.post<{ entry: DayEntry }>(
      `/itineraries/${itineraryId}/days/${dayNumber}/entries`,
      entry,
    )
    if (result.data) {
      const day = dayPlans.value.find((d) => d.dayNumber === dayNumber)
      if (day) day.entries.push(result.data.entry)
      return result.data.entry
    }
    return null
  }

  async function updateDayEntry(
    itineraryId: string,
    dayNumber: number,
    entryId: string,
    data: Partial<DayEntry>,
  ) {
    const result = await api.put<{ entry: DayEntry }>(
      `/itineraries/${itineraryId}/days/${dayNumber}/entries/${entryId}`,
      data,
    )
    if (result.data) {
      const day = dayPlans.value.find((d) => d.dayNumber === dayNumber)
      if (day) {
        const idx = day.entries.findIndex((e) => e.id === entryId)
        if (idx !== -1) day.entries[idx] = result.data.entry
      }
    }
  }

  async function removeDayEntry(itineraryId: string, dayNumber: number, entryId: string) {
    const result = await api.delete(`/itineraries/${itineraryId}/days/${dayNumber}/entries/${entryId}`)
    if (!result.error) {
      const day = dayPlans.value.find((d) => d.dayNumber === dayNumber)
      if (day) {
        day.entries = day.entries.filter((e) => e.id !== entryId)
      }
    }
  }

  async function fetchCostSummary(itineraryId: string) {
    const result = await api.get<CostSummary>(`/itineraries/${itineraryId}/costs`)
    if (result.data) {
      costSummary.value = result.data
    }
  }

  function resetWizard() {
    wizardStep.value = 1
    setupData.value = { departureDate: '', arrivalDate: '', origin: '', destinations: [] }
    budgetData.value = { totalBudget: 0, travelers: 1, currency: 'BRL' }
  }

  return {
    // State
    itineraries,
    currentItinerary,
    dayPlans,
    costSummary,
    isLoading,
    error,
    wizardStep,
    setupData,
    budgetData,
    // Getters
    totalDays,
    currentDayPlan,
    budgetProgress,
    // Actions
    fetchItineraries,
    fetchItinerary,
    createItinerary,
    updateItinerary,
    deleteItinerary,
    fetchDayPlans,
    addDayEntry,
    updateDayEntry,
    removeDayEntry,
    fetchCostSummary,
    resetWizard,
  }
})
