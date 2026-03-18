import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppCollapsible from '@/components/app/AppCollapsible.vue'

describe('AppCollapsible', () => {
  it('renders title', () => {
    const wrapper = mount(AppCollapsible, {
      props: { title: 'Detalhes' },
      slots: { default: '<p>Content</p>' },
    })
    expect(wrapper.text()).toContain('Detalhes')
  })

  it('shows content when open', () => {
    const wrapper = mount(AppCollapsible, {
      props: { title: 'Detalhes', modelValue: true },
      slots: { default: '<p>Visible content</p>' },
    })
    expect(wrapper.text()).toContain('Visible content')
  })

  it('hides content when closed', () => {
    const wrapper = mount(AppCollapsible, {
      props: { title: 'Detalhes', modelValue: false },
      slots: { default: '<p>Hidden content</p>' },
    })
    expect(wrapper.text()).not.toContain('Hidden content')
  })

  it('toggles on header click', async () => {
    const wrapper = mount(AppCollapsible, {
      props: { title: 'Detalhes', modelValue: false },
      slots: { default: '<p>Content</p>' },
    })
    await wrapper.find('[data-collapsible-trigger]').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
  })

  it('shows chevron icon', () => {
    const wrapper = mount(AppCollapsible, {
      props: { title: 'Detalhes' },
      slots: { default: '<p>Content</p>' },
    })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('applies custom class', () => {
    const wrapper = mount(AppCollapsible, {
      props: { title: 'Detalhes', class: 'my-collapse' },
      slots: { default: '<p>Content</p>' },
    })
    expect(wrapper.find('.my-collapse').exists()).toBe(true)
  })
})
