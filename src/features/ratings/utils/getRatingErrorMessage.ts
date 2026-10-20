import axios from 'axios'

const CODE_MESSAGES: Record<string, string> = {
  already_rated: 'Ya has valorado este intercambio.',
  not_confirmed: 'Este intercambio todavía no se ha confirmado.',
}

const STATUS_MESSAGES: Record<number, string> = {
  400: 'Revisa la puntuación y el comentario.',
  404: 'Este intercambio no existe o no tienes acceso.',
}

const DEFAULT_MESSAGE = 'No se ha podido enviar la valoración. Inténtalo de nuevo.'

export function getRatingErrorMessage(error: unknown): string {
  if (!axios.isAxiosError(error)) return DEFAULT_MESSAGE
  const code: unknown = error.response?.data?.error
  if (typeof code === 'string' && CODE_MESSAGES[code]) return CODE_MESSAGES[code]
  const status = error.response?.status
  return (status && STATUS_MESSAGES[status]) || DEFAULT_MESSAGE
}