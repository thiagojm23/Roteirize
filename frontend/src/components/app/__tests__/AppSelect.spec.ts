import { describe, it, expect } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import AppSelect from '@/components/app/AppSelect.vue'
import { validators } from '@/lib/validation'

const options = [
  { label: 'Opção A', value: 'a' },
  { label: 'Opção B', value: 'b' },
  { label: 'Opção C', value: 'c', disabled: true },
]

describe('AppSelect', () => {
  it('renders without label when no label prop is given', () => {
    const wrapper = mount(AppSelect, {
      props: { modelValue: '', options },
    })
    expect(wrapper.find('label').exists()).toBe(false)
  })

  it('renders label text when label prop is provided', () => {
    const wrapper = mount(AppSelect, {
      props: { modelValue: '', options, label: 'Escolha' },
    })
    expect(wrapper.find('label').text()).toContain('Escolha')
  })

  it('renders required asterisk when required prop is true', () => {
    const wrapper = mount(AppSelect, {
      props: { modelValue: '', options, label: 'Campo', required: true },
    })
    expect(wrapper.find('label').text()).toContain('*')
  })

  it('renders trigger button', () => {
    const wrapper = mount(AppSelect, {
      props: { modelValue: '', options },
    })
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('applies disabled state', () => {
    const wrapper = mount(AppSelect, {
      props: { modelValue: '', options, disabled: true },
    })
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('shows error text when error prop is provided', () => {
    const wrapper = mount(AppSelect, {
      props: { modelValue: '', options, error: 'Campo obrigatório' },
    })
    expect(wrapper.text()).toContain('Campo obrigatório')
  })

  it('validate() returns false and sets error when required rule fails', async () => {
    const wrapper = mount(AppSelect, {
      props: { modelValue: '', options, rules: [validators.required] },
    })
    const isValid = (wrapper.vm as any).validate()
    await nextTick()
    expect(isValid).toBe(false)
    expect(wrapper.text()).toContain('Campo obrigatório')
  })

  it('validate() returns true when value passes rules', async () => {
    const wrapper = mount(AppSelect, {
      props: { modelValue: 'a', options, rules: [validators.required] },
    })
    const isValid = (wrapper.vm as any).validate()
    await nextTick()
    expect(isValid).toBe(true)
  })

  it('reset() clears internal error', async () => {
    const wrapper = mount(AppSelect, {
      props: { modelValue: '', options, rules: [validators.required] },
    })
    const vm = wrapper.vm as any
    vm.validate()
    await nextTick()
    expect(wrapper.text()).toContain('Campo obrigatório')
    vm.reset()
    await nextTick()
    expect(wrapper.text()).not.toContain('Campo obrigatório')
  })

  it('applies custom class prop to root element', () => {
    const wrapper = mount(AppSelect, {
      props: { modelValue: '', options, class: 'w-64' },
    })
    expect(wrapper.find('div').classes()).toContain('w-64')
  })

  it('exposes validate and reset via defineExpose', () => {
    const wrapper = mount(AppSelect, {
      props: { modelValue: '', options },
    })
    const vm = wrapper.vm as any
    expect(typeof vm.validate).toBe('function')
    expect(typeof vm.reset).toBe('function')
  })
})
