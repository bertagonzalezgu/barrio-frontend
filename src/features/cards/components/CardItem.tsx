import type { Card } from '../types/card.types'
import CardIcon from './CardIcon'
import { CARD_CATEGORIES } from '../types/card.types'

export default function CardItem({ card }: { card: Card }) {
  const categoryLabel = CARD_CATEGORIES.find(c => c.value === card.category)?.label ?? card.category

  return (
    <div className="flex items-center gap-3 bg-paper rounded-2xl p-3 border border-ink/10">
      <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-teal-soft flex items-center justify-center p-2">
        {card.icon && <CardIcon name={card.icon} />}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-display font-bold text-ink text-sm leading-snug">{card.title}</h3>
        <p className="text-xs font-body text-ink/50 mt-0.5">{categoryLabel}</p>
      </div>
      <span className="shrink-0 bg-teal-soft text-teal font-data text-xs px-2 py-1 rounded-lg">
        {card.hours}h
      </span>
    </div>
  )
}