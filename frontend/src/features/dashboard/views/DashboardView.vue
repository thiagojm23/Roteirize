<script setup lang="ts">
import { RouterLink } from 'vue-router'
import AppSidenav from '@/components/layout/AppSidenav.vue'
import AppButton from '@/components/app/AppButton.vue'
import { useAuthStore } from '@/features/auth/stores/auth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, Plus, Calendar, Users } from 'lucide-vue-next'

const auth = useAuthStore()
</script>

<template lang="pug">
.flex.min-h-screen.bg-background
  AppSidenav

  .flex-1.flex.flex-col
    //- Page header
    .border-b.border-border.bg-card.px-6.py-4(class="lg:px-8")
      .flex.items-center.justify-between
        div
          h1.text-2xl.font-bold Painel
          p.text-sm.text-muted-foreground Bem-vindo de volta{{ auth.user?.name ? `, ${auth.user.name}` : '' }}!
        AppButton(size="sm")
          Plus.mr-2.h-4.w-4
          | Nova viagem

    //- Content
    .flex-1.p-6(class="lg:p-8")
      //- Stats cards
      .grid.gap-4.mb-8(class="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3")
        Card
          CardHeader.flex.flex-row.items-center.justify-between.pb-2
            CardTitle.text-sm.font-medium.text-muted-foreground Viagens planejadas
            MapPin.h-4.w-4.text-muted-foreground
          CardContent
            p.text-2xl.font-bold 0
        Card
          CardHeader.flex.flex-row.items-center.justify-between.pb-2
            CardTitle.text-sm.font-medium.text-muted-foreground Próxima viagem
            Calendar.h-4.w-4.text-muted-foreground
          CardContent
            p.text-2xl.font-bold —
        Card
          CardHeader.flex.flex-row.items-center.justify-between.pb-2
            CardTitle.text-sm.font-medium.text-muted-foreground Colaborações
            Users.h-4.w-4.text-muted-foreground
          CardContent
            p.text-2xl.font-bold 0

      //- Empty state
      .flex.flex-col.items-center.justify-center.text-center.py-16
        .h-16.w-16.rounded-full.flex.items-center.justify-center.mb-4(class="bg-primary/10")
          MapPin.h-8.w-8.text-primary
        h3.text-lg.font-semibold.mb-2 Nenhum roteiro ainda
        p.text-sm.text-muted-foreground.mb-6.max-w-sm Comece criando sua primeira viagem e convide amigos para planejar juntos!
        AppButton
          Plus.mr-2.h-4.w-4
          | Criar meu primeiro roteiro
</template>
