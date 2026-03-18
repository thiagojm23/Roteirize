import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CostInsightsPanel from '@/features/itinerary/components/CostInsightsPanel.vue'
import type { CostSummary, Budget } from '@/features/itinerary/types'

const costSummary: CostSummary = {
  totalSpent: 118,
  budgetRemaining: 2882,
  perDayAverage: 59,
  byCategory: {
    food: 75,
    tour: 26,
    museum: 17,
    transport: 0,
    hotel: 0,
    shopping: 0,
    entertainment: 0,
    other: 0,
  },
}

const budget: Budget = {
  totalBudget: 3000,
  travelers: 2,
  currency: 'BRL',
}

describe('CostInsightsPanel', () => {
  it('renders summary cards', () => {
    const wrapper = mount(CostInsightsPanel, { props: { costSummary, budget } })
    expect(wrapper.text()).toContain('Total gasto')
    expect(wrapper.text()).toContain('118.00')
    expect(wrapper.text()).toContain('Orçamento restante')
    expect(wrapper.text()).toContain('2882.00')
  })

  it('shows budget progress percentage', () => {
    const wrapper = mount(CostInsightsPanel, { props: { costSummary, budget } })
    expect(wrapper.text()).toContain('4%')
  })

  it('shows category breakdown only for non-zero categories', () => {
    const wrapper = mount(CostInsightsPanel, { props: { costSummary, budget } })
    expect(wrapper.text()).toContain('Alimentação')
    expect(wrapper.text()).toContain('Passeios')
    expect(wrapper.text()).toContain('Museus')
    expect(wrapper.text()).not.toContain('Transporte')
  })
})
