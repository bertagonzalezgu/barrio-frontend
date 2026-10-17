import { useQuery } from '@tanstack/react-query'
import { getMessages } from '../services/chat.service'
import { POLLING_INTERVAL_MS } from '../utils/constants'

export function useChatMessages(exchangeId: string) {
  return useQuery({
    queryKey: ['chat-messages', exchangeId],
    queryFn: () => getMessages(exchangeId),
    enabled: !!exchangeId,
    refetchInterval: (query) => (query.state.status === 'error' ? false : POLLING_INTERVAL_MS),
  })
}