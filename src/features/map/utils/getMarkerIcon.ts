import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { divIcon, type DivIcon } from 'leaflet'
import { HandHeart, Search } from 'lucide-react'
import type { CardType } from '../../cards/types/card.types'

const PIN_STYLE = {
  request: { Icon: Search, colors: 'bg-busco text-on-busco' },
  offer: { Icon: HandHeart, colors: 'bg-primary text-on-primary' },
} as const

function buildIcon(type: CardType): DivIcon {
  const { Icon, colors } = PIN_STYLE[type]
  const glyph = renderToStaticMarkup(createElement(Icon, { size: 18, 'aria-hidden': true }))

  return divIcon({
    html: `<span class="flex h-9 w-9 items-center justify-center rounded-full border-2 border-surface shadow-soft ${colors}">${glyph}</span>`,
    className: '',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  })
}

const ICONS: Record<CardType, DivIcon> = {
  request: buildIcon('request'),
  offer: buildIcon('offer'),
}

export function getMarkerIcon(type: CardType): DivIcon {
  return ICONS[type]
}