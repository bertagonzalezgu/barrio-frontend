import { useMutation, useQueryClient } from '@tanstack/react-query'
import { proposeExchange } from '../services/exchanges.service'

export function useProposeExchange() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (cardId: string) => proposeExchange(cardId),
    onSuccess: (exchange) => {
      queryClient.invalidateQueries({ queryKey: ['exchange-state', exchange.cardId] })
    },
  })
}