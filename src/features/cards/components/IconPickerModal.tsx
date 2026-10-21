import { groupIconsByCategory } from '../utils/groupIconsByCategory'
import type { CardIconType } from '../types/card-icon.types'
import CardIcon from './CardIcon'

interface Props {
  value: CardIconType | ''
  onSelect: (icon: CardIconType) => void
  onClose: () => void
}

export default function IconPickerModal({ value, onSelect, onClose }: Props) {
  const groups = groupIconsByCategory()

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-scrim backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="border border-line bg-surface w-full sm:max-w-md max-h-[80vh] rounded-t-card sm:rounded-card overflow-y-auto p-5 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-ink text-h4">Elige un icono</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="flex size-12 items-center justify-center rounded-full text-ink-muted hover:bg-surface-2 hover:text-ink transition-colors text-xl leading-none"
          >
            ✕
          </button>
        </div>

        {groups.map(({ label, icons }) => (
          <div key={label} className="flex flex-col gap-2">
            <p className="text-xs font-body font-medium text-ink-muted uppercase tracking-widest">
              {label}
            </p>
            <div className="grid grid-cols-6 gap-2">
              {icons.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  aria-label={icon}
                  aria-pressed={value === icon}
                  onClick={() => { onSelect(icon); onClose() }}
                  className={`w-full aspect-square rounded-2xl flex items-center justify-center p-2 transition-all ${
                    value === icon
                      ? 'bg-primary-tint ring-2 ring-primary'
                      : 'bg-surface-2 hover:bg-primary-tint'
                  }`}
                >
                  <CardIcon name={icon} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}