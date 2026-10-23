import { useQuery } from '@tanstack/react-query'
import { getMapCards } from '../services/map.service'
import type { CardFilters } from '../../cards/types/card.types'

export function useMapCards(filters?: CardFilters) {
  return useQuery({
    queryKey: ['cards', 'map', filters],
    queryFn: () => getMapCards(filters),
  })
}