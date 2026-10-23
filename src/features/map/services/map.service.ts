import { apiClient } from '../../../services/apiClient'
import type { CardFilters } from '../../cards/types/card.types'
import type { MapCard } from '../types/map.types'

export async function getMapCards(filters?: CardFilters): Promise<MapCard[]> {
  const response = await apiClient.get('/api/cards/map', { params: filters })
  return response.data
}