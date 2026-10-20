import { baseChat } from '../../chat/test/chatFixtures'

export const confirmedChat = {
  ...baseChat,
  status: 'confirmed',
  myConfirmed: true,
  otherConfirmed: true,
  actions: ['rate'],
}

export const MY_RATING = { score: 5, comment: 'Todo perfecto' }

export const publicProfile = {
  id: 'user-b',
  name: 'Lucía',
  avatar: '',
  verified: true,
  ratingAverage: 4.5,
  ratingCount: 2,
  exchangeCount: 7,
}