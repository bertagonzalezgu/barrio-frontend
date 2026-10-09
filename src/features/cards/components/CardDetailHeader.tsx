import type { Card } from '../types/card.types'
import { CARD_CATEGORIES } from '../types/card.types'
import CardIcon from './CardIcon'

export default function CardDetailHeader({ card }: { card: Card }) {
  const categoryLabel = CARD_CATEGORIES.find(c => c.value === card.category)?.label ?? card.category
  const isRequest = card.type === 'request'

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className={`w-24 h-24 rounded-3xl flex items-center justify-center p-5 ${isRequest ? 'bg-teal-soft' : 'bg-gold-soft'}`}>
        <CardIcon name={card.icon} />
      </div>
      <div className="flex gap-2">
        <span className={`text-[9px] font-body font-medium tracking-widest uppercase rounded-md px-2 py-0.5 ${isRequest ? 'bg-teal-soft text-teal' : 'bg-gold-soft text-ink'}`}>
          {isRequest ? 'Busco' : 'Ofrezco'}
        </span>
        <span className="text-[9px] font-body font-medium tracking-widest uppercase rounded-md px-2 py-0.5 bg-ink/5 text-ink/40">
          {categoryLabel}
        </span>
      </div>
      <h1 className="font-display font-bold text-ink text-2xl leading-snug">{card.title}</h1>
      <p className="font-body text-ink/60 text-sm leading-relaxed">{card.description}</p>
    </div>
  )
}