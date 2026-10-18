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
        className="w-full py-3 rounded-2xl bg-teal/10 text-teal text-center font-body font-medium text-sm"
      >
        Propuesta enviada
      </p>
    )
  }

  if (viewState === 'unavailable') {
    return (
      <p
        role="status"
        className="w-full py-3 rounded-2xl bg-ink/5 text-ink/60 text-center font-body font-medium text-sm"
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
        className="w-full py-3 rounded-2xl bg-teal text-paper font-body font-medium text-sm disabled:opacity-50 cursor-pointer"
      >
        {isPending ? 'Enviando...' : 'Proponer intercambio'}
      </button>
      {error && (
        <p role="alert" className="text-xs font-body text-coral text-center">
          {getProposeErrorMessage(error)}
        </p>
      )}
    </>
  )
}