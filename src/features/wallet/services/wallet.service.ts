import { apiClient } from '../../../services/apiClient'
import type { Balance } from '../types/wallet.types'

export async function getBalance(): Promise<Balance> {
  const response = await apiClient.get('/api/wallet/balance')
  return response.data
}