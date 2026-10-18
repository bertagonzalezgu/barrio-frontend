import type { ExchangeStatus } from "../../exchanges/types/exchange.types"

export const POLLING_INTERVAL_MS = 5000
export const OPEN_STATUSES: ExchangeStatus[] = ['proposed', 'accepted', 'done']