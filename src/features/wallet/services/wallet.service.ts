import { apiClient } from '../../../services/apiClient'
import type { Balance, WalletTransaction } from '../types/wallet.types'

export async function getBalance(): Promise<Balance> {
  const response = await apiClient.get('/api/wallet/balance')
  return response.data
}

export async function getTransactions(): Promise<WalletTransaction[]> {
  const response = await apiClient.get('/api/wallet/transactions')
  return response.data.items
}