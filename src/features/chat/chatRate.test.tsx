import { screen } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { describe, it, expect, vi, beforeAll, afterEach, afterAll } from 'vitest'
import { API, EXCHANGE_ID, baseChat } from './test/chatFixtures'
import { renderChat } from './test/renderChat'

vi.mock('../../services/firebase', () => ({ auth: {} }))

const server = setupServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

function mockChat(chat: object) {
  server.use(
    http.get(`${API}/exchanges/${EXCHANGE_ID}`, () => HttpResponse.json(chat)),
    http.get(`${API}/exchanges/${EXCHANGE_ID}/messages`, () => HttpResponse.json([]))
  )
}

describe('Valorar desde el chat', () => {
  it('ofrece valorar a la otra persona cuando la acción rate está disponible', async () => {
    mockChat({ ...baseChat, status: 'confirmed', myConfirmed: true, otherConfirmed: true, actions: ['rate'] })
    renderChat()

    const link = await screen.findByRole('link', { name: /valorar a Lucía/i })
    expect(link).toHaveAttribute('href', `/valorar/${EXCHANGE_ID}`)
  })

  it.each([
    ['accepted', ['cancel', 'confirm'], null],
    ['done', [], null],
    ['rated', [], { score: 4, comment: null }],
  ])('no ofrece valorar cuando el intercambio está en %s', async (status, actions, myRating) => {
    mockChat({ ...baseChat, status, actions, myRating })
    renderChat()

    await screen.findByRole('log')
    expect(screen.queryByRole('link', { name: /valorar a/i })).not.toBeInTheDocument()
  })
})