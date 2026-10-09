import { useParams, useNavigate } from 'react-router-dom'
import { useCard } from '../hooks/useCard'
import { useAuth } from '../../../hooks/useAuth'
import CardDetailHeader from '../components/CardDetailHeader'
import CardDetailMeta from '../components/CardDetailMeta'
import CardDetailActions from '../components/CardDetailActions'

export default function CardDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: card, isLoading, isError } = useCard(id!)
  const { currentUser } = useAuth()

  if (isLoading) return <p className="text-xs font-body text-ink/40 text-center mt-8">Cargando...</p>
  if (isError || !card) return <p className="text-xs font-body text-coral text-center mt-8">No se ha encontrado la tarjeta.</p>

  const isOwner = currentUser?.uid === card.author.firebaseUid

  return (
    <main className="flex flex-col min-h-[calc(100dvh-4rem)] px-4 pt-6 pb-8 max-w-lg mx-auto gap-6">
      <button onClick={() => navigate(-1)} className="self-start text-xs font-body text-ink/40 hover:text-ink transition-colors">
        ← Volver
      </button>
      <CardDetailHeader card={card} />
      <CardDetailMeta card={card} />
      <CardDetailActions card={card} isOwner={isOwner} />
    </main>
  )
}