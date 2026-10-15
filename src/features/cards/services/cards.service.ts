import { apiClient } from '../../../services/apiClient'
import type { CreateCardInput, Card, CardFilters, GenerateCardInput, GenerateCardResult, UpdateCardInput } from '../types/card.types'

export async function createCard(data: CreateCardInput): Promise<Card> {
  const response = await apiClient.post('/api/cards', data)
  return response.data
}

export async function getCards(filters?: CardFilters): Promise<Card[]> {
  const response = await apiClient.get('/api/cards', { params: filters })
  return response.data
}

export async function generateCard(data: GenerateCardInput): Promise<GenerateCardResult> {
  const response = await apiClient.post('/api/cards/generate', data)
  return response.data
}

export async function getCard(id: string): Promise<Card> {
  const response = await apiClient.get(`/api/cards/${id}`)
  return response.data
}

export async function deleteCard(id: string): Promise<void> {
  await apiClient.delete(`/api/cards/${id}`)
}

export async function updateCard(id: string, data: UpdateCardInput): Promise<Card> {
  const response = await apiClient.patch(`/api/cards/${id}`, data)
  return response.data
}