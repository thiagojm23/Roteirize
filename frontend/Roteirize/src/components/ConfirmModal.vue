<template lang="pug">
AppModal(
  :open="open"
  :title="title"
  :description="description"
  :max-width="maxWidth"
  @update:open="$emit('update:open', $event)"
)
  template(v-if="activeButtons.length" #footer)
    //- 1-2 buttons: row; 3-4 buttons: wrap
    div(:class="footerClass")
      Button(
        v-for="btn in activeButtons"
        :key="btn.text"
        :variant="btn.variant ?? 'default'"
        :size="btn.size ?? 'default'"
        @click="btn.action"
      )
        | {{ btn.text }}
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Button } from '@/components/ui/button'
import AppModal from '@/components/AppModal.vue'

type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon'

export interface ModalButton {
  text: string
  action: () => void
  variant?: ButtonVariant
  size?: ButtonSize
}

interface Props {
  open: boolean
  title?: string
  description?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  /** Primary button (first, right-aligned) — defaults to "Confirmar" */
  primaryText?: string
  primaryAction?: () => void
  primaryVariant?: ButtonVariant
  /** Secondary button — defaults to "Cancelar" */
  secondaryText?: string
  secondaryAction?: () => void
  secondaryVariant?: ButtonVariant
  /** Optional third button */
  tertiaryText?: string
  tertiaryAction?: () => void
  tertiaryVariant?: ButtonVariant
  /** Optional fourth button */
  quaternaryText?: string
  quaternaryAction?: () => void
  quaternaryVariant?: ButtonVariant
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Confirmar ação',
  primaryText: 'Confirmar',
  primaryVariant: 'default',
  secondaryText: 'Cancelar',
  secondaryVariant: 'outline',
  tertiaryVariant: 'ghost',
  quaternaryVariant: 'ghost',
})

defineEmits<{ 'update:open': [value: boolean] }>()

const allButtons = computed<(ModalButton | null)[]>(() => [
  props.primaryAction
    ? { text: props.primaryText!, action: props.primaryAction, variant: props.primaryVariant }
    : null,
  props.secondaryAction
    ? { text: props.secondaryText!, action: props.secondaryAction, variant: props.secondaryVariant }
    : null,
  props.tertiaryText && props.tertiaryAction
    ? { text: props.tertiaryText, action: props.tertiaryAction, variant: props.tertiaryVariant }
    : null,
  props.quaternaryText && props.quaternaryAction
    ? { text: props.quaternaryText, action: props.quaternaryAction, variant: props.quaternaryVariant }
    : null,
])

const activeButtons = computed(() => allButtons.value.filter((b): b is ModalButton => b !== null))

// 3+ buttons wrap; 1-2 buttons align to the end in a row
const footerClass = computed(() =>
  activeButtons.value.length >= 3
    ? 'flex flex-wrap gap-2'
    : 'flex items-center justify-end gap-2',
)
</script>
