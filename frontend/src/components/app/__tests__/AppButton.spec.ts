import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppButton from '@/components/app/AppButton.vue'

describe('AppButton', () => {
  it('renders slot content', () => {
    const wrapper = mount(AppButton, {
      slots: { default: 'Salvar' },
    })
    expect(wrapper.text()).toContain('Salvar')
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(AppButton, {
      slots: { default: 'Clique' },
    })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')?.length).toBe(1)
  })

  it('is disabled and does not emit click when disabled prop is true', async () => {
    const wrapper = mount(AppButton, {
      props: { disabled: true },
      slots: { default: 'Botão' },
    })
    const button = wrapper.find('button')
    expect(button.attributes('disabled')).toBeDefined()
  })

  it('shows AppSpinner and disables button when loading', () => {
    const wrapper = mount(AppButton, {
      props: { loading: true },
      slots: { default: 'Enviando' },
    })
    expect(wrapper.findComponent({ name: 'AppSpinner' }).exists()).toBe(true)
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('does not show spinner when not loading', () => {
    const wrapper = mount(AppButton, { slots: { default: 'Normal' } })
    expect(wrapper.findComponent({ name: 'AppSpinner' }).exists()).toBe(false)
  })

  it('renders with type="submit" when prop is set', () => {
    const wrapper = mount(AppButton, { props: { type: 'submit' } })
    expect(wrapper.find('button').attributes('type')).toBe('submit')
  })

  it('applies custom class prop', () => {
    const wrapper = mount(AppButton, {
      props: { class: 'w-full' },
      slots: { default: 'Full' },
    })
    expect(wrapper.find('button').classes()).toContain('w-full')
  })
})
