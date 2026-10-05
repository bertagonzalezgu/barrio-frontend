import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCard } from '../services/cards.service'

export function useCreateCard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards'] })
    },
  })
}