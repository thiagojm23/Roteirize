import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { createRouter, createMemoryHistory } from 'vue-router'
import AppSidenav from '@/components/layout/AppSidenav.vue'
import { useSidebarStore } from '@/stores/sidebar'
import { TooltipProvider } from 'reka-ui'

function createTestRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/app', component: { template: '<div />' } },
      { path: '/app/itineraries', component: { template: '<div />' } },
      { path: '/app/settings', component: { template: '<div />' } },
      { path: '/login', component: { template: '<div />' } },
    ],
  })
}

function mountSidenav(props: Record<string, unknown> = {}) {
  const router = createTestRouter()
  return mount(AppSidenav, {
    props,
    global: {
      plugins: [router],
      stubs: {
        AppSheet: true,
        AppTooltip: {
          template: '<div data-testid="tooltip"><slot /></div>',
          props: ['content', 'side'],
        },
      },
      provide: {
        [Symbol.for('reka-tooltip-provider')]: { delayDuration: 0 },
      },
    },
  })
}

describe('AppSidenav', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('renders nav items', () => {
    const wrapper = mountSidenav()
    expect(wrapper.text()).toContain('Painel')
    expect(wrapper.text()).toContain('Meus Roteiros')
    expect(wrapper.text()).toContain('Configurações')
  })

  it('defaults collapseMode to none (no toggle button)', () => {
    const wrapper = mountSidenav()
    expect(wrapper.text()).not.toContain('Recolher menu')
  })

  it('shows toggle button when collapseMode is icons', () => {
    const wrapper = mountSidenav({ collapseMode: 'icons' })
    expect(wrapper.text()).toContain('Recolher menu')
  })

  it('collapses to icon-only when collapseMode=icons and collapsed', () => {
    const sidebar = useSidebarStore()
    sidebar.setCollapsed(true)
    const wrapper = mountSidenav({ collapseMode: 'icons' })
    const aside = wrapper.find('aside')
    expect(aside.classes()).toContain('w-16')
  })

  it('shows full width when collapseMode=icons and not collapsed', () => {
    const wrapper = mountSidenav({ collapseMode: 'icons' })
    const aside = wrapper.find('aside')
    expect(aside.classes()).toContain('w-64')
  })

  it('hides labels when icons-collapsed', () => {
    const sidebar = useSidebarStore()
    sidebar.setCollapsed(true)
    const wrapper = mountSidenav({ collapseMode: 'icons' })
    // Labels should not be visible in the nav links (they're in tooltips instead)
    const navLinks = wrapper.findAll('a')
    const desktopLinks = navLinks.filter((l) => !l.text().includes('Painel'))
    // In icons mode, nav item text should not appear in the aside
    const asideText = wrapper.find('aside').text()
    expect(asideText).not.toContain('Painel')
    expect(asideText).not.toContain('Meus Roteiros')
  })

  it('hides sidebar entirely when collapseMode=full and collapsed', () => {
    const sidebar = useSidebarStore()
    sidebar.setCollapsed(true)
    const wrapper = mountSidenav({ collapseMode: 'full' })
    expect(wrapper.find('aside').exists()).toBe(false)
  })

  it('shows floating toggle when collapseMode=full and collapsed', () => {
    const sidebar = useSidebarStore()
    sidebar.setCollapsed(true)
    const wrapper = mountSidenav({ collapseMode: 'full' })
    // The floating button should exist
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBeGreaterThan(0)
  })
})
