<template lang="pug">
nav.left.m(:class="{ 'active': active }")
  header
    nav
      img.circle(src="" alt="Logo" style="width:40px;height:40px;background:var(--primary);")
      h6 Roteirize
  a(
    v-for="item in items"
    :key="item.name"
    :class="{ 'active': isActive(item.route) }"
    @click="navigate(item.route)"
  )
    i {{ item.icon }}
    span {{ item.label }}
    div.badge(v-if="item.badge") {{ item.badge }}
  div.max
  div.divider
  slot(name="footer")
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

export interface NavItem {
  name: string
  label: string
  icon: string
  route: string
  badge?: string | number
}

interface Props {
  items: NavItem[]
  active?: boolean
}

withDefaults(defineProps<Props>(), {
  active: false,
})

const router = useRouter()
const route = useRoute()

const isActive = (path: string) => route.path === path
const navigate = (path: string) => router.push(path)
</script>
