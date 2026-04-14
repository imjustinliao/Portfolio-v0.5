export interface Artwork {
  id: string
  image: string
  title: string
  description: string
  year: string
}

const R2 = 'https://pub-1fa58c73c1d64a9d90e1268507133a6e.r2.dev'

/** R2 objects use mixed extensions per file. */
function artImageUrl(n: number): string {
  if (n >= 1 && n <= 49) return `${R2}/art${n}.JPEG`
  if (n === 50 || n === 51) return `${R2}/art${n}.jpg`
  if (n >= 52 && n <= 62) return `${R2}/art${n}.jpeg`
  if (n >= 63 && n <= 71) return `${R2}/art${n}.JPG`
  throw new Error(`No art asset configured for art ${n}`)
}

export const artworks: Artwork[] = Array.from({ length: 71 }, (_, i) => {
  const n = i + 1
  return {
    id: `art-${n}`,
    image: artImageUrl(n),
    title: '',
    description: '',
    year: '',
  }
})

// Fisher-Yates shuffle for randomizing gallery order
export function shuffleArtworks(arr: Artwork[]): Artwork[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}
