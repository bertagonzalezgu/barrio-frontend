import type { CardIconType } from '../types/card-icon.types'
import { CARD_ICONS } from '../types/card-icon.types'
import { CARD_CATEGORIES } from '../types/card.types'

export type IconGroup = {
  label: string
  icons: CardIconType[]
}

export function groupIconsByCategory(): IconGroup[] {
  return CARD_CATEGORIES.map(({ value, label }) => ({
    label,
    icons: CARD_ICONS.filter(icon => icon.startsWith(value)),
  }))
}