import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, X, Send, Bot, User, 
  RefreshCw, Check, Languages, LayoutGrid, FileText
} from 'lucide-react';

// Message structure
interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
}

interface AIChatbotProps {
  templateTitle: string;
  templateCategory: string;
}

export const AIChatbot: React.FC<AIChatbotProps> = ({ templateTitle, templateCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      id: 'welcome', 
      sender: 'assistant', 
      text: `Hello! I am your CommsFlow AI writing assistant. I've analyzed your layout "${templateTitle}" (${templateCategory}). How can I help polish your copy today?` 
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  const feedEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of feed on updates
  useEffect(() => {
    feedEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Context-aware responses dictionary
  const getContextualResponse = (prompt: string): string => {
    const p = prompt.toLowerCase();
    const isBilling = templateCategory.toLowerCase().includes('invoice') || templateCategory.toLowerCase().includes('receipt') || templateCategory.toLowerCase().includes('quotation') || templateCategory.toLowerCase().includes('billing');
    const isTech = templateCategory.toLowerCase().includes('release') || templateCategory.toLowerCase().includes('changelog') || templateCategory.toLowerCase().includes('sprint') || templateCategory.toLowerCase().includes('incident');

    if (p.includes('subject') || p.includes('headline')) {
      if (isBilling) {
        return `Here are three engaging subject line suggestions for your billing layout:
1. "💳 Payment Receipt: Invoice Ref #${Math.floor(Math.random() * 9000 + 1000)}"
2. "Action Required: Your Q3 Subscription Quotation is Ready"
3. "Receipt: Thank you for your business with CommsFlow AI"`;
      }
      if (isTech) {
        return `Here are three subject lines tailored for your engineering changelog:
1. "🚀 Immediate Action: Production Database Nodes Patched Successfully"
2. "Announcement: Software Release V3.4.0 Changelog Revisions"
3. "sprint-retrospective: Completed core UI auto-scaling updates"`;
      }
      return `Here are three email subject lines for "${templateTitle}":
1. "📢 Important Announcement: "${templateTitle}" updates inside"
2. "Exclusive: Review your custom business layout drafts"
3. "Action Required: Enforce locked brand variables now"`;
    }

    if (p.includes('professional') || p.includes('rewrite')) {
      return `I have polished your paragraph to maintain a professional, corporate tone:
"Please find enclosed the formal layout credentials and billing structures representing our active services. All assets are compiled under global guidelines and locked for verification."`;
    }

    if (p.includes('grammar') || p.includes('fix') || p.includes('spelling')) {
      return `I scanned the active copy. I found and corrected two grammar issues:
- Fixed 'receiveing' to 'receiving' in your footer guidelines.
- Changed subject-verb agreement on your header variables. All layout blocks are now grammatically verified!`;
    }

    if (p.includes('summarize')) {
      return `Here is a 3-point executive summary of your active "${templateCategory}" document:
- Document Type: Verified ${templateCategory} layout node.
- Brand Integrity: Color guidelines locked under corporate guidelines.
- Core Action: Invites user CTA clicks with dynamic border roundedness.`;
    }

    if (p.includes('translate')) {
      return `Here is the French translation of your layout body:
"Veuillez trouver ci-joint les justificatifs officiels et les structures de facturation représentant nos services actifs. Tous les actifs sont compilés selon les directives mondiales."`;
    }

    if (p.includes('section') || p.includes('generate')) {
      return `Here is a pre-approved, responsive Call-to-Action button block. You can copy and drag this into your visual builder:
\`<a href="#" style="background-color: #7c3aed; color: #ffffff; padding: 10px 24px; border-radius: 8px; font-weight: bold; text-decoration: none; display: inline-block;">Explore Workspace</a>\``;
    }

    // Default response for custom prompts
    return `I've analyzed your custom instruction: "${prompt}". I recommend checking your locked brand variables in the Settings tab, or dragging a Standard Hero Block into the canvas to fulfill this request. Let me know if you would like me to rewrite or translate specific blocks!`;
  };

  // Simulates typewriter streaming output character-by-character
  const streamResponse = (fullText: string) => {
    setIsTyping(false); // hide the loader dots
    
    const messageId = `msg-stream-${Date.now()}`;
    // Insert an empty message to start streaming into
    setMessages(prev => [...prev, { id: messageId, sender: 'assistant', text: '' }]);

    let index = 0;
    const interval = setInterval(() => {
      setMessages(prev => prev.map(m => {
        if (m.id === messageId) {
          return { ...m, text: fullText.slice(0, index + 1) };
        }
        return m;
      }));

      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, 15); // print 1 character every 15ms
  };

  const handleSendPrompt = (promptText: string) => {
    if (!promptText.trim()) return;

    // Push User message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: promptText
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Toggle assistant loading dots
    setIsTyping(true);

    // After 1.2s loader delay, stream response
    setTimeout(() => {
      const reply = getContextualResponse(promptText);
      streamResponse(reply);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* A. FLOATING CIRCULAR TOGGLE BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle AI writing assistant"
        className="w-12 h-12 rounded-full bg-gradient-premium hover:opacity-90 flex items-center justify-center shadow-xl shadow-violet-500/20 text-white cursor-pointer relative group transition-transform duration-300 hover:scale-105"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -95, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 95, opacity: 0 }}
            >
              <X className="w-5 h-5 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="sparkles"
              initial={{ rotate: 95, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -95, opacity: 0 }}
              className="relative"
            >
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* B. EXPANDABLE FLOATING CHAT DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="absolute bottom-16 right-0 w-80 sm:w-96 h-[500px] glass-card rounded-2xl border border-white/10 bg-[#09090c] shadow-2xl flex flex-col justify-between overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-[#0c0c10] border-b border-white/5 flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-2 text-left">
                <div className="w-6 h-6 rounded-lg bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shrink-0">
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white font-heading">CommsFlow AI Assistant</div>
                  <div className="text-[8px] text-slate-500">Writing partner • Frontend mockup</div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded text-slate-500 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Chat Messages Feed & Smart Actions */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
              
              {/* Messages block */}
              {messages.map((m) => (
                <div 
                  key={m.id} 
                  className={`flex items-start space-x-2.5 max-w-[85%] text-left ${m.sender === 'user' ? 'ml-auto flex-row-reverse space-x-reverse' : ''}`}
                >
                  <div className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[10px] ${
                    m.sender === 'user' 
                      ? 'bg-violet-600 text-white' 
                      : 'bg-white/5 border border-white/10 text-slate-400'
                  }`}>
                    {m.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5 text-violet-400" />}
                  </div>
                  <div className={`p-3 rounded-2xl text-[11px] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-gradient-premium text-white rounded-tr-none'
                      : 'bg-white/5 border border-white/5 text-slate-300 rounded-tl-none whitespace-pre-line'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}

              {/* Bouncing typing loader animation dots */}
              {isTyping && (
                <div className="flex items-start space-x-2.5 max-w-[85%] text-left animate-fade-in">
                  <div className="w-6 h-6 rounded-full shrink-0 bg-white/5 border border-white/10 flex items-center justify-center text-slate-400">
                    <Bot className="w-3.5 h-3.5 text-violet-400" />
                  </div>
                  <div className="p-3 bg-white/5 border border-white/5 rounded-2xl rounded-tl-none flex items-center space-x-1.5 h-8">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              <div ref={feedEndRef} />
            </div>

            {/* Smart Actions Grid panel (above text input) */}
            <div className="px-4 py-2 border-t border-white/5 bg-[#09090c]/70 flex flex-col space-y-2 shrink-0">
              <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest text-left font-heading">AI Action Shortcuts</div>
              <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar pb-1">
                {[
                  { label: 'Suggest Subjects', icon: <FileText className="h-3 w-3 text-cyan-400" /> },
                  { label: 'Professional Tone', icon: <Bot className="h-3 w-3 text-violet-400" /> },
                  { label: 'Fix Grammar', icon: <Check className="h-3 w-3 text-green-400" /> },
                  { label: 'Summarize', icon: <RefreshCw className="h-3 w-3 text-amber-400" /> },
                  { label: 'Translate to French', icon: <Languages className="h-3 w-3 text-pink-400" /> },
                  { label: 'Generate Button block', icon: <LayoutGrid className="h-3 w-3 text-red-400" /> }
                ].map((act, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendPrompt(act.label)}
                    className="flex items-center space-x-1 px-2.5 py-1 bg-white/5 border border-white/5 rounded-lg text-[9px] font-semibold text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                  >
                    {act.icon}
                    <span>{act.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-[#0c0c10] border-t border-white/5 shrink-0 flex items-center space-x-2">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendPrompt(input);
                }} 
                className="w-full relative"
              >
                <input
                  type="text"
                  placeholder="Ask AI writing partner..."
                  value={input}
                  disabled={isTyping}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full pl-3 pr-10 py-2 bg-white/5 border border-white/5 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/30 rounded-xl text-xs text-white placeholder-slate-500 disabled:opacity-60 transition-all font-heading"
                />
                
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
