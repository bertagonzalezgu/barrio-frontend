import { useExchangeTransition } from '../hooks/useExchangeTransition'
import { getChatActionErrorMessage } from '../utils/getChatActionErrorMessage'
import type { ChatDetail } from '../types/chat.types'

interface ChatActionsProps {
  chat: ChatDetail
}

export default function ChatActions({ chat }: ChatActionsProps) {
  const { mutate, isPending, isError, error } = useExchangeTransition(chat.id, chat.card.id)
  const canAccept = chat.actions.includes('accept')
  const canReject = chat.actions.includes('reject')

  if (!canAccept && !canReject && !isError) return null

  return (
    <section>
      {canAccept && (
        <button type="button" disabled={isPending} aria-busy={isPending} onClick={() => mutate('accept')}>
          Aceptar propuesta
        </button>
      )}
      {canReject && (
        <button type="button" disabled={isPending} aria-busy={isPending} onClick={() => mutate('reject')}>
          Rechazar propuesta
        </button>
      )}
      {isError && <p role="alert">{getChatActionErrorMessage(error)}</p>}
    </section>
  )
}