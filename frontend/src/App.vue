<template lang="pug">
TooltipProvider(:delay-duration="400")
  RouterView
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { TooltipProvider } from 'reka-ui'
import { useThemeStore } from '@/stores/theme'

const theme = useThemeStore()

onMounted(() => {
  theme.initialize()
})
</script>
