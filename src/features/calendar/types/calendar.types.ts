import type { CardAuthor, CardCategory, CardStatus, CardType } from '../../cards/types/card.types'
import type { CardIconType } from '../../cards/types/card-icon.types'

export interface CalendarCard {
  id: string
  authorId: string
  author: CardAuthor
  isMine: boolean
  type: CardType
  title: string
  description: string
  category: CardCategory
  hours: number
  icon: CardIconType | ''
  startDate: string
  endDate: string
  status: CardStatus
  createdAt: string
  updatedAt: string
}

export interface AvailabilityFormValues {
  category: CardCategory | ''
  hours: number
  date: string
}