export function validateEmail(email: string): string | null {
  if (!email.trim()) return "Introduce tu correo electrónico"
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Introduce un correo válido"
  return null
}