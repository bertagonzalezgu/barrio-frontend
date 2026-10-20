const formatter = new Intl.DateTimeFormat('es', { day: 'numeric', month: 'short' })

export function formatTransactionDate(date: string): string {
  return formatter.format(new Date(date))
}