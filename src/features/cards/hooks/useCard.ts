import { useQuery } from '@tanstack/react-query'
import { getCard } from '../services/cards.service'

export function useCard(id: string) {
  return useQuery({
    queryKey: ['cards', id],
    queryFn: () => getCard(id),
    enabled: !!id,
  })
}