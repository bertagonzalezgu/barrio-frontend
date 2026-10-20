import { useId } from 'react'
import { useWalletTransactions } from '../hooks/useWalletTransactions'
import TransactionItem from './TransactionItem'

export default function TransactionList() {
  const titleId = useId()
  const { data: transactions, isPending, isError } = useWalletTransactions()

  return (
    <section aria-labelledby={titleId} className="flex flex-col gap-2">
      <h2 id={titleId} className="font-display text-base font-bold text-ink">
        Historial de horas
      </h2>
      {isPending && (
        <p role="status" className="font-body text-xs text-ink/40">
          Cargando historial...
        </p>
      )}
      {isError && (
        <p role="alert" className="font-body text-xs text-coral">
          No se ha podido cargar tu historial.
        </p>
      )}
      {transactions?.length === 0 && (
        <p className="font-body text-xs text-ink/60">Todavía no tienes movimientos.</p>
      )}
      {transactions && transactions.length > 0 && (
        <ul className="divide-y divide-ink/10">
          {transactions.map(transaction => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </ul>
      )}
    </section>
  )
}