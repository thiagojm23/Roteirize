import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import SetupStep from '@/features/itinerary/components/SetupStep.vue'
import { useItineraryStore } from '@/features/itinerary/stores/itinerary'

describe('SetupStep', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders origin, departure and arrival fields', () => {
    const wrapper = mount(SetupStep)
    expect(wrapper.text()).toContain('Cidade de origem')
    expect(wrapper.text()).toContain('Data de ida')
    expect(wrapper.text()).toContain('Data de volta')
  })

  it('renders add destination button', () => {
    const wrapper = mount(SetupStep)
    expect(wrapper.text()).toContain('Adicionar destino')
  })

  it('shows empty state when no destinations', () => {
    const wrapper = mount(SetupStep)
    expect(wrapper.text()).toContain('Nenhum destino adicionado')
  })

  it('adds a destination when button is clicked', async () => {
    const wrapper = mount(SetupStep)
    const store = useItineraryStore()
    await wrapper.find('button').trigger('click')
    expect(store.setupData.destinations.length).toBe(1)
  })

  it('validate() fails when origin is empty', () => {
    const wrapper = mount(SetupStep)
    const valid = (wrapper.vm as unknown as { validate: () => boolean }).validate()
    expect(valid).toBe(false)
  })
})
