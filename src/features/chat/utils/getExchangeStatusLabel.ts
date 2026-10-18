import type { ExchangeStatus } from '../../exchanges/types/exchange.types'

const LABELS: Record<ExchangeStatus, string> = {
  proposed: 'Propuesta',
  pending: 'Pendiente',
  accepted: 'Aceptado',
  done: 'Realizado',
  confirmed: 'Confirmado',
  rated: 'Valorado',
  cancelled: 'Cancelado',
  rejected: 'Rechazado',
}

export function getExchangeStatusLabel(status: ExchangeStatus): string {
  return LABELS[status]
}