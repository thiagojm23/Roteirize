export type ActivityClassification =
  | 'food'
  | 'tour'
  | 'museum'
  | 'transport'
  | 'hotel'
  | 'shopping'
  | 'entertainment'
  | 'other'

export interface Itinerary {
  id: string
  title: string
  status: 'draft' | 'planning' | 'ready' | 'completed'
  startDate: string
  endDate: string
  ownerId: string
  destinations: Destination[]
}

export interface Destination {
  id: string
  name: string
  country: string
  lat: number
  lng: number
  durationDays: number
  order: number
}

export interface TripSetup {
  departureDate: string
  arrivalDate: string
  origin: string
  destinations: Omit<Destination, 'id'>[]
}

export interface Budget {
  totalBudget: number
  maxPerDay?: number
  travelers: number
  luggageItems?: number
  currency: string
}

export interface DayPlan {
  dayNumber: number
  date: string
  entries: DayEntry[]
}

export interface DayEntry {
  id: string
  hourStart: string
  hourEnd: string
  locationName: string
  cost: number
  classification: ActivityClassification
  photos: string[]
  notes: string
}

export interface CostSummary {
  totalSpent: number
  budgetRemaining: number
  perDayAverage: number
  byCategory: Record<ActivityClassification, number>
}

export interface User {
  id: string
  name: string
  email: string
  avatarUrl?: string
}
