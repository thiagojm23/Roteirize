<template lang="pug">
div(:class="props.class")
  div.relative.flex.flex-col.items-center.justify-center.rounded-lg.border-2.border-dashed.p-6.transition-colors.cursor-pointer(
    data-dropzone
    :class="isDragOver ? 'border-primary bg-primary/5' : 'border-border'"
    @dragover.prevent="isDragOver = true"
    @dragleave="isDragOver = false"
    @drop.prevent="handleDrop"
    @click="inputRef?.click()"
  )
    Upload.h-8.w-8.text-muted-foreground.mb-2
    p.text-base.text-muted-foreground Arraste arquivos aqui ou clique para selecionar
    p.text-sm.text-muted-foreground.mt-1(v-if="maxFiles") Máximo de {{ maxFiles }} arquivo(s)
    input.hidden(
      ref="inputRef"
      type="file"
      :accept="accept"
      :multiple="maxFiles > 1"
      @change="handleInputChange"
    )
  .flex.flex-wrap.gap-2.mt-3(v-if="model && model.length")
    .relative.rounded-md.border.border-border.p-1(
      v-for="(file, idx) in model"
      :key="idx"
    )
      span.text-sm.text-muted-foreground.px-2 {{ file.name }}
      button.absolute.-top-1.-right-1.rounded-full.bg-destructive.text-destructive-foreground.p-px(
        type="button"
        class="size-4 flex items-center justify-center text-xs"
        @click="removeFile(idx)"
      ) &times;
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Upload } from 'lucide-vue-next'

interface Props {
  accept?: string
  maxFiles?: number
  maxSizeMb?: number
  class?: string
}

const model = defineModel<File[]>({ default: () => [] })

const props = withDefaults(defineProps<Props>(), {
  accept: '',
  maxFiles: 5,
  maxSizeMb: 10,
  class: undefined,
})

const isDragOver = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)

function addFiles(files: FileList | File[]) {
  const incoming = Array.from(files)
  const filtered = incoming.filter((f) => {
    if (props.maxSizeMb && f.size > props.maxSizeMb * 1024 * 1024) return false
    return true
  })
  const current = model.value ?? []
  const merged = [...current, ...filtered].slice(0, props.maxFiles)
  model.value = merged
}

function handleDrop(e: DragEvent) {
  isDragOver.value = false
  if (e.dataTransfer?.files) addFiles(e.dataTransfer.files)
}

function handleInputChange(e: Event) {
  const target = e.target as HTMLInputElement
  if (target.files) addFiles(target.files)
  target.value = ''
}

function removeFile(idx: number) {
  model.value = model.value.filter((_, i) => i !== idx)
}
</script>
