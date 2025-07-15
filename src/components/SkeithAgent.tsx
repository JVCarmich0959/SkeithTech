'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  typing?: boolean;
}

interface ScheduleData {
  name: string;
  email: string;
  date: string;
  time: string;
  timezone?: string;
}

interface AvailableSlot {
  date: string;
  times: string[];
}

const INITIAL_SCHEDULE: ScheduleData = {
  name: '',
  email: '',
  date: '',
  time: '',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
};

const AVAILABLE_SLOTS: AvailableSlot[] = [
  { date: new Date(Date.now() + 86400000).toISOString().split('T')[0], times: ['09:00', '11:00', '14:00', '16:00'] },
  { date: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0], times: ['10:00', '13:00', '15:00'] },
  { date: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0], times: ['09:30', '11:30', '14:30'] }
];

const ChatAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [scheduleData, setScheduleData] = useState<ScheduleData>(INITIAL_SCHEDULE);
  const [conversationState, setConversationState] = useState<'idle' | 'scheduling' | 'confirming'>('idle');
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [userContext, setUserContext] = useState({
    hasGreeted: false,
    showsEnthusiasm: false,
    preferredCommunicationStyle: 'casual',
    mentionedUrgency: false,
    timePreference: '',
    lastTopic: ''
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize conversation
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greetings = [
        "Hey there! I'm Skeith 👋",
        "Hello! Skeith here 🤖",
        "Hi! I'm Skeith, nice to meet you! 😊"
      ];
      
      setTimeout(() => {
        setMessages([{ text: getRandomResponse(greetings), sender: 'bot' }]);
        
        setTimeout(() => {
          const intros = [
            "I help people book consultations with our AI team. What brings you here today?",
            "I'm your friendly scheduling assistant! Looking to chat with our AI experts?",
            "I specialize in connecting people with our AI team. What can I help you with?"
          ];
          
          setMessages(prev => [...prev, { text: getRandomResponse(intros), sender: 'bot' }]);
        }, 1200);
      }, 800);
    }
  }, [isOpen]);

  const botSay = (text: string, delay = 500 + Math.random() * 600) => {
    setIsTyping(true);
    return new Promise<void>(resolve => {
      setTimeout(() => {
        setMessages(prev => [...prev, { text, sender: 'bot' }]);
        setIsTyping(false);
        resolve();
      }, delay);
    });
  };

  const getRandomResponse = (responses: string[]) => {
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const analyzeUserContext = (input: string) => {
    const text = input.toLowerCase();
    
    // Update user context based on their message
    setUserContext(prev => ({
      ...prev,
      hasGreeted: prev.hasGreeted || /^(hi|hello|hey|good morning|good afternoon|good evening)/.test(text),
      showsEnthusiasm: prev.showsEnthusiasm || /!|awesome|great|perfect|love|excited/.test(text),
      mentionedUrgency: prev.mentionedUrgency || /urgent|asap|soon|quickly|today|tomorrow/.test(text),
      timePreference: /morning/.test(text) ? 'morning' : /afternoon/.test(text) ? 'afternoon' : /evening/.test(text) ? 'evening' : prev.timePreference,
      lastTopic: input
    }));
  };

  const detectIntent = (input: string) => {
    const text = input.toLowerCase();
    
    if (/^(hi|hello|hey|good morning|good afternoon|good evening)/.test(text)) return 'greeting';
    if (/schedule|book|meet|appointment|call|consult|time|available|when|calendar/.test(text)) return 'scheduling';
    if (/cancel|start over|reset|nevermind|forget|different/.test(text)) return 'cancel';
    if (/thanks|thank you|appreciate|great|awesome|perfect|love it/.test(text)) return 'gratitude';
    if (/help|what can you do|how does this work|confused/.test(text)) return 'help';
    if (/yes|yeah|yep|sure|okay|ok|confirm|correct|sounds good|let's do it/.test(text)) return 'affirmative';
    if (/no|nope|not really|incorrect|wrong|don't think so/.test(text)) return 'negative';
    if (/maybe|not sure|i don't know|let me think|hmm/.test(text)) return 'uncertain';
    if (/urgent|asap|soon|quickly|emergency/.test(text)) return 'urgent';
    if (/morning|afternoon|evening|am|pm/.test(text)) return 'time_preference';
    
    return 'general';
  };

  const getContextualResponse = (intent: string, responses: string[]) => {
    let filteredResponses = responses;
    
    // Adjust responses based on user context
    if (userContext.showsEnthusiasm) {
      filteredResponses = responses.filter(r => r.includes('!') || r.includes('awesome') || r.includes('great'));
    }
    
    return getRandomResponse(filteredResponses.length > 0 ? filteredResponses : responses);
  };

  const handleSubmit = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    addUserMessage(trimmed);
    setInputValue('');

    analyzeUserContext(trimmed);
    const intent = detectIntent(trimmed);

    // Add some personality based on context
    if (intent === 'cancel') {
      await resetConversation();
      return;
    }

    if (intent === 'gratitude') {
      const responses = [
        "You're so welcome! Anything else I can help with? 😊",
        "My pleasure! What else can I do for you?",
        "Aww, thanks! Happy to help anytime! ✨",
        "That's what I'm here for! Need anything else?"
      ];
      await botSay(getContextualResponse(intent, responses));
      return;
    }

    if (intent === 'help') {
      await botSay("I'm like your personal booking assistant, but with more personality! 😄");
      await botSay("I can check our calendar, find perfect time slots, and even send you fancy calendar invites. Want to see what magic I can work?");
      return;
    }

    if (intent === 'urgent') {
      await botSay("Ooh, urgent! I love a good challenge! 🚀");
      await botSay("Let me see what I can do to get you sorted quickly...");
      await startScheduling();
      return;
    }

    // Handle scheduling flow
    if (conversationState === 'scheduling') {
      await handleSchedulingFlow(trimmed, intent);
      return;
    }

    // Handle confirmation
    if (conversationState === 'confirming') {
      if (intent === 'affirmative') {
        await completeScheduling();
      } else if (intent === 'negative') {
        const responses = [
          "No worries! Want to try different details? 🔄",
          "All good! Should we pick a different time?",
          "No problem! Let's find something that works better for you."
        ];
        await botSay(getRandomResponse(responses));
        setConversationState('idle');
      } else {
        await botSay("I just need a quick yes or no to lock in your appointment! Does everything look right? 🤔");
      }
      return;
    }

    // Handle initial conversation
    if (intent === 'greeting') {
      if (!userContext.hasGreeted) {
        const responses = [
          "Hey! Good to see you here! 😊 Looking to schedule something with our team?",
          "Hello there! Nice to meet you! Are you interested in booking a consultation?",
          "Hi! Welcome! What brings you to chat with me today?"
        ];
        await botSay(getRandomResponse(responses));
      } else {
        await botSay("We've already said hi! 😄 Want to get that appointment booked?");
      }
      return;
    }

    if (intent === 'scheduling' || /schedule|meet|book|call|consult/.test(trimmed)) {
      await startScheduling();
    } else {
      // Try to understand what they actually want
      if (/question|ask|info|about/.test(trimmed)) {
        await botSay("I'm mainly here for scheduling, but I'm a pretty good conversationalist too! 😉");
        await botSay("What would you like to know about our AI consultations?");
      } else if (/AI|artificial intelligence|machine learning/.test(trimmed)) {
        await botSay("Ooh, you're interested in AI! That's exactly what our team specializes in! 🤖");
        await botSay("Want to book a consultation to dive deeper into that?");
      } else {
        const responses = [
          "I'm here to help you schedule consultations with our AI experts! Interested in booking a time? 📅",
          "My specialty is connecting people with our amazing AI team! Want to see what's available?",
          "I focus on scheduling, but I'm pretty good at it! 😊 Ready to book a consultation?"
        ];
        await botSay(getRandomResponse(responses));
      }
    }
  };

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, { text, sender: 'user' }]);
  };

  const startScheduling = async () => {
    setConversationState('scheduling');
    
    const responses = userContext.mentionedUrgency 
      ? [
          "Got it! Let's get you booked ASAP! 🚀",
          "Perfect! I'll get you sorted quickly!",
          "On it! Let's find you the perfect slot fast!"
        ]
      : userContext.showsEnthusiasm
      ? [
          "Yes! I love the enthusiasm! Let's make this happen! 🎉",
          "Awesome! This is going to be great!",
          "Perfect! I'm excited to get you connected with our team!"
        ]
      : [
          "Perfect! I'd love to get you set up with one of our AI experts.",
          "Great choice! Let me help you find the perfect time slot.",
          "Awesome! I'll walk you through booking your consultation."
        ];
    
    await botSay(getRandomResponse(responses));
    
    const nameRequests = [
      "What should I call you?",
      "Can I get your name to start with?",
      "What's your name, friend?",
      "First things first - what's your name? 😊"
    ];
    
    await botSay(getRandomResponse(nameRequests));
  };

  const handleSchedulingFlow = async (input: string, intent: string) => {
    // Handle name collection
    if (!scheduleData.name) {
      const name = input.replace(/^(my name is|i'm|i am|call me|it's|this is)\s*/i, '').trim();
      setScheduleData({ ...scheduleData, name });
      
      const responses = [
        `Nice to meet you, ${name}! 😊`,
        `Hi ${name}! Great to have you here! 👋`,
        `${name}! What a lovely name! ✨`,
        `Hey ${name}! Pleasure to meet you! 🤝`
      ];
      
      await botSay(getRandomResponse(responses));
      
      const emailRequests = [
        "What's the best email to send your confirmation to?",
        "I'll need your email for the calendar invite! 📧",
        "Can I get your email address?",
        "What email should I use for your appointment details?"
      ];
      
      await botSay(getRandomResponse(emailRequests));
      return;
    }

    // Handle email collection
    if (!scheduleData.email) {
      const emailMatch = input.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
      const email = emailMatch ? emailMatch[1] : input;
      
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        const responses = [
          "Hmm, that doesn't look quite right. Could you double-check your email? 🤔",
          "Oops! That email format seems a bit off. Mind trying again?",
          "I'm not seeing a valid email there. Can you give it another shot? 📧"
        ];
        await botSay(getRandomResponse(responses));
        return;
      }
      
      setScheduleData({ ...scheduleData, email });
      
      const confirmations = [
        "Perfect! Got it! ✅",
        "Excellent! All set with that! 👍",
        "Nice! That's locked in! 🔒"
      ];
      
      await botSay(getRandomResponse(confirmations));
      await botSay("Now let me show you what dates we have available...");
      await showAvailableDates();
      return;
    }

    // Handle date selection
    if (!scheduleData.date) {
      const inputLower = input.toLowerCase();
      
      // Find matching date by checking day names and date formats
      const selectedDate = AVAILABLE_SLOTS.find(slot => {
        const date = new Date(slot.date);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
        const shortDay = date.toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase();
        const monthDay = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }).toLowerCase();
        
        return slot.date === input || 
               inputLower.includes(dayName) || 
               inputLower.includes(shortDay) ||
               inputLower.includes(monthDay) ||
               inputLower.includes(slot.date);
      });
      
      if (!selectedDate) {
        const responses = [
          "Hmm, I don't see that date in our available slots. Could you pick from the ones I mentioned? 🤔",
          "That date isn't ringing a bell! Can you choose from the options above?",
          "I don't have that date available. Mind picking from the list I shared? 📅"
        ];
        await botSay(getRandomResponse(responses));
        return;
      }
      
      setScheduleData({ ...scheduleData, date: selectedDate.date });
      setAvailableTimes(selectedDate.times);
      
      const dateFormatted = new Date(selectedDate.date).toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric' 
      });
      
      const responses = [
        `Great choice! ${dateFormatted} it is! 🗓️`,
        `Perfect! I love ${dateFormatted}! ✨`,
        `Awesome! ${dateFormatted} is going to be great! 🎉`
      ];
      
      await botSay(getRandomResponse(responses));
      
      // Filter times based on user preference
      let timesToShow = selectedDate.times;
      if (userContext.timePreference === 'morning') {
        const morningTimes = selectedDate.times.filter(time => parseInt(time.split(':')[0]) < 12);
        if (morningTimes.length > 0) {
          await botSay("I noticed you mentioned morning! Here are the AM slots:");
          timesToShow = morningTimes;
        }
      } else if (userContext.timePreference === 'afternoon') {
        const afternoonTimes = selectedDate.times.filter(time => parseInt(time.split(':')[0]) >= 12);
        if (afternoonTimes.length > 0) {
          await botSay("Perfect! Here are the afternoon options:");
          timesToShow = afternoonTimes;
        }
      }
      
      await botSay(`Available times: ${timesToShow.map(t => {
        const hour = parseInt(t.split(':')[0]);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
        return `${displayHour}:${t.split(':')[1]} ${ampm}`;
      }).join(' • ')}`);
      
      const timeRequests = [
        "Which one works best for you?",
        "What time suits you?",
        "Pick your favorite! ⏰",
        "Which time calls to you?"
      ];
      
      await botSay(getRandomResponse(timeRequests));
      return;
    }

    // Handle time selection
    if (!scheduleData.time) {
      const selectedTime = availableTimes.find(time => {
        const inputNumbers = input.replace(/[^\d]/g, '');
        const timeNumbers = time.replace(/[^\d]/g, '');
        return input.includes(time) || 
               timeNumbers.includes(inputNumbers) ||
               input.includes(timeNumbers);
      });
      
      if (!selectedTime) {
        const responses = [
          "I don't see that time available. Could you choose from the options I listed? ⏰",
          "That time isn't showing up for me. Mind picking from the available slots?",
          "Hmm, that time doesn't match what I have. Can you try one from the list? 🤔"
        ];
        await botSay(getRandomResponse(responses));
        return;
      }
      
      setScheduleData({ ...scheduleData, time: selectedTime });
      
      const responses = [
        "Perfect timing! 🎯",
        "Excellent choice! ⭐",
        "That's a great time! 👌",
        "Love it! That works perfectly! 💫"
      ];
      
      await botSay(getRandomResponse(responses));
      await confirmAppointment();
    }
  };

  const showAvailableDates = async () => {
    const dates = AVAILABLE_SLOTS.map(slot => {
      const date = new Date(slot.date);
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric' 
      });
    });
    
    setAvailableDates(AVAILABLE_SLOTS.map(slot => slot.date));
    
    await botSay("Here's what I have available:");
    for (let i = 0; i < dates.length; i++) {
      await botSay(`${['📅', '🗓️', '📆'][i]} ${dates[i]}`, 400);
    }
    
    const requests = [
      "Which date speaks to you?",
      "What works best for your schedule?",
      "Pick your favorite! ✨",
      "Which one calls to you?"
    ];
    
    await botSay(getRandomResponse(requests));
  };

  const confirmAppointment = async () => {
    setConversationState('confirming');
    
    const date = new Date(scheduleData.date);
    const formattedDate = date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
    
    const hour = parseInt(scheduleData.time.split(':')[0]);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    const displayTime = `${displayHour}:${scheduleData.time.split(':')[1]} ${ampm}`;
    
    await botSay("Alright! Let me make sure I got everything right! 🔍");
    await botSay(`📅 ${formattedDate} at ${displayTime}`);
    await botSay(`📧 Confirmation going to ${scheduleData.email}`);
    await botSay(`👤 Booked for ${scheduleData.name}`);
    
    const confirmations = [
      "Does this all look perfect to you? ✨",
      "Ready to make this official? 🎉",
      "Should I lock this in? 🔒",
      "Everything look good? Let's do this! 🚀"
    ];
    
    await botSay(getRandomResponse(confirmations));
  };

  const completeScheduling = async () => {
    const date = new Date(scheduleData.date);
    const formattedDate = date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
    
    const hour = parseInt(scheduleData.time.split(':')[0]);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    const displayTime = `${displayHour}:${scheduleData.time.split(':')[1]} ${ampm}`;
    
    await botSay("🎉 BOOM! Your consultation is officially booked!");
    await botSay(`You're all set for ${formattedDate} at ${displayTime}! ✨`);
    await botSay("I've sent a shiny calendar invite to your email, and you'll get a friendly reminder 24 hours before! 📧");
    
    const celebrations = [
      "I'm so excited for you! This is going to be amazing! 🌟",
      "Our AI team is going to love meeting you! 🤖💙",
      "You're going to have such a great consultation! 🚀",
      "This is going to be fantastic! Can't wait! ⭐"
    ];
    
    await botSay(getRandomResponse(celebrations));
    
    // Here you would typically send the data to your backend
    console.log("Appointment scheduled:", scheduleData);
    
    // Reset for next conversation
    setTimeout(() => {
      setScheduleData(INITIAL_SCHEDULE);
      setConversationState('idle');
      setUserContext({
        hasGreeted: false,
        showsEnthusiasm: false,
        preferredCommunicationStyle: 'casual',
        mentionedUrgency: false,
        timePreference: '',
        lastTopic: ''
      });
      
      const followups = [
        "Anything else I can help you with today? 😊",
        "Is there anything else on your mind?",
        "What else can I do for you? ✨",
        "Need help with anything else? I'm here! 🤗"
      ];
      
      botSay(getRandomResponse(followups));
    }, 2500);
  };

  const resetConversation = async () => {
    setScheduleData(INITIAL_SCHEDULE);
    setConversationState('idle');
    setUserContext({
      hasGreeted: false,
      showsEnthusiasm: false,
      preferredCommunicationStyle: 'casual',
      mentionedUrgency: false,
      timePreference: '',
      lastTopic: ''
    });
    
    const responses = [
      "No problem! Fresh start! ✨ What can I help you with?",
      "All cleared out! 🔄 Ready to try again?",
      "Starting fresh! What would you like to do? 😊",
      "Reset complete! 🎯 How can I help you now?"
    ];
    
    await botSay(getRandomResponse(responses));
  };

  return (
    <>
      {/* Floating button with animation */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg flex items-center justify-center z-50"
        aria-label="Open AI chat assistant"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </motion.button>

      {/* Chat window with animations */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-96 max-w-full bg-white rounded-lg shadow-xl border border-gray-200 z-50 flex flex-col"
            style={{ height: '65vh', maxHeight: '600px' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-medium">Skeith AI Assistant</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* Chat body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs rounded-lg px-4 py-2 ${msg.sender === 'user' 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-none' 
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 text-gray-800 rounded-lg rounded-bl-none px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleSubmit(e)}
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button onClick={handleSubmit} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg px-4 py-2 hover:from-blue-700 hover:to-purple-700 transition-colors" >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                    </svg>
                    </button>
                    </div>
                    </div>
                    </motion.div>
                )}
                </AnimatePresence>
                </>
                );
            };export default ChatAgent;


