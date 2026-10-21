import type { Card } from '../types/card.types'
import CardIcon from './CardIcon'
import { getCategoryLabel } from '../utils/getCategoryLabel'

const CHIP = 'rounded-full bg-on-primary/15 px-2.5 py-1 font-body text-xs font-medium uppercase tracking-widest text-on-primary'

export default function CardDetailHeader({ card }: { card: Card }) {
  const categoryLabel = getCategoryLabel(card.category)
  const isRequest = card.type === 'request'

  return (
    <header className="flex flex-col gap-4 rounded-card bg-primary p-5 text-on-primary shadow-primary">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <span className={CHIP}>{isRequest ? 'Busco' : 'Ofrezco'}</span>
          <span className={CHIP}>{categoryLabel}</span>
        </div>
        <p className="font-display text-h4 font-bold tabular-nums">{card.hours}h</p>
      </div>
      <div className="flex items-center gap-3">
        <div className={`size-14 shrink-0 rounded-2xl p-3 ${isRequest ? 'bg-busco-tint' : 'bg-primary-tint'}`}>
          <CardIcon name={card.icon} />
        </div>
        <h1 className="font-display text-h3 font-bold leading-snug">{card.title}</h1>
      </div>
    </header>
  )
}