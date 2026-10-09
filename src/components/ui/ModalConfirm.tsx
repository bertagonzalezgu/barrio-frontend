interface Props {
  isOpen: boolean
  title: string
  message: string
  confirmLabel?: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ModalConfirm({ isOpen, title, message, confirmLabel = 'Confirmar', onConfirm, onCancel }: Props) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-paper rounded-3xl p-6 w-full max-w-sm flex flex-col gap-4 shadow-xl">
        <div className="flex flex-col gap-1">
          <h2 className="font-display font-bold text-ink text-lg">{title}</h2>
          <p className="font-body text-ink/60 text-sm leading-relaxed">{message}</p>
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={onConfirm}
            className="w-full py-3 rounded-2xl bg-coral text-paper font-body font-medium text-sm"
          >
            {confirmLabel}
          </button>
          <button
            onClick={onCancel}
            className="w-full py-3 rounded-2xl border border-ink/10 text-ink/60 font-body font-medium text-sm hover:bg-ink/5 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}