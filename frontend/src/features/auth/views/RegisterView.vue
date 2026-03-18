<template lang="pug">
AuthLayout
  .text-center.mb-6
    h1.text-2xl.font-bold Criar conta
    p.text-base.text-muted-foreground.mt-1 Preencha os dados abaixo para começar

  form.space-y-4(@submit.prevent="handleSubmit")
    AppInput(
      ref="nameRef"
      v-model="form.name"
      label="Nome completo"
      placeholder="Seu nome"
      required
      autocomplete="name"
      :rules="[validators.required, validators.lettersOnly]"
    )

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
      ref="cpfRef"
      v-model="form.cpf"
      label="CPF"
      mask="cpf"
      placeholder="000.000.000-00"
      required
      :rules="[validators.required, validators.cpf]"
    )

    AppInput(
      ref="passwordRef"
      v-model="form.password"
      label="Senha"
      type="password"
      placeholder="Crie uma senha forte"
      required
      autocomplete="new-password"
      :rules="[validators.required, validators.password]"
    )

    AppInput(
      ref="confirmPasswordRef"
      v-model="form.confirmPassword"
      label="Confirmar senha"
      type="confirmPassword"
      placeholder="Repita sua senha"
      required
      autocomplete="new-password"
      :rules="[validators.required, validators.passwordMatch(() => form.password)]"
    )

    .space-y-1
      AppCheckbox(
        v-model="termsAccepted"
      )
        | Aceito os&nbsp;
        a.text-primary(href="#" class="hover:underline") termos de uso
        | &nbsp;e a&nbsp;
        a.text-primary(href="#" class="hover:underline") política de privacidade
      p.text-xs.text-destructive(v-if="termsError") {{ termsError }}

    p.text-base.text-destructive.text-center(v-if="auth.error") {{ auth.error }}

    AppButton.w-full(type="submit" :loading="auth.isLoading") Criar conta

  p.text-base.text-center.text-muted-foreground.mt-6
    | Já tem uma conta?&nbsp;
    RouterLink.text-primary.font-medium(to="/login" class="hover:underline") Entrar
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import AuthLayout from '@/components/layout/AuthLayout.vue'
import AppInput from '@/components/app/AppInput.vue'
import AppButton from '@/components/app/AppButton.vue'
import AppCheckbox from '@/components/app/AppCheckbox.vue'
import { useAuthStore } from '@/features/auth/stores/auth'
import { validators, strip } from '@/lib/validation'

const router = useRouter()
const auth = useAuthStore()

const form = ref({
  name: '',
  email: '',
  cpf: '',
  password: '',
  confirmPassword: '',
})

const termsAccepted = ref(false)
const termsError = ref('')

const nameRef = ref<InstanceType<typeof AppInput> | null>(null)
const emailRef = ref<InstanceType<typeof AppInput> | null>(null)
const cpfRef = ref<InstanceType<typeof AppInput> | null>(null)
const passwordRef = ref<InstanceType<typeof AppInput> | null>(null)
const confirmPasswordRef = ref<InstanceType<typeof AppInput> | null>(null)

const inputRefs = () => [nameRef, emailRef, cpfRef, passwordRef, confirmPasswordRef]

async function handleSubmit() {
  termsError.value = ''

  let allValid = true
  for (const inputRef of inputRefs()) {
    const valid = inputRef.value?.validate() ?? false
    if (!valid) allValid = false
  }

  if (!termsAccepted.value) {
    termsError.value = 'Você deve aceitar os termos de uso'
    allValid = false
  }

  if (!allValid) return

  const success = await auth.register({
    name: form.value.name,
    email: form.value.email,
    cpf: strip(form.value.cpf),
    password: form.value.password,
  })

  if (success) {
    router.push('/app')
  }
}
</script>
