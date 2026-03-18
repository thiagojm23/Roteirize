import { computed, reactive, type Ref } from 'vue'
import type { ValidatorFn } from '@/Utils/validation'

export function useValidation<T extends Record<string, string>>(
  fields: Ref<T>,
  rules: Partial<Record<keyof T, ValidatorFn[]>>,
) {
  const errors = reactive<Record<string, string>>(
    Object.fromEntries(Object.keys(fields.value).map((k) => [k, ''])),
  )

  function validateField(field: keyof T): boolean {
    const fieldRules = rules[field]
    if (!fieldRules) {
      errors[field as string] = ''
      return true
    }

    for (const rule of fieldRules) {
      const result = rule(fields.value[field] ?? '')
      if (result !== true) {
        errors[field as string] = result
        return false
      }
    }

    errors[field as string] = ''
    return true
  }

  function validate(): boolean {
    let allValid = true
    for (const field of Object.keys(rules)) {
      if (!validateField(field as keyof T)) {
        allValid = false
      }
    }
    return allValid
  }

  function reset() {
    for (const key of Object.keys(errors)) {
      errors[key] = ''
    }
  }

  const isValid = computed(() => Object.values(errors).every((e) => !e))

  return { errors, validate, validateField, isValid, reset }
}
