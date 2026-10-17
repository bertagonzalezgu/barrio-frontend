import { apiClient } from '../../../services/apiClient'
import type { ChatDetail, ChatMessage, TransitionAction } from '../types/chat.types'

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

export async function confirmExchange(exchangeId: string): Promise<ChatDetail> {
  const response = await apiClient.patch(`/api/exchanges/${exchangeId}/confirm`)
  return response.data
}

export async function transitionExchange(exchangeId: string, action: TransitionAction): Promise<void> {
  await apiClient.patch(`/api/exchanges/${exchangeId}/${action}`)
}