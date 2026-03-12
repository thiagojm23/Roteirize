<template lang="pug">
AuthLayout(title="Redefinir Senha" subtitle="Crie uma nova senha para sua conta")
  //- Invalid token state
  template(v-if="tokenInvalid")
    article.error-container.center-align
      i.extra error
      h5 Token inválido
      p O link de recuperação é inválido ou expirou.
    nav.center-align
      RouterLink.button(:to="{ name: 'forgot-password' }")
        i mail
        span Solicitar novo link

  //- Success state
  template(v-else-if="resetSuccess")
    article.primary-container.center-align
      i.extra.primary-text check_circle
      h5 Senha redefinida!
      p Sua senha foi alterada com sucesso.
      p Redirecionando para o login em {{ countdown }}s...
    nav.center-align
      RouterLink.button(:to="{ name: 'login' }")
        i arrow_back
        span Ir para login

  //- Form state
  template(v-else)
    div.snackbar.error(:class="{ 'active': !!authStore.error }")
      i warning
      span {{ authStore.error }}

    form(@submit.prevent="handleResetPassword")
      AppInput(
        ref="passwordRef"
        v-model="password"
        type="password"
        label="Nova senha"
        placeholder="Mínimo 8 caracteres"
        prefixIcon="lock"
        autocomplete="new-password"
        required
      )
      AppInput(
        ref="confirmPasswordRef"
        v-model="confirmPassword"
        type="password"
        label="Confirmar nova senha"
        placeholder="Repita a nova senha"
        prefixIcon="lock"
        autocomplete="new-password"
        required
      )
      AppButton(
        type="submit"
        :loading="authStore.isLoading"
        fullWidth
      ) Redefinir senha
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import AuthLayout from '@/components/layout/AuthLayout.vue'
import AppInput from '@/components/appComponents/AppInput.vue'
import AppButton from '@/components/appComponents/AppButton.vue'
import { useAuthStore } from '@/stores/auth'
import { validateFields } from '@/shared/utils'
import type { ValidatableRef } from '@/shared/utils'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const password = ref('')
const confirmPassword = ref('')
const tokenInvalid = ref(false)
const resetSuccess = ref(false)
const countdown = ref(3)

const passwordRef = ref<ValidatableRef | null>(null)
const confirmPasswordRef = ref<ValidatableRef | null>(null)

onMounted(() => {
  const token = route.query.token as string
  if (!token) tokenInvalid.value = true
})

const handleResetPassword = async () => {
  if (!validateFields([passwordRef.value, confirmPasswordRef.value])) return

  if (password.value.length < 8) {
    authStore.error = 'A senha deve ter no mínimo 8 caracteres'
    return
  }

  if (password.value !== confirmPassword.value) {
    authStore.error = 'As senhas não conferem'
    return
  }

  try {
    const token = route.query.token as string
    await authStore.resetPassword(token, password.value)
    resetSuccess.value = true
    const interval = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) {
        clearInterval(interval)
        router.push({ name: 'login' })
      }
    }, 1000)
  } catch {
    // error is handled by the store
  }
}
</script>
