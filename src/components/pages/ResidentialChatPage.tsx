import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Send, Calendar, Home, RefreshCw, Wallet, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const BOOKING_LINK = 'https://calendar.app.google/avd6rXS3C7G8YkjE8';

const QUICK_QUESTIONS = [
  'What first home buyer grants are available?',
  'How much deposit do I need?',
  'Should I refinance my mortgage?',
  'How much could I save by refinancing?',
  'What documents do I need for a home loan?'
];

export default function ResidentialChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `G'day! 👋 I'm Nik Finance's AI **Home Loan Specialist**.

I can help you with:
🏠 **First Home Buyers** — grants, schemes, getting started
🔄 **Refinancing** — lower your rate, access equity
💰 **Home Loans** — purchase, investment, construction

Over 130 lenders. AI-powered to find your best deal.

What would you like to know?`,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [threadId, setThreadId] = useState<string | undefined>();
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadName, setLeadName] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputValue;
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `[Context: User is asking about RESIDENTIAL/HOME LOANS - mortgages, first home buyers, refinancing, investment properties. Focus advice on Australian home loan market, grants, and mortgage options.]\n\n${text}`,
          threadId
        })
      });

      const data = await response.json();
      
      if (data.threadId) {
        setThreadId(data.threadId);
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Show lead form after 5+ messages
      if (messages.length >= 4 && !showLeadForm) {
        setShowLeadForm(true);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I\'m having trouble right now. Please try again or book a free consultation with our team.',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeadSubmit = async () => {
    if (!leadEmail) return;
    
    // Track lead
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'chatbot_lead_capture', {
        page: 'residential_chat',
        email: leadEmail,
        has_phone: !!leadPhone
      });
    }

    setMessages(prev => [...prev, {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: `Thanks${leadName ? ` ${leadName}` : ''}! 🎉 Our home loan team will reach out to you at ${leadEmail} shortly. In the meantime, feel free to keep chatting or book a consultation!`,
      timestamp: new Date()
    }]);
    
    setShowLeadForm(false);
    setLeadEmail('');
    setLeadPhone('');
    setLeadName('');
  };

  return (
    <>
      <SEO 
        title="AI Home Loan Assistant | Nik Finance"
        description="Chat with our AI home loan specialist about mortgages, first home buyer grants, and refinancing. Get instant answers and find the best rates."
      />
      <Header />
      
      <main className="min-h-screen bg-gradient-to-b from-light-gray to-white pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              Home Loans & Mortgages
            </h1>
            <div className="flex justify-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-2"><Home className="w-5 h-5 text-accent" /> First Home</span>
              <span className="flex items-center gap-2"><RefreshCw className="w-5 h-5 text-accent" /> Refinance</span>
              <span className="flex items-center gap-2"><Wallet className="w-5 h-5 text-accent" /> Investment</span>
            </div>
          </div>

          {/* Chat Container */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            {/* Messages Area */}
            <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-light-gray/50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-primary text-white rounded-br-md'
                        : 'bg-white text-foreground rounded-bl-md shadow-sm border border-gray-100'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-sm border border-gray-100">
                    <LoadingSpinner />
                  </div>
                </motion.div>
              )}

              {showLeadForm && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border-2 border-accent rounded-2xl p-5 max-w-sm mx-auto"
                >
                  <p className="font-semibold text-foreground mb-1">Want personalised advice?</p>
                  <p className="text-xs text-gray-500 mb-4">Leave your details and we'll be in touch</p>
                  <div className="space-y-3">
                    <Input placeholder="Your name" value={leadName} onChange={(e) => setLeadName(e.target.value)} />
                    <Input type="email" placeholder="Email *" value={leadEmail} onChange={(e) => setLeadEmail(e.target.value)} />
                    <Input type="tel" placeholder="Phone (optional)" value={leadPhone} onChange={(e) => setLeadPhone(e.target.value)} />
                    <Button onClick={handleLeadSubmit} disabled={!leadEmail} className="w-full bg-accent hover:bg-accent/90 text-white">
                      Get in Touch
                    </Button>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            <div className="px-6 py-3 bg-white border-t border-gray-100">
              <div className="flex flex-wrap gap-2">
                {QUICK_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(q)}
                    disabled={isLoading}
                    className="text-xs px-3 py-1.5 bg-light-gray hover:bg-gray-200 text-foreground rounded-full transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex gap-3">
                <Input
                  type="text"
                  placeholder="Ask about home loans, refinancing, first home grants..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={isLoading || !inputValue.trim()}
                  className="bg-primary hover:bg-primary/90 text-white px-6"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="mt-3 text-center">
                <a
                  href={BOOKING_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80"
                >
                  <Calendar className="w-4 h-4" />
                  Prefer to talk? Book a Free Consultation
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
