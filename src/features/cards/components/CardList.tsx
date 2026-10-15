import { useCards } from '../hooks/useCards'
import CardItem from './CardItem'
import type { CardFilters } from '../types/card.types'

export default function CardList({ filters }: { filters?: CardFilters }) {
  const { data: cards, isLoading, isError } = useCards(filters)

  if (isLoading) return (
    <p className="text-xs font-body text-ink/40 text-center">Cargando tarjetas...</p>
  )
  if (isError) return (
    <p className="text-xs font-body text-coral text-center">Error al cargar las tarjetas</p>
  )
  if (!cards?.length) return (
    <p className="text-xs font-body text-ink/40 text-center">Todavía no hay tarjetas</p>
  )

  return (
      <div className="grid gap-3 md:gap-4 grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(20rem,1fr))]">        
        {cards.map(card => (
        <CardItem key={card.id} card={card} />
        ))}
      </div>
  )
}