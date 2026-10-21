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
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-scrim backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-label="Filtrar por categoría"
        className="border border-line bg-surface w-full sm:max-w-md max-h-[80vh] rounded-t-card sm:rounded-card overflow-y-auto p-5 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-ink text-h4">Filtrar por categoría</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="flex size-12 items-center justify-center rounded-full text-ink-muted hover:bg-surface-2 hover:text-ink transition-colors text-xl leading-none"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            aria-pressed={value === undefined}
            onClick={() => { onSelect(undefined); onClose() }}
            className={`min-h-12 rounded-full px-4 py-2.5 text-sm font-body font-medium transition-all ${
              value === undefined
                ? 'bg-primary-tint ring-2 ring-primary text-primary-ink'
                : 'bg-surface-2 hover:bg-primary-tint text-ink'
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
              className={`min-h-12 rounded-full px-4 py-2.5 text-sm font-body font-medium transition-all ${
                value === cat
                  ? 'bg-primary-tint ring-2 ring-primary text-primary-ink'
                  : 'bg-surface-2 hover:bg-primary-tint text-ink'
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