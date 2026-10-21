import { apiClient } from '../../../services/apiClient'
import type { PublicProfile, UpdateProfileInput } from '../types/profile.types'

export async function getPublicProfile(userId: string): Promise<PublicProfile> {
  const response = await apiClient.get(`/api/users/${userId}`)
  return response.data
}

export async function getMyProfile(): Promise<PublicProfile> {
  const response = await apiClient.get('/api/users/me')
  return response.data
}

export async function updateMyProfile(input: UpdateProfileInput): Promise<PublicProfile> {
  const response = await apiClient.patch('/api/users/me', input)
  return response.data
}