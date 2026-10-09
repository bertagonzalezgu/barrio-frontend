import { apiClient } from '../../../services/apiClient'
import type { CreateCardInput, Card, CardFilters, CardCategory, GenerateCardInput, GenerateCardResult } from '../types/card.types'

function toBackendCategory(category: CardCategory): string {
  return category.replace(/-/g, '_')
}

export async function createCard(data: CreateCardInput): Promise<Card> {
    const response = await apiClient.post('/api/cards', {
    ...data, category: toBackendCategory(data.category)})
    return response.data
}

export async function getCards(filters?: CardFilters): Promise<Card[]> {
    const response = await apiClient.get('/api/cards', { params: filters })
    return response.data

}

export async function generateCard(data: GenerateCardInput): Promise<GenerateCardResult> {
  const response = await apiClient.post('/api/cards/generate', {
    ...data,
    category: toBackendCategory(data.category)
  })
  return response.data
}

export async function getCard(id: string): Promise<Card> {
  const response = await apiClient.get(`/api/cards/${id}`)
  return response.data
}

export async function deleteCard(id: string): Promise<void> {
  await apiClient.delete(`/api/cards/${id}`)
}