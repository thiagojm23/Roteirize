import { http, HttpResponse } from 'msw'
import { mockUser, mockItineraries, mockDayPlans, mockCostSummaries } from './data'
import type { Itinerary, DayEntry } from '@/features/itinerary/types'

const BASE = '/api'

// Simulate a simple in-memory session flag
let isLoggedIn = false

// Deep-clone mock data so mutations don't leak between requests
let itineraries = structuredClone(mockItineraries)
let dayPlans = structuredClone(mockDayPlans)
let costSummaries = structuredClone(mockCostSummaries)

let nextEntryId = 100

export function resetMockData() {
  itineraries = structuredClone(mockItineraries)
  dayPlans = structuredClone(mockDayPlans)
  costSummaries = structuredClone(mockCostSummaries)
  nextEntryId = 100
  isLoggedIn = false
}

export const handlers = [
  // ── Auth ──────────────────────────────────────────────────────────────────

  http.post(`${BASE}/auth/login`, async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string }

    if (body.email === 'joao@example.com' && body.password === 'Senha123') {
      isLoggedIn = true
      return HttpResponse.json({ user: mockUser }, { status: 200 })
    }

    return HttpResponse.json(
      { message: 'E-mail ou senha incorretos' },
      { status: 401 },
    )
  }),

  http.post(`${BASE}/auth/register`, async ({ request }) => {
    const body = (await request.json()) as {
      name: string
      email: string
      cpf: string
      password: string
    }

    if (!body.name || !body.email || !body.cpf || !body.password) {
      return HttpResponse.json(
        { message: 'Todos os campos são obrigatórios' },
        { status: 422 },
      )
    }

    isLoggedIn = true
    return HttpResponse.json(
      {
        user: {
          id: 'user-new',
          name: body.name,
          email: body.email,
        },
      },
      { status: 201 },
    )
  }),

  http.post(`${BASE}/auth/forgot-password`, async () => {
    return HttpResponse.json({ message: 'E-mail enviado' }, { status: 200 })
  }),

  http.get(`${BASE}/auth/me`, () => {
    if (isLoggedIn) {
      return HttpResponse.json({ user: mockUser }, { status: 200 })
    }
    return HttpResponse.json({ message: 'Não autorizado' }, { status: 401 })
  }),

  http.post(`${BASE}/auth/logout`, () => {
    isLoggedIn = false
    return HttpResponse.json({}, { status: 200 })
  }),

  http.post(`${BASE}/auth/refresh`, () => {
    if (isLoggedIn) {
      return HttpResponse.json({ message: 'Token renovado' }, { status: 200 })
    }
    return HttpResponse.json({ message: 'Sessão expirada' }, { status: 401 })
  }),

  // ── Itineraries ─────────────────────────────────────────────────────────

  http.get(`${BASE}/itineraries`, () => {
    return HttpResponse.json({ itineraries }, { status: 200 })
  }),

  http.post(`${BASE}/itineraries`, async ({ request }) => {
    const body = (await request.json()) as { title: string }
    const newItinerary: Itinerary = {
      id: `itin-${Date.now()}`,
      title: body.title,
      status: 'draft',
      startDate: '',
      endDate: '',
      ownerId: 'user-001',
      destinations: [],
      ...body,
    }
    itineraries.push(newItinerary)
    dayPlans[newItinerary.id] = []
    return HttpResponse.json({ itinerary: newItinerary }, { status: 201 })
  }),

  http.get(`${BASE}/itineraries/:id`, ({ params }) => {
    const itinerary = itineraries.find((i) => i.id === params.id)
    if (!itinerary) {
      return HttpResponse.json({ message: 'Roteiro não encontrado' }, { status: 404 })
    }
    return HttpResponse.json({ itinerary }, { status: 200 })
  }),

  http.put(`${BASE}/itineraries/:id`, async ({ params, request }) => {
    const body = (await request.json()) as Partial<Itinerary>
    const idx = itineraries.findIndex((i) => i.id === params.id)
    if (idx === -1) {
      return HttpResponse.json({ message: 'Roteiro não encontrado' }, { status: 404 })
    }
    itineraries[idx] = { ...itineraries[idx], ...body }
    return HttpResponse.json({ itinerary: itineraries[idx] }, { status: 200 })
  }),

  http.delete(`${BASE}/itineraries/:id`, ({ params }) => {
    const idx = itineraries.findIndex((i) => i.id === params.id)
    if (idx === -1) {
      return HttpResponse.json({ message: 'Roteiro não encontrado' }, { status: 404 })
    }
    itineraries.splice(idx, 1)
    delete dayPlans[params.id as string]
    delete costSummaries[params.id as string]
    return new HttpResponse(null, { status: 204 })
  }),

  // ── Day Plans ────────────────────────────────────────────────────────────

  http.get(`${BASE}/itineraries/:id/days`, ({ params }) => {
    const days = dayPlans[params.id as string] ?? []
    return HttpResponse.json({ days }, { status: 200 })
  }),

  http.get(`${BASE}/itineraries/:id/days/:dayNumber`, ({ params }) => {
    const days = dayPlans[params.id as string] ?? []
    const day = days.find((d) => d.dayNumber === Number(params.dayNumber))
    if (!day) {
      return HttpResponse.json({ message: 'Dia não encontrado' }, { status: 404 })
    }
    return HttpResponse.json({ day }, { status: 200 })
  }),

  // ── Entries ──────────────────────────────────────────────────────────────

  http.post(`${BASE}/itineraries/:id/days/:dayNumber/entries`, async ({ params, request }) => {
    const body = (await request.json()) as Omit<DayEntry, 'id'>
    const entry: DayEntry = { ...body, id: `entry-${nextEntryId++}` }
    const days = dayPlans[params.id as string] ?? []
    const dayNum = Number(params.dayNumber)
    let day = days.find((d) => d.dayNumber === dayNum)
    if (!day) {
      day = { dayNumber: dayNum, date: '', entries: [] }
      days.push(day)
      dayPlans[params.id as string] = days
    }
    day.entries.push(entry)
    return HttpResponse.json({ entry }, { status: 201 })
  }),

  http.put(`${BASE}/itineraries/:id/days/:dayNumber/entries/:entryId`, async ({ params, request }) => {
    const body = (await request.json()) as Partial<DayEntry>
    const days = dayPlans[params.id as string] ?? []
    const day = days.find((d) => d.dayNumber === Number(params.dayNumber))
    if (!day) {
      return HttpResponse.json({ message: 'Dia não encontrado' }, { status: 404 })
    }
    const idx = day.entries.findIndex((e) => e.id === params.entryId)
    if (idx === -1) {
      return HttpResponse.json({ message: 'Entrada não encontrada' }, { status: 404 })
    }
    day.entries[idx] = { ...day.entries[idx], ...body }
    return HttpResponse.json({ entry: day.entries[idx] }, { status: 200 })
  }),

  http.delete(`${BASE}/itineraries/:id/days/:dayNumber/entries/:entryId`, ({ params }) => {
    const days = dayPlans[params.id as string] ?? []
    const day = days.find((d) => d.dayNumber === Number(params.dayNumber))
    if (day) {
      day.entries = day.entries.filter((e) => e.id !== params.entryId)
    }
    return new HttpResponse(null, { status: 204 })
  }),

  // ── Costs ────────────────────────────────────────────────────────────────

  http.get(`${BASE}/itineraries/:id/costs`, ({ params }) => {
    const summary = costSummaries[params.id as string]
    if (!summary) {
      return HttpResponse.json(
        {
          totalSpent: 0,
          budgetRemaining: 0,
          perDayAverage: 0,
          byCategory: {
            food: 0, tour: 0, museum: 0, transport: 0,
            hotel: 0, shopping: 0, entertainment: 0, other: 0,
          },
        },
        { status: 200 },
      )
    }
    return HttpResponse.json(summary, { status: 200 })
  }),
]
