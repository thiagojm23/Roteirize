import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppSpinner from '@/components/app/AppSpinner.vue'

describe('AppSpinner', () => {
  it('renders an svg with animate-spin class', () => {
    const wrapper = mount(AppSpinner)
    expect(wrapper.find('svg').classes()).toContain('animate-spin')
  })

  it('applies md size class by default', () => {
    const wrapper = mount(AppSpinner)
    expect(wrapper.find('svg').classes()).toContain('h-6')
    expect(wrapper.find('svg').classes()).toContain('w-6')
  })

  it('applies sm size class', () => {
    const wrapper = mount(AppSpinner, { props: { size: 'sm' } })
    expect(wrapper.find('svg').classes()).toContain('h-4')
  })

  it('applies lg size class', () => {
    const wrapper = mount(AppSpinner, { props: { size: 'lg' } })
    expect(wrapper.find('svg').classes()).toContain('h-8')
  })

  it('applies xl size class', () => {
    const wrapper = mount(AppSpinner, { props: { size: 'xl' } })
    expect(wrapper.find('svg').classes()).toContain('h-10')
  })

  it('applies custom class prop', () => {
    const wrapper = mount(AppSpinner, { props: { class: 'text-primary' } })
    expect(wrapper.find('svg').classes()).toContain('text-primary')
  })
})
