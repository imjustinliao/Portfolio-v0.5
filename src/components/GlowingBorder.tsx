import { useState, useEffect, useRef } from 'react'

const GlowingBorder = () => {
  const [angle, setAngle] = useState(0)
  const [opacity, setOpacity] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)
  const requestRef = useRef<number>(0)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    const animate = (time: number) => {
      if (!containerRef.current) {
        requestRef.current = requestAnimationFrame(animate)
        return
      }

      if (startTimeRef.current === null) startTimeRef.current = time
      const elapsed = time - startTimeRef.current
      const duration = 1400 // Slower duration as requested
      const progress = Math.min(elapsed / duration, 1.1) // Allow it to run slightly past 1 to ensure full overlap

      // Calculate dimensions and perimeter
      const { width, height } = containerRef.current.getBoundingClientRect()
      const R = height / 2
      const S = width - height // Length of straight segment
      const P = 2 * S + 2 * Math.PI * R // Total perimeter

      // Calculate position (x,y) relative to center based on progress
      // Starting from Top-Center (x=0, y=-R) moving Clockwise
      const currentDist = progress * P
      
      let x = 0, y = 0

      // 1. Top Right Straight (0 to S/2)
      if (currentDist <= S / 2) {
        x = currentDist
        y = -R
      } 
      // 2. Right Arc (S/2 to S/2 + PI*R)
      else if (currentDist <= S / 2 + Math.PI * R) {
        const arcDist = currentDist - S / 2
        const theta = -Math.PI / 2 + (arcDist / R)
        x = S / 2 + R * Math.cos(theta)
        y = R * Math.sin(theta)
      } 
      // 3. Bottom Straight (S/2 + PI*R to S/2 + PI*R + S)
      else if (currentDist <= S / 2 + Math.PI * R + S) {
        const lineDist = currentDist - (S / 2 + Math.PI * R)
        x = S / 2 - lineDist
        y = R
      } 
      // 4. Left Arc (S/2 + PI*R + S to S/2 + PI*R + S + PI*R)
      else if (currentDist <= S / 2 + Math.PI * R + S + Math.PI * R) {
        const arcDist = currentDist - (S / 2 + Math.PI * R + S)
        const theta = Math.PI / 2 + (arcDist / R)
        x = -S / 2 + R * Math.cos(theta)
        y = R * Math.sin(theta)
      } 
      // 5. Top Left Straight (Remainder)
      else {
        const lineDist = currentDist - (S / 2 + Math.PI * R + S + Math.PI * R)
        x = -S / 2 + lineDist
        y = -R
      }

      // Convert (x,y) to CSS angle (0deg is Up, CW)
      const angleDeg = (Math.atan2(y, x) * 180 / Math.PI) + 90
      setAngle(angleDeg)
      
      // Fade out logic
      // Fades while running the last part (last 25%)
      let newOpacity = 1
      const fadeStart = 0.75
      
      if (progress > fadeStart) {
         newOpacity = 1 - (progress - fadeStart) / (1 - fadeStart)
      }
      
      if (progress < 1.1) { // Allow it to run slightly past 1 to ensure full overlap
        setOpacity(newOpacity)
        requestRef.current = requestAnimationFrame(animate)
      } else {
        setOpacity(0)
      }
    }

    requestRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(requestRef.current)
  }, [])

  if (opacity <= 0) return null

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 rounded-[inherit] pointer-events-none"
      style={{
        padding: '2px',
        background: `conic-gradient(from ${angle}deg, transparent 180deg, rgba(255,255,255,1) 360deg)`,
        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        maskComposite: 'exclude',
        WebkitMaskComposite: 'xor',
        opacity: opacity,
        zIndex: 10,
        filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.8))'
      }}
    />
  )
}

export default GlowingBorder

