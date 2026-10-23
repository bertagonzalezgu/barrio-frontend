import { useSearchParams } from 'react-router-dom'
import { CARD_CATEGORIES } from '../../cards/types/card.types'
import type { CardCategory, CardFilters } from '../../cards/types/card.types'

const DAY_PARAM = /^\d{4}-\d{2}-\d{2}$/

export function useCalendarFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const rawCategory = searchParams.get('categoria')
  const activeCategory = CARD_CATEGORIES.find(c => c.value === rawCategory)?.value
  const filters: CardFilters | undefined = activeCategory ? { category: activeCategory } : undefined

  const rawDate = searchParams.get('fecha')
  const selectedDate = rawDate && DAY_PARAM.test(rawDate) ? rawDate : undefined

  function updateParam(key: string, value: string | undefined) {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev)
      if (value) next.set(key, value)
      else next.delete(key)
      return next
    }, { replace: true })
  }

  function setCategory(value: CardCategory | undefined) {
    updateParam('categoria', value)
  }

  function setSelectedDate(value: string | undefined) {
    updateParam('fecha', value)
  }

  return { activeCategory, filters, selectedDate, setCategory, setSelectedDate }
}