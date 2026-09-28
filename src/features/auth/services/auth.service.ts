import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../services/firebase'

export async function loginWithEmail(email: string, password: string) {
  await signInWithEmailAndPassword(auth, email, password)
}

export async function registerWithEmail(email: string, password: string, name: string) {
  const result = await createUserWithEmailAndPassword(auth, email, password)
  const token = await result.user.getIdToken()
  await syncUserWithBackend(token, name)
}

async function syncUserWithBackend(token: string, name?: string) {

  const res = await fetch('http://localhost:3001/api/users/me', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name })
  })

if (!res.ok) {
  const data = await res.json()
  throw new Error(data.error ?? 'Error al registrar usuario')
}
  
}

