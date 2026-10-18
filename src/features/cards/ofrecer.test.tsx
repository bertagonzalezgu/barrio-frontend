import { loadFeature, defineFeature } from 'jest-cucumber'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { vi, beforeAll, afterEach, afterAll } from 'vitest'
import type { ComponentProps } from 'react'
import CreateCardForm from './components/CreateCardForm'
import HomePage from '../../pages/HomePage'
import { useUserStore } from '../auth/store/userStore'
import { CARD_CATEGORIES } from './types/card.types'
import type { Card, CardType, CardCategory } from './types/card.types'
import type { CardIconType } from './types/card-icon.types'

vi.mock('../../services/firebase', () => ({ auth: {} }))

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({})),
  onAuthStateChanged: (_auth: unknown, cb: (user: unknown) => void) => {
    cb({ getIdToken: () => Promise.resolve('fake-token') })
    return () => {}
  },
}))

vi.mock('./components/CardIcon', () => ({
  default: () => null,
}))

const server = setupServer(
  http.get('http://localhost:3001/api/wallet/balance', () =>
    HttpResponse.json({ balance: 0 })
  ),
  http.get('http://localhost:3001/api/users/me', () =>
    HttpResponse.json({ id: 'u2', name: 'Otro vecino', email: 'otro@barrio.com' })
  )
)
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const feature = loadFeature('./docs/ofrecer.feature')

const MODERATION_MESSAGE =
  'Este contenido no cumple las normas de la comunidad. Intenta describir lo que ofreces de otra forma.'

type FormProps = ComponentProps<typeof CreateCardForm>

function buildDefaults(overrides: Partial<FormProps> = {}): FormProps {
  const defaults: FormProps = {
    type: 'offer',
    setType: vi.fn() as (value: CardType) => void,
    category: CARD_CATEGORIES[0].value,
    setCategory: vi.fn() as (value: CardCategory | '') => void,
    prompt: '',
    setPrompt: vi.fn() as (value: string) => void,
    title: '',
    setTitle: vi.fn() as (value: string) => void,
    description: '',
    setDescription: vi.fn() as (value: string) => void,
    hours: 1,
    setHours: vi.fn() as (value: number) => void,
    icon: '',
    setIcon: vi.fn() as (value: CardIconType | '') => void,
    errors: undefined,
    moderationError: null,
    hasSuggestion: false,
    hasGenerated: false,
    onGenerate: vi.fn() as () => void,
    onSubmit: vi.fn() as () => void,
    isGenerating: false,
    isSubmitting: false,
  }
  return { ...defaults, ...overrides }
}

function renderForm(overrides: Partial<FormProps> = {}) {
  const props = buildDefaults(overrides)
  const { rerender } = render(<CreateCardForm {...props} />)
  return { props, rerender }
}

function renderHomePage(initialEntry = '/') {
  useUserStore.setState({ name: 'otro' })
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={[initialEntry]}>
        <HomePage />
      </MemoryRouter>
    </QueryClientProvider>
  )
}

defineFeature(feature, (test) => {

  test('Publicar una tarjeta de "ofrezco" con éxito', ({ given, and, when, then }) => {
    const onSubmit = vi.fn() as () => void

    given('que he iniciado sesión', () => {})

    and('estoy en la pantalla "Crear tarjeta" en modo "Ofrezco"', () => {
      renderForm({
        type: 'offer',
        category: 'events',
        title: 'Clases de guitarra',
        description: 'Ofrezco clases de guitarra',
        hours: 1,
        hasSuggestion: true,
        hasGenerated: true,
        onSubmit,
      })
      expect(screen.getByRole('button', { name: 'Ofrezco' })).toHaveAttribute('aria-pressed', 'true')
    })

    when('relleno la categoría "Comunidad", la descripción "Ofrezco clases de guitarra" y las horas "1h por sesión"', () => {
      expect(screen.getByLabelText(/^categoría$/i)).toHaveValue('events')
      expect(screen.getByLabelText('Descripción')).toHaveValue('Ofrezco clases de guitarra')
      expect(screen.getByLabelText(/horas estimadas/i)).toHaveValue(1)
    })

    and('pulso "Publicar tarjeta"', () => {
      fireEvent.click(screen.getByRole('button', { name: /publicar tarjeta/i }))
    })

    then('la tarjeta se guarda con tipo "ofrezco" y estado "activa"', () => {
      expect(onSubmit).toHaveBeenCalledOnce()
    })
  })

  test('La tarjeta ofrecida es visible para otros usuarios en modo Buscar', ({ given, when, then }) => {
    const guitarCard: Card = {
      id: '10',
      authorId: 'u1',
      author: { id: 'u1', name: 'Vecina', email: 'v@barrio.com', firebaseUid: 'firebase-uid-1' },
      type: 'offer',
      category: 'events',
      title: 'Clases de guitarra',
      description: 'Ofrezco clases de guitarra',
      hours: 1,
      icon: 'events-guitar',
      lat: null, lng: null, startDate: null, endDate: null,
      status: 'active',
      createdAt: '', updatedAt: '',
    }
    const requestedCategories: (string | null)[] = []

    given('que he publicado una tarjeta de "ofrezco" de clases de guitarra', () => {
      server.use(
        http.get('http://localhost:3001/api/cards', ({ request }) => {
          requestedCategories.push(new URL(request.url).searchParams.get('category'))
          return HttpResponse.json([guitarCard])
        })
      )
    })

    when('otro usuario abre el modo "Buscar" y no tiene ningún filtro de categoría activo', () => {
      renderHomePage('/')
    })

    then('ve mi tarjeta en la vista de tarjetas (swipe) o en la lista, según la vista que tenga seleccionada', async () => {
      // Vista de tarjetas (swipe)
      expect(await screen.findByRole('heading', { name: 'Clases de guitarra' })).toBeInTheDocument()
      expect(requestedCategories.length).toBeGreaterThan(0)
      expect(requestedCategories.every((category) => category === null)).toBe(true)

      // Vista de lista
      fireEvent.click(screen.getByRole('button', { name: /^lista$/i }))
      expect(screen.getByRole('button', { name: /^lista$/i })).toHaveAttribute('aria-pressed', 'true')
      const listItems = await screen.findAllByText('Clases de guitarra')
      expect(listItems.length).toBeGreaterThan(0)
    })
  })

  test('Generar la tarjeta con IA a partir de texto en bruto', ({ given, when, and, then }) => {
    const rawText = 'doy clases de guitarra los martes por la tarde'
    const suggestion = {
      title: 'Clases de guitarra',
      description: 'Clases de guitarra los martes por la tarde.',
      icon: 'events-guitar' as CardIconType,
    }
    const onGenerate = vi.fn() as () => void
    const setTitle = vi.fn() as (value: string) => void
    const setDescription = vi.fn() as (value: string) => void
    let view: ReturnType<typeof renderForm>

    given('que estoy en "Crear tarjeta" en modo "Ofrezco"', () => {
      view = renderForm({ type: 'offer', prompt: rawText, onGenerate })
    })

    when('escribo "doy clases de guitarra los martes por la tarde"', () => {
      expect(screen.getByLabelText(/cuéntalo con tus palabras/i)).toHaveValue(rawText)
    })

    and('pulso "Generar con IA"', () => {
      fireEvent.click(screen.getByRole('button', { name: /generar con ia/i }))
    })

    then('la IA devuelve un título corto, una descripción breve y un icono de la lista cerrada', () => {
      expect(onGenerate).toHaveBeenCalledOnce()

      view.rerender(
        <CreateCardForm
          {...buildDefaults({
            type: 'offer',
            prompt: rawText,
            ...suggestion,
            hasSuggestion: true,
            hasGenerated: true,
            setTitle,
            setDescription,
          })}
        />
      )

      expect(screen.getByText('Sugerido por IA')).toBeInTheDocument()
      expect(screen.getByLabelText('Título')).toHaveValue(suggestion.title)
      expect(screen.getByLabelText('Descripción')).toHaveValue(suggestion.description)
      expect(screen.getByRole('button', { name: /cambiar icono/i })).toBeInTheDocument()
    })

    and('puedo editar la propuesta antes de publicarla', () => {
      fireEvent.change(screen.getByLabelText('Título'), {
        target: { value: 'Clases de guitarra para principiantes' },
      })
      fireEvent.change(screen.getByLabelText('Descripción'), {
        target: { value: 'Martes por la tarde, nivel inicial.' },
      })

      expect(setTitle).toHaveBeenCalledWith('Clases de guitarra para principiantes')
      expect(setDescription).toHaveBeenCalledWith('Martes por la tarde, nivel inicial.')
    })
  })

  test('El contenido generado no pasa la moderación', ({ given, when, then, and }) => {
    const rawText = 'Ofrezco acceso a mi piso para adultos'
    const onGenerate = vi.fn() as () => void
    let view: ReturnType<typeof renderForm>

    given('que estoy en "Crear tarjeta" y he escrito un texto que la clasificación de seguridad marca como no permitido', () => {
      view = renderForm({ type: 'offer', prompt: rawText, onGenerate })
    })

    when('pulso "Generar con IA"', () => {
      fireEvent.click(screen.getByRole('button', { name: /generar con ia/i }))
      expect(onGenerate).toHaveBeenCalledOnce()
    })

    then('no se genera ninguna tarjeta', () => {
      view.rerender(
        <CreateCardForm
          {...buildDefaults({
            type: 'offer',
            prompt: rawText,
            moderationError: MODERATION_MESSAGE,
            hasSuggestion: false,
          })}
        />
      )

      expect(screen.queryByText('Sugerido por IA')).not.toBeInTheDocument()
    })

    and('veo un aviso de que el contenido no se puede publicar', () => {
      expect(screen.getByRole('alert')).toHaveTextContent('Este contenido no cumple las normas de la comunidad')
    })
  })

})