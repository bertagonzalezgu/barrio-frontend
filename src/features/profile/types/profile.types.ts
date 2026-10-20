export interface PublicProfile {
  id: string
  name: string
  avatar: string
  verified: boolean
  ratingAverage: number | null
  ratingCount: number
  exchangeCount: number
}