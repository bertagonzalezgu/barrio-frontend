import { EXCHANGE_ID } from './chatFixtures'

export const baseSummary = {
  id: EXCHANGE_ID,
  status: 'accepted',
  hours: 2,
  proposedAt: '2026-10-17T14:05:24.000Z',
  card: { id: 'card-1', title: 'Ayuda con una mudanza', type: 'request' },
  other: { id: 'user-b', name: 'Lucía', avatar: '' },
  lastMessage: null,
  lastActivityAt: '2026-10-17T14:05:24.000Z',
}