import React from 'react'

export interface LinkData {
  icon?: React.ReactNode
  text: string
  url: string
}

export interface ProjectData {
  id: string
  name: string
  description: string
  image: string
  gif: string
  links: LinkData[]
  timeline: string
  location: string
  role: string
  deltaScore: number
}

interface ProjectCardProps {
  project: ProjectData
  isExpanded: boolean
  onExpand: (id: string | null) => void
  isHovered: boolean
  onHover: (id: string | null) => void
}

// Icons
const ExpandIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 2H14M14 2V6M14 2L8 8M6 14H2M2 14V10M2 14L8 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const DeltaIcon = () => (
  <img src="/UI/delta.svg" alt="Delta" className="w-[clamp(20px,2vw,24px)] h-[clamp(20px,2vw,24px)]" />
)

const ReturnIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[clamp(20px,2vw,24px)] h-[clamp(20px,2vw,24px)]">
     <path d="M9 14L4 9M4 9L9 4M4 9H14C18.9706 9 23 13.0294 23 18V20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

// Social Media Icons
const GlobeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1 8H15" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 1C9.99999 3.5 9.99999 12.5 8 15" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 1C6.00001 3.5 6.00001 12.5 8 15" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"/>
  </svg>
)

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="12" height="12" rx="3.5" stroke="white" strokeWidth="1.5"/>
    <circle cx="8" cy="8" r="2.5" stroke="white" strokeWidth="1.5"/>
    <circle cx="11.5" cy="4.5" r="0.8" fill="white"/>
  </svg>
)

const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.56 2C3.56 2.98 2.76 3.78 1.78 3.78C0.8 3.78 0 2.98 0 2C0 1.02 0.8 0.22 1.78 0.22C2.76 0.22 3.56 1.02 3.56 2ZM3.56 15.56H0V5.33H3.56V15.56ZM15.56 15.56H12V9.78C12 8.33 11.33 7.56 10.22 7.56C9.11 7.56 8.44 8.33 8.44 9.78V15.56H4.89V5.33H8.44V6.67C9.11 5.56 10.22 5.11 11.56 5.11C14.22 5.11 15.56 6.89 15.56 9.78V15.56Z"/>
  </svg>
)

const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.29 7.34L15.07 0.64H13.7L8.68 6.46L4.67 0.64H0L6.06 9.42L0 16.44H1.37L6.67 10.3L10.89 16.44H15.56L9.29 7.34ZM7.41 9.52L6.8 8.64L1.87 1.59H3.97L7.96 7.3L8.57 8.18L13.7 15.52H11.6L7.41 9.52Z"/>
  </svg>
)

// Helper to get icon based on text/url
const getLinkIcon = (text: string, url: string) => {
  const lowerText = text.toLowerCase()
  const lowerUrl = url.toLowerCase()
  
  if (lowerText.includes('github') || lowerUrl.includes('github')) return <GithubIcon />
  if (lowerText.includes('instagram') || lowerUrl.includes('instagram')) return <InstagramIcon />
  if (lowerText.includes('linkedin') || lowerUrl.includes('linkedin')) return <LinkedinIcon />
  if (lowerText.includes('twitter') || lowerText.includes('x') || lowerUrl.includes('twitter') || lowerUrl.includes('x.com')) return <TwitterIcon />
  
  // Default to Globe
  return <GlobeIcon />
}

export default function ProjectCard({ project, isExpanded, onExpand, isHovered, onHover }: ProjectCardProps) {
  
  const handleMouseEnter = () => {
    // On desktop (mouse), hover triggers hover state immediately if not expanded
    if (!isExpanded) onHover(project.id)
  }

  const handleMouseLeave = () => {
    if (!isExpanded) onHover(null)
  }

  const handleClick = () => {
    if (!isExpanded) {
      // On mobile/touch, click toggles hover state so user can see gif/expand button
      onHover(project.id)
    }
  }

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isExpanded) {
      onExpand(null)
    } else {
      onExpand(project.id)
    }
  }

  return (
    <div
      className={`
        relative 
        w-full 
        /* Aspect Ratio Tuned for Responsiveness:
           - Mobile: Taller to fit content (3/2.8)
           - Tablet (md): 1.2/1 - Taller to prevent cutoff on tablets/narrow desktops
           - Desktop (xl): Wide as originally designed (1395/520 approx 2.68/1) - Only on large screens
        */
        aspect-[3/2.8] md:aspect-[1.2/1] xl:aspect-[1395/520]
        transition-all duration-500 ease-out
        ${isExpanded 
          ? 'shadow-[inset_0_0_12px_12px_rgba(255,255,255,0.75)]' 
          : isHovered 
            ? 'animate-pulse-glow' 
            : ''
        }
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Inner Content Container - handles border and clipping */}
      <div className="absolute inset-0 border-[1px] border-white overflow-hidden">
        
        {/* Background Media */}
        <div className="absolute inset-0 bg-black">
          {/* Static Image */}
          <img
            src={project.image}
            alt={project.name}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              (isHovered || isExpanded) ? 'opacity-0' : 'opacity-100'
            }`}
          />
          
          {/* Loopable GIF/Video */}
          <img
            src={project.gif}
            alt={`${project.name} preview`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              (isHovered || isExpanded) ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>

        {/* Expand Button (Visible on Hover) */}
        <button
          onClick={handleExpandClick}
          className={`
            absolute top-4 right-4 z-30
            w-8 h-8 flex items-center justify-center
            bg-black/50 backdrop-blur-sm rounded-full
            transition-all duration-300
            hover:bg-black/70
            ${isHovered && !isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}
          `}
          aria-label="Expand project"
        >
          <ExpandIcon />
        </button>

        {/* Expanded Overlay - Frosted Glass */}
        <div
          className={`
            absolute inset-0 z-20
            border border-[rgba(255,255,255,0.3)]
            bg-black/35
            backdrop-blur-[8px] 
            transition-all duration-500 ease-out
            flex flex-col
            px-[clamp(24px,3.5vw,36px)]
            py-[clamp(28px,3vw,40px)]
            ${isExpanded ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
          `}
          style={{
            // Custom background gradient combined with black/35 base
            backgroundImage: 'linear-gradient(to bottom right, rgba(255,255,255,0.2), rgba(255,255,255,0.05))',
            backdropFilter: isExpanded ? 'blur(8px) contrast(100%)' : 'none'
          }}
        >
          
          {/* Return Button (Right Edge aligned) */}
           <button
            onClick={handleExpandClick}
            className={`
              absolute right-0 top-1/2 -translate-y-1/2
              z-50 
              py-[clamp(8px,1.2vw,12px)] 
              pl-[clamp(12px,1.5vw,20px)] 
              pr-[clamp(20px,3vw,32px)]
              text-white/80 hover:text-white 
              bg-white/20 hover:bg-white/30 backdrop-blur-md
              rounded-l-[10px] rounded-r-none
              transition-all duration-300
              group
              border-l border-t border-b border-white/20
            `}
            aria-label="Return"
          >
            <div className="group-hover:-translate-x-1 transition-transform duration-300">
               <ReturnIcon />
            </div>
          </button>

          {/* Main Content Layout: Centered Block */}
          {/* Centered vertically in the container, with consistent gap between Top, Middle, Bottom */}
          {/* Main Content Layout: Centered Block */}
          <div className="flex-1 flex flex-col w-full h-full relative justify-center gap-[clamp(16px,2vh,24px)]"> 
            
            {/* Top Row: Title (Left) & Delta (Right) */}
            {/* Added relative to create positioning context for absolute Delta */}
            <div className="flex justify-between items-start w-full shrink-0 relative">
              <h3 className="text-white font-medium leading-tight text-[clamp(20px,2.5vw,32px)]">
                {project.name}
              </h3>
              
              {/* Delta Score - Top Right (Absolute positioned to corner of content block) */}
              <div className="absolute top-0 right-[clamp(6px,0.8vw,8px)] flex items-center">
                <DeltaIcon />
                <span className="absolute -top-[clamp(6px,0.8vw,8px)] -right-[clamp(6px,0.8vw,8px)] text-white font-bold text-[clamp(9px,0.8vw,10px)]">
                  {project.deltaScore}
                </span>
              </div>
            </div>

            {/* Middle Group: Description & Links */}
            <div className="flex flex-col w-full shrink-0 gap-6">
              
              {/* Description Container */}
              {/* Description Container */}
              <div className="relative pr-[clamp(56px,6vw,64px)] flex items-start shrink-0 h-[3.2em] md:h-[4.8em]">
                {/* White line indicator - Fixed height matching container */}
                <div className="absolute left-0 top-0 h-full w-[2px] bg-white rounded-r-[5px]" />
                
                {/* Text Block - Scrollable if exceeds height */}
                <div className="w-full h-full overflow-y-auto pl-4 pr-2 scrollbar-thin scrollbar-thumb-white/50 scrollbar-track-transparent">
                  <p className="text-white font-normal leading-[1.6] text-[clamp(14px,1.3vw,18px)]">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-[clamp(8px,1vw,12px)]">
                {project.links.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-[clamp(12px,1.2vw,16px)] py-[clamp(4px,0.6vh,6px)] bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.3)] rounded-[25px] transition-colors text-white border border-white box-border text-[clamp(12px,1vw,14px)]"
                  >
                    {link.icon || getLinkIcon(link.text, link.url)}
                    <span>{link.text}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Bottom Row: Meta (Left) & Role (Right) */}
            <div className="flex items-end justify-between w-full shrink-0">
              <div className="flex flex-col gap-[clamp(2px,0.4vh,4px)]">
                <p className="text-[#C9C9C9] text-[clamp(13px,1.2vw,18px)]">{project.timeline}</p>
                <p className="text-[#C9C9C9] text-[clamp(13px,1.2vw,18px)]">{project.location}</p>
              </div>

              <p className="text-white text-right text-[clamp(13px,1.2vw,18px)]">
                {project.role}
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
