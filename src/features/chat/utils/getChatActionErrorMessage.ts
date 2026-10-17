import axios from 'axios'

const UNAVAILABLE_MESSAGE = 'Esta acción ya no está disponible. Hemos actualizado el chat.'
const DEFAULT_MESSAGE = 'No se ha podido completar la acción. Inténtalo de nuevo.'

export function getChatActionErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error) && error.response?.status === 409) return UNAVAILABLE_MESSAGE
  return DEFAULT_MESSAGE
}