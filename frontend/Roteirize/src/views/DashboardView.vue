<template lang="pug">
div(class="min-h-screen bg-background")
  AppNavbar

  main(class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8")
    //- Page header
    PageHeader(:title="`Olá, ${firstName}`" subtitle="Aqui estão seus roteiros. Continue de onde parou.")
      template(#actions)
        AppButton(@click="() => {}")
          Plus(class="size-4")
          | Novo roteiro

    //- Search bar
    div(class="relative mb-6 mt-4")
      Search(class="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground")
      Input(
        v-model="searchQuery"
        type="search"
        placeholder="Buscar roteiros..."
        class="pl-9 sm:max-w-sm"
      )

    //- Empty state
    div(
      v-if="filteredScripts.length === 0"
      class="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border p-16 text-center"
    )
      div(class="flex size-14 items-center justify-center rounded-2xl bg-muted")
        FileText(class="size-7 text-muted-foreground")
      div
        p(class="font-medium text-foreground") Nenhum roteiro encontrado
        p(class="mt-1 text-sm text-muted-foreground")
          | {{ searchQuery ? 'Tente outro termo de busca.' : 'Crie seu primeiro roteiro para começar.' }}
      AppButton(v-if="!searchQuery" @click="() => {}")
        Plus(class="size-4")
        | Criar roteiro

    //- Scripts grid
    div(
      v-else
      class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    )
      div(
        v-for="script in filteredScripts"
        :key="script.id"
        class="group relative flex flex-col rounded-xl border border-border bg-card p-6 shadow-xs transition-shadow hover:shadow-md"
      )
        //- Card header
        div(class="mb-4 flex items-start justify-between")
          div(class="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary")
            Film(class="size-5")
          //- Actions dropdown
          DropdownMenu
            DropdownMenuTrigger(as-child)
              button(
                class="flex size-8 items-center justify-center rounded-lg text-muted-foreground opacity-0 transition-all hover:bg-accent group-hover:opacity-100"
                :aria-label="`Ações para ${script.title}`"
              )
                MoreHorizontal(class="size-4")
            DropdownMenuContent(align="end" :side-offset="6" class="w-44")
              DropdownMenuItem(class="cursor-pointer gap-2")
                FileDown(class="size-4")
                | Exportar PDF
              DropdownMenuItem(class="cursor-pointer gap-2")
                Users(class="size-4")
                | Gerenciar acesso
              DropdownMenuSeparator
              DropdownMenuItem(v-if="script.role === 'owner'" class="cursor-pointer gap-2 text-destructive focus:text-destructive")
                | Excluir

        //- Title and description
        div(class="flex-1")
          h3(class="font-semibold text-card-foreground") {{ script.title }}
          p(class="mt-1 text-sm leading-relaxed text-muted-foreground")
            | {{ truncate(script.description, 80) }}

        //- Footer
        div(class="mt-4 flex items-center justify-between")
          AppBadge(:variant="roleBadgeVariant[script.role]") {{ roleLabel[script.role] }}
          div(class="flex items-center gap-3 text-xs text-muted-foreground")
            TooltipProvider(:delay-duration="300")
              Tooltip
                TooltipTrigger(as-child)
                  div(class="flex items-center gap-1")
                    Users(class="size-3")
                    | {{ script.collaborators }}
                TooltipContent(:side-offset="4")
                  | {{ script.collaborators }} colaborador{{ script.collaborators !== 1 ? 'es' : '' }}
            TooltipProvider(:delay-duration="300")
              Tooltip
                TooltipTrigger(as-child)
                  div(class="flex items-center gap-1")
                    Clock(class="size-3")
                    | {{ formatRelativeDate(script.updatedAt) }}
                TooltipContent(:side-offset="4")
                  | Última edição
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  Plus,
  Film,
  FileDown,
  Users,
  MoreHorizontal,
  Clock,
  Search,
  FileText,
} from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import AppNavbar from '@/components/layout/AppNavbar.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppBadge from '@/components/ui/AppBadge.vue'
import { useAuthStore } from '@/stores/auth'
import { formatRelativeDate, truncate } from '@/shared/utils'

const authStore = useAuthStore()

// Mock script data — replace with API calls
interface Script {
  id: string
  title: string
  description: string
  updatedAt: string
  collaborators: number
  role: 'owner' | 'editor' | 'viewer'
}

const scripts = ref<Script[]>([
  {
    id: '1',
    title: 'O Último Suspiro',
    description: 'Um drama psicológico sobre memória e identidade',
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    collaborators: 3,
    role: 'owner',
  },
  {
    id: '2',
    title: 'Cidade de Ferro',
    description: 'Ficção científica distópica ambientada em 2087',
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    collaborators: 1,
    role: 'owner',
  },
  {
    id: '3',
    title: 'Entre Nós',
    description: 'Comédia romântica em três atos',
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    collaborators: 5,
    role: 'editor',
  },
])

const searchQuery = ref('')

const filteredScripts = computed(() =>
  scripts.value.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.value.toLowerCase()),
  ),
)

const roleLabel: Record<Script['role'], string> = {
  owner: 'Proprietário',
  editor: 'Editor',
  viewer: 'Visualizador',
}

const roleBadgeVariant: Record<Script['role'], 'default' | 'secondary' | 'outline'> = {
  owner: 'default',
  editor: 'secondary',
  viewer: 'outline',
}

const firstName = computed(() => authStore.user?.name?.split(' ')[0] ?? 'usuário')

onMounted(() => {
  // TODO: fetch real scripts from API
})
</script>
