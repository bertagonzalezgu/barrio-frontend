import { CARD_TYPE_ORDER, TYPE_MARKERS } from '../constants/typeMarkers'
import TypeIcon from './TypeIcon'

export default function CalendarLegend() {
  return (
    <ul className="flex gap-4 text-xs font-body text-ink-muted">
      {CARD_TYPE_ORDER.map((type) => (
        <li key={type} className="flex items-center gap-1.5">
          <TypeIcon type={type} />
          {TYPE_MARKERS[type].label}
        </li>
      ))}
    </ul>
  )
}