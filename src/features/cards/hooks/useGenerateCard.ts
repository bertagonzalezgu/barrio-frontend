import { useMutation } from '@tanstack/react-query'
import { generateCard } from '../services/cards.service'

export function useGenerateCard() {
  return useMutation({
    mutationFn: generateCard,
  })
}