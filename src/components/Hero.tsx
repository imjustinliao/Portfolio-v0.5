import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import GlowingBorder from './GlowingBorder'

const images = ['i1.JPG', 'i2.JPG', 'i3.JPG']

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(1) // Start at second image
  const [isImageHovered, setIsImageHovered] = useState(false)
  const baseUrl = import.meta.env.BASE_URL
  const flowAudioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize audio
  useEffect(() => {
    flowAudioRef.current = new Audio('/audio/flow.mp3')
    flowAudioRef.current.volume = 0.3
    flowAudioRef.current.loop = true
    return () => {
      if (flowAudioRef.current) {
        flowAudioRef.current.pause()
        flowAudioRef.current.currentTime = 0
      }
    }
  }, [])

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const playFlowAudio = () => {
    if (flowAudioRef.current && flowAudioRef.current.paused) {
      flowAudioRef.current.currentTime = Math.random() * flowAudioRef.current.duration || Math.random() * 3.5
      flowAudioRef.current.play().catch(() => {})
    }
  }

  const stopFlowAudio = () => {
    if (flowAudioRef.current) {
      flowAudioRef.current.pause()
      flowAudioRef.current.currentTime = 0
    }
  }

  return (
    <section className="relative w-full min-h-[calc(100vh-180px)] flex items-center justify-center py-[4vh] max-lg:flex-col max-lg:gap-[5vh] px-[3vw]">
      <div className="w-full flex items-center justify-between max-lg:flex-col max-lg:gap-[5vh]">
        {/* Text Section - Flexible positioning */}
        {/* Text Section - Flexible positioning */}
        {/* Adjust w-[45vw] to change desktop text width. Adjust max-lg:w-[90vw] for mobile. */}
        <div className="flex flex-col w-[45vw] max-lg:w-[90vw] max-lg:items-center max-lg:text-center flex-shrink-0 animate-slide-in-left opacity-0" style={{ animationDelay: '0.2s' }}>
        {/* Hi I'm */}
        <h1 className="text-[clamp(36px,4.8vw,42px)] sm:text-[clamp(42px,5.2vw,52px)] md:text-[clamp(48px,5.5vw,60px)] lg:text-[clamp(54px,5.5vw,67px)] font-light leading-[1.1] text-white tracking-[-0.02em]">
          Hi, I'm
        </h1>

        {/* Responsive spacing between headlines */}
        <div className="h-[clamp(14px,1.5vw,18px)] sm:h-[clamp(16px,1.6vw,20px)] lg:h-[clamp(18px,1.8vw,22px)]" />

        {/* Justin Liao. */}
        <h2 className="text-[clamp(56px,9vw,72px)] sm:text-[clamp(68px,9.5vw,88px)] md:text-[clamp(80px,10vw,105px)] lg:text-[clamp(96px,10.3vw,125px)] font-light leading-[0.95] text-white tracking-[-0.025em] whitespace-nowrap">
          Justin Liao.
        </h2>

        {/* Responsive spacing before body copy */}
        <div className="h-[clamp(32px,3.5vw,38px)] sm:h-[clamp(36px,3.8vw,42px)] lg:h-[clamp(40px,4vw,47px)]" />

        {/* Body copy with responsive vertical spacing */}
        <div className="flex flex-col gap-[clamp(24px,2.8vw,28px)] sm:gap-[clamp(28px,3.2vw,33px)] lg:gap-[clamp(33px,3.5vw,37px)] w-full max-w-[480px] sm:max-w-[500px] lg:max-w-[520px]">
          {/* Technologist paragraph */}
          <p className="text-[clamp(14px,1.4vw,15px)] sm:text-[clamp(15px,1.5vw,16px)] lg:text-[17px] font-normal leading-[1.5] text-white tracking-[-0.01em]">
            As a defiant technologist, I{' '}
            <Link 
              to="/about" 
              className="relative group inline-block px-1 -mx-1 rounded-md italic font-normal text-[#92C3FF] no-underline"
              onMouseEnter={playFlowAudio}
              onMouseLeave={stopFlowAudio}
              onClick={playFlowAudio}
            >
              <span className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 border border-[rgba(146,195,255,0.5)] rounded-md"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(146,195,255,0.4)] to-transparent animate-shimmer"></div>
              </span>
              <span className="relative z-10">create</span>
            </Link>{' '}
            immersive experience that is boundless and unconventional.
          </p>

          {/* Co-founder */}
          <p className="text-[clamp(14px,1.4vw,15px)] sm:text-[clamp(15px,1.5vw,16px)] lg:text-[17px] font-normal leading-[1.5] text-white tracking-[-0.01em]">
            I'm the co-founder of Reunify Labs.
          </p>

          {/* Philosophy */}
          <p className="text-[clamp(14px,1.4vw,15px)] sm:text-[clamp(15px,1.5vw,16px)] lg:text-[17px] font-normal leading-[1.5] text-white tracking-[-0.01em]">
            My creation philosophy comes with one goal: empowering self-awareness
            and the discovery of endless possibilities.
          </p>

          {/* @Inspire me - mailto link */}
          <p className="text-[clamp(14px,1.4vw,15px)] sm:text-[clamp(15px,1.5vw,16px)] lg:text-[17px] font-normal leading-[1.5] text-white tracking-[-0.01em]">
            <a 
              href="mailto:justinliao@gmail.com" 
              className="relative group inline-block px-1 -mx-1 rounded-md italic font-normal text-[#92C3FF] no-underline"
              onMouseEnter={playFlowAudio}
              onMouseLeave={stopFlowAudio}
              onClick={playFlowAudio}
            >
              <span className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 border border-[rgba(146,195,255,0.5)] rounded-md"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(146,195,255,0.4)] to-transparent animate-shimmer"></div>
              </span>
              <span className="relative z-10">@Inspire</span>
            </a>{' '}
            me.
          </p>
        </div>
        </div>

        {/* Image Section - Flexible positioning */}
        {/* Adjust w-[40vw] to change desktop image section width. */}
        <div className="flex flex-col items-end gap-[2vh] max-lg:items-center flex-shrink-0 w-[40vw] max-lg:w-[90vw] animate-slide-in-right opacity-0" style={{ animationDelay: '0.4s' }}>
        {/* Image Container */}
        {/* Adjust w-[35vw] to change desktop image size. Adjust max-lg:w-[80vw] for mobile. */}
        <div 
          className="w-[35vw] max-lg:w-[80vw] aspect-square rounded-[15px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)] relative"
          onMouseEnter={() => {
            setIsImageHovered(true)
            playFlowAudio()
          }}
          onMouseLeave={() => {
            setIsImageHovered(false)
            stopFlowAudio()
          }}
          onClick={() => {
            setIsImageHovered(true)
            playFlowAudio()
          }}
        >
          {/* Layer 1: Images */}
          {images.map((image, index) => (
            <img
              key={image}
              src={`${baseUrl}UI/${image}`}
              alt={`Justin Liao ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          
          {/* Layer 2: Frosted Liquid Glass Overlay (CSS Based) */}
          {/* Matches Footer.tsx glassStyle: border, gradient, backdrop-blur */}
          <div 
            className="absolute inset-0 z-[1] transition-opacity duration-800 ease-out border border-[rgba(255,255,255,0.3)] bg-gradient-to-br from-[rgba(255,255,255,0.2)] to-[rgba(255,255,255,0.05)] backdrop-blur-[10px] shadow-[0_4px_30px_rgba(0,0,0,0.1)] rounded-[15px]"
            style={{ opacity: isImageHovered ? 0 : 1 }}
          />

          {/* Layer 3: Infinite Glowing Border (Visible on Hover) */}
          <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 rounded-[inherit] ${isImageHovered ? 'opacity-100' : 'opacity-0'}`}>
            <GlowingBorder infinite={true} duration={3000} />
          </div>
        </div>

        {/* Carousel Dots - Responsive positioning */}
        <div className="flex items-center gap-2 mr-4 max-lg:mr-0">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-[21px] h-[7px] rounded-[15px] transition-all duration-300 ease-out cursor-pointer border-none ${
                index === currentImageIndex 
                  ? 'bg-[#92C3FF] shadow-[0_0_12px_rgba(146,195,255,0.7),0_0_4px_rgba(146,195,255,0.9)]' 
                  : 'bg-white hover:bg-white hover:shadow-[0_0_8px_rgba(255,255,255,0.4)]'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
        </div>
      </div>
    </section>
  )
}

