import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CostBar from '@/features/itinerary/components/CostBar.vue'

describe('CostBar', () => {
  it('renders label and value', () => {
    const wrapper = mount(CostBar, { props: { label: 'Alimentação', value: 75, max: 200 } })
    expect(wrapper.text()).toContain('Alimentação')
    expect(wrapper.text()).toContain('75.00')
  })

  it('computes correct width percentage', () => {
    const wrapper = mount(CostBar, { props: { label: 'Test', value: 50, max: 100 } })
    const bar = wrapper.find('.h-full')
    expect(bar.attributes('style')).toContain('width: 50%')
  })

  it('caps at 100%', () => {
    const wrapper = mount(CostBar, { props: { label: 'Over', value: 150, max: 100 } })
    const bar = wrapper.find('.h-full')
    expect(bar.attributes('style')).toContain('width: 100%')
  })

  it('handles zero max', () => {
    const wrapper = mount(CostBar, { props: { label: 'Zero', value: 50, max: 0 } })
    const bar = wrapper.find('.h-full')
    expect(bar.attributes('style')).toContain('width: 0%')
  })
})
