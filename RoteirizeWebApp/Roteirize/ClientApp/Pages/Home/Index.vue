<template lang="pug">
.min-h-screen.flex.flex-col
  AppNavbar

  main.flex-1
    //- Hero
    section.py-20.px-4(class="lg:py-32")
      .container.mx-auto.text-center.max-w-3xl
        .inline-flex.items-center.gap-2.rounded-full.px-4.text-sm.font-medium.text-primary.mb-6(class="py-1.5 bg-primary/10")
          MapPin.h-4.w-4
          | Planeje, colabore e viaje
        h1.text-4xl.font-bold.tracking-tight.mb-6(class="sm:text-5xl lg:text-6xl")
          | Suas viagens, organizadas de
          span.text-primary  verdade
        p.text-lg.text-muted-foreground.mb-8.max-w-2xl.mx-auto
          | O Roteirize é a plataforma colaborativa que ajuda você e seus amigos a planejar viagens incríveis com controle de orçamento, roteiros detalhados e muito mais.
        .flex.flex-col.gap-3.justify-center(class="sm:flex-row")
          Link(href="/cadastro")
            AppButton(size="lg")
              | Comece gratuitamente
              ArrowRight.ml-2.h-4.w-4
          a(href="#features")
            AppButton(variant="outline" size="lg") Saiba mais

    //- Features
    section#features.py-20.px-4(class="bg-muted/50")
      .container.mx-auto
        .text-center.mb-12
          h2.text-3xl.font-bold.tracking-tight.mb-3 Tudo que você precisa para viajar melhor
          p.text-muted-foreground.max-w-2xl.mx-auto Funcionalidades pensadas para tornar o planejamento de viagens simples, organizado e colaborativo.
        .grid.gap-6(class="grid-cols-1 md:grid-cols-2 lg:grid-cols-3")
          .rounded-xl.border.border-border.bg-card.p-6.transition-shadow(
            v-for="feature in features"
            :key="feature.title"
            class="hover:shadow-md"
          )
            .flex.items-center.justify-center.h-12.w-12.rounded-lg.text-primary.mb-4(class="bg-primary/10")
              component(:is="feature.icon" class="h-6 w-6")
            h3.font-semibold.mb-2 {{ feature.title }}
            p.text-base.text-muted-foreground {{ feature.description }}

    //- How it works
    section#how-it-works.py-20.px-4
      .container.mx-auto
        .text-center.mb-12
          h2.text-3xl.font-bold.tracking-tight.mb-3 Como funciona
          p.text-muted-foreground.max-w-2xl.mx-auto Em apenas 4 passos, sua viagem estará planejada.
        .grid.gap-8(class="grid-cols-1 md:grid-cols-2 lg:grid-cols-4")
          .text-center(v-for="step in steps" :key="step.number")
            .flex.items-center.justify-center.h-14.w-14.rounded-full.bg-primary.text-primary-foreground.text-xl.font-bold.mx-auto.mb-4 {{ step.number }}
            h3.font-semibold.mb-2 {{ step.title }}
            p.text-base.text-muted-foreground {{ step.description }}

    //- Testimonials
    section#testimonials.py-20.px-4(class="bg-muted/50")
      .container.mx-auto
        .text-center.mb-12
          h2.text-3xl.font-bold.tracking-tight.mb-3 O que dizem nossos viajantes
          p.text-muted-foreground.max-w-2xl.mx-auto Milhares de pessoas já usam o Roteirize para planejar suas aventuras.
        .grid.gap-6(class="grid-cols-1 md:grid-cols-3")
          .rounded-xl.border.border-border.bg-card.p-6(
            v-for="testimonial in testimonials"
            :key="testimonial.name"
          )
            .flex.gap-1.mb-4
              Star.h-4.w-4.fill-warning.text-warning(v-for="i in 5" :key="i")
            p.text-base.mb-4.italic.text-muted-foreground &ldquo;{{ testimonial.text }}&rdquo;
            .flex.items-center.gap-2
              .h-8.w-8.rounded-full.flex.items-center.justify-center.text-xs.font-bold.text-primary(class="bg-primary/10") {{ testimonial.name.charAt(0) }}
              div
                p.text-sm.font-medium {{ testimonial.name }}
                p.text-sm.text-muted-foreground {{ testimonial.location }}

    //- CTA
    section.py-20.px-4
      .container.mx-auto.text-center.max-w-2xl
        h2.text-3xl.font-bold.tracking-tight.mb-4 Pronto para planejar sua próxima viagem?
        p.text-muted-foreground.mb-8 Crie sua conta gratuitamente e comece a organizar roteiros incríveis com seus amigos.
        Link(href="/cadastro")
          AppButton(size="lg")
            CheckCircle.mr-2.h-4.w-4
            | Criar minha conta grátis

  AppFooter
</template>

<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import AppNavbar from '@/Components/Layout/AppNavbar.vue'
import AppFooter from '@/Components/Layout/AppFooter.vue'
import AppButton from '@/Components/App/AppButton.vue'
import {
  MapPin,
  Users,
  Wallet,
  Route,
  Cloud,
  Star,
  ArrowRight,
  CheckCircle,
} from 'lucide-vue-next'

defineProps<{
  title?: string
}>()

const features = [
  {
    icon: MapPin,
    title: 'Roteiros detalhados',
    description: 'Crie itinerários completos com voos, hospedagem, passeios e mais.',
  },
  {
    icon: Users,
    title: 'Colaboração em tempo real',
    description: 'Convide amigos e familiares para planejar juntos, com permissões de edição e visualização.',
  },
  {
    icon: Wallet,
    title: 'Controle de orçamento',
    description: 'Defina limites de gastos diários e acompanhe seus custos em tempo real.',
  },
  {
    icon: Route,
    title: 'Limites físicos',
    description: 'Configure distâncias máximas de caminhada por dia para um planejamento realista.',
  },
  {
    icon: Cloud,
    title: 'Informações climáticas',
    description: 'Consulte previsões do tempo e dicas sobre o clima do destino.',
  },
  {
    icon: Star,
    title: 'Avaliações e dicas',
    description: 'Veja avaliações de outros viajantes e adicione suas próprias dicas.',
  },
]

const steps = [
  { number: '1', title: 'Crie sua viagem', description: 'Defina destino, datas e orçamento em poucos cliques.' },
  { number: '2', title: 'Convide colaboradores', description: 'Adicione amigos para planejar juntos, cada um com sua permissão.' },
  { number: '3', title: 'Monte o roteiro', description: 'Adicione atividades, voos e hospedagem dia a dia.' },
  { number: '4', title: 'Viaje tranquilo', description: 'Acesse seu roteiro completo de qualquer dispositivo.' },
]

const testimonials = [
  {
    name: 'Mariana Costa',
    location: 'São Paulo, SP',
    text: 'O Roteirize transformou a forma como planejo minhas viagens. A colaboração em grupo é incrível!',
  },
  {
    name: 'Pedro Almeida',
    location: 'Rio de Janeiro, RJ',
    text: 'O controle de orçamento me salvou de gastar mais do que podia. Recomendo demais!',
  },
  {
    name: 'Ana Beatriz Silva',
    location: 'Belo Horizonte, MG',
    text: 'Finalmente uma plataforma que entende que viajar em grupo precisa de organização. Nota 10!',
  },
]
</script>
