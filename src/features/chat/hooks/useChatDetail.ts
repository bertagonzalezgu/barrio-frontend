import { useQuery } from '@tanstack/react-query'
import { getChatDetail } from '../services/chat.service'
import { POLLING_INTERVAL_MS } from '../utils/constants'

export function useChatDetail(exchangeId: string) {
  return useQuery({
    queryKey: ['chat', exchangeId],
    queryFn: () => getChatDetail(exchangeId),
    enabled: !!exchangeId,
    refetchInterval: (query) => (query.state.status === 'error' ? false : POLLING_INTERVAL_MS),
  })
}