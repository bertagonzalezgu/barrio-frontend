import { Link } from 'react-router-dom'
import type { Card } from '../types/card.types'
import { getCategoryLabel } from '../utils/getCategoryLabel'
import CardIcon from './CardIcon'

export default function CardItem({ card }: { card: Card }) {
  const categoryLabel = getCategoryLabel(card.category)
  const isRequest = card.type === 'request'

  return (
    <Link to={`/cards/${card.id}`} className="block">
      <div className="flex rounded-2xl overflow-hidden transition-all w-full md:hover:-translate-y-0.5 md:hover:shadow-md bg-white">
        <div className="flex flex-1 gap-4 px-4 py-5 min-h-40">

          <div className="flex flex-col flex-1 justify-start gap-3">
            <span className={`self-start text-[9px] font-body font-medium tracking-widest uppercase rounded-full px-2.5 py-1 ${
              isRequest ? 'bg-teal text-paper' : 'bg-gold text-ink'
            }`}>
              {isRequest ? 'Busco' : 'Ofrezco'}
            </span>
            <h3 className="font-body font-bold text-ink text-lg leading-snug line-clamp-2 min-h-8">
              {card.title}
            </h3>
            <span className="text-[11px] font-body font-normal text-ink uppercase tracking-widest">
              {card.hours}h · {categoryLabel}
            </span>
          </div>

          <div className="flex items-center justify-center shrink-0 w-16">
            <div className="w-16 h-16 drop-shadow-sm">
              {card.icon && <CardIcon name={card.icon} className="w-full h-full object-contain" />}
            </div>
          </div>

        </div>
      </div>
    </Link>
  )
}