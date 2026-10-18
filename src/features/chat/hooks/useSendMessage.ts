import { useMutation, useQueryClient } from '@tanstack/react-query'
import { sendMessage } from '../services/chat.service'

export function useSendMessage(exchangeId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (text: string) => sendMessage(exchangeId, text),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat-messages', exchangeId] })
    },
    onError: () => {
    queryClient.invalidateQueries({ queryKey: ['chat', exchangeId] })
    },
  })
}