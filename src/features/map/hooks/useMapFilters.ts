import { useSearchParams } from 'react-router-dom'
import type { CardCategory, CardFilters } from '../../cards/types/card.types'

export function useMapFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const rawCategory = searchParams.get('categoria')
  const activeCategory = rawCategory ? (rawCategory as CardCategory) : undefined
  const filters: CardFilters | undefined = activeCategory ? { category: activeCategory } : undefined

  function setCategory(value: CardCategory | undefined) {
    setSearchParams(prev => {
      if (value) prev.set('categoria', value)
      else prev.delete('categoria')
      return prev
    })
  }

  return { activeCategory, filters, setCategory }
}