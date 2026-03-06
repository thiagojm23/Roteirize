<template lang="pug">
footer(class="border-t border-border bg-background")
  div(class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8")
    div(class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4")

      //- Brand column
      div(class="space-y-4")
        RouterLink(to="/" class="flex items-center gap-2 font-semibold text-foreground")
          span(class="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground")
            Film(class="size-4")
          span Roteirize
        p(class="text-sm text-muted-foreground leading-relaxed") {{ tagline }}

      //- Link groups
      div(
        v-for="group in linkGroups"
        :key="group.title"
        class="space-y-3"
      )
        h3(class="text-sm font-semibold text-foreground") {{ group.title }}
        ul(class="space-y-2")
          li(v-for="link in group.links" :key="link.label")
            a(
              :href="link.href"
              class="text-sm text-muted-foreground transition-colors hover:text-primary"
            ) {{ link.label }}

    //- Bottom bar
    div(class="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row")
      p(class="text-xs text-muted-foreground") {{ copyright }}
      div(v-if="legalLinks.length" class="flex items-center gap-4")
        a(
          v-for="link in legalLinks"
          :key="link.label"
          :href="link.href"
          class="text-xs text-muted-foreground transition-colors hover:text-primary"
        ) {{ link.label }}
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { Film } from 'lucide-vue-next'

interface FooterLink {
  label: string
  href: string
}

interface LinkGroup {
  title: string
  links: FooterLink[]
}

interface Props {
  tagline?: string
  linkGroups?: LinkGroup[]
  legalLinks?: FooterLink[]
  copyright?: string
}

const props = withDefaults(defineProps<Props>(), {
  tagline: 'Crie, colabore e exporte roteiros profissionais com facilidade.',
  linkGroups: () => [
    {
      title: 'Produto',
      links: [
        { label: 'Funcionalidades', href: '/#features' },
        { label: 'Como funciona', href: '/#how-it-works' },
        { label: 'Preços', href: '/#pricing' },
      ],
    },
    {
      title: 'Suporte',
      links: [
        { label: 'Central de ajuda', href: '/help' },
        { label: 'Contato', href: '/contact' },
      ],
    },
  ],
  legalLinks: () => [
    { label: 'Termos de uso', href: '/terms' },
    { label: 'Privacidade', href: '/privacy' },
  ],
  copyright: `© ${new Date().getFullYear()} Roteirize. Todos os direitos reservados.`,
})
</script>
