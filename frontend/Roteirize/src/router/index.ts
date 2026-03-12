import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth', top: 64 }
    return { top: 0 }
  },
  routes: [
    // Public routes
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { redirectIfAuthenticated: true },
    },

    // Auth routes — redirect to dashboard if already logged in
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue'),
      meta: { redirectIfAuthenticated: true },
    },
    {
      path: '/cadastro',
      name: 'register',
      component: () => import('@/views/auth/RegisterView.vue'),
      meta: { redirectIfAuthenticated: true },
    },
    {
      path: '/esqueci-senha',
      name: 'forgot-password',
      component: () => import('@/views/auth/ForgotPasswordView.vue'),
      meta: { redirectIfAuthenticated: true },
    },
    {
      path: '/redefinir-senha',
      name: 'reset-password',
      component: () => import('@/views/auth/ResetPasswordView.vue'),
      // token comes via ?token= query string
    },

    // Protected routes
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/perfil',
      name: 'profile',
      component: () => import('@/views/DashboardView.vue'), // placeholder
      meta: { requiresAuth: true },
    },

    // Catch-all 404
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'home' },
    },
  ],
})

let isFirtsNavigation = true

router.beforeEach(async (to) => {
  const authStore = useAuthStore()

  // Try to restore session on first navigation
  if (!authStore.isAuthenticated && isFirtsNavigation) {
    await authStore.fetchCurrentUser()
  }

  isFirtsNavigation = false

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if (to.meta.redirectIfAuthenticated && authStore.isAuthenticated) {
    return { name: 'dashboard' }
  }
})

export default router
