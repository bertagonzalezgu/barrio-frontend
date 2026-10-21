import { Check, Clock } from 'lucide-react'
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
    return (
      <p role="status" className="flex items-center gap-2 rounded-2xl border border-primary/20 bg-primary-tint px-4 py-3 font-body text-sm text-primary-ink">
        <Check size={16} aria-hidden="true" />
        Intercambio confirmado. Las horas ya se han transferido.
      </p>
    )
  }

  if (viewState === 'waiting-other') {
    return (
      <p role="status" className="flex items-center gap-2 rounded-2xl border border-primary/20 bg-primary-tint px-4 py-3 font-body text-sm text-primary-ink">
        <Clock size={16} aria-hidden="true" />
        Esperando a que {chat.other.name} confirme el intercambio.
      </p>
    )
  }

  return (
    <section className="flex flex-col gap-3 rounded-card border border-hours/40 bg-hours-tint p-4">
      {chat.otherConfirmed && (
        <p className="font-body text-sm text-ink">{chat.other.name} ya ha confirmado el intercambio.</p>
      )}
      <button
        type="button"
        disabled={isPending}
        aria-busy={isPending}
        onClick={() => mutate()}
        className="btn-primary w-full"
      >
        Confirmar intercambio
      </button>
      {isError && (
        <p role="alert" className="alert-error">
          {getChatActionErrorMessage(error)}
        </p>
      )}
    </section>
  )
}