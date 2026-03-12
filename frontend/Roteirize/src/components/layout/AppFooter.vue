<template lang="pug">
footer.no-padding
  //- div.grid
    //- div.s12.m4
    //-   nav.vertical.no-space
    //-     h6.primary-text Roteirize
    //-     p.small-text {{ tagline }}
    //- div.s12.m4
    //-   nav.vertical.no-space
    //-     h6 Produto
    //-     a(v-for="link in productLinks" :key="link.label" :href="link.href") {{ link.label }}
    //- div.s12.m4
    //-   nav.vertical.no-space
    //-     h6 Suporte
    //-     a(v-for="link in supportLinks" :key="link.label" :href="link.href") {{ link.label }}
  div.divider
  nav.horizontal-padding
    div.max
      p.small-text © {{ currentYear }} Roteirize. Todos os direitos reservados.
    a.link.small-text(href="#") Termos
    a.link.small-text(href="#") Privacidade
</template>

<script setup lang="ts">
interface Props {
  tagline?: string
  productLinks?: { label: string; href: string }[]
  supportLinks?: { label: string; href: string }[]
}

withDefaults(defineProps<Props>(), {
  tagline: 'Planeje suas viagens de forma simples e colaborativa.',
  productLinks: () => [
    { label: 'Funcionalidades', href: '#features' },
    { label: 'Preços', href: '#pricing' },
    { label: 'Novidades', href: '#' },
  ],
  supportLinks: () => [
    { label: 'Central de Ajuda', href: '#' },
    { label: 'Contato', href: '#' },
    { label: 'Feedback', href: '#' },
  ],
})

const currentYear = new Date().getFullYear()
</script>
