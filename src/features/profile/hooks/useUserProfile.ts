import { useQuery } from '@tanstack/react-query'
import { getPublicProfile } from '../services/profile.service'

export function useUserProfile(userId: string) {
  return useQuery({
    queryKey: ['profile', userId],
    queryFn: () => getPublicProfile(userId),
    enabled: !!userId,
  })
}