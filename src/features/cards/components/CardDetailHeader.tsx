import type { Card } from '../types/card.types'
import CardIcon from './CardIcon'
import CardTypeChip from '../../../components/ui/CardTypeChip'
import { getCategoryLabel } from '../utils/getCategoryLabel'

const CATEGORY_CHIP = 'rounded-full border border-line bg-surface px-2.5 py-1 font-body text-xs font-medium uppercase tracking-widest text-ink-muted'

export default function CardDetailHeader({ card }: { card: Card }) {
  const categoryLabel = getCategoryLabel(card.category)
  const isRequest = card.type === 'request'

  return (
    <header
      className={`flex flex-col gap-5 rounded-card border p-5 shadow-soft ${
        isRequest ? 'border-busco/30 bg-busco-tint' : 'border-primary/30 bg-primary-tint'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <CardTypeChip type={card.type} tone="surface" />
          <span className={CATEGORY_CHIP}>{categoryLabel}</span>
        </div>
        <p className="shrink-0 rounded-full bg-hours px-3 py-1 font-display text-h4 font-bold tabular-nums text-on-hours">{card.hours}h</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="size-20 shrink-0 rounded-2xl border border-line bg-surface p-3 shadow-soft">
          <CardIcon name={card.icon} />
        </div>
        <h1 className="font-display text-h3 font-bold leading-snug text-ink">{card.title}</h1>
      </div>
    </header>
  )
}
