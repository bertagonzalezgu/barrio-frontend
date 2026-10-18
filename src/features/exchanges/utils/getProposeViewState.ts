import type { ExchangeState, ProposeViewState } from '../types/exchange.types'

export function getProposeViewState(state: ExchangeState | undefined): ProposeViewState {
  if (!state) return 'loading'
  if (!state.cardAvailable) return 'unavailable'
  if (state.mine?.status === 'proposed') return 'proposal-sent'
  return 'can-propose'
}