import { Link } from 'react-router-dom'
import type { Card } from '../types/card.types'
import { getCategoryLabel } from '../utils/getCategoryLabel'
import CardIcon from './CardIcon'

export default function CardItem({ card }: { card: Card }) {
  const categoryLabel = getCategoryLabel(card.category)
  const isRequest = card.type === 'request'

  return (
    <Link to={`/cards/${card.id}`} className="block">
      <div className="flex items-stretch bg-paper rounded-2xl overflow-hidden border border-ink/10 md:hover:shadow-lg md:hover:-translate-y-0.5 transition-all min-h-32 md:min-h-44 w-full">
        <div className={`w-1.5 shrink-0 ${isRequest ? 'bg-teal' : 'bg-gold'}`} />
        <div className="flex flex-1 gap-3 p-4 md:gap-4 md:p-5">

          {/* Texto izquierda */}
          <div className="flex flex-col flex-1 gap-2 justify-between">
            <span
              className={`self-start text-[9px] font-body font-medium tracking-widest uppercase rounded-md px-2 py-0.5 ${
                isRequest ? 'bg-teal-soft text-teal' : 'bg-gold-soft text-ink'
              }`}
            >
              {isRequest ? 'Busco' : 'Ofrezco'}
            </span>
            <h3 className="font-display font-bold text-ink text-base leading-snug line-clamp-2 md:line-clamp-3">
              {card.title}
            </h3>
            <div className="pt-2 border-t border-ink/10">
              <span className="text-xs font-body text-ink/50 uppercase">{categoryLabel}</span>
            </div>
          </div>

          {/* Icono arriba + horas abajo */}
          <div className="flex flex-col items-end justify-between shrink-0">
            <div
              className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center p-2 ${
                isRequest ? 'bg-teal-soft' : 'bg-gold-soft'
              }`}
            >
              {card.icon && <CardIcon name={card.icon} />}
            </div>
            <span className={`font-data text-base font-bold ${isRequest ? 'text-teal' : 'text-ink'}`}>
              {card.hours}h
            </span>
          </div>

        </div>
      </div>
    </Link>
  )
}