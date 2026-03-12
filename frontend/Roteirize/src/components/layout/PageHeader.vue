<template lang="pug">
div.medium-padding
  nav(v-if="breadcrumbs && breadcrumbs.length")
    template(v-for="(crumb, i) in breadcrumbs" :key="i")
      a.link(@click="$router.push(crumb.to)") {{ crumb.label }}
      i(v-if="i < breadcrumbs.length - 1") chevron_right
  div.row.middle-align
    div.max
      h4 {{ title }}
      p(v-if="subtitle") {{ subtitle }}
    slot(name="actions")
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  label: string
  to: string
}

interface Props {
  title: string
  subtitle?: string
  breadcrumbs?: BreadcrumbItem[]
}

defineProps<Props>()
</script>
