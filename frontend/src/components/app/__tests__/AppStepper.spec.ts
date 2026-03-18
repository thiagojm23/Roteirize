import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppStepper from '@/components/app/AppStepper.vue'

const steps = [
  { label: 'Configuração' },
  { label: 'Orçamento' },
  { label: 'Revisão' },
]

describe('AppStepper', () => {
  it('renders all step labels', () => {
    const wrapper = mount(AppStepper, { props: { steps, currentStep: 1 } })
    expect(wrapper.text()).toContain('Configuração')
    expect(wrapper.text()).toContain('Orçamento')
    expect(wrapper.text()).toContain('Revisão')
  })

  it('renders step numbers', () => {
    const wrapper = mount(AppStepper, { props: { steps, currentStep: 1 } })
    expect(wrapper.text()).toContain('1')
    expect(wrapper.text()).toContain('2')
    expect(wrapper.text()).toContain('3')
  })

  it('marks current step as active', () => {
    const wrapper = mount(AppStepper, { props: { steps, currentStep: 2 } })
    const stepElements = wrapper.findAll('[data-step]')
    expect(stepElements[1].attributes('data-step')).toBe('active')
  })

  it('marks previous steps as completed', () => {
    const wrapper = mount(AppStepper, { props: { steps, currentStep: 2 } })
    const stepElements = wrapper.findAll('[data-step]')
    expect(stepElements[0].attributes('data-step')).toBe('completed')
  })

  it('marks future steps as pending', () => {
    const wrapper = mount(AppStepper, { props: { steps, currentStep: 1 } })
    const stepElements = wrapper.findAll('[data-step]')
    expect(stepElements[2].attributes('data-step')).toBe('pending')
  })

  it('applies custom class', () => {
    const wrapper = mount(AppStepper, { props: { steps, currentStep: 1, class: 'my-class' } })
    expect(wrapper.find('.my-class').exists()).toBe(true)
  })
})
