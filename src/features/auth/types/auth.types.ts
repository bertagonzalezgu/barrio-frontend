import type { User } from 'firebase/auth'

export interface AuthContextType {
  currentUser: User | null
  loading: boolean
}