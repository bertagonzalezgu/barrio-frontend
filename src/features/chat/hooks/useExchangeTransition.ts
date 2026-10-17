import { useMutation, useQueryClient } from '@tanstack/react-query'
import { transitionExchange } from '../services/chat.service'
import type { TransitionAction } from '../types/chat.types'

export function useExchangeTransition(exchangeId: string, cardId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (action: TransitionAction) => transitionExchange(exchangeId, action),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['chat', exchangeId] })
      queryClient.invalidateQueries({ queryKey: ['exchange-state', cardId] })
    },
  })
}