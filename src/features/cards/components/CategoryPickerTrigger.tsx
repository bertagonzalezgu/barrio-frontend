import { useState } from 'react'
import type { CardCategory } from '../types/card.types'
import { getCategoryLabel } from '../utils/getCategoryLabel'
import CategoryPickerModal from './CategoryPickerModal'
import { ChevronDown } from 'lucide-react'

interface Props {
  value: CardCategory | undefined
  onChange: (category: CardCategory | undefined) => void
}

export default function CategoryPickerTrigger({ value, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={`Filtrar por categoría: ${value ? getCategoryLabel(value) : 'todas'}`}
        className={`self-start flex min-h-12 items-center gap-1.5 px-4 py-2 rounded-full text-sm font-body font-medium border transition-colors ${
          value
            ? 'bg-primary-tint border-primary text-primary-ink'
            : 'border-primary/30 text-primary-ink'
        }`}
      >
        {value ? getCategoryLabel(value) : 'Categoría'}
        <ChevronDown aria-hidden="true" className="text-primary-ink w-4"/>
      </button>

      {isOpen && (
        <CategoryPickerModal
          value={value}
          onSelect={onChange}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  )
}