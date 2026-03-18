import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppSeparator from '@/components/app/AppSeparator.vue'

describe('AppSeparator', () => {
  it('renders horizontal by default', () => {
    const wrapper = mount(AppSeparator)
    const el = wrapper.find('[data-slot="separator"]')
    expect(el.exists()).toBe(true)
    expect(el.attributes('data-orientation')).toBe('horizontal')
  })

  it('renders vertical when orientation is vertical', () => {
    const wrapper = mount(AppSeparator, { props: { orientation: 'vertical' } })
    expect(wrapper.find('[data-slot="separator"]').attributes('data-orientation')).toBe('vertical')
  })

  it('sets decorative role by default', () => {
    const wrapper = mount(AppSeparator)
    expect(wrapper.find('[data-slot="separator"]').attributes('role')).toBe('none')
  })

  it('sets separator role when not decorative', () => {
    const wrapper = mount(AppSeparator, { props: { decorative: false } })
    expect(wrapper.find('[data-slot="separator"]').attributes('role')).toBe('separator')
  })

  it('applies custom class prop', () => {
    const wrapper = mount(AppSeparator, { props: { class: 'my-4' } })
    expect(wrapper.find('[data-slot="separator"]').classes()).toContain('my-4')
  })
})
