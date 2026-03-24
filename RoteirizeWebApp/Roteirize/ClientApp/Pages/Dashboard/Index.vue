<template lang="pug">
.flex.min-h-screen.bg-background
  AppSidenav

  .flex-1.flex.flex-col
    //- Page header
    .border-b.border-border.bg-card.px-6.py-4(class="lg:px-8")
      .flex.items-center.justify-between
        div
          h1.text-2xl.font-bold Painel
          p.text-base.text-muted-foreground Bem-vindo de volta{{ user?.name ? `, ${user.name}` : '' }}!
        Link(href="/app/itineraries/new")
          AppButton(size="sm")
            Plus.mr-2.h-4.w-4
            | Nova viagem

    //- Content
    .flex-1.p-6(class="lg:p-8")
      //- Stats cards
      .grid.gap-4.mb-8(class="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3")
        AppCard(size="sm")
          .flex.items-center.justify-between.mb-2
            span.text-base.font-medium.text-muted-foreground Viagens planejadas
            MapPin.h-4.w-4.text-muted-foreground
          p.text-2xl.font-bold {{ itineraries.length }}
        AppCard(size="sm")
          .flex.items-center.justify-between.mb-2
            span.text-base.font-medium.text-muted-foreground Próxima viagem
            Calendar.h-4.w-4.text-muted-foreground
          p.text-2xl.font-bold {{ nextTrip }}
        AppCard(size="sm")
          .flex.items-center.justify-between.mb-2
            span.text-base.font-medium.text-muted-foreground Colaborações
            Users.h-4.w-4.text-muted-foreground
          p.text-2xl.font-bold {{ collaborations }}

      //- Recent itineraries
      template(v-if="itineraries.length")
        .flex.items-center.justify-between.mb-4
          h2.text-lg.font-semibold Roteiros recentes
          Link.text-base.text-primary(href="/app/itineraries" class="hover:underline") Ver todos
        .grid.gap-4(class="grid-cols-1 md:grid-cols-2 lg:grid-cols-3")
          Link(
            v-for="itin in itineraries.slice(0, 3)"
            :key="itin.id"
            :href="`/app/itineraries/${itin.id}`"
            class="block"
          )
            AppCard.transition-shadow(class="hover:shadow-md")
              template(#header)
                .px-6
                  h3.font-semibold {{ itin.title }}
                  p.text-sm.text-muted-foreground {{ itin.destinations.map(d => d.name).join(' → ') }}

      //- Empty state
      .flex.flex-col.items-center.justify-center.text-center.py-16(v-else)
        .h-16.w-16.rounded-full.flex.items-center.justify-center.mb-4(class="bg-primary/10")
          MapPin.h-8.w-8.text-primary
        h3.text-lg.font-semibold.mb-2 Nenhum roteiro ainda
        p.text-base.text-muted-foreground.mb-6.max-w-sm Comece criando sua primeira viagem e convide amigos para planejar juntos!
        Link(href="/app/itineraries/new")
          AppButton
            Plus.mr-2.h-4.w-4
            | Criar meu primeiro roteiro
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Link } from "@inertiajs/vue3";
import AppSidenav from "@/Components/Layout/AppSidenav.vue";
import AppButton from "@/Components/App/AppButton.vue";
import AppCard from "@/Components/App/AppCard.vue";
import { MapPin, Plus, Calendar, Users } from "lucide-vue-next";
import type { Itinerary, User } from "@/Types/itinerary";

const props = defineProps<{
  user?: User | null;
  itineraries: Itinerary[];
  collaborations: number;
}>();

const nextTrip = computed(() => {
  const upcoming = props.itineraries
    .filter((i) => new Date(i.startDate) > new Date())
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
    );
  if (!upcoming.length) return "—";
  return new Date(upcoming[0]!.startDate + "T00:00:00").toLocaleDateString(
    "pt-BR",
    {
      day: "2-digit",
      month: "short",
    },
  );
});
</script>
