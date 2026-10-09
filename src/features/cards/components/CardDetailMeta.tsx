import { Link } from 'react-router-dom'
import type { Card } from '../types/card.types'

export default function CardDetailMeta({ card }: { card: Card }) {
  return (
    <div className="flex flex-col gap-3 border-t border-ink/10 pt-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-body text-ink/40">Horas</span>
        <span className="font-data font-bold text-teal text-lg">{card.hours}h</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs font-body text-ink/40">Publicado por</span>
        <Link to={`/perfil/${card.author.id}`} className="text-xs font-body text-teal hover:underline">
          {card.author.name}
        </Link>
      </div>
      {card.startDate && (
        <div className="flex items-center justify-between">
          <span className="text-xs font-body text-ink/40">Disponibilidad</span>
          <span className="text-xs font-body text-ink">
            {new Date(card.startDate).toLocaleDateString('es-ES')}
            {card.endDate && ` → ${new Date(card.endDate).toLocaleDateString('es-ES')}`}
          </span>
        </div>
      )}
    </div>
  )
}