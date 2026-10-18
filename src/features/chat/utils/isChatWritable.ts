import type { ExchangeStatus } from '../../exchanges/types/exchange.types'
import { OPEN_STATUSES } from './constants'

export function isChatWritable(status: ExchangeStatus): boolean {
  return OPEN_STATUSES.includes(status)
}