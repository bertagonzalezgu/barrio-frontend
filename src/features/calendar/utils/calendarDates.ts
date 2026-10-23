import { eachDayOfInterval, format, parseISO } from 'date-fns'
import type { CalendarCard } from '../types/calendar.types'

const DAY_FORMAT = 'yyyy-MM-dd'

export function toDayKey(isoDate: string): string {
  return isoDate.slice(0, 10)
}

export function getTodayKey(): string {
  return format(new Date(), DAY_FORMAT)
}

export function getCardDayKeys(card: CalendarCard): string[] {
  return eachDayOfInterval({
    start: parseISO(toDayKey(card.startDate)),
    end: parseISO(toDayKey(card.endDate)),
  }).map((day) => format(day, DAY_FORMAT))
}

export function groupCardsByDay(cards: CalendarCard[]): Map<string, CalendarCard[]> {
  const byDay = new Map<string, CalendarCard[]>()
  for (const card of cards) {
    for (const key of getCardDayKeys(card)) {
      byDay.set(key, [...(byDay.get(key) ?? []), card])
    }
  }
  return byDay
}