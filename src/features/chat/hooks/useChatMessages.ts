import { useQuery } from '@tanstack/react-query'
import { getMessages } from '../services/chat.service'

const POLLING_INTERVAL_MS = 5000

export function useChatMessages(exchangeId: string) {
  return useQuery({
    queryKey: ['chat-messages', exchangeId],
    queryFn: () => getMessages(exchangeId),
    enabled: !!exchangeId,
    refetchInterval: POLLING_INTERVAL_MS,
  })
}