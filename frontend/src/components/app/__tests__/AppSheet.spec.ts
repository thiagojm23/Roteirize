import { describe, it, expect, afterEach } from 'vitest'
import { nextTick } from 'vue'
import { mount, flushPromises } from '@vue/test-utils'
import AppSheet from '@/components/app/AppSheet.vue'

describe('AppSheet', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('does not render content when closed', async () => {
    const wrapper = mount(AppSheet, {
      props: { modelValue: false },
      slots: { default: '<p>Hidden</p>' },
      attachTo: document.body,
    })
    await flushPromises()
    expect(document.body.textContent).not.toContain('Hidden')
    wrapper.unmount()
  })

  it('renders default slot content when open', async () => {
    const wrapper = mount(AppSheet, {
      props: { modelValue: true },
      slots: { default: '<p>Sheet body</p>' },
      attachTo: document.body,
    })
    await flushPromises()
    expect(document.body.textContent).toContain('Sheet body')
    wrapper.unmount()
  })

  it('renders title when title prop is provided', async () => {
    const wrapper = mount(AppSheet, {
      props: { modelValue: true, title: 'Menu' },
      attachTo: document.body,
    })
    await flushPromises()
    expect(document.body.textContent).toContain('Menu')
    wrapper.unmount()
  })

  it('applies right side classes by default', async () => {
    const wrapper = mount(AppSheet, {
      props: { modelValue: true },
      attachTo: document.body,
    })
    await flushPromises()
    const content = document.body.querySelector('[data-slot="sheet-content"]')
    expect(content?.className).toContain('right-0')
    wrapper.unmount()
  })

  it('applies left side classes when side="left"', async () => {
    const wrapper = mount(AppSheet, {
      props: { modelValue: true, side: 'left' },
      attachTo: document.body,
    })
    await flushPromises()
    const content = document.body.querySelector('[data-slot="sheet-content"]')
    expect(content?.className).toContain('left-0')
    wrapper.unmount()
  })

  it('emits update:modelValue false when close button is clicked', async () => {
    const wrapper = mount(AppSheet, {
      props: { modelValue: true },
      attachTo: document.body,
    })
    await flushPromises()
    const closeBtn = document.body.querySelector('[data-slot="sheet-close"]') as HTMLElement
    closeBtn?.click()
    await nextTick()
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    wrapper.unmount()
  })

  it('applies custom class prop', async () => {
    const wrapper = mount(AppSheet, {
      props: { modelValue: true, class: 'my-sheet' },
      attachTo: document.body,
    })
    await flushPromises()
    const content = document.body.querySelector('[data-slot="sheet-content"]')
    expect(content?.className).toContain('my-sheet')
    wrapper.unmount()
  })
})
