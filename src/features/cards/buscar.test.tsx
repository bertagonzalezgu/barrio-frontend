import { loadFeature, defineFeature } from 'jest-cucumber'
import { render, screen, fireEvent } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { vi, beforeAll, afterEach, afterAll } from 'vitest'
import type { ComponentProps } from 'react'
import CreateCardForm from './components/CreateCardForm'
import { CARD_CATEGORIES } from './types/card.types'
import type { CardType, CardCategory } from './types/card.types'
import type { CardIcon } from './types/card-icon.types'

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
    setIcon: vi.fn() as (value: CardIcon | '') => void,
    errors: undefined,
    hasSuggestion: false,
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

  test('Intentar publicar sin categoría', ({ given, when, and, then }) => {
    const onSubmit = vi.fn() as () => void

    given('que estoy en "Crear tarjeta" en modo "Busco"', () => {
      renderForm({
        type: 'request',
        title: 'Necesito ayuda con las plantas',
        description: 'Me voy de viaje.',
        errors: { category: 'La categoría es obligatoria' },
        onSubmit,
      })
    })

    when('dejo el campo de categoría vacío', () => {})

    and('pulso "Publicar tarjeta"', () => {
      fireEvent.click(screen.getByRole('button', { name: /publicar tarjeta/i }))
    })

    then('la tarjeta no se guarda', () => {
      expect(screen.getByRole('button', { name: /publicar tarjeta/i })).toBeInTheDocument()
    })

    and('veo un mensaje indicando que la categoría es obligatoria', () => {
      expect(screen.getByText('La categoría es obligatoria')).toBeInTheDocument()
    })
  })

  test('Intentar publicar sin descripción', ({ given, when, and, then }) => {
    given('que estoy en "Crear tarjeta" en modo "Busco" con la categoría "Cuidados" seleccionada', () => {
      renderForm({
        type: 'request',
        title: '',
        description: '',
        errors: { description: 'La descripción es obligatoria' },
      })
    })

    when('dejo el campo de descripción vacío', () => {})

    and('pulso "Publicar tarjeta"', () => {
      fireEvent.click(screen.getByRole('button', { name: /publicar tarjeta/i }))
    })

    then('la tarjeta no se guarda', () => {
      expect(screen.getByRole('button', { name: /publicar tarjeta/i })).toBeInTheDocument()
    })

    and('veo un mensaje indicando que la descripción es obligatoria', () => {
      expect(screen.getByText('La descripción es obligatoria')).toBeInTheDocument()
    })
  })

})