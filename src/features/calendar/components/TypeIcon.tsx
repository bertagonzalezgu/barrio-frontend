import { TYPE_MARKERS } from '../constants/typeMarkers'
import type { CardType } from '../../cards/types/card.types'

interface Props {
  type: CardType
  large?: boolean
}

export default function TypeIcon({ type, large = false }: Props) {
  const { Icon, colors } = TYPE_MARKERS[type]

  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full ${large ? 'size-6' : 'size-5'} ${colors}`}
    >
      <Icon size={large ? 14 : 12} aria-hidden="true" />
    </span>
  )
}