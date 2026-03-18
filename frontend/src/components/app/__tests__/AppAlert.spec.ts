import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import AppAlert from '@/components/app/AppAlert.vue'

describe('AppAlert', () => {
  it('renders with role="alert"', () => {
    const wrapper = mount(AppAlert)
    expect(wrapper.find('[role="alert"]').exists()).toBe(true)
  })

  it('renders title when title prop is provided', () => {
    const wrapper = mount(AppAlert, { props: { title: 'Sucesso' } })
    expect(wrapper.text()).toContain('Sucesso')
  })

  it('renders default slot as description', () => {
    const wrapper = mount(AppAlert, {
      slots: { default: 'Operação concluída' },
    })
    expect(wrapper.text()).toContain('Operação concluída')
  })

  it('applies default variant classes', () => {
    const wrapper = mount(AppAlert)
    expect(wrapper.find('[role="alert"]').classes()).toContain('bg-card')
  })

  it('applies destructive variant classes', () => {
    const wrapper = mount(AppAlert, { props: { variant: 'destructive' } })
    expect(wrapper.find('[role="alert"]').classes()).toContain('text-destructive')
  })

  it('applies success variant classes', () => {
    const wrapper = mount(AppAlert, { props: { variant: 'success' } })
    expect(wrapper.find('[role="alert"]').classes()).toContain('text-success')
  })

  it('applies warning variant classes', () => {
    const wrapper = mount(AppAlert, { props: { variant: 'warning' } })
    expect(wrapper.find('[role="alert"]').classes()).toContain('text-warning')
  })

  it('renders icon component when icon prop is provided', () => {
    const FakeIcon = { template: '<svg data-testid="icon" />' }
    const wrapper = mount(AppAlert, {
      props: { icon: FakeIcon as any },
    })
    expect(wrapper.find('[data-testid="icon"]').exists()).toBe(true)
  })

  it('applies custom class prop', () => {
    const wrapper = mount(AppAlert, { props: { class: 'my-alert' } })
    expect(wrapper.find('[role="alert"]').classes()).toContain('my-alert')
  })
})
