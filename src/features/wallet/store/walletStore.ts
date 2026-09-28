import { create } from 'zustand'

interface WalletStore {
  balance: number
  isLoading: boolean
  error: string | null
  setBalance: (hours: number) => void
  setIsLoading: (state: boolean) => void
  setError: (state: string | null) => void
}

export const useWalletStore = create<WalletStore>()(set => ({
  balance: 0,
  isLoading: false,
  error: null,
  setBalance: (hours) => set({ balance: hours }),
  setIsLoading: (state) => set({ isLoading: state }),
  setError: (state) => set({ error: state }),
}))