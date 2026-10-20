import { screen, fireEvent } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { describe, it, expect, vi, beforeAll, afterEach, afterAll, beforeEach } from 'vitest'
import { API } from '../chat/test/chatFixtures'
import { publicProfile } from '../ratings/test/ratingFixtures'
import { logout } from '../auth/services/auth.service'
import { useUserStore } from '../auth/store/userStore'
import { renderMyProfile } from './test/renderMyProfile'

vi.mock('../../services/firebase', () => ({ auth: {} }))
vi.mock('../auth/services/auth.service', () => ({
  logout: vi.fn().mockResolvedValue(undefined),
}))

const myProfile = { ...publicProfile, id: 'user-a', name: 'Berta' }

const server = setupServer()

beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers()
  vi.clearAllMocks()
})
afterAll(() => server.close())
beforeEach(() => mockBalance({ balance: 2, reserved: 0, available: 2 }))

function mockMe(profile: object) {
  server.use(http.get(`${API}/users/me`, () => HttpResponse.json(profile)))
}

function mockBalance(balance: object) {
  server.use(http.get(`${API}/wallet/balance`, () => HttpResponse.json(balance)))
}

describe('Mi perfil', () => {
  it('muestra el estado de carga y después mis datos', async () => {
    mockMe(myProfile)
    renderMyProfile()

    expect(screen.getByRole('status')).toHaveTextContent(/cargando/i)
    expect(await screen.findByRole('heading', { name: 'Berta' })).toBeInTheDocument()
    expect(screen.getByText('4.5')).toBeInTheDocument()
    expect(screen.getByText('7 intercambios')).toBeInTheDocument()
    expect(screen.getByText('Identidad verificada')).toBeInTheDocument()
  })

  it('no muestra el chip de verificado si no lo estoy', async () => {
    mockMe({ ...myProfile, verified: false })
    renderMyProfile()

    await screen.findByRole('heading', { name: 'Berta' })
    expect(screen.queryByText('Identidad verificada')).not.toBeInTheDocument()
  })

  it('ante un error de red muestra el error y permite reintentar', async () => {
    server.use(http.get(`${API}/users/me`, () => HttpResponse.json({ error: 'x' }, { status: 500 })))
    renderMyProfile()

    expect(await screen.findByRole('alert')).toHaveTextContent(/no se ha podido cargar tu perfil/i)

    mockMe(myProfile)
    fireEvent.click(screen.getByRole('button', { name: 'Reintentar' }))

    expect(await screen.findByRole('heading', { name: 'Berta' })).toBeInTheDocument()
  })

  it('con 404 avisa de que la cuenta no está registrada', async () => {
    server.use(http.get(`${API}/users/me`, () => HttpResponse.json({ error: 'x' }, { status: 404 })))
    renderMyProfile()

    expect(await screen.findByRole('alert')).toHaveTextContent(/cuenta no está registrada/i)
  })

  it('"Cerrar sesión" cierra sesión, vacía la caché y lleva al login', async () => {
    useUserStore.getState().setName('Berta')
    mockMe(myProfile)
    const client = renderMyProfile()

    await screen.findByRole('heading', { name: 'Berta' })
    fireEvent.click(screen.getByRole('button', { name: 'Cerrar sesión' }))

    expect(await screen.findByText('Pantalla de login')).toBeInTheDocument()
    expect(logout).toHaveBeenCalledOnce()
    expect(client.getQueryData(['profile', 'me'])).toBeUndefined()
    expect(useUserStore.getState().name).toBe('')
  })

  it('muestra mi saldo disponible y reservado', async () => {
  mockMe(myProfile)
  mockBalance({ balance: 3, reserved: 1, available: 2 })
  renderMyProfile()

  expect(await screen.findByText('2 horas')).toBeInTheDocument()
  expect(screen.getByText('1 hora')).toBeInTheDocument()
})
})