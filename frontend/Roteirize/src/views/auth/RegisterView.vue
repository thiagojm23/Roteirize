<template lang="pug">
AuthLayout(title="Criar Conta" subtitle="Cadastre-se para começar a planejar suas viagens")
  //- Error snackbar
  div.snackbar.error(:class="{ 'active': !!authStore.error }")
    i warning
    span {{ authStore.error }}

  form(@submit.prevent="handleRegister")
    AppInput(
      ref="nameRef"
      v-model="name"
      label="Nome completo"
      placeholder="Seu nome"
      prefixIcon="person"
      autocomplete="name"
      required
    )
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
      placeholder="Mínimo 8 caracteres"
      prefixIcon="lock"
      autocomplete="new-password"
      required
    )
    AppInput(
      ref="confirmPasswordRef"
      v-model="confirmPassword"
      type="password"
      label="Confirmar senha"
      placeholder="Repita a senha"
      prefixIcon="lock"
      autocomplete="new-password"
      required
    )
    AppCheckbox(
      ref="termsRef"
      v-model="termsAccepted"
      label="Aceito os Termos de Uso e Política de Privacidade"
      required
    )
    AppButton(
      type="submit"
      :loading="authStore.isLoading"
      fullWidth
    ) Cadastrar

  div.divider

  p.center-align
    | Já tem uma conta?
    |
    RouterLink.link(:to="{ name: 'login' }") Entrar
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import AuthLayout from '@/components/layout/AuthLayout.vue'
import AppInput from '@/components/appComponents/AppInput.vue'
import AppButton from '@/components/appComponents/AppButton.vue'
import AppCheckbox from '@/components/appComponents/AppCheckbox.vue'
import { useAuthStore } from '@/stores/auth'
import { validateFields } from '@/shared/utils'
import type { ValidatableRef } from '@/shared/utils'

const router = useRouter()
const authStore = useAuthStore()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const termsAccepted = ref(false)

const nameRef = ref<ValidatableRef | null>(null)
const emailRef = ref<ValidatableRef | null>(null)
const passwordRef = ref<ValidatableRef | null>(null)
const confirmPasswordRef = ref<ValidatableRef | null>(null)
const termsRef = ref<ValidatableRef | null>(null)

const handleRegister = async () => {
  if (!validateFields([nameRef.value, emailRef.value, passwordRef.value, confirmPasswordRef.value, termsRef.value])) return

  if (password.value.length < 8) {
    authStore.error = 'A senha deve ter no mínimo 8 caracteres'
    return
  }

  if (password.value !== confirmPassword.value) {
    authStore.error = 'As senhas não conferem'
    return
  }

  try {
    await authStore.register(name.value, email.value, password.value)
    router.push({ name: 'dashboard' })
  } catch {
    // error is handled by the store
  }
}
</script>
