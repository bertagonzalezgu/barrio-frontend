export const API = 'http://localhost:3001/api'
export const EXCHANGE_ID = 'exchange-1'

export const baseChat = {
  id: EXCHANGE_ID,
  status: 'accepted',
  hours: 2,
  card: { id: 'card-1', title: 'Ayuda con una mudanza', type: 'request' },
  other: { id: 'user-b', name: 'Lucía', avatar: '' },
  myConfirmed: false,
  otherConfirmed: false,
  actions: ['cancel', 'confirm'],
  myRating: null,
}