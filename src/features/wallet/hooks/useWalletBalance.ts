import { useQuery } from '@tanstack/react-query'
import { getBalance } from '../services/wallet.service'

export function useWalletBalance() {
  return useQuery({
    queryKey: ['wallet', 'balance'],
    queryFn: getBalance,
  })
}