import React, { createContext, useContext, useEffect, useState, useRef } from 'react'

interface TimerState {
  duration: number // in seconds
  remaining: number // in seconds
  isRunning: boolean
  endTime?: number // timestamp in milliseconds
}

interface SettingsContextType {
  isSettingsOpen: boolean
  openSettings: () => void
  closeSettings: () => void
  themeColor: string
  setThemeColor: (color: string) => void
  resetThemeColor: () => void
  timer: TimerState
  setTimer: React.Dispatch<React.SetStateAction<TimerState>>
  activeTab: 'TIME' | 'THEME'
  setActiveTab: (tab: 'TIME' | 'THEME') => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export const useSettings = () => {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}

const DEFAULT_THEME_COLOR = '#92C3FF'
const DEFAULT_TIMER_DURATION = 15 * 60 // 15 minutes

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [themeColor, setThemeColorState] = useState(DEFAULT_THEME_COLOR)
  const [activeTab, setActiveTab] = useState<'TIME' | 'THEME'>('TIME')
  
  const [timer, setTimer] = useState<TimerState>({
    duration: DEFAULT_TIMER_DURATION,
    remaining: DEFAULT_TIMER_DURATION,
    isRunning: false,
  })

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const timerIntervalRef = useRef<number | null>(null)

  // Initialize Audio
  useEffect(() => {
    audioRef.current = new Audio('/audio/alarmsound.m4a')
    audioRef.current.loop = true
  }, [])

  // Load saved settings
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme_color')
    if (savedTheme) {
      setThemeColorState(savedTheme)
      document.documentElement.style.setProperty('--theme-color', savedTheme)
      const r = parseInt(savedTheme.slice(1, 3), 16)
      const g = parseInt(savedTheme.slice(3, 5), 16)
      const b = parseInt(savedTheme.slice(5, 7), 16)
      document.documentElement.style.setProperty('--theme-rgb', `${r}, ${g}, ${b}`)
    } else {
      document.documentElement.style.setProperty('--theme-color', DEFAULT_THEME_COLOR)
      document.documentElement.style.setProperty('--theme-rgb', '146, 195, 255')
    }

    const savedTab = localStorage.getItem('settings_active_tab') as 'TIME' | 'THEME'
    if (savedTab) {
      setActiveTab(savedTab)
    }

    // Load Timer State
    const savedTimer = localStorage.getItem('timer_state')
    if (savedTimer) {
      const parsedTimer = JSON.parse(savedTimer)
      
      if (parsedTimer.isRunning && parsedTimer.endTime) {
        const now = Date.now()
        const remaining = Math.max(0, Math.ceil((parsedTimer.endTime - now) / 1000))
        
        if (remaining > 0) {
          setTimer({
            ...parsedTimer,
            remaining,
            isRunning: true
          })
        } else {
          // Timer finished while away
          setTimer({
            ...parsedTimer,
            remaining: 0,
            isRunning: false
          })
          // We'll let the finish effect handle the sound/open
        }
      } else {
        // Paused state
        setTimer(parsedTimer)
      }
    }
  }, [])

  // Save Timer State whenever it changes
  useEffect(() => {
    localStorage.setItem('timer_state', JSON.stringify(timer))
  }, [timer])

  // Update Theme Color
  const setThemeColor = (color: string) => {
    setThemeColorState(color)
    localStorage.setItem('theme_color', color)
    document.documentElement.style.setProperty('--theme-color', color)
    
    // Calculate and set RGB values for opacity support
    const r = parseInt(color.slice(1, 3), 16)
    const g = parseInt(color.slice(3, 5), 16)
    const b = parseInt(color.slice(5, 7), 16)
    document.documentElement.style.setProperty('--theme-rgb', `${r}, ${g}, ${b}`)
  }

  const resetThemeColor = () => {
    setThemeColor(DEFAULT_THEME_COLOR)
  }

  // Update Active Tab
  const handleSetActiveTab = (tab: 'TIME' | 'THEME') => {
    setActiveTab(tab)
    localStorage.setItem('settings_active_tab', tab)
  }

  // Timer Logic
  useEffect(() => {
    if (timer.isRunning && timer.remaining > 0) {
      // If we just started (or resumed) and don't have an endTime, set it
      if (!timer.endTime) {
        const endTime = Date.now() + (timer.remaining * 1000)
        setTimer(prev => ({ ...prev, endTime }))
      }

      timerIntervalRef.current = window.setInterval(() => {
        setTimer((prev) => {
          // Recalculate remaining based on endTime to be accurate despite drift/background throttling
          if (prev.endTime) {
             const now = Date.now()
             const remaining = Math.max(0, Math.ceil((prev.endTime - now) / 1000))
             
             if (remaining <= 0) {
               if (timerIntervalRef.current) clearInterval(timerIntervalRef.current)
               return { ...prev, remaining: 0, isRunning: false, endTime: undefined }
             }
             return { ...prev, remaining }
          }
          
          // Fallback if no endTime (shouldn't happen with new logic)
          if (prev.remaining <= 1) {
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current)
            return { ...prev, remaining: 0, isRunning: false }
          }
          return { ...prev, remaining: prev.remaining - 1 }
        })
      }, 1000)
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current)
      // If paused, clear endTime so it resets on resume
      if (!timer.isRunning && timer.endTime) {
         setTimer(prev => ({ ...prev, endTime: undefined }))
      }
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current)
    }
  }, [timer.isRunning, timer.endTime]) // Added timer.endTime dependency

  // Timer Finished Effect - Open overlay
  useEffect(() => {
    if (timer.remaining === 0 && !timer.isRunning && timer.duration > 0 && !isSettingsOpen) {
      // Timer just finished while overlay was closed
      setIsSettingsOpen(true)
    }
  }, [timer.remaining, timer.isRunning, timer.duration, isSettingsOpen])

  // Audio management based on ringing state
  useEffect(() => {
    const shouldBeRinging = timer.remaining === 0 && !timer.isRunning && timer.duration > 0 && isSettingsOpen
    
    if (shouldBeRinging) {
      // Start ringing
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch(e => console.error("Audio play failed", e))
      }
    } else {
      // Stop ringing
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }
  }, [isSettingsOpen, timer.remaining, timer.isRunning, timer.duration])

  const openSettings = () => setIsSettingsOpen(true)
  const closeSettings = () => {
    setIsSettingsOpen(false)
    // If timer was finished (playing sound), reset it when closing
    if (timer.remaining === 0) {
       setTimer(prev => ({ ...prev, remaining: prev.duration, isRunning: false }))
    }
  }

  return (
    <SettingsContext.Provider
      value={{
        isSettingsOpen,
        openSettings,
        closeSettings,
        themeColor,
        setThemeColor,
        resetThemeColor,
        timer,
        setTimer,
        activeTab,
        setActiveTab: handleSetActiveTab,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}
