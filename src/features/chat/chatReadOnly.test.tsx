import { render, screen, fireEvent } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { describe, it, expect, vi, beforeAll, afterEach, afterAll } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import ChatPage from './pages/ChatPage'

vi.mock('../../services/firebase', () => ({ auth: {} }))

const API = 'http://localhost:3001/api'
const EXCHANGE_ID = 'exchange-1'
const MESSAGE_INPUT = { name: /mensaje/i }
const SEND_BUTTON = { name: /enviar/i }
const EXISTING_MESSAGE = 'Quedamos el sábado a las 10'

const baseChat = {
  id: EXCHANGE_ID,
  status: 'accepted',
  hours: 2,
  card: { id: 'card-1', title: 'Ayuda con una mudanza', type: 'request' },
  other: { id: 'user-b', name: 'Lucía', avatar: '' },
  myConfirmed: false,
  otherConfirmed: false,
  actions: ['cancel', 'confirm'],
}

const server = setupServer()

// Lo que devuelve el "servidor" en cada momento: algunos tests lo cambian a mitad.
let currentChat: object = baseChat

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

function mockChat(chat: object) {
  currentChat = chat
  server.use(
    http.get(`${API}/exchanges/${EXCHANGE_ID}`, () => HttpResponse.json(currentChat)),
    http.get(`${API}/exchanges/${EXCHANGE_ID}/messages`, () =>
      HttpResponse.json([
        { id: 'message-1', text: EXISTING_MESSAGE, sentAt: '2026-10-17T10:00:00.000Z', mine: false },
      ])
    )
  )
}

function renderChat() {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  })
  render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={[`/chat/${EXCHANGE_ID}`]}>
        <Routes>
          <Route path="/chat/:exchangeId" element={<ChatPage />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  )
}

describe('Chat abierto o en solo lectura según el estado del intercambio', () => {
  it.each(['proposed', 'accepted', 'done'])('se puede escribir cuando está en %s', async (status) => {
    mockChat({ ...baseChat, status })
    renderChat()

    expect(await screen.findByRole('textbox', MESSAGE_INPUT)).toBeInTheDocument()
    expect(screen.queryByText(/chat está cerrado/i)).not.toBeInTheDocument()
  })

  it.each(['confirmed', 'rated', 'cancelled', 'rejected'])(
    'queda en solo lectura cuando está en %s, pero se puede leer y denunciar',
    async (status) => {
      mockChat({ ...baseChat, status, actions: [] })
      renderChat()

      expect(await screen.findByText(/chat está cerrado/i)).toBeInTheDocument()
      expect(screen.queryByRole('textbox', MESSAGE_INPUT)).not.toBeInTheDocument()
      expect(screen.queryByRole('button', SEND_BUTTON)).not.toBeInTheDocument()
      expect(screen.getByText(EXISTING_MESSAGE)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Denunciar' })).toBeInTheDocument()
    }
  )

  it('si el chat se cierra mientras escribes, pasa a solo lectura', async () => {
    mockChat(baseChat)
    server.use(
      http.post(`${API}/exchanges/${EXCHANGE_ID}/messages`, () => {
        currentChat = { ...baseChat, status: 'cancelled', actions: [] }
        return HttpResponse.json({ error: 'chat_closed' }, { status: 409 })
      })
    )
    renderChat()

    fireEvent.change(await screen.findByRole('textbox', MESSAGE_INPUT), {
      target: { value: 'Hola, ¿sigues ahí?' },
    })
    fireEvent.click(screen.getByRole('button', SEND_BUTTON))

    expect(await screen.findByText(/chat está cerrado/i)).toBeInTheDocument()
    expect(screen.queryByRole('textbox', MESSAGE_INPUT)).not.toBeInTheDocument()
  })

  it('si el envío falla por otra causa, avisa y conserva el texto', async () => {
    mockChat(baseChat)
    server.use(
      http.post(`${API}/exchanges/${EXCHANGE_ID}/messages`, () =>
        HttpResponse.json({ error: 'internal_error' }, { status: 500 })
      )
    )
    renderChat()

    fireEvent.change(await screen.findByRole('textbox', MESSAGE_INPUT), {
      target: { value: 'Mensaje que no llega' },
    })
    fireEvent.click(screen.getByRole('button', SEND_BUTTON))

    expect(await screen.findByRole('alert')).toHaveTextContent(/no se ha podido enviar/i)
    expect(screen.getByRole('textbox', MESSAGE_INPUT)).toHaveValue('Mensaje que no llega')
  })
})