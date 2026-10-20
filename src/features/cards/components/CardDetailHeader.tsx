import type { Card } from '../types/card.types'
import CardIcon from './CardIcon'
import { getCategoryLabel } from '../utils/getCategoryLabel'

const CHIP = 'rounded-md bg-paper/15 px-2 py-0.5 font-data text-[10px] uppercase tracking-widest text-paper'

export default function CardDetailHeader({ card }: { card: Card }) {
  const categoryLabel = getCategoryLabel(card.category)
  const isRequest = card.type === 'request'

  return (
    <header className="flex flex-col gap-4 rounded-2xl bg-teal p-5 text-paper">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <span className={CHIP}>{isRequest ? 'Busco' : 'Ofrezco'}</span>
          <span className={CHIP}>{categoryLabel}</span>
        </div>
        <p className="font-data text-xl font-bold">{card.hours}h</p>
      </div>
      <div className="flex items-center gap-3">
        <div className={`size-14 shrink-0 rounded-2xl p-3 ${isRequest ? 'bg-teal-soft' : 'bg-gold-soft'}`}>
          <CardIcon name={card.icon} />
        </div>
        <h1 className="font-display text-2xl font-bold leading-snug">{card.title}</h1>
      </div>
    </header>
  )
}