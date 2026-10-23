import type { CardCategory, CardType } from '../../cards/types/card.types'
import type { CardIconType } from '../../cards/types/card-icon.types'

export interface MapCard {
  id: string
  type: CardType
  category: CardCategory
  title: string
  icon: CardIconType
  hours: number
  lat: number
  lng: number
}