import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import BudgetStep from '@/features/itinerary/components/BudgetStep.vue'

describe('BudgetStep', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders budget fields', () => {
    const wrapper = mount(BudgetStep)
    expect(wrapper.text()).toContain('Orçamento total')
    expect(wrapper.text()).toContain('Máximo por dia')
    expect(wrapper.text()).toContain('Número de viajantes')
  })

  it('renders currency select', () => {
    const wrapper = mount(BudgetStep)
    expect(wrapper.text()).toContain('Moeda')
  })

  it('validate() fails when totalBudget is empty', () => {
    const wrapper = mount(BudgetStep)
    const valid = (wrapper.vm as unknown as { validate: () => boolean }).validate()
    expect(valid).toBe(false)
  })
})
