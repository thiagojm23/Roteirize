<template lang="pug">
AuthLayout(
  title="Bem-vindo de volta"
  subtitle="Entre na sua conta para continuar"
)
  form(@submit.prevent="handleLogin" class="flex flex-col gap-4")
    AppAlert(v-if="authStore.error" variant="error" :description="authStore.error")

    AppInput(
      id="email"
      v-model="email"
      type="email"
      label="E-mail"
      placeholder="voce@exemplo.com"
      autocomplete="email"
      :required="true"
    )

    div(class="flex flex-col gap-1.5")
      div(class="flex items-center justify-between")
        Label(for="password" class="text-sm font-medium")
          | Senha
          span(class="ml-0.5 text-destructive") *
        RouterLink(
          :to="{ name: 'forgot-password' }"
          class="text-xs text-primary hover:text-primary/80 transition-colors"
        ) Esqueceu a senha?
      AppInput(
        id="password"
        v-model="password"
        type="password"
        placeholder="••••••••"
        autocomplete="current-password"
        :required="true"
      )

    AppButton(type="submit" :loading="authStore.isLoading" class="w-full justify-center mt-1")
      | Entrar

  div(class="mt-6 text-center text-sm text-muted-foreground")
    | Não tem uma conta?&nbsp;
    RouterLink(
      :to="{ name: 'register' }"
      class="font-medium text-primary hover:text-primary/80 transition-colors"
    ) Criar conta grátis
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AuthLayout from '@/components/layout/AuthLayout.vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppAlert from '@/components/ui/AppAlert.vue'
import { Label } from '@/components/ui/label'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    await authStore.login(email.value, password.value)
    router.push({ name: 'dashboard' })
  } catch {
    // error is set in the store
  }
}
</script>
