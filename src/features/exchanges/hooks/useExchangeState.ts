import { useQuery } from '@tanstack/react-query'
import { getExchangeState } from '../services/exchanges.service'

export function useExchangeState(cardId: string, enabled = true) {
  return useQuery({
    queryKey: ['exchange-state', cardId],
    queryFn: () => getExchangeState(cardId),
    enabled: !!cardId && enabled,
  })
}