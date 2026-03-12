<template lang="pug">
div
  AppNavbar
  main.responsive
    PageHeader(
      title="Meus Roteiros"
      :subtitle="greeting"
    )
      template(#actions)
        button(@click="createItinerary")
          i add
          span Novo Roteiro

    //- Search
    div.field.label.border.prefix
      i search
      input(v-model="search" type="text" placeholder=" ")
      label Buscar roteiros...

    //- Grid of itineraries
    div.grid(v-if="filteredItineraries.length")
      div.s12.m6.l4(
        v-for="item in filteredItineraries"
        :key="item.id"
      )
        article.border
          h5 {{ item.title }}
          p {{ item.description }}
          div.row.middle-align
            button.chip.small.no-ripple
              i {{ item.role === 'owner' ? 'shield' : 'person' }}
              span {{ item.role === 'owner' ? 'Dono' : 'Colaborador' }}
            div.max
            div.row.no-space.middle-align
              i.small group
              span.small-text {{ item.travelers }} viajantes
          div.divider
          nav
            div.max
              span.small-text Atualizado {{ formatRelativeDate(item.updatedAt) }}
            button.circle.transparent.small
              i more_vert

    //- Empty state
    div.medium-height.middle-align.center-align(v-else)
      div.center-align
        i.extra map
        h5 Nenhum roteiro encontrado
        p(v-if="search") Nenhum resultado para "{{ search }}"
        p(v-else) Crie seu primeiro roteiro para começar a planejar!
        div.space
        nav.center-align
          button(@click="createItinerary")
            i add
            span Criar Roteiro
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import AppNavbar from '@/components/layout/AppNavbar.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import { useAuthStore } from '@/stores/auth'
import { formatRelativeDate } from '@/shared/utils'

const authStore = useAuthStore()
const search = ref('')

const greeting = computed(() => {
  const name = authStore.user?.name?.split(' ')[0] ?? ''
  return name ? `Olá, ${name}!` : 'Seus itinerários de viagem'
})

const itineraries = ref([
  { id: '1', title: 'Férias no Nordeste', description: 'Recife, Olinda e Porto de Galinhas em 10 dias.', role: 'owner', travelers: 4, updatedAt: new Date(Date.now() - 86400000).toISOString() },
  { id: '2', title: 'Fim de Semana em SP', description: 'Roteiro cultural por São Paulo em 3 dias.', role: 'collaborator', travelers: 2, updatedAt: new Date(Date.now() - 172800000).toISOString() },
  { id: '3', title: 'Europa 2026', description: 'Paris, Roma e Barcelona em 15 dias.', role: 'owner', travelers: 3, updatedAt: new Date(Date.now() - 604800000).toISOString() },
])

const filteredItineraries = computed(() => {
  if (!search.value) return itineraries.value
  const q = search.value.toLowerCase()
  return itineraries.value.filter(
    (i) => i.title.toLowerCase().includes(q) || i.description.toLowerCase().includes(q),
  )
})

const createItinerary = () => {
  // TODO: implement
}
</script>
