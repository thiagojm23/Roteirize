import { http } from 'msw'
import { inertiaPage } from '../inertia'

export const homeHandlers = [
  http.get('/', () => {
    return inertiaPage('Home/Index', { title: 'Roteirize' }, '/')
  }),
]
