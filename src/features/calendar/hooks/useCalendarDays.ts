import { useContext } from 'react'
import { CalendarDaysContext } from '../context/CalendarDaysContext'

export function useCalendarDays() {
  const value = useContext(CalendarDaysContext)
  if (!value) throw new Error('useCalendarDays debe usarse dentro de CalendarDaysProvider')
  return value
}