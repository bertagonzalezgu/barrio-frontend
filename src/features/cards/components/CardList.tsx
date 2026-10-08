import { useCards } from '../hooks/useCards'
import CardItem from './CardItem'
import CardItemDesktop from './CardItemDesktop'

export default function CardList() {
  const { data: cards, isLoading, isError } = useCards()

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
    <>
      {/* Mobile */}
      <div className="flex flex-col gap-3 md:hidden">
        {cards.map(card => (
          <CardItem key={card.id} card={card} />
        ))}
      </div>

      {/* Desktop */}
      <div className="hidden md:grid md:grid-cols-3 gap-3">
        {cards.map(card => (
          <CardItemDesktop key={card.id} card={card} />
        ))}
      </div>
    </>
  )
}