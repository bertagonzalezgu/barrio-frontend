import { useMutation, useQueryClient } from '@tanstack/react-query'
import { confirmExchange } from '../services/chat.service'

export function useConfirmExchange(exchangeId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => confirmExchange(exchangeId),
    onSuccess: (chat) => {
      queryClient.setQueryData(['chat', exchangeId], chat)
      queryClient.invalidateQueries({ queryKey: ['exchange-state', chat.card.id] })
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ['chat', exchangeId] })
    },
  })
}