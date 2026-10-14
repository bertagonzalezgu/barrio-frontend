import { CARD_CATEGORIES } from '../types/card.types'
import type { CardCategory } from '../types/card.types'

interface Props {
  value: CardCategory | undefined
  onSelect: (category: CardCategory | undefined) => void
  onClose: () => void
}

export default function CategoryPickerModal({ value, onSelect, onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-ink/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-paper w-full sm:max-w-md max-h-[80vh] rounded-t-2xl sm:rounded-2xl overflow-y-auto p-5 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-ink text-lg">Filtrar por categoría</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="text-ink/40 hover:text-ink transition-colors text-xl leading-none"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            aria-pressed={value === undefined}
            onClick={() => { onSelect(undefined); onClose() }}
            className={`rounded-xl px-3 py-2.5 text-sm font-body font-medium transition-all ${
              value === undefined
                ? 'bg-teal-soft ring-2 ring-teal text-teal'
                : 'bg-ink/5 hover:bg-teal-soft text-ink'
            }`}
          >
            Todas
          </button>

          {CARD_CATEGORIES.map(({ value: cat, label }) => (
            <button
              key={cat}
              type="button"
              aria-pressed={value === cat}
              onClick={() => { onSelect(cat); onClose() }}
              className={`rounded-xl px-3 py-2.5 text-sm font-body font-medium transition-all ${
                value === cat
                  ? 'bg-teal-soft ring-2 ring-teal text-teal'
                  : 'bg-ink/5 hover:bg-teal-soft text-ink'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}