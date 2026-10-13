import { useState } from 'react'
import type { CardIconType } from '../types/card-icon.types'
import CardIcon from './CardIcon'
import IconPickerModal from './IconPickerModal'

interface Props {
  value: CardIconType | ''
  onChange: (icon: CardIconType) => void
}

export default function IconPickerTrigger({ value, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Cambiar icono"
        className="relative w-10 h-10 shrink-0 rounded-xl bg-teal-soft flex items-center justify-center p-1.5 transition-all group hover:ring-2 ring-teal"
      >
        {value && (
          <CardIcon name={value} className="w-full h-full object-contain" />
        )}
        <span className="absolute inset-0 flex items-center justify-center rounded-xl text-xs opacity-0 group-hover:opacity-100 group-hover:bg-ink/10 transition-all">
          ✏️
        </span>
      </button>

      {isOpen && (
        <IconPickerModal
          value={value}
          onSelect={onChange}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  )
}