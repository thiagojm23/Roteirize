<template lang="pug">
AppSidenav(
  :items="navItems"
  :logo="Compass"
  title="Roteirize"
  :on-logout="handleLogout"
)
</template>

<script setup lang="ts">
import { router } from "@inertiajs/vue3";
import { LayoutDashboard, Map, Settings, Compass } from "lucide-vue-next";
import AppSidenav, { type NavItem } from "@/Components/App/AppSidenav.vue";

const navItems: NavItem[] = [
  { name: "dashboard", label: "Painel", href: "/app", icon: LayoutDashboard },
  {
    name: "itineraries",
    label: "Meus Roteiros",
    href: "/app/itineraries",
    icon: Map,
  },
  {
    name: "settings",
    label: "Configurações",
    href: "/app/settings",
    icon: Settings,
  },
];

function handleLogout() {
  router.post("/auth/logout");
}
</script>
