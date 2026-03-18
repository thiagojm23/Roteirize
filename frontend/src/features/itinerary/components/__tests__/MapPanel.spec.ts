import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import MapPanel from '@/features/itinerary/components/MapPanel.vue'

// Mock Leaflet
vi.mock('leaflet', () => {
  const mockMap = {
    setView: vi.fn().mockReturnThis(),
    fitBounds: vi.fn(),
    removeLayer: vi.fn(),
  }
  const mockLayerGroup = { addTo: vi.fn().mockReturnThis(), clearLayers: vi.fn() }
  const mockMarker = { bindPopup: vi.fn().mockReturnValue({ addTo: vi.fn() }) }
  const mockPolyline = { addTo: vi.fn().mockReturnThis() }

  return {
    default: {
      map: vi.fn(() => mockMap),
      tileLayer: vi.fn(() => ({ addTo: vi.fn() })),
      layerGroup: vi.fn(() => mockLayerGroup),
      marker: vi.fn(() => mockMarker),
      polyline: vi.fn(() => mockPolyline),
      latLngBounds: vi.fn(() => ({})),
    },
  }
})

vi.mock('leaflet/dist/leaflet.css', () => ({}))

describe('MapPanel', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders a container element', () => {
    const wrapper = mount(MapPanel, { props: { destinations: [] } })
    expect(wrapper.find('[ref="mapContainerRef"]').exists() || wrapper.find('div').exists()).toBe(true)
  })

  it('applies custom class', () => {
    const wrapper = mount(MapPanel, {
      props: {
        destinations: [],
        class: 'my-map',
      },
    })
    expect(wrapper.find('.my-map').exists()).toBe(true)
  })
})
