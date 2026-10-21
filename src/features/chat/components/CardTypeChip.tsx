import type { ChatCard } from '../types/chat.types'

interface CardTypeChipProps {
  type: ChatCard['type']
}

export default function CardTypeChip({ type }: CardTypeChipProps) {
  const isRequest = type === 'request'

  return (
    <span
      className={`shrink-0 self-start text-xs font-body font-medium tracking-widest uppercase rounded-full px-2.5 py-1 ${
        isRequest ? 'bg-busco-tint text-busco-ink' : 'bg-primary-tint text-primary'
      }`}
    >
      {isRequest ? 'Busco' : 'Ofrezco'}
    </span>
  )
}