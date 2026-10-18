export function formatChatTime(isoDate: string, now = new Date()): string {
  const date = new Date(isoDate)

  if (date.toDateString() === now.toDateString()) {
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
  }

  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
}