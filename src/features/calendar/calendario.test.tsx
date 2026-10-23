import '@testing-library/jest-dom/vitest'
import { expect, vi, beforeAll, beforeEach, afterAll, afterEach } from 'vitest'
import { render, screen, fireEvent, within, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { loadFeature, defineFeature } from 'jest-cucumber'
import { format } from 'date-fns'
import path from 'path'
import { fileURLToPath } from 'url'

import CalendarPage from './pages/CalendarPage'
import type { CalendarCard } from './types/calendar.types'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

vi.mock('../../services/firebase', () => ({ auth: {} }))

// Siempre dentro del mes actual: el calendario abre en el mes de hoy.
const month = format(new Date(), 'yyyy-MM')
const day = (n: number) => `${month}-${String(n).padStart(2, '0')}`
const today = format(new Date(), 'yyyy-MM-dd')

function makeCard(overrides: Partial<CalendarCard> & Pick<CalendarCard, 'id' | 'title'>, date: string): CalendarCard {
  return {
    authorId: 'u1',
    author: { id: 'u1', name: 'Ana', avatar: 'avatar-01' },
    isMine: false,
    type: 'offer',
    description: 'Descripción',
    category: 'garden',
    hours: 1,
    icon: '',
    startDate: `${date}T00:00:00.000Z`,
    endDate: `${date}T00:00:00.000Z`,
    status: 'active',
    createdAt: `${date}T08:00:00.000Z`,
    updatedAt: `${date}T08:00:00.000Z`,
    ...overrides,
  }
}

const repairsRequest = makeCard({ id: '1', title: 'Arreglar un grifo', type: 'request', category: 'home-repairs' }, day(10))
const gardenOffer = makeCard({ id: '2', title: 'Riego tus plantas', type: 'offer', category: 'garden' }, day(12))
const digitalOffer = makeCard({ id: '3', title: 'Ayuda con el móvil', type: 'offer', category: 'digital' }, day(12))

let calendarCards: CalendarCard[] = []
let postedBody: Record<string, unknown> | null = null

const server = setupServer(
  http.get('http://localhost:3001/api/cards/calendar', ({ request }) => {
    const category = new URL(request.url).searchParams.get('category')
    const filtered = category
      ? calendarCards.filter(c => c.category.replace(/-/g, '_') === category)
      : calendarCards
    return HttpResponse.json(filtered)
  }),
  http.post('http://localhost:3001/api/cards', async ({ request }) => {
    postedBody = (await request.json()) as Record<string, unknown>
    const created = makeCard(
      {
        id: 'new-1',
        title: String(postedBody.title),
        type: 'offer',
        category: 'garden',
        isMine: true,
      },
      String(postedBody.startDate),
    )
    calendarCards = [...calendarCards, created]
    return HttpResponse.json(created, { status: 201 })
  }),
)

beforeAll(() => server.listen())
beforeEach(() => {
  calendarCards = []
  postedBody = null
})
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

function renderCalendarPage(initialEntry = '/calendario') {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={[initialEntry]}>
        <Routes>
          <Route path="/calendario" element={<CalendarPage />} />
          <Route path="/cards/:id" element={<p>Detalle</p>} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  )
}

function dayCell(date: string) {
  return screen.getByTestId(`day-${date}`)
}

// Copia del helper de mapa.test.tsx. Pendiente: moverlo a un archivo compartido de test.
async function openModalAndSelect(label: string | RegExp) {
  fireEvent.click(screen.getByRole('button', { name: /filtrar por categoría/i }))
  const heading = await screen.findByRole('heading', { name: /filtrar por categoría/i })
  const modalContent = heading.parentElement!.parentElement!
  fireEvent.click(within(modalContent).getByRole('button', { name: label }))
}

const feature = loadFeature(path.resolve(__dirname, '../../../docs/calendario.feature'))

defineFeature(feature, (test) => {
  test('Ver los días marcados según busco/ofrezco', ({ given, when, then }) => {
    given('que existen tarjetas con fechas asociadas', () => {
      calendarCards = [repairsRequest, gardenOffer]
    })

    when('abro la pantalla "Calendario"', () => {
      renderCalendarPage()
    })

    then('los días con una tarjeta de tipo "busco" muestran un indicador distinto al de "ofrezco"', async () => {
      expect(await within(dayCell(day(10))).findByRole('img', { name: 'Busco' })).toBeInTheDocument()
      expect(within(dayCell(day(10))).queryByRole('img', { name: 'Ofrezco' })).not.toBeInTheDocument()

      expect(within(dayCell(day(12))).getByRole('img', { name: 'Ofrezco' })).toBeInTheDocument()
      expect(within(dayCell(day(12))).queryByRole('img', { name: 'Busco' })).not.toBeInTheDocument()
    })
  })

  test('Añadir disponibilidad desde el calendario', ({ given, when, then, and }) => {
    given('que estoy en la pantalla "Calendario"', async () => {
      renderCalendarPage()
      expect(await screen.findByRole('button', { name: /añadir disponibilidad/i })).toBeInTheDocument()
    })

    when('pulso "Añadir disponibilidad" y relleno categoría, horas y fecha', async () => {
      fireEvent.click(screen.getByRole('button', { name: /añadir disponibilidad/i }))
      fireEvent.change(await screen.findByLabelText('Categoría'), { target: { value: 'garden' } })
      fireEvent.change(screen.getByLabelText(/horas/i), { target: { value: '2' } })
      fireEvent.change(screen.getByLabelText(/fecha/i), { target: { value: today } })
      fireEvent.click(screen.getByRole('button', { name: /guardar/i }))
    })

    then('se crea una tarjeta de tipo "ofrezco" con esa fecha', async () => {
      await waitFor(() => expect(postedBody).not.toBeNull())
      expect(postedBody).toMatchObject({
        type: 'offer',
        category: 'garden',
        hours: 2,
        startDate: today,
        durationDays: 1,
      })
      expect(postedBody).not.toHaveProperty('icon')
    })

    and('el día correspondiente queda marcado en el calendario', async () => {
      expect(await within(dayCell(today)).findByRole('img', { name: 'Ofrezco' })).toBeInTheDocument()
    })
  })

  test('Filtrar el calendario por categoría', ({ given, when, then }) => {
    given('que existen tarjetas de varias categorías con fecha', async () => {
      calendarCards = [repairsRequest, gardenOffer]
      renderCalendarPage()
      expect(await within(dayCell(day(12))).findByRole('img', { name: 'Ofrezco' })).toBeInTheDocument()
    })

    when('filtro el calendario por la categoría "Reparaciones"', async () => {
      await openModalAndSelect(/^reparaciones$/i)
    })

    then('solo se marcan los días con tarjetas de esa categoría', async () => {
      expect(await within(dayCell(day(10))).findByRole('img', { name: 'Busco' })).toBeInTheDocument()
      await waitFor(() =>
        expect(within(dayCell(day(12))).queryByRole('img', { name: 'Ofrezco' })).not.toBeInTheDocument()
      )
    })
  })

  test('Seleccionar un día muestra sus tarjetas', ({ given, when, then }) => {
    given('que un día del calendario tiene una o más tarjetas asociadas', async () => {
      calendarCards = [gardenOffer, digitalOffer, repairsRequest]
      renderCalendarPage()
      expect(await within(dayCell(day(12))).findByRole('img', { name: 'Ofrezco' })).toBeInTheDocument()
    })

    when('pulso sobre ese día', () => {
      fireEvent.click(within(dayCell(day(12))).getByRole('button'))
    })

    then('veo el listado de tarjetas de esa fecha', async () => {
      expect(await screen.findByText(gardenOffer.title)).toBeInTheDocument()
      expect(screen.getByText(digitalOffer.title)).toBeInTheDocument()
      expect(screen.queryByText(repairsRequest.title)).not.toBeInTheDocument()
    })
  })
})