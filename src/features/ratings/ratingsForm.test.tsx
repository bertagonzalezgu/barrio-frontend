import { screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { describe, it, expect, vi, beforeAll, afterEach, afterAll } from 'vitest'
import { API, EXCHANGE_ID } from '../chat/test/chatFixtures'
import { confirmedChat, MY_RATING } from './test/ratingFixtures'
import { renderRatings } from './test/renderRatings'

vi.mock('../../services/firebase', () => ({ auth: {} }))

const SEND_BUTTON = { name: 'Enviar valoración' }
const COMMENT_BOX = { name: /comentario/i }

const server = setupServer()
const ratingCalls = vi.fn()

beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers()
  ratingCalls.mockClear()
})
afterAll(() => server.close())

function mockChat(chat: object) {
  server.use(
    http.get(`${API}/exchanges/${EXCHANGE_ID}`, () => HttpResponse.json(chat)),
    http.get(`${API}/exchanges/${EXCHANGE_ID}/messages`, () => HttpResponse.json([]))
  )
}

function mockRating(response: object, status = 201) {
  server.use(
    http.post(`${API}/exchanges/${EXCHANGE_ID}/rating`, async ({ request }) => {
      ratingCalls(await request.json())
      return HttpResponse.json(response, { status })
    })
  )
}

function chooseScore(score: number) {
  fireEvent.click(screen.getByRole('radio', { name: `${score} de 5` }))
}

describe('Formulario de valoración', () => {
  it('sin puntuación avisa y no envía nada', async () => {
    mockChat(confirmedChat)
    mockRating({})
    renderRatings()

    fireEvent.click(await screen.findByRole('button', SEND_BUTTON))

    expect(await screen.findByRole('alert')).toHaveTextContent(/elige una puntuación/i)
    expect(ratingCalls).not.toHaveBeenCalled()
  })

  it('recorta el comentario y envía la puntuación como número', async () => {
    mockChat(confirmedChat)
    mockRating({ ...confirmedChat, actions: [], myRating: { score: 3, comment: 'Muy bien' } })
    renderRatings()

    await screen.findByRole('button', SEND_BUTTON)
    chooseScore(3)
    fireEvent.change(screen.getByRole('textbox', COMMENT_BOX), { target: { value: '  Muy bien  ' } })
    fireEvent.click(screen.getByRole('button', SEND_BUTTON))

    await waitFor(() => expect(ratingCalls).toHaveBeenCalledWith({ score: 3, comment: 'Muy bien' }))
  })

  it('omite el comentario cuando solo tiene espacios', async () => {
    mockChat(confirmedChat)
    mockRating({ ...confirmedChat, actions: [], myRating: { score: 3, comment: null } })
    renderRatings()

    await screen.findByRole('button', SEND_BUTTON)
    chooseScore(3)
    fireEvent.change(screen.getByRole('textbox', COMMENT_BOX), { target: { value: '   ' } })
    fireEvent.click(screen.getByRole('button', SEND_BUTTON))

    await waitFor(() => expect(ratingCalls).toHaveBeenCalledWith({ score: 3 }))
  })

  it.each([
    [409, { error: 'already_rated' }, /ya has valorado/i],
    [409, { error: 'not_confirmed' }, /todavía no se ha confirmado/i],
    [400, { error: 'score es obligatorio y debe ser un entero entre 1 y 5' }, /revisa la puntuación/i],
    [404, { error: 'Exchange not found' }, /no existe o no tienes acceso/i],
    [500, { error: 'internal_error' }, /no se ha podido enviar/i],
  ])('muestra el error cuando el servidor responde %s %j', async (status, body, message) => {
    mockChat(confirmedChat)
    mockRating(body, status)
    renderRatings()

    await screen.findByRole('button', SEND_BUTTON)
    chooseScore(4)
    fireEvent.click(screen.getByRole('button', SEND_BUTTON))

    expect(await screen.findByRole('alert')).toHaveTextContent(message)
  })

  it('al valorar se invalidan el perfil de la otra persona y la bandeja de chats', async () => {
    mockChat(confirmedChat)
    mockRating({ ...confirmedChat, actions: [], myRating: MY_RATING })
    const client = renderRatings()
    client.setQueryData(['profile', confirmedChat.other.id], {})
    client.setQueryData(['chats'], [])

    await screen.findByRole('button', SEND_BUTTON)
    chooseScore(5)
    fireEvent.click(screen.getByRole('button', SEND_BUTTON))

    expect(await screen.findByRole('heading', { name: 'Tu valoración' })).toBeInTheDocument()
    expect(client.getQueryState(['profile', confirmedChat.other.id])?.isInvalidated).toBe(true)
    expect(client.getQueryState(['chats'])?.isInvalidated).toBe(true)
  })

  it('el grupo de puntuación se maneja con el teclado', async () => {
    const user = userEvent.setup()
    mockChat(confirmedChat)
    renderRatings()

    await user.click(await screen.findByRole('radio', { name: '3 de 5' }))
    await user.keyboard('{ArrowRight}')

    expect(screen.getByRole('radio', { name: '4 de 5' })).toBeChecked()
    expect(screen.getByRole('radio', { name: '3 de 5' })).not.toBeChecked()
  })
})