import { useParams } from 'react-router-dom'
import BackButton from '../../../components/ui/BackButton'
import { useChatDetail } from '../../chat/hooks/useChatDetail'
import { getChatErrorMessage } from '../../chat/utils/getChatErrorMessage'
import { getRatingViewState } from '../utils/getRatingViewState'
import RatingForm from '../components/RatingForm'
import RatingSummary from '../components/RatingSummary'

export default function RatePage() {
  const { exchangeId = '' } = useParams()
  const { data: chat, isPending, isError, error } = useChatDetail(exchangeId)

  if (isPending) return <p className="mt-8 text-center font-body text-xs text-ink-muted">Cargando...</p>
  if (isError) {
    return (
      <p role="alert" className="mt-8 text-center font-body text-xs text-danger-ink">
        {getChatErrorMessage(error)}
      </p>
    )
  }

  const viewState = getRatingViewState(chat)

  return (
    <main className="mx-auto flex max-w-lg flex-col gap-6 px-4 pt-6 pb-8">
      <BackButton to={`/chat/${chat.id}`} label="Volver al chat" />
      <header className="flex flex-col gap-1">
        <h1 className="font-display text-h3 font-bold text-ink">Valorar a {chat.other.name}</h1>
        <p className="font-body text-sm text-ink-muted">
          {chat.card.title} · <span className="font-display tabular-nums">{chat.hours}h</span>
        </p>
      </header>
      {viewState === 'can-rate' && <RatingForm chat={chat} />}
      {viewState === 'already-rated' && chat.myRating && <RatingSummary rating={chat.myRating} />}
      {viewState === 'not-available' && (
        <p role="status" className="rounded-2xl bg-surface-2 px-4 py-3 font-body text-sm text-ink-muted">
          Todavía no se puede valorar este intercambio.
        </p>
      )}
    </main>
  )
}