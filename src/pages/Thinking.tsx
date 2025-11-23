import { useMemo, useState, useEffect, useRef } from 'react'

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
  "Napolean Hill", "Jordan B. Peterson", "Donald Trump", "Rachel Lou", 
  "Sean Imoto", "Daniil Morozov", "Josh Monsalvatge", "James Floyd", "Roy Lee", 
  "Keli G.", "Abraham Guan", "Ehud Halberstam", "David Lee", "John D. Rockefeller", 
  "Richard Branson", "Warren Buffett", "Albert Einstein", "Mike Tyson", 
  "Friedrich Nietzsche", "Henry Ford", "Richard Feynman", "Ray Dalio", 
  "Jack Wu", "Swanand Wagh", "Jamie Dimon", "Kelly Huang", "Malaika Khan", 
  "Yannis Paniaras", "Dale Carnegie", "Aaron Levie"
]

const CATEGORIES = ['Writings', 'Life Principles', 'Inspirations']

// DATA: LIFE PRINCIPLES
const PRINCIPLES = [
  { id: 1, title: "Think without constraint.", description: "Whether it’s ideology, politics, philosophy, legislation, religion, society, and even emotions, they are all considered mind-constraining. You must continuously break out endless system of constraints to get closer to the truth. The entire universe is never known, and the humanity has been redefining constraints to make sense of themselves, which is how we move forward.", scenario: 'Ψ' },
  { id: 2, title: "Life is about discovery.", description: "Everything that we do in life has been about the exchange of information, or at its core, discovering new things. Throughout human history, we advance our civilization through self-discovery: knowledge, relationships, communication, action, and reaction. Human are inherently curious about how the universe, including ourselves, changes after some form of experimentations.", scenario: 'Ψ' },
  { id: 3, title: "Always act in high-delta state.", description: "Whenever you try to do something, such as blinking your eyes or screaming in the park, you are trying to discover some kind of reactions. As we advance our civilization, the contextual impact must be large enough to cause a change. Every single action serves a purpose, which has its own delta, bad or good, big or small. It’s like a spring, small changes stay the same, only big changes can move forward and create new discovery.", scenario: 'Ψ' },
  { id: 4, title: "Defy the odds.", description: "Life is too short to live in someone else’s dogma. Most people follow norms because they care more about others’ opinions than their own. They want to feel belonged to part of the society, which is a sign of low self-respect. Those who thrive in life constantly challenge the status quo to pursue their own reality.", scenario: '0' },
  { id: 5, title: "Be yourself, not literally.", description: "Most people think, act, and react like others just to fit in. They often have a miserable life that has no purpose, passion, and goals. They are genuinely lost because they care about the perception of others. Life become so much happier when you truly focus on yourself. In fact, people prefer to stay with people who are being themselves, as it shows confidence and excitements. In a sense, being yourself means to become unpredictable because only you get to know what’s next.", scenario: '0' },
  { id: 6, title: "Don’t take people’s advice.", description: "I always have a rule of listening to multiple perspectives while forming your core view, and based on your unique situation, apply what fits. We all have to deal with different circumstances, and there’s no single piece of advice or formula that works for everyone.", scenario: 'Ψ' },
  { id: 7, title: "Empathy over sympathy.", description: "People without self-awareness are easily manipulated through emotions, which can be detrimental to their own believes. You must stay firm in your own belief to protect yourself from getting lost while improving the system as a whole. Understanding others’ perspectives allows you to decipher how they work, giving you advantages in relationships, information, and predictability.", scenario: '0' },
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
    { title: "Prediction: the successor to postmodernism", author: "Alex Danco", type: "Article" }
  ],
  "Life": [
    { title: "Atomic Habits", author: "James Clear", type: "Book" },
    { title: "The Daily Stoic", author: "Ryan Holiday", type: "Book" },
    { title: "What I Wish Someone Had Told Me", author: "Sam Altman", type: "Article" }
  ],
  "Tech": [
    { title: "Abundant Intelligence", author: "Sam Altman", type: "Article" }
  ],
  "Design": [
    { title: "The Creative Act", author: "Rick Rubin", type: "Book" },
    { title: "ZAHA HADID", author: "Philip Jodidio", type: "Book" },
    { title: "The Designer's Dictionary of Color", author: "Sean Adams", type: "Book" }
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
        className={`absolute inset-0 bg-gradient-to-t from-[#92C3FF]/10 to-transparent transition-transform duration-500 ease-out origin-bottom ${isHovered ? 'scale-y-100' : 'scale-y-0'}`}
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
    
    // Play audio
    audioRef.current.play().catch(e => console.log('Audio play failed:', e))

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

export default function Thinking() {
  const [selectedCategory, setSelectedCategory] = useState('Life Principles')
  const [duration, setDuration] = useState(DURATION_DESKTOP)
  const [expandedPrincipleId, setExpandedPrincipleId] = useState<number | null>(null)
  
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
        <div className="w-full bg-[rgba(146,195,255,0.2)] py-10 overflow-hidden flex">
          {/* Marquee Track - Two independent tracks for seamless loop */}
          <div 
            className="flex whitespace-nowrap min-w-full items-center"
            style={{ 
              '--marquee-duration': duration 
            } as React.CSSProperties}
          >
            <div className="flex min-w-full animate-marquee items-center flex-shrink-0">
              {sortedInfluences.map((name, index) => (
                <span key={`1-${index}`} className="text-white text-[22px] mx-[35px] font-light italic">
                  {name}
                </span>
              ))}
            </div>
            <div className="flex min-w-full animate-marquee items-center flex-shrink-0">
              {sortedInfluences.map((name, index) => (
                <span key={`2-${index}`} className="text-white text-[22px] mx-[35px] font-light italic">
                  {name}
                </span>
              ))}
            </div>
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
            <div className="w-full min-h-[30vh] flex flex-col items-center justify-start text-center px-4">
              <h2 className="text-[clamp(40px,5vw,60px)] font-light text-white mb-8 animate-text-pulse-glow tracking-wide">
                Coming soon.
              </h2>
              <p className="text-[clamp(16px,1.5vw,20px)] text-[#C9C9C9] font-light max-w-[600px] leading-relaxed">
                I'm gathering my thoughts across multiple domains and sources. I will also release my exclusive newsletter soon. 
              </p>
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
                  className="text-[#92C3FF] font-['Source_Code_Pro'] text-[18px] md:text-[16px]"
                  style={{ fontWeight: 200 }}
                >
                  justinliao ~ still thinking<ThinkingDots />
                </p>
              </div>
            </div>
          )}

          {/* Inspirations */}
          {selectedCategory === 'Inspirations' && (
            <div className="w-full max-w-[800px]">
              <p className="text-[rgba(255,255,255,0.8)] text-[16px] md:text-[18px] text-center mb-8">
                These are a list of books and articles that I find inspiring: weekly updates.
              </p>
              <div className="flex flex-col gap-y-16">
                {Object.entries(INSPIRATIONS).map(([category, items]) => (
                  <div key={category} className="flex flex-col gap-6 items-center text-center">
                    <h3 className="text-[#92C3FF] text-[26px] md:text-[28px] font-normal border-b border-[rgba(146,195,255,0.3)] pb-2 inline-block w-fit">
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

