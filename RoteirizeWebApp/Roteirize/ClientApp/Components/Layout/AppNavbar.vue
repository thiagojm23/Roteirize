<template lang="pug">
header.sticky.top-0.z-50.w-full.border-b.border-border.backdrop-blur(class="bg-background/95 supports-[backdrop-filter]:bg-background/60")
  .container.mx-auto.flex.h-16.items-center.justify-between.px-4.relative
    Link.flex.items-center.gap-2.font-bold.text-xl.text-primary(href="/")
      Compass.h-6.w-6
      | Roteirize

    nav.hidden.items-center.gap-6.absolute(class="md:flex left-1/2 -translate-x-1/2")
      a.text-base.font-medium.text-muted-foreground.transition-colors.cursor-pointer(class="hover:text-foreground"
        v-for="link in navLinks"
        :key="link.href"
        @click="scrollToSection(link.href)"
      ) {{ link.label }}

    .flex.items-center.gap-3
      button.cursor-pointer.rounded-md.p-2.text-muted-foreground.transition-colors(class="hover:text-foreground"
        @click="theme.toggle()"
        :aria-label="theme.isDark ? 'Ativar modo claro' : 'Ativar modo escuro'"
      )
        Sun.h-5.w-5(v-if="theme.isDark")
        Moon.h-5.w-5(v-else)

      .hidden.items-center.gap-2(class="md:flex")
        Link(href="/login")
          AppButton(variant="ghost" size="sm") Entrar
        Link(href="/cadastro")
          AppButton(size="sm") Cadastre-se

      button.rounded-md.p-2.text-muted-foreground(class="md:hidden"
        @click="mobileMenuOpen = !mobileMenuOpen"
      )
        X.h-5.w-5(v-if="mobileMenuOpen")
        Menu.h-5.w-5(v-else)

  //- Mobile menu
  .border-b.border-border.bg-background(v-if="mobileMenuOpen" class="md:hidden")
    nav.flex.flex-col.gap-2.p-4
      a.text-base.font-medium.text-muted-foreground.py-2.cursor-pointer(
        v-for="link in navLinks"
        :key="link.href"
        @click="scrollToSection(link.href)"
      ) {{ link.label }}
      .flex.flex-col.gap-2.pt-2.border-t.border-border
        Link(href="/login" @click="mobileMenuOpen = false")
          AppButton.w-full(variant="ghost" size="sm") Entrar
        Link(href="/cadastro" @click="mobileMenuOpen = false")
          AppButton.w-full(size="sm") Cadastre-se
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Link } from "@inertiajs/vue3";
import { useTheme } from "@/Composables/useTheme";
import { Menu, X, Sun, Moon, Compass } from "lucide-vue-next";
import AppButton from "@/Components/App/AppButton.vue";

const theme = useTheme();
const mobileMenuOpen = ref(false);

const navLinks = [
  { label: "Funcionalidades", href: "#features" },
  { label: "Como funciona", href: "#how-it-works" },
  { label: "Depoimentos", href: "#testimonials" },
];

function scrollToSection(href: string) {
  mobileMenuOpen.value = false;
  const currentPath = window.location.pathname;
  if (currentPath !== "/") {
    window.location.href = "/" + href;
    return;
  }
  const el = document.querySelector(href);
  el?.scrollIntoView({ behavior: "smooth" });
}
</script>
