import { create } from 'zustand'

interface WalletStore {
  balance: number
  impact: number
  isLoading: boolean
  error: string | null
  setBalance: (hours: number) => void
  setImpact: (favors: number) => void
  setIsLoading: (state: boolean) => void
  setError: (state: string | null) => void
}

export const useWalletStore = create<WalletStore>()(set => ({
  balance: 0,
  impact: 0,
  isLoading: false,
  error: null,
  setBalance: (hours) => set({ balance: hours }),
  setImpact: (favors) => set({ impact: favors }),
  setIsLoading: (state) => set({ isLoading: state }),
  setError: (state) => set({ error: state }),
}))