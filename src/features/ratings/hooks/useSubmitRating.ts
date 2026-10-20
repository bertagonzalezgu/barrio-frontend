import { useMutation, useQueryClient } from '@tanstack/react-query'
import { submitRating } from '../services/rating.service'
import type { RatingInput } from '../types/rating.types'

export function useSubmitRating(exchangeId: string, otherUserId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: RatingInput) => submitRating(exchangeId, input),
    onSuccess: (chat) => {
      queryClient.setQueryData(['chat', exchangeId], chat)
      queryClient.invalidateQueries({ queryKey: ['chats'] })
      queryClient.invalidateQueries({ queryKey: ['profile', otherUserId] })
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ['chat', exchangeId] })
    },
  })
}