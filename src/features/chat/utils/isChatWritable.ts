import type { ExchangeStatus } from '../../exchanges/types/exchange.types'

const WRITABLE_STATUSES: ExchangeStatus[] = ['proposed', 'accepted', 'done']

export function isChatWritable(status: ExchangeStatus): boolean {
  return WRITABLE_STATUSES.includes(status)
}