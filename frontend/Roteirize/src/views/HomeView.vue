<template lang="pug">
div(class="min-h-screen bg-white dark:bg-gray-950")
  AppNavbar

  main
    //- =============================================
    //- Hero Section
    //- =============================================
    section(class="relative overflow-hidden px-4 pb-24 pt-20 sm:px-6 lg:px-8")
      //- Subtle radial gradient background
      div(
        class="pointer-events-none absolute inset-x-0 top-0 h-[500px]"
        style="background: radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.94 0.033 294 / 0.4) 0%, transparent 70%)"
        aria-hidden="true"
      )
      div(class="relative mx-auto max-w-4xl text-center")
        //- Badge
        div(class="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700 dark:border-primary-800/50 dark:bg-primary-950/30 dark:text-primary-300")
          Star(class="size-3.5")
          | Escreva roteiros do jeito certo
        //- Headline
        h1(class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl")
          | Seu roteiro,&nbsp;
          span(class="text-primary-600 dark:text-primary-400") do conceito
          br
          | à tela final
        //- Subheadline
        p(class="mx-auto mt-6 max-w-2xl text-lg text-gray-500 dark:text-gray-400")
          | Crie, colabore e exporte roteiros profissionais. Convide sua equipe, defina permissões e mantenha tudo organizado em um só lugar.
        //- CTAs
        div(class="mt-10 flex flex-wrap items-center justify-center gap-3")
          RouterLink(:to="{ name: 'register' }")
            AppButton(size="lg")
              | Começar grátis
              ArrowRight(class="size-4")
          RouterLink(:to="{ name: 'login' }")
            AppButton(variant="secondary" size="lg") Ver demonstração
        //- Highlights
        div(class="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2")
          div(
            v-for="h in highlights"
            :key="h"
            class="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
          )
            Check(class="size-3.5 text-primary-600 dark:text-primary-400")
            | {{ h }}

    //- =============================================
    //- Features Section
    //- =============================================
    section#features(class="border-t border-gray-100 px-4 py-20 dark:border-gray-800 sm:px-6 lg:px-8")
      div(class="mx-auto max-w-7xl")
        div(class="mb-14 text-center")
          h2(class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl")
            | Tudo que você precisa para criar
          p(class="mt-3 text-gray-500 dark:text-gray-400")
            | Ferramentas poderosas em uma interface limpa e focada.
        div(class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3")
          div(
            v-for="feature in features"
            :key="feature.title"
            class="group rounded-2xl border border-gray-100 p-6 transition-shadow hover:shadow-md dark:border-gray-800 dark:hover:border-gray-700"
          )
            div(class="mb-4 flex size-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-950/40 dark:text-primary-400")
              component(:is="feature.icon" class="size-5")
            h3(class="mb-2 font-semibold text-gray-900 dark:text-white") {{ feature.title }}
            p(class="text-sm leading-relaxed text-gray-500 dark:text-gray-400") {{ feature.description }}

    //- =============================================
    //- How it works Section
    //- =============================================
    section#how-it-works(class="bg-gray-50 px-4 py-20 dark:bg-gray-900/40 sm:px-6 lg:px-8")
      div(class="mx-auto max-w-4xl")
        div(class="mb-14 text-center")
          h2(class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl")
            | Como funciona
          p(class="mt-3 text-gray-500 dark:text-gray-400")
            | Três passos simples para começar.
        div(class="grid gap-8 md:grid-cols-3")
          div(
            v-for="step in steps"
            :key="step.number"
            class="relative flex flex-col items-center text-center"
          )
            //- Step number
            div(class="mb-5 flex size-14 items-center justify-center rounded-2xl bg-primary-600 text-white dark:bg-primary-500")
              span(class="text-lg font-bold") {{ step.number }}
            //- Connector line (hidden on last item and mobile)
            div(
              v-if="step.number !== '03'"
              class="absolute left-1/2 top-7 hidden h-0.5 w-full translate-x-7 bg-gradient-to-r from-primary-200 to-transparent dark:from-primary-800 md:block"
              aria-hidden="true"
            )
            h3(class="mb-2 font-semibold text-gray-900 dark:text-white") {{ step.title }}
            p(class="text-sm leading-relaxed text-gray-500 dark:text-gray-400") {{ step.description }}

    //- =============================================
    //- CTA Section
    //- =============================================
    section#pricing(class="px-4 py-20 sm:px-6 lg:px-8")
      div(class="mx-auto max-w-3xl rounded-3xl border border-primary-100 bg-gradient-to-b from-primary-50 to-white p-12 text-center dark:border-primary-900/30 dark:from-primary-950/20 dark:to-gray-950")
        span(class="mb-4 inline-flex items-center gap-1.5 rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-700 dark:bg-primary-900/40 dark:text-primary-300")
          GitBranch(class="size-3")
          | Plano gratuito disponível
        h2(class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl")
          | Comece a criar hoje mesmo
        p(class="mx-auto mt-4 max-w-md text-gray-500 dark:text-gray-400")
          | Crie sua conta gratuitamente e comece a escrever seu primeiro roteiro em minutos. Sem cartão de crédito.
        div(class="mt-8 flex flex-wrap items-center justify-center gap-3")
          RouterLink(:to="{ name: 'register' }")
            AppButton(size="lg")
              | Criar conta grátis
              ArrowRight(class="size-4")
          RouterLink(:to="{ name: 'login' }")
            AppButton(variant="ghost" size="lg") Já tenho conta

  //- =============================================
  //- Footer
  //- =============================================
  footer(class="border-t border-gray-100 px-4 py-12 dark:border-gray-800 sm:px-6 lg:px-8")
    div(class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row")
      div(class="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white")
        span(class="flex size-7 items-center justify-center rounded-lg bg-primary-600 text-white dark:bg-primary-500")
          Film(class="size-3.5")
        | Roteirize
      nav(class="flex gap-5 text-sm text-gray-400")
        a(href="#" class="hover:text-gray-600 dark:hover:text-gray-200") Termos
        a(href="#" class="hover:text-gray-600 dark:hover:text-gray-200") Privacidade
        a(href="#" class="hover:text-gray-600 dark:hover:text-gray-200") Contato
      p(class="text-sm text-gray-400") © {{ new Date().getFullYear() }} Roteirize
</template>
<script setup lang="ts">
import { RouterLink } from 'vue-router'
import {
  Film,
  ArrowRight,
  Users,
  FileDown,
  Pencil,
  Share2,
  FileSpreadsheet,
  Check,
  Star,
  GitBranch,
  Shield,
} from 'lucide-vue-next'
import AppNavbar from '@/components/layout/AppNavbar.vue'
import AppButton from '@/components/ui/AppButton.vue'

const features = [
  {
    icon: Pencil,
    title: 'Edição intuitiva',
    description:
      'Interface limpa e focada para você escrever sem distrações. Formatação profissional de roteiro automática.',
  },
  {
    icon: Users,
    title: 'Colaboração em tempo real',
    description:
      'Convide colaboradores com controle fino de permissões: leitura, comentário ou edição completa.',
  },
  {
    icon: Shield,
    title: 'Controle de permissões',
    description:
      'Defina quem pode editar, comentar ou apenas visualizar cada roteiro. Você está sempre no controle.',
  },
  {
    icon: Share2,
    title: 'Compartilhamento fácil',
    description:
      'Compartilhe roteiros com um clique. Links com expiração e controle de acesso avançado.',
  },
  {
    icon: FileDown,
    title: 'Exportar para PDF',
    description: 'Exporte seu roteiro em PDF formatado profissionalmente com um clique.',
  },
  {
    icon: FileSpreadsheet,
    title: 'Exportar para Excel',
    description:
      'Gere planilhas a partir do seu roteiro para produção, controle de cenas e muito mais.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Crie seu roteiro',
    description: 'Inicie um novo projeto e comece a escrever com nossa interface intuitiva.',
  },
  {
    number: '02',
    title: 'Convide colaboradores',
    description: 'Adicione pessoas ao projeto com o nível de permissão que você desejar.',
  },
  {
    number: '03',
    title: 'Escreva e exporte',
    description: 'Finalize seu roteiro e exporte para PDF ou Excel com formatação profissional.',
  },
]

const highlights = [
  'Sem instalação necessária',
  'Funciona em qualquer dispositivo',
  'Histórico de versões',
  'Suporte a múltiplos projetos',
]
</script>
