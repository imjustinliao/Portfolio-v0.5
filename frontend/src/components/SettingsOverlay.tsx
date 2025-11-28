import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useSettings } from '../context/SettingsContext'
import EdomChat from './EdomChat'

export default function SettingsOverlay() {
  const { 
    isSettingsOpen, 
    closeSettings, 
    activeTab, 
    setActiveTab, 
    themeColor, 
    setThemeColor, 
    resetThemeColor,
    timer,
    setTimer
  } = useSettings()

  const [timeMode, setTimeMode] = useState<'CLOCK' | 'TIMER'>('CLOCK')
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isAnimating, setIsAnimating] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [tabOpacity, setTabOpacity] = useState(1)

  // Handle open/close animation
  useEffect(() => {
    if (isSettingsOpen) {
      setIsVisible(true)
      setTimeout(() => setIsAnimating(true), 10)
    } else {
      setIsAnimating(false)
      setTimeout(() => setIsVisible(false), 300)
    }
  }, [isSettingsOpen])

  // Clock Logic
  useEffect(() => {
    if (activeTab === 'TIME' && timeMode === 'CLOCK') {
      const interval = setInterval(() => {
        setCurrentTime(new Date())
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [activeTab, timeMode])

  // Timer Input Logic
  const handleTimerChange = (field: 'hours' | 'minutes' | 'seconds', value: string) => {
    const numValue = parseInt(value) || 0
    let newDuration = timer.duration
    
    const hours = Math.floor(newDuration / 3600)
    const minutes = Math.floor((newDuration % 3600) / 60)
    const seconds = newDuration % 60

    if (field === 'hours') newDuration = (numValue * 3600) + (minutes * 60) + seconds
    if (field === 'minutes') newDuration = (hours * 3600) + (numValue * 60) + seconds
    if (field === 'seconds') newDuration = (hours * 3600) + (minutes * 60) + numValue

    setTimer(prev => ({ ...prev, duration: newDuration, remaining: newDuration, isRunning: false }))
  }

  const toggleTimer = () => {
    setTimer(prev => ({ ...prev, isRunning: !prev.isRunning }))
  }

  const handleCancelTimer = () => {
    setTimer(prev => ({ ...prev, remaining: prev.duration, isRunning: false, endTime: undefined }))
  }

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60
    return { 
      h: hours.toString().padStart(2, '0'), 
      m: minutes.toString().padStart(2, '0'), 
      s: seconds.toString().padStart(2, '0') 
    }
  }

  const timerDisplay = formatTime(timer.remaining)

  if (!isVisible) return null

  const TABS: ('TIME' | 'THEME' | 'EDOM')[] = ['TIME', 'THEME', 'EDOM']

  const handleTabChange = (direction: 'prev' | 'next') => {
    setTabOpacity(0)
    setTimeout(() => {
      const currentIndex = TABS.indexOf(activeTab)
      let newIndex
      if (direction === 'next') {
        newIndex = (currentIndex + 1) % TABS.length
      } else {
        newIndex = (currentIndex - 1 + TABS.length) % TABS.length
      }
      setActiveTab(TABS[newIndex])
      setTabOpacity(1)
    }, 200)
  }

  return createPortal(
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-start pt-32 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.9)_85%,rgba(var(--theme-rgb),0.4)_100%)] backdrop-blur-[2px] transition-opacity duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
      onClick={closeSettings}
    >
      {/* Top Controls */}
      <div 
        className="flex items-center gap-8 md:gap-12 mb-12"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={() => handleTabChange('prev')}
          className="text-white hover:opacity-70 transition-opacity p-2 focus:outline-none"
          aria-label="Previous setting"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className="w-[120px] text-center flex justify-center items-center">
          <span className="text-white text-3xl md:text-4xl font-light tracking-widest uppercase select-none transition-opacity duration-200" style={{ opacity: tabOpacity }}>
            {activeTab}
          </span>
        </div>

        <button 
          onClick={() => handleTabChange('next')}
          className="text-white hover:opacity-70 transition-opacity p-2 focus:outline-none"
          aria-label="Next setting"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Content Area */}
      <div 
        className="w-full max-w-4xl px-6 flex flex-col items-center transition-opacity duration-200 ease-in-out"
        style={{ opacity: tabOpacity }}
      >
        {activeTab === 'TIME' && (
          <div className="w-full flex flex-col items-center justify-center p-4">
            <div 
              className="relative w-full max-w-[700px] aspect-[822/422] rounded-[25px] flex flex-col items-center transition-all duration-300"
              style={{
                backgroundColor: 'rgba(215, 215, 215, 0.5)',
                boxShadow: `0 0 clamp(2px, 0.5vw, 4px) clamp(10px, 2.5vw, 20px) rgba(255,255,255,0.25), inset 0 0 clamp(4px, 1vw, 8px) clamp(8px, 2vw, 15px) rgba(255,255,255,0.25)`,
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                padding: 'clamp(20px, 4%, 30px)',
                minHeight: 'clamp(200px, 40vw, 400px)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Row */}
              <div className="w-full flex justify-between items-start z-10 absolute left-0" style={{ top: 'clamp(25px, 5%, 35px)', paddingLeft: 'clamp(15px, 4%, 30px)', paddingRight: 'clamp(15px, 4%, 30px)' }}>
                {/* Date / Deep Focus */}
                <div className="text-white font-normal leading-none" style={{ fontSize: 'clamp(12px, 3vw, 24px)' }}>
                  {timeMode === 'CLOCK' ? (
                    `${currentTime.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}, ${currentTime.getFullYear().toString().slice(-2)}`
                  ) : (
                    "Deep Focus"
                  )}
                </div>

                {/* Switcher */}
                <div className="flex" style={{ gap: 'clamp(6px, 1.2vw, 16px)' }}>
                  {['CLOCK', 'TIMER'].map((mode) => {
                    const isSelected = timeMode === mode
                    return (
                      <button
                        key={mode}
                        onClick={() => setTimeMode(mode as 'CLOCK' | 'TIMER')}
                        className={`
                          flex items-center justify-center
                          font-normal transition-all duration-300
                          ${isSelected 
                            ? 'text-white border border-white' 
                            : 'text-black/25 border border-white/25'
                          }
                        `}
                        style={{
                          width: 'clamp(70px, 14vw, 112px)',
                          height: 'clamp(24px, 5vw, 40px)',
                          borderRadius: 'clamp(12px, 3vw, 25px)',
                          fontSize: 'clamp(10px, 2vw, 16px)',
                          backgroundColor: 'rgba(255, 255, 255, 0.5)',
                          boxShadow: isSelected 
                            ? `0 0 0 clamp(2px, 0.5vw, 4px) rgba(255,255,255,0.25), inset 0 0 0 clamp(2px, 0.5vw, 4px) rgba(255,255,255,0.5)`
                            : `0 0 0 clamp(2px, 0.5vw, 4px) rgba(0,0,0,0.25), inset 0 0 0 clamp(2px, 0.5vw, 4px) rgba(0,0,0,0.25)`
                        }}
                      >
                        {mode === 'CLOCK' ? 'Clock' : 'Timer'}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Center Content Container */}
              <div className="flex-1 w-full flex flex-col items-center justify-center relative" style={{ paddingBottom: 'clamp(50px, 10%, 70px)', paddingTop: 'clamp(50px, 10%, 70px)' }}>
                {/* Time Display */}
                <div className="flex items-center justify-center">
                  {timeMode === 'CLOCK' ? (
                    <div className="font-bold text-white tracking-wide tabular-nums leading-none" style={{ fontSize: 'clamp(28px, 7vw, 96px)' }}>
                      {currentTime.toLocaleTimeString('en-US', { hour12: false })}
                    </div>
                  ) : (
                    <div className="flex items-center font-bold text-white tracking-wide tabular-nums leading-none" style={{ fontSize: 'clamp(28px, 7vw, 96px)', gap: 'clamp(3px, 0.8vw, 16px)' }}>
                      {timer.isRunning ? (
                        <>
                          <span>{timerDisplay.h}</span>
                          <span className="text-white/50">:</span>
                          <span>{timerDisplay.m}</span>
                          <span className="text-white/50">:</span>
                          <span>{timerDisplay.s}</span>
                        </>
                      ) : (
                        <>
                            <input 
                              type="number" 
                              value={timerDisplay.h}
                              onChange={(e) => {
                                const val = parseInt(e.target.value) || 0
                                if (val >= 0 && val <= 23) handleTimerChange('hours', e.target.value)
                              }}
                              onWheel={(e) => e.stopPropagation()}
                              className="bg-transparent text-center w-[1.2em] outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none placeholder-white/30 overscroll-none"
                              style={{ overscrollBehavior: 'none' }}
                            />
                            <span className="text-white/50">:</span>
                            <input 
                              type="number" 
                              value={timerDisplay.m}
                              onChange={(e) => {
                                const val = parseInt(e.target.value) || 0
                                if (val >= 0 && val <= 59) handleTimerChange('minutes', e.target.value)
                              }}
                              onWheel={(e) => e.stopPropagation()}
                              className="bg-transparent text-center w-[1.2em] outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none placeholder-white/30 overscroll-none"
                              style={{ overscrollBehavior: 'none' }}
                            />
                            <span className="text-white/50">:</span>
                            <input 
                              type="number" 
                              value={timerDisplay.s}
                              onChange={(e) => {
                                const val = parseInt(e.target.value) || 0
                                if (val >= 0 && val <= 59) handleTimerChange('seconds', e.target.value)
                              }}
                              onWheel={(e) => e.stopPropagation()}
                              className="bg-transparent text-center w-[1.2em] outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none placeholder-white/30 overscroll-none"
                              style={{ overscrollBehavior: 'none' }}
                            />
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Timer Controls - Positioned at bottom with fixed spacing */}
                {timeMode === 'TIMER' && (
                  <div className="absolute bottom-0 left-0 w-full flex flex-col items-center" style={{ marginBottom: 'clamp(25px, 5%, 35px)' }}>
                    <button
                      onClick={() => {
                        if (timer.remaining === 0 && timer.duration > 0) {
                          handleCancelTimer() // Stop Ringing / Reset
                        } else if (timer.isRunning) {
                          toggleTimer() // Stop
                        } else {
                          toggleTimer() // Start/Continue
                        }
                      }}
                      className={`
                        flex items-center justify-center font-medium transition-all
                        ${timer.isRunning || (timer.remaining === 0 && timer.duration > 0)
                          ? 'bg-black/25' 
                          : 'bg-white text-black'
                        }
                      `}
                      style={{
                        width: 'clamp(100px, 20vw, 162px)',
                        height: 'clamp(24px, 5vw, 40px)',
                        borderRadius: 'clamp(12px, 4vw, 35px)',
                        fontSize: 'clamp(14px, 3vw, 24px)',
                        boxShadow: '0 0 8px 0 rgba(0,0,0,0.25)',
                        color: (timer.remaining === 0 && timer.duration > 0) ? themeColor : (timer.isRunning ? 'white' : 'black')
                      }}
                    >
                      {timer.remaining === 0 && timer.duration > 0 ? 'Cancel' : (timer.isRunning ? 'Stop' : (timer.remaining < timer.duration ? 'Continue' : 'Start'))}
                    </button>

                    {/* Cancel Button (Only when paused/running, NOT ringing) */}
                    {(timer.isRunning || (timer.remaining < timer.duration && timer.remaining > 0)) && (
                      <div className="absolute top-full" style={{ marginTop: 'clamp(4px, 1vw, 8px)' }}>
                        <button
                          onClick={handleCancelTimer}
                          className="font-medium transition-colors hover:opacity-80"
                          style={{ 
                            color: themeColor,
                            fontSize: 'clamp(10px, 2.2vw, 14px)'
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom Quote (Only in Clock Mode) */}
              <div className="w-full text-center z-10 absolute left-0" style={{ bottom: 'clamp(20px, 4%, 35px)', paddingLeft: 'clamp(12px, 3%, 30px)', paddingRight: 'clamp(12px, 3%, 30px)' }}>
                {timeMode === 'CLOCK' && (
                  <p className="text-white font-medium italic leading-tight opacity-90 whitespace-nowrap" style={{ fontSize: 'clamp(6px, 1.8vw, 16px)' }}>
                    “Your time is limited, so don't waste it living in someone else's life” - Steve Jobs <span className="font-normal not-italic opacity-75"></span>
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'THEME' && (
          <div className="flex flex-col items-center gap-12 animate-fadeIn">
            <div 
              className="flex flex-col items-center gap-6 mt-12"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative group">
                <div className="w-32 h-32 rounded-full border-2 border-white overflow-hidden relative">
                  <input
                    type="color"
                    value={themeColor}
                    onChange={(e) => setThemeColor(e.target.value)}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] cursor-pointer p-0 border-0 appearance-none"
                    style={{ padding: 0, margin: 0 }}
                  />
                </div>
              </div>
              <div className="text-[#abcdef] font-light text-xl uppercase tracking-widest">
                {themeColor}
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation()
                resetThemeColor()
              }}
              className="px-8 py-3 border border-white/30 rounded-full text-white/80 hover:bg-white/10 transition-all uppercase tracking-widest text-sm font-['Source_Code_Pro']"
              style={{ fontFamily: "'Source Code Pro', monospace" }}
            >
              DEFAULT
            </button>
          </div>
        )}

        {activeTab === 'EDOM' && (
          <div className="w-full h-[60vh] min-h-[400px] max-h-[600px] flex flex-col">
            <EdomChat />
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}
