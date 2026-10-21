export interface Balance {
  balance: number
  reserved: number
  available: number
}

export type TransactionKind = 'welcome' | 'exchange'
export type TransactionDirection = 'in' | 'out'

export interface WalletTransaction {
  id: string
  kind: TransactionKind
  direction: TransactionDirection
  hours: number
  date: string
  exchangeId: string | null
  card: { id: string; title: string; type: string; category: string } | null
  other: { id: string; name: string; avatar: string } | null
}