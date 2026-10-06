import type { CardIcon } from '../types/card-icon.types'

export function getCardIcon(icon: CardIcon): string {
  return `/src/assets/icons/card-icons/${icon}.svg`
}