import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import { mount } from '@vue/test-utils'
import AppTable from '@/components/app/AppTable.vue'

const columns = [
  { key: 'name', label: 'Nome' },
  { key: 'email', label: 'E-mail' },
]

const rows = [
  { name: 'Alice', email: 'alice@test.com' },
  { name: 'Bob', email: 'bob@test.com' },
]

describe('AppTable', () => {
  it('renders column headers', () => {
    const wrapper = mount(AppTable, { props: { columns, rows } })
    expect(wrapper.text()).toContain('Nome')
    expect(wrapper.text()).toContain('E-mail')
  })

  it('renders row data', () => {
    const wrapper = mount(AppTable, { props: { columns, rows } })
    expect(wrapper.text()).toContain('Alice')
    expect(wrapper.text()).toContain('bob@test.com')
  })

  it('renders empty state when no rows', () => {
    const wrapper = mount(AppTable, {
      props: { columns, rows: [], emptyMessage: 'Nenhum dado' },
    })
    expect(wrapper.text()).toContain('Nenhum dado')
  })

  it('renders empty slot when provided and no rows', () => {
    const wrapper = mount(AppTable, {
      props: { columns, rows: [] },
      slots: { empty: '<p>Custom empty</p>' },
    })
    expect(wrapper.text()).toContain('Custom empty')
  })

  it('renders scoped cell slot', () => {
    const wrapper = mount(AppTable, {
      props: { columns, rows },
      slots: {
        'cell-name': ({ value }: { row: Record<string, unknown>; value: unknown }) =>
          h('strong', {}, String(value)),
      },
    })
    const strongs = wrapper.findAll('strong')
    expect(strongs.length).toBe(2)
    expect(strongs[0].text()).toBe('Alice')
  })

  it('applies striped class when striped prop is true', () => {
    const wrapper = mount(AppTable, { props: { columns, rows, striped: true } })
    const tbodyRows = wrapper.findAll('tbody tr')
    expect(tbodyRows[1].attributes('class')).toContain('bg-muted/50')
  })

  it('applies hoverable class when hoverable prop is true', () => {
    const wrapper = mount(AppTable, { props: { columns, rows, hoverable: true } })
    const tbodyRows = wrapper.findAll('tbody tr')
    expect(tbodyRows[0].attributes('class')).toContain('hover:bg-muted/50')
  })

  it('applies sm size classes', () => {
    const wrapper = mount(AppTable, { props: { columns, rows, size: 'sm' } })
    const th = wrapper.find('th')
    expect(th.classes()).toContain('px-3')
    expect(th.classes()).toContain('py-2')
  })

  it('applies custom class prop', () => {
    const wrapper = mount(AppTable, { props: { columns, rows, class: 'w-full' } })
    expect(wrapper.find('[data-slot="table"]').classes()).toContain('w-full')
  })

  it('applies column alignment', () => {
    const cols = [
      { key: 'name', label: 'Nome', align: 'center' as const },
    ]
    const wrapper = mount(AppTable, { props: { columns: cols, rows } })
    expect(wrapper.find('th').classes()).toContain('text-center')
  })
})
