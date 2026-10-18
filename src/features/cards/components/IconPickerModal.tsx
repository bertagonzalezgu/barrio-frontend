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
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-ink/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-paper w-full sm:max-w-md max-h-[80vh] rounded-t-2xl sm:rounded-2xl overflow-y-auto p-5 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-ink text-lg">Elige un icono</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="text-ink/40 hover:text-ink transition-colors text-xl leading-none"
          >
            ✕
          </button>
        </div>

        {groups.map(({ label, icons }) => (
          <div key={label} className="flex flex-col gap-2">
            <p className="text-xs font-body font-medium text-ink/40 uppercase tracking-widest">
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
                  className={`w-full aspect-square rounded-xl flex items-center justify-center p-2 transition-all ${
                    value === icon
                      ? 'bg-teal-soft ring-2 ring-teal'
                      : 'bg-ink/5 hover:bg-teal-soft'
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