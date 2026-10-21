import { useWalletBalance } from '../hooks/useWalletBalance'
import { formatHours } from '../utils/formatHours'

export default function WalletSummary() {
  const { data: balance, isPending, isError } = useWalletBalance()

  if (isPending) {
    return (
      <p role="status" className="text-center font-body text-xs text-ink-muted">
        Cargando saldo...
      </p>
    )
  }

  if (isError) {
    return (
      <p role="alert" className="text-center font-body text-xs text-danger-ink">
        No se ha podido cargar tu saldo.
      </p>
    )
  }

  return (
    <dl className="grid grid-cols-2 gap-3">
      <div className="flex flex-col gap-1 rounded-card bg-hours p-4 text-on-hours">
        <dt className="font-body text-xs uppercase tracking-wider">Disponible</dt>
        <dd className="font-display text-h4 font-bold tabular-nums">{formatHours(balance.available)}</dd>
      </div>
      <div className="flex flex-col gap-1 rounded-card border border-hours/40 bg-hours-tint p-4 text-ink">
        <dt className="font-body text-xs uppercase tracking-wider">Reservado</dt>
        <dd className="font-display text-h4 font-bold tabular-nums">{formatHours(balance.reserved)}</dd>
      </div>
    </dl>
  )
}