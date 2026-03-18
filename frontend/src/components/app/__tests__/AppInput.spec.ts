import { describe, it, expect } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import AppInput from '@/components/app/AppInput.vue'
import { validators } from '@/lib/validation'

describe('AppInput', () => {
  it('renders without label when no label prop is given', () => {
    const wrapper = mount(AppInput, { props: { modelValue: '' } })
    expect(wrapper.find('label').exists()).toBe(false)
  })

  it('renders label text when label prop is provided', () => {
    const wrapper = mount(AppInput, {
      props: { modelValue: '', label: 'E-mail' },
    })
    expect(wrapper.find('label').text()).toContain('E-mail')
  })

  it('shows required asterisk when required prop is true', () => {
    const wrapper = mount(AppInput, {
      props: { modelValue: '', label: 'Campo', required: true },
    })
    expect(wrapper.find('label').text()).toContain('*')
  })

  it('renders hint text when no error', () => {
    const wrapper = mount(AppInput, {
      props: { modelValue: '', hint: 'Dica útil' },
    })
    expect(wrapper.text()).toContain('Dica útil')
  })

  it('shows error prop over hint', () => {
    const wrapper = mount(AppInput, {
      props: { modelValue: '', hint: 'Dica', error: 'Campo obrigatório' },
    })
    expect(wrapper.text()).toContain('Campo obrigatório')
    expect(wrapper.text()).not.toContain('Dica')
  })

  it('shows password toggle button for type="password"', () => {
    const wrapper = mount(AppInput, {
      props: { modelValue: '', type: 'password' },
    })
    expect(wrapper.find('button[type="button"]').exists()).toBe(true)
  })

  it('does not show password toggle for type="text"', () => {
    const wrapper = mount(AppInput, {
      props: { modelValue: '', type: 'text' },
    })
    expect(wrapper.find('button[type="button"]').exists()).toBe(false)
  })

  it('validate() returns false and sets error when required rule fails', async () => {
    const wrapper = mount(AppInput, {
      props: {
        modelValue: '',
        rules: [validators.required],
      },
    })

    const isValid = (wrapper.vm as unknown as { validate: () => boolean }).validate()
    await nextTick()

    expect(isValid).toBe(false)
    expect(wrapper.text()).toContain('Campo obrigatório')
  })

  it('validate() returns true when value passes all rules', async () => {
    const wrapper = mount(AppInput, {
      props: {
        modelValue: 'user@test.com',
        rules: [validators.required, validators.email],
      },
    })

    const isValid = (wrapper.vm as unknown as { validate: () => boolean }).validate()
    await nextTick()

    expect(isValid).toBe(true)
    expect(wrapper.text()).not.toContain('inválido')
  })

  it('reset() clears internal error and touched state', async () => {
    const wrapper = mount(AppInput, {
      props: { modelValue: '', rules: [validators.required] },
    })

    const vm = wrapper.vm as unknown as { validate: () => boolean; reset: () => void }
    vm.validate()
    await nextTick()
    expect(wrapper.text()).toContain('Campo obrigatório')

    vm.reset()
    await nextTick()
    expect(wrapper.text()).not.toContain('Campo obrigatório')
  })

  it('applies custom class prop to root element', () => {
    const wrapper = mount(AppInput, {
      props: { modelValue: '', class: 'col-span-2' },
    })
    expect(wrapper.find('div').classes()).toContain('col-span-2')
  })

  it('exposes validate and reset via defineExpose', () => {
    const wrapper = mount(AppInput, { props: { modelValue: '' } })
    const vm = wrapper.vm as unknown as { validate?: () => boolean; reset?: () => void }
    expect(typeof vm.validate).toBe('function')
    expect(typeof vm.reset).toBe('function')
  })
})
