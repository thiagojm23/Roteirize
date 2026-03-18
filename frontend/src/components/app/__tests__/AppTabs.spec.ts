import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppTabs from '@/components/app/AppTabs.vue'

const tabs = [
  { key: 'map', label: 'Mapa' },
  { key: 'days', label: 'Dia a dia' },
  { key: 'timeline', label: 'Linha do tempo' },
]

describe('AppTabs', () => {
  it('renders all tab labels', () => {
    const wrapper = mount(AppTabs, {
      props: { tabs, modelValue: 'map' },
      slots: { 'tab-map': '<div>Map content</div>' },
    })
    expect(wrapper.text()).toContain('Mapa')
    expect(wrapper.text()).toContain('Dia a dia')
    expect(wrapper.text()).toContain('Linha do tempo')
  })

  it('renders active tab content slot', () => {
    const wrapper = mount(AppTabs, {
      props: { tabs, modelValue: 'map' },
      slots: { 'tab-map': '<div>Map content</div>' },
    })
    expect(wrapper.text()).toContain('Map content')
  })

  it('emits update:modelValue when tab is clicked', async () => {
    const wrapper = mount(AppTabs, {
      props: { tabs, modelValue: 'map' },
      slots: { 'tab-map': '<div>Map</div>', 'tab-days': '<div>Days</div>' },
    })
    const tabButtons = wrapper.findAll('[role="tab"]')
    await tabButtons[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['days'])
  })

  it('applies custom class', () => {
    const wrapper = mount(AppTabs, {
      props: { tabs, modelValue: 'map', class: 'custom' },
    })
    expect(wrapper.find('.custom').exists()).toBe(true)
  })
})
