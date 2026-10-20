import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { describe, it, expect, vi, beforeAll, beforeEach, afterEach, afterAll } from 'vitest'
import { API } from '../chat/test/chatFixtures'
import { publicProfile } from '../ratings/test/ratingFixtures'
import AuthorSummary from './components/AuthorSummary'

vi.mock('../../services/firebase', () => ({ auth: {} }))

const AUTHOR = { id: publicProfile.id, name: publicProfile.name, avatar: '' }

const server = setupServer()
const profileCalls = vi.fn()

beforeAll(() => server.listen())
beforeEach(() => {
  vi.useFakeTimers({ toFake: ['Date'] })
  vi.setSystemTime(new Date('2026-10-20T12:00:00.000Z'))
})
afterEach(() => {
  vi.useRealTimers()
  server.resetHandlers()
  profileCalls.mockClear()
})
afterAll(() => server.close())

function mockProfile(profile: object, status = 200) {
  server.use(
    http.get(`${API}/users/${AUTHOR.id}`, () => {
      profileCalls()
      return HttpResponse.json(profile, { status })
    })
  )
}

function renderSummary() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  render(
    <QueryClientProvider client={client}>
      <MemoryRouter>
        <AuthorSummary author={AUTHOR} />
      </MemoryRouter>
    </QueryClientProvider>
  )
}

describe('Resumen de la autora', () => {
  it('muestra ya el nombre enlazado a su perfil, sin esperar al perfil', async () => {
    mockProfile(publicProfile)
    renderSummary()

    expect(screen.getByRole('link', { name: 'Lucía' })).toHaveAttribute('href', `/perfil/${AUTHOR.id}`)
    await screen.findByText('4.5')
  })

  it('con el perfil cargado muestra insignia, media, intercambios y antigüedad', async () => {
    mockProfile(publicProfile)
    renderSummary()

    expect(await screen.findByText('4.5')).toBeInTheDocument()
    expect(screen.getByText('Identidad verificada')).toBeInTheDocument()
    expect(screen.getByText(/en la plataforma hace 6 meses · 7 intercambios/i)).toBeInTheDocument()
  })

  it('sin valoraciones ni verificación no muestra media ni insignia', async () => {
    mockProfile({ ...publicProfile, ratingAverage: null, ratingCount: 0, verified: false })
    renderSummary()

    expect(await screen.findByText('Sin valoraciones')).toBeInTheDocument()
    expect(screen.queryByText('Identidad verificada')).not.toBeInTheDocument()
  })

  it('con un solo intercambio usa el singular', async () => {
    mockProfile({ ...publicProfile, exchangeCount: 1 })
    renderSummary()

    expect(await screen.findByText(/· 1 intercambio$/)).toBeInTheDocument()
  })

  it('si el perfil falla, la autora sigue visible y no se inventa nada', async () => {
    mockProfile({ error: 'x' }, 404)
    renderSummary()

    await waitFor(() => expect(profileCalls).toHaveBeenCalled())
    expect(screen.getByRole('link', { name: 'Lucía' })).toBeInTheDocument()
    expect(screen.queryByText(/intercambios/)).not.toBeInTheDocument()
  })
})