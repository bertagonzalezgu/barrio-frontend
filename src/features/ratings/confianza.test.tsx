import { loadFeature, defineFeature } from 'jest-cucumber'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { vi, beforeAll, afterEach, afterAll } from 'vitest'
import { API, EXCHANGE_ID, baseChat } from '../chat/test/chatFixtures'
import { confirmedChat, MY_RATING, publicProfile } from './test/ratingFixtures'
import { renderRatings } from './test/renderRatings'

vi.mock('../../services/firebase', () => ({ auth: {} }))

const SEND_BUTTON = { name: 'Enviar valoración' }

const server = setupServer()
const ratingCalls = vi.fn()

let currentChat: object = confirmedChat

beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers()
  ratingCalls.mockClear()
})
afterAll(() => server.close())

function mockChat(chat: object) {
  currentChat = chat
  server.use(
    http.get(`${API}/exchanges/${EXCHANGE_ID}`, () => HttpResponse.json(currentChat)),
    http.get(`${API}/exchanges/${EXCHANGE_ID}/messages`, () => HttpResponse.json([]))
  )
}

function mockConfirm(next: object) {
  server.use(
    http.patch(`${API}/exchanges/${EXCHANGE_ID}/confirm`, () => {
      currentChat = next
      return HttpResponse.json(next)
    })
  )
}

function mockRating(next: object) {
  server.use(
    http.post(`${API}/exchanges/${EXCHANGE_ID}/rating`, async ({ request }) => {
      ratingCalls(await request.json())
      currentChat = next
      return HttpResponse.json(next, { status: 201 })
    })
  )
}

const feature = loadFeature('./docs/confianza.feature')

defineFeature(feature, (test) => {
  test('Valorar tras confirmar un intercambio', ({ given, when, then, and }) => {
    given('que un intercambio ha sido confirmado por ambas partes', () => {
      mockChat({ ...baseChat, status: 'done', otherConfirmed: true, actions: ['confirm'] })
      mockConfirm(confirmedChat)
      mockRating({ ...confirmedChat, actions: [], myRating: { score: 4, comment: 'Muy puntual' } })
    })

    when('pulso "Confirmar intercambio" en el chat', async () => {
      renderRatings(`/chat/${EXCHANGE_ID}`)
      fireEvent.click(await screen.findByRole('button', { name: 'Confirmar intercambio' }))
    })

    then('se me pide valorar a la otra persona con una puntuación y un comentario opcional', async () => {
      fireEvent.click(await screen.findByRole('link', { name: /valorar a Lucía/i }))

      expect(await screen.findByRole('group', { name: 'Puntuación' })).toBeInTheDocument()
      expect(screen.getByRole('textbox', { name: /comentario/i })).toBeInTheDocument()
    })

    and('esa valoración se guarda asociada a su perfil', async () => {
      fireEvent.click(screen.getByRole('radio', { name: '4 de 5' }))
      fireEvent.change(screen.getByRole('textbox', { name: /comentario/i }), {
        target: { value: 'Muy puntual' },
      })
      fireEvent.click(screen.getByRole('button', SEND_BUTTON))

      await waitFor(() => expect(ratingCalls).toHaveBeenCalledWith({ score: 4, comment: 'Muy puntual' }))
      expect(await screen.findByRole('heading', { name: 'Tu valoración' })).toBeInTheDocument()
    })
  })

  test.skip('La valoración es visible en el perfil público', ({ given, when, then }) => {
    given('que he valorado a otra persona tras un intercambio', () => {
      server.use(http.get(`${API}/users/${publicProfile.id}`, () => HttpResponse.json(publicProfile)))
    })

    when('visito el perfil de esa persona', () => {
      renderRatings(`/perfil/${publicProfile.id}`)
    })

    then('veo su valoración media actualizada y el número total de intercambios', async () => {
      expect(await screen.findByText('4.5 de 5')).toBeInTheDocument()
      expect(screen.getByText('7')).toBeInTheDocument()
    })
  })

  test('No se puede valorar un intercambio sin confirmar', ({ given, when, then }) => {
    given('que un intercambio todavía no se ha confirmado por ambas partes', () => {
      mockChat({ ...baseChat, status: 'done', myConfirmed: true, actions: [] })
    })

    when('intento acceder a la pantalla de valoración de ese intercambio', () => {
      renderRatings()
    })

    then('no puedo enviar ninguna valoración', async () => {
      expect(await screen.findByRole('status')).toHaveTextContent(/todavía no se puede valorar/i)
      expect(screen.queryByRole('radio')).not.toBeInTheDocument()
      expect(screen.queryByRole('button', SEND_BUTTON)).not.toBeInTheDocument()
      expect(ratingCalls).not.toHaveBeenCalled()
    })
  })

  test('No se puede valorar dos veces el mismo intercambio', ({ given, when, then }) => {
    given('que ya he valorado un intercambio confirmado', () => {
      mockChat({ ...confirmedChat, actions: [], myRating: MY_RATING })
    })

    when('vuelvo a la pantalla de ese intercambio', () => {
      renderRatings()
    })

    then('no veo la opción de valorar de nuevo, solo la valoración que ya di', async () => {
      expect(await screen.findByRole('heading', { name: 'Tu valoración' })).toBeInTheDocument()
      expect(screen.getByText('5 de 5')).toBeInTheDocument()
      expect(screen.getByText('Todo perfecto')).toBeInTheDocument()
      expect(screen.queryByRole('radio')).not.toBeInTheDocument()
      expect(screen.queryByRole('button', SEND_BUTTON)).not.toBeInTheDocument()
    })
  })
})