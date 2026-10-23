import { TYPE_MARKERS } from '../constants/typeMarkers'
import type { CardType } from '../../cards/types/card.types'

export default function TypeIcon({ type }: { type: CardType }) {
  const { Icon, colors } = TYPE_MARKERS[type]

  return (
    <span className={`flex size-5 shrink-0 items-center justify-center rounded-full ${colors}`}>
      <Icon size={12} aria-hidden="true" />
    </span>
  )
}