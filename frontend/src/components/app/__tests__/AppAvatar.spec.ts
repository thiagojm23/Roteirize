import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppAvatar from '@/components/app/AppAvatar.vue'

describe('AppAvatar', () => {
  it('renders fallback initials when no src', () => {
    const wrapper = mount(AppAvatar, { props: { fallback: 'TJ' } })
    expect(wrapper.text()).toContain('TJ')
  })

  it('renders fallback when src is empty', () => {
    const wrapper = mount(AppAvatar, { props: { src: '', fallback: 'AB' } })
    expect(wrapper.text()).toContain('AB')
  })

  it('renders image when src is provided', () => {
    const wrapper = mount(AppAvatar, { props: { src: 'https://example.com/avatar.jpg', alt: 'User' } })
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('https://example.com/avatar.jpg')
    expect(img.attributes('alt')).toBe('User')
  })

  it('applies sm size classes', () => {
    const wrapper = mount(AppAvatar, { props: { fallback: 'A', size: 'sm' } })
    expect(wrapper.find('[data-slot="avatar"]').classes()).toContain('size-8')
  })

  it('applies md size classes by default', () => {
    const wrapper = mount(AppAvatar, { props: { fallback: 'A' } })
    expect(wrapper.find('[data-slot="avatar"]').classes()).toContain('size-10')
  })

  it('applies lg size classes', () => {
    const wrapper = mount(AppAvatar, { props: { fallback: 'A', size: 'lg' } })
    expect(wrapper.find('[data-slot="avatar"]').classes()).toContain('size-12')
  })

  it('applies xl size classes', () => {
    const wrapper = mount(AppAvatar, { props: { fallback: 'A', size: 'xl' } })
    expect(wrapper.find('[data-slot="avatar"]').classes()).toContain('size-16')
  })

  it('applies custom class prop', () => {
    const wrapper = mount(AppAvatar, { props: { fallback: 'A', class: 'ring-2' } })
    expect(wrapper.find('[data-slot="avatar"]').classes()).toContain('ring-2')
  })
})
