<template lang="pug">
Avatar(:class="cn(sizeClass, props.class)")
  AvatarImage(v-if="src" :src="src" :alt="alt ?? name ?? 'Avatar'")
  AvatarFallback(:class="cn('bg-primary/10 text-primary font-semibold', fallbackClass)")
    | {{ displayFallback }}
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { HTMLAttributes } from 'vue'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { getInitials } from '@/shared/utils'

interface Props {
  src?: string
  alt?: string
  /** Full name used to generate initials fallback */
  name?: string
  /** Custom fallback text (overrides name initials) */
  fallback?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  fallbackClass?: HTMLAttributes['class']
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
})

const sizeMap: Record<NonNullable<Props['size']>, string> = {
  xs: 'size-6 text-xs',
  sm: 'size-8 text-sm',
  md: 'size-10 text-sm',
  lg: 'size-12 text-base',
  xl: 'size-16 text-lg',
}

const sizeClass = computed(() => sizeMap[props.size])

const displayFallback = computed(() => {
  if (props.fallback) return props.fallback
  if (props.name) return getInitials(props.name)
  return '?'
})
</script>
