import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { describe, it, expect, vi, beforeAll, afterEach, afterAll } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import ChatPage from './pages/ChatPage'

vi.mock('../../services/firebase', () => ({ auth: {} }))

const API = 'http://localhost:3001/api'
const EXCHANGE_ID = 'exchange-1'
const ACCEPT_BUTTON = { name: 'Aceptar propuesta' }
const REJECT_BUTTON = { name: 'Rechazar propuesta' }
const CONFIRM_BUTTON = { name: 'Confirmar intercambio' }

const proposedChat = {
  id: EXCHANGE_ID,
  status: 'proposed',
  hours: 2,
  card: { id: 'card-1', title: 'Ayuda con una mudanza', type: 'request' },
  other: { id: 'user-b', name: 'Lucía', avatar: '' },
  myConfirmed: false,
  otherConfirmed: false,
  actions: ['accept', 'reject', 'cancel'],
}

const server = setupServer()
const transitionCalls = vi.fn()

// Lo que devuelve el "servidor" en cada momento: el PATCH lo actualiza.
let currentChat: object = proposedChat

beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers()
  transitionCalls.mockClear()
})
afterAll(() => server.close())

function mockChat(chat: object) {
  currentChat = chat
  server.use(
    http.get(`${API}/exchanges/${EXCHANGE_ID}`, () => HttpResponse.json(currentChat)),
    http.get(`${API}/exchanges/${EXCHANGE_ID}/messages`, () => HttpResponse.json([]))
  )
}

function mockTransition(action: 'accept' | 'reject', next: { status: string; actions: string[] }) {
  server.use(
    http.patch(`${API}/exchanges/${EXCHANGE_ID}/${action}`, () => {
      transitionCalls(action)
      currentChat = next
      return HttpResponse.json({ id: EXCHANGE_ID, cardId: 'card-1', status: next.status })
    })
  )
}

function mockTransitionError(action: 'accept' | 'reject', code: string, chatAfter: object = currentChat) {
  server.use(
    http.patch(`${API}/exchanges/${EXCHANGE_ID}/${action}`, () => {
      currentChat = chatAfter
      return HttpResponse.json({ error: code }, { status: 409 })
    })
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

describe('Aceptar o rechazar la propuesta desde el chat', () => {
  it('la autora ve las dos opciones y, al aceptar, pasa a poder confirmar', async () => {
    mockChat(proposedChat)
    mockTransition('accept', { ...proposedChat, status: 'accepted', actions: ['cancel', 'confirm'] })
    renderChat()

    expect(await screen.findByRole('button', REJECT_BUTTON)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', ACCEPT_BUTTON))

    await waitFor(() => expect(transitionCalls).toHaveBeenCalledWith('accept'))
    expect(await screen.findByRole('button', CONFIRM_BUTTON)).toBeInTheDocument()
    expect(screen.queryByRole('button', ACCEPT_BUTTON)).not.toBeInTheDocument()
    expect(screen.queryByRole('button', REJECT_BUTTON)).not.toBeInTheDocument()
  })

  it('al rechazar desaparecen las dos opciones y no se puede confirmar', async () => {
    mockChat(proposedChat)
    mockTransition('reject', { ...proposedChat, status: 'rejected', actions: [] })
    renderChat()

    fireEvent.click(await screen.findByRole('button', REJECT_BUTTON))

    await waitFor(() => expect(transitionCalls).toHaveBeenCalledWith('reject'))
    await waitFor(() => expect(screen.queryByRole('button', REJECT_BUTTON)).not.toBeInTheDocument())
    expect(screen.queryByRole('button', ACCEPT_BUTTON)).not.toBeInTheDocument()
    expect(screen.queryByRole('button', CONFIRM_BUTTON)).not.toBeInTheDocument()
  })

  it('quien propuso no ve ni aceptar ni rechazar', async () => {
    mockChat({ ...proposedChat, actions: ['cancel'] })
    renderChat()

    await screen.findByRole('log')
    expect(screen.queryByRole('button', ACCEPT_BUTTON)).not.toBeInTheDocument()
    expect(screen.queryByRole('button', REJECT_BUTTON)).not.toBeInTheDocument()
  })

  it('si la tarjeta ya no está disponible solo se puede rechazar', async () => {
    mockChat({ ...proposedChat, actions: ['reject', 'cancel'] })
    renderChat()

    expect(await screen.findByRole('button', REJECT_BUTTON)).toBeInTheDocument()
    expect(screen.queryByRole('button', ACCEPT_BUTTON)).not.toBeInTheDocument()
  })

  it('avisa si no hay saldo suficiente y deja volver a intentarlo', async () => {
    mockChat(proposedChat)
    mockTransitionError('accept', 'insufficient_balance')
    renderChat()

    fireEvent.click(await screen.findByRole('button', ACCEPT_BUTTON))

    expect(await screen.findByRole('alert')).toHaveTextContent(/saldo/i)
    expect(screen.getByRole('button', ACCEPT_BUTTON)).toBeInTheDocument()
  })

  it('si la tarjeta se ha ocupado, avisa y deja de ofrecer aceptar', async () => {
    mockChat(proposedChat)
    mockTransitionError('accept', 'card_unavailable', { ...proposedChat, actions: ['reject', 'cancel'] })
    renderChat()

    fireEvent.click(await screen.findByRole('button', ACCEPT_BUTTON))

    expect(await screen.findByRole('alert')).toHaveTextContent(/tarjeta ya no está disponible/i)
    await waitFor(() => expect(screen.queryByRole('button', ACCEPT_BUTTON)).not.toBeInTheDocument())
    expect(screen.getByRole('button', REJECT_BUTTON)).toBeInTheDocument()
  })
})