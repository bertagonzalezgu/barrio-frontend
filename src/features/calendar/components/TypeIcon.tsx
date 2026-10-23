import { TYPE_MARKERS } from '../constants/typeMarkers'
import type { CardType } from '../../cards/types/card.types'

interface Props {
  type: CardType
  className?: string
}

export default function TypeIcon({ type, className = 'size-5' }: Props) {
  const { Icon, colors } = TYPE_MARKERS[type]

  return (
    <span className={`flex shrink-0 items-center justify-center rounded-full ${className} ${colors}`}>
      <Icon size="60%" aria-hidden="true" />
    </span>
  )
}