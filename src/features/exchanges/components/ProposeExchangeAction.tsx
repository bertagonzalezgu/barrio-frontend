import { useNavigate } from 'react-router-dom'
import { useProposeExchange } from '../hooks/useProposeExchange'
import { getProposeErrorMessage } from '../utils/getProposeErrorMessage'
import type { ProposeViewState } from '../types/exchange.types'

interface Props {
  cardId: string
  viewState: ProposeViewState
}

export default function ProposeExchangeAction({ cardId, viewState }: Props) {
  const navigate = useNavigate()
  const { mutate: propose, isPending, error } = useProposeExchange()

  function handlePropose() {
    propose(cardId, { onSuccess: (exchange) => navigate(`/chat/${exchange.id}`) })
  }

  if (viewState === 'loading') return null

  if (viewState === 'proposal-sent') {
    return (
      <p
        role="status"
        className="w-full min-h-12 py-3 rounded-full border border-primary/20 bg-primary-tint text-primary-ink text-center font-body font-medium text-sm"
      >
        Propuesta enviada
      </p>
    )
  }

  if (viewState === 'unavailable') {
    return (
      <p
        role="status"
        className="w-full min-h-12 py-3 rounded-full border border-line bg-surface-2 text-ink-muted text-center font-body font-medium text-sm"
      >
        Esta tarjeta ya no está disponible
      </p>
    )
  }

  return (
    <>
      <button
        onClick={handlePropose}
        disabled={isPending}
        className="btn-primary w-full"
      >
        {isPending ? 'Enviando...' : 'Proponer intercambio'}
      </button>
      {error && (
        <p role="alert" className="text-xs font-body text-danger-ink text-center">
          {getProposeErrorMessage(error)}
        </p>
      )}
    </>
  )
}