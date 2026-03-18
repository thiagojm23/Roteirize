import { describe, it, expect, afterEach } from 'vitest'
import { nextTick } from 'vue'
import { mount, flushPromises } from '@vue/test-utils'
import AppModal from '@/components/app/AppModal.vue'

describe('AppModal', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('does not render content when closed', async () => {
    const wrapper = mount(AppModal, {
      props: { open: false },
      slots: { default: '<p>Oculto</p>' },
      attachTo: document.body,
    })
    await flushPromises()
    expect(document.body.textContent).not.toContain('Oculto')
    wrapper.unmount()
  })

  it('renders without title and description when omitted', async () => {
    const wrapper = mount(AppModal, {
      props: { open: true },
      attachTo: document.body,
    })
    await flushPromises()
    expect(document.body.querySelector('[data-slot="dialog-title"]')).toBeNull()
    wrapper.unmount()
  })

  it('renders title text when title prop is provided', async () => {
    const wrapper = mount(AppModal, {
      props: { open: true, title: 'Minha Viagem' },
      attachTo: document.body,
    })
    await flushPromises()
    expect(document.body.textContent).toContain('Minha Viagem')
    wrapper.unmount()
  })

  it('renders description text when description prop is provided', async () => {
    const wrapper = mount(AppModal, {
      props: { open: true, description: 'Detalhes da viagem' },
      attachTo: document.body,
    })
    await flushPromises()
    expect(document.body.textContent).toContain('Detalhes da viagem')
    wrapper.unmount()
  })

  it('renders default slot content', async () => {
    const wrapper = mount(AppModal, {
      props: { open: true },
      slots: { default: '<p>Conteúdo do modal</p>' },
      attachTo: document.body,
    })
    await flushPromises()
    expect(document.body.textContent).toContain('Conteúdo do modal')
    wrapper.unmount()
  })

  it('renders footer slot content when provided', async () => {
    const wrapper = mount(AppModal, {
      props: { open: true },
      slots: { footer: '<button>Confirmar</button>' },
      attachTo: document.body,
    })
    await flushPromises()
    expect(document.body.textContent).toContain('Confirmar')
    wrapper.unmount()
  })

  it('applies sm size class max-w-sm to dialog content', async () => {
    const wrapper = mount(AppModal, {
      props: { open: true, size: 'sm' },
      attachTo: document.body,
    })
    await flushPromises()
    const content = document.body.querySelector('[data-slot="dialog-content"]')
    expect(content?.className).toContain('max-w-sm')
    wrapper.unmount()
  })

  it('applies lg size class max-w-2xl to dialog content', async () => {
    const wrapper = mount(AppModal, {
      props: { open: true, size: 'lg' },
      attachTo: document.body,
    })
    await flushPromises()
    const content = document.body.querySelector('[data-slot="dialog-content"]')
    expect(content?.className).toContain('max-w-2xl')
    wrapper.unmount()
  })

  it('applies custom class prop to dialog content', async () => {
    const wrapper = mount(AppModal, {
      props: { open: true, class: 'my-modal-class' },
      attachTo: document.body,
    })
    await flushPromises()
    const content = document.body.querySelector('[data-slot="dialog-content"]')
    expect(content?.className).toContain('my-modal-class')
    wrapper.unmount()
  })

  it('emits update:open false when close button is clicked', async () => {
    const wrapper = mount(AppModal, {
      props: { open: true },
      attachTo: document.body,
    })
    await flushPromises()
    const closeButton = document.body.querySelector('[data-slot="dialog-close"]') as HTMLElement
    closeButton?.click()
    await nextTick()
    expect(wrapper.emitted('update:open')).toBeTruthy()
    const emitted = wrapper.emitted('update:open') as boolean[][]
    expect(emitted[0]).toEqual([false])
    wrapper.unmount()
  })
})
