import { useQuery } from '@tanstack/react-query'
import { getCalendarCards } from '../services/calendar.service'
import type { CardFilters } from '../../cards/types/card.types'

export function useCalendarCards(filters?: CardFilters) {
  return useQuery({
    queryKey: ['cards', 'calendar', filters],
    queryFn: () => getCalendarCards(filters),
  })
}