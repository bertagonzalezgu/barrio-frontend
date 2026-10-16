import { apiClient } from '../../../services/apiClient'
import type { Exchange, ExchangeState } from '../types/exchange.types'

export async function proposeExchange(cardId: string): Promise<Exchange> {
  const response = await apiClient.post('/api/exchanges', { cardId })
  return response.data
}

export async function getExchangeState(cardId: string): Promise<ExchangeState> {
  const response = await apiClient.get(`/api/exchanges/card/${cardId}`)
  return response.data
}