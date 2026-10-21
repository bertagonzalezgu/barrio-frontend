import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Avatar from './Avatar'
import { avatarImages } from './avatarImages'

describe('Avatar', () => {
  it('pinta la imagen del avatar cuando la clave es conocida', () => {
  expect(avatarImages['avatar-03']).toBeDefined()

  const { container } = render(<Avatar avatar="avatar-03" name="Berta" size="md" />)

  const img = container.querySelector('img')
  expect(img).not.toBeNull()
  expect(img?.getAttribute('src')).toBe(avatarImages['avatar-03'])
  expect(screen.queryByText('B')).not.toBeInTheDocument()
})

  it.each([
    ['vacía', ''],
    ['desconocida', 'avatar-99'],
    ['un emoji antiguo', '🐈'],
  ])('cae a la inicial si la clave es %s', (_caso, avatar) => {
    const { container } = render(<Avatar avatar={avatar} name="Berta" size="md" />)

    expect(container.querySelector('img')).toBeNull()
    expect(screen.getByText('B')).toBeInTheDocument()
  })

  it('cae a la inicial si no hay avatar', () => {
    const { container } = render(<Avatar name="Berta" size="lg" />)

    expect(container.querySelector('img')).toBeNull()
    expect(screen.getByText('B')).toBeInTheDocument()
  })
})