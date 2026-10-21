import type { Card } from '../types/card.types'
import { formatCardDate } from '../../../utils/formatCardDate'

export default function CardDetailAvailability({ card }: { card: Card }) {
  if (!card.startDate) return null

  return (
    <section className="flex flex-col gap-2">
      <h2 className="font-display text-h4 font-bold text-ink">Disponibilidad</h2>
      <p className="self-start rounded-full border border-line bg-surface px-3 py-1 font-display text-xs tabular-nums text-ink">
        {formatCardDate(card.startDate)}
        {card.endDate && ` → ${formatCardDate(card.endDate)}`}
      </p>
    </section>
  )
}