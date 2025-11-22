import { useMemo, useState, useEffect } from 'react'

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
  "Yannis Paniaras", "Dale Carnegie"
]

const CATEGORIES = ['Writings', 'Life Principles', 'Inspirations']

// --- DATA: LIFE PRINCIPLES ---
const PRINCIPLES = [
  { id: 1, title: "First Principles Thinking", description: "Break down complicated problems into basic elements and then reassemble them from the ground up. Avoid reasoning by analogy." },
  { id: 2, title: "High Agency", description: "When told something is impossible, look for a way to make it possible. Take control of your circumstances rather than being controlled by them." },
  { id: 3, title: "Extreme Ownership", description: "Take full responsibility for everything in your world. No excuses, no blame. Own the problems and the solutions." },
  { id: 4, title: "Compound Interest", description: "Understand that small, consistent actions over time lead to massive results. This applies to knowledge, relationships, and health, not just finance." },
  { id: 5, title: "Skin in the Game", description: "Don't trust advice from people who don't share the risk. Ensure your incentives are aligned with your actions and beliefs." },
  { id: 6, title: "Antifragility", description: "Build systems and mindsets that benefit from shocks and volatility, rather than just withstanding them." },
  { id: 7, title: "Inversion", description: "Instead of trying to be smart, avoid being stupid. Solve problems backwards to avoid failure modes." },
  { id: 8, title: "Circle of Competence", description: "Know what you know and what you don't know. Stick to your strengths and expand them slowly." },
  { id: 9, title: "Memento Mori", description: "Remember that you will die. Use this realization to prioritize what truly matters and live with urgency." },
  { id: 10, title: "Amor Fati", description: "Love your fate. Accept everything that happens, good or bad, as necessary and essential to your journey." }
]

// --- DATA: INSPIRATIONS ---
const INSPIRATIONS = {
  "Startup": [
    { title: "Zero to One", author: "Peter Thiel", type: "Book" },
    { title: "The Lean Startup", author: "Eric Ries", type: "Book" },
    { title: "How to Start a Startup", author: "Sam Altman", type: "Course" },
    { title: "Y Combinator", author: "Paul Graham", type: "Essays" }
  ],
  "Life": [
    { title: "Naval Ravikant", author: "Naval", type: "Podcast" },
    { title: "Meditations", author: "Marcus Aurelius", type: "Book" },
    { title: "The Almanack", author: "Naval Ravikant", type: "Book" },
    { title: "Tim Ferriss Show", author: "Tim Ferriss", type: "Podcast" }
  ],
  "Tech": [
    { title: "Lex Fridman", author: "Lex Fridman", type: "Podcast" },
    { title: "Stratechery", author: "Ben Thompson", type: "Article" },
    { title: "Wait But Why", author: "Tim Urban", type: "Blog" },
    { title: "Hacker News", author: "Y Combinator", type: "Community" }
  ],
  "Arts & Design": [
    { title: "Jony Ive", author: "Leander Kahney", type: "Book" },
    { title: "Abstract", author: "Netflix", type: "Series" },
    { title: "Dieter Rams", author: "Gary Hustwit", type: "Documentary" },
    { title: "Bauhaus", author: "Magdalena Droste", type: "Book" }
  ],
  "People": [
    { title: "Steve Jobs", author: "Walter Isaacson", type: "Book" },
    { title: "Elon Musk", author: "Walter Isaacson", type: "Book" },
    { title: "Benjamin Franklin", author: "Walter Isaacson", type: "Book" },
    { title: "Einstein", author: "Walter Isaacson", type: "Book" }
  ]
}

export default function Thinking() {
  const [selectedCategory, setSelectedCategory] = useState('Life Principles')
  const [duration, setDuration] = useState(DURATION_DESKTOP)
  const [expandedPrincipleId, setExpandedPrincipleId] = useState<number | null>(null)

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
    <section className="w-full min-h-screen flex flex-col items-center pt-[50px] pb-[60px] relative" aria-label="Thinking">
      
      {/* EDOM Section - Constrained Width but wider for text */}
      <div className="w-full max-w-[1600px] px-[2vw] flex flex-col items-center text-center mb-[120px] animate-fade-in-up">
        <h1 className="font-normal text-white text-[clamp(50px,8vw,80px)] leading-none mb-12">
          EDOM
        </h1>
        
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
        <div className="w-full flex flex-col items-center animate-fade-in-up min-h-[200px]">
          
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
              {PRINCIPLES.map((principle) => (
                <div 
                  key={principle.id}
                  className="w-full border-b border-[rgba(255,255,255,0.1)] pb-6 last:border-none"
                >
                  <button 
                    onClick={() => setExpandedPrincipleId(expandedPrincipleId === principle.id ? null : principle.id)}
                    className="w-full flex items-center justify-between group text-left"
                  >
                    <h3 className="text-white text-[20px] md:text-[24px] font-light group-hover:text-[#92C3FF] transition-colors">
                      {principle.id}. {principle.title}
                    </h3>
                    <span className={`text-[#92C3FF] text-2xl transition-transform duration-300 ${expandedPrincipleId === principle.id ? 'rotate-45' : ''}`}>
                      +
                    </span>
                  </button>
                  
                  <div 
                    className={`
                      overflow-hidden transition-all duration-500 ease-in-out
                      ${expandedPrincipleId === principle.id ? 'max-h-[200px] opacity-100 mt-4' : 'max-h-0 opacity-0'}
                    `}
                  >
                    <p className="text-[rgba(255,255,255,0.7)] text-[16px] md:text-[18px] leading-relaxed font-light pl-4 border-l-2 border-[#92C3FF]">
                      {principle.description}
                    </p>
                  </div>
                </div>
              ))}
              <div className="w-full text-center mt-12 mb-8">
                <p className="text-[rgba(255,255,255,0.4)] italic text-sm">
                  Ongoing process...
                </p>
              </div>
            </div>
          )}

          {/* Inspirations */}
          {selectedCategory === 'Inspirations' && (
            <div className="w-full max-w-[1000px] grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              {Object.entries(INSPIRATIONS).map(([category, items]) => (
                <div key={category} className="flex flex-col gap-6 items-center text-center">
                  <h3 className="text-[#92C3FF] text-[24px] font-normal border-b border-[rgba(146,195,255,0.3)] pb-2 inline-block w-fit">
                    {category}
                  </h3>
                  <div className="flex flex-col gap-4 w-full items-center">
                    {items.map((item, idx) => (
                      <div key={idx} className="flex flex-col group cursor-default items-center">
                        <span className="text-white text-[18px] font-light group-hover:text-[#92C3FF] transition-colors">
                          {item.title}
                        </span>
                        <span className="text-[rgba(255,255,255,0.5)] text-[14px] italic">
                          {item.author} • {item.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </section>
  )
}

