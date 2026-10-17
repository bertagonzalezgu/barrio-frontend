import { screen, fireEvent, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { describe, it, expect, vi, beforeAll, afterEach, afterAll } from 'vitest'
import { API, EXCHANGE_ID, baseChat } from './test/chatFixtures'
import { renderChat } from './test/renderChat'

vi.mock('../../services/firebase', () => ({ auth: {} }))

const CONFIRM_BUTTON = { name: 'Confirmar intercambio' }

const server = setupServer()
const confirmCalls = vi.fn()
const detailCalls = vi.fn()

let currentChat: object = baseChat

beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers()
  confirmCalls.mockClear()
  detailCalls.mockClear()
})
afterAll(() => server.close())

function mockChat(chat: object) {
  currentChat = chat
  server.use(
    http.get(`${API}/exchanges/${EXCHANGE_ID}`, () => {
      detailCalls()
      return HttpResponse.json(currentChat)
    }),
    http.get(`${API}/exchanges/${EXCHANGE_ID}/messages`, () => HttpResponse.json([]))
  )
}

function mockConfirm(next: object) {
  server.use(
    http.patch(`${API}/exchanges/${EXCHANGE_ID}/confirm`, () => {
      confirmCalls()
      currentChat = next
      return HttpResponse.json(next)
    })
  )
}

describe('Confirmar intercambio desde el chat', () => {
  it('la primera persona confirma y pasa a esperar a la otra', async () => {
    mockChat(baseChat)
    mockConfirm({ ...baseChat, status: 'done', myConfirmed: true, actions: [] })
    renderChat()

    fireEvent.click(await screen.findByRole('button', CONFIRM_BUTTON))

    await waitFor(() => expect(confirmCalls).toHaveBeenCalledTimes(1))
    expect(await screen.findByText(/esperando a que Lucía confirme/i)).toBeInTheDocument()
    expect(screen.queryByRole('button', CONFIRM_BUTTON)).not.toBeInTheDocument()
  })

  it('si la otra persona ya confirmó lo avisa, y al confirmar queda cerrado', async () => {
    mockChat({ ...baseChat, status: 'done', otherConfirmed: true, actions: ['confirm'] })
    mockConfirm({ ...baseChat, status: 'confirmed', myConfirmed: true, otherConfirmed: true, actions: [] })
    renderChat()

    expect(await screen.findByText(/Lucía ya ha confirmado/i)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', CONFIRM_BUTTON))

    expect(await screen.findByText(/intercambio confirmado/i)).toBeInTheDocument()
    expect(screen.queryByRole('button', CONFIRM_BUTTON)).not.toBeInTheDocument()
  })

  it('quien ya confirmó no vuelve a ver el botón', async () => {
    mockChat({ ...baseChat, status: 'done', myConfirmed: true, actions: [] })
    renderChat()

    expect(await screen.findByText(/esperando a que Lucía confirme/i)).toBeInTheDocument()
    expect(screen.queryByRole('button', CONFIRM_BUTTON)).not.toBeInTheDocument()
  })

  it('con las dos confirmaciones solo se muestra el resultado', async () => {
    mockChat({ ...baseChat, status: 'confirmed', myConfirmed: true, otherConfirmed: true, actions: [] })
    renderChat()

    expect(await screen.findByText(/intercambio confirmado/i)).toBeInTheDocument()
    expect(screen.queryByRole('button', CONFIRM_BUTTON)).not.toBeInTheDocument()
  })

  it.each([
    ['proposed', ['cancel']],
    ['cancelled', []],
    ['rejected', []],
  ])('no ofrece confirmar cuando el intercambio está en %s', async (status, actions) => {
    mockChat({ ...baseChat, status, actions })
    renderChat()

    await screen.findByRole('log')
    expect(screen.queryByRole('button', CONFIRM_BUTTON)).not.toBeInTheDocument()
    expect(screen.queryByText(/esperando a que|intercambio confirmado/i)).not.toBeInTheDocument()
  })

  it('si ya no se puede confirmar, avisa y vuelve a pedir el detalle', async () => {
    mockChat(baseChat)
    server.use(
      http.patch(`${API}/exchanges/${EXCHANGE_ID}/confirm`, () =>
        HttpResponse.json({ error: 'already_confirmed' }, { status: 409 })
      )
    )
    renderChat()

    fireEvent.click(await screen.findByRole('button', CONFIRM_BUTTON))

    expect(await screen.findByRole('alert')).toHaveTextContent(/ya no está disponible/i)
    await waitFor(() => expect(detailCalls.mock.calls.length).toBeGreaterThanOrEqual(2))
  })
})