import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { describe, it, expect, vi, beforeAll, afterEach, afterAll } from 'vitest'
import { API } from '../chat/test/chatFixtures'
import TransactionList from './components/TransactionList'

vi.mock('../../services/firebase', () => ({ auth: {} }))

const welcome = {
  id: 't1', kind: 'welcome', direction: 'in', hours: 2,
  date: '2026-04-20T12:00:00.000Z', exchangeId: null, card: null, other: null,
}
const earned = {
  id: 't2', kind: 'exchange', direction: 'in', hours: 1,
  date: '2026-05-02T12:00:00.000Z', exchangeId: 'ex-1',
  card: { id: 'c1', title: 'Paseo con tu perro', type: 'offer', category: 'compania' },
  other: { id: 'user-b', name: 'Lucía', avatar: '' },
}
const spent = {
  id: 't3', kind: 'exchange', direction: 'out', hours: 2,
  date: '2026-05-10T12:00:00.000Z', exchangeId: 'ex-2',
  card: { id: 'c2', title: 'Arreglo de bici', type: 'offer', category: 'reparaciones' },
  other: { id: 'user-c', name: 'Marc', avatar: '' },
}

const server = setupServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

function mockTransactions(items: object[]) {
  server.use(http.get(`${API}/wallet/transactions`, () => HttpResponse.json({ items })))
}

function renderList() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  render(
    <QueryClientProvider client={client}>
      <TransactionList />
    </QueryClientProvider>
  )
}

describe('Historial de horas', () => {
  it('muestra el regalo de bienvenida como ingreso', async () => {
    mockTransactions([welcome])
    renderList()

    expect(await screen.findByText('Regalo de bienvenida')).toBeInTheDocument()
    expect(screen.getByText('+2 h')).toBeInTheDocument()
    expect(screen.getByText('Ingreso de 2 horas')).toBeInTheDocument()
    expect(screen.getByText(/20 abr/)).toBeInTheDocument()
  })

  it('muestra un intercambio recibido con la tarjeta y la otra persona', async () => {
    mockTransactions([earned])
    renderList()

    expect(await screen.findByText('Paseo con tu perro')).toBeInTheDocument()
    expect(screen.getByText(/con Lucía/)).toBeInTheDocument()
    expect(screen.getByText('+1 h')).toBeInTheDocument()
  })

  it('muestra un intercambio entregado como gasto', async () => {
    mockTransactions([spent])
    renderList()

    expect(await screen.findByText('Arreglo de bici')).toBeInTheDocument()
    expect(screen.getByText('-2 h')).toBeInTheDocument()
    expect(screen.getByText('Gasto de 2 horas')).toBeInTheDocument()
  })

  it('respeta el orden en que llegan (más reciente primero)', async () => {
    mockTransactions([spent, earned, welcome])
    renderList()

    const items = await screen.findAllByRole('listitem')
    expect(items).toHaveLength(3)
    expect(items[0]).toHaveTextContent('Arreglo de bici')
    expect(items[2]).toHaveTextContent('Regalo de bienvenida')
  })

  it('sin movimientos muestra un mensaje vacío', async () => {
    mockTransactions([])
    renderList()

    expect(await screen.findByText('Todavía no tienes movimientos.')).toBeInTheDocument()
  })

  it('muestra el estado de carga', async () => {
    mockTransactions([welcome])
    renderList()

    expect(screen.getByRole('status')).toHaveTextContent(/cargando/i)
    await screen.findByText('Regalo de bienvenida')
  })

  it('muestra un error si el historial no se puede cargar', async () => {
    server.use(http.get(`${API}/wallet/transactions`, () => HttpResponse.json({ error: 'x' }, { status: 500 })))
    renderList()

    expect(await screen.findByRole('alert')).toHaveTextContent(/no se ha podido cargar tu historial/i)
  })
})