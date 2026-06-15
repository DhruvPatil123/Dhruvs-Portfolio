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
            initial={{ 
              clipPath: "circle(24px at calc(100% - 28px) calc(100% - 28px))",
              opacity: 0, 
              scale: 0.85, 
              y: 40 
            }}
            animate={{ 
              clipPath: "circle(800px at calc(100% - 28px) calc(100% - 28px))",
              opacity: 1, 
              scale: 1, 
              y: 0 
            }}
            exit={{ 
              clipPath: "circle(24px at calc(100% - 28px) calc(100% - 28px))",
              opacity: 0, 
              scale: 0.85, 
              y: 40 
            }}
            transition={{ 
              type: 'spring', 
              damping: 32, 
              stiffness: 240, 
              mass: 1 
            }}
            className="mb-4 w-[340px] sm:w-[380px] h-[520px] max-h-[80vh] flex flex-col rounded-[2rem] border border-white/10 bg-[#0c0c0ced] backdrop-blur-lg shadow-2xl overflow-hidden relative"
          >
            {/* Creative "Sliding Window" Continuous Laser Scan Line */}
            <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none z-30 animate-sliding-laser shadow-[0_0_8px_rgba(255,255,255,0.4)]" />

            {/* Header */}
            <div className="p-4 bg-white/5 border-b border-white/5 flex items-center justify-between relative">
              {/* Creative sliding window status ticker */}
              <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white/5 overflow-hidden">
                <motion.div 
                  className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{ x: ['-100%', '300%'] }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-neutral-400 border border-[#050505]" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-white tracking-wide flex items-center gap-1.5">
                    Dhruv&apos;s AI Agent
                    <Sparkles className="h-3 w-3 text-neutral-400" />
                  </h3>
                  <p className="text-[10px] uppercase font-mono text-neutral-400 tracking-widest">
                    Interactive Chat Double
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full border border-white/5 hover:border-white/20 text-neutral-400 hover:text-white transition-colors duration-200"
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
                      <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/5 mt-1">
                        <Bot className="h-3.5 w-3.5 text-neutral-200" />
                      </div>
                    )}
                    
                    <div className="space-y-1">
                      <div
                        className={`p-3 rounded-xl text-xs sm:text-sm leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-white text-neutral-900 rounded-tr-none font-medium'
                            : 'bg-white/5 border border-white/5 text-neutral-200 rounded-tl-none'
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
                      <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/5 mt-1">
                        <User className="h-3.5 w-3.5 text-neutral-200" />
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2 max-w-[80%]">
                    <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center shrink-0 animate-spin">
                      <Loader2 className="h-3.5 w-3.5 text-neutral-400" />
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-neutral-400 rounded-tl-none flex items-center gap-2">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce"></span>
                      </div>
                      <span className="text-[10px] font-mono tracking-widest text-neutral-400">Synthesizing response...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 border-t border-white/5 bg-black/40 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Dhruv about AI, projects..."
                className="flex-1 bg-white/5 border border-white/5 focus:border-white/20 focus:ring-1 focus:ring-white/10 rounded-xl px-3 py-2 text-xs sm:text-sm text-white placeholder-neutral-500 outline-none transition-all duration-200"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-neutral-200 disabled:bg-neutral-800 disabled:text-neutral-500 text-[#050505] flex items-center justify-center transition-all duration-200 cursor-pointer disabled:cursor-not-allowed font-mono hover:text-[#000]"
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
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-[#050505] shadow-2xl cursor-pointer focus:outline-none"
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
              className="relative animate-[pulse_3s_infinite]"
            >
              <MessageSquare className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
