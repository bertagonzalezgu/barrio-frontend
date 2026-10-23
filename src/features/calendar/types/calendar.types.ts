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

export interface AvailabilityFormErrors {
  category?: string
  hours?: string
  date?: string
}

export interface CalendarDaysContextValue {
  cardsByDay: Map<string, CalendarCard[]>
  selectedDate: string | undefined
  onSelectDate: (day: string) => void
}

export interface AvailabilityFormProps {
  category: CardCategory | ''
  setCategory: (value: CardCategory | '') => void
  hours: string
  setHours: (value: string) => void
  date: string
  setDate: (value: string) => void
  minDate: string
  errors: AvailabilityFormErrors
  submitError: string | null
  isSubmitting: boolean
  onSubmit: () => void
  onCancel: () => void
}