// Shared types and utilities used across the application

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  createdAt?: string
}

export interface ApiError {
  message: string
  statusCode?: number
}

/** Calls the logout endpoint so the server can clear httponly cookies, then clears local state. */
export const logoutUser = async (): Promise<void> => {
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    })
  } catch {
    // Silently ignore — local state will be cleared regardless
  }
}

/** Refresh the access token using the httponly refresh token cookie. */
export const refreshAccessToken = async (): Promise<boolean> => {
  try {
    const res = await fetch('/api/auth/refresh', {
      method: 'POST',
      credentials: 'include',
    })
    return res.ok
  } catch {
    return false
  }
}

/** Returns the first two initials of a name in uppercase. */
export const getInitials = (name: string): string =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()

/** Formats a date string or Date object to pt-BR locale. */
export const formatDate = (date: string | Date): string =>
  new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' }).format(new Date(date))

/** Formats a date to a relative human-readable string (e.g. "há 2 dias"). */
export const formatRelativeDate = (date: string | Date): string => {
  const rtf = new Intl.RelativeTimeFormat('pt-BR', { numeric: 'auto' })
  const diffMs = new Date(date).getTime() - Date.now()
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24))
  if (Math.abs(diffDays) < 1) {
    const diffHours = Math.round(diffMs / (1000 * 60 * 60))
    return rtf.format(diffHours, 'hour')
  }
  return rtf.format(diffDays, 'day')
}

/** Truncates a string to the given length, appending "…" if needed. */
export const truncate = (str: string, length: number): string =>
  str.length > length ? `${str.slice(0, length)}…` : str

// ---------- Validatable utilities ----------

export interface ValidatableRef {
  validate: () => boolean
}

/** Calls validate() on each non-null ref, collects ALL results, returns true only if all pass. */
export const validateFields = (fields: (ValidatableRef | null | undefined)[]): boolean => {
  const results = fields
    .filter((f): f is ValidatableRef => f != null)
    .map((f) => f.validate())
  return results.every(Boolean)
}

/** Formats raw digits to CPF format: 000.000.000-00 */
export const formatCpf = (value: string): string => {
  const d = value.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 3) return d
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`
  if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`
}

/** Formats raw digits to CNPJ format: 00.000.000/0000-00 */
export const formatCnpj = (value: string): string => {
  const d = value.replace(/\D/g, '').slice(0, 14)
  if (d.length <= 2) return d
  if (d.length <= 5) return `${d.slice(0, 2)}.${d.slice(2)}`
  if (d.length <= 8) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`
  if (d.length <= 12) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`
  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`
}

/** Formats raw digits to phone format: (00) 00000-0000 or (00) 0000-0000 */
export const formatPhone = (value: string): string => {
  const d = value.replace(/\D/g, '').slice(0, 11)
  if (d.length === 0) return ''
  if (d.length <= 2) return `(${d}`
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

/** Formats raw digits to CEP format: 00000-000 */
export const formatCep = (value: string): string => {
  const d = value.replace(/\D/g, '').slice(0, 8)
  if (d.length <= 5) return d
  return `${d.slice(0, 5)}-${d.slice(5)}`
}

/** Validates CPF check digits using the standard Brazilian algorithm. */
export const validateCpf = (cpf: string): boolean => {
  const d = cpf.replace(/\D/g, '')
  if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false
  const calcDigit = (num: string, len: number): number => {
    let sum = 0
    for (let i = 0; i < len; i++) sum += parseInt(num.charAt(i)) * (len + 1 - i)
    const rem = (sum * 10) % 11
    return rem >= 10 ? 0 : rem
  }
  return calcDigit(d, 9) === parseInt(d.charAt(9)) && calcDigit(d, 10) === parseInt(d.charAt(10))
}

/** Validates CNPJ check digits using the standard Brazilian algorithm. */
export const validateCnpj = (cnpj: string): boolean => {
  const d = cnpj.replace(/\D/g, '')
  if (d.length !== 14 || /^(\d)\1{13}$/.test(d)) return false
  const calcDigit = (num: string, weights: number[]): number => {
    let sum = 0
    for (let i = 0; i < weights.length; i++) sum += parseInt(num.charAt(i)) * (weights[i] ?? 0)
    const rem = sum % 11
    return rem < 2 ? 0 : 11 - rem
  }
  const w1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  const w2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  return calcDigit(d, w1) === parseInt(d.charAt(12)) && calcDigit(d, w2) === parseInt(d.charAt(13))
}
