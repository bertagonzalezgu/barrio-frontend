import { createContext } from 'react'
import type { CalendarDaysContextValue } from '../types/calendar.types'

export const CalendarDaysContext = createContext<CalendarDaysContextValue | null>(null)