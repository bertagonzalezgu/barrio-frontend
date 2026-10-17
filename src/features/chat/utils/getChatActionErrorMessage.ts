import axios from 'axios'

const ERROR_MESSAGES: Record<string, string> = {
  insufficient_balance: 'No hay saldo suficiente de horas para aceptar esta propuesta.',
  card_unavailable: 'Esta tarjeta ya no está disponible.',
}

const UNAVAILABLE_MESSAGE = 'Esta acción ya no está disponible. Hemos actualizado el chat.'
const DEFAULT_MESSAGE = 'No se ha podido completar la acción. Inténtalo de nuevo.'

export function getChatActionErrorMessage(error: unknown): string {
  if (!axios.isAxiosError(error)) return DEFAULT_MESSAGE
  const code: unknown = error.response?.data?.error
  if (typeof code === 'string' && ERROR_MESSAGES[code]) return ERROR_MESSAGES[code]
  return error.response?.status === 409 ? UNAVAILABLE_MESSAGE : DEFAULT_MESSAGE
}