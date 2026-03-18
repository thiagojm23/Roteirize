<template lang="pug">
AuthLayout
  .text-center.mb-6
    h1.text-2xl.font-bold Esqueceu a senha?
    p.text-base.text-muted-foreground.mt-1 Informe seu e-mail para receber as instruções de recuperação

  template(v-if="!submitted")
    form.space-y-4(@submit.prevent="handleSubmit")
      AppInput(
        ref="emailRef"
        v-model="email"
        label="E-mail"
        type="email"
        placeholder="seu@email.com"
        required
        autocomplete="email"
        :rules="[validators.required, validators.email]"
      )

      p.text-base.text-destructive.text-center(v-if="auth.error") {{ auth.error }}

      AppButton.w-full(type="submit" :loading="auth.isLoading") Enviar instruções

  template(v-else)
    AppAlert(variant="success" :icon="CheckCircle")
      | Enviamos um e-mail para
      strong  {{ email }}
      |  com as instruções para redefinir sua senha. Verifique sua caixa de entrada.

  .mt-6.text-center
    RouterLink.inline-flex.items-center.gap-1.text-base.text-primary(to="/login" class="hover:underline")
      ArrowLeft.h-4.w-4
      | Voltar para o login
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import AuthLayout from '@/components/layout/AuthLayout.vue'
import AppInput from '@/components/app/AppInput.vue'
import AppButton from '@/components/app/AppButton.vue'
import AppAlert from '@/components/app/AppAlert.vue'
import { useAuthStore } from '@/features/auth/stores/auth'
import { validators } from '@/lib/validation'
import { CheckCircle, ArrowLeft } from 'lucide-vue-next'

const auth = useAuthStore()
const email = ref('')
const emailRef = ref<InstanceType<typeof AppInput> | null>(null)
const submitted = ref(false)

async function handleSubmit() {
  const valid = emailRef.value?.validate() ?? false
  if (!valid) return

  const success = await auth.forgotPassword(email.value)
  if (success) {
    submitted.value = true
  }
}
</script>
