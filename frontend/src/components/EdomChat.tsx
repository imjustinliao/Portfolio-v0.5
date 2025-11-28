import { useState, useRef, useEffect } from 'react'

// Module-level state that persists during session but clears on refresh
let moduleMessages: { sender: 'user' | 'ai', text: string, timestamp: Date }[] = []
let moduleHasEntered = false

export default function EdomChat() {
  const typingAudioRef = useRef<HTMLAudioElement | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  
  // Initialize from module-level state
  const [hasEntered, setHasEntered] = useState(moduleHasEntered)
  const [messages, setMessages] = useState<{ sender: 'user' | 'ai', text: string, timestamp: Date }[]>(moduleMessages)
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [typingText, setTypingText] = useState('')
  const [fullAiResponse, setFullAiResponse] = useState('')

  // Initialize audio
  useEffect(() => {
    typingAudioRef.current = new Audio('/audio/typing.mp3')
  }, [])

  // Play typing sound when showing intro and stop after 2 seconds
  useEffect(() => {
    if (!hasEntered && typingAudioRef.current) {
      const playTimer = setTimeout(() => {
        typingAudioRef.current?.play().catch(e => console.error('Audio play failed:', e))
      }, 100)
      
      // Stop audio after animation completes (2 seconds)
      const stopTimer = setTimeout(() => {
        if (typingAudioRef.current) {
          typingAudioRef.current.pause()
          typingAudioRef.current.currentTime = 0
        }
      }, 2100) // 2s animation + 100ms delay
      
      return () => {
        clearTimeout(playTimer)
        clearTimeout(stopTimer)
      }
    }
  }, [hasEntered])

  // Typing effect for AI responses
  useEffect(() => {
    if (fullAiResponse && typingText.length < fullAiResponse.length) {
      const timer = setTimeout(() => {
        setTypingText(fullAiResponse.slice(0, typingText.length + 1))
      }, 20) // Speed of typing (20ms per character)
      
      return () => clearTimeout(timer)
    } else if (fullAiResponse && typingText.length === fullAiResponse.length) {
      // Typing complete, add to messages
      const finalTimer = setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'ai', text: fullAiResponse, timestamp: new Date() }])
        setTypingText('')
        setFullAiResponse('')
        setIsTyping(false)
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
  }, [hasEntered])

  // Auto-resize textarea
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
    setHasEntered(true)
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

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!inputValue.trim()) return

    const userMessage = inputValue.trim()
    const timestamp = new Date()
    setMessages(prev => [...prev, { sender: 'user', text: userMessage, timestamp }])
    setInputValue('')
    setIsTyping(true)

    try {
      // Call Backend API (Proxied via CloudFront)
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, sessionId })
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      setFullAiResponse(data.response)
    } catch (error) {
      console.error('Chat Error:', error)
      setFullAiResponse("I'm having trouble connecting to my brain right now. Please try again later.")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.stopPropagation()
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

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
              {msg.text}
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
                  {typingText}
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
      <div className="w-full pt-4 pb-2 animate-slideUpFade" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
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
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="flex-shrink-0 mb-[2px] ml-3 disabled:opacity-30 transition-opacity duration-200"
            >
              <img src="/UI/send.svg" alt="Send" className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
