import { CARD_CATEGORIES } from '../types/card.types'
import type { CardCategory } from '../types/card.types'

export function getCategoryLabel(category: CardCategory): string {
  return CARD_CATEGORIES.find(c => c.value === category)?.label ?? category
}