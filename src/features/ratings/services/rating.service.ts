import { apiClient } from '../../../services/apiClient'
import type { ChatDetail } from '../../chat/types/chat.types'
import type { RatingInput } from '../types/rating.types'

export async function submitRating(exchangeId: string, input: RatingInput): Promise<ChatDetail> {
  const response = await apiClient.post(`/api/exchanges/${exchangeId}/rating`, input)
  return response.data
}