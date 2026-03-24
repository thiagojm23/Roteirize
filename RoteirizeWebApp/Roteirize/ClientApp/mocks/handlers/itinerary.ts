import { http, HttpResponse } from 'msw'
import { inertiaPage } from '../inertia'
import { mockItineraries, mockItineraryPlan } from '../data'

export const itineraryHandlers = [
  http.get('/app/itineraries', () => {
    return inertiaPage('Itinerary/List', { itineraries: mockItineraries }, '/app/itineraries')
  }),

  http.get('/app/itineraries/new', () => {
    return inertiaPage('Itinerary/Create', {}, '/app/itineraries/new')
  }),

  http.get('/app/itineraries/:id', ({ params }) => {
    const id = params['id'] as string
    const plan = {
      ...mockItineraryPlan,
      itinerary: { ...mockItineraryPlan.itinerary, id },
    }
    return inertiaPage('Itinerary/Plan', plan, `/app/itineraries/${id}`)
  }),

  http.post('/app/itineraries', () => {
    return new HttpResponse(null, {
      status: 303,
      headers: { Location: '/app/itineraries' },
    })
  }),

  http.post('/app/itineraries/:id/days/:dayNumber/entries', ({ params }) => {
    const id = params['id'] as string
    return new HttpResponse(null, {
      status: 303,
      headers: { Location: `/app/itineraries/${id}` },
    })
  }),

  http.delete('/app/itineraries/:id/days/:dayNumber/entries/:entryId', ({ params }) => {
    const id = params['id'] as string
    return new HttpResponse(null, {
      status: 303,
      headers: { Location: `/app/itineraries/${id}` },
    })
  }),
]
