import '@testing-library/jest-dom/vitest'
import { expect, vi, beforeAll, afterAll, afterEach } from 'vitest'
import { render, screen, fireEvent, within, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes, useParams } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { loadFeature, defineFeature } from 'jest-cucumber'
import path from 'path'
import { fileURLToPath } from 'url'

import MapPage from './pages/MapPage'
import type { MapCard } from './types/map.types'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

vi.mock('../../services/firebase', () => ({ auth: {} }))

// Leaflet no pinta nada útil en jsdom: aquí solo se prueba "datos → pines y clic"
vi.mock('react-leaflet', async () => {
  const { createElement } = await import('react')
  return {
    MapContainer: ({ children }: { children: React.ReactNode }) => createElement('div', null, children),
    TileLayer: () => null,
    Marker: ({
      position,
      title,
      eventHandlers,
    }: {
      position: [number, number]
      title: string
      eventHandlers?: { click?: () => void }
    }) =>
      createElement('button', {
        type: 'button',
        title,
        'data-lat': position[0],
        'data-lng': position[1],
        onClick: eventHandlers?.click,
      }),
  }
})

const pcCard: MapCard = {
  id: '1', type: 'offer', category: 'digital', title: 'Reviso portátiles lentos',
  icon: 'digital-pc', hours: 2, lat: 41.403, lng: 2.202,
}
const phoneCard: MapCard = {
  id: '2', type: 'request', category: 'digital', title: 'Ayuda con el móvil nuevo',
  icon: 'digital-pc', hours: 1, lat: 41.395, lng: 2.162,
}
const plantsCard: MapCard = {
  id: '3', type: 'request', category: 'garden', title: 'Regar plantas en agosto',
  icon: 'garden-plant', hours: 2, lat: 41.405, lng: 2.16,
}
const mapCards = [pcCard, phoneCard, plantsCard]

const server = setupServer(
  http.get('http://localhost:3001/api/cards/map', ({ request }) => {
    const category = new URL(request.url).searchParams.get('category')
    const filtered = category
      ? mapCards.filter(c => c.category.replace(/-/g, '_') === category)
      : mapCards
    return HttpResponse.json(filtered)
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

function DetailProbe() {
  const { id } = useParams()
  return <p>Detalle de la tarjeta {id}</p>
}

function renderMapPage(initialEntry = '/mapa') {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={[initialEntry]}>
        <Routes>
          <Route path="/mapa" element={<MapPage />} />
          <Route path="/cards/:id" element={<DetailProbe />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  )
}

async function openModalAndSelect(label: string | RegExp) {
  fireEvent.click(screen.getByRole('button', { name: /filtrar por categoría/i }))
  const heading = await screen.findByRole('heading', { name: /filtrar por categoría/i })
  const modalContent = heading.parentElement!.parentElement!
  fireEvent.click(within(modalContent).getByRole('button', { name: label }))
}

const feature = loadFeature(path.resolve(__dirname, '../../../docs/mapa.feature'))

defineFeature(feature, (test) => {
  test('Ver tarjetas geolocalizadas en el mapa', ({ given, when, then }) => {
    given('que existen tarjetas activas con ubicación en mi zona', () => {})

    when('abro la pantalla "Mapa"', () => {
      renderMapPage()
    })

    then('veo un pin por cada tarjeta activa en su posición aproximada', async () => {
      expect(await screen.findAllByTitle(/./)).toHaveLength(mapCards.length)
      for (const card of mapCards) {
        const pin = screen.getByTitle(card.title)
        expect(pin).toHaveAttribute('data-lat', String(card.lat))
        expect(pin).toHaveAttribute('data-lng', String(card.lng))
      }
    })
  })

  test('Filtrar el mapa por categoría', ({ given, when, then }) => {
    given('que estoy en la pantalla "Mapa" viendo todas las categorías', async () => {
      renderMapPage()
      expect(await screen.findAllByTitle(/./)).toHaveLength(mapCards.length)
    })

    when('selecciono la categoría "Digital"', async () => {
      await openModalAndSelect(/^digital$/i)
    })

    then('solo se muestran los pines de tarjetas de esa categoría', async () => {
      expect(await screen.findByTitle(pcCard.title)).toBeInTheDocument()
      expect(await screen.findByTitle(phoneCard.title)).toBeInTheDocument()
      await waitFor(() => expect(screen.queryByTitle(plantsCard.title)).not.toBeInTheDocument())
    })
  })

  test('Abrir el detalle de una tarjeta desde el mapa', ({ given, when, then }) => {
    given('que veo un pin en el mapa', async () => {
      renderMapPage()
      expect(await screen.findByTitle(pcCard.title)).toBeInTheDocument()
    })

    when('pulso sobre ese pin', () => {
      fireEvent.click(screen.getByTitle(pcCard.title))
    })

    then('se abre el detalle de la tarjeta correspondiente', async () => {
      expect(await screen.findByText(`Detalle de la tarjeta ${pcCard.id}`)).toBeInTheDocument()
    })
  })

  test('No hay tarjetas activas en la zona', ({ given, when, then }) => {
    given('que no existe ninguna tarjeta activa con ubicación cercana', () => {
      server.use(http.get('http://localhost:3001/api/cards/map', () => HttpResponse.json([])))
    })

    when('abro la pantalla "Mapa"', () => {
      renderMapPage()
    })

    then('veo un mensaje indicando que no hay actividad cerca', async () => {
      expect(await screen.findByText(/no hay actividad cerca/i)).toBeInTheDocument()
    })
  })
})