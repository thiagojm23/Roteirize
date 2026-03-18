import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import { useValidation } from '@/composables/useValidation'
import { validators } from '@/lib/validation'

describe('useValidation', () => {
  it('initializes all error fields as empty strings', () => {
    const fields = ref({ email: '', password: '' })
    const { errors } = useValidation(fields, {
      email: [validators.required, validators.email],
      password: [validators.required],
    })

    expect(errors.email).toBe('')
    expect(errors.password).toBe('')
  })

  it('validate() returns false and populates errors when fields are invalid', () => {
    const fields = ref({ email: '', password: '' })
    const { errors, validate } = useValidation(fields, {
      email: [validators.required, validators.email],
      password: [validators.required],
    })

    const result = validate()

    expect(result).toBe(false)
    expect(errors.email).toBe('Campo obrigatório')
    expect(errors.password).toBe('Campo obrigatório')
  })

  it('validate() returns true when all fields pass their rules', () => {
    const fields = ref({ email: 'user@test.com', password: 'Senha123' })
    const { errors, validate } = useValidation(fields, {
      email: [validators.required, validators.email],
      password: [validators.required, validators.password],
    })

    const result = validate()

    expect(result).toBe(true)
    expect(errors.email).toBe('')
    expect(errors.password).toBe('')
  })

  it('validateField() only validates a single field', () => {
    const fields = ref({ email: '', password: '' })
    const { errors, validateField } = useValidation(fields, {
      email: [validators.required],
      password: [validators.required],
    })

    validateField('email')

    expect(errors.email).toBe('Campo obrigatório')
    expect(errors.password).toBe('')
  })

  it('reset() clears all errors', () => {
    const fields = ref({ email: '' })
    const { errors, validate, reset } = useValidation(fields, {
      email: [validators.required],
    })

    validate()
    expect(errors.email).not.toBe('')

    reset()
    expect(errors.email).toBe('')
  })

  it('isValid computed is false when there are errors', () => {
    const fields = ref({ email: '' })
    const { validate, isValid } = useValidation(fields, {
      email: [validators.required],
    })

    validate()
    expect(isValid.value).toBe(false)
  })

  it('isValid computed is true when all errors are cleared', () => {
    const fields = ref({ email: 'test@test.com' })
    const { validate, isValid } = useValidation(fields, {
      email: [validators.required, validators.email],
    })

    validate()
    expect(isValid.value).toBe(true)
  })

  it('runs rules in order and stops at first failure', () => {
    const fields = ref({ email: '' })
    const { errors, validate } = useValidation(fields, {
      email: [validators.required, validators.email],
    })

    validate()

    // Should fail on required before even reaching email format check
    expect(errors.email).toBe('Campo obrigatório')
  })
})
