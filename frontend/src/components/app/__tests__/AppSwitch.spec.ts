import { describe, it, expect } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import AppSwitch from '@/components/app/AppSwitch.vue'

describe('AppSwitch', () => {
  it('renders unchecked by default', () => {
    const wrapper = mount(AppSwitch, { props: { modelValue: false } })
    expect(wrapper.find('button').attributes('data-state')).toBe('unchecked')
  })

  it('renders checked when modelValue is true', async () => {
    const wrapper = mount(AppSwitch, { props: { modelValue: false } })
    await wrapper.setProps({ modelValue: true })
    await nextTick()
    expect(wrapper.find('button').attributes('data-state')).toBe('checked')
  })

  it('emits update:modelValue on click', async () => {
    const wrapper = mount(AppSwitch, { props: { modelValue: false } })
    await wrapper.find('button').trigger('click')
    await nextTick()
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])
  })

  it('renders label when label prop is provided', () => {
    const wrapper = mount(AppSwitch, { props: { modelValue: false, label: 'Modo escuro' } })
    expect(wrapper.text()).toContain('Modo escuro')
  })

  it('renders description when provided', () => {
    const wrapper = mount(AppSwitch, {
      props: { modelValue: false, label: 'Tema', description: 'Alternar tema' },
    })
    expect(wrapper.text()).toContain('Alternar tema')
  })

  it('is disabled when disabled prop is true', () => {
    const wrapper = mount(AppSwitch, { props: { modelValue: false, disabled: true } })
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('applies sm size classes', () => {
    const wrapper = mount(AppSwitch, { props: { modelValue: false, size: 'sm' } })
    expect(wrapper.find('button').classes()).toContain('h-4')
  })

  it('applies custom class prop', () => {
    const wrapper = mount(AppSwitch, { props: { modelValue: false, class: 'my-switch' } })
    expect(wrapper.find('.flex').classes()).toContain('my-switch')
  })
})
