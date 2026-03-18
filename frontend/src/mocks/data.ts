import type { User } from '@/features/auth/stores/auth'
import type { Itinerary, DayPlan, CostSummary } from '@/features/itinerary/types'

export const mockUser: User = {
  id: 'user-001',
  name: 'João Silva',
  email: 'joao@example.com',
  avatarUrl: undefined,
}

export const mockCredentials = {
  email: 'joao@example.com',
  password: 'Senha123',
}

export const mockItineraries: Itinerary[] = [
  {
    id: 'itin-001',
    title: 'Europa Clássica',
    status: 'planning',
    startDate: '2026-06-15',
    endDate: '2026-06-29',
    ownerId: 'user-001',
    destinations: [
      { id: 'dest-001', name: 'Paris', country: 'França', lat: 48.8566, lng: 2.3522, durationDays: 5, order: 1 },
      { id: 'dest-002', name: 'Roma', country: 'Itália', lat: 41.9028, lng: 12.4964, durationDays: 5, order: 2 },
      { id: 'dest-003', name: 'Barcelona', country: 'Espanha', lat: 41.3874, lng: 2.1686, durationDays: 5, order: 3 },
    ],
  },
  {
    id: 'itin-002',
    title: 'Nordeste Brasileiro',
    status: 'draft',
    startDate: '2026-09-01',
    endDate: '2026-09-07',
    ownerId: 'user-001',
    destinations: [
      { id: 'dest-004', name: 'Recife', country: 'Brasil', lat: -8.0476, lng: -34.877, durationDays: 3, order: 1 },
      { id: 'dest-005', name: 'Salvador', country: 'Brasil', lat: -12.9714, lng: -38.5124, durationDays: 4, order: 2 },
    ],
  },
  {
    id: 'itin-003',
    title: 'Japão 2026',
    status: 'ready',
    startDate: '2026-11-10',
    endDate: '2026-11-19',
    ownerId: 'user-001',
    destinations: [
      { id: 'dest-006', name: 'Tóquio', country: 'Japão', lat: 35.6762, lng: 139.6503, durationDays: 5, order: 1 },
      { id: 'dest-007', name: 'Quioto', country: 'Japão', lat: 35.0116, lng: 135.7681, durationDays: 3, order: 2 },
      { id: 'dest-008', name: 'Osaka', country: 'Japão', lat: 34.6937, lng: 135.5023, durationDays: 2, order: 3 },
    ],
  },
]

export const mockDayPlans: Record<string, DayPlan[]> = {
  'itin-001': [
    {
      dayNumber: 1,
      date: '2026-06-15',
      entries: [
        {
          id: 'entry-001',
          hourStart: '09:00',
          hourEnd: '11:00',
          locationName: 'Torre Eiffel',
          cost: 26,
          classification: 'tour',
          photos: [],
          notes: 'Comprar ingresso com antecedência',
        },
        {
          id: 'entry-002',
          hourStart: '12:00',
          hourEnd: '13:30',
          locationName: 'Le Petit Cler',
          cost: 45,
          classification: 'food',
          photos: [],
          notes: 'Restaurante próximo à torre',
        },
        {
          id: 'entry-003',
          hourStart: '14:30',
          hourEnd: '17:00',
          locationName: 'Museu do Louvre',
          cost: 17,
          classification: 'museum',
          photos: [],
          notes: 'Entrada gratuita primeiro domingo do mês',
        },
      ],
    },
    {
      dayNumber: 2,
      date: '2026-06-16',
      entries: [
        {
          id: 'entry-004',
          hourStart: '10:00',
          hourEnd: '12:00',
          locationName: 'Montmartre',
          cost: 0,
          classification: 'tour',
          photos: [],
          notes: 'Passeio a pé pelo bairro',
        },
        {
          id: 'entry-005',
          hourStart: '13:00',
          hourEnd: '14:00',
          locationName: 'Café des Deux Moulins',
          cost: 30,
          classification: 'food',
          photos: [],
          notes: 'Café do filme Amélie Poulain',
        },
      ],
    },
  ],
  'itin-002': [
    {
      dayNumber: 1,
      date: '2026-09-01',
      entries: [
        {
          id: 'entry-006',
          hourStart: '08:00',
          hourEnd: '12:00',
          locationName: 'Praia de Boa Viagem',
          cost: 0,
          classification: 'tour',
          photos: [],
          notes: 'Levar protetor solar',
        },
        {
          id: 'entry-007',
          hourStart: '12:30',
          hourEnd: '14:00',
          locationName: 'Restaurante Leite',
          cost: 80,
          classification: 'food',
          photos: [],
          notes: 'Reservar mesa',
        },
      ],
    },
  ],
  'itin-003': [
    {
      dayNumber: 1,
      date: '2026-11-10',
      entries: [
        {
          id: 'entry-008',
          hourStart: '10:00',
          hourEnd: '12:00',
          locationName: 'Templo Senso-ji',
          cost: 0,
          classification: 'tour',
          photos: [],
          notes: 'Templo mais antigo de Tóquio',
        },
        {
          id: 'entry-009',
          hourStart: '13:00',
          hourEnd: '14:00',
          locationName: 'Ramen Ichiran',
          cost: 15,
          classification: 'food',
          photos: [],
          notes: '',
        },
        {
          id: 'entry-010',
          hourStart: '15:00',
          hourEnd: '18:00',
          locationName: 'Akihabara',
          cost: 50,
          classification: 'shopping',
          photos: [],
          notes: 'Distrito eletrônico',
        },
      ],
    },
  ],
}

export const mockCostSummaries: Record<string, CostSummary> = {
  'itin-001': {
    totalSpent: 118,
    budgetRemaining: 2882,
    perDayAverage: 59,
    byCategory: {
      food: 75,
      tour: 26,
      museum: 17,
      transport: 0,
      hotel: 0,
      shopping: 0,
      entertainment: 0,
      other: 0,
    },
  },
  'itin-002': {
    totalSpent: 80,
    budgetRemaining: 1920,
    perDayAverage: 80,
    byCategory: {
      food: 80,
      tour: 0,
      museum: 0,
      transport: 0,
      hotel: 0,
      shopping: 0,
      entertainment: 0,
      other: 0,
    },
  },
  'itin-003': {
    totalSpent: 65,
    budgetRemaining: 4935,
    perDayAverage: 65,
    byCategory: {
      food: 15,
      tour: 0,
      museum: 0,
      transport: 0,
      hotel: 0,
      shopping: 50,
      entertainment: 0,
      other: 0,
    },
  },
}
