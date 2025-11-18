import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let rafId: number | null = null
    
    const updateMousePosition = (e: MouseEvent) => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
      
      rafId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY })
        setIsVisible(true)
      })
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', updateMousePosition, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', updateMousePosition)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Blurred white lighting effect - largest layer */}
      <div
        className="fixed pointer-events-none z-[5] will-change-transform"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%) translateZ(0)',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 30%, transparent 60%)',
          filter: 'blur(40px)',
          mixBlendMode: 'screen',
          borderRadius: '50%',
        }}
      />

      {/* Cursor center point */}
      <div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          width: '0px',
          height: '0px',
        }}
      >
        {/* Ring 1 - box-shadow based, no borders */}
        <div
          className="absolute will-change-transform"
          style={{
            left: '0',
            top: '0',
            width: '0px',
            height: '0px',
            animation: 'dopplerRing1 3s ease-out infinite',
          }}
        />
        
        {/* Ring 2 - staggered */}
        <div
          className="absolute will-change-transform"
          style={{
            left: '0',
            top: '0',
            width: '0px',
            height: '0px',
            animation: 'dopplerRing2 3s ease-out infinite 0.8s',
          }}
        />

        {/* Ring 3 - staggered */}
        <div
          className="absolute will-change-transform"
          style={{
            left: '0',
            top: '0',
            width: '0px',
            height: '0px',
            animation: 'dopplerRing3 3s ease-out infinite 2s',
          }}
        />

        {/* Central dot */}
        <div
          className="absolute bg-white will-change-transform"
          style={{
            left: '-4px',
            top: '-4px',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            boxShadow: '0 0 12px rgba(255, 255, 255, 0.9), 0 0 24px rgba(255, 255, 255, 0.5)',
          }}
        />
      </div>
    </>
  )
}

