import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppTooltip from '@/components/app/AppTooltip.vue'
import { TooltipProvider } from 'reka-ui'

// AppTooltip must be inside a TooltipProvider
function mountTooltip(props: Record<string, unknown> = {}, slots: Record<string, string> = {}) {
  return mount(TooltipProvider, {
    props: { delayDuration: 0 },
    slots: {
      default: () =>
        mount(AppTooltip, {
          props: { content: 'Tooltip text', ...props },
          slots: { default: '<button>Hover me</button>', ...slots },
        }).vm.$el,
    },
  })
}

describe('AppTooltip', () => {
  it('renders trigger slot content', () => {
    const wrapper = mount({
      template: `<TooltipProvider><AppTooltip content="Tip"><button>Trigger</button></AppTooltip></TooltipProvider>`,
      components: { TooltipProvider, AppTooltip },
    })
    expect(wrapper.text()).toContain('Trigger')
  })

  it('accepts content prop', () => {
    const wrapper = mount({
      template: `<TooltipProvider><AppTooltip content="Info text"><span>Hover</span></AppTooltip></TooltipProvider>`,
      components: { TooltipProvider, AppTooltip },
    })
    expect(wrapper.vm).toBeTruthy()
  })

  it('accepts side prop', () => {
    const wrapper = mount({
      template: `<TooltipProvider><AppTooltip content="Tip" side="bottom"><span>Hover</span></AppTooltip></TooltipProvider>`,
      components: { TooltipProvider, AppTooltip },
    })
    expect(wrapper.vm).toBeTruthy()
  })

  it('applies custom class prop', () => {
    const wrapper = mount({
      template: `<TooltipProvider><AppTooltip content="Tip" class="custom-tip"><span>Hover</span></AppTooltip></TooltipProvider>`,
      components: { TooltipProvider, AppTooltip },
    })
    expect(wrapper.vm).toBeTruthy()
  })
})
