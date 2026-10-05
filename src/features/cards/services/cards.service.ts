import { apiClient } from '../../../services/apiClient'
import type { CreateCardInput, Card, CardFilters } from '../types/card.types'

export async function createCard(data: CreateCardInput): Promise<Card> {
    const response = await apiClient.post('/api/cards', data)
    return response.data
}

export async function getCards(filters?: CardFilters): Promise<Card[]> {
    const response = await apiClient.get('/api/cards', { params: filters })
    return response.data

}