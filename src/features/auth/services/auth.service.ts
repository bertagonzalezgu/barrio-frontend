import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../services/firebase'
import { apiClient } from '../../../services/apiClient'

export async function loginWithEmail(email: string, password: string) {
  await signInWithEmailAndPassword(auth, email, password)
}

export async function registerWithEmail(email: string, password: string, name: string) {
  await createUserWithEmailAndPassword(auth, email, password)
  await syncUserWithBackend(name)
}

async function syncUserWithBackend(name?: string) {
    await apiClient.post('/api/users/me', { name })
}

