import { screen, fireEvent } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { describe, it, expect, vi, beforeAll, afterEach, afterAll } from 'vitest'
import { API, EXCHANGE_ID, baseChat } from './test/chatFixtures'
import { renderChat } from './test/renderChat'

vi.mock('../../services/firebase', () => ({ auth: {} }))

const MESSAGE_INPUT = { name: /mensaje/i }
const SEND_BUTTON = { name: /enviar/i }
const EXISTING_MESSAGE = 'Quedamos el sábado a las 10'

const server = setupServer()

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