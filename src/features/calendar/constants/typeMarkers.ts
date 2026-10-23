import { HandHeart, Search } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { CardType } from '../../cards/types/card.types'

export const CARD_TYPE_ORDER: CardType[] = ['request', 'offer']

export const TYPE_MARKERS: Record<CardType, { Icon: LucideIcon; label: string; colors: string }> = {
  request: { Icon: Search, label: 'Busco', colors: 'bg-busco text-on-busco' },
  offer: { Icon: HandHeart, label: 'Ofrezco', colors: 'bg-primary text-on-primary' },
}