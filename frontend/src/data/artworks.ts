export interface Artwork {
  id: string
  image: string
  title: string
  description: string
  year: string
}

const R2 = 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev'

export const artworks: Artwork[] = Array.from({ length: 49 }, (_, i) => ({
  id: `art-${i + 1}`,
  image: `${R2}/art${i + 1}.JPEG`,
  title: '',
  description: '',
  year: '',
}))

// Fisher-Yates shuffle for randomizing gallery order
export function shuffleArtworks(arr: Artwork[]): Artwork[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}
