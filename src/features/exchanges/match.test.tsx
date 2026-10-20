import { loadFeature, defineFeature } from 'jest-cucumber'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { vi, beforeAll, afterEach, afterAll } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter, Routes, Route, useParams } from 'react-router-dom'
import CardDetailPage from '../cards/pages/CardDetailPage'
import type { Card } from '../cards/types/card.types'

vi.mock('../../services/firebase', () => ({ auth: {} }))

const API = 'http://localhost:3001/api'

const card: Card = {
  id: 'card-1',
  authorId: 'user-autora',
  author: { id: 'user-autora', name: 'Marta', avatar: '' },
  isMine: false,
  type: 'request',
  title: 'Ayuda con una mudanza',
  description: 'Necesito ayuda para subir unas cajas a un tercer piso.',
  category: 'moving',
  hours: 2,
  icon: 'moving-box',
  lat: null,
  lng: null,
  startDate: null,
  endDate: null,
  status: 'active',
  createdAt: '2026-10-10T10:00:00.000Z',
  updatedAt: '2026-10-10T10:00:00.000Z',
}

interface ExchangeState {
  mine: { id: string; status: string } | null
  cardAvailable: boolean
}

const server = setupServer()
const proposals = vi.fn()

beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers()
  proposals.mockClear()
})
afterAll(() => server.close())

function mockCard(isMine = false) {
  server.use(
    http.get(`${API}/cards/${card.id}`, () => HttpResponse.json({ ...card, isMine })),
    http.get(`${API}/users/${card.author.id}`, () =>
      HttpResponse.json({
        id: card.author.id,
        name: card.author.name,
        avatar: '',
        verified: false,
        ratingAverage: null,
        ratingCount: 0,
        exchangeCount: 0,
        createdAt: '2026-04-20T12:00:00.000Z',
      })
    )
  )
}

function mockExchangeState(state: ExchangeState) {
  server.use(http.get(`${API}/exchanges/card/${card.id}`, () => HttpResponse.json(state)))
}

function mockPropose() {
  server.use(
    http.post(`${API}/exchanges`, async ({ request }) => {
      proposals(await request.json())
      return HttpResponse.json({ id: 'exchange-1', cardId: card.id, status: 'proposed' }, { status: 201 })
    })
  )
}

function ChatStub() {
  const { exchangeId } = useParams()
  return <p>{`Chat del intercambio ${exchangeId}`}</p>
}

function renderCardDetail() {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  })
  render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={[`/cards/${card.id}`]}>
        <Routes>
          <Route path="/cards/:id" element={<CardDetailPage />} />
          <Route path="/chat/:exchangeId" element={<ChatStub />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  )
}

const PROPOSE_BUTTON = { name: /proponer intercambio/i }

const feature = loadFeature('./docs/match.feature')

defineFeature(feature, (test) => {
  test('Proponer intercambio desde el detalle de una tarjeta de "busco"', ({ given, when, then, and }) => {
    given('que veo el detalle de una tarjeta de tipo "busco" publicada por otra persona', async () => {
      mockCard()
      mockExchangeState({ mine: null, cardAvailable: true })
      mockPropose()
      renderCardDetail()
      expect(await screen.findByRole('button', PROPOSE_BUTTON)).toBeInTheDocument()
    })

    when('pulso "Proponer intercambio"', () => {
      fireEvent.click(screen.getByRole('button', PROPOSE_BUTTON))
    })

    then('se crea una propuesta de intercambio asociada a esa tarjeta', async () => {
      await waitFor(() => expect(proposals).toHaveBeenCalledWith({ cardId: card.id }))
    })

    and('se abre un chat entre ambos usuarios para coordinar', async () => {
      expect(await screen.findByText('Chat del intercambio exchange-1')).toBeInTheDocument()
    })
  })

  test('No se puede proponer intercambio a la propia tarjeta', ({ given, when, then }) => {
    given('que soy el autor de una tarjeta de "busco"', () => {
      mockCard(true)
      mockExchangeState({ mine: null, cardAvailable: true })
    })

    when('visito el detalle de mi propia tarjeta', () => {
      renderCardDetail()
    })

    then('no veo el botón "Proponer intercambio"', async () => {
      expect(await screen.findByRole('button', { name: /editar tarjeta/i })).toBeInTheDocument()
      expect(screen.queryByRole('button', PROPOSE_BUTTON)).not.toBeInTheDocument()
    })
  })

  test('Ver el estado de una propuesta enviada', ({ given, and, when, then }) => {
    given('que he propuesto un intercambio sobre una tarjeta', () => {
      mockCard()
      mockExchangeState({ mine: { id: 'exchange-1', status: 'proposed' }, cardAvailable: true })
    })

    and('la otra persona todavía no ha respondido', () => {})

    when('vuelvo a abrir el detalle de esa tarjeta', () => {
      renderCardDetail()
    })

    then('veo el estado "Propuesta enviada"', async () => {
      expect(await screen.findByText('Propuesta enviada')).toBeInTheDocument()
      expect(screen.queryByRole('button', PROPOSE_BUTTON)).not.toBeInTheDocument()
    })
  })

  test('No se puede proponer un segundo intercambio sobre la misma tarjeta ya aceptada', ({ given, when, then, and }) => {
    given('que una tarjeta ya tiene un intercambio aceptado con otra persona', () => {
      mockCard()
      mockExchangeState({ mine: null, cardAvailable: false })
      mockPropose()
    })

    when('intento pulsar "Proponer intercambio" sobre esa misma tarjeta', async () => {
      renderCardDetail()
      await screen.findByText(/ya no está disponible/i)
      const button = screen.queryByRole('button', PROPOSE_BUTTON)
      if (button) fireEvent.click(button)
    })

    then('no puedo enviar una nueva propuesta', () => {
      expect(screen.queryByRole('button', PROPOSE_BUTTON)).not.toBeInTheDocument()
      expect(proposals).not.toHaveBeenCalled()
    })

    and('veo un aviso de que la tarjeta ya no está disponible', () => {
      expect(screen.getByText(/ya no está disponible/i)).toBeInTheDocument()
    })
  })
})