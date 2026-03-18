<template lang="pug">
AuthLayout
  .text-center.mb-6
    h1.text-2xl.font-bold Entrar
    p.text-base.text-muted-foreground.mt-1 Acesse sua conta para continuar planejando

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
      Link.text-base.text-primary(href="/esqueci-senha" class="hover:underline") Esqueceu a senha?

    p.text-base.text-destructive.text-center(v-if="error") {{ error }}

    AppButton.w-full(type="submit" :loading="isLoading") Entrar

  p.text-base.text-center.text-muted-foreground.mt-6
    | Não tem uma conta?&nbsp;
    Link.text-primary.font-medium(href="/cadastro" class="hover:underline") Cadastre-se
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Link, router } from '@inertiajs/vue3'
import AuthLayout from '@/Components/Layout/AuthLayout.vue'
import AppInput from '@/Components/App/AppInput.vue'
import AppButton from '@/Components/App/AppButton.vue'
import { validators } from '@/Utils/validation'

defineProps<{
  error?: string
}>()

const form = ref({ email: '', password: '' })
const isLoading = ref(false)

const emailRef = ref<InstanceType<typeof AppInput> | null>(null)
const passwordRef = ref<InstanceType<typeof AppInput> | null>(null)

function handleSubmit() {
  const emailValid = emailRef.value?.validate() ?? false
  const passwordValid = passwordRef.value?.validate() ?? false

  if (!emailValid || !passwordValid) return

  isLoading.value = true
  router.post('/auth/login', form.value, {
    onFinish: () => { isLoading.value = false },
  })
}
</script>
