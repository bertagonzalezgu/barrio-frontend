export type CardType = 'request' | 'offer'

export type CardCategory = 'home' | 'care' | 'digital' | 'community' | 'learning'

export type CardStatus = 'active' | 'completed' | 'reported'

export interface CardAuthor {
  id: string
  name: string
  email: string
}

export interface CardFilters {
  category?: CardCategory
  type?: CardType
}

export interface Card{
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
    createdAt:string
    updatedAt: string
}

export interface CreateCardInput{
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