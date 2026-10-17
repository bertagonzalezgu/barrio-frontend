import { loadFeature, defineFeature } from 'jest-cucumber'
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { vi, beforeAll, afterEach, afterAll } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import ChatPage from './pages/ChatPage'

vi.mock('../../services/firebase', () => ({ auth: {} }))

const API = 'http://localhost:3001/api'
const EXCHANGE_ID = 'exchange-1'

const server = setupServer()

beforeAll(() => server.listen())
afterEach(() => {
    server.resetHandlers()
    sentMessages.mockClear()
})
afterAll(() => server.close())

interface StoredMessage {
  id: string
  text: string
  sentAt: string
  sender: 'A' | 'B'
}

let stored: StoredMessage[] = []
let viewer: 'A' | 'B' = 'A'
const sentMessages = vi.fn()

const chatDetail = {
  id: EXCHANGE_ID,
  status: 'proposed',
  hours: 2,
  card: { id: 'card-1', title: 'Ayuda con una mudanza', type: 'request' },
  other: { id: 'user-b', name: 'Lucía', avatar: '' },
  myConfirmed: false,
  otherConfirmed: false,
  actions: ['cancel'],
}

function mockChatApi() {
  stored = []
  viewer = 'A'
  server.use(
    http.get(`${API}/exchanges/${EXCHANGE_ID}`, () => HttpResponse.json(chatDetail)),
    http.get(`${API}/exchanges/${EXCHANGE_ID}/messages`, () =>
      HttpResponse.json(
        stored.map(({ id, text, sentAt, sender }) => ({ id, text, sentAt, mine: sender === viewer }))
      )
    ),
    http.post(`${API}/exchanges/${EXCHANGE_ID}/messages`, async ({ request }) => {
      const { text } = (await request.json()) as { text: string }
      sentMessages({ text })
      const message: StoredMessage = {
        id: `message-${stored.length + 1}`,
        text,
        sentAt: new Date().toISOString(),
        sender: viewer,
      }
      stored.push(message)
      return HttpResponse.json(
        { id: message.id, text, sentAt: message.sentAt, mine: true },
        { status: 201 }
      )
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

const feature = loadFeature('./docs/chat.feature')
const MESSAGE_TEXT = '¿Quedamos el sábado a las 10?'
const LEAKED_EMAIL = 'lucia@barrio.local'
const LEAKED_PHONE = '+34 600 123 456'

defineFeature(feature, (test) => {
  test('Enviar y recibir mensajes dentro del chat de un intercambio', ({ given, when, and, then }) => {
  given('que tengo un intercambio propuesto con otro usuario', () => {
    mockChatApi()
  })

  when('abro el chat asociado a esa propuesta', async () => {
    renderChat()
    expect(await screen.findByRole('log')).toBeInTheDocument()
  })

  and('escribo un mensaje proponiendo fecha y hora', () => {
    fireEvent.change(screen.getByRole('textbox', { name: /mensaje/i }), {
      target: { value: MESSAGE_TEXT },
    })
    fireEvent.click(screen.getByRole('button', { name: /enviar/i }))
  })

  then('el mensaje se guarda', async () => {
    await waitFor(() => expect(sentMessages).toHaveBeenCalledWith({ text: MESSAGE_TEXT }))
    expect(await screen.findByText(MESSAGE_TEXT)).toBeInTheDocument()
  })

  and('el otro usuario puede verlo al abrir el mismo chat', async () => {
    cleanup()
    viewer = 'B'
    renderChat()
    expect(await screen.findByText(MESSAGE_TEXT)).toBeInTheDocument()
  })
})

  test('El teléfono no se comparte por defecto', ({ given, when, then }) => {
  given('que estoy chateando con otro usuario dentro de la app', () => {
    mockChatApi()
    stored.push({
      id: 'message-1',
      text: 'Hola, ¿quedamos?',
      sentAt: new Date().toISOString(),
      sender: 'B',
    })
    // Aunque el backend filtrase datos de contacto por error, la pantalla no debe mostrarlos.
    server.use(
      http.get(`${API}/exchanges/${EXCHANGE_ID}`, () =>
        HttpResponse.json({
          ...chatDetail,
          other: { ...chatDetail.other, email: LEAKED_EMAIL, phone: LEAKED_PHONE },
        })
      )
    )
  })

  when('reviso la conversación y el perfil del otro usuario', async () => {
    renderChat()
    expect(await screen.findByText('Hola, ¿quedamos?')).toBeInTheDocument()
  })

  then('mi número de teléfono no es visible para él en ningún momento del flujo', () => {
    expect(document.body).not.toHaveTextContent(LEAKED_PHONE)
    expect(document.body).not.toHaveTextContent(LEAKED_EMAIL)
    expect(document.querySelector('a[href^="tel:"], a[href^="mailto:"]')).toBeNull()
  })
})

  test('Denunciar una conversación', ({ given, when, then, and }) => {
    given('que estoy en un chat con otro usuario', () => {
      throw 'pendiente: escenario 3'
    })
    when('pulso el botón "Denunciar"', () => {})
    then('se registra una denuncia asociada a esa conversación', () => {})
    and('el chat sigue siendo accesible para que el equipo de revisión pueda consultarlo', () => {})
  })

  test('El chat solo es visible para las dos personas implicadas', ({ given, when, then }) => {
    given('que existe un chat entre el usuario A y el usuario B', () => {
      server.use(
        http.get(`${API}/exchanges/${EXCHANGE_ID}`, () =>
          HttpResponse.json({ error: 'Exchange not found' }, { status: 404 })
        ),
        http.get(`${API}/exchanges/${EXCHANGE_ID}/messages`, () =>
          HttpResponse.json({ error: 'Exchange not found' }, { status: 404 })
        )
      )
    })

    when('un tercer usuario intenta acceder a esa conversación por su identificador', () => {
      renderChat()
    })

    then('no puede ver los mensajes de esa conversación', async () => {
      expect(await screen.findByRole('alert')).toHaveTextContent(/no existe o no tienes acceso/i)
      expect(screen.queryByRole('log')).not.toBeInTheDocument()
      expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
    })
  })
})