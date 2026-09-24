
export function validatePassword(password: string): string | null{

  if(password.length < 8) return "Mínimo 8 caracteres"

  if (!/[0-9]/.test(password)) return "Debe contener al menos un número"

  if (!/[^a-zA-Z0-9]/.test(password)) return "Debe contener al menos un símbolo"

  return null
}