import { describe, it, expect } from 'vitest'
import {
  validators,
  formatCpf,
  formatCnpj,
  formatPhone,
  formatZipCode,
  strip,
} from '@/lib/validation'

// ── strip ─────────────────────────────────────────────────────────────────────

describe('strip', () => {
  it('removes dots, dashes, slashes, parens and spaces', () => {
    expect(strip('111.222.333-44')).toBe('11122233344')
    expect(strip('12.345.678/0001-99')).toBe('12345678000199')
    expect(strip('(11) 98765-4321')).toBe('11987654321')
  })
})

// ── Formatters ────────────────────────────────────────────────────────────────

describe('formatCpf', () => {
  it('formats an 11-digit string', () => {
    expect(formatCpf('11122233344')).toBe('111.222.333-44')
  })

  it('formats partial input progressively', () => {
    expect(formatCpf('111')).toBe('111')
    expect(formatCpf('1112')).toBe('111.2')
    expect(formatCpf('111222')).toBe('111.222')
    expect(formatCpf('1112223')).toBe('111.222.3')
    expect(formatCpf('111222333')).toBe('111.222.333')
    expect(formatCpf('1112223334')).toBe('111.222.333-4')
  })

  it('strips non-digit characters before formatting', () => {
    expect(formatCpf('111.222.333-44')).toBe('111.222.333-44')
  })

  it('truncates to 11 digits', () => {
    expect(formatCpf('111222333449999')).toBe('111.222.333-44')
  })
})

describe('formatCnpj', () => {
  it('formats a 14-digit string', () => {
    expect(formatCnpj('12345678000199')).toBe('12.345.678/0001-99')
  })

  it('strips and formats already-masked input', () => {
    expect(formatCnpj('12.345.678/0001-99')).toBe('12.345.678/0001-99')
  })
})

describe('formatPhone', () => {
  it('formats a 10-digit landline', () => {
    expect(formatPhone('1123456789')).toBe('(11) 2345-6789')
  })

  it('formats an 11-digit mobile', () => {
    expect(formatPhone('11987654321')).toBe('(11) 98765-4321')
  })
})

describe('formatZipCode', () => {
  it('formats an 8-digit string', () => {
    expect(formatZipCode('01310100')).toBe('01310-100')
  })
})

// ── validators.required ───────────────────────────────────────────────────────

describe('validators.required', () => {
  it('returns error message for empty string', () => {
    expect(validators.required('')).toBe('Campo obrigatório')
    expect(validators.required('   ')).toBe('Campo obrigatório')
  })

  it('returns true for non-empty string', () => {
    expect(validators.required('a')).toBe(true)
    expect(validators.required(' texto ')).toBe(true)
  })
})

// ── validators.email ──────────────────────────────────────────────────────────

describe('validators.email', () => {
  it('accepts valid emails', () => {
    expect(validators.email('user@example.com')).toBe(true)
    expect(validators.email('user.name+tag@sub.domain.org')).toBe(true)
  })

  it('rejects invalid emails', () => {
    expect(validators.email('not-an-email')).toBe('E-mail inválido')
    expect(validators.email('@domain.com')).toBe('E-mail inválido')
    expect(validators.email('user@')).toBe('E-mail inválido')
  })

  it('skips validation for empty string (handled by required)', () => {
    expect(validators.email('')).toBe(true)
  })
})

// ── validators.cpf ────────────────────────────────────────────────────────────

describe('validators.cpf', () => {
  it('accepts known valid CPFs', () => {
    expect(validators.cpf('111.444.777-35')).toBe(true)
    expect(validators.cpf('11144477735')).toBe(true)
  })

  it('rejects all-same-digit CPFs', () => {
    expect(validators.cpf('111.111.111-11')).toBe('CPF inválido')
    expect(validators.cpf('000.000.000-00')).toBe('CPF inválido')
  })

  it('rejects CPFs with wrong check digits', () => {
    expect(validators.cpf('111.222.333-44')).toBe('CPF inválido')
  })

  it('skips validation for empty string', () => {
    expect(validators.cpf('')).toBe(true)
  })
})

// ── validators.cnpj ───────────────────────────────────────────────────────────

describe('validators.cnpj', () => {
  it('accepts known valid CNPJs', () => {
    expect(validators.cnpj('11.222.333/0001-81')).toBe(true)
    expect(validators.cnpj('11222333000181')).toBe(true)
  })

  it('rejects all-same-digit CNPJs', () => {
    expect(validators.cnpj('11.111.111/1111-11')).toBe('CNPJ inválido')
  })

  it('skips validation for empty string', () => {
    expect(validators.cnpj('')).toBe(true)
  })
})

// ── validators.password ───────────────────────────────────────────────────────

describe('validators.password', () => {
  it('accepts strong passwords', () => {
    expect(validators.password('Senha123')).toBe(true)
    expect(validators.password('MyP@ss1word')).toBe(true)
  })

  it('rejects passwords without uppercase', () => {
    const result = validators.password('senha123')
    expect(result).not.toBe(true)
  })

  it('rejects passwords without lowercase', () => {
    const result = validators.password('SENHA123')
    expect(result).not.toBe(true)
  })

  it('rejects passwords without number', () => {
    const result = validators.password('SenhaFort')
    expect(result).not.toBe(true)
  })

  it('rejects passwords shorter than 8 characters', () => {
    const result = validators.password('Ab1')
    expect(result).not.toBe(true)
  })

  it('skips validation for empty string', () => {
    expect(validators.password('')).toBe(true)
  })
})

// ── validators.passwordMatch ──────────────────────────────────────────────────

describe('validators.passwordMatch', () => {
  it('returns true when values match', () => {
    const rule = validators.passwordMatch(() => 'Senha123')
    expect(rule('Senha123')).toBe(true)
  })

  it('returns error when values differ', () => {
    const rule = validators.passwordMatch(() => 'Senha123')
    expect(rule('Diferente1')).toBe('As senhas não conferem')
  })

  it('skips validation for empty string', () => {
    const rule = validators.passwordMatch(() => 'Senha123')
    expect(rule('')).toBe(true)
  })
})

// ── validators.minLength ──────────────────────────────────────────────────────

describe('validators.minLength', () => {
  it('accepts strings meeting the minimum', () => {
    expect(validators.minLength(3)('abc')).toBe(true)
    expect(validators.minLength(3)('abcd')).toBe(true)
  })

  it('rejects strings below the minimum', () => {
    const result = validators.minLength(5)('ab')
    expect(result).not.toBe(true)
    expect(result).toContain('5')
  })
})

// ── validators.phone ──────────────────────────────────────────────────────────

describe('validators.phone', () => {
  it('accepts formatted phones', () => {
    expect(validators.phone('(11) 98765-4321')).toBe(true)
    expect(validators.phone('(11) 2345-6789')).toBe(true)
  })

  it('rejects unformatted phones', () => {
    expect(validators.phone('11987654321')).toBe('Telefone inválido')
  })

  it('skips validation for empty string', () => {
    expect(validators.phone('')).toBe(true)
  })
})
