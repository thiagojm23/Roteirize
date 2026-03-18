import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppDropzone from '@/components/app/AppDropzone.vue'

describe('AppDropzone', () => {
  it('renders drop zone text', () => {
    const wrapper = mount(AppDropzone, { props: {} })
    expect(wrapper.text()).toContain('Arraste arquivos')
  })

  it('accepts files via accept prop', () => {
    const wrapper = mount(AppDropzone, { props: { accept: 'image/*' } })
    const input = wrapper.find('input[type="file"]')
    expect(input.attributes('accept')).toBe('image/*')
  })

  it('applies custom class', () => {
    const wrapper = mount(AppDropzone, { props: { class: 'my-drop' } })
    expect(wrapper.find('.my-drop').exists()).toBe(true)
  })

  it('shows drag-over state', async () => {
    const wrapper = mount(AppDropzone)
    await wrapper.find('[data-dropzone]').trigger('dragover')
    expect(wrapper.find('[data-dropzone]').classes()).toContain('border-primary')
  })

  it('emits update:modelValue when files are added via input', async () => {
    const wrapper = mount(AppDropzone, { props: { maxFiles: 3 } })
    const file = new File(['test'], 'test.png', { type: 'image/png' })
    const input = wrapper.find('input[type="file"]')
    // Simulate file selection
    Object.defineProperty(input.element, 'files', { value: [file] })
    await input.trigger('change')
    expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toHaveLength(1)
  })
})
