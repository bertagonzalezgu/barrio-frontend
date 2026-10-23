import { apiClient } from '../../../services/apiClient'
import type { CardFilters } from '../../cards/types/card.types'
import type { CalendarCard } from '../types/calendar.types'

export async function getCalendarCards(filters?: CardFilters): Promise<CalendarCard[]> {
  const response = await apiClient.get('/api/cards/calendar', { params: filters })
  return response.data
}