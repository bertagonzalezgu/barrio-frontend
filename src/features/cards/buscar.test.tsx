import { loadFeature, defineFeature } from 'jest-cucumber'
import { render, screen, fireEvent, renderHook, act } from '@testing-library/react'
import type { RenderHookResult } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { vi, beforeAll, afterEach, afterAll } from 'vitest'
import type { ComponentProps, ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import CreateCardForm from './components/CreateCardForm'
import useCreateCardForm from './hooks/useCreateCardForm'
import type { CardType, CardCategory } from './types/card.types'
import type { CardIconType } from './types/card-icon.types'

const server = setupServer(
  http.post('http://localhost:3001/api/cards', () =>
    HttpResponse.json({ id: '1', status: 'active' }, { status: 201 })
  )
)
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const feature = loadFeature('./docs/buscar.feature')

type FormProps = ComponentProps<typeof CreateCardForm>

function buildDefaults(overrides: Partial<FormProps> = {}): FormProps {
  const defaults: FormProps = {
    type: 'request',
    setType: vi.fn() as (value: CardType) => void,
    category: '',
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
  render(<CreateCardForm {...props} />)
  return props
}

// El hook usa useNavigate y mutaciones de TanStack, así que necesita ambos providers.
function hookWrapper({ children }: { children: ReactNode }) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  })
  return (
    <QueryClientProvider client={client}>
      <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>
  )
}

defineFeature(feature, (test) => {

  test('Publicar una tarjeta de "busco" con éxito', ({ given, and, when, then }) => {
    const onSubmit = vi.fn() as () => void

    given('que he iniciado sesión', () => {})

    and('estoy en la pantalla "Crear tarjeta" en modo "Busco"', () => {
      renderForm({
        type: 'request',
        category: 'petcare',
        title: 'Necesito que alguien riegue mis plantas 5 días',
        description: 'Me voy de viaje y necesito ayuda con las plantas.',
        hours: 2,
        hasSuggestion: true,
        hasGenerated: true,
        onSubmit,
      })
    })

    when('relleno la categoría "Cuidados", la descripción "Necesito que alguien riegue mis plantas 5 días" y las horas estimadas "2h"', () => {})

    and('pulso "Publicar tarjeta"', () => {
      fireEvent.click(screen.getByRole('button', { name: /publicar tarjeta/i }))
    })

    then('la tarjeta se guarda con tipo "busco" y estado "activa"', () => {
      expect(onSubmit).toHaveBeenCalledOnce()
    })

    and('la tarjeta aparece en el feed de Inicio y en el mapa', () => {
      throw new Error('pendiente: implementar en feature/feed + feature/map')
    })
  })

  test('Publicar con fecha de inicio y duración de varios días', ({ given, when, then, and }) => {
    given('que estoy creando una tarjeta de tipo "busco" en la categoría "Cuidados"', () => {
      renderForm({ type: 'request', category: 'petcare' })
    })

    when('indico una fecha de inicio y una duración de 5 días', () => {
      throw new Error('pendiente: implementar en feature/calendar')
    })

    then('la tarjeta se guarda con fecha de inicio y fecha de fin calculada', () => {})

    and('la tarjeta aparece en el calendario ocupando ese rango de fechas', () => {})
  })

  test('No puedo publicar antes de generar la propuesta', ({ given, when, then, and }) => {
    given('que estoy en "Crear tarjeta" en modo "Busco"', () => {
      renderForm({
        type: 'request',
        category: 'petcare',
        prompt: 'me voy de viaje y necesito que rieguen mis plantas',
        hasGenerated: false,
      })
    })

    // No pulsar "Generar con IA" es la condición del escenario: no hay acción
    // que disparar, el estado de partida ya la refleja.
    when('escribo el texto en bruto pero no pulso "Generar con IA"', () => {})

    then('el botón "Publicar tarjeta" está deshabilitado', () => {
      expect(screen.getByRole('button', { name: /publicar tarjeta/i })).toBeDisabled()
    })

    and('veo un aviso de que tengo que generar la propuesta para poder publicar', () => {
      expect(
        screen.getByText(/genera la propuesta con ia para poder publicar/i)
      ).toBeInTheDocument()
    })
  })

  test('Intentar publicar sin categoría', ({ given, when, and, then }) => {
    let hook!: RenderHookResult<ReturnType<typeof useCreateCardForm>, unknown>

    given('que estoy en "Crear tarjeta" en modo "Busco"', () => {
      hook = renderHook(() => useCreateCardForm(), { wrapper: hookWrapper })
    })

    when('dejo el campo de categoría sin seleccionar', () => {
      act(() => {
        hook.result.current.setPrompt('necesito que alguien riegue mis plantas')
      })
      expect(hook.result.current.category).toBe('')
    })

    and('pulso "Generar con IA"', async () => {
      await act(async () => {
        await hook.result.current.onGenerate()
      })
    })

    then('no se genera ninguna propuesta', () => {
      expect(hook.result.current.hasGenerated).toBe(false)
      expect(hook.result.current.title).toBe('')
    })

    and('veo un mensaje indicando que la categoría es obligatoria', () => {
      expect(hook.result.current.errors.category).toBe('La categoría es obligatoria')
    })
  })

  test('Intentar publicar sin descripción', ({ given, when, and, then }) => {
    const onSubmit = vi.fn() as () => void

    given('que he generado una propuesta con IA', () => {
      renderForm({
        type: 'request',
        category: 'petcare',
        title: 'Riego de plantas durante cinco días',
        description: '',
        hasSuggestion: true,
        hasGenerated: true,
        errors: { description: 'La descripción es obligatoria' },
        onSubmit,
      })
    })

    when('borro el texto de la descripción', () => {})

    and('pulso "Publicar tarjeta"', () => {
      fireEvent.click(screen.getByRole('button', { name: /publicar tarjeta/i }))
    })

    then('la tarjeta no se guarda', () => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })

    and('veo un mensaje indicando que la descripción es obligatoria', () => {
      expect(screen.getByText('La descripción es obligatoria')).toBeInTheDocument()
    })
  })

})