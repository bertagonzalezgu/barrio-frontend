import { useMemo } from 'react'
import type { ReactNode } from 'react'
import type { CalendarCard } from '../types/calendar.types'
import { groupCardsByDay } from '../utils/calendarDates'
import { CalendarDaysContext } from './CalendarDaysContext'

interface Props {
  cards: CalendarCard[]
  selectedDate: string | undefined
  onSelectDate: (day: string) => void
  children: ReactNode
}

export default function CalendarDaysProvider({ cards, selectedDate, onSelectDate, children }: Props) {
  const cardsByDay = useMemo(() => groupCardsByDay(cards), [cards])
  const value = useMemo(() => ({ cardsByDay, selectedDate, onSelectDate }), [cardsByDay, selectedDate, onSelectDate])

  return <CalendarDaysContext value={value}>{children}</CalendarDaysContext>
}