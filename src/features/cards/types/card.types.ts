export type CardType = 'request' | 'offer'

export type CardCategory =
  | 'home-repairs'
  | 'cleaning'
  | 'moving'
  | 'garden'
  | 'peoplecare'
  | 'petcare'
  | 'health-support'
  | 'learning'
  | 'workshops'
  | 'digital'
  | 'cooking'
  | 'transport'
  | 'events'
  | 'sports'
  | 'creative-projects'

export type CardStatus = 'active' | 'completed' | 'reported'

export const CARD_CATEGORIES: { value: CardCategory; label: string }[] = [
  { value: 'home-repairs', label: 'Reparaciones' },
  { value: 'cleaning', label: 'Limpieza' },
  { value: 'moving', label: 'Mudanzas' },
  { value: 'garden', label: 'Jardín' },
  { value: 'peoplecare', label: 'Cuidado de personas' },
  { value: 'petcare', label: 'Animales' },
  { value: 'health-support', label: 'Apoyo sanitario' },
  { value: 'learning', label: 'Aprendizaje' },
  { value: 'workshops', label: 'Talleres' },
  { value: 'digital', label: 'Digital' },
  { value: 'cooking', label: 'Cocina' },
  { value: 'transport', label: 'Transporte' },
  { value: 'events', label: 'Eventos' },
  { value: 'sports', label: 'Deporte' },
  { value: 'creative-projects', label: 'Creatividad' },
]

export interface CardAuthor {
  id: string
  name: string
  email: string
}

export interface Card {
  id: string
  authorId: string
  author: CardAuthor
  type: CardType
  title: string
  description: string
  category: CardCategory
  hours: number
  icon: string
  lat: number | null
  lng: number | null
  startDate: string | null
  endDate: string | null
  status: CardStatus
  createdAt: string
  updatedAt: string
}

export interface CreateCardInput {
  type: CardType
  title: string
  description: string
  category: CardCategory
  hours: number
  icon: string
  lat?: number
  lng?: number
  startDate?: string
  endDate?: string
}

export interface CardFilters {
  category?: CardCategory
  type?: CardType
}

export interface CreateCardFormProps {
  type: CardType
  setType: (value: CardType) => void
  category: CardCategory
  setCategory: (value: CardCategory) => void
  prompt: string
  setPrompt: (value: string) => void
  title: string
  setTitle: (value: string) => void
  description: string
  setDescription: (value: string) => void
  hours: number
  setHours: (value: number) => void
  errors?: {
    category?: string
    description?: string
    hours?: string
  }
  icon: string
  setIcon: (value: string) => void
  onGenerate: () => void
  onSubmit: () => void
  isGenerating: boolean
  isSubmitting: boolean
}