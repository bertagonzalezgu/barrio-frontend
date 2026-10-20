import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { logout } from '../services/auth.service'
import { useUserStore } from '../store/userStore'

export function useLogout() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const setName = useUserStore(state => state.setName)

  return async () => {
    await logout()
    navigate('/login', { replace: true })
    queryClient.clear()
    setName('')
  }
}