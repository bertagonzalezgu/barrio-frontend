import type { CardIconType } from '../types/card-icon.types'

export function getCardIcon(icon: CardIconType): string {
  return `/src/assets/icons/card-icons/${icon}.svg`
}