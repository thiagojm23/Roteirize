import { http } from 'msw'
import { inertiaPage } from '../inertia'
import { mockUser, mockItineraries } from '../data'

export const dashboardHandlers = [
  http.get('/app', () => {
    return inertiaPage(
      'Dashboard/Index',
      { user: mockUser, itineraries: mockItineraries, collaborations: 0 },
      '/app',
    )
  }),
]
