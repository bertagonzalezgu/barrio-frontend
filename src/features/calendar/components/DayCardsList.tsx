import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import CardItem from '../../cards/components/CardItem'
import { useCalendarDays } from '../hooks/useCalendarDays'

export default function DayCardsList() {
  const { cardsByDay, selectedDate } = useCalendarDays()
  if (!selectedDate) return null

  const cards = cardsByDay.get(selectedDate) ?? []
  const title = format(parseISO(selectedDate), "d 'de' MMMM", { locale: es })

  return (
    <section aria-labelledby="day-cards-title" className="flex flex-col gap-3">
      <h2 id="day-cards-title" className="font-display font-bold text-ink text-h4">
        Tarjetas del {title}
      </h2>
      {cards.length === 0 ? (
        <p role="status" className="text-sm font-body text-ink-muted">No hay tarjetas este día</p>
      ) : (
        <div className="grid gap-3 md:gap-4 grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(20rem,1fr))]">
          {cards.map((card) => (
            <CardItem key={card.id} card={card} />
          ))}
        </div>
      )}
    </section>
  )
}