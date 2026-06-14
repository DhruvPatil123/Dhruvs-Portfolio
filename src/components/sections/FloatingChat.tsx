import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles, Bot, User, CornerDownLeft, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  provider?: 'claude' | 'gemini';
  timestamp: Date;
}

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I am Dhruv's AI double. Ask me anything about my B.Tech in Artificial Intelligence, my flagship projects like Raincrew.AI, my translation systems, or my developer expertise! I'm here to act as your personal guide.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    
    // Append User Message
    const userMessage: Message = {
      role: 'user',
      content: userText,
      timestamp: new Date()
    };
    
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      // Map history for full context backend proxy
      // Keep only last 10 messages for token efficiency and speedy delivery
      const chatHistory = updatedMessages.slice(-10).map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: chatHistory })
      });

      if (!res.ok) {
        throw new Error('Could not fetch response from chat double.');
      }

      const data = await res.json();
      
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: data.text || "I apologize, something went wrong formatting my answer.",
          provider: data.provider || 'gemini',
          timestamp: new Date()
        }
      ]);
    } catch (err: any) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: "I'm having brief static in my connection. Would you mind asking again or checking my socials directly?",
          provider: 'gemini',
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="mb-4 w-[340px] sm:w-[380px] h-[520px] max-h-[80vh] flex flex-col rounded-2xl border border-brand-primary/20 bg-[#04010e]/95 backdrop-blur-lg shadow-[0_12px_40px_rgba(139,92,246,0.25)] overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 border-b border-brand-primary/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center border border-white/20">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-[#04010e]" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-white tracking-wide flex items-center gap-1.5">
                    Dhruv&apos;s AI Agent
                    <Sparkles className="h-3 w-3 text-brand-secondary animate-pulse" />
                  </h3>
                  <p className="text-[10px] uppercase font-mono text-neutral-400 tracking-widest">
                    Interactive Chat Double
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg border border-white/5 hover:border-brand-secondary/30 text-neutral-400 hover:text-white transition-colors duration-200"
                aria-label="Close Chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Conversation Core Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex gap-2 max-w-[85%]">
                    {msg.role === 'assistant' && (
                      <div className="w-6 h-6 rounded-full bg-brand-primary/25 flex items-center justify-center shrink-0 border border-brand-primary/30 mt-1">
                        <Bot className="h-3.5 w-3.5 text-neutral-200" />
                      </div>
                    )}
                    
                    <div className="space-y-1">
                      <div
                        className={`p-3 rounded-xl text-xs sm:text-sm leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-tr-none'
                            : 'bg-white/5 border border-white/10 text-neutral-200 rounded-tl-none'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      </div>

                      {/* Provider Stamp Badge */}
                      {msg.role === 'assistant' && (
                        <div className="flex items-center gap-1.5 pl-1.5">
                          <span className="text-[9px] uppercase font-mono tracking-wider text-neutral-500">
                            Powered by {msg.provider === 'claude' ? 'Claude API' : 'Gemini 3.5'}
                          </span>
                        </div>
                      )}
                    </div>

                    {msg.role === 'user' && (
                      <div className="w-6 h-6 rounded-full bg-brand-secondary/25 flex items-center justify-center shrink-0 border border-brand-secondary/30 mt-1">
                        <User className="h-3.5 w-3.5 text-neutral-200" />
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2 max-w-[80%]">
                    <div className="w-6 h-6 rounded-full bg-brand-primary/25 flex items-center justify-center shrink-0 animate-spin">
                      <Loader2 className="h-3.5 w-3.5 text-neutral-400" />
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-neutral-400 rounded-tl-none flex items-center gap-2">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary animate-bounce"></span>
                      </div>
                      <span className="text-[10px] font-mono tracking-widest text-[#06b6d4]">Synthesizing response...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 border-t border-white/10 bg-black/40 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Dhruv about AI, projects..."
                className="flex-1 bg-white/5 border border-white/10 focus:border-brand-secondary/50 focus:ring-1 focus:ring-brand-secondary/30 rounded-xl px-3 py-2 text-xs sm:text-sm text-white placeholder-neutral-500 outline-none transition-all duration-200"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 disabled:from-neutral-800 disabled:to-neutral-900 text-white flex items-center justify-center transition-all duration-200 cursor-pointer disabled:cursor-not-allowed border border-white/10"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Bubble */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center text-white shadow-[0_0_20px_rgba(139,92,246,0.35)] cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-secondary/50"
        aria-label="Toggle Portfolio AI Assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative"
            >
              <MessageSquare className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-green-400 border border-[#04010e] animate-ping" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-green-400 border border-[#04010e]" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
