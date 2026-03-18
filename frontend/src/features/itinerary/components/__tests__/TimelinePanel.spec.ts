import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import TimelinePanel from '@/features/itinerary/components/TimelinePanel.vue'
import type { DayPlan } from '@/features/itinerary/types'

const dayPlans: DayPlan[] = [
  {
    dayNumber: 1,
    date: '2026-06-15',
    entries: [
      { id: 'e1', hourStart: '09:00', hourEnd: '11:00', locationName: 'Torre Eiffel', cost: 26, classification: 'tour', photos: [], notes: '' },
    ],
  },
  {
    dayNumber: 2,
    date: '2026-06-16',
    entries: [
      { id: 'e2', hourStart: '10:00', hourEnd: '12:00', locationName: 'Montmartre', cost: 0, classification: 'tour', photos: [], notes: '' },
    ],
  },
]

describe('TimelinePanel', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders zoom level buttons', () => {
    const wrapper = mount(TimelinePanel, { props: { dayPlans } })
    expect(wrapper.text()).toContain('Hora')
    expect(wrapper.text()).toContain('Dia')
    expect(wrapper.text()).toContain('Semana')
  })

  it('shows day-level timeline items by default', () => {
    const wrapper = mount(TimelinePanel, { props: { dayPlans } })
    expect(wrapper.text()).toContain('Dia 1')
    expect(wrapper.text()).toContain('Dia 2')
  })

  it('switches to hour-level view', async () => {
    const wrapper = mount(TimelinePanel, { props: { dayPlans } })
    const hourBtn = wrapper.findAll('button').find((b) => b.text() === 'Hora')
    await hourBtn?.trigger('click')
    expect(wrapper.text()).toContain('Torre Eiffel')
    expect(wrapper.text()).toContain('Montmartre')
  })
})
