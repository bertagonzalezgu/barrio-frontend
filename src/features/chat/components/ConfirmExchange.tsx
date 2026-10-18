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
      <p role="status" className="flex items-center gap-2 rounded-2xl bg-teal-soft px-4 py-3 font-body text-sm text-teal">
        <Check size={16} aria-hidden="true" />
        Intercambio confirmado. Las horas ya se han transferido.
      </p>
    )
  }

  if (viewState === 'waiting-other') {
    return (
      <p role="status" className="flex items-center gap-2 rounded-2xl bg-teal-soft px-4 py-3 font-body text-sm text-teal">
        <Clock size={16} aria-hidden="true" />
        Esperando a que {chat.other.name} confirme el intercambio.
      </p>
    )
  }

  return (
    <section className="flex flex-col gap-3 rounded-2xl bg-gold-soft p-4">
      {chat.otherConfirmed && (
        <p className="font-body text-sm text-ink">{chat.other.name} ya ha confirmado el intercambio.</p>
      )}
      <button
        type="button"
        disabled={isPending}
        aria-busy={isPending}
        onClick={() => mutate()}
        className="w-full rounded-2xl bg-teal py-3 font-body text-sm font-medium text-paper cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
      >
        Confirmar intercambio
      </button>
      {isError && (
        <p role="alert" className="rounded-xl border-l-4 border-coral bg-coral-soft px-3 py-2 font-body text-sm text-ink">
          {getChatActionErrorMessage(error)}
        </p>
      )}
    </section>
  )
}