import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Card } from '../types/card.types'
import { useDeleteCard } from '../hooks/useDeleteCard'
import ModalConfirm from '../../../components/ui/ModalConfirm'

interface Props {
  card: Card
  isOwner: boolean
}

export default function CardDetailActions({ card, isOwner }: Props) {
  const navigate = useNavigate()
  const { mutate: deleteCard, isPending } = useDeleteCard()
  const [isOpen, setIsOpen] = useState(false)

  function handleConfirm() {
    deleteCard(card.id, { onSuccess: () => navigate('/home') })
    setIsOpen(false)
  }

  if (isOwner) {
    return (
      <>
        <div className="flex flex-col gap-3 mt-auto">
          <button
            onClick={() => navigate(`/cards/${card.id}/editar`)}
            className="w-full py-3 rounded-2xl bg-teal text-paper font-body font-medium text-sm"
          >
            Editar tarjeta
          </button>
          <button
            onClick={() => setIsOpen(true)}
            disabled={isPending}
            className="w-full py-3 rounded-2xl border border-coral/30 text-coral font-body font-medium text-sm hover:bg-coral/5 transition-colors disabled:opacity-50"
          >
            {isPending ? 'Eliminando...' : 'Eliminar tarjeta'}
          </button>
        </div>
        <ModalConfirm
          isOpen={isOpen}
          title="Eliminar tarjeta"
          message="¿Segura que quieres eliminar esta tarjeta? Esta acción no se puede deshacer."
          confirmLabel="Sí, eliminar"
          onConfirm={handleConfirm}
          onCancel={() => setIsOpen(false)}
        />
      </>
    )
  }

  return (
    <div className="flex flex-col gap-3 mt-auto">
      <button
        onClick={() => navigate(`/intercambio/nuevo?cardId=${card.id}`)}
        className="w-full py-3 rounded-2xl bg-teal text-paper font-body font-medium text-sm"
      >
        Proponer intercambio
      </button>
      <button
        onClick={() => navigate(`/denuncia?cardId=${card.id}`)}
        className="w-full py-3 rounded-2xl border border-ink/10 text-ink/40 font-body font-medium text-sm hover:bg-ink/5 transition-colors"
      >
        Denunciar
      </button>
    </div>
  )
}