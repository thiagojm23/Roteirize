<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import AuthLayout from '@/components/layout/AuthLayout.vue'
import AppInput from '@/components/app/AppInput.vue'
import AppButton from '@/components/app/AppButton.vue'
import { useAuthStore } from '@/features/auth/stores/auth'
import { validators } from '@/lib/validation'

const router = useRouter()
const auth = useAuthStore()

const form = ref({ email: '', password: '' })

const emailRef = ref<InstanceType<typeof AppInput> | null>(null)
const passwordRef = ref<InstanceType<typeof AppInput> | null>(null)

async function handleSubmit() {
  const emailValid = emailRef.value?.validate() ?? false
  const passwordValid = passwordRef.value?.validate() ?? false

  if (!emailValid || !passwordValid) return

  const success = await auth.login(form.value.email, form.value.password)
  if (success) {
    router.push('/app')
  }
}
</script>

<template lang="pug">
AuthLayout
  .text-center.mb-6
    h1.text-2xl.font-bold Entrar
    p.text-sm.text-muted-foreground.mt-1 Acesse sua conta para continuar planejando

  form.space-y-4(@submit.prevent="handleSubmit")
    AppInput(
      ref="emailRef"
      v-model="form.email"
      label="E-mail"
      type="email"
      placeholder="seu@email.com"
      required
      autocomplete="email"
      :rules="[validators.required, validators.email]"
    )

    AppInput(
      ref="passwordRef"
      v-model="form.password"
      label="Senha"
      type="password"
      placeholder="Sua senha"
      required
      autocomplete="current-password"
      :rules="[validators.required]"
    )

    .flex.justify-end
      RouterLink.text-sm.text-primary(to="/esqueci-senha" class="hover:underline") Esqueceu a senha?

    p.text-sm.text-destructive.text-center(v-if="auth.error") {{ auth.error }}

    AppButton.w-full(type="submit" :loading="auth.isLoading") Entrar

  p.text-sm.text-center.text-muted-foreground.mt-6
    | Não tem uma conta?&nbsp;
    RouterLink.text-primary.font-medium(to="/cadastro" class="hover:underline") Cadastre-se
</template>
