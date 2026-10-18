export type ExchangeStatus =
  | 'proposed'
  | 'pending'
  | 'accepted'
  | 'done'
  | 'confirmed'
  | 'rated'
  | 'cancelled'
  | 'rejected'

export interface Exchange {
  id: string
  cardId: string
  status: ExchangeStatus
}

export interface ExchangeState {
  mine: Pick<Exchange, 'id' | 'status'> | null
  cardAvailable: boolean
}

export type ProposeViewState = 'loading' | 'can-propose' | 'proposal-sent' | 'unavailable'