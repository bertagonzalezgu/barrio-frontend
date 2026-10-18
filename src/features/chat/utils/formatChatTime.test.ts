import { describe, it, expect } from 'vitest'
import { formatChatTime } from './formatChatTime'

describe('formatChatTime', () => {
  const now = new Date(2026, 9, 18, 12, 0)

  it('shows only the time when the date is today', () => {
    expect(formatChatTime(new Date(2026, 9, 18, 9, 5).toISOString(), now)).toBe('09:05')
  })

  it('shows the day and the short month when the date is not today', () => {
    expect(formatChatTime(new Date(2026, 9, 17, 9, 5).toISOString(), now)).toBe('17 oct')
  })
})