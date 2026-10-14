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
        className={`self-start flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-body font-medium border transition-colors ${
          value
            ? 'bg-teal-soft border-teal text-teal'
            : 'border-teal/30 text-teal'
        }`}
      >
        {value ? getCategoryLabel(value) : 'Categoría'}
        <ChevronDown aria-hidden="true" className="text-teal w-4"/>
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