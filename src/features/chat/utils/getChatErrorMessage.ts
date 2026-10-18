import axios from 'axios'

const NOT_FOUND_MESSAGE = 'Este chat no existe o no tienes acceso a él.'
const DEFAULT_MESSAGE = 'No se ha podido cargar el chat. Inténtalo de nuevo.'

export function getChatErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error) && error.response?.status === 404) return NOT_FOUND_MESSAGE
  return DEFAULT_MESSAGE
}