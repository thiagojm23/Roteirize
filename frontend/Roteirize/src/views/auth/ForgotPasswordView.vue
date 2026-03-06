<template lang="pug">
AuthLayout(
  :title="submitted ? 'Verifique seu e-mail' : 'Esqueceu sua senha?'"
  :subtitle="submitted ? '' : 'Enviaremos um link para redefinir sua senha'"
)
  //- Success state
  div(v-if="submitted" class="flex flex-col items-center gap-4 text-center")
    div(class="flex size-14 items-center justify-center rounded-full bg-primary/10")
      CheckCircle(class="size-7 text-primary")
    div
      p(class="text-sm text-muted-foreground")
        | Enviamos um link de redefinição para
      p(class="mt-0.5 font-medium text-foreground") {{ email }}
    p(class="text-xs text-muted-foreground")
      | Não recebeu? Verifique a pasta de spam ou&nbsp;
      button(
        @click="submitted = false"
        class="text-primary hover:underline"
      ) tente novamente
    RouterLink(
      :to="{ name: 'login' }"
      class="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
    )
      ArrowLeft(class="size-4")
      | Voltar para o login

  //- Form state
  form(v-else @submit.prevent="handleSubmit" class="flex flex-col gap-4")
    AppAlert(v-if="authStore.error" variant="error" :description="authStore.error")

    AppInput(
      id="email"
      v-model="email"
      type="email"
      label="E-mail"
      placeholder="voce@exemplo.com"
      autocomplete="email"
      hint="Insira o e-mail cadastrado na sua conta"
      :required="true"
    )

    AppButton(type="submit" :loading="authStore.isLoading" class="w-full justify-center")
      Mail(class="size-4")
      | Enviar link de redefinição

    RouterLink(
      :to="{ name: 'login' }"
      class="flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
    )
      ArrowLeft(class="size-4")
      | Voltar para o login
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Mail, ArrowLeft, CheckCircle } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import AuthLayout from '@/components/layout/AuthLayout.vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppAlert from '@/components/ui/AppAlert.vue'

const authStore = useAuthStore()

const email = ref('')
const submitted = ref(false)

const handleSubmit = async () => {
  try {
    await authStore.forgotPassword(email.value)
    submitted.value = true
  } catch {
    // error is set in the store
  }
}
</script>
