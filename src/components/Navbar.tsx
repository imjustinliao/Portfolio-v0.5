import { useEffect, useState } from 'react'
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
  const location = useLocation()
  const currentPath = normalizePath(location.pathname)
  const baseUrl = import.meta.env.BASE_URL

  useEffect(() => {
    const handleResize = () => setIsMenuOpen(false)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const closeMenu = () => setIsMenuOpen(false)
  const toggleMenu = () => setIsMenuOpen((prev) => !prev)

  return (
    <header className="sticky top-0 z-10 w-full flex justify-center bg-transparent">
      <div className="relative flex items-center justify-between w-full h-[75px] mx-auto pl-[30px] border-b border-white backdrop-blur-[8px] before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-[rgba(217,217,217,0.2)] before:via-[rgba(0,0,0,0.2)] before:to-[rgba(255,255,255,0.2)] before:z-0 max-[1024px]:h-[72px] max-[900px]:h-[68px] max-[900px]:gap-3 max-[600px]:h-[62px] max-[600px]:px-[clamp(16px,5vw,26px)]">
        
        {/* Brand Section */}
        <div 
          className="inline-flex items-center gap-[clamp(16px,2vw,28px)] relative z-[1] py-[10px]" 
          onClick={closeMenu}
        >
          <Link 
            to="/" 
            className="text-[27px] font-semibold text-white tracking-[0.04em] leading-none no-underline drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] max-[1024px]:text-[25px] max-[600px]:text-[23px]"
          >
            Justin Liao
          </Link>
          <span className="text-[17px] font-normal text-[#d9d9d9] leading-[1.2] tracking-[0.02em] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] max-[1024px]:text-base max-[900px]:hidden">
            <span className="font-bold text-white mr-1 drop-shadow-[inherit]">Tech</span>
            Designer | Philosopher
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav 
          className="flex items-center gap-[27px] relative z-[1] max-[900px]:hidden" 
          aria-label="Primary"
        >
          {navLinks.map((link) => {
            const isActive = currentPath === normalizePath(link.href)
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`no-underline text-xl font-normal text-white leading-none transition-opacity duration-[250ms] ease-in-out drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:opacity-100 hover:drop-shadow-[0_0_4px_rgba(255,255,255,0.5)] focus-visible:opacity-100 focus-visible:drop-shadow-[0_0_4px_rgba(255,255,255,0.5)] ${
                  isActive ? 'font-normal drop-shadow-[0_0_4px_rgba(255,255,255,0.55)]' : ''
                }`}
              >
                {link.label}
              </Link>
            )
          })}
          
          {/* Reunify Labs Logo */}
          <a
            className="w-[75px] h-[calc(75px-1px)] ml-3 flex-shrink-0 flex items-center justify-center relative bg-gradient-to-br from-[rgba(255,255,255,0.1)] to-[rgba(80,80,80,0.04)] border-l border-[rgba(255,255,255,0.35)] backdrop-blur-[18px] backdrop-saturate-[140%] shadow-[inset_0_0_25px_rgba(0,0,0,0.4)] no-underline hover:shadow-[inset_0_0_25px_rgba(0,0,0,0.4),0_0_4px_rgba(255,255,255,0.5)] focus-visible:shadow-[inset_0_0_25px_rgba(0,0,0,0.4),0_0_4px_rgba(255,255,255,0.5)] max-[1024px]:w-[72px] max-[1024px]:h-[calc(72px-1px)] max-[900px]:w-[68px] max-[900px]:h-[calc(68px-1px)] max-[600px]:w-[62px] max-[600px]:h-[calc(62px-1px)]"
            href="https://reunifylabs.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Reunify Labs"
          >
            <div className="relative w-[calc(75px-28px)] h-[calc(75px-28px)] rounded-[10px] flex items-center justify-center overflow-hidden p-2 bg-[rgba(255,255,255,0.92)] shadow-[inset_0_0_12px_rgba(0,0,0,0.15),0_10px_20px_rgba(0,0,0,0.25)] max-[1024px]:w-[calc(72px-28px)] max-[1024px]:h-[calc(72px-28px)] max-[900px]:w-[calc(68px-28px)] max-[900px]:h-[calc(68px-28px)] max-[600px]:w-[calc(62px-28px)] max-[600px]:h-[calc(62px-28px)]">
              <img 
                src={`${baseUrl}UI/rw.svg`}
                alt="Reunify Labs logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className={`hidden items-center justify-center border-none bg-transparent p-0 cursor-pointer max-[900px]:flex`}
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
            className="w-[30px] h-[30px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
          />
        </button>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div 
            className="fixed inset-0 w-full h-screen flex flex-col justify-start items-center pt-24 px-6 pb-8 bg-gradient-to-br from-[rgba(0,0,0,0.85)] to-[rgba(33,33,33,0.5)] backdrop-blur-[45px] backdrop-saturate-[190%] backdrop-contrast-[110%] shadow-[inset_0_0_70px_rgba(0,0,0,0.8)] z-[30] border border-[rgba(255,255,255,0.12)] before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_25%_18%,rgba(255,255,255,0.25),transparent_58%),radial-gradient(circle_at_70%_10%,rgba(255,255,255,0.12),transparent_45%)] before:pointer-events-none"
            role="dialog"
            aria-modal="true"
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
                    className={`no-underline text-[25px] font-[350] text-center drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:opacity-75 focus-visible:opacity-75 ${
                      isActive 
                        ? 'text-white font-normal' 
                        : 'text-[rgba(255,255,255,0.7)]'
                    }`}
                    onClick={closeMenu}
                    role="menuitem"
                  >
                    {link.label}
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
                width={28}
                height={28}
                aria-hidden="true"
              />
              <span className="text-lg font-semibold text-[#000c2c]">
                Reunify Labs
              </span>
            </a>
          </div>
        )}
      </div>
    </header>
  )
}

