import { HttpResponse } from 'msw'

export function inertiaPage(
  component: string,
  props: Record<string, unknown>,
  url: string,
): HttpResponse<Record<string, unknown>> {
  return HttpResponse.json(
    { component, props, url, version: '1' },
    { headers: { 'X-Inertia': 'true', Vary: 'X-Inertia' } },
  )
}
