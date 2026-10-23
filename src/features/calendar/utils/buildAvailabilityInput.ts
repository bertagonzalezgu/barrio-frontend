import type { CardCategory, CreateCardInput } from '../../cards/types/card.types'
import { getCategoryLabel } from '../../cards/utils/getCategoryLabel'
import { DEFAULT_DURATION_DAYS } from '../constants/availability.constants'

interface AvailabilityValues {
  category: CardCategory
  hours: number
  date: string
}

// Sin icono a propósito: la card usa el de la categoría por defecto.
export function buildAvailabilityInput({ category, hours, date }: AvailabilityValues): CreateCardInput {
  const label = getCategoryLabel(category)
  return {
    type: 'offer',
    category,
    hours,
    title: `Disponible para ${label}`,
    description: `Ofrezco mi tiempo en ${label.toLowerCase()}. Escríbeme por el chat para coordinar.`,
    startDate: date,
    durationDays: DEFAULT_DURATION_DAYS,
  }
}