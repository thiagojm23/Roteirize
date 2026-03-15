export type ValidatorFn = (value: string) => true | string

export function strip(value: string): string {
  return value.replace(/[.\-/() ]/g, '')
}

export function formatCpf(value: string): string {
  const digits = strip(value).slice(0, 11)
  return digits
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

export function formatCnpj(value: string): string {
  const digits = strip(value).slice(0, 14)
  return digits
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})$/, '$1-$2')
}

export function formatPhone(value: string): string {
  const digits = strip(value).slice(0, 11)
  if (digits.length <= 10) {
    return digits
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d{1,4})$/, '$1-$2')
  }
  return digits
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d{1,4})$/, '$1-$2')
}

export function formatZipCode(value: string): string {
  const digits = strip(value).slice(0, 8)
  return digits.replace(/(\d{5})(\d{1,3})$/, '$1-$2')
}

function isValidCpf(cpf: string): boolean {
  const digits = strip(cpf)
  if (digits.length !== 11) return false
  if (/^(\d)\1{10}$/.test(digits)) return false

  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += Number(digits[i]) * (10 - i)
  }
  let remainder = (sum * 10) % 11
  if (remainder === 10) remainder = 0
  if (remainder !== Number(digits[9])) return false

  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += Number(digits[i]) * (11 - i)
  }
  remainder = (sum * 10) % 11
  if (remainder === 10) remainder = 0
  return remainder === Number(digits[10])
}

function isValidCnpj(cnpj: string): boolean {
  const digits = strip(cnpj)
  if (digits.length !== 14) return false
  if (/^(\d)\1{13}$/.test(digits)) return false

  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

  let sum = 0
  for (let i = 0; i < 12; i++) {
    sum += Number(digits[i]) * weights1[i]!
  }
  let remainder = sum % 11
  const firstDigit = remainder < 2 ? 0 : 11 - remainder
  if (firstDigit !== Number(digits[12])) return false

  sum = 0
  for (let i = 0; i < 13; i++) {
    sum += Number(digits[i]) * weights2[i]!
  }
  remainder = sum % 11
  const secondDigit = remainder < 2 ? 0 : 11 - remainder
  return secondDigit === Number(digits[13])
}

export const validators = {
  required: (value: string): true | string =>
    !!value.trim() || 'Campo obrigatório',

  email: (value: string): true | string =>
    !value.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'E-mail inválido',

  cpf: (value: string): true | string =>
    !value.trim() || isValidCpf(strip(value)) || 'CPF inválido',

  cnpj: (value: string): true | string =>
    !value.trim() || isValidCnpj(strip(value)) || 'CNPJ inválido',

  minLength:
    (n: number): ValidatorFn =>
    (value: string): true | string =>
      !value.trim() || value.length >= n || `Mínimo de ${n} caracteres`,

  password: (value: string): true | string =>
    !value.trim() ||
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value) ||
    'Senha deve ter 8+ caracteres, maiúscula, minúscula e número',

  passwordMatch:
    (compare: () => string): ValidatorFn =>
    (value: string): true | string =>
      !value.trim() || value === compare() || 'As senhas não conferem',

  phone: (value: string): true | string =>
    !value.trim() || /^\(\d{2}\)\s?\d{4,5}-\d{4}$/.test(value) || 'Telefone inválido',

  zipCode: (value: string): true | string =>
    !value.trim() || /^\d{5}-?\d{3}$/.test(strip(value)) || 'CEP inválido',

  numbersOnly: (value: string): true | string =>
    !value.trim() || /^\d+$/.test(strip(value)) || 'Apenas números são permitidos',

  lettersOnly: (value: string): true | string =>
    !value.trim() || /^[a-zA-ZÀ-ÿ\s]+$/.test(value) || 'Apenas letras são permitidas',
}

export type MaskType = 'cpf' | 'cnpj' | 'phone' | 'zipCode' | 'numbersOnly'

export const masks: Record<MaskType, (value: string) => string> = {
  cpf: formatCpf,
  cnpj: formatCnpj,
  phone: formatPhone,
  zipCode: formatZipCode,
  numbersOnly: (value: string) => strip(value).replace(/\D/g, ''),
}
