import { homeHandlers } from './home'
import { authHandlers } from './auth'
import { dashboardHandlers } from './dashboard'
import { itineraryHandlers } from './itinerary'

export const handlers = [
  ...homeHandlers,
  ...authHandlers,
  ...dashboardHandlers,
  ...itineraryHandlers,
]
