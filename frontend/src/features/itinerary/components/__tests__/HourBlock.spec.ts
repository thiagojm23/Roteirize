import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HourBlock from '@/features/itinerary/components/HourBlock.vue'
import type { DayEntry } from '@/features/itinerary/types'

const entry: DayEntry = {
  id: 'e1',
  hourStart: '09:00',
  hourEnd: '11:00',
  locationName: 'Torre Eiffel',
  cost: 26,
  classification: 'tour',
  photos: [],
  notes: 'Reservar ingresso',
}

describe('HourBlock', () => {
  it('renders entry info in title', () => {
    const wrapper = mount(HourBlock, { props: { entry } })
    expect(wrapper.text()).toContain('09:00')
    expect(wrapper.text()).toContain('11:00')
    expect(wrapper.text()).toContain('Torre Eiffel')
  })

  it('shows classification badge when expanded', async () => {
    const wrapper = mount(HourBlock, { props: { entry } })
    // Click to expand
    await wrapper.find('[data-collapsible-trigger]').trigger('click')
    expect(wrapper.text()).toContain('Passeio')
  })

  it('emits remove when delete button clicked', async () => {
    const wrapper = mount(HourBlock, { props: { entry } })
    // Expand first
    await wrapper.find('[data-collapsible-trigger]').trigger('click')
    const deleteBtn = wrapper.findAll('button').find((b) => b.find('.lucide-trash-2').exists() || b.html().includes('Trash'))
    if (deleteBtn) await deleteBtn.trigger('click')
    expect(wrapper.emitted('remove')).toBeTruthy()
  })
})
