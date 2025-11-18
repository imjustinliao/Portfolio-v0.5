import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const images = ['i1.JPG', 'i2.JPG', 'i3.JPG']

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(1) // Start at second image
  const baseUrl = import.meta.env.BASE_URL

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative w-full min-h-[calc(100vh-180px)] flex items-center justify-center py-4 lg:py-8 max-lg:flex-col max-lg:gap-12 px-4 md:px-6 lg:px-8 xl:px-12">
      <div className="w-full max-w-[1400px] flex items-center justify-between max-lg:flex-col max-lg:gap-12 lg:gap-8 xl:gap-16">
        {/* Text Section - Flexible positioning */}
        <div className="flex flex-col w-full max-w-[90%] sm:max-w-[520px] md:max-w-[540px] lg:max-w-[560px] xl:max-w-[580px] max-lg:items-center max-lg:text-center flex-shrink-0">
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
              className="italic font-normal text-[#92C3FF] no-underline transition-all duration-200 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
            >
              create
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
              className="italic font-normal text-[#92C3FF] no-underline transition-all duration-200 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
            >
              @Inspire
            </a>{' '}
            me.
          </p>
        </div>
        </div>

        {/* Image Section - Flexible positioning */}
        <div className="flex flex-col items-end gap-[clamp(16px,1.8vw,20px)] sm:gap-[clamp(18px,2vw,24px)] lg:gap-6 max-lg:items-center flex-shrink-0">
        {/* Image Container */}
        <div className="w-[clamp(240px,70vw,320px)] h-[clamp(240px,70vw,320px)] sm:w-[clamp(300px,60vw,400px)] sm:h-[clamp(300px,60vw,400px)] md:w-[clamp(360px,50vw,460px)] md:h-[clamp(360px,50vw,460px)] lg:w-[clamp(420px,45vw,500px)] lg:h-[clamp(420px,45vw,500px)] xl:w-[clamp(480px,45vw,553px)] xl:h-[clamp(480px,45vw,553px)] rounded-[15px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)] relative">
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
                  : 'bg-white/60 hover:bg-white/100 hover:shadow-[0_0_8px_rgba(255,255,255,0.4)]'
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

