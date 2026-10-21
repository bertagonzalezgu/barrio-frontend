import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useUserStore } from '../../auth/store/userStore'
import { updateMyProfile } from '../services/profile.service'

export function useUpdateProfile() {
  const queryClient = useQueryClient()
  const setName = useUserStore(state => state.setName)

  return useMutation({
    mutationFn: updateMyProfile,
    onSuccess: (profile) => {
      setName(profile.name)
      queryClient.setQueryData(['profile', 'me'], profile)
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      queryClient.invalidateQueries({ queryKey: ['cards'] })
      queryClient.invalidateQueries({ queryKey: ['chats'] })
      queryClient.invalidateQueries({ queryKey: ['chat'] })
    },
  })
}