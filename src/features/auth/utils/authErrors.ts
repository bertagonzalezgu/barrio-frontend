import { FirebaseError } from "firebase/app"

const firebaseErrorMessages: Record<string, string> = {
  "auth/email-already-in-use": "Ya existe una cuenta con este correo",
  "auth/invalid-credential": "El correo o la contraseña no son correctos",
  "auth/too-many-requests": "Demasiados intentos. Espera un momento e inténtalo de nuevo",
  "auth/network-request-failed": "Sin conexión. Comprueba tu red e inténtalo de nuevo",
  "auth/user-disabled": "Esta cuenta ha sido desactivada",
}

export function getAuthErrorMessage(err: unknown): string {
  if (err instanceof FirebaseError) {
    return firebaseErrorMessages[err.code] ?? "Ha ocurrido un error. Inténtalo de nuevo"
  }
  return "Ha ocurrido un error. Inténtalo de nuevo"
}