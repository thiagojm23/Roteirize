<template lang="pug">
AuthLayout(
  :title="success ? 'Senha redefinida!' : 'Redefinir senha'"
  :subtitle="success ? '' : 'Crie uma nova senha segura para sua conta'"
)
  //- Invalid token state
  div(v-if="invalidToken" class="flex flex-col items-center gap-4 text-center")
    div(class="flex size-14 items-center justify-center rounded-full bg-destructive/10")
      AlertTriangle(class="size-7 text-destructive")
    p(class="text-sm text-muted-foreground")
      | Link inválido ou expirado. Solicite um novo link de redefinição.
    RouterLink(:to="{ name: 'forgot-password' }")
      AppButton(variant="outline" class="justify-center") Solicitar novo link

  //- Success state
  div(v-else-if="success" class="flex flex-col items-center gap-4 text-center")
    div(class="flex size-14 items-center justify-center rounded-full bg-primary/10")
      CheckCircle(class="size-7 text-primary")
    div
      p(class="text-sm font-medium text-foreground") Senha alterada com sucesso!
      p(class="mt-1 text-xs text-muted-foreground")
        | Redirecionando para o login em instantes...
    RouterLink(
      :to="{ name: 'login' }"
      class="flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors"
    )
      | Ir para o login agora

  //- Form state
  form(v-else @submit.prevent="handleSubmit" class="flex flex-col gap-4")
    AppAlert(v-if="authStore.error" variant="error" :description="authStore.error")

    AppInput(
      id="password"
      v-model="password"
      type="password"
      label="Nova senha"
      placeholder="Mínimo 8 caracteres"
      autocomplete="new-password"
      hint="Mínimo de 8 caracteres"
      :required="true"
    )

    AppInput(
      id="confirm-password"
      v-model="confirmPassword"
      type="password"
      label="Confirmar nova senha"
      placeholder="Repita a nova senha"
      autocomplete="new-password"
      :error="confirmError"
      :required="true"
    )

    AppButton(type="submit" :loading="authStore.isLoading" class="w-full justify-center")
      KeyRound(class="size-4")
      | Redefinir senha

    RouterLink(
      :to="{ name: 'login' }"
      class="flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
    )
      ArrowLeft(class="size-4")
      | Voltar para o login
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { KeyRound, ArrowLeft, CheckCircle, AlertTriangle } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import AuthLayout from '@/components/layout/AuthLayout.vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppAlert from '@/components/ui/AppAlert.vue'

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

const password = ref('')
const confirmPassword = ref('')
const confirmError = ref('')
const success = ref(false)
const invalidToken = ref(false)

const token = computed(() => route.query.token as string | undefined)

onMounted(() => {
  if (!token.value) {
    invalidToken.value = true
  }
  authStore.clearError()
})

const handleSubmit = async () => {
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
    await authStore.resetPassword(token.value!, password.value)
    success.value = true
    setTimeout(() => router.push({ name: 'login' }), 3000)
  } catch {
    // error is set in the store
  }
}
</script>
