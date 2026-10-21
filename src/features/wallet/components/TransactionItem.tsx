import type { WalletTransaction } from '../types/wallet.types'
import { formatHours } from '../utils/formatHours'
import { formatTransactionDate } from '../utils/formatTransactionDate'

interface TransactionItemProps {
  transaction: WalletTransaction
}

export default function TransactionItem({ transaction }: TransactionItemProps) {
  const { kind, direction, hours, date, card, other } = transaction
  const incoming = direction === 'in'
  const title = kind === 'welcome' ? 'Regalo de bienvenida' : (card?.title ?? 'Intercambio')
  const when = formatTransactionDate(date)
  const subtitle = other ? `${when} · con ${other.name}` : when

  return (
    <li className="flex items-center justify-between gap-3 py-3">
      <div className="min-w-0">
        <p className="truncate font-body text-sm text-ink">{title}</p>
        <p className="font-body text-xs text-ink-muted">{subtitle}</p>
      </div>
      <span className="sr-only">{`${incoming ? 'Ingreso' : 'Gasto'} de ${formatHours(hours)}`}</span>
      <span aria-hidden="true" className={`shrink-0 font-display tabular-nums text-sm ${incoming ? 'text-success-ink' : 'text-ink'}`}>
        {`${incoming ? '+' : '−'}${hours} h`}
      </span>
    </li>
  )
}