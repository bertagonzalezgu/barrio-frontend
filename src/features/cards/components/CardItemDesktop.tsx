import type { Card } from '../types/card.types'
import { CARD_CATEGORIES } from '../types/card.types'
import CardIcon from './CardIcon'

export default function CardItemDesktop({ card }: { card: Card }) {

    const categoryLabel = CARD_CATEGORIES.find(c => c.value === card.category)?.label ?? card.category

  return (
    <div className="flex flex-col justify-between bg-paper rounded-2xl p-4 border border-ink/10 min-h-40">
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-full bg-teal-soft flex items-center justify-center border border-teal/50">
          {card.icon && <CardIcon name={card.icon} />}
        </div>
        <span className="text-[9px] font-body font-medium tracking-wide text-teal uppercase bg-teal-soft rounded-2xl px-1.5 py-0.5">
          {card.type === 'request' ? 'Busco' : 'Ofrezco'}
        </span>
      </div>
      <h3 className="font-display font-bold text-ink text-base mt-3 leading-snug">{card.title}</h3>
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-ink/10">
        <span className="text-xs font-body text-ink/40">{categoryLabel}</span>
        <span className="font-data text-m font-medium text-teal bg-teal-soft rounded-full px-3 py-0.5">{card.hours}h</span>
      </div>
    </div>
  )
}