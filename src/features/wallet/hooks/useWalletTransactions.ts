import { useQuery } from '@tanstack/react-query'
import { getTransactions } from '../services/wallet.service'

export function useWalletTransactions() {
  return useQuery({
    queryKey: ['wallet', 'transactions'],
    queryFn: getTransactions,
  })
}