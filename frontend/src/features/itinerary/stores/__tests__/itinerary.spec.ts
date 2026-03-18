import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useItineraryStore } from '@/features/itinerary/stores/itinerary'

describe('useItineraryStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('starts with empty itineraries', () => {
    const store = useItineraryStore()
    expect(store.itineraries).toEqual([])
    expect(store.currentItinerary).toBeNull()
    expect(store.isLoading).toBe(false)
    expect(store.error).toBe('')
  })

  it('fetchItineraries loads mock data', async () => {
    const store = useItineraryStore()
    await store.fetchItineraries()
    expect(store.itineraries.length).toBe(3)
    expect(store.itineraries[0].title).toBe('Europa Clássica')
    expect(store.itineraries[1].title).toBe('Nordeste Brasileiro')
    expect(store.itineraries[2].title).toBe('Japão 2026')
  })

  it('fetchItinerary loads a single itinerary', async () => {
    const store = useItineraryStore()
    await store.fetchItinerary('itin-001')
    expect(store.currentItinerary).not.toBeNull()
    expect(store.currentItinerary!.title).toBe('Europa Clássica')
  })

  it('fetchItinerary sets error for non-existent id', async () => {
    const store = useItineraryStore()
    await store.fetchItinerary('nonexistent')
    expect(store.error).toBe('Roteiro não encontrado')
  })

  it('createItinerary adds to the list', async () => {
    const store = useItineraryStore()
    const result = await store.createItinerary({
      title: 'Teste',
      setup: { departureDate: '', arrivalDate: '', origin: '', destinations: [] },
      budget: { totalBudget: 1000, travelers: 1, currency: 'BRL' },
    })
    expect(result).not.toBeNull()
    expect(store.itineraries.find((i) => i.title === 'Teste')).toBeTruthy()
  })

  it('deleteItinerary removes from the list', async () => {
    const store = useItineraryStore()
    await store.fetchItineraries()
    const initialCount = store.itineraries.length
    await store.deleteItinerary('itin-001')
    expect(store.itineraries.length).toBe(initialCount - 1)
    expect(store.itineraries.find((i) => i.id === 'itin-001')).toBeUndefined()
  })

  it('fetchDayPlans loads day plans', async () => {
    const store = useItineraryStore()
    await store.fetchDayPlans('itin-001')
    expect(store.dayPlans.length).toBeGreaterThan(0)
    expect(store.dayPlans[0].dayNumber).toBe(1)
    expect(store.dayPlans[0].entries.length).toBeGreaterThan(0)
  })

  it('addDayEntry adds an entry', async () => {
    const store = useItineraryStore()
    await store.fetchDayPlans('itin-001')
    const entriesBefore = store.dayPlans[0].entries.length
    await store.addDayEntry('itin-001', 1, {
      hourStart: '19:00',
      hourEnd: '21:00',
      locationName: 'Jantar',
      cost: 60,
      classification: 'food',
      photos: [],
      notes: '',
    })
    expect(store.dayPlans[0].entries.length).toBe(entriesBefore + 1)
  })

  it('removeDayEntry removes an entry', async () => {
    const store = useItineraryStore()
    await store.fetchDayPlans('itin-001')
    const entryId = store.dayPlans[0].entries[0].id
    const entriesBefore = store.dayPlans[0].entries.length
    await store.removeDayEntry('itin-001', 1, entryId)
    expect(store.dayPlans[0].entries.length).toBe(entriesBefore - 1)
  })

  it('fetchCostSummary loads costs', async () => {
    const store = useItineraryStore()
    await store.fetchCostSummary('itin-001')
    expect(store.costSummary).not.toBeNull()
    expect(store.costSummary!.totalSpent).toBe(118)
  })

  it('totalDays computes correctly', async () => {
    const store = useItineraryStore()
    await store.fetchItinerary('itin-001')
    expect(store.totalDays).toBe(15)
  })

  it('budgetProgress computes percentage', async () => {
    const store = useItineraryStore()
    store.budgetData.totalBudget = 3000
    await store.fetchCostSummary('itin-001')
    expect(store.budgetProgress).toBe(4) // 118/3000 ≈ 3.9%
  })

  it('resetWizard resets wizard state', () => {
    const store = useItineraryStore()
    store.wizardStep = 3
    store.setupData.origin = 'São Paulo'
    store.budgetData.totalBudget = 5000
    store.resetWizard()
    expect(store.wizardStep).toBe(1)
    expect(store.setupData.origin).toBe('')
    expect(store.budgetData.totalBudget).toBe(0)
  })
})
