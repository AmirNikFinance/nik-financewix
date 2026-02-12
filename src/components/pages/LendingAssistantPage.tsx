import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageCircle, Loader } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useChatBot } from '@/hooks/useChatBot';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function LendingAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'G\'day! 👋 I\'m Nik Finance\'s AI lending assistant, trained on real lender policies and products. I can help you understand your options for car loans, home loans, personal loans, refinancing, and business finance. What would you like to know?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { sendMessage } = useChatBot();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Send to chatbot service
      const response = await sendMessage(inputValue);

      // Add assistant response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'I apologize, but I encountered an error processing your request. Please try again or contact our support team for assistance.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-secondary py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 p-4 rounded-full">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              Lending Assistant
            </h1>
            <p className="text-lg text-white/90 font-paragraph">
              Get instant answers about our loan products, lending policies, and application process
            </p>
          </div>
        </section>

        {/* Chat Container */}
        <section className="flex-1 flex items-center justify-center py-8 px-4 bg-light-gray">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg flex flex-col h-[600px] md:h-[700px]">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${
                      message.type === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-primary text-white rounded-br-none'
                          : 'bg-light-gray text-foreground rounded-bl-none'
                      }`}
                    >
                      <p className="font-paragraph text-sm md:text-base leading-relaxed">
                        {message.content}
                      </p>
                      <span
                        className={`text-xs mt-2 block ${
                          message.type === 'user'
                            ? 'text-white/70'
                            : 'text-foreground/60'
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-light-gray text-foreground px-4 py-3 rounded-lg rounded-bl-none flex items-center gap-2">
                    <Loader className="w-4 h-4 animate-spin text-primary" />
                    <span className="font-paragraph text-sm text-foreground/70">
                      Lending Assistant is typing...
                    </span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions (shown when no messages or few messages) */}
            {messages.length <= 1 && !isLoading && (
              <div className="px-6 py-4 border-t border-light-gray">
                <p className="text-xs font-paragraph text-foreground/60 mb-3 uppercase tracking-wide">
                  Quick Questions
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {[
                    'What car loan options do you have?',
                    'How does refinancing work?',
                    'What do I need to apply for a home loan?',
                    'Can you help with business finance?',
                  ].map((question, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickQuestion(question)}
                      className="text-left text-sm font-paragraph px-3 py-2 rounded-lg bg-light-gray hover:bg-accent/10 text-foreground transition-colors duration-200 border border-transparent hover:border-accent"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <form
              onSubmit={handleSendMessage}
              className="border-t border-light-gray p-4 bg-white rounded-b-2xl"
            >
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about car loans, home loans, refinancing..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 rounded-lg bg-light-gray border border-light-gray focus:border-primary focus:outline-none font-paragraph text-sm transition-colors duration-200 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white px-4 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  {isLoading ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>
              <p className="text-xs font-paragraph text-foreground/50 mt-2">
                This AI assistant provides general information. For specific financial advice, please contact our team.
              </p>
            </form>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-12 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">Instant Answers</h3>
                <p className="font-paragraph text-sm text-foreground/70">
                  Get immediate responses to your lending questions 24/7
                </p>
              </div>
              <div className="text-center">
                <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">Product Info</h3>
                <p className="font-paragraph text-sm text-foreground/70">
                  Learn about all our loan products and their features
                </p>
              </div>
              <div className="text-center">
                <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">Easy Navigation</h3>
                <p className="font-paragraph text-sm text-foreground/70">
                  Get guided through our application process step by step
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
