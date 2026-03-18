<template lang="pug">
footer.border-t.border-border.bg-background
  .container.mx-auto.px-4.py-5
    .grid.gap-8(class="grid-cols-1 md:grid-cols-3")
      div
        .flex.items-center.gap-2.font-bold.text-lg.text-primary.mb-3
          Compass.h-5.w-5
          | Roteirize
        p.text-base.text-muted-foreground A plataforma colaborativa para planejar suas viagens de forma inteligente e organizada.

      div
        h4.font-semibold.mb-3 Plataforma
        ul.space-y-2.text-base.text-muted-foreground
          li
            a.transition-colors.cursor-pointer(class="hover:text-foreground") Funcionalidades
          li
            a.transition-colors.cursor-pointer(class="hover:text-foreground") Como funciona
          li
            a.transition-colors.cursor-pointer(class="hover:text-foreground") Preços

      div
        h4.font-semibold.mb-3 Suporte
        ul.space-y-2.text-base.text-muted-foreground
          li
            a.transition-colors.cursor-pointer(class="hover:text-foreground") Central de ajuda
          li
            a.transition-colors.cursor-pointer(class="hover:text-foreground") Contato
          li
            a.transition-colors.cursor-pointer(class="hover:text-foreground") Termos de uso

    .mt-8.pt-8.border-t.border-border.text-center.text-base.text-muted-foreground
      | &copy; {{ new Date().getFullYear() }} Roteirize. Todos os direitos reservados.
</template>

<script setup lang="ts">
import { Compass } from 'lucide-vue-next'
</script>
