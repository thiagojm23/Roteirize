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

      p.text-base.text-destructive.text-center(v-if="error") {{ error }}

      AppButton.w-full(type="submit" :loading="isLoading") Enviar instruções

  template(v-else)
    AppAlert(variant="success" :icon="CheckCircle")
      | Enviamos um e-mail para
      strong  {{ email }}
      |  com as instruções para redefinir sua senha. Verifique sua caixa de entrada.

  .mt-6.text-center
    Link.inline-flex.items-center.gap-1.text-base.text-primary(href="/login" class="hover:underline")
      ArrowLeft.h-4.w-4
      | Voltar para o login
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Link, router } from '@inertiajs/vue3'
import AuthLayout from '@/Components/Layout/AuthLayout.vue'
import AppInput from '@/Components/App/AppInput.vue'
import AppButton from '@/Components/App/AppButton.vue'
import AppAlert from '@/Components/App/AppAlert.vue'
import { validators } from '@/Utils/validation'
import { CheckCircle, ArrowLeft } from 'lucide-vue-next'

defineProps<{
  error?: string
}>()

const email = ref('')
const emailRef = ref<InstanceType<typeof AppInput> | null>(null)
const submitted = ref(false)
const isLoading = ref(false)

function handleSubmit() {
  const valid = emailRef.value?.validate() ?? false
  if (!valid) return

  isLoading.value = true
  router.post('/auth/forgot-password', { email: email.value }, {
    onSuccess: () => { submitted.value = true },
    onFinish: () => { isLoading.value = false },
  })
}
</script>
