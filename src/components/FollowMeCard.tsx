import { useState } from 'react'

const socialLinks = {
  cinema: [
    { name: 'Instagram', url: 'https://www.instagram.com/imjustinliao/' },
    { name: 'YouTube', url: 'https://www.youtube.com/@imjustinliao' }
  ],
  knowledge: [
    { name: 'X', url: 'https://x.com/imjustinliao' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/justin-liao23/' }
  ],
  work: [
    { name: 'GitHub', url: 'https://github.com/imjustinliao' },
    { name: 'Behance', url: 'https://www.behance.net/justinliao23' }
  ]
}

export default function FollowMeCard() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="relative w-full aspect-[757/974] rounded-lg overflow-hidden cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)}
    >
      {/* Background Image */}
      <div 
        className={`
          absolute inset-0 bg-cover bg-center transition-all duration-500 ease-out
          ${isHovered ? 'blur-sm scale-105 brightness-[0.4]' : 'blur-0 scale-100 brightness-100'}
        `}
        style={{ backgroundImage: 'url(/UI/me.jpeg)' }}
      />

      {/* White Inner Border (Only visible in initial state) */}
      <div 
        className={`
          absolute inset-0 border border-white/20 rounded-lg pointer-events-none transition-opacity duration-500
          ${isHovered ? 'opacity-0' : 'opacity-100'}
        `}
      />

      {/* Initial State: DISCOVER Text */}
      <div 
        className={`
          absolute inset-0 flex items-center justify-center transition-all duration-500
          ${isHovered ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}
        `}
      >
        <h2 className="text-white text-[clamp(30px,4vw,40px)] font-normal tracking-widest drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
          DISCOVER
        </h2>
      </div>

      {/* Hover State: Links List */}
      <div 
        className={`
          absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-500
          ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
        `}
      >
        <div className="flex flex-col gap-8 overflow-y-auto max-h-full py-8 w-full no-scrollbar">
          
          {/* Cinema Section */}
          <div className="flex flex-col gap-3">
            <span className="text-white/60 text-sm font-light tracking-wide drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]">Cinema</span>
            {socialLinks.cinema.map((link) => (
              <a 
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="text-white text-2xl font-normal hover:text-[#92C3FF] transition-colors drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Knowledge Section */}
          <div className="flex flex-col gap-3">
            <span className="text-white/60 text-sm font-light tracking-wide drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]">Knowledge</span>
            {socialLinks.knowledge.map((link) => (
              <a 
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="text-white text-2xl font-normal hover:text-[#92C3FF] transition-colors drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Work Section */}
          <div className="flex flex-col gap-3">
            <span className="text-white/60 text-sm font-light tracking-wide drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]">Work</span>
            {socialLinks.work.map((link) => (
              <a 
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="text-white text-2xl font-normal hover:text-[#92C3FF] transition-colors drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]"
              >
                {link.name}
              </a>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}
