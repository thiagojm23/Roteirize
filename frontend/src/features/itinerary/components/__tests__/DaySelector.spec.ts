import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DaySelector from '@/features/itinerary/components/DaySelector.vue'

describe('DaySelector', () => {
  it('shows current day and total', () => {
    const wrapper = mount(DaySelector, {
      props: { modelValue: 3, totalDays: 10 },
    })
    expect(wrapper.text()).toContain('Dia 3 de 10')
  })

  it('disables prev button on day 1', () => {
    const wrapper = mount(DaySelector, {
      props: { modelValue: 1, totalDays: 10 },
    })
    const buttons = wrapper.findAll('button')
    expect(buttons[0].attributes('disabled')).toBeDefined()
  })

  it('disables next button on last day', () => {
    const wrapper = mount(DaySelector, {
      props: { modelValue: 10, totalDays: 10 },
    })
    const buttons = wrapper.findAll('button')
    const lastBtn = buttons[buttons.length - 1]
    expect(lastBtn.attributes('disabled')).toBeDefined()
  })

  it('emits update:modelValue when next is clicked', async () => {
    const wrapper = mount(DaySelector, {
      props: { modelValue: 3, totalDays: 10 },
    })
    const buttons = wrapper.findAll('button')
    await buttons[buttons.length - 1].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([4])
  })
})
