import { useQuery } from '@tanstack/react-query'
import { getChatDetail } from '../services/chat.service'

export function useChatDetail(exchangeId: string) {
  return useQuery({
    queryKey: ['chat', exchangeId],
    queryFn: () => getChatDetail(exchangeId),
    enabled: !!exchangeId,
  })
}