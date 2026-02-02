import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { X, Send, MessageCircle, Calendar } from 'lucide-react';
import { sendMessageToAssistant, generateFollowUpSuggestions } from '@/lib/openaiAssistant';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatBotProps {
  onLeadCapture?: (email: string, phone?: string) => void;
}

const BOOKING_LINK = 'https://calendar.app.google/avd6rXS3C7G8YkjE8';

export default function ChatBot({ onLeadCapture }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'G\'day! 👋 I\'m Nik Finance\'s AI lending assistant. I can help you understand your options for car loans, home loans, personal loans, and refinancing. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [threadId, setThreadId] = useState<string | undefined>();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await sendMessageToAssistant(inputValue, threadId);
      
      // Store thread ID for conversation continuity
      if (response.threadId) {
        setThreadId(response.threadId);
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Show lead capture form after 4+ messages with some randomness
      const messageCount = messages.length + 2; // +2 for user msg and response
      if (messageCount >= 5 && !showLeadForm && Math.random() > 0.6) {
        setShowLeadForm(true);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again or book a free consultation with our team.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeadCapture = () => {
    if (leadEmail) {
      onLeadCapture?.(leadEmail, leadPhone);
      
      // Track in analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'chatbot_lead_capture', {
          email: leadEmail,
          has_phone: !!leadPhone
        });
      }

      const confirmMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Great! I've captured your details. A member of our team will reach out to you soon at ${leadEmail}. In the meantime, feel free to keep asking questions or book a consultation!`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, confirmMessage]);
      setShowLeadForm(false);
      setLeadEmail('');
      setLeadPhone('');
    }
  };

  const handleQuickReply = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const handleBooking = () => {
    window.open(BOOKING_LINK, '_blank');
    
    // Track booking click
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'chatbot_booking_click', {
        source: 'chatbot'
      });
    }
  };

  return (
    <>
      {/* Chat Bubble Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
            aria-label="Open chat"
          >
            <MessageCircle className="w-7 h-7" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-lg shadow-2xl flex flex-col h-[600px] max-h-[80vh]"
          >
            {/* Header */}
            <div className="bg-primary text-white p-4 rounded-t-lg flex justify-between items-center">
              <div>
                <h3 className="font-heading font-semibold">Nik Finance Assistant</h3>
                <p className="text-xs text-green-100">AI-Powered • Online</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleBooking}
                  className="p-2 hover:bg-primary-foreground/20 rounded transition-colors"
                  aria-label="Book consultation"
                  title="Book a free consultation"
                >
                  <Calendar className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-primary-foreground/20 rounded transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-light-gray">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-primary text-white rounded-br-none'
                        : 'bg-white text-foreground rounded-bl-none border border-gray-200'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white text-foreground px-4 py-2 rounded-lg rounded-bl-none border border-gray-200">
                    <LoadingSpinner />
                  </div>
                </motion.div>
              )}

              {showLeadForm && !isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-accent rounded-lg p-4 space-y-3"
                >
                  <p className="text-sm font-semibold text-foreground">Want personalized advice?</p>
                  <p className="text-xs text-gray-500">Leave your details and we'll be in touch</p>
                  <Input
                    type="email"
                    placeholder="Your email"
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    className="text-sm"
                  />
                  <Input
                    type="tel"
                    placeholder="Phone (optional)"
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    className="text-sm"
                  />
                  <Button
                    onClick={handleLeadCapture}
                    disabled={!leadEmail}
                    className="w-full bg-accent hover:bg-accent/90 text-white text-sm"
                  >
                    Get in Touch
                  </Button>
                  <button
                    onClick={() => setShowLeadForm(false)}
                    className="w-full text-xs text-gray-500 hover:text-gray-700"
                  >
                    Maybe later
                  </button>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t p-4 space-y-3 bg-white rounded-b-lg">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Ask about loans, refinancing..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={isLoading}
                  className="text-sm"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  className="bg-primary hover:bg-primary/90 text-white px-3"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              {/* Quick Suggestions */}
              {messages.length > 0 && !showLeadForm && !isLoading && (
                <div className="flex flex-wrap gap-2">
                  {generateFollowUpSuggestions(messages[messages.length - 1].content).slice(0, 2).map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickReply(suggestion)}
                      className="text-xs px-2 py-1 bg-light-gray hover:bg-gray-300 text-foreground rounded transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
              
              {/* Book Consultation CTA */}
              <button
                onClick={handleBooking}
                className="w-full text-xs text-primary hover:text-primary/80 flex items-center justify-center gap-1"
              >
                <Calendar className="w-3 h-3" />
                Book a Free Consultation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
