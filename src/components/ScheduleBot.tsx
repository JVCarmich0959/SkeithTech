'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Send, X, MessageCircle, Loader2 } from 'lucide-react'

type Message = {
  id: string
  text: string
  sender: 'bot' | 'user'
  options?: string[]
}

// Unique ID generator
let messageIdCounter = 0
const generateUniqueId = () => {
  messageIdCounter += 1
  return `${Date.now()}-${messageIdCounter}-${Math.random().toString(36).substr(2, 9)}`
}

const initialMessages: Message[] = [
  {
    id: generateUniqueId(),
    text: "Hi there! I'm Skeith, your scheduling assistant. Ready to book a consultation?",
    sender: 'bot',
    options: ["Yes, let's schedule", "Tell me about services", "Talk to a human"]
  }
]

// Helper: Convert weekday to next date string (YYYY-MM-DD)
function getNextDateFromWeekday(weekday: string) {
  const dayNames = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"]
  const today = new Date()
  const todayIdx = today.getDay()
  const targetIdx = dayNames.indexOf(weekday.toLowerCase())
  if (targetIdx === -1) throw new Error("Invalid weekday")
  const daysUntil = (targetIdx + 7 - todayIdx) % 7 || 7
  const targetDate = new Date(today)
  targetDate.setDate(today.getDate() + daysUntil)
  return targetDate.toISOString().split('T')[0]
}

interface ScheduleBotProps {
  forceOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
}

export default function ScheduleBot({ forceOpen, onOpenChange }: ScheduleBotProps = {}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  // Handle external control
  useEffect(() => {
    if (forceOpen !== undefined && forceOpen !== isOpen) {
      setIsOpen(forceOpen)
    }
  }, [forceOpen, isOpen])

  // Notify parent of state changes
  useEffect(() => {
    onOpenChange?.(isOpen)
  }, [isOpen, onOpenChange])

  // Booking state & conversation stage
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [selectedDay, setSelectedDay] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [loading, setLoading] = useState(false)
  const [stage, setStage] = useState<'start' | 'name' | 'email' | 'select_day' | 'select_time' | 'confirm' | 'done'>('start')

  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const addBotMessage = (text: string, options?: string[]) => {
    const botMessage: Message = {
      id: generateUniqueId(),
      text,
      sender: 'bot',
      options
    }
    setMessages(prev => [...prev, botMessage])
  }

  const addUserMessage = (text: string) => {
    const userMessage: Message = {
      id: generateUniqueId(),
      text,
      sender: 'user'
    }
    setMessages(prev => [...prev, userMessage])
  }

  const fetchAvailableTimes = async (day: string) => {
    setLoading(true)
    try {
      const date = getNextDateFromWeekday(day)
      const res = await fetch(`/api/availability?day=${date}`)
      if (!res.ok) throw new Error('Failed to fetch availability')
      const data = await res.json()

      if (data.availableSlots && data.availableSlots.length > 0) {
        addBotMessage(`Available times on ${day}:`, data.availableSlots.map((slot: { displayTime: string }) => slot.displayTime))
        setStage('select_time')
      } else {
        addBotMessage(`Sorry, no available times found on ${day}. Would you like to:`, ["Try Monday", "Try Wednesday", "Try Another Day"])
        setStage('select_day')
        setSelectedDay('')
      }
    } catch {
      addBotMessage("Oops, something went wrong fetching times. Try again later.")
    } finally {
      setLoading(false)
    }
  }

  const handleAlternativeSelection = (option: string) => {
    if (option === 'Try Another Day') {
      addBotMessage("What day would you prefer?", ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"])
      setStage('select_day')
    } else if (option.startsWith('Try ')) {
      const day = option.replace('Try ', '')
      setSelectedDay(day)
      fetchAvailableTimes(day)
    }
  }

  const handlePayment = async () => {
    setLoading(true)
    try {
      // Validate required data before making API call
      if (!name || !email || !selectedDay || !selectedTime) {
        addBotMessage("Missing booking information. Let's start over.")
        setStage('start')
        return
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        addBotMessage("Invalid email address. Please provide a valid email.")
        addBotMessage("What's your email address?")
        setStage('email')
        return
      }

      const query = new URLSearchParams({
        name,
        email,
        slot: `${selectedDay} ${selectedTime}`
      }).toString()

      console.log('Making payment request with:', { name, email, slot: `${selectedDay} ${selectedTime}` })

      const res = await fetch(`/api/create-checkout-session?${query}`)
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Unknown error' }))
        console.error('Payment API error:', errorData)
        throw new Error(`HTTP ${res.status}: ${errorData.error || 'Payment failed'}`)
      }

      const data = await res.json()
      if (data.url) {
        addBotMessage("Redirecting to payment...")
        window.location.href = data.url // Redirect to Stripe checkout
        setStage('done')
      } else {
        addBotMessage("Payment setup failed. Please try again or contact support.")
      }
    } catch (error) {
      console.error('Payment error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      addBotMessage(`Payment error: ${errorMessage}. Please try again later.`)
    } finally {
      setLoading(false)
    }
  }

  const handleNextStep = (userText: string) => {
    if (loading) return

    const lower = userText.toLowerCase()
    addUserMessage(userText)

    switch (stage) {
      case 'start':
        if (lower.includes('schedule')) {
          addBotMessage("Great! What's your name?")
          setStage('name')
        } else if (lower.includes('service')) {
          addBotMessage("We offer AI automation, custom software, and business optimization. Which interests you?", [
            "AI Automation", "Custom Software", "Process Optimization"
          ])
        } else {
          addBotMessage("I'll connect you with our team. Anything else I can help with?", ["Yes", "No thanks"])
        }
        break

      case 'name':
        setName(userText)
        addBotMessage(`Nice to meet you, ${userText}! What's your email address?`)
        setStage('email')
        break

      case 'email':
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(userText)) {
          addBotMessage("Please enter a valid email address (e.g., you@example.com)")
          return
        }
        setEmail(userText)
        addBotMessage("Which day works best for you?", ["Monday", "Wednesday", "Friday", "Other"])
        setStage('select_day')
        break

      case 'select_day':
        if (userText === 'Other') {
          addBotMessage("What day would you prefer?", ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"])
        } else if (userText.startsWith('Try ')) {
          handleAlternativeSelection(userText)
        } else {
          setSelectedDay(userText)
          fetchAvailableTimes(userText)
        }
        break

      case 'select_time':
        setSelectedTime(userText)
        addBotMessage(
          `Perfect! You selected ${selectedDay} at ${userText}. Please confirm your $15 consultation.`,
          ["Pay $15 to Confirm"]
        )
        setStage('confirm')
        break

      case 'confirm':
        if (lower.includes('pay')) {
          handlePayment()
        } else {
          addBotMessage("Please confirm your payment to finalize the booking.", ["Pay $15 to Confirm"])
        }
        break

      case 'done':
        addBotMessage("Thank you! Your booking is confirmed. Anything else I can help with?", ["Yes", "No thanks"])
        break
    }
  }

  const handleSend = () => {
    if (!input.trim()) return
    const currentInput = input.trim()
    setInput('')
    handleNextStep(currentInput)
  }

  const handleOptionSelect = (option: string) => {
    setInput(option)
    handleSend()
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-96 h-[28rem] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-sm"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255,255,255,0.1)'
            }}
          >
            {/* Header */}
            <div className="relative px-6 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Skeith</h3>
                    <p className="text-xs opacity-90">Scheduling Assistant</p>
                  </div>
                </div>
                <motion.button 
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-gray-50/50 to-white/80 dark:from-gray-800/50 dark:to-gray-900/80">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${message.sender === 'bot' ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[85%] ${message.sender === 'bot' ? 'order-2' : ''}`}>
                    {message.sender === 'bot' && (
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-1 order-1 mr-2">
                        <Bot className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <div className={`px-4 py-3 rounded-2xl shadow-sm ${
                      message.sender === 'bot'
                        ? 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200'
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.text}</p>
                    </div>
                    
                    {message.options && (
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-3 flex flex-wrap gap-2"
                      >
                        {message.options.map((option, optionIndex) => (
                          <motion.button
                            key={`${message.id}-option-${optionIndex}`}
                            onClick={() => handleOptionSelect(option)}
                            disabled={loading}
                            whileHover={{ scale: 1.02, y: -1 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: optionIndex * 0.05 }}
                            className="text-xs px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 rounded-full hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-300/50 dark:border-gray-600/50 shadow-sm hover:shadow-md"
                          >
                            {option}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
              
              {loading && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex gap-1">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        className="w-2 h-2 bg-blue-500 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 bg-purple-500 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        className="w-2 h-2 bg-blue-500 rounded-full"
                      />
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Skeith is typing...</span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 shadow-sm transition-all duration-200"
                  disabled={loading}
                />
                <motion.button
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md flex items-center justify-center min-w-[3rem]"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        data-testid="chat-toggle"
        className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300 relative overflow-hidden"
        style={{
          boxShadow: isOpen 
            ? '0 8px 32px rgba(59, 130, 246, 0.3)' 
            : '0 8px 32px rgba(59, 130, 246, 0.4)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 hover:opacity-100 transition-opacity duration-300" />
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="relative z-10"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </motion.div>
        {!isOpen && (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-30"
          />
        )}
      </motion.button>
    </div>
  )
}