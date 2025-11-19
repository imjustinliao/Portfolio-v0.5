import { useState, useEffect } from 'react'

const slideOneContent = [
  "Throughout my life, I’m never fond of existing rules and ideologies.",
  "I don’t believe there’s a single formula towards the reality, but there are ways to get closer to the truth: high-delta work.",
  "The reason that humanity has advanced forward is because we constantly challenge the status quo, impactful and disruptive enough to enable new discovery of all kind.",
  "This philosophy carries around my work and the decisions I’ve made along the way, which amplifies as I get older.",
  "I want to make a dent in the universe."
]

const slideTwoContent = [
  "No matter what roles I’m in, such as a founder, engineer, designer, or even thinker, I’m an artist at heart.",
  "Intuitive vision influences my decisions more than practical steps.",
  "I can be extremely delusional sometimes.",
  "I’m a perfectionist, and I’m deeply obsessed with details that don’t seem to matter.",
  "I care a lot about being original, because that’s when real innovation happens.",
  "The start of each creation process is the hardest but also the most fulfilling part to achieve great work."
]

const workCategories = [
  "High-delta Work",
  "Intuitive Arts",
  "Technical Projects",
  "Content Creation"
]

export default function About() {
  const [activeState, setActiveState] = useState(0) // 0 or 1
  const [isAnimating, setIsAnimating] = useState(false)
  const [displayText, setDisplayText] = useState(slideOneContent)
  const [activeWorkCategory, setActiveWorkCategory] = useState(0)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useEffect(() => {
    // When activeState changes, trigger animation
    setIsAnimating(true)
    
    const timeout = setTimeout(() => {
      setDisplayText(activeState === 0 ? slideOneContent : slideTwoContent)
      setIsAnimating(false)
    }, 350) // Half of 700ms transition

    return () => clearTimeout(timeout)
  }, [activeState])

  const handleToggle = (index: number) => {
    if (index !== activeState) {
      setActiveState(index)
    }
  }

  return (
    <section className="w-full min-h-screen flex flex-col items-center pt-[50px] pb-[60px] px-[5vw] relative" aria-label="About">
      
      {/* Container for consistent width/alignment */}
      <div className="w-full max-w-[1400px] flex flex-col items-start">
        
        {/* Title */}
        <h1 className="font-normal text-white text-[clamp(36px,5vw,70px)] leading-none mb-[5vh] animate-slide-in-left">
          About me
        </h1>

        {/* Text Content Area */}
        <div className="relative w-full min-h-[300px] md:min-h-[380px] mb-[2vh]">
          <div 
            className={`
              flex flex-col gap-5 md:gap-8 text-left w-full transition-all duration-700 ease-in-out
              ${isAnimating ? 'opacity-0 translate-x-[-20px]' : 'opacity-100 translate-x-0'}
            `}
          >
            {displayText.map((paragraph, index) => (
              <p 
                key={index} 
                className="text-white font-normal text-[clamp(15px,1.6vw,22px)] leading-[1.4] max-w-full"
              >
                {paragraph.includes("high-delta work") ? (
                  <>
                    {paragraph.split("high-delta work")[0]}
                    <span className="relative group/tooltip inline-block cursor-help px-1 -mx-1 rounded-md">
                      {/* Continuous Glowing Border Effect */}
                      <span className="absolute inset-0 rounded-md opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden">
                         <div className="absolute inset-0 border border-[rgba(146,195,255,0.5)] rounded-md"></div>
                         <div 
                           className="absolute top-0 left-0 w-[50%] h-full bg-gradient-to-r from-transparent via-[rgba(146,195,255,0.6)] to-transparent animate-flow-beam"
                           style={{
                             filter: 'drop-shadow(0 0 5px rgba(146,195,255,0.8))',
                             willChange: 'transform'
                           }}
                         ></div>
                      </span>
                      
                      <span className="italic text-[#92C3FF] relative z-10">high-delta work</span>
                      
                      {/* Tooltip */}
                      <span className="absolute bottom-full left-0 mb-4 w-[280px] sm:w-[350px] p-4 rounded-xl 
                        opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible 
                        transition-all duration-300 ease-out transform translate-y-2 group-hover/tooltip:translate-y-0
                        border border-[rgba(255,255,255,0.3)] bg-gradient-to-br from-[rgba(255,255,255,0.2)] to-[rgba(255,255,255,0.05)] backdrop-blur-[10px] shadow-[0_4px_30px_rgba(0,0,0,0.1)]
                        text-white text-sm font-normal leading-relaxed text-left z-50 pointer-events-none">
                        <span className="font-semibold text-white">high-delta work:</span> whether it’s good or bad, it’s something that advances the humanity forward and redefines how we work.
                      </span>
                    </span>
                    {paragraph.split("high-delta work")[1]}
                  </>
                ) : (
                  paragraph
                )}
              </p>
            ))}
          </div>
        </div>

        {/* State Indicators (0 1) */}
        <div className="flex items-center gap-6 text-[clamp(18px,1.5vw,24px)] font-normal text-white mt-auto">
          <button 
            onClick={() => handleToggle(0)}
            className="relative outline-none"
          >
            0
            <span 
              className={`
                absolute -bottom-1 left-0 h-[2px] bg-[#92C3FF] transition-all duration-500 ease-out
                ${activeState === 0 ? 'w-full' : 'w-0'}
              `}
            />
          </button>

          <button 
            onClick={() => handleToggle(1)}
            className="relative outline-none"
          >
            1
            <span 
              className={`
                absolute -bottom-1 left-0 h-[2px] bg-[#92C3FF] transition-all duration-500 ease-out
                ${activeState === 1 ? 'w-full' : 'w-0'}
              `}
            />
          </button>
        </div>

        {/* Divider Line */}
        <div className="w-full h-[1px] bg-[#C9C9C9] mt-[clamp(30px,15vh,130px)] mb-[clamp(40px,8vh,80px)]" />

        {/* Work Categories */}
        {/* Desktop/Tablet: List view */}
        <div className="hidden md:flex flex-col gap-2 w-full max-w-[clamp(180px,25vw,265px)]">
          {workCategories.map((category, index) => {
            const isSelected = activeWorkCategory === index
            return (
              <button
                key={index}
                onClick={() => setActiveWorkCategory(index)}
                className={`
                  relative w-full text-left py-[clamp(10px,1.2vh,14px)] px-[clamp(12px,1.5vw,20px)]
                  text-[clamp(18px,1.8vw,24px)] font-normal text-white
                  transition-all duration-300 ease-out
                  group
                  ${isSelected ? 'bg-[rgba(255,255,255,0.15)]' : 'hover:bg-[rgba(255,255,255,0.2)]'}
                  rounded-r-[5px]
                `}
              >
                {/* Left Border Selection Indicator */}
                {isSelected && (
                  <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white" />
                )}

                {/* White Rectangle on Hover (Unselected) or Active */}
                <div 
                  className={`
                    absolute right-4 top-1/2 -translate-y-1/2 w-[7px] h-[10px] bg-white
                    transition-opacity duration-300
                    ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                  `} 
                />

                {category}
              </button>
            )
          })}
        </div>

        {/* Mobile: Dropdown view */}
        <div className="md:hidden w-full max-w-[300px] relative z-20">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between py-3 px-4 bg-[rgba(255,255,255,0.15)] rounded-[5px] text-white text-[20px] font-normal border border-transparent active:border-[rgba(255,255,255,0.3)] transition-all"
          >
            <span>{workCategories[activeWorkCategory]}</span>
            <svg 
              width="14" 
              height="8" 
              viewBox="0 0 14 8" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`}
            >
              <path d="M1 1L7 7L13 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Dropdown Menu */}
          {/* Changed background to light transparent using rgba(255,255,255,0.1) and backdrop-blur */}
          <div 
            className={`
              absolute top-full left-0 w-full mt-2 py-2
              bg-[rgba(255,255,255,0.1)] backdrop-blur-md border border-[rgba(255,255,255,0.1)] rounded-[5px] shadow-xl
              flex flex-col gap-1
              origin-top transition-all duration-300 ease-out
              ${isDropdownOpen ? 'opacity-100 scale-y-100 translate-y-0' : 'opacity-0 scale-y-0 -translate-y-2 pointer-events-none'}
            `}
          >
            {workCategories.map((category, index) => {
              if (index === activeWorkCategory) return null // Skip currently selected
              return (
                <button
                  key={index}
                  onClick={() => {
                    setActiveWorkCategory(index)
                    setIsDropdownOpen(false)
                  }}
                  className="w-full text-left py-2 px-4 text-[18px] text-[rgba(255,255,255,0.8)] hover:text-white hover:bg-[rgba(255,255,255,0.1)] transition-colors"
                >
                  {category}
                </button>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}

