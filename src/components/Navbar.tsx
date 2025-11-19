import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router-dom'

interface NavLink {
  href: string
  label: string
}

const navLinks: NavLink[] = [
  { href: '/about', label: 'About' },
  { href: '/thinking', label: 'Thinking' },
]

const menuLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  ...navLinks,
]

const normalizePath = (value: string): string => {
  if (!value) return '/'
  if (value === '/') return '/'
  return value.endsWith('/') ? value.slice(0, -1) : value
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const location = useLocation()
  const currentPath = normalizePath(location.pathname)
  const baseUrl = import.meta.env.BASE_URL

  useEffect(() => {
    // Only close menu on resize if width changes significantly (orientation change or desktop resize)
    // This prevents closing on mobile scroll (address bar resize)
    let lastWidth = window.innerWidth
    
    const handleResize = () => {
      const currentWidth = window.innerWidth
      if (Math.abs(currentWidth - lastWidth) > 50) {
        setIsMenuOpen(false)
        lastWidth = currentWidth
      }
    }

    const handleScroll = () => {
      // If menu is open, don't process scroll events for navbar hiding
      if (isMenuOpen) return

      const currentScrollY = window.scrollY
      
      // Only trigger if we've scrolled more than 10px to avoid jitter
      if (Math.abs(currentScrollY - lastScrollY) > 10) {
        if (currentScrollY > lastScrollY && currentScrollY > 50) {
          // Scrolling down and past threshold
          setIsScrolled(true)
        } else if (currentScrollY < lastScrollY) {
          // Scrolling up
          setIsScrolled(false)
        }
        setLastScrollY(currentScrollY)
      }
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY, isMenuOpen])

  const closeMenu = () => setIsMenuOpen(false)
  const toggleMenu = () => setIsMenuOpen((prev) => !prev)

  return (
    <header className="sticky top-0 z-10 w-full flex justify-center bg-transparent pointer-events-none">
      <div 
        className={`
          pointer-events-auto
          relative flex items-center justify-between w-full mx-auto pl-[3vw] pr-[3vw] min-[901px]:pr-0 
          backdrop-blur-[8px] 
          before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:via-[rgba(0,0,0,0.2)] before:to-[rgba(255,255,255,0.2)] before:z-0
          transition-all duration-500 ease-in-out
          ${isScrolled ? 'h-[60px]' : 'h-[clamp(60px,8vh,90px)]'}
        `}
      >
        {/* Continuous Glowing Bottom Border */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20 block"></div>
        
        {/* Brand Section - Ghost Element to maintain layout */}
        <div className="inline-flex items-center gap-[clamp(16px,2vw,28px)] py-[10px] opacity-0 pointer-events-none select-none" aria-hidden="true">
          <span className="text-[clamp(23px,3vw,27px)] font-semibold tracking-[0.04em] leading-none">Justin Liao</span>
          <span className="text-[clamp(15px,2vw,17px)] font-normal leading-[1.2] tracking-[0.02em] max-[900px]:hidden">
            <span className="font-bold mr-1">Tech</span>
            Designer | Philosopher
          </span>
        </div>

        {/* Brand Section - Actual Animated Element */}
        <div 
          className={`
            absolute top-1/2 -translate-y-1/2 z-[20]
            inline-flex items-center gap-[clamp(16px,2vw,28px)] py-[10px]
            transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1)
            ${isScrolled 
              ? 'left-1/2 -translate-x-1/2' 
              : 'left-[3vw]'
            }
          `}
          onClick={closeMenu}
        >
          <Link 
            to="/" 
            className="text-[clamp(23px,3vw,27px)] font-semibold text-white tracking-[0.04em] leading-none no-underline outline-none drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
          >
            Justin Liao
          </Link>
          <span 
            className={`
              text-[clamp(15px,2vw,17px)] font-normal text-[#d9d9d9] leading-[1.2] tracking-[0.02em] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] max-[900px]:hidden
              transition-all duration-700 ease-in-out origin-left
              ${isScrolled ? 'opacity-0 w-0 scale-x-0 overflow-hidden' : 'opacity-100 w-auto scale-x-100'}
            `}
          >
            <span className="font-bold text-white mr-1 drop-shadow-[inherit]">Tech</span>
            Designer | Philosopher
          </span>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4 sm:gap-6 h-full">
          {/* Desktop Navigation Links */}
          <nav 
            className={`
              flex items-center gap-[27px] relative z-[1] max-[900px]:hidden
              transition-all duration-300 ease-in-out
              ${isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}
            `}
            aria-label="Primary"
          >
            {navLinks.map((link) => {
              const isActive = currentPath === normalizePath(link.href)
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`group relative no-underline text-xl font-normal text-white leading-none transition-opacity duration-[250ms] ease-in-out drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] outline-none hover:opacity-100 hover:drop-shadow-[0_0_4px_rgba(255,255,255,0.5)] focus-visible:opacity-100 focus-visible:drop-shadow-[0_0_4px_rgba(255,255,255,0.5)] ${
                    isActive ? 'font-normal drop-shadow-[0_0_4px_rgba(255,255,255,0.55)]' : ''
                  }`}
                >
                  {link.label}
                  <span className={`absolute left-0 -bottom-1 h-[1px] bg-white transition-all duration-300 ease-out ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </Link>
              )
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className={`
              hidden items-center justify-center border-none bg-transparent p-0 cursor-pointer relative z-[1] max-[900px]:flex flex-shrink-0
              transition-all duration-300 ease-in-out
              ${isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}
            `}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={toggleMenu}
          >
            <img
              src={`${baseUrl}UI/Menu Icon.svg`}
              alt=""
              width={30}
              height={30}
              aria-hidden="true"
              className="w-[30px] h-[30px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex-shrink-0"
            />
          </button>

          {/* Reunify Labs Logo */}
          <a
            className={`
              h-[calc(100%-1px)] aspect-square flex-shrink-0 flex items-center justify-center relative bg-gradient-to-br from-[rgba(255,255,255,0.1)] to-[rgba(80,80,80,0.04)] backdrop-blur-[18px] backdrop-saturate-[140%] shadow-[inset_0_0_25px_rgba(0,0,0,0.4)] no-underline outline-none hover:shadow-[inset_0_0_25px_rgba(0,0,0,0.4),0_0_4px_rgba(255,255,255,0.5)] focus-visible:shadow-[inset_0_0_25px_rgba(0,0,0,0.4),0_0_4px_rgba(255,255,255,0.5)] max-[900px]:hidden
              transition-all duration-300 ease-in-out
              ${isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}
            `}
            href="https://reunifylabs.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Reunify Labs"
          >
            <div className="relative w-full h-full rounded-[10px] flex items-center justify-center overflow-hidden p-3 bg-[rgba(255, 255, 255, 0)] shadow-[inset_0_0_12px_rgba(0,0,0,0.15),0_10px_20px_rgba(0,0,0,0.25)]">
              <img 
                src={`${baseUrl}UI/rw.svg`}
                alt="Reunify Labs logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </a>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && createPortal(
          <div 
            className="fixed inset-0 w-full h-screen flex flex-col justify-start items-center pt-24 px-6 pb-8 bg-gradient-to-br from-[rgba(0,0,0,0.2)] to-[rgba(33,33,33,0.35)] backdrop-blur-[15px] backdrop-saturate-[190%] backdrop-contrast-[110%] shadow-[inset_0_0_70px_rgba(0,0,0,0.8)] z-[7999] border border-[rgba(255,255,255,0.12)] before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_25%_18%,rgba(255,255,255,0.25),transparent_58%),radial-gradient(circle_at_70%_10%,rgba(255,255,255,0.12),transparent_45%)] before:pointer-events-none"
            role="dialog"
            aria-modal="true"
            // Prevent clicks inside the menu from closing it (unless it's a link)
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute top-7 right-6 border-none bg-transparent text-[28px] text-[rgba(255,255,255,0.8)] cursor-pointer p-0 leading-none"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              ×
            </button>
            
            <div className="w-full max-w-[320px] flex flex-col gap-5 items-center">
              {menuLinks.map((link) => {
                const isActive = currentPath === normalizePath(link.href)
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`group relative no-underline text-[25px] font-[350] text-center drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:opacity-75 focus-visible:opacity-75 ${
                      isActive 
                        ? 'text-white font-normal' 
                        : 'text-[rgba(255,255,255,0.7)]'
                    }`}
                    onClick={closeMenu}
                    role="menuitem"
                  >
                    {link.label}
                    {/* Underline only on desktop/tablet, hidden on mobile */}
                    <span className={`hidden md:block absolute left-0 -bottom-1.5 h-[1px] bg-white transition-all duration-300 ease-out ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                  </Link>
                )
              })}
            </div>
            
            <a
              className="mt-[35px] inline-flex items-center gap-3 py-[15px] px-[30px] rounded-full bg-[rgba(255,255,255,0.9)] text-[#000c2c] text-xl font-semibold no-underline tracking-[0.05em] shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
              href="https://reunifylabs.com"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={`${baseUrl}UI/r.svg`}
                alt=""
                className="w-7 h-7 object-contain"
                aria-hidden="true"
              />
              <span className="text-lg font-semibold text-[#000c2c]">
                Reunify Labs
              </span>
            </a>
          </div>,
          document.body
        )}
      </div>
    </header>
  )
}

