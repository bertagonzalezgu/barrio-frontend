import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteCard } from '../services/cards.service'

export function useDeleteCard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteCard(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards'] })
    },
  })
}