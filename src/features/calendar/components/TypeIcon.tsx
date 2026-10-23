import { TYPE_MARKERS } from '../constants/typeMarkers'
import type { CardType } from '../../cards/types/card.types'

interface Props {
  type: CardType
  small?: boolean
}

export default function TypeIcon({ type, small = false }: Props) {
  const { Icon, colors } = TYPE_MARKERS[type]

  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full ${small ? 'size-4' : 'size-5'} ${colors}`}
    >
      <Icon size={small ? 10 : 12} aria-hidden="true" />
    </span>
  )
}