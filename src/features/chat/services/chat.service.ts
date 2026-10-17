import { apiClient } from '../../../services/apiClient'
import type { ChatDetail, ChatMessage } from '../types/chat.types'

export async function getChatDetail(exchangeId: string): Promise<ChatDetail> {
  const response = await apiClient.get(`/api/exchanges/${exchangeId}`)
  return response.data
}

export async function getMessages(exchangeId: string): Promise<ChatMessage[]> {
  const response = await apiClient.get(`/api/exchanges/${exchangeId}/messages`)
  return response.data
}

export async function sendMessage(exchangeId: string, text: string): Promise<ChatMessage> {
  const response = await apiClient.post(`/api/exchanges/${exchangeId}/messages`, { text })
  return response.data
}

export async function reportExchange(exchangeId: string, reason: string): Promise<void> {
  await apiClient.post(`/api/exchanges/${exchangeId}/report`, { reason })
}