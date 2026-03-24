import { http, HttpResponse } from 'msw'
import { inertiaPage } from '../inertia'

export const authHandlers = [
  http.get('/login', () => {
    return inertiaPage('Auth/Login', {}, '/login')
  }),

  http.get('/cadastro', () => {
    return inertiaPage('Auth/Register', {}, '/cadastro')
  }),

  http.get('/esqueci-senha', () => {
    return inertiaPage('Auth/ForgotPassword', {}, '/esqueci-senha')
  }),

  http.post('/auth/login', () => {
    return new HttpResponse(null, {
      status: 303,
      headers: { Location: '/app' },
    })
  }),

  http.post('/auth/register', () => {
    return new HttpResponse(null, {
      status: 303,
      headers: { Location: '/app' },
    })
  }),

  http.post('/auth/forgot-password', () => {
    return inertiaPage('Auth/ForgotPassword', {}, '/esqueci-senha')
  }),

  http.post('/auth/logout', () => {
    return new HttpResponse(null, {
      status: 303,
      headers: { Location: '/' },
    })
  }),
]
