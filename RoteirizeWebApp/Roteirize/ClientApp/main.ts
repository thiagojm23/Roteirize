import { createApp, h, type DefineComponent } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import type { Page, PageProps } from '@inertiajs/core'
import { TooltipProvider } from 'reka-ui'

function initializeTheme() {
  const stored = localStorage.getItem('roteirize-theme')
  if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  }
}

async function main() {
  initializeTheme()

  let page: Page<PageProps> | undefined

  if (import.meta.env.VITE_MSW_ENABLED === 'true') {
    const { worker } = await import('./mocks/browser')
    await worker.start({ onUnhandledRequest: 'bypass' })

    const response = await fetch(window.location.pathname + window.location.search, {
      headers: {
        'X-Inertia': 'true',
        'X-Inertia-Version': '1',
        Accept: 'application/json',
      },
    })
    page = (await response.json()) as Page<PageProps>
  }

  createInertiaApp({
    page,
    resolve: name => {
      const pages = import.meta.glob('./Pages/**/*.vue', { eager: true })
      return pages[`./Pages/${name}.vue`] as DefineComponent
    },
    setup({ el, App, props, plugin }) {
      createApp({ render: () => h(TooltipProvider, null, { default: () => h(App, props) }) })
        .use(plugin)
        .mount(el)
    },
  })
}

main()
