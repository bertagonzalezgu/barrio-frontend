import '@testing-library/jest-dom/vitest'
import { expect, vi, beforeAll, afterAll, afterEach } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { loadFeature, defineFeature } from 'jest-cucumber'
import path from 'path'
import { fileURLToPath } from 'url'

import HomePage from './HomePage'
import { useUserStore } from '../features/auth/store/userStore'
import type { Card } from '../features/cards/types/card.types'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

vi.mock('../services/firebase', () => ({ auth: {} }))

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({})),
  onAuthStateChanged: (_auth: unknown, cb: (user: unknown) => void) => {
    cb({ getIdToken: () => Promise.resolve('fake-token') })
    return () => {}
  },
}))

vi.mock('../features/cards/components/CardIcon', () => ({
  default: () => null,
}))

const mockAuthor = {
  id: 'u1',
  name: 'Vecina',
  email: 'v@barrio.com',
  firebaseUid: 'firebase-uid-1',
}

const mockCards: Card[] = [
  {
    id: '1', authorId: 'u1', author: mockAuthor,
    type: 'offer', category: 'peoplecare',
    title: 'Cuido personas mayores', description: '',
    hours: 1, icon: 'cleaning-broom',
    lat: null, lng: null, startDate: null, endDate: null,
    status: 'active', createdAt: '', updatedAt: '',
  },
  {
    id: '2', authorId: 'u1', author: mockAuthor,
    type: 'offer', category: 'home-repairs',
    title: 'Arreglo grifos', description: '',
    hours: 2, icon: 'digital-pc',
    lat: null, lng: null, startDate: null, endDate: null,
    status: 'active', createdAt: '', updatedAt: '',
  },
  {
    id: '3', authorId: 'u2', author: mockAuthor,
    type: 'request', category: 'digital',
    title: 'Necesito web', description: '',
    hours: 3, icon: 'digital-camera',
    lat: null, lng: null, startDate: null, endDate: null,
    status: 'active', createdAt: '', updatedAt: '',
  },
]

const server = setupServer(
  http.get('http://localhost:3001/api/wallet/balance', () => {
    return HttpResponse.json({ balance: 0 })
  }),
  http.get('http://localhost:3001/api/users/me', () => {
    return HttpResponse.json({ id: 'u1', name: 'Test', email: 'test@barrio.com' })
  }),
  http.get('http://localhost:3001/api/cards', ({ request }) => {
    const url = new URL(request.url)
    const category = url.searchParams.get('category')
    const filtered = category
      ? mockCards.filter(c => c.category.replace(/-/g, '_') === category)
      : mockCards
    return HttpResponse.json(filtered)
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

function renderHomePage(initialEntry = '/') {
  useUserStore.setState({ name: 'test' })
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={[initialEntry]}>
        <HomePage />
      </MemoryRouter>
    </QueryClientProvider>
  )
}

async function openModalAndSelect(label: string | RegExp) {
  fireEvent.click(screen.getByRole('button', { name: /filtrar por categoría/i }))
  const heading = await screen.findByRole('heading', { name: /filtrar por categoría/i })
  const modalContent = heading.parentElement!.parentElement!
  fireEvent.click(within(modalContent).getByRole('button', { name: label }))
}

const feature = loadFeature(path.resolve(__dirname, '../../docs/categorias.feature'))

defineFeature(feature, (test) => {
  test('Filtrar el feed por una categoría', ({ given, when, then }) => {
    given('que estoy en el modo "Buscar" con la categoría "Todas" seleccionada', () => {
      renderHomePage('/?vista=list')
    })

    when('selecciono la categoría "Cuidados"', async () => {
      await openModalAndSelect(/cuidado de personas/i)
    })

    then('la vista muestra solo tarjetas de la categoría "Cuidados"', async () => {
      const [el] = await screen.findAllByText('Cuido personas mayores')
      expect(el).toBeInTheDocument()
      expect(screen.queryByText('Arreglo grifos')).not.toBeInTheDocument()
      expect(screen.queryByText('Necesito web')).not.toBeInTheDocument()
    })
  })

  test('El filtro se mantiene al cambiar entre la vista de tarjetas y la de lista', ({ given, when, then }) => {
    given('que he filtrado por la categoría "Hogar" en la vista de tarjetas (swipe)', () => {
      renderHomePage('/?categoria=home-repairs')
    })

    when('cambio a la vista de "Lista"', async () => {
      fireEvent.click(await screen.findByRole('button', { name: /^lista$/i }))
    })

    then('la lista muestra también solo tarjetas de la categoría "Hogar"', async () => {
      const [el] = await screen.findAllByText('Arreglo grifos')
      expect(el).toBeInTheDocument()
      expect(screen.queryByText('Cuido personas mayores')).not.toBeInTheDocument()
      expect(screen.queryByText('Necesito web')).not.toBeInTheDocument()
    })
  })

  test('Quitar el filtro volviendo a "Todas"', ({ given, when, then }) => {
    given('que tengo activo el filtro de categoría "Digital"', () => {
      renderHomePage('/?categoria=digital&vista=list')
    })

    when('selecciono el chip "Todas"', async () => {
      await openModalAndSelect(/^todas$/i)
    })

    then('vuelvo a ver tarjetas de todas las categorías', async () => {
      const [el1] = await screen.findAllByText('Cuido personas mayores')
      const [el2] = await screen.findAllByText('Arreglo grifos')
      const [el3] = await screen.findAllByText('Necesito web')
      expect(el1).toBeInTheDocument()
      expect(el2).toBeInTheDocument()
      expect(el3).toBeInTheDocument()
    })
  })

  test('No hay resultados para una categoría', ({ given, when, then }) => {
    given('que no existe ninguna tarjeta activa en la categoría "Comunidad"', () => {
      server.use(
        http.get('http://localhost:3001/api/cards', ({ request }) => {
          const category = new URL(request.url).searchParams.get('category')
          if (category === 'events') return HttpResponse.json([])
          return HttpResponse.json(mockCards)
        })
      )
      renderHomePage('/?vista=list')
    })

    when('selecciono la categoría "Comunidad"', async () => {
      await openModalAndSelect(/^eventos$/i)
    })

    then('veo un mensaje indicando que no hay resultados en esa categoría', async () => {
      expect(await screen.findByText(/no hay tarjetas/i)).toBeInTheDocument()
    })
  })
})