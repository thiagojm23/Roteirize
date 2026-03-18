import { ref } from 'vue'

const collapsed = ref(false)

export function useSidebar() {
  function toggle() {
    collapsed.value = !collapsed.value
    localStorage.setItem('roteirize-sidebar-collapsed', String(collapsed.value))
  }

  function setCollapsed(value: boolean) {
    collapsed.value = value
    localStorage.setItem('roteirize-sidebar-collapsed', String(value))
  }

  function initialize() {
    const stored = localStorage.getItem('roteirize-sidebar-collapsed')
    if (stored !== null) {
      collapsed.value = stored === 'true'
    }
  }

  return { collapsed, toggle, setCollapsed, initialize }
}
