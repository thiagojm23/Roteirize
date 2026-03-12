<template lang="pug">
div
  //- Minimal header
  header.secondary-container
    nav
      RouterLink.row.no-space.middle-align(:to="{ name: 'home' }")
        h6.primary-text.bold Roteirize
      div.max
      button.circle.transparent(@click="themeStore.toggle()")
        i {{ themeStore.isDark ? 'light_mode' : 'dark_mode' }}
  //- Centered content card
  main
    div.grid.center-align
      div.s12.m8.l6
        article.medium-elevate.large-padding
          h5.center-align {{ title }}
          p.center-align(v-if="subtitle") {{ subtitle }}
          slot
  //- Minimal footer
  footer.responsive.center-align
    p.small-text © {{ currentYear }} Roteirize
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useThemeStore } from '@/stores/theme'

interface Props {
  title: string
  subtitle?: string
}

defineProps<Props>()

const themeStore = useThemeStore()
const currentYear = new Date().getFullYear()
</script>
