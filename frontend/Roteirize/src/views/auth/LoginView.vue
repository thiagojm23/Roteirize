<template lang="pug">
AuthLayout(title="Entrar" subtitle="Acesse sua conta para continuar")
  //- Error snackbar
  div.snackbar.error(:class="{ 'active': !!authStore.error }")
    i warning
    span {{ authStore.error }}

  form(@submit.prevent="handleLogin")
    AppInput(
      ref="emailRef"
      v-model="email"
      type="email"
      label="E-mail"
      placeholder="seu@email.com"
      prefixIcon="mail"
      autocomplete="email"
      required
    )
    AppInput(
      ref="passwordRef"
      v-model="password"
      type="password"
      label="Senha"
      placeholder="••••••••"
      prefixIcon="lock"
      autocomplete="current-password"
      required
    )
    nav.right-align
      RouterLink.link(:to="{ name: 'forgot-password' }") Esqueceu a senha?
    AppButton(
      type="submit"
      :loading="authStore.isLoading"
      fullWidth
    ) Entrar

  div.divider

  p.center-align
    | Não tem uma conta?
    |
    RouterLink.link(:to="{ name: 'register' }") Cadastre-se
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import AuthLayout from '@/components/layout/AuthLayout.vue'
import AppInput from '@/components/appComponents/AppInput.vue'
import AppButton from '@/components/appComponents/AppButton.vue'
import { useAuthStore } from '@/stores/auth'
import { validateFields } from '@/shared/utils'
import type { ValidatableRef } from '@/shared/utils'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const emailRef = ref<ValidatableRef | null>(null)
const passwordRef = ref<ValidatableRef | null>(null)

const handleLogin = async () => {
  if (!validateFields([emailRef.value, passwordRef.value])) return
  try {
    await authStore.login(email.value, password.value)
    router.push({ name: 'dashboard' })
  } catch {
    // error is handled by the store
  }
}
</script>
