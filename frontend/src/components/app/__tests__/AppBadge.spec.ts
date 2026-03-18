import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppBadge from '@/components/app/AppBadge.vue'

describe('AppBadge', () => {
  it('renders slot content', () => {
    const wrapper = mount(AppBadge, { slots: { default: 'Novo' } })
    expect(wrapper.text()).toContain('Novo')
  })

  it('applies default variant classes', () => {
    const wrapper = mount(AppBadge, { slots: { default: 'Tag' } })
    expect(wrapper.find('span').classes()).toContain('bg-primary')
  })

  it('applies secondary variant', () => {
    const wrapper = mount(AppBadge, { props: { variant: 'secondary' }, slots: { default: 'Tag' } })
    expect(wrapper.find('span').classes()).toContain('bg-secondary')
  })

  it('applies outline variant', () => {
    const wrapper = mount(AppBadge, { props: { variant: 'outline' }, slots: { default: 'Tag' } })
    expect(wrapper.find('span').classes()).toContain('text-foreground')
  })

  it('applies destructive variant', () => {
    const wrapper = mount(AppBadge, { props: { variant: 'destructive' }, slots: { default: 'Tag' } })
    expect(wrapper.find('span').classes()).toContain('bg-destructive')
  })

  it('applies success variant', () => {
    const wrapper = mount(AppBadge, { props: { variant: 'success' }, slots: { default: 'Tag' } })
    expect(wrapper.find('span').classes()).toContain('bg-success')
  })

  it('applies warning variant', () => {
    const wrapper = mount(AppBadge, { props: { variant: 'warning' }, slots: { default: 'Tag' } })
    expect(wrapper.find('span').classes()).toContain('bg-warning')
  })

  it('applies sm size classes', () => {
    const wrapper = mount(AppBadge, { props: { size: 'sm' }, slots: { default: 'Tag' } })
    expect(wrapper.find('span').classes()).toContain('text-[10px]')
  })

  it('applies lg size classes', () => {
    const wrapper = mount(AppBadge, { props: { size: 'lg' }, slots: { default: 'Tag' } })
    expect(wrapper.find('span').classes()).toContain('text-sm')
  })

  it('applies custom class prop', () => {
    const wrapper = mount(AppBadge, { props: { class: 'ml-2' }, slots: { default: 'Tag' } })
    expect(wrapper.find('span').classes()).toContain('ml-2')
  })
})
