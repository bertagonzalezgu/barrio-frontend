import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Card } from '../types/card.types'
import type { ProposeViewState } from '../../exchanges/types/exchange.types'
import { useDeleteCard } from '../hooks/useDeleteCard'
import ModalConfirm from '../../../components/ui/ModalConfirm'
import ProposeExchangeAction from '../../exchanges/components/ProposeExchangeAction'

interface Props {
  card: Card
  isOwner: boolean
  exchangeViewState: ProposeViewState
  onEdit: () => void
}

export default function CardDetailActions({ card, isOwner, exchangeViewState, onEdit }: Props) {
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
            onClick={onEdit}
            className="btn-primary w-full"
          >
            Editar tarjeta
          </button>
          <button
            onClick={() => setIsOpen(true)}
            disabled={isPending}
            className="btn-danger-outline w-full"
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
      <ProposeExchangeAction cardId={card.id} viewState={exchangeViewState} />
      <button
        onClick={() => navigate(`/denuncia?cardId=${card.id}`)}
        className="btn-danger-outline w-full"
      >
        Denunciar
      </button>
    </div>
  )
}