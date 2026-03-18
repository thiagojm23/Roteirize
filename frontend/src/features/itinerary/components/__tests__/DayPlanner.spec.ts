import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DayPlanner from '@/features/itinerary/components/DayPlanner.vue'
import type { DayPlan } from '@/features/itinerary/types'

const dayPlans: DayPlan[] = [
  {
    dayNumber: 1,
    date: '2026-06-15',
    entries: [
      {
        id: 'e1',
        hourStart: '09:00',
        hourEnd: '11:00',
        locationName: 'Torre Eiffel',
        cost: 26,
        classification: 'tour',
        photos: [],
        notes: '',
      },
    ],
  },
]

describe('DayPlanner', () => {
  it('renders day selector and add button', () => {
    const wrapper = mount(DayPlanner, {
      props: { dayPlans, totalDays: 3 },
    })
    expect(wrapper.text()).toContain('Dia')
    expect(wrapper.text()).toContain('Adicionar atividade')
  })

  it('shows entries for current day', () => {
    const wrapper = mount(DayPlanner, {
      props: { dayPlans, totalDays: 3 },
    })
    expect(wrapper.text()).toContain('Torre Eiffel')
  })

  it('shows empty state for day without entries', () => {
    const wrapper = mount(DayPlanner, {
      props: { dayPlans: [], totalDays: 3 },
    })
    expect(wrapper.text()).toContain('Nenhuma atividade')
  })

  it('emits addEntry when button is clicked', async () => {
    const wrapper = mount(DayPlanner, {
      props: { dayPlans, totalDays: 3 },
    })
    const addBtn = wrapper.findAll('button').find((b) => b.text().includes('Adicionar'))
    await addBtn?.trigger('click')
    expect(wrapper.emitted('addEntry')).toBeTruthy()
  })
})
