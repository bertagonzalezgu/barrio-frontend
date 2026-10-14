import { useSearchParams } from 'react-router-dom'
import type { CardCategory, CardFilters, CardType } from '../features/cards/types/card.types'

export type ViewMode = 'swipe' | 'list'
export type TypeFilter = CardType | 'all'

export function useHomeFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const activeType = (searchParams.get('modo') ?? 'all') as TypeFilter
  const activeView = (searchParams.get('vista') ?? 'swipe') as ViewMode
  const rawCategory = searchParams.get('categoria')
  const activeCategory = rawCategory ? (rawCategory as CardCategory) : undefined

  const filters: CardFilters | undefined =
    activeType === 'all' && !activeCategory
      ? undefined
      : {
          ...(activeType !== 'all' && { type: activeType }),
          ...(activeCategory && { category: activeCategory }),
        }

  function setType(value: TypeFilter) {
  setSearchParams(prev => {
    if (value === 'all') prev.delete('modo')
    else prev.set('modo', value)
    return prev
  })
}

function setView(value: ViewMode) {
  setSearchParams(prev => {
    if (value === 'swipe') prev.delete('vista')
    else prev.set('vista', value)
    return prev
  })
}

function setCategory(value: CardCategory | undefined) {
  setSearchParams(prev => {
    if (value) prev.set('categoria', value)
    else prev.delete('categoria')
    return prev
  })
}

  return { activeType, activeView, activeCategory, filters, setType, setView, setCategory }
}