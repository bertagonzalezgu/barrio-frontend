import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateCard } from '../services/cards.service'
import type { UpdateCardInput } from '../types/card.types'

export function useUpdateCard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCardInput }) => updateCard(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards'] })
    },
  })
}