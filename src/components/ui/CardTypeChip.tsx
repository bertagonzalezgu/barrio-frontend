import { HandHeart, Search } from 'lucide-react'
import type { CardType } from '../../features/cards/types/card.types'

interface CardTypeChipProps {
  type: CardType
  /** 'surface' para usarlo sobre un fondo que ya lleva el tint del tipo */
  tone?: 'tint' | 'surface'
}

export default function CardTypeChip({ type, tone = 'tint' }: CardTypeChipProps) {
  const isRequest = type === 'request'
  const Icon = isRequest ? Search : HandHeart
  const background =
    tone === 'surface' ? 'border-line bg-surface' : isRequest ? 'border-busco/25 bg-busco-tint' : 'border-primary/20 bg-primary-tint'

  return (
    <span
      className={`inline-flex shrink-0 self-start items-center gap-1 text-xs font-body font-medium tracking-widest uppercase rounded-full border px-2.5 py-1 ${background} ${
        isRequest ? 'text-busco-ink' : 'text-primary-ink'
      }`}
    >
      <Icon size={12} aria-hidden="true" />
      {isRequest ? 'Busco' : 'Ofrezco'}
    </span>
  )
}
