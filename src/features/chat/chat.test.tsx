import { loadFeature, defineFeature } from 'jest-cucumber'
import { render, screen } from '@testing-library/react'
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
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

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

defineFeature(feature, (test) => {
  test('Enviar y recibir mensajes dentro del chat de un intercambio', ({ given, when, and, then }) => {
    given('que tengo un intercambio propuesto con otro usuario', () => {
      throw 'pendiente: escenario 1'
    })
    when('abro el chat asociado a esa propuesta', () => {})
    and('escribo un mensaje proponiendo fecha y hora', () => {})
    then('el mensaje se guarda', () => {})
    and('el otro usuario puede verlo al abrir el mismo chat', () => {})
  })

  test('El teléfono no se comparte por defecto', ({ given, when, then }) => {
    given('que estoy chateando con otro usuario dentro de la app', () => {
      throw 'pendiente: escenario 2'
    })
    when('reviso la conversación y el perfil del otro usuario', () => {})
    then('mi número de teléfono no es visible para él en ningún momento del flujo', () => {})
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
      // Quien consulta es una tercera persona: para ella el backend responde igual que si no existiera.
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