import type { ChatCard } from '../types/chat.types'

interface CardTypeChipProps {
  type: ChatCard['type']
}

export default function CardTypeChip({ type }: CardTypeChipProps) {
  const isRequest = type === 'request'

  return (
    <span
      className={`shrink-0 self-start text-[9px] font-body font-medium tracking-widest uppercase rounded-md px-2 py-0.5 ${
        isRequest ? 'bg-teal-soft text-teal' : 'bg-gold-soft text-ink'
      }`}
    >
      {isRequest ? 'Busco' : 'Ofrezco'}
    </span>
  )
}