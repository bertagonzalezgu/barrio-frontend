import { Link } from 'react-router-dom'
import type { Card } from '../types/card.types'
import { getCategoryLabel } from '../utils/getCategoryLabel'
import CardIcon from './CardIcon'
import CardTypeChip from '../../../components/ui/CardTypeChip'

export default function CardItem({ card }: { card: Card }) {
  const categoryLabel = getCategoryLabel(card.category)

  return (
    <Link to={`/cards/${card.id}`} className="block">
      <div className="flex rounded-card border border-line overflow-hidden transition-all w-full md:hover:-translate-y-0.5 md:hover:shadow-soft bg-surface">
        <div className="flex flex-1 gap-4 px-4 py-5 min-h-40">

          <div className="flex flex-col flex-1 justify-start gap-3">
            <CardTypeChip type={card.type} />
            <h3 className="font-display font-bold text-ink text-h4 leading-snug line-clamp-2 min-h-8">
              {card.title}
            </h3>
            <span className="text-xs font-body font-normal text-ink uppercase tracking-widest">
              {card.hours}h · {categoryLabel}
            </span>
          </div>

          <div className="flex items-center justify-center shrink-0 w-16">
            <div className="w-16 h-16 drop-shadow-icon-sm">
              {card.icon && <CardIcon name={card.icon} className="w-full h-full object-contain" />}
            </div>
          </div>

        </div>
      </div>
    </Link>
  )
}