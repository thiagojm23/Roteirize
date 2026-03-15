# Roteirize Frontend

## Project Overview
Roteirize is a collaborative travel itinerary platform. This is the Vue 3 frontend.

## Tech Stack
- **Framework**: Vue 3 (Composition API, `<script setup lang="ts">`)
- **Build**: Vite 7, TypeScript 5.9
- **Routing**: Vue Router 5
- **State**: Pinia 3
- **Styling**: Tailwind CSS 4 (configured via CSS, no tailwind.config.js)
- **Components**: Shadcn Vue (new-york style) + Reka UI
- **Templates**: Pug (`<template lang="pug">`)
- **Testing**: Vitest + @vue/test-utils

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Type-check + production build
- `npm run build-only` — Production build (no type-check)
- `npm run type-check` — Run vue-tsc type checking
- `npm run test:unit` — Run Vitest tests
- `npm run lint` — Run oxlint + eslint with auto-fix
- `npm run format` — Prettier formatting

## Code Conventions

### Language Rules
- **Source code**: 100% English (variables, functions, interfaces, comments, file names)
- **UI text**: 100% Brazilian Portuguese (pt-BR) for all user-visible strings

### Pug Templates
- All Vue templates use `<template lang="pug">`
- **CRITICAL**: Tailwind classes with special characters (`/`, `:`, `.` as decimal, `[`, `]`) MUST use the `class=""` attribute syntax, NOT Pug dot notation
  - BAD: `.bg-primary\/10` or `.hover\:text-foreground` or `.py-1.5`
  - GOOD: `div(class="bg-primary/10")` or `a(class="hover:text-foreground")` or `div(class="py-1.5")`
- Safe classes (no special chars) can use dot notation: `.flex.items-center.gap-2`

### Component Architecture
- **`src/components/ui/`** — Auto-generated Shadcn Vue primitives. Do NOT edit directly.
- **`src/components/app/`** — Custom wrapper components over Shadcn bases (AppButton, AppInput, AppModal, AppSpinner). Always use these in views, never raw Shadcn components.
- **`src/components/layout/`** — Layout components (AppNavbar, AppFooter, AuthLayout, AppSidenav)

### AppInput Smart Component
- Accepts `type` prop: text, email, password, confirmPassword, number
- Accepts `mask` prop: cpf, cnpj, phone, zipCode, numbersOnly
- Accepts `rules` prop: array of ValidatorFn from `@/lib/validation`
- Auto-formats input based on mask, validates on blur
- Exposes `validate()` and `reset()` methods via `defineExpose`

### File Structure (Feature-based)
```
src/
  components/app/       — Reusable app components
  components/layout/    — Layout components
  components/ui/        — Shadcn primitives (auto-generated)
  composables/          — Vue composables
  features/             — Feature modules
    auth/views/         — Login, Register, ForgotPassword
    auth/stores/        — Auth store
    dashboard/views/    — Dashboard
    landing/views/      — Home/Landing page
  lib/                  — Pure utilities (api.ts, validation.ts, utils.ts)
  router/               — Vue Router config
  stores/               — Global stores (theme)
```

### Theming
- Light/Dark mode via CSS variables + `.dark` class on `<html>`
- Primary color: Dark Purple (oklch-based palette)
- Theme persisted in localStorage (`roteirize-theme`)
- Falls back to OS preference via `prefers-color-scheme`
- Toggle via `useThemeStore().toggle()`

### API Wrapper
- Use `api.get/post/put/patch/delete` from `@/lib/api`
- Returns `ApiResult<T>` discriminated union: `{ data: T }` or `{ error: ApiError }`
- Auto-handles 401 with token refresh retry
- Base URL from `VITE_API_URL` env var (defaults to `/api`)

### Validation
- Pure validators in `@/lib/validation` (required, email, cpf, cnpj, password, etc.)
- Mask formatters in same file (formatCpf, formatCnpj, formatPhone, formatZipCode)
- `useValidation` composable in `@/composables/useValidation` for reactive form validation

### Adding Shadcn Components
```bash
npx shadcn-vue@latest add <component-name> --yes
```
Components land in `src/components/ui/<name>/`. Then create an App wrapper in `src/components/app/` if needed.
