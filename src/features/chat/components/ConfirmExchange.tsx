import { useConfirmExchange } from '../hooks/useConfirmExchange'
import { getConfirmViewState } from '../utils/getConfirmViewState'
import { getChatActionErrorMessage } from '../utils/getChatActionErrorMessage'
import type { ChatDetail } from '../types/chat.types'

interface ConfirmExchangeProps {
  chat: ChatDetail
}

export default function ConfirmExchange({ chat }: ConfirmExchangeProps) {
  const { mutate, isPending, isError, error } = useConfirmExchange(chat.id)
  const viewState = getConfirmViewState(chat)

  if (viewState === 'hidden') return null

  if (viewState === 'confirmed') {
    return <p role="status">Intercambio confirmado. Las horas ya se han transferido.</p>
  }

  if (viewState === 'waiting-other') {
    return <p role="status">Esperando a que {chat.other.name} confirme el intercambio.</p>
  }

  return (
    <section>
      {chat.otherConfirmed && <p>{chat.other.name} ya ha confirmado el intercambio.</p>}
      <button type="button" disabled={isPending} aria-busy={isPending} onClick={() => mutate()}>
        Confirmar intercambio
      </button>
      {isError && <p role="alert">{getChatActionErrorMessage(error)}</p>}
    </section>
  )
}