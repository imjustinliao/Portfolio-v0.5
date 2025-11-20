import { useState, useRef } from 'react'

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

export default function ProjectCard({ project, isExpanded, onExpand }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleMouseEnter = () => {
    // On desktop (mouse), hover triggers hover state immediately if not expanded
    if (!isExpanded) setIsHovered(true)
  }

  const handleMouseLeave = () => {
    if (!isExpanded) setIsHovered(false)
  }

  const handleClick = () => {
    if (!isExpanded) {
      // On mobile/touch, click toggles hover state so user can see gif/expand button
      setIsHovered(true)
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
        aspect-[3/2] md:aspect-[1395/458]
        transition-all duration-500 ease-out
        ${isExpanded 
          ? 'shadow-[inset_0_0_12px_12px_rgba(255,255,255,0.75)]' 
          : isHovered 
            ? 'shadow-[0_8px_16px_rgba(255,255,255,0.5)]' 
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
            p-[clamp(20px,3vw,32px)]
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
              pr-[clamp(16px,2vw,32px)]
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

          <div className="flex-1 flex flex-col w-full h-full relative"> 
            
            {/* Top Row: Title (Left) & Delta (Right) */}
            <div className="flex justify-between items-start w-full mb-[clamp(8px,1vh,16px)]">
              <h3 className="text-white font-medium leading-tight text-[clamp(20px,2.5vw,32px)]">
                {project.name}
              </h3>
              
              {/* Delta Score - Top Right (Absolute positioned to corner) */}
              <div className="absolute top-0 right-[clamp(0px,-0.5vw,-2px)] flex items-center">
                <DeltaIcon />
                <span className="absolute -top-[clamp(6px,0.8vw,8px)] -right-[clamp(6px,0.8vw,8px)] text-white font-bold text-[clamp(9px,0.8vw,10px)]">
                  {project.deltaScore}
                </span>
              </div>
            </div>

            {/* Middle Section: Description & Links */}
            <div className="flex flex-col gap-[clamp(12px,1.5vh,16px)] mb-auto">
              {/* Description with left white line */}
              <div className="relative pl-4 pr-[clamp(56px,6vw,64px)] min-h-[clamp(3em,4.5vw,4.5em)] flex flex-col justify-start">
                {/* White line indicator - FIXED HEIGHT based on lines */}
                <div className="absolute left-0 top-1 w-[2px] bg-white rounded-r-[5px] h-[clamp(2.5em,4vw,4.5em)]" />
                
                <p className="text-white font-normal leading-relaxed line-clamp-2 md:line-clamp-3 text-[clamp(14px,1.3vw,18px)]">
                  {project.description}
                </p>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-[clamp(8px,1vw,12px)]">
                {project.links.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-[clamp(12px,1.2vw,16px)] py-[clamp(6px,0.8vh,8px)] bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.3)] rounded-[25px] transition-colors text-white border border-white box-border text-[clamp(12px,1vw,14px)]"
                  >
                    {link.icon}
                    <span>{link.text}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Bottom Row: Meta (Left) & Role (Right) */}
            <div className="flex items-end justify-between w-full mt-auto pt-2">
              {/* Left: Timeline & Location */}
              <div className="flex flex-col gap-[clamp(2px,0.4vh,4px)]">
                <p className="text-[#C9C9C9] text-[clamp(13px,1.2vw,18px)]">{project.timeline}</p>
                <p className="text-[#C9C9C9] text-[clamp(13px,1.2vw,18px)]">{project.location}</p>
              </div>

              {/* Right: Role */}
              <p className="text-white text-right text-[clamp(13px,1.2vw,18px)] -mr-2">
                {project.role}
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
