import { Link, useParams } from 'react-router-dom'
import { useChatDetail } from '../../chat/hooks/useChatDetail'
import { getChatErrorMessage } from '../../chat/utils/getChatErrorMessage'
import { getRatingViewState } from '../utils/getRatingViewState'
//import RatingForm from '../components/RatingForm'
import RatingSummary from '../components/RatingSummary'

export default function RatePage() {
  const { exchangeId = '' } = useParams()
  const { data: chat, isPending, isError, error } = useChatDetail(exchangeId)

  if (isPending) return <p className="text-xs font-body text-ink/40 text-center mt-8">Cargando...</p>
  if (isError) {
    return (
      <p role="alert" className="text-xs font-body text-coral text-center mt-8">
        {getChatErrorMessage(error)}
      </p>
    )
  }

  const viewState = getRatingViewState(chat)

  return (
    <section className="flex flex-col px-4 pt-6 pb-4 max-w-lg mx-auto gap-4">
      <h1 className="font-display font-bold text-ink text-xl">Valorar a {chat.other.name}</h1>
      {/*{viewState === 'can-rate' && <RatingForm chat={chat} />}*/}
      {viewState === 'already-rated' && chat.myRating && <RatingSummary rating={chat.myRating} />}
      {viewState === 'not-available' && (
        <p role="status" className="rounded-2xl bg-ink/5 px-4 py-3 font-body text-sm text-ink/70">
          Todavía no se puede valorar este intercambio.
        </p>
      )}
      <Link to={`/chat/${chat.id}`} className="font-body text-sm text-teal underline underline-offset-2">
        Volver al chat
      </Link>
    </section>
  )
}