import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppCheckbox from '@/components/app/AppCheckbox.vue'

describe('AppCheckbox', () => {
  it('renders without label when no label prop is given', () => {
    const wrapper = mount(AppCheckbox, { props: { modelValue: false } })
    expect(wrapper.exists()).toBe(true)
  })

  it('renders label text when label prop is provided', () => {
    const wrapper = mount(AppCheckbox, {
      props: { modelValue: false, label: 'Aceito os termos' },
    })
    expect(wrapper.text()).toContain('Aceito os termos')
  })

  it('renders slot content as label', () => {
    const wrapper = mount(AppCheckbox, {
      props: { modelValue: false },
      slots: { default: 'Termos de uso' },
    })
    expect(wrapper.text()).toContain('Termos de uso')
  })

  it('renders hint text when hint prop is provided', () => {
    const wrapper = mount(AppCheckbox, {
      props: { modelValue: false, label: 'Opção', hint: 'Texto auxiliar' },
    })
    expect(wrapper.text()).toContain('Texto auxiliar')
  })

  it('emits update:modelValue with true when handleChange is called with true', async () => {
    const wrapper = mount(AppCheckbox, { props: { modelValue: false } })
    // Access the internal handleChange via exposed component instance
    const vm = wrapper.vm as unknown as { handleChange: (val: boolean) => void }
    vm.handleChange(true)
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
  })

  it('normalizes indeterminate to false (emits false when model was true)', async () => {
    const wrapper = mount(AppCheckbox, { props: { modelValue: true } })
    const vm = wrapper.vm as unknown as { handleChange: (val: boolean | 'indeterminate') => void }
    vm.handleChange('indeterminate')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
  })

  it('applies custom class prop to root element', () => {
    const wrapper = mount(AppCheckbox, {
      props: { modelValue: false, class: 'my-custom-class' },
    })
    expect(wrapper.find('div').classes()).toContain('my-custom-class')
  })
})
