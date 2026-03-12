<template lang="pug">
div
  AppNavbar
  main.responsive
    //- Hero Section
    div.large-padding.center-align
      h2 Planeje suas viagens com facilidade
      p.large-text Crie roteiros detalhados, colabore com amigos e tenha tudo organizado em um só lugar.
      nav.center-align
        RouterLink.button.large(:to="{ name: 'register' }")
          i rocket_launch
          span Começar agora
        RouterLink.button.border.large(:to="{ name: 'login' }")
          span Já tenho conta

    div.divider

    //- Features Section
    div#features.large-padding
      h3.center-align Funcionalidades
      p.center-align Por que escolher o Roteirize?
      div.grid
        div.s12.m6.l4(v-for="feature in features" :key="feature.title")
          article.border
            nav
              i.circle.extra.primary {{ feature.icon }}
            h5 {{ feature.title }}
            p {{ feature.description }}

    div.divider

    //- How it works Section
    div#how-it-works.large-padding
      h3.center-align Como funciona
      p.center-align Simples como planejar deveria ser.
      div.grid
        div.s12.m4(v-for="(step, i) in steps" :key="step.title")
          article.border
            nav
              div.circle.extra.primary-container.center-align.middle-align
                h5.no-margin {{ i + 1 }}
            h5 {{ step.title }}
            p {{ step.description }}

    div.divider

    //- Pricing Section
    div#pricing.large-padding.center-align
      h3 Preços
      p Comece gratuitamente, sem compromisso.
      div.grid.center-align
        div.s12.m6.l4
          article.border.medium-elevate
            h5 Gratuito
            h3 R$ 0
            p Para sempre
            div.divider
            nav.vertical
              div.row.middle-align(v-for="item in freeFeatures" :key="item")
                i.green-text check_circle
                span {{ item }}
            div.medium-padding
              RouterLink.button.responsive(:to="{ name: 'register' }") Criar conta grátis

  AppFooter
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import AppNavbar from '@/components/layout/AppNavbar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

const features = [
  { icon: 'map', title: 'Roteiros Detalhados', description: 'Crie itinerários completos com datas, horários e locais organizados.' },
  { icon: 'group', title: 'Colaboração', description: 'Convide amigos para planejar juntos em tempo real.' },
  { icon: 'devices', title: 'Acesse em Qualquer Lugar', description: 'Seus roteiros acessíveis de qualquer dispositivo.' },
]

const steps = [
  { title: 'Crie sua conta', description: 'Cadastre-se gratuitamente em menos de um minuto.' },
  { title: 'Monte seu roteiro', description: 'Adicione destinos, datas e atividades ao seu itinerário.' },
  { title: 'Compartilhe e viaje', description: 'Convide companheiros e aproveite a viagem organizada.' },
]

const freeFeatures = [
  'Até 5 roteiros',
  'Colaboração com até 3 pessoas',
  'Exportar para PDF',
  'Suporte da comunidade',
]
</script>
