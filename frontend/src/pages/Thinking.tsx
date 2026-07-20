import { useMemo, useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

// --- CONFIGURATION: MARQUEE SPEED ---
// Adjust these values to control the speed for different screen sizes.
// Since content width is constant, we use a consistent duration for a consistent speed.
const DURATION_DESKTOP = '100s'
const DURATION_TABLET = '100s'
const DURATION_MOBILE = '100s'
// ------------------------------------

const INFLUENCES = [
  "Stoicism", "myself", "my family", "Steve Jobs", "Peter Thiel", "Elon Musk", 
  "Buddism", "Jeff Bezos", "Naval Ravikant", "Larry Ellison", "Socrates", 
  "Jensen Huang", "Ethan Leonard", "Manish Ram", "Thomas Suen", "Berky", 
  "Hawa Drammeh", "Marc Andreessen", "Ben Horowitz", "Zaha Hadid", 
  "Mark Zuckerberg", "Paul Graham", "Sam Altman", "Jack Dorsey", "Brian Chesky", 
  "Jony Ive", "Thomas Edison", "Pavel Durov", "Jim Rohn", "Dan Coe", 
  "Napolean Hill", "Jordan B. Peterson", "Rachel Lou", 
  "Sean Imoto", "Daniil Morozov", "James Floyd", "Roy Lee", 
  "Keli G.", "Abraham Guan", "Ehud Halberstam", "David Lee", "John D. Rockefeller", 
  "Richard Branson", "Warren Buffett", "Albert Einstein", "Mike Tyson", 
  "Friedrich Nietzsche", "Henry Ford", "Richard Feynman", "Ray Dalio", 
  "Jack Wu", "Swanand Wagh", "Jamie Dimon", "Kelly Huang", "Malaika Khan", 
  "Yannis Paniaras", "Dale Carnegie", "Aaron Levie", "Dhruv Addanki", "Dieter Rams", 
  "Darren Thamtoro", "Peter Steinberger", "Richard Zheng", "Ben Weinstein", "Tamir Michaely", 
  "Marcus Aurelius", "Seneca", "Aristotle", "René Descartes", "Ivan Zhao", "Patricia Tani", 
  "Daniel Kwon", "Philip Johnston", "Arlan Rakhmetzhanov", "Boris Cherny", "Raphael Salaja", 
  "Zara Zhang", "Tanay Kothari", "Mira Murati", "Michael Truell", "Vicky Ye", "Patrick Collison", 
  "Andrew Ng", "Gabriel Petersson", "Bryan Johnson", "Dylan Field", "Ryo Lu", "Hubert Thieblot", 
  "Brett Adcock", "Ethan Wang", "Julia Alvarenga", "Anhphu Nguyen",
  "Eve Bouff", "James Hawkins", "Dale Verett", "Sean Parker", "Emily Chang",
  "Dario Amodei", "Molly O’Shea", "Shengkun Ye", "Andrej Karpathy", "Guillermo Rauch",
  "Adil Mania", "Nikita Bier", "Sun Tzu", "George Washington", "Ben Aratame"
]

const PACKAGES = [
  { title: "Why I’m Techno-Optimistic", for: "Founders, Builders, VCs", category: "World Reflection", date: "Jan 10, 2026", path: "/writings/WIT" }
]

const CATEGORIES = ['Life Principles', 'Writings', 'Inspirations', 'Quote']

// DATA: LIFE PRINCIPLES
const PRINCIPLES = [
  { id: 1, title: "Think without constraint.", description: "Whether it’s ideology, politics, philosophy, legislation, religion, society, and even emotions, they are all considered mind-constraining. You must continuously break out endless system of constraints to get closer to the truth. The entire universe is never known, and the humanity has been redefining constraints to make sense of themselves, which is how we move forward.", scenario: 'Ψ' },
  { id: 2, title: "Life is about discovery.", description: "Everything that we do in life has been about the exchange of information, or at its core, discovering new things. Throughout human history, we advance our civilization through self-discovery: knowledge, relationships, communication, action, and reaction. Human are inherently curious about how the universe, including ourselves, changes after some form of experimentations.", scenario: 'Ψ' },
  { id: 3, title: "Always act in high-delta state.", description: "Whenever you try to do something, such as blinking your eyes or screaming in the park, you are trying to discover some kind of reactions. As we advance our civilization, the contextual impact must be large enough to cause a change. Every single action serves a purpose, which has its own delta, bad or good, big or small. It’s like a spring, small changes stay the same, only big changes can move forward and create new discovery.", scenario: 'Ψ' },
  { id: 4, title: "Defy the odds.", description: "Life is too short to live in someone else’s dogma. Most people follow norms because they care more about others’ opinions than their own. They want to feel belonged to part of the society, which is a sign of low self-respect. Those who thrive in life constantly challenge the status quo to pursue their own reality.", scenario: '0' },
  { id: 5, title: "Be yourself, not literally.", description: "Most people think, act, and react like others just to fit in. They often have a miserable life that has no purpose, passion, and goals. They are genuinely lost because they care about the perception of others. Life become so much happier when you truly focus on yourself. In fact, people prefer to stay with people who are being themselves, as it shows confidence and excitements. In a sense, being yourself means to become unpredictable because only you get to know what’s next.", scenario: '0' },
  { id: 6, title: "Don’t take people’s advice.", description: "I always have a rule of listening to multiple perspectives while forming your core view, and based on your unique situation, apply what fits. We all have to deal with different circumstances, and there’s no single piece of advice or formula that works for everyone.", scenario: 'Ψ' },
  { id: 7, title: "Empathy over sympathy.", description: "People without self-awareness are easily manipulated through emotions, which can be detrimental to their own believes. You must stay firm in your own belief to protect yourself from getting lost while impacting the system as a whole. Understanding others’ perspectives allows you to decipher how they work, giving you advantages in relationships, information, and predictability.", scenario: '0' },
  { id: 8, title: "To become self-aware, accept everything from zero to one.", description: "The situation around you changes constantly, every single second.  Stay focused by observing your context so you don't fall under other’s control. You must be self-aware, not in a shallow sense, but knowing whatever information out there has no constraint. Whatever perspective you receive, you should always discover it yourself (or don’t as this advice might be a constraint).", scenario: 'Ψ' },
  { id: 9, title: "Be delusional, practicalism kills your limit.", description: "Many successful people who change the world are the crazy ones, because they believe so hard in their vision eventually made it work. Our world is made up of creations of people who dream super big. You must know that the limit is not bounded by others but yourself. If you’re practical, you begin to focus on the short-term reward and become less risk tolerant, which limits your potential to create new stuff. Being delusional also gives you the advantage of a creativity burst, coming out with crazy ideas everyday that one of them might be real and pays off. You become to think more original, betting on something revolutionary that redefines the world.", scenario: '0' },
  { id: 10, title: "Intuition over analysis.", description: "Most people make their decisions based on real-time data rather than instinct. They rely on opinions, knowledge, books, and rules whenever they try to solve a problem or create something. The danger in that is you will need data to make decisions, which limits your thoughts and creative mind to solve unprecedented problems. When you know you’re right, do it 100% (high-delta) and make it happen. Never be in the middle state, where you are doubting yourself but care about your ego so you stick to the wrong decision.", scenario: '1' },
  { id: 11, title: "Win big or fail big.", description: "You either win big or fail miserably in life; never be in the middle state. If you win big, you achieve your goal based on your perception of reality. If you lose big, you know that you tried 100% on things. This sheer effort is fulfilling in itself; it marks an exciting life and leaves a massive impact. The middle is the worst spot to be in because you can’t do anything about it. You suffer from not being at the top, while still having the risk of going back to the bottom again.", scenario: '0' },
  { id: 12, title: "There is no right or wrong.", description: "Ethics are constantly modified social constructs that have always changed and differ across place, culture, and religion. Essentially, every individual is inherently different, yet adheres to the same set of norms within the macro-reality. Your environment and upbringing, both internal and external, deeply influence your thoughts. You must continuously break free from these predetermined constraints to genuinely discover what aligns with the truth, whether for yourself or for humanity.", scenario: '1' },
  { id: 13, title: "Passion is the work, not the skill.", description: "People often assume passion requires falling in love with a specific skillset. While this is partially correct, this view is constrained because skills are merely arbitrary definitions created by the people who invented them. Instead, passion is the act of doing. It is found in the process of achieving your goals, building a project, or the act of leading a company. These are not specific skills, such as “passion in coding,” but pure work. Do it if you love the work.", scenario: '0' },
  { id: 14, title: "Stay humble, stay foolish.", description: "This is the greatest quote from Steve Jobs. Ask “Why” to everyone; never feel shameful for asking questions. If you don’t know about a subject in a group setting with people who know more than you, pretend that you know what you’re talking about until someone corrects you. You must back your arguments, or don’t. Either way, you should admit your fault when you are wrong, and let the people who know more than you win the argument. This is where constructive learning starts.", scenario: '0' },
]

// --- DATA: INSPIRATIONS ---
const INSPIRATIONS = {
  "Startup": [
    { title: "Zero to One", author: "Peter Thiel", type: "Book" },
    { title: "The Bezos Letter", author: "Steve Anderson", type: "Book" },
    { title: "Do things that don't scale", author: "Paul Graham", type: "Article" },
    { title: "Why to not not start a startup", author: "Paul Graham", type: "Article" },
    { title: "How to Hire", author: "Sam Altman", type: "Article" },
    { title: "Prediction: the successor to postmodernism", author: "Alex Danco", type: "Article" },
    { title: "The Techno-Optimist Manifesto", author: "Marc Andreessen", type: "Book" },
    { title: "The Hard Things About Hard Things", author: "Ben Horowitz", type: "Book" },
    { title: "The Truth about Venture Capitalists (in 2007)", author: "Marc Andreessen", type: "Article" },
    { title: "The only thing that matters", author: "Marc Andreessen", type: "Article" }
  ],
  "Life": [
    { title: "Atomic Habits", author: "James Clear", type: "Book" },
    { title: "The Daily Stoic", author: "Ryan Holiday", type: "Book" },
    { title: "What I Wish Someone Had Told Me", author: "Sam Altman", type: "Article" },
    { title: "Factfulness: Ten Reasons We're Wrong About the World", author: "Hans Rosling", type: "Book" },
    { title: "The 38 Letters from J.D. Rockefeller to His Son: Perspectives, Ideology, and Wisdom", author: "J.D. Rockefeller", type: "Book" }
  ],
  "Tech": [
    { title: "Abundant Intelligence", author: "Sam Altman", type: "Article" },
    { title: "Swipe to Unlock: A Primer on Technology and Business Strategy", author: "Aditya Agashe, Neel Mehta, & Parth Detroja", type: "Book" }
  ],
  "Design": [
    { title: "The Creative Act", author: "Rick Rubin", type: "Book" },
    { title: "ZAHA HADID", author: "Philip Jodidio", type: "Book" },
    { title: "The Designer's Dictionary of Color", author: "Sean Adams", type: "Book" },
    { title: "Dieter Rams: As Little Design as Possible", author: "Sophie Lovell", type: "Book" },
    { title: "The World According to Karl", author: "Jean-Christophe Napias & Sandrine Gulbenkian", type: "Book" },
    { title: "Taste for Makers", author: "Paul Graham", type: "Article" }
  ],
  "Finance": [
    { title: "Margin of Trust: The Berkshire Business Model", author: "Lawrence A. Cunningham & Stephanie Cuba", type: "Book" },
  ],
  "People": [
    { title: "How to Win Friends and Influence People", author: "Dale Carnegie", type: "Book" },
    { title: "Steve Jobs", author: "Walter Isaacson", type: "Book" }
  ]
}

// --- COMPONENT: PRINCIPLE ITEM ---
const PrincipleItem = ({ 
  principle, 
  isExpanded, 
  onToggle 
}: { 
  principle: typeof PRINCIPLES[0], 
  isExpanded: boolean, 
  onToggle: () => void 
}) => {
  const [displayChar, setDisplayChar] = useState('') // Initial state: not revealed
  const [isHovered, setIsHovered] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize audio on mount
  useEffect(() => {
    audioRef.current = new Audio('/audio/matrix.mp3')
    audioRef.current.volume = 0.2
    audioRef.current.loop = true // Enable looping for seamless playback
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }
  }, [])

  // Reset state when collapsed and not hovered
  useEffect(() => {
    if (!isExpanded && !isHovered) {
      setDisplayChar('')
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      // Stop audio
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    } else if (isExpanded) {
      // Ensure it's revealed if expanded, but respect running animation
      if (!intervalRef.current) {
        setDisplayChar(principle.scenario)
      }
    }
  }, [isExpanded, isHovered, principle.scenario])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }
  }, [])

  // Glitch Effect Logic
  const triggerGlitch = () => {
    // Allow re-triggering if interval is not running, even if revealed (for mobile feedback)
    if (intervalRef.current) return

    // Play audio from random position
    if (audioRef.current) {
      // Set random start time (assuming 3.5 second duration)
      audioRef.current.currentTime = Math.random() * 3.5
      audioRef.current.play().catch(() => {})
    }

    let iterations = 0
    const maxIterations = 10 // 50ms * 10 = 500ms duration
    const chars = ['0', '1', 'Ψ']
    
    // Immediate feedback
    setDisplayChar(chars[Math.floor(Math.random() * chars.length)])
    
    intervalRef.current = setInterval(() => {
      setDisplayChar(chars[Math.floor(Math.random() * chars.length)])
      iterations++
      
      if (iterations >= maxIterations) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
        setDisplayChar(principle.scenario)
        // Stop audio when done
        if (audioRef.current) {
          audioRef.current.pause()
          audioRef.current.currentTime = 0
        }
      }
    }, 50)
  }

  return (
    <div 
      className="w-full border-b border-[rgba(255,255,255,0.1)] pb-6 last:border-none relative overflow-hidden px-6 cursor-pointer"
      onMouseEnter={() => {
        setIsHovered(true)
        triggerGlitch()
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        triggerGlitch()
        onToggle()
      }}
    >
      {/* Flow Up Glow Background */}
      <div 
        className={`absolute inset-0 bg-gradient-to-t from-[rgba(var(--theme-rgb),0.1)] to-transparent transition-transform duration-500 ease-out origin-bottom ${isHovered ? 'scale-y-100' : 'scale-y-0'}`}
        style={{ pointerEvents: 'none' }}
      />

      <div className="w-full flex items-center justify-between group relative z-10">
        <div className="flex items-center gap-6 flex-1 min-w-0 mr-4">
          {/* Boxed Scenario Indicator */}
          <div 
            className="w-[35px] h-[41px] flex-shrink-0 flex items-center justify-center bg-[rgba(0,0,0,0.2)] rounded-[5px] text-white text-[16px] font-['Source_Code_Pro'] pt-[2px]"
            style={{ boxShadow: 'inset 0 0 8.4px 0 #FFFFFF' }}
          >
            {displayChar}
          </div>

          {/* Principle Title - Clickable to expand */}
          <div 
            className="text-white text-[20px] md:text-[24px] font-light text-left overflow-x-auto whitespace-nowrap w-full [&::-webkit-scrollbar]:hidden"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none' 
            }}
          >
            {principle.title}
          </div>
        </div>

        {/* Hollow Circle Toggle */}
        <div 
          className="text-white transition-opacity hover:opacity-70 flex-shrink-0"
          aria-label="Toggle description"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="white" 
              strokeWidth="3"
              className="transition-all duration-300 ease-in-out"
              style={{ 
                fill: isExpanded ? 'white' : 'transparent' 
              }}
            />
          </svg>
        </div>
      </div>
      
      <div 
        className={`
          overflow-hidden transition-all duration-500 ease-in-out
          ${isExpanded ? 'max-h-[300px] opacity-100 mt-4' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="pl-[59px] pr-4 max-h-[200px] overflow-y-auto custom-scrollbar">
          <p className="text-[rgba(255,255,255,0.8)] text-[18px] md:text-[18px] leading-relaxed font-light">
            {principle.description}
          </p>
        </div>
      </div>
    </div>
  )
}

const ThinkingDots = () => {
  const [dots, setDots] = useState('.')

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '.' : prev + '.')
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return <span className="inline-block w-[24px] text-left">{dots}</span>
}

const InspirationItem = ({ item }: { item: { title: string, author: string, type: string } }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div 
      className="flex flex-col items-center cursor-pointer"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <span 
        className="text-white text-[19px] md:text-[21px] font-normal transition-all duration-300"
        style={{
          textShadow: isExpanded ? '0 0 20px rgba(255, 255, 255, 0.8)' : 'none'
        }}
      >
        {item.title}
      </span>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-[50px] opacity-100 mt-2' : 'max-h-0 opacity-0'
        }`}
      >
        <span className="text-[rgba(255,255,255,0.5)] text-[14px]">
          {item.author}
        </span>
      </div>
    </div>
  )
}

const WritingRow = ({ item }: { item: typeof PACKAGES[0] }) => {
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const handleMainClick = () => {
    // Navigate immediately if desktop or if explicitly clicking the main area
    // We want to avoid navigating if the user is trying to interact with the scroll area
    // But since the scroll area is separate, clicking the "row" should navigate.
    navigate(item.path)
  }

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent navigation when clicking the info icon
    setIsExpanded(!isExpanded)
  }

  return (
    <div 
      className="w-full border-b border-[rgba(255,255,255,0.1)] relative overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleMainClick}
    >
      {/* Hover Background Effect */}
      <div 
        className={`absolute inset-0 bg-white/5 transition-transform duration-500 origin-left ${isHovered ? 'scale-x-100' : 'scale-x-0'}`}
      />

      <div className="relative z-10 w-full flex flex-col md:grid md:grid-cols-[1fr_160px_160px_120px_40px] px-4 py-4 md:py-6 md:items-center gap-2 cursor-pointer">
        {/* Mobile Header Row: Title + Info Button */}
        <div className="flex justify-between items-start w-full md:w-auto">
             <div className="flex-1 min-w-0 pr-4">
                <h3 className="text-[17px] md:text-2xl text-white font-light group-hover:pl-2 md:group-hover:pl-4 transition-all duration-300 break-words leading-tight">
                    {item.title}
                </h3>
             </div>
             
             {/* Mobile Only: Info/Expand Button */}
             <button 
                onClick={handleExpandClick}
                className="md:hidden p-2 -mr-2 text-white/40 active:text-white transition-colors"
                aria-label="Show details"
             >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v8M8 12h8" className={`${isExpanded ? 'hidden' : 'block'}`}/>
                    <path d="M8 12h8" className={`${isExpanded ? 'block' : 'hidden'}`}/>
                </svg>
             </button>
        </div>

        {/* Mobile Metadata - Expandable */}
        <div 
            className={`md:hidden w-full overflow-hidden transition-all duration-300 ease-out ${isExpanded ? 'max-h-[100px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}
            onClick={(e) => e.stopPropagation()} // Allow interaction with scroll without triggering nav
        >
            <div className="flex gap-4 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden w-full" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <div className="flex flex-col gap-1 min-w-max border-l-2 border-white/10 pl-3">
                    <span className="text-[10px] text-white/30 uppercase tracking-widest">For</span>
                    <span className="text-sm font-mono text-white/70">{item.for}</span>
                </div>
                <div className="flex flex-col gap-1 min-w-max border-l-2 border-white/10 pl-3">
                    <span className="text-[10px] text-white/30 uppercase tracking-widest">Category</span>
                    <span className="text-sm font-mono text-white/70">{item.category}</span>
                </div>
                <div className="flex flex-col gap-1 min-w-max border-l-2 border-white/10 pl-3">
                    <span className="text-[10px] text-white/30 uppercase tracking-widest">Date</span>
                    <span className="text-sm font-mono text-white/70">{item.date}</span>
                </div>
            </div>
        </div>

        {/* Desktop Metadata */}
        <div className="hidden md:flex justify-end min-w-0">
           <div 
             className="text-[rgba(255,255,255,0.5)] font-mono text-sm break-words text-right max-h-[48px] overflow-y-auto [&::-webkit-scrollbar]:hidden"
             style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
           >
             {item.for}
           </div>
        </div>
        
        <div className="hidden md:flex justify-end min-w-0">
           <div 
             className="text-[rgba(255,255,255,0.5)] font-mono text-sm break-words text-right max-h-[48px] overflow-y-auto [&::-webkit-scrollbar]:hidden"
             style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
           >
             {item.category}
           </div>
        </div>
        
        <div className="hidden md:block text-right text-[rgba(255,255,255,0.5)] font-mono text-sm whitespace-nowrap">
          {item.date}
        </div>
        
        {/* Desktop Arrow Icon */}
        <div className="hidden md:flex justify-end w-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-2">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
             <path d="M5 12H19M19 12L12 5M19 12L12 19" strokeLinecap="round" strokeLinejoin="round"/>
           </svg>
        </div>
      </div>
    </div>
  )
}

const GlitchText = ({ text, className }: { text: string, className?: string }) => {
  const [displayText, setDisplayText] = useState('')
  const audioRef = useRef<HTMLAudioElement | null>(null)
  
  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789Ψ#@$%&'
    let iterations = 0
    const maxIterations = 20 // Total duration base
    
    // Initialize audio
    audioRef.current = new Audio('/audio/matrix.mp3')
    audioRef.current.volume = 0.2 // Lower volume for subtle effect
    
    // Play audio with a slight delay to ensure browser readiness and handle refresh
    const playAudio = async () => {
      try {
        if (audioRef.current) {
          audioRef.current.currentTime = 0
          await audioRef.current.play()
        }
      } catch (e) {
        console.log('Audio play failed:', e)
      }
    }
    
    // Small delay to bypass potential race conditions on refresh
    setTimeout(playAudio, 100)

    const interval = setInterval(() => {
      setDisplayText(
        text.split('').map((char, index) => {
          if (iterations >= maxIterations + (index * 5)) return char
          return chars[Math.floor(Math.random() * chars.length)]
        }).join('')
      )
      
      iterations++
      if (iterations > maxIterations + (text.length * 5)) {
        clearInterval(interval)
        setDisplayText(text)
        // Stop audio when done
        if (audioRef.current) {
          audioRef.current.pause()
          audioRef.current.currentTime = 0
        }
      }
    }, 50)
    
    return () => {
      clearInterval(interval)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }
  }, [text])

  return <h1 className={className}>{displayText}</h1>
}

const ValidationTooltip = ({ message }: { message: string }) => (
  <div className="absolute left-0 -top-12 z-50 animate-fade-in-up pointer-events-none">
    <div className="bg-white text-black px-4 py-2 rounded shadow-lg relative flex items-center gap-3">
       {/* Orange Icon */}
       <div className="w-5 h-5 bg-[#FF9500] rounded flex items-center justify-center text-white font-bold text-xs flex-shrink-0">!</div>
       <span className="text-sm font-medium whitespace-nowrap">{message}</span>
       {/* Arrow */}
       <div className="absolute top-full left-4 border-8 border-transparent border-t-white"></div>
    </div>
  </div>
)

export default function Thinking() {
  const [selectedCategory, setSelectedCategory] = useState('Life Principles')
  const [duration, setDuration] = useState(DURATION_DESKTOP)
  const [expandedPrincipleId, setExpandedPrincipleId] = useState<number | null>(null)
  
  // Form State
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle')
  const [formErrors, setFormErrors] = useState<{ [key: string]: boolean }>({})

  const handleQuoteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus('submitting')
    setFormErrors({})

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    
    // Validation
    const errors: { [key: string]: boolean } = {}
    if (!data.name) errors.name = true
    if (!data.email || !String(data.email).includes('@')) errors.email = true
    if (!data.social) errors.social = true
    if (!data.message) errors.message = true

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      setFormStatus('idle')
      return
    }

    try {
      const response = await fetch('https://formspree.io/f/mankzkrp', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })

      if (response.ok) {
        setFormStatus('success')
        // Reset form after 3 seconds
        setTimeout(() => {
          setFormStatus('idle')
          // Optional: clear form fields if needed, but standard behavior is usually fine
          // If we want to clear, we'd need to control the inputs or reset the form ref
          const form = e.target as HTMLFormElement
          form.reset()
        }, 3000)
      } else {
        console.error('Form submission failed')
        setFormStatus('idle')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setFormStatus('idle')
    }
  }
  
  // ... (rest of the component) ...

  // Handle responsive duration
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setDuration(DURATION_MOBILE)
      } else if (window.innerWidth < 1024) {
        setDuration(DURATION_TABLET)
      } else {
        setDuration(DURATION_DESKTOP)
      }
    }
    
    // Set initial
    handleResize()
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Sort alphabetically (no randomness)
  const sortedInfluences = useMemo(() => {
    return [...INFLUENCES].sort((a, b) => a.localeCompare(b))
  }, [])

  return (
    // Increased top padding from pt-[50px] to pt-[100px]
    <section className="w-full min-h-screen flex flex-col items-center pt-[100px] pb-[60px] relative" aria-label="Thinking">
      
      {/* EDOM Section - Constrained Width but wider for text */}
      <div className="w-full max-w-[1600px] px-[2vw] flex flex-col items-center text-center mb-[120px] animate-fade-in-up">
        <GlitchText 
          text="EDOM" 
          className="font-normal text-white text-[clamp(50px,8vw,80px)] leading-none mb-12 font-['Helvetica']"
        />
        
        <div className="w-full max-w-none px-4 group cursor-default transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]">
          <p className="text-white text-[clamp(18px,2.5vw,22px)] leading-[45px] transition-all duration-300 group-hover:text-white">
            <span className="font-bold">My Philosophy: </span>
            <span className="italic">“Don’t form a character. If you have exclusive characteristics, such as ideologies, religions, behaviors, states form, and even emotions, you become more predictable. This is a defining factor to know if someone exists in the macro-reality.”</span>
          </p>
          <p className="text-white font-normal italic text-[clamp(16px,2vw,20px)] mt-8 transition-all duration-300 group-hover:text-white">
            - Justin Liao, 11.12.25
          </p>
        </div>
      </div>

      {/* Key Influence Section - Full Width */}
      <div className="w-full flex flex-col items-center mb-[150px] font-['Helvetica']">
        <div className="w-full text-center mb-8">
          <h2 className="text-white text-[28px] font-bold inline-block">
            Key Influence
          </h2>
        </div>
        
        {/* Marquee Container - Full Width */}
        <div className="w-full bg-[rgba(var(--theme-rgb),0.2)] py-10 overflow-hidden flex">
          {/* Marquee Track - Two independent tracks for seamless loop */}
          {/* Marquee Track - Single track with duplicated content for seamless loop */}
          <div 
            className="flex whitespace-nowrap items-center animate-marquee-infinite"
            style={{ 
              '--marquee-duration': duration 
            } as React.CSSProperties}
          >
            {/* First set of names */}
            {sortedInfluences.map((name, index) => (
              <span key={`1-${index}`} className="text-white text-[22px] mx-[35px] font-light italic flex-shrink-0">
                {name}
              </span>
            ))}
            {/* Second set of names (duplicate) */}
            {sortedInfluences.map((name, index) => (
              <span key={`2-${index}`} className="text-white text-[22px] mx-[35px] font-light italic flex-shrink-0">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Divider & Carousel Section */}
      <div className="w-full max-w-[1400px] px-[5vw] flex flex-col items-center">
        {/* Divider Line */}
        <div className="w-full h-[1px] bg-[#C9C9C9] mb-[clamp(40px,8vh,80px)]" />

        {/* Carousel Container */}
        <div className="w-full flex flex-col items-center mb-16">
          
          {/* Unified View: Single Item with Arrows */}
          <div className="flex w-full justify-between items-center px-4 max-w-[600px]">
            <button 
              onClick={() => {
                const currentIndex = CATEGORIES.indexOf(selectedCategory)
                const prevIndex = (currentIndex - 1 + CATEGORIES.length) % CATEGORIES.length
                setSelectedCategory(CATEGORIES[prevIndex])
              }}
              className="text-white p-2 hover:opacity-70 transition-opacity"
              aria-label="Previous category"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <h2 className="text-white text-[24px] md:text-[30px] font-normal whitespace-nowrap transition-all duration-300">
              {selectedCategory}
            </h2>

            <button 
              onClick={() => {
                const currentIndex = CATEGORIES.indexOf(selectedCategory)
                const nextIndex = (currentIndex + 1) % CATEGORIES.length
                setSelectedCategory(CATEGORIES[nextIndex])
              }}
              className="text-white p-2 hover:opacity-70 transition-opacity"
              aria-label="Next category"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div 
          key={selectedCategory}
          className="w-full flex flex-col items-center animate-fade-in-up min-h-[200px]"
        >
          
          {/* Writings (Placeholder) */}
          {selectedCategory === 'Writings' && (
            <div className="w-full max-w-[1200px] flex flex-col px-4">
               {/* Header Row (Desktop) */}
               <div className="hidden md:grid grid-cols-[1fr_160px_160px_120px_40px] gap-4 w-full px-4 mb-4 text-[rgba(255,255,255,0.3)] font-mono text-xs uppercase tracking-wider items-center">
                  <div className="pl-1">Title</div>
                  <div className="text-right">For</div>
                  <div className="text-right">Category</div>
                  <div className="text-right">Date</div>
                  <div></div>
               </div>

               {PACKAGES.map((item, idx) => (
                 <WritingRow key={idx} item={item} />
               ))}
               
               {/* Empty State / Coming Soon message below list if needed, or if list is empty */}
               {PACKAGES.length === 0 && (
                  <div className="w-full min-h-[30vh] flex flex-col items-center justify-start text-center pt-12">
                     <p className="text-[rgba(255,255,255,0.5)] font-light">
                        More writings coming soon.
                     </p>
                  </div>
               )}
            </div>
          )}

          {/* Life Principles */}
          {selectedCategory === 'Life Principles' && (
            <div className="w-full max-w-[800px] flex flex-col gap-6">
              <p className="text-[rgba(255,255,255,0.8)] text-[16px] md:text-[18px] text-center mb-8">
                My principles apply to 3 scenarios: 0 = inside the system, 1 = outside the system, Ψ =  all together
              </p>
              {PRINCIPLES.map((principle) => (
                <PrincipleItem 
                  key={principle.id}
                  principle={principle}
                  isExpanded={expandedPrincipleId === principle.id}
                  onToggle={() => setExpandedPrincipleId(expandedPrincipleId === principle.id ? null : principle.id)}
                />
              ))}
              <div className="w-full text-center mt-12 mb-24">
                <p 
                  className="text-[var(--theme-color)] font-['Source_Code_Pro'] text-[18px] md:text-[16px]"
                  style={{ fontWeight: 200 }}
                >
                  justinliao ~ still thinking<ThinkingDots />
                </p>
              </div>
            </div>
          )}

          {/* Quote Section */}
          {selectedCategory === 'Quote' && (
            <div className="w-full max-w-[600px] flex flex-col items-center animate-fade-in-up mb-24">
              <div className="relative w-full min-h-[400px] flex flex-col items-center">
                {/* Success Message Overlay */}
                <div 
                  className={`
                    absolute inset-0 flex items-center justify-center z-20 transition-all duration-500 ease-in-out
                    ${formStatus === 'success' ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95 pointer-events-none'}
                  `}
                >
                  <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-md border border-[var(--theme-color)] rounded-2xl p-8 text-center shadow-[0_0_30px_rgba(var(--theme-rgb),0.3)]">
                    <p className="text-white text-xl font-light">
                      You will get a reply within 24hrs.
                    </p>
                  </div>
                </div>

                {/* Form Content */}
                <div 
                  className={`
                    w-full flex flex-col items-center transition-all duration-500 ease-in-out
                    ${formStatus === 'success' ? 'opacity-0 blur-sm scale-95' : 'opacity-100 blur-0 scale-100'}
                  `}
                >
                  <p className="text-[rgba(255,255,255,0.8)] text-[16px] md:text-[18px] text-center mb-12 leading-relaxed">
                    Tell me your quote of the moment, I will put your name and quote if it's thoughtful.
                  </p>
                  
                  <form
                    onSubmit={handleQuoteSubmit}
                    noValidate
                    className="w-full flex flex-col gap-6 p-8 rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] backdrop-blur-md shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
                  >
                    {/* Name Field */}
                    <div className="flex flex-col gap-2 relative group">
                      <label htmlFor="name" className="text-white/80 text-sm font-light ml-1">Name</label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        required
                        className={`w-full bg-[rgba(255,255,255,0.05)] border rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-1 transition-all duration-300 ${formErrors.name ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-[rgba(255,255,255,0.1)] focus:border-[var(--theme-color)] focus:ring-[var(--theme-color)]'}`}
                        placeholder="Your name"
                      />
                      {formErrors.name && <ValidationTooltip message="Please fill out this field." />}
                    </div>

                    {/* Email Field */}
                    <div className="flex flex-col gap-2 relative group">
                      <label htmlFor="email" className="text-white/80 text-sm font-light ml-1">Email</label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        className={`w-full bg-[rgba(255,255,255,0.05)] border rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-1 transition-all duration-300 ${formErrors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-[rgba(255,255,255,0.1)] focus:border-[var(--theme-color)] focus:ring-[var(--theme-color)]'}`}
                        placeholder="your@email.com"
                      />
                      {formErrors.email && <ValidationTooltip message="Please enter a valid email." />}
                    </div>

                    {/* LinkedIn or X Field */}
                    <div className="flex flex-col gap-2 relative group">
                      <label htmlFor="social" className="text-white/80 text-sm font-light ml-1">LinkedIn or X</label>
                      <input
                        id="social"
                        type="text"
                        name="social"
                        required
                        className={`w-full bg-[rgba(255,255,255,0.05)] border rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-1 transition-all duration-300 ${formErrors.social ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-[rgba(255,255,255,0.1)] focus:border-[var(--theme-color)] focus:ring-[var(--theme-color)]'}`}
                        placeholder="Your profile URL or handle"
                      />
                      {formErrors.social && <ValidationTooltip message="Please fill out this field." />}
                    </div>

                    {/* Quote Field */}
                    <div className="flex flex-col gap-2 relative group">
                      <label htmlFor="message" className="text-white/80 text-sm font-light ml-1">Your Quote</label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        className={`w-full bg-[rgba(255,255,255,0.05)] border rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-1 transition-all duration-300 resize-none ${formErrors.message ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-[rgba(255,255,255,0.1)] focus:border-[var(--theme-color)] focus:ring-[var(--theme-color)]'}`}
                        placeholder="Share your thought..."
                      ></textarea>
                      {formErrors.message && <ValidationTooltip message="Please fill out this field." />}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="mt-4 w-full py-3 px-6 bg-[rgba(255,255,255,0.1)] hover:bg-[var(--theme-color)] text-white font-normal rounded-lg transition-all duration-300 border border-[rgba(255,255,255,0.1)] hover:border-transparent hover:shadow-[0_0_15px_rgba(var(--theme-rgb),0.5)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {formStatus === 'submitting' ? 'Sending...' : 'Send Quote'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Inspirations */}
          {selectedCategory === 'Inspirations' && (
            <div className="w-full max-w-[800px] mb-24">
              <p className="text-[rgba(255,255,255,0.8)] text-[16px] md:text-[18px] text-center mb-8">
                These are a list of books and articles that I find inspiring, updating weekly.
              </p>
              <div className="flex flex-col gap-y-16">
                {Object.entries(INSPIRATIONS).map(([category, items]) => (
                  <div key={category} className="flex flex-col gap-6 items-center text-center">
                    <h3 className="text-[var(--theme-color)] text-[26px] md:text-[28px] font-normal border-b border-[rgba(var(--theme-rgb),0.3)] pb-2 inline-block w-fit">
                      {category}
                    </h3>
                    <div className="flex flex-col gap-8 w-full items-center">
                      {[...items].sort((a, b) => a.title.localeCompare(b.title)).map((item, idx) => (
                        <InspirationItem key={idx} item={item} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}

