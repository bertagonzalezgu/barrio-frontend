import 'leaflet/dist/leaflet.css'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import { useNavigate } from 'react-router-dom'
import { useThemeStore } from '../../theme/store/themeStore'
import { getMarkerIcon } from '../utils/getMarkerIcon'
import { getTileLayer } from '../utils/getTileLayer'
import type { MapCard } from '../types/map.types'

const DEFAULT_CENTER: [number, number] = [41.3874, 2.1686]
const DEFAULT_ZOOM = 13

export default function CardsMap({ cards }: { cards: MapCard[] }) {
  const navigate = useNavigate()
  const theme = useThemeStore((s) => s.theme)

  return (
    <MapContainer center={DEFAULT_CENTER} zoom={DEFAULT_ZOOM} className="h-full w-full">
      <TileLayer {...getTileLayer(theme)} />
      {cards.map((card) => (
        <Marker
          key={card.id}
          position={[card.lat, card.lng]}
          icon={getMarkerIcon(card.type)}
          title={card.title}
          eventHandlers={{ click: () => navigate(`/cards/${card.id}`) }}
        />
      ))}
    </MapContainer>
  )
}