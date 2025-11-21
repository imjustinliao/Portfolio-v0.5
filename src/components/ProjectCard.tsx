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
  deltaScore: number | string
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
  <svg width="14" height="14" viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.56 2C3.56 2.98 2.76 3.78 1.78 3.78C0.8 3.78 0 2.98 0 2C0 1.02 0.8 0.22 1.78 0.22C2.76 0.22 3.56 1.02 3.56 2ZM3.56 15.56H0V5.33H3.56V15.56ZM15.56 15.56H12V9.78C12 8.33 11.33 7.56 10.22 7.56C9.11 7.56 8.44 8.33 8.44 9.78V15.56H4.89V5.33H8.44V6.67C9.11 5.56 10.22 5.11 11.56 5.11C14.22 5.11 15.56 6.89 15.56 9.78V15.56Z"/>
  </svg>
)

const TwitterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.29 7.34L15.07 0.64H13.7L8.68 6.46L4.67 0.64H0L6.06 9.42L0 16.44H1.37L6.67 10.3L10.89 16.44H15.56L9.29 7.34ZM7.41 9.52L6.8 8.64L1.87 1.59H3.97L7.96 7.3L8.57 8.18L13.7 15.52H11.6L7.41 9.52Z"/>
  </svg>
)

const YoutubeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.8 4.8C15.8 4.8 15.65 3.7 15.15 3.2C14.5 2.5 13.8 2.5 13.5 2.45C11.2 2.3 8 2.3 8 2.3C8 2.3 4.8 2.3 2.5 2.45C2.2 2.5 1.5 2.5 0.85 3.2C0.35 3.7 0.2 4.8 0.2 4.8C0.2 4.8 0 6.05 0 7.3V8.7C0 9.95 0.2 11.2 0.2 11.2C0.2 11.2 0.35 12.3 0.85 12.8C1.5 13.5 2.35 13.45 2.7 13.55C3.9 13.65 8 13.7 8 13.7C8 13.7 11.2 13.65 13.5 13.5C13.8 13.45 14.5 13.45 15.15 12.8C15.65 12.3 15.8 11.2 15.8 11.2C15.8 11.2 16 9.95 16 8.7V7.3C16 6.05 15.8 4.8 15.8 4.8ZM6.4 10.4V5.6L10.6 8L6.4 10.4Z" />
  </svg>
)

const FigmaIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M4 16C3.46957 16 2.96086 15.7893 2.58579 15.4142C2.21071 15.0391 2 14.5304 2 14C2 13.4696 2.21071 12.9609 2.58579 12.5858C2.96086 12.2107 3.46957 12 4 12H6V14C6 14.5304 5.78929 15.0391 5.41421 15.4142C5.03914 15.7893 4.53043 16 4 16ZM4 2C4.53043 2 5.03914 2.21071 5.41421 2.58579C5.78929 2.96086 6 3.46957 6 4V6H4C3.46957 6 2.96086 5.78929 2.58579 5.41421C2.21071 5.03914 2 4.53043 2 4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2ZM4 12C3.46957 12 2.96086 11.7893 2.58579 11.4142C2.21071 11.0391 2 10.5304 2 10C2 9.46957 2.21071 8.96086 2.58579 8.58579C2.96086 8.21071 3.46957 8 4 8H6V12H4ZM10 12C10.5304 12 11.0391 11.7893 11.4142 11.4142C11.7893 11.0391 12 10.5304 12 10C12 9.46957 11.7893 8.96086 11.4142 8.58579C11.0391 8.21071 10.5304 8 10 8V12ZM10 2C10.5304 2 11.0391 2.21071 11.4142 2.58579C11.7893 2.96086 12 3.46957 12 4C12 4.53043 11.7893 5.03914 11.4142 5.41421C11.0391 5.78929 10.5304 6 10 6H8V2H10Z" fill="white"/>
  </svg>
)

const BehanceIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.6 7.2H1.4V8.4H4.6V7.2ZM3 3.5C2.2 3.5 1.5 3.8 1.2 4.5H4.8C4.5 3.8 3.8 3.5 3 3.5ZM3 2.5C4.3 2.5 5.3 3.2 5.6 4.3L6 5.5H0V10.5H6V9.3H1.2V6.5H6.2C6.4 5.2 5.7 3.8 4.8 3.1C4.3 2.7 3.7 2.5 3 2.5ZM11.5 5.5C10.1 5.5 9 6.6 9 8C9 9.4 10.1 10.5 11.5 10.5C12.5 10.5 13.3 10 13.7 9.2L12.8 8.6C12.5 9 12.1 9.3 11.5 9.3C11 9.3 10.5 9 10.3 8.5H14C14 8.4 14 8.2 14 8C14 6.6 12.9 5.5 11.5 5.5ZM11.5 6.5C12.1 6.5 12.6 6.9 12.7 7.5H10.3C10.4 6.9 10.9 6.5 11.5 6.5ZM13.5 3.5H9.5V4.5H13.5V3.5Z"/>
  </svg>
)

const DiscordIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.54 3.6C12.5 3.12 11.4 2.78 10.24 2.58C10.24 2.58 10.02 2.98 9.86 3.36C8.62 3.18 7.38 3.18 6.16 3.36C6 2.98 5.78 2.58 5.78 2.58C4.62 2.78 3.52 3.12 2.48 3.6C0.38 6.74 -0.2 9.8 0.1 12.82C1.38 13.76 2.62 14.34 3.84 14.72C4.14 14.32 4.4 13.88 4.62 13.42C4.18 13.26 3.76 13.06 3.36 12.82C3.46 12.74 3.56 12.66 3.66 12.58C6.5 13.88 9.52 13.88 12.34 12.58C12.44 12.66 12.54 12.74 12.64 12.82C12.24 13.06 11.82 13.26 11.38 13.42C11.6 13.88 11.86 14.32 12.16 14.72C13.4 14.34 14.62 13.76 15.9 12.82C16.26 9.26 15.32 6.22 13.54 3.6ZM5.34 10.72C4.58 10.72 3.96 10.02 3.96 9.16C3.96 8.3 4.56 7.6 5.34 7.6C6.12 7.6 6.74 8.3 6.72 9.16C6.72 10.02 6.12 10.72 5.34 10.72ZM10.68 10.72C9.92 10.72 9.3 10.02 9.3 9.16C9.3 8.3 9.9 7.6 10.68 7.6C11.46 7.6 12.08 8.3 12.06 9.16C12.06 10.02 11.46 10.72 10.68 10.72Z"/>
  </svg>
)

const DevPostIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.8 3.2H10.9L13.4 8L10.9 12.8H3.8V3.2ZM2 1.6V14.4H11.8L15.4 8L11.8 1.6H2Z"/>
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
  if (lowerText.includes('youtube') || lowerUrl.includes('youtube') || lowerUrl.includes('youtu.be')) return <YoutubeIcon />
  if (lowerText.includes('figma') || lowerUrl.includes('figma')) return <FigmaIcon />
  if (lowerText.includes('behance') || lowerUrl.includes('behance')) return <BehanceIcon />
  if (lowerText.includes('discord') || lowerUrl.includes('discord')) return <DiscordIcon />
  if (lowerText.includes('devpost') || lowerUrl.includes('devpost')) return <DevPostIcon />
  
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
              <h3 className="text-white font-medium leading-tight text-[clamp(20px,2.5vw,32px)] pr-[clamp(40px,5vw,50px)]">
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
              {/* Wrapper with same structure as description: outer container with right padding, inner scrollable */}
              <div className="relative pr-[clamp(56px,6vw,64px)]">
                <div className="flex flex-nowrap items-center gap-[clamp(8px,1vw,12px)] overflow-x-auto w-full pb-2 -mb-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                  {project.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex shrink-0 items-center justify-center gap-2 px-[clamp(12px,1.2vw,16px)] py-[clamp(4px,0.6vh,6px)] bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.3)] rounded-[25px] transition-colors text-white border border-white box-border text-[clamp(12px,1vw,14px)] whitespace-nowrap"
                    >
                      {link.icon || getLinkIcon(link.text, link.url)}
                      <span>{link.text}</span>
                    </a>
                  ))}
                </div>
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
