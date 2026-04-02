import { useState, useEffect, useMemo, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { artworks, shuffleArtworks } from '../data/artworks'
import type { Artwork } from '../data/artworks'

const principles = [
  'Obsession with details.',
  'Imagination.',
  'Boundless expression.',
]

// Quotes for filler tiles (last-row gap fillers)
const fillerQuotes = [
  'Details matter.',
  'Imagine more.',
  'No boundaries.',
  'Still creating...',
  'Art is expression.',
  'Since 2010.',
  'Boundless.',
  'Obsessed.',
  'Stay tuned.',
  'More to come.',
  'In progress.',
]


export default function Arts() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState<'intro' | 'statement' | 'gallery'>('intro')
  const [introStep, setIntroStep] = useState(0)
  const [introPreview, setIntroPreview] = useState(0) // cycles 0,1,2
  const [statementVisible, setStatementVisible] = useState(false)
  const [galleryVisible, setGalleryVisible] = useState(false)
  const [selectedArt, setSelectedArt] = useState<Artwork | null>(null)
  const [showPrinciples, setShowPrinciples] = useState(false)
  const [imageLoaded, setImageLoaded] = useState<Record<string, boolean>>({})

  // Randomize artworks once on mount
  const shuffled = useMemo(() => shuffleArtworks(artworks), [])

  // Pick 3 random preview images for intro
  const previewImages = useMemo(() => {
    const picks = shuffleArtworks(artworks).slice(0, 3)
    return picks.map(a => a.image)
  }, [])

  // Build gallery rows with a repeating pattern:
  // Row A: 4 art tiles + 1 quote filler (each 1/5 width)
  // Row B: 1 featured art (2/5 width) + 2 art tiles + 1 quote filler (each 1/5 width)
  // Each cycle consumes 7 artworks across 2 rows.
  // Quote fillers are sprinkled throughout, not just at the end.
  type GalleryItem =
    | { type: 'art'; art: Artwork; featured: boolean }
    | { type: 'filler'; text: string; rotation: number }

  const galleryRows = useMemo(() => {
    const rows: GalleryItem[][] = []
    let i = 0
    let quoteIdx = 0
    const items = shuffled

    const nextFiller = (): GalleryItem => {
      const f: GalleryItem = {
        type: 'filler',
        text: fillerQuotes[quoteIdx % fillerQuotes.length],
        rotation: 15 + quoteIdx * 17,
      }
      quoteIdx++
      return f
    }

    while (i < items.length) {
      // Row A: 4 art + 1 filler = 5 slots
      const rowA: GalleryItem[] = []
      const artCountA = Math.min(4, items.length - i)
      for (let j = 0; j < artCountA; j++, i++) {
        rowA.push({ type: 'art', art: items[i], featured: false })
      }
      // Insert filler at a varied position
      const fillerPosA = (rows.length % 3) + 1 // position 1, 2, or 3
      rowA.splice(Math.min(fillerPosA, rowA.length), 0, nextFiller())
      // Pad if needed
      while (rowA.length < 5) rowA.push(nextFiller())
      rows.push(rowA)

      if (i >= items.length) break

      // Row B: 1 featured (2x) + 2 art + 1 filler = 4 slots (5 units wide)
      const rowB: GalleryItem[] = []
      rowB.push({ type: 'art', art: items[i], featured: true })
      i++
      const artCountB = Math.min(2, items.length - i)
      for (let j = 0; j < artCountB; j++, i++) {
        rowB.push({ type: 'art', art: items[i], featured: false })
      }
      rowB.push(nextFiller())
      // Pad if needed (featured + 3 normal-width = 4 items)
      while (rowB.length < 4) rowB.push(nextFiller())
      rows.push(rowB)
    }

    return rows
  }, [shuffled])

  // Intro animation sequence
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    // Text steps
    timers.push(setTimeout(() => setIntroStep(1), 1800))
    timers.push(setTimeout(() => setIntroStep(2), 2600))
    timers.push(setTimeout(() => setIntroStep(3), 4400))
    timers.push(setTimeout(() => {
      setPhase('statement')
      setTimeout(() => setStatementVisible(true), 100)
    }, 5200))
    // Preview image cycling: show at step 0, cycle through
    timers.push(setTimeout(() => setIntroPreview(1), 1700))
    timers.push(setTimeout(() => setIntroPreview(2), 3400))
    return () => timers.forEach(clearTimeout)
  }, [])

  // Lock body scroll during intro/statement phases
  useEffect(() => {
    if (phase !== 'gallery') {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [phase])

  const enterGallery = useCallback(() => {
    setPhase('gallery')
    setTimeout(() => setGalleryVisible(true), 100)
  }, [])

  const handleImageLoad = useCallback((id: string) => {
    setImageLoaded(prev => ({ ...prev, [id]: true }))
  }, [])

  // Close lightbox on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedArt(null)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <div className="min-h-screen relative">
      {/* ── MINIMAL NAVBAR ── */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[4vw] h-[clamp(56px,7vh,80px)] backdrop-blur-[8px] before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:via-[rgba(0,0,0,0.15)] before:to-[rgba(255,255,255,0.1)] before:z-0">
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20"></div>
        <Link
          to="/"
          className="relative z-10 text-[clamp(20px,2.5vw,25px)] font-semibold text-white tracking-[0.04em] no-underline drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
        >
          Justin Liao
        </Link>
        <button
          onClick={() => navigate('/about')}
          className="relative z-10 text-[clamp(13px,1.2vw,16px)] text-white/70 hover:text-white font-light tracking-[0.15em] uppercase no-underline transition-all duration-300 bg-transparent border-none flex items-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back
        </button>
      </header>

      {/* ── INTRO PHASE ── */}
      {phase === 'intro' && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          {/* Preview images behind text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {previewImages.map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className={`absolute max-w-[35vw] max-h-[45vh] sm:max-w-[28vw] sm:max-h-[50vh] object-contain transition-all duration-[1200ms] ease-in-out ${
                  introPreview === i
                    ? 'opacity-[0.15] scale-100 blur-0'
                    : 'opacity-0 scale-95 blur-sm'
                }`}
                style={{
                  transform: `translate(${i === 0 ? '-8%, -5%' : i === 1 ? '10%, 3%' : '-3%, 8%'}) scale(${introPreview === i ? 1 : 0.95})`,
                }}
              />
            ))}
          </div>
          <div className="text-center px-6 relative z-10">
            <h1
              className={`text-[clamp(28px,5vw,56px)] font-extralight text-white tracking-[0.08em] transition-all duration-1000 ease-in-out ${
                introStep === 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-20px]'
              }`}
            >
              I'm an artist at heart.
            </h1>
            <p
              className={`text-[clamp(16px,2vw,24px)] font-extralight text-white/70 tracking-[0.05em] transition-all duration-1000 ease-in-out absolute left-1/2 -translate-x-1/2 w-full px-6 ${
                introStep === 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'
              }`}
            >
              A collection of works since childhood.
            </p>
          </div>
        </div>
      )}

      {/* ── STATEMENT PHASE ── */}
      {phase === 'statement' && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div
            className={`max-w-[700px] px-8 md:px-12 transition-all duration-1000 ease-out ${
              statementVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'
            }`}
          >
            <p className="text-[clamp(14px,1.4vw,18px)] font-extralight text-white/80 leading-[1.9] tracking-[0.02em] text-center mb-10">
              I've been doing arts since I was young — sketching, oil painting, crayon drawing, clays, you name it. It's been a long passion of mine that I'd forgotten as I grew older. Some of these won top 3 awards in school, while the Taipei 101 painting was displayed at Taipei City Hall.
            </p>

            <div className="flex flex-col items-center gap-3 mb-10">
              <button
                onClick={() => setShowPrinciples(!showPrinciples)}
                className="text-[clamp(11px,1vw,13px)] uppercase tracking-[0.3em] text-white/40 hover:text-white/70 transition-colors duration-300 bg-transparent border-none font-light"
              >
                {showPrinciples ? '— My 3 principles —' : '+ My 3 principles in arts'}
              </button>
              <div className={`flex flex-col items-center gap-2 overflow-hidden transition-all duration-700 ease-out ${showPrinciples ? 'max-h-[200px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                {principles.map((p, i) => (
                  <span
                    key={i}
                    className="text-[clamp(13px,1.2vw,16px)] font-light text-white/60 tracking-[0.1em] italic"
                    style={{ transitionDelay: `${i * 150}ms` }}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-[clamp(12px,1.1vw,15px)] font-extralight text-white/50 leading-[1.8] tracking-[0.02em] text-center mb-12">
              I'm specifically interested in architectural design. There are many pieces that I'm still organizing, and I'm restarting my arts journey from now on.
            </p>

            <div className="flex justify-center">
              <button
                onClick={enterGallery}
                className="arts-enter-btn group relative px-10 py-3.5 bg-transparent border border-white/20 hover:border-white/50 text-white/70 hover:text-white text-[clamp(12px,1.1vw,15px)] font-light tracking-[0.2em] uppercase transition-all duration-500 overflow-hidden"
              >
                <span className="relative z-10">Enter Gallery</span>
                <div className="absolute inset-0 bg-white/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── GALLERY PHASE ── */}
      <div
        className={`pt-[clamp(80px,10vh,120px)] pb-20 px-[4vw] transition-all duration-1000 ease-out ${
          galleryVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Gallery Header */}
        <div className="max-w-[1400px] mx-auto mb-[clamp(40px,6vh,80px)]">
          <h2 className="text-[clamp(24px,3vw,40px)] font-extralight text-white/90 tracking-[0.1em] mb-3">
            Gallery
          </h2>
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-12 bg-white/20"></div>
            <p className="text-[clamp(11px,0.9vw,14px)] text-white/40 font-light tracking-[0.15em] uppercase">
              {artworks.length} pieces &middot; still creating...
            </p>
          </div>
        </div>

        {/* ── MUSEUM ROWS ──
            Alternating pattern with flexbox rows (no gaps possible):
            Row A: 5 equal tiles
            Row B: 1 featured (2x wide) + 3 equal tiles
            Filler tiles with quotes pad any incomplete rows. */}
        <div className="max-w-[1400px] mx-auto flex flex-col" style={{ gap: 'clamp(3px, 0.4vw, 6px)' }}>
          {galleryRows.map((row, rowIdx) => {
            const hasFeatured = row.some(item => item.type === 'art' && item.featured)
            return (
              <div key={rowIdx} className="flex w-full" style={{ gap: 'clamp(3px, 0.4vw, 6px)' }}>
                {row.map((item, colIdx) => {
                  const globalIdx = rowIdx * 5 + colIdx
                  if (item.type === 'filler') {
                    const isFeaturedSlot = hasFeatured && colIdx === 0
                    return (
                      <div
                        key={`filler-${rowIdx}-${colIdx}`}
                        className="arts-filler arts-tile"
                        style={{
                          flex: isFeaturedSlot ? '2' : '1',
                          animationDelay: `${globalIdx * 35}ms`,
                        }}
                      >
                        <div className={`relative w-full ${isFeaturedSlot ? 'pb-[50%]' : 'pb-[100%]'}`}>
                          <div className="filler-line absolute top-[20%] left-[15%] w-[70%] h-[1px]" style={{ transform: `rotate(${item.rotation}deg)` }}></div>
                          <div className="filler-line absolute top-[50%] left-[10%] w-[80%] h-[1px]" style={{ transform: `rotate(${-item.rotation * 0.6}deg)` }}></div>
                          <div className="filler-line absolute top-[80%] left-[20%] w-[60%] h-[1px]" style={{ transform: `rotate(${item.rotation * 0.3}deg)` }}></div>
                          <div className="absolute inset-0 flex items-center justify-center p-3">
                            <span className="filler-text">{item.text}</span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  const isFeatured = item.featured
                  return (
                    <div
                      key={item.art.id}
                      className="arts-tile group relative overflow-hidden cursor-pointer"
                      style={{
                        flex: isFeatured ? '2' : '1',
                        animationDelay: `${globalIdx * 35}ms`,
                      }}
                      onClick={() => setSelectedArt(item.art)}
                    >
                      <div className={`relative w-full overflow-hidden bg-white/[0.02] ${isFeatured ? 'pb-[50%]' : 'pb-[100%]'}`}>
                        {!imageLoaded[item.art.id] && (
                          <div className="absolute inset-0 bg-white/[0.03] animate-pulse"></div>
                        )}
                        <img
                          src={item.art.image}
                          alt={item.art.title || 'Artwork'}
                          loading="lazy"
                          onLoad={() => handleImageLoad(item.art.id)}
                          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.06] group-hover:brightness-110 ${
                            imageLoaded[item.art.id] ? 'opacity-100' : 'opacity-0'
                          }`}
                        />
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)' }}></div>
                        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t border-l border-white/30"></div>
                          <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t border-r border-white/30"></div>
                          <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b border-l border-white/30"></div>
                          <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b border-r border-white/30"></div>
                        </div>
                        <div className="absolute inset-0 flex items-end justify-center pb-3 pointer-events-none opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                          <span className="text-[10px] tracking-[0.3em] uppercase text-white/60 font-light drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">View</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>

        {/* Still creating footer */}
        <div className="max-w-[1400px] mx-auto mt-[clamp(60px,8vh,100px)] flex flex-col items-center gap-3 pb-10">
          <div className="h-[1px] w-16 bg-white/10 mb-4"></div>
          <p className="text-[clamp(11px,0.9vw,14px)] text-white/30 font-light tracking-[0.2em] uppercase">
            Stay tuned for more updates
          </p>
          <p className="text-[clamp(10px,0.8vw,12px)] text-white/20 font-light tracking-[0.1em]">
            Many pieces are still being organized.
          </p>
        </div>
      </div>

      {/* ── LIGHTBOX — full artwork reveal ── */}
      {selectedArt && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center"
          onClick={() => setSelectedArt(null)}
        >
          {/* Dark backdrop — appears instantly */}
          <div className="absolute inset-0 bg-black/92 backdrop-blur-lg arts-lightbox-bg"></div>

          {/* Close */}
          <button
            className="absolute top-6 right-6 z-20 text-white/40 hover:text-white text-2xl bg-transparent border-none transition-colors duration-300"
            onClick={() => setSelectedArt(null)}
            aria-label="Close"
          >
            &times;
          </button>

          {/* Navigation hint */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
            <span className="text-[11px] tracking-[0.25em] uppercase text-white/25 font-light">Click anywhere to close</span>
          </div>

          {/* Artwork frame — animates in after backdrop */}
          <div
            className="relative z-10 flex items-center justify-center"
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: '88vw', maxHeight: '82vh' }}
          >
            <img
              src={selectedArt.image}
              alt={selectedArt.title || 'Artwork'}
              className="arts-lightbox-img max-w-[88vw] max-h-[82vh] object-contain"
            />
            <div className="absolute inset-0 border border-white/[0.06] pointer-events-none"></div>
          </div>
        </div>
      )}
    </div>
  )
}
