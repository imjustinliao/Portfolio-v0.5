import { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

// Module-level state that persists during session but clears on refresh
let moduleMessages: { sender: 'user' | 'ai', text: string, timestamp: Date }[] = []
let moduleHasEntered = false
let moduleUserName = ''
let moduleIsNameEntered = false

export default function EdomChat() {
  const typingAudioRef = useRef<HTMLAudioElement | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)
  
  // Initialize from module-level state
  const [hasEntered, setHasEntered] = useState(moduleHasEntered)
  const [messages, setMessages] = useState<{ sender: 'user' | 'ai', text: string, timestamp: Date }[]>(moduleMessages)
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)
  const [isTypingEffectActive, setIsTypingEffectActive] = useState(false)
  const [typingText, setTypingText] = useState('')
  const [fullAiResponse, setFullAiResponse] = useState('')
  
  // Name Collection State
  const [userName, setUserName] = useState(moduleUserName)
  const [isNameEntered, setIsNameEntered] = useState(moduleIsNameEntered)
  const [showNameInput, setShowNameInput] = useState(false)

  // Initialize audio
  useEffect(() => {
    typingAudioRef.current = new Audio('/audio/typing.mp3')
  }, [])

  // Focus name input when shown
  useEffect(() => {
    if (showNameInput && nameInputRef.current) {
      nameInputRef.current.focus()
    }
  }, [showNameInput])

  // Play typing sound logic (unchanged)
  useEffect(() => {
    if (!hasEntered && !showNameInput && typingAudioRef.current) {
      const playTimer = setTimeout(() => {
        typingAudioRef.current?.play().catch(e => console.error('Audio play failed:', e))
      }, 100)
      
      const stopTimer = setTimeout(() => {
        if (typingAudioRef.current) {
          typingAudioRef.current.pause()
          typingAudioRef.current.currentTime = 0
        }
      }, 2100)
      
      return () => {
        clearTimeout(playTimer)
        clearTimeout(stopTimer)
      }
    }
  }, [hasEntered, showNameInput])

  // Typing effect
  useEffect(() => {
    if (fullAiResponse && typingText.length < fullAiResponse.length) {
      setIsTypingEffectActive(true)
      const timer = setTimeout(() => {
        setTypingText(fullAiResponse.slice(0, typingText.length + 1))
      }, 20)
      
      return () => clearTimeout(timer)
    } else if (fullAiResponse && typingText.length === fullAiResponse.length) {
      const finalTimer = setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'ai', text: fullAiResponse, timestamp: new Date() }])
        setTypingText('')
        setFullAiResponse('')
        setIsTyping(false)
        setIsTypingEffectActive(false)
      }, 100)
      
      return () => clearTimeout(finalTimer)
    }
  }, [typingText, fullAiResponse])

  // Sync state to module-level variables
  useEffect(() => {
    moduleMessages = messages
  }, [messages])

  useEffect(() => {
    moduleHasEntered = hasEntered
    moduleUserName = userName
    moduleIsNameEntered = isNameEntered
  }, [hasEntered, userName, isNameEntered])

  // Auto-resize textarea (unchanged)
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [inputValue])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping, typingText])

  const handleEnter = () => {
    if (isNameEntered) {
      setHasEntered(true)
    } else {
      setShowNameInput(true)
    }
  }

  const handleNameSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!userName.trim()) return
    
    setIsNameEntered(true)
    setHasEntered(true)
    setShowNameInput(false)
  }

  const formatTime = (date: Date) => {
    const hours = date.getHours()
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const ampm = hours >= 12 ? 'pm' : 'am'
    const displayHours = hours % 12 || 12
    return `${displayHours}:${minutes}${ampm}`
  }

  // Session Management
  const [sessionId, setSessionId] = useState<string>('')
  
  useEffect(() => {
    let sid = localStorage.getItem('chatSessionId')
    if (!sid) {
      sid = crypto.randomUUID()
      localStorage.setItem('chatSessionId', sid)
    }
    setSessionId(sid)
  }, [])

  const handleStopGeneration = (e: React.MouseEvent) => {
    e.preventDefault()
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
      setIsWaiting(false)
      setIsTyping(false)
      setIsTypingEffectActive(false)
      setFullAiResponse('')
    }
  }

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!inputValue.trim() || isWaiting || isTypingEffectActive) return

    const userMessage = inputValue.trim()
    const timestamp = new Date()
    setMessages(prev => [...prev, { sender: 'user', text: userMessage, timestamp }])
    setInputValue('')
    setIsWaiting(true)
    setIsTyping(true)

    abortControllerRef.current = new AbortController()

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, sessionId, userName }),
        signal: abortControllerRef.current.signal
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      setFullAiResponse(data.response)
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('Generation stopped by user')
      } else {
        console.error('Chat Error:', error)
        setFullAiResponse("I'm having trouble connecting to my brain right now. Please try again later.")
      }
    } finally {
      setIsWaiting(false)
      abortControllerRef.current = null
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.stopPropagation()
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Screen 2: Name Input
  if (showNameInput) {
    return (
      <div 
        className="w-full h-full flex flex-col items-center justify-center animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 
          className="text-white text-2xl mb-8 font-light tracking-wide animate-slideUpFade"
          style={{ fontFamily: '"Source Code Pro", monospace' }}
        >
          What is your name?
        </h2>
        
        <form onSubmit={handleNameSubmit} className="flex flex-col items-center w-full max-w-xs animate-slideUpFade" style={{ animationDelay: '0.1s' }}>
          <input
            ref={nameInputRef}
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full bg-transparent border-b border-white/30 text-white text-center text-xl py-2 mb-8 outline-none focus:border-white transition-colors placeholder-white/20"
            placeholder="Enter your name"
            style={{ fontFamily: '"Source Code Pro", monospace' }}
          />
          
          <button
            type="submit"
            disabled={!userName.trim()}
            className="group relative px-8 py-3 overflow-hidden rounded-full transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative text-white font-light tracking-widest uppercase text-sm" style={{ fontFamily: '"Source Code Pro", monospace' }}>
              Start Chat
            </span>
          </button>
        </form>
      </div>
    )
  }

  // Screen 1: Hello World (Intro)
  if (!hasEntered) {
    return (
      <div 
        className="w-full h-full flex flex-col items-center justify-center animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 
          className="text-white font-normal text-center mb-12 select-none"
          style={{ 
            fontFamily: '"Source Code Pro", monospace',
            fontSize: 'clamp(32px, 6vw, 80px)',
            lineHeight: 1,
            overflow: 'hidden',
            borderRight: '0.1em solid white',
            whiteSpace: 'nowrap',
            margin: '0 auto',
            width: '11ch',
            animation: 'typing 2s steps(12, end), blink-caret .75s step-end infinite',
            marginBottom: '3rem'
          }}
        >
          Hello World
        </h1>
        <style>{`
          @keyframes typing {
            from { width: 0 }
          }
          @keyframes blink-caret {
            from, to { border-color: transparent }
            50% { border-color: white }
          }
        `}</style>
        
        <button
          onClick={handleEnter}
          className="group relative px-8 py-3 overflow-hidden rounded-full transition-all duration-300 hover:scale-105 animate-slideUpFade"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
            animationDelay: '0.2s',
            animationFillMode: 'both'
          }}
        >
          <div className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative text-white font-light tracking-widest uppercase text-sm" style={{ fontFamily: '"Source Code Pro", monospace' }}>
            Enter Chat
          </span>
        </button>
      </div>
    )
  }

  return (
    <div 
      className="w-full h-full flex flex-col relative animate-fadeIn"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Chat History */}
      <div 
        className="flex-1 overflow-y-auto px-4 py-6 space-y-6 scrollbar-hide"
        style={{ 
          maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)'
        }}
      >
        {messages.length === 0 && (
          <div className="h-full flex items-center justify-center text-white/30 font-light italic animate-pulse" style={{ fontFamily: '"Source Code Pro", monospace' }}>
            Start a conversation...
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} animate-slideUpFade`}
          >
            <div className="text-[10px] text-white/40 mb-1 uppercase tracking-wider" style={{ fontFamily: '"Source Code Pro", monospace' }}>
              {msg.sender === 'user' ? 'You' : 'Justin Liao'} - {formatTime(msg.timestamp)}
            </div>
            <div 
              className="max-w-[80%] px-5 py-3 backdrop-blur-md text-white rounded-[25px] break-words whitespace-pre-wrap"
              style={{ 
                fontFamily: '"Source Code Pro", monospace',
                fontSize: '16px',
                lineHeight: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                boxShadow: 'inset 0 0 4px 1px rgba(255, 255, 255, 0.25)'
              }}
            >
              <ReactMarkdown 
                components={{
                  a: ({node, ...props}) => <a {...props} target="_blank" rel="noopener noreferrer" className="underline text-blue-300 hover:text-blue-200" />,
                  p: ({node, ...props}) => <p {...props} className="mb-2 last:mb-0" />,
                  ul: ({node, ...props}) => <ul {...props} className="list-disc ml-4 mb-2" />,
                  ol: ({node, ...props}) => <ol {...props} className="list-decimal ml-4 mb-2" />,
                  li: ({node, ...props}) => <li {...props} className="mb-1" />
                }}
              >
                {msg.text}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex flex-col items-start animate-fadeIn">
            <div className="text-[10px] text-white/40 mb-1 uppercase tracking-wider" style={{ fontFamily: '"Source Code Pro", monospace' }}>
              Justin Liao - {typingText ? formatTime(new Date()) : 'typing...'}
            </div>
            <div 
              className="max-w-[80%] px-5 py-4 rounded-[25px] backdrop-blur-md break-words whitespace-pre-wrap"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                boxShadow: 'inset 0 0 4px 1px rgba(255, 255, 255, 0.25)',
                minWidth: '60px'
              }}
            >
              {typingText ? (
                <div className="text-white" style={{ fontFamily: '"Source Code Pro", monospace', fontSize: '16px', lineHeight: '20px' }}>
                  <ReactMarkdown 
                    components={{
                      a: ({node, ...props}) => <a {...props} target="_blank" rel="noopener noreferrer" className="underline text-blue-300 hover:text-blue-200" />,
                      p: ({node, ...props}) => <p {...props} className="mb-2 last:mb-0" />,
                      ul: ({node, ...props}) => <ul {...props} className="list-disc ml-4 mb-2" />,
                      ol: ({node, ...props}) => <ol {...props} className="list-decimal ml-4 mb-2" />,
                      li: ({node, ...props}) => <li {...props} className="mb-1" />
                    }}
                  >
                    {typingText}
                  </ReactMarkdown>
                  <span className="inline-block w-[2px] h-[16px] bg-white ml-[2px] animate-pulse" />
                </div>
              ) : (
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              )}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div 
        className="w-full pt-4 pb-2 animate-slideUpFade" 
        style={{ 
          animationDelay: '0.3s', 
          animationFillMode: 'both',
          marginBottom: 'env(safe-area-inset-bottom)',
          paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom))'
        }}
      >
        <form 
          onSubmit={handleSendMessage}
          className="relative w-full max-w-2xl mx-auto"
        >
          <div 
            className="flex items-end w-full rounded-[26px] py-[14px] pl-6 pr-3 transition-all duration-300 backdrop-blur-sm"
            style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 1)',
              minHeight: '52px'
            }}
          >
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything..."
              rows={1}
              className="flex-1 bg-transparent text-white placeholder-white/30 outline-none resize-none overflow-y-auto"
              style={{ 
                fontFamily: '"Source Code Pro", monospace',
                lineHeight: '24px',
                maxHeight: '6em',
                padding: 0
              }}
            />
            {isWaiting || isTypingEffectActive ? (
              <button
                type="button"
                onClick={handleStopGeneration}
                className="flex-shrink-0 mb-[2px] ml-3 transition-opacity duration-200 hover:opacity-80"
              >
                <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-black rounded-[1px]" />
                </div>
              </button>
            ) : (
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="flex-shrink-0 mb-[2px] ml-3 disabled:opacity-30 transition-opacity duration-200"
              >
                <img src="/UI/send.svg" alt="Send" className="w-5 h-5" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
