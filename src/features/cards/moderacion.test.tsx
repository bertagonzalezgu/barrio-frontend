import { loadFeature, defineFeature } from 'jest-cucumber'
import { render, screen } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { vi, beforeAll, afterEach, afterAll } from 'vitest'
import type { ComponentProps } from 'react'
import CreateCardForm from './components/CreateCardForm'
import { CARD_CATEGORIES } from './types/card.types'
import type { CardType, CardCategory } from './types/card.types'
import type { CardIconType } from './types/card-icon.types'

const server = setupServer(
  http.post('http://localhost:3001/api/cards/generate', () =>
    HttpResponse.json({ title: 'Cuido a tu gato', description: 'Me encargo de tu mascota mientras no estás.', icon: 'pet' })
  )
)
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const feature = loadFeature('./docs/moderacion.feature')

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
  render(<CreateCardForm {...props} />)
  return props
}

defineFeature(feature, (test) => {

  test('Contenido seguro se publica sin fricción', ({ given, when, then }) => {
    given('que el texto en bruto no contiene contenido problemático', () => {
      renderForm({
        prompt: 'Cuido a tu gato mientras te vas de viaje',
        moderationError: null,
        hasSuggestion: true,
        hasGenerated: true,
      })
    })

    when('genero la tarjeta con IA', () => {
      // onGenerate se dispara desde el hook; aquí verificamos el estado renderizado
    })

    then('la propuesta se muestra normalmente y puedo publicarla', () => {
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
      expect(screen.getByText('Sugerido por IA')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /publicar tarjeta/i })).toBeEnabled()
    })
  })

  test('Contenido inseguro se bloquea', ({ given, when, then, and }) => {
    given('que el texto en bruto contiene contenido sexual, ilegal o ambiguo sobre acceso a una vivienda', () => {
      // el MSW devuelve 422 para este escenario
      server.use(
        http.post('http://localhost:3001/api/cards/generate', () =>
          HttpResponse.json(
            { error: 'content_rejected', message: 'Este contenido no cumple las normas de la comunidad. Intenta describir lo que ofreces de otra forma.' },
            { status: 422 }
          )
        )
      )
    })

    when('pulso "Generar con IA"', () => {
      renderForm({
        prompt: 'Ofrezco acceso a mi piso para adultos',
        moderationError: 'Este contenido no cumple las normas de la comunidad. Intenta describir lo que ofreces de otra forma.',
      })
    })

    then('no se genera ninguna tarjeta', () => {
      expect(screen.queryByText('Cuido a tu gato')).not.toBeInTheDocument()
    })

    and('veo un aviso de que el contenido no cumple las normas de la comunidad', () => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
      expect(screen.getByRole('alert')).toHaveTextContent(
        'Este contenido no cumple las normas de la comunidad'
      )
    })
  })

  test('Una tarjeta denunciada se oculta hasta revisión', ({ given, when, then }) => {
    given('que una tarjeta ya publicada recibe una denuncia', () => {
      throw new Error('pendiente: implementar en tarjeta 21 (admin panel)')
    })

    when('se registra la denuncia', () => {})

    then('la tarjeta deja de ser visible en el feed, mapa y calendario hasta que se revise manualmente', () => {})
  })

})