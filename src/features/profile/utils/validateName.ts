export const NAME_MAX_LENGTH = 80

export function validateName(name: string): string | null {
  const trimmed = name.trim()

  if (trimmed.length === 0) return 'Escribe tu nombre'

  if (trimmed.length > NAME_MAX_LENGTH) return `Máximo ${NAME_MAX_LENGTH} caracteres`

  return null
}