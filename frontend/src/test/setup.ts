import { afterAll, afterEach, beforeAll } from 'vitest'
import { server } from '@/mocks/server'
import { resetMockData } from '@/mocks/handlers'

// Start MSW server before all tests, reset handlers between tests, close after all
beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }))
afterEach(() => {
  server.resetHandlers()
  resetMockData()
})
afterAll(() => server.close())
