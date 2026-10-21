const modules = import.meta.glob('/src/assets/avatars/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

export const avatarImages: Record<string, string> = Object.fromEntries(
  Object.entries(modules).map(([path, url]) => [
    path.split('/').pop()!.replace('.svg', ''),
    url,
  ]),
)

export const avatarKeys = Object.keys(avatarImages).sort()