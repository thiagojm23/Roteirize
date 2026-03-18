import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useSidebarStore } from '@/stores/sidebar'

describe('useSidebarStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('starts expanded by default', () => {
    const store = useSidebarStore()
    expect(store.collapsed).toBe(false)
  })

  it('toggle() flips collapsed state', () => {
    const store = useSidebarStore()
    store.toggle()
    expect(store.collapsed).toBe(true)

    store.toggle()
    expect(store.collapsed).toBe(false)
  })

  it('toggle() persists to localStorage', () => {
    const store = useSidebarStore()
    store.toggle()
    expect(localStorage.getItem('roteirize-sidebar-collapsed')).toBe('true')

    store.toggle()
    expect(localStorage.getItem('roteirize-sidebar-collapsed')).toBe('false')
  })

  it('setCollapsed() sets the value directly', () => {
    const store = useSidebarStore()
    store.setCollapsed(true)
    expect(store.collapsed).toBe(true)
    expect(localStorage.getItem('roteirize-sidebar-collapsed')).toBe('true')
  })

  it('initialize() reads collapsed=true from localStorage', () => {
    localStorage.setItem('roteirize-sidebar-collapsed', 'true')
    const store = useSidebarStore()
    store.initialize()
    expect(store.collapsed).toBe(true)
  })

  it('initialize() reads collapsed=false from localStorage', () => {
    localStorage.setItem('roteirize-sidebar-collapsed', 'false')
    const store = useSidebarStore()
    store.initialize()
    expect(store.collapsed).toBe(false)
  })

  it('initialize() defaults to expanded when no localStorage entry', () => {
    const store = useSidebarStore()
    store.initialize()
    expect(store.collapsed).toBe(false)
  })
})
