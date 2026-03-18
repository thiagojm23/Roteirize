import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppTimeline from '@/components/app/AppTimeline.vue'

const items = [
  { id: '1', title: 'Check-in', description: '14:00' },
  { id: '2', title: 'Almoço', description: '12:00' },
  { id: '3', title: 'Passeio', description: '15:00' },
]

describe('AppTimeline', () => {
  it('renders all timeline items', () => {
    const wrapper = mount(AppTimeline, { props: { items } })
    expect(wrapper.text()).toContain('Check-in')
    expect(wrapper.text()).toContain('Almoço')
    expect(wrapper.text()).toContain('Passeio')
  })

  it('renders descriptions', () => {
    const wrapper = mount(AppTimeline, { props: { items } })
    expect(wrapper.text()).toContain('14:00')
    expect(wrapper.text()).toContain('12:00')
  })

  it('renders timeline nodes', () => {
    const wrapper = mount(AppTimeline, { props: { items } })
    const nodes = wrapper.findAll('[data-timeline-node]')
    expect(nodes.length).toBe(3)
  })

  it('supports vertical orientation by default', () => {
    const wrapper = mount(AppTimeline, { props: { items } })
    expect(wrapper.find('[data-timeline]').classes()).toContain('flex-col')
  })

  it('supports horizontal orientation', () => {
    const wrapper = mount(AppTimeline, { props: { items, orientation: 'horizontal' } })
    expect(wrapper.find('[data-timeline]').classes()).toContain('flex-row')
  })

  it('applies custom class', () => {
    const wrapper = mount(AppTimeline, { props: { items, class: 'my-timeline' } })
    expect(wrapper.find('.my-timeline').exists()).toBe(true)
  })
})
