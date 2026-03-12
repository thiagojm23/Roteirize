<template lang="pug">
AuthLayout(title="Recuperar Senha" subtitle="Informe seu e-mail para receber o link de recuperação")
  //- Success state
  template(v-if="emailSent")
    article.primary-container.center-align
      i.extra.primary-text mark_email_read
      h5 E-mail enviado!
      p Enviamos um link de recuperação para:
      p
        strong {{ email }}
      p Verifique sua caixa de entrada e spam.
    nav.center-align
      button.border(@click="emailSent = false")
        i refresh
        span Tentar novamente
      RouterLink.button(:to="{ name: 'login' }")
        i arrow_back
        span Voltar ao login

  //- Form state
  template(v-else)
    form(@submit.prevent="handleForgotPassword")
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
      AppButton(
        type="submit"
        :loading="authStore.isLoading"
        fullWidth
      ) Enviar link de recuperação

    div.divider

    nav.center-align
      RouterLink.link(:to="{ name: 'login' }")
        i arrow_back
        span Voltar ao login
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import AuthLayout from '@/components/layout/AuthLayout.vue'
import AppInput from '@/components/appComponents/AppInput.vue'
import AppButton from '@/components/appComponents/AppButton.vue'
import { useAuthStore } from '@/stores/auth'
import { validateFields } from '@/shared/utils'
import type { ValidatableRef } from '@/shared/utils'

const authStore = useAuthStore()

const email = ref('')
const emailSent = ref(false)
const emailRef = ref<ValidatableRef | null>(null)

const handleForgotPassword = async () => {
  if (!validateFields([emailRef.value])) return
  try {
    await authStore.forgotPassword(email.value)
    emailSent.value = true
  } catch {
    // error is handled by the store
  }
}
</script>
