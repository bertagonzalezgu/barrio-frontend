export function formatHours(hours: number): string {
  return `${hours} ${hours === 1 ? 'hora' : 'horas'}`
}