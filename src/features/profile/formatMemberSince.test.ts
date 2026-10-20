import { describe, it, expect } from 'vitest'
import { formatMemberSince } from './utils/formatMemberSince'

const NOW = new Date('2026-10-20T12:00:00.000Z')

describe('formatMemberSince', () => {
  it.each([
    ['2026-10-10T12:00:00.000Z', 'hace menos de un mes'],
    ['2026-09-21T12:00:00.000Z', 'hace menos de un mes'],
    ['2026-09-20T12:00:00.000Z', 'hace 1 mes'],
    ['2026-04-20T12:00:00.000Z', 'hace 6 meses'],
    ['2025-10-20T12:00:00.000Z', 'hace 1 año'],
    ['2024-10-20T12:00:00.000Z', 'hace 2 años'],
  ])('%s → %s', (createdAt, expected) => {
    expect(formatMemberSince(createdAt, NOW)).toBe(expected)
  })
})