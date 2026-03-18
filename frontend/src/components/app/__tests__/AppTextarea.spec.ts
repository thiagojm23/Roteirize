import { describe, it, expect } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import AppTextarea from '@/components/app/AppTextarea.vue'
import { validators } from '@/lib/validation'

describe('AppTextarea', () => {
  it('renders without label when no label prop is given', () => {
    const wrapper = mount(AppTextarea, { props: { modelValue: '' } })
    expect(wrapper.find('label').exists()).toBe(false)
  })

  it('renders label text when label prop is provided', () => {
    const wrapper = mount(AppTextarea, {
      props: { modelValue: '', label: 'Descrição' },
    })
    expect(wrapper.find('label').text()).toContain('Descrição')
  })

  it('shows required asterisk when required prop is true', () => {
    const wrapper = mount(AppTextarea, {
      props: { modelValue: '', label: 'Campo', required: true },
    })
    expect(wrapper.find('label').text()).toContain('*')
  })

  it('renders hint text when no error', () => {
    const wrapper = mount(AppTextarea, {
      props: { modelValue: '', hint: 'Dica' },
    })
    expect(wrapper.text()).toContain('Dica')
  })

  it('shows error prop over hint', () => {
    const wrapper = mount(AppTextarea, {
      props: { modelValue: '', hint: 'Dica', error: 'Erro' },
    })
    expect(wrapper.text()).toContain('Erro')
    expect(wrapper.text()).not.toContain('Dica')
  })

  it('validate() returns false and sets error when required rule fails', async () => {
    const wrapper = mount(AppTextarea, {
      props: { modelValue: '', rules: [validators.required] },
    })
    const isValid = (wrapper.vm as any).validate()
    await nextTick()
    expect(isValid).toBe(false)
    expect(wrapper.text()).toContain('Campo obrigatório')
  })

  it('validate() returns true when value passes all rules', async () => {
    const wrapper = mount(AppTextarea, {
      props: { modelValue: 'Some text', rules: [validators.required] },
    })
    const isValid = (wrapper.vm as any).validate()
    await nextTick()
    expect(isValid).toBe(true)
  })

  it('reset() clears internal error', async () => {
    const wrapper = mount(AppTextarea, {
      props: { modelValue: '', rules: [validators.required] },
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
    const wrapper = mount(AppTextarea, {
      props: { modelValue: '', class: 'col-span-2' },
    })
    expect(wrapper.find('div').classes()).toContain('col-span-2')
  })

  it('applies sm size class', () => {
    const wrapper = mount(AppTextarea, {
      props: { modelValue: '', size: 'sm' },
    })
    expect(wrapper.find('textarea').classes()).toContain('text-sm')
  })

  it('exposes validate and reset via defineExpose', () => {
    const wrapper = mount(AppTextarea, { props: { modelValue: '' } })
    const vm = wrapper.vm as any
    expect(typeof vm.validate).toBe('function')
    expect(typeof vm.reset).toBe('function')
  })
})
