import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import Home from './pages/Home'
import About from './pages/About'
import Thinking from './pages/Thinking'

function ScrollToTop() {
  const { pathname } = useLocation()
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])
  
  return null
}

export default function App() {
  const location = useLocation()
  const isThinkingPage = location.pathname === '/thinking'

  return (
    <div className="site-wrapper">
      <CustomCursor />
      <ScrollToTop />
      <Navbar />
      <main className={isThinkingPage ? '!p-0 !w-full !max-w-none' : ''}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/thinking" element={<Thinking />} />
        </Routes>
        <Footer />
      </main>
    </div>
  )
}
