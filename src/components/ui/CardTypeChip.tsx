import { HandHeart, Search } from 'lucide-react'
import type { CardType } from '../../features/cards/types/card.types'

interface CardTypeChipProps {
  type: CardType
}

export default function CardTypeChip({ type }: CardTypeChipProps) {
  const isRequest = type === 'request'
  const Icon = isRequest ? Search : HandHeart

  return (
    <span
      className={`inline-flex shrink-0 self-start items-center gap-1 text-xs font-body font-medium tracking-widest uppercase rounded-full px-2.5 py-1 ${
        isRequest ? 'bg-busco-tint text-busco-ink' : 'bg-primary-tint text-primary'
      }`}
    >
      <Icon size={12} aria-hidden="true" />
      {isRequest ? 'Busco' : 'Ofrezco'}
    </span>
  )
}
