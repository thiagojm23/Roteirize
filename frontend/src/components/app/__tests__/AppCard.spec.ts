import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppCard from '@/components/app/AppCard.vue'

describe('AppCard', () => {
  it('renders title when title prop is provided', () => {
    const wrapper = mount(AppCard, { props: { title: 'Minha Viagem' } })
    expect(wrapper.text()).toContain('Minha Viagem')
  })

  it('renders description when description prop is provided', () => {
    const wrapper = mount(AppCard, { props: { description: 'Detalhes da viagem' } })
    expect(wrapper.text()).toContain('Detalhes da viagem')
  })

  it('renders default slot content', () => {
    const wrapper = mount(AppCard, {
      slots: { default: '<p>Card body</p>' },
    })
    expect(wrapper.text()).toContain('Card body')
  })

  it('renders header slot overriding title/description', () => {
    const wrapper = mount(AppCard, {
      props: { title: 'Ignored' },
      slots: { header: '<div>Custom Header</div>' },
    })
    expect(wrapper.text()).toContain('Custom Header')
    expect(wrapper.text()).not.toContain('Ignored')
  })

  it('renders footer slot content', () => {
    const wrapper = mount(AppCard, {
      slots: { footer: '<button>Ação</button>' },
    })
    expect(wrapper.text()).toContain('Ação')
  })

  it('applies size padding classes', () => {
    const wrapper = mount(AppCard, { props: { size: 'sm' } })
    expect(wrapper.find('[data-slot="card"]').classes()).toContain('py-4')
  })

  it('applies default md size', () => {
    const wrapper = mount(AppCard)
    expect(wrapper.find('[data-slot="card"]').classes()).toContain('py-6')
  })

  it('applies custom class prop', () => {
    const wrapper = mount(AppCard, { props: { class: 'w-full' } })
    expect(wrapper.find('[data-slot="card"]').classes()).toContain('w-full')
  })
})
