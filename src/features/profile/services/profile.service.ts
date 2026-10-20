import { apiClient } from '../../../services/apiClient'
import type { PublicProfile } from '../types/profile.types'

export async function getPublicProfile(userId: string): Promise<PublicProfile> {
  const response = await apiClient.get(`/api/users/${userId}`)
  return response.data
}

export async function getMyProfile(): Promise<PublicProfile> {
  const response = await apiClient.get('/api/users/me')
  return response.data
}