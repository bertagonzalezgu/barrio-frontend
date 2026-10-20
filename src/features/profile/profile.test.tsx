import { screen } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { describe, it, expect, vi, beforeAll, afterEach, afterAll } from 'vitest'
import { API } from '../chat/test/chatFixtures'
import { publicProfile } from '../ratings/test/ratingFixtures'
import { renderRatings } from '../ratings/test/renderRatings'

vi.mock('../../services/firebase', () => ({ auth: {} }))

const server = setupServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

function mockProfile(profile: object) {
  server.use(http.get(`${API}/users/${publicProfile.id}`, () => HttpResponse.json(profile)))
}

describe('Perfil público', () => {
  it('sin valoraciones muestra "Sin valoraciones" y no un 0', async () => {
    mockProfile({ ...publicProfile, ratingAverage: null, ratingCount: 0 })
    renderRatings(`/perfil/${publicProfile.id}`)

    expect(await screen.findByText('Sin valoraciones')).toBeInTheDocument()
    expect(document.body).not.toHaveTextContent('0.0')
  })

  it('no muestra el email aunque la API lo devolviera', async () => {
    mockProfile({ ...publicProfile, email: 'lucia@barrio.local' })
    renderRatings(`/perfil/${publicProfile.id}`)

    await screen.findByRole('heading', { name: 'Lucía' })
    expect(document.body).not.toHaveTextContent('lucia@barrio.local')
  })

  it('muestra el error cuando el perfil no se puede cargar', async () => {
    server.use(http.get(`${API}/users/${publicProfile.id}`, () => HttpResponse.json({ error: 'x' }, { status: 404 })))
    renderRatings(`/perfil/${publicProfile.id}`)

    expect(await screen.findByRole('alert')).toHaveTextContent(/no se ha podido cargar/i)
  })
})