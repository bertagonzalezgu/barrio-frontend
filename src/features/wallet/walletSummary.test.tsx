import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { describe, it, expect, vi, beforeAll, afterEach, afterAll } from 'vitest'
import { API } from '../chat/test/chatFixtures'
import WalletSummary from './components/WalletSummary'

vi.mock('../../services/firebase', () => ({ auth: {} }))

const server = setupServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

function mockBalance(balance: object) {
  server.use(http.get(`${API}/wallet/balance`, () => HttpResponse.json(balance)))
}

function renderSummary() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  render(
    <QueryClientProvider client={client}>
      <WalletSummary />
    </QueryClientProvider>
  )
}

describe('Resumen de saldo', () => {
  it('muestra horas disponibles y reservadas, con singular y plural', async () => {
    mockBalance({ balance: 3, reserved: 1, available: 2 })
    renderSummary()

    expect(await screen.findByText('2 horas')).toBeInTheDocument()
    expect(screen.getByText('1 hora')).toBeInTheDocument()
    expect(screen.getByText('Disponible')).toBeInTheDocument()
    expect(screen.getByText('Reservado')).toBeInTheDocument()
  })

  it('con nada reservado muestra 0 horas', async () => {
    mockBalance({ balance: 2, reserved: 0, available: 2 })
    renderSummary()

    expect(await screen.findByText('0 horas')).toBeInTheDocument()
  })

  it('muestra el estado de carga', async () => {
    mockBalance({ balance: 2, reserved: 0, available: 2 })
    renderSummary()

    expect(screen.getByRole('status')).toHaveTextContent(/cargando/i)
    await screen.findByText('Disponible')
  })

  it('muestra un error si el saldo no se puede cargar', async () => {
    server.use(http.get(`${API}/wallet/balance`, () => HttpResponse.json({ error: 'x' }, { status: 500 })))
    renderSummary()

    expect(await screen.findByRole('alert')).toHaveTextContent(/no se ha podido cargar tu saldo/i)
  })
})