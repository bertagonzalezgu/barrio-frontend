import { useMutation } from '@tanstack/react-query'
import { reportExchange } from '../services/chat.service'

export function useReportExchange(exchangeId: string) {
  return useMutation({
    mutationFn: (reason: string) => reportExchange(exchangeId, reason),
  })
}