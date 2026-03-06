<template lang="pug">
AuthLayout(
  title="Crie sua conta"
  subtitle="Comece a criar roteiros incríveis hoje mesmo"
)
  form(@submit.prevent="handleRegister" class="flex flex-col gap-4")
    AppAlert(v-if="authStore.error" variant="error" :description="authStore.error")

    AppInput(
      id="name"
      v-model="name"
      type="text"
      label="Nome completo"
      placeholder="Seu nome"
      autocomplete="name"
      :required="true"
    )

    AppInput(
      id="email"
      v-model="email"
      type="email"
      label="E-mail"
      placeholder="voce@exemplo.com"
      autocomplete="email"
      :required="true"
    )

    AppInput(
      id="password"
      v-model="password"
      type="password"
      label="Senha"
      placeholder="Mínimo 8 caracteres"
      autocomplete="new-password"
      hint="Mínimo de 8 caracteres"
      :required="true"
    )

    AppInput(
      id="confirm-password"
      v-model="confirmPassword"
      type="password"
      label="Confirmar senha"
      placeholder="Repita sua senha"
      autocomplete="new-password"
      :error="confirmError"
      :required="true"
    )

    label(class="flex items-start gap-2.5 cursor-pointer")
      input(
        type="checkbox"
        v-model="acceptedTerms"
        required
        class="mt-0.5 size-4 rounded border-input accent-primary"
      )
      span(class="text-xs text-muted-foreground")
        | Aceito os&nbsp;
        a(href="#" class="text-primary hover:underline") Termos de Uso
        | &nbsp;e a&nbsp;
        a(href="#" class="text-primary hover:underline") Política de Privacidade

    AppButton(
      type="submit"
      :loading="authStore.isLoading"
      :disabled="!acceptedTerms"
      class="w-full justify-center mt-1"
    )
      | Criar conta

  div(class="mt-6 text-center text-sm text-muted-foreground")
    | Já tem uma conta?&nbsp;
    RouterLink(
      :to="{ name: 'login' }"
      class="font-medium text-primary hover:text-primary/80 transition-colors"
    ) Entrar
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AuthLayout from '@/components/layout/AuthLayout.vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppAlert from '@/components/ui/AppAlert.vue'

const authStore = useAuthStore()
const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const acceptedTerms = ref(false)

const confirmError = ref('')

const handleRegister = async () => {
  confirmError.value = ''
  if (password.value !== confirmPassword.value) {
    confirmError.value = 'As senhas não coincidem'
    return
  }
  if (password.value.length < 8) {
    confirmError.value = 'A senha deve ter pelo menos 8 caracteres'
    return
  }
  try {
    await authStore.register(name.value, email.value, password.value)
    router.push({ name: 'dashboard' })
  } catch {
    // error is set in the store
  }
}
</script>
