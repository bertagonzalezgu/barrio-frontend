import { useQuery } from '@tanstack/react-query'
import { getCards } from '../services/cards.service'
import type { CardFilters } from '../types/card.types'

export function useCards(filters?: CardFilters) {
  return useQuery({
    queryKey: ['cards', filters],
    queryFn: () => getCards(filters),
  })
}