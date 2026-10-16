import axios from 'axios'

const ERROR_MESSAGES: Record<string, string> = {
  insufficient_balance: 'No tienes saldo suficiente de horas para proponer este intercambio.',
  already_proposed: 'Ya has enviado una propuesta para esta tarjeta.',
  card_unavailable: 'Esta tarjeta ya no está disponible.',
}

const DEFAULT_MESSAGE = 'No se ha podido enviar la propuesta. Inténtalo de nuevo.'

export function getProposeErrorMessage(error: unknown): string {
  if (!axios.isAxiosError(error)) return DEFAULT_MESSAGE
  const code: unknown = error.response?.data?.error
  return (typeof code === 'string' && ERROR_MESSAGES[code]) || DEFAULT_MESSAGE
}