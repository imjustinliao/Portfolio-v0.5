import { useState, useEffect, useRef } from 'react'
import GlowingBorder from './GlowingBorder'

// Placeholder tracks - user will upload files to /audio/
const tracks = [
  '/audio/super.mp3',
  '/audio/memories.mp3',
  '/audio/line.mp3',
  '/audio/nights.mp3',
  '/audio/softcore.mp3',
  '/audio/eyes.mp3',
]

// Custom CSS for the waveform animation
// Animates scaleY from 1 to -1 and back to create a full flipping/wave motion
const styles = `
  @keyframes waveform-beat {
    0% { transform: scaleY(1); }
    50% { transform: scaleY(-1); }
    100% { transform: scaleY(1); }
  }
  .animate-waveform {
    transform-origin: center;
    animation: waveform-beat 1.2s ease-in-out infinite;
  }
`

// Inline SVG Icons
// Mute Icon: Simple crossed out or flat line representation could be used, 
// but sticking to the previous "Sound Off" style or a simple flat line if preferred.
// Using the previous MuteIcon for consistency as "Sound Off".
const MuteIcon = ({ className }: { className?: string }) => (
  <svg viewBox="5 5 49 49" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M45 30.8462C45 30.8462 43.6441 30.8462 41.573 30.8462C39.5019 30.8462 40.3898 29.6667 38.7507 29.6923C37.1116 29.7179 36.5932 32 35.7269 32C34.8605 32 31.9927 27 29.276 27C26.5593 27 23.8475 32 22.2203 32C20.3526 32 18.7542 30 16.8864 30H13" stroke="white" strokeWidth="3" strokeMiterlimit="3.99393" strokeLinecap="round"/>
  </svg>
)

// Unmute Icon (Heartbeat Waveform)
// Path mimics the provided image: Flat -> Dip -> High Peak -> Deep Dip -> Small Peak -> Flat
const UnmuteIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* 
      Path breakdown:
      M 5 25: Start left middle
      L 12 25: Flat line
      Q 15 25 17 28: Curve down slightly
      L 20 35: Dip down
      L 25 5: Shoot up to high peak
      L 30 45: Shoot down to deep dip
      L 35 20: Shoot up to mid peak
      Q 38 25 40 25: Curve to flat
      L 45 25: End flat right
    */}
    <path 
      className="animate-waveform" 
      d="M5 25 L12 25 L16 32 L22 10 L28 40 L34 20 L38 25 L45 25" 
      stroke="white" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
)

export default function Footer() {
  const [isMuted, setIsMuted] = useState(false) // Default to Unmuted (Sound On state)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const isAttemptingPlayRef = useRef(false)

  // Initialize random track on mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * tracks.length)
    setCurrentTrackIndex(randomIndex)
  }, [])

  // Handle interaction to start audio
  useEffect(() => {
    const startAudio = async () => {
      if (audioRef.current && !isAttemptingPlayRef.current) {
        if (!audioRef.current.paused) {
          cleanupListeners()
          return
        }

        isAttemptingPlayRef.current = true
        
        try {
          await audioRef.current.play()
          cleanupListeners()
        } catch (e) {
          console.log('Autoplay prevented, waiting for valid user interaction:', e)
        } finally {
          isAttemptingPlayRef.current = false
        }
      }
    }

    const events = ['click', 'scroll', 'touchstart', 'keydown', 'mousemove', 'mousedown', 'pointerdown']
    
    const cleanupListeners = () => {
        events.forEach(event => window.removeEventListener(event, startAudio))
    }

    events.forEach(event => window.addEventListener(event, startAudio))

    return cleanupListeners
  }, [])

  // Handle track ending -> play next
  const handleTrackEnd = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length)
  }

  // Handle mute toggle
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted
      setIsMuted(audioRef.current.muted)
      if (!audioRef.current.muted) {
        audioRef.current.play().catch((e) => console.log('Playback failed:', e))
      }
    }
  }

  // Frosted Liquid Glass Style
  // Based on: Frost 10, Light -45deg 80%, Refraction 80, Depth 82
  // Interpreted as: Blur 10px, Gradient 135deg (top-left to bottom-right), High transparency/Refraction
  const glassStyle = "border border-[rgba(255,255,255,0.3)] bg-gradient-to-br from-[rgba(255,255,255,0.2)] to-[rgba(255,255,255,0.05)] backdrop-blur-[10px] shadow-[0_4px_30px_rgba(0,0,0,0.1)]"

  return (
    <>
      <style>{styles}</style>
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={tracks[currentTrackIndex]}
        onEnded={handleTrackEnd}
        muted={isMuted}
        autoPlay={!isMuted}
        playsInline
      />

      {/* Desktop Footer */}
      <footer className="fixed bottom-8 left-0 w-full px-[3vw] flex items-end justify-between z-50 pointer-events-none max-xl:hidden font-['Arimo',_sans-serif]">
        
        {/* Left: Let's Connect (Expandable) */}
        <div 
          className={`relative pointer-events-auto h-[50px] flex items-center overflow-hidden transition-all duration-300 ease-out rounded-full ${glassStyle}`}
          style={{ width: isHovered ? '385px' : '160px' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <GlowingBorder />
          <div className="flex items-center w-full px-6 whitespace-nowrap">
            <span className="text-white text-[18px] font-thin flex-shrink-0">Let's connect</span>
            
            {/* Social Icons (Visible on Hover) */}
            <div className={`flex items-center ml-[21px] gap-[50px] transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              <a href="mailto:justinliao3234@gmail.com" className="text-white hover:text-[#d9d9d9] transition-colors text-[18px] font-thin">@</a>
              <a href="https://x.com/imjustinliao" target="_blank" rel="noreferrer" className="text-white hover:text-[#d9d9d9] transition-colors text-[18px] font-thin">X</a>
              <a href="https://www.linkedin.com/in/justin-liao23/" target="_blank" rel="noreferrer" className="text-white hover:text-[#d9d9d9] transition-colors text-[18px] font-thin">L</a>
              <a href="https://www.instagram.com/imjustinliao/" target="_blank" rel="noreferrer" className="text-white hover:text-[#d9d9d9] transition-colors text-[18px] font-thin">I</a>
            </div>
          </div>
        </div>

        {/* Center: Copyright */}
        <div className={`absolute left-1/2 -translate-x-1/2 bottom-0 pointer-events-auto px-6 h-[50px] flex items-center justify-center rounded-full ${glassStyle}`}>
          <GlowingBorder />
          <span className="text-white text-[18px] font-thin">© Justin Liao 2025</span>
        </div>

        {/* Right: Audio Toggle (Liquid Glass Circle) */}
        <button
          onClick={toggleMute}
          className={`pointer-events-auto w-[50px] h-[50px] flex items-center justify-center rounded-full hover:bg-[rgba(255,255,255,0.15)] transition-colors relative ${glassStyle}`}
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          <GlowingBorder />
          {/* Mute Icon */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ease-out ${isMuted ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
            <MuteIcon className="w-8 h-8" />
          </div>
          {/* Unmute Icon */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ease-out ${!isMuted ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
            <UnmuteIcon className="w-8 h-8" />
          </div>
        </button>

      </footer>

      {/* Mobile Footer (Bottom Right Expandable Pill) */}
      <div className="fixed bottom-4 right-[3vw] z-50 xl:hidden flex flex-col items-end justify-end font-['Arimo',_sans-serif]">
        <div
            className={`
                relative overflow-hidden transition-all duration-300 ease-out
                flex flex-col items-center py-[11px]
                ${glassStyle}
                ${isMobileMenuOpen ? 'h-[400px] rounded-[35px] w-[50px] justify-between' : 'h-[50px] w-[50px] rounded-full justify-center'}
            `}
        >
            <GlowingBorder />
            {/* Audio Toggle (Hidden when closed) */}
            <button 
              onClick={toggleMute} 
              className={`hover:opacity-80 transition-opacity shrink-0 relative w-12 h-12 ${isMobileMenuOpen ? 'block' : 'hidden'}`}
            >
                {/* Mute Icon */}
                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ease-out ${isMuted ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                    <MuteIcon className="w-10 h-10" />
                </div>
                {/* Unmute Icon */}
                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ease-out ${!isMuted ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                    <UnmuteIcon className="w-10 h-10" />
                </div>
            </button>

            {/* Upper Divider (Hidden when closed) */}
            <div className={`w-1/2 h-[1px] bg-[#C9C9C9] shrink-0 ${isMobileMenuOpen ? 'block' : 'hidden'}`} />

            {/* Socials (Hidden when closed) */}
            <a href="https://www.instagram.com/imjustinliao/" target="_blank" rel="noreferrer" className={`text-white hover:text-[#d9d9d9] transition-colors text-[20px] font-thin ${isMobileMenuOpen ? 'block' : 'hidden'}`}>I</a>
            <a href="https://www.linkedin.com/in/justin-liao23/" target="_blank" rel="noreferrer" className={`text-white hover:text-[#d9d9d9] transition-colors text-[20px] font-thin ${isMobileMenuOpen ? 'block' : 'hidden'}`}>L</a>
            <a href="https://x.com/imjustinliao" target="_blank" rel="noreferrer" className={`text-white hover:text-[#d9d9d9] transition-colors text-[20px] font-thin ${isMobileMenuOpen ? 'block' : 'hidden'}`}>X</a>
            <a href="mailto:justinliao3234@gmail.com" className={`text-white hover:text-[#d9d9d9] transition-colors text-[20px] font-thin ${isMobileMenuOpen ? 'block' : 'hidden'}`}>@</a>

            {/* Lower Divider (Hidden when closed) */}
            <div className={`w-1/2 h-[1px] bg-[#C9C9C9] shrink-0 ${isMobileMenuOpen ? 'block' : 'hidden'}`} />

            {/* Toggle Button (Always visible) */}
            <button
                className="w-full h-12 flex items-center justify-center shrink-0"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                {/* Plus Icon that rotates to X */}
                 <span className={`text-white text-3xl font-thin transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45' : 'rotate-0'}`}>+</span>
            </button>
        </div>
      </div>
    </>
  )
}
