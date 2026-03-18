<template lang="pug">
div(data-slot="table" :class="cn('w-full overflow-auto', props.class)")
  table.w-full.caption-bottom.text-base
    thead
      tr.border-b.border-border
        th(
          v-for="col in columns"
          :key="col.key"
          :class="cn('text-muted-foreground font-medium text-left', sizePaddingClasses[size], col.align && `text-${col.align}`, col.class)"
        ) {{ col.label }}
    tbody(v-if="rows.length")
      tr(
        v-for="(row, idx) in rows"
        :key="idx"
        :class="[rowClasses, striped && idx % 2 === 1 ? 'bg-muted/50' : '']"
      )
        td(
          v-for="col in columns"
          :key="col.key"
          :class="cn(sizePaddingClasses[size], col.align && `text-${col.align}`)"
        )
          slot(:name="`cell-${col.key}`" :row="row" :value="row[col.key]")
            | {{ row[col.key] }}
    tbody(v-else)
      tr
        td.text-center.text-muted-foreground(:colspan="columns.length" :class="cn(sizePaddingClasses[size], 'py-8')")
          slot(name="empty")
            | {{ emptyMessage }}
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/Utils/utils'

interface Column {
  key: string
  label: string
  align?: 'left' | 'center' | 'right'
  class?: string
}

interface Props {
  columns: Column[]
  rows: Record<string, unknown>[]
  striped?: boolean
  hoverable?: boolean
  size?: 'sm' | 'md' | 'lg'
  emptyMessage?: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  striped: false,
  hoverable: false,
  size: 'md',
  emptyMessage: 'Nenhum registro encontrado',
  class: undefined,
})

const sizePaddingClasses: Record<string, string> = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-3',
  lg: 'px-6 py-4 text-lg',
}

const rowClasses = computed(() =>
  [
    'border-b border-border transition-colors',
    props.hoverable ? 'hover:bg-muted/50' : '',
  ].filter(Boolean).join(' '),
)
</script>
