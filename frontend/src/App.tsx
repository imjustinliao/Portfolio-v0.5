import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import Home from './pages/Home'
import About from './pages/About'
import Arts from './pages/Arts'
import Thinking from './pages/Thinking'
import WIT from './pages/writings/WIT'
import SettingsOverlay from './components/SettingsOverlay'
import { SettingsProvider } from './context/SettingsContext'
import { useAudioPreloader } from './hooks/useAudioPreloader'

function ScrollToTop() {
  const { pathname } = useLocation()
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])
  
  return null
}

export default function App() {
  useAudioPreloader()
  const location = useLocation()
  const isThinkingPage = location.pathname === '/thinking'
  const isArtsPage = location.pathname === '/arts'

  // Arts page has its own layout (own navbar, no footer)
  if (isArtsPage) {
    return (
      <SettingsProvider>
        <div className="site-wrapper">
          <CustomCursor />
          <ScrollToTop />
          <Routes>
            <Route path="/arts" element={<Arts />} />
          </Routes>
        </div>
      </SettingsProvider>
    )
  }

  return (
    <SettingsProvider>
      <div className="site-wrapper">
        <CustomCursor />
        <ScrollToTop />
        <Navbar />
        <main className={isThinkingPage ? '!p-0 !w-full !max-w-none' : ''}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/thinking" element={<Thinking />} />
            <Route path="/writings/WIT" element={<WIT />} />
          </Routes>
          <Footer />
        </main>
        <SettingsOverlay />
      </div>
    </SettingsProvider>
  )
}
