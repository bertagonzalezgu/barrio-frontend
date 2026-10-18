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
            className="flex-1 rounded-2xl bg-teal py-3 font-body text-sm font-medium text-paper cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
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
            className="flex-1 rounded-2xl border border-coral/30 py-3 font-body text-sm font-medium text-coral cursor-pointer transition-colors hover:bg-coral/5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Rechazar propuesta
          </button>
        )}
      </div>
      {isError && (
        <p role="alert" className="rounded-xl border-l-4 border-coral bg-coral-soft px-3 py-2 font-body text-sm text-ink">
          {getChatActionErrorMessage(error)}
        </p>
      )}
    </section>
  )
}