import { useWalletBalance } from '../hooks/useWalletBalance'
import { formatHours } from '../utils/formatHours'

export default function WalletSummary() {
  const { data: balance, isPending, isError } = useWalletBalance()

  if (isPending) {
    return (
      <p role="status" className="text-center font-body text-xs text-ink/40">
        Cargando saldo...
      </p>
    )
  }

  if (isError) {
    return (
      <p role="alert" className="text-center font-body text-xs text-coral">
        No se ha podido cargar tu saldo.
      </p>
    )
  }

  return (
    <dl className="grid grid-cols-2 gap-3">
      <div className="flex flex-col gap-1 rounded-2xl bg-teal p-4 text-white">
        <dt className="font-body text-xs uppercase tracking-wider">Disponible</dt>
        <dd className="font-display text-xl font-bold">{formatHours(balance.available)}</dd>
      </div>
      <div className="flex flex-col gap-1 rounded-2xl bg-gold-soft p-4 text-ink">
        <dt className="font-body text-xs uppercase tracking-wider">Reservado</dt>
        <dd className="font-display text-xl font-bold">{formatHours(balance.reserved)}</dd>
      </div>
    </dl>
  )
}