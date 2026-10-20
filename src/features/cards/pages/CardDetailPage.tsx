import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCard } from '../hooks/useCard'
import { useExchangeState } from '../../exchanges/hooks/useExchangeState'
import { getProposeViewState } from '../../exchanges/utils/getProposeViewState'
import BackButton from '../../../components/ui/BackButton'
import AuthorSummary from '../../profile/components/AuthorSummary'
import CardDetailHeader from '../components/CardDetailHeader'
import CardDetailAbout from '../components/CardDetailAbout'
import CardDetailAvailability from '../components/CardDetailAvailability'
import CardDetailActions from '../components/CardDetailActions'
import CardDetailEdit from '../components/CardDetailEdit'

export default function CardDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: card, isLoading, isError } = useCard(id!)
  const [isEditing, setIsEditing] = useState(false)

  const isOwner = !!card?.isMine
  const { data: exchangeState } = useExchangeState(id!, !!card && !isOwner)

  if (isLoading) return <p className="text-xs font-body text-ink/40 text-center mt-8">Cargando...</p>
  if (isError || !card) return <p className="text-xs font-body text-coral text-center mt-8">No se ha encontrado la tarjeta.</p>

  return (
    <main className="flex flex-col min-h-[calc(100dvh-4rem)] px-4 pt-6 pb-8 max-w-lg mx-auto gap-6">
      <BackButton onClick={() => (isEditing ? setIsEditing(false) : navigate(-1))} />

      {isEditing ? (
        <CardDetailEdit
          card={card}
          onCancel={() => setIsEditing(false)}
          onSaved={() => setIsEditing(false)}
        />
      ) : (
        <>
          <CardDetailHeader card={card} />
          <AuthorSummary author={card.author} />
          <CardDetailAbout description={card.description} />
          <CardDetailAvailability card={card} />
          <CardDetailActions
            card={card}
            isOwner={isOwner}
            exchangeViewState={getProposeViewState(exchangeState)}
            onEdit={() => setIsEditing(true)}
          />
        </>
      )}
    </main>
  )
}