import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCard } from '../hooks/useCard'
import { useExchangeState } from '../../exchanges/hooks/useExchangeState'
import { getProposeViewState } from '../../exchanges/utils/getProposeViewState'
import CardDetailHeader from '../components/CardDetailHeader'
import CardDetailMeta from '../components/CardDetailMeta'
import CardDetailActions from '../components/CardDetailActions'
import CardDetailEdit from '../components/CardDetailEdit'
import BackButton from '../../../components/ui/BackButton'

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
      <button
        onClick={() => (isEditing ? setIsEditing(false) : navigate(-1))}
        className="self-start text-xs font-body text-ink/40 hover:text-ink transition-colors"
      >
        <BackButton onClick={() => (isEditing ? setIsEditing(false) : navigate(-1))} />
      </button>

      {isEditing ? (
        <CardDetailEdit
          card={card}
          onCancel={() => setIsEditing(false)}
          onSaved={() => setIsEditing(false)}
        />
      ) : (
        <>
          <CardDetailHeader card={card} />
          <CardDetailMeta card={card} />
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