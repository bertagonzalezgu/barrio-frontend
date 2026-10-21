import { isAxiosError } from 'axios'

export function getUpdateProfileErrorMessage(error: unknown): string {
  const status = isAxiosError(error) ? error.response?.status : undefined

  if (status === 422) return 'Ese nombre no está permitido. Prueba con otro.'

  if (status === 500) return 'No hemos podido comprobar el nombre. Inténtalo de nuevo.'

  return 'No se ha podido guardar el cambio.'
}