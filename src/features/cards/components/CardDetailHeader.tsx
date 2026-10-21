import type { Card } from '../types/card.types'
import CardIcon from './CardIcon'
import CardTypeChip from '../../chat/components/CardTypeChip'
import { getCategoryLabel } from '../utils/getCategoryLabel'

const CATEGORY_CHIP = 'rounded-full bg-surface-2 px-2.5 py-1 font-body text-xs font-medium uppercase tracking-widest text-ink-muted'

export default function CardDetailHeader({ card }: { card: Card }) {
  const categoryLabel = getCategoryLabel(card.category)
  const isRequest = card.type === 'request'

  return (
    <header className="flex flex-col gap-4 rounded-card border border-line bg-surface p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <CardTypeChip type={card.type} />
          <span className={CATEGORY_CHIP}>{categoryLabel}</span>
        </div>
        <p className="shrink-0 rounded-full bg-hours px-3 py-1 font-display text-h4 font-bold tabular-nums text-on-hours">{card.hours}h</p>
      </div>
      <div className="flex items-center gap-3">
        <div className={`size-14 shrink-0 rounded-2xl p-3 ${isRequest ? 'bg-busco-tint' : 'bg-primary-tint'}`}>
          <CardIcon name={card.icon} />
        </div>
        <h1 className="font-display text-h3 font-bold leading-snug text-ink">{card.title}</h1>
      </div>
    </header>
  )
}
