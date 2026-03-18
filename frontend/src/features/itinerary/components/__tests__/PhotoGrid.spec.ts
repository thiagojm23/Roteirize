import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PhotoGrid from '@/features/itinerary/components/PhotoGrid.vue'

describe('PhotoGrid', () => {
  it('renders nothing when photos is empty', () => {
    const wrapper = mount(PhotoGrid, { props: { photos: [] } })
    expect(wrapper.findAll('img').length).toBe(0)
  })

  it('renders photos up to maxVisible', () => {
    const photos = ['a.jpg', 'b.jpg', 'c.jpg', 'd.jpg', 'e.jpg']
    const wrapper = mount(PhotoGrid, { props: { photos, maxVisible: 3 } })
    expect(wrapper.findAll('img').length).toBe(3)
  })

  it('shows +N remaining indicator', () => {
    const photos = ['a.jpg', 'b.jpg', 'c.jpg', 'd.jpg', 'e.jpg']
    const wrapper = mount(PhotoGrid, { props: { photos, maxVisible: 3 } })
    expect(wrapper.text()).toContain('+2')
  })

  it('does not show remaining when all visible', () => {
    const photos = ['a.jpg', 'b.jpg']
    const wrapper = mount(PhotoGrid, { props: { photos, maxVisible: 4 } })
    expect(wrapper.text()).not.toContain('+')
  })
})
