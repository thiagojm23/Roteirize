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
