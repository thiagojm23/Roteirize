export interface ApiError {
  message: string
  status: number
  details?: unknown
}

export type ApiResult<T> = { data: T; error?: never } | { data?: never; error: ApiError }

const BASE_URL = import.meta.env.VITE_API_URL ?? '/api'

let isRefreshing = false

async function request<T>(
  method: string,
  url: string,
  body?: unknown,
  retry = true,
): Promise<ApiResult<T>> {
  const headers: Record<string, string> = {}

  if (body !== undefined) {
    headers['Content-Type'] = 'application/json'
  }

  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      method,
      headers,
      credentials: 'include',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })

    if (response.status === 401 && retry && !isRefreshing) {
      isRefreshing = true
      const refreshResult = await fetch(`${BASE_URL}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
      })
      isRefreshing = false

      if (refreshResult.ok) {
        return request<T>(method, url, body, false)
      }
    }

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null)
      return {
        error: {
          message: (errorBody as { message?: string })?.message ?? response.statusText,
          status: response.status,
          details: errorBody,
        },
      }
    }

    if (response.status === 204) {
      return { data: undefined as T }
    }

    const data = (await response.json()) as T
    return { data }
  } catch (err) {
    return {
      error: {
        message: err instanceof Error ? err.message : 'Erro de conexão',
        status: 0,
      },
    }
  }
}

export const api = {
  get: <T>(url: string) => request<T>('GET', url),
  post: <T>(url: string, body?: unknown) => request<T>('POST', url, body),
  put: <T>(url: string, body?: unknown) => request<T>('PUT', url, body),
  patch: <T>(url: string, body?: unknown) => request<T>('PATCH', url, body),
  delete: <T>(url: string) => request<T>('DELETE', url),
}
