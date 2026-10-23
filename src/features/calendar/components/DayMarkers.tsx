import { CARD_TYPE_ORDER, TYPE_MARKERS } from '../constants/typeMarkers'
import type { CardType } from '../../cards/types/card.types'
import TypeIcon from './TypeIcon'

export default function DayMarkers({ types }: { types: ReadonlySet<CardType> }) {
  return (
    <span className="flex h-5 gap-0.5">
      {CARD_TYPE_ORDER.filter((type) => types.has(type)).map((type) => (
        <span key={type} role="img" aria-label={TYPE_MARKERS[type].label} className="flex">
          <TypeIcon type={type} />
        </span>
      ))}
    </span>
  )
}