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
    <section className="flex flex-col gap-3">
      <div className="flex gap-3">
        {canAccept && (
          <button
            type="button"
            disabled={isPending}
            aria-busy={isPending}
            onClick={() => mutate('accept')}
            className="btn-primary flex-1"
          >
            Aceptar propuesta
          </button>
        )}
        {canReject && (
          <button
            type="button"
            disabled={isPending}
            aria-busy={isPending}
            onClick={() => mutate('reject')}
            className="btn-danger-outline flex-1"
          >
            Rechazar propuesta
          </button>
        )}
      </div>
      {isError && (
        <p role="alert" className="alert-error">
          {getChatActionErrorMessage(error)}
        </p>
      )}
    </section>
  )
}