
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIAssistantProps {
  onClose: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "CalcSite Pro AI here. I can help with rebar sizes, concrete mix ratios, structural codes, or complex material estimations. What's on your mind?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userText }]);
    setLoading(true);

    try {
      // Create a fresh instance for every call to ensure the latest API key/config is used.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      // Use gemini-2.0-flash for fast, capable responses
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [...messages, { role: 'user', content: userText }].map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        })),
        config: {
          systemInstruction: 'You are CalcSite Pro AI, an expert structural engineer. Provide precise technical advice, rebar estimations, and concrete standards (e.g., IS 456, ACI 318). Be professional, highly technical where needed, and helpful.',
          temperature: 0.7,
        }
      });

      const assistantResponse = response.text || 'I apologize, I could not process that specific engineering query.';
      setMessages(prev => [...prev, { role: 'assistant', content: assistantResponse }]);
    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, { role: 'assistant', content: "Connectivity or service issue. Please check your network and try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-navy/80 backdrop-blur-sm flex items-end animate-in fade-in duration-300">
      <div className="bg-surface-secondary dark:bg-navy w-full max-w-md mx-auto h-[90vh] rounded-t-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-500">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200 dark:border-white/10 flex justify-between items-center bg-white dark:bg-navy-light/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-purple flex items-center justify-center text-white font-bold shadow-accent">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white leading-none mb-1">Engineering Assistant</h3>
              <p className="text-[10px] font-semibold text-mint uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-mint rounded-full animate-pulse" /> AI Connected
              </p>
            </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center text-slate-light hover:text-gray-900 dark:hover:text-white active:scale-90 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar bg-surface-tertiary dark:bg-navy/50">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-[14px] font-medium leading-relaxed ${
                m.role === 'user'
                  ? 'bg-gradient-to-br from-accent to-accent-purple text-white rounded-tr-none shadow-accent/20'
                  : 'card-enterprise rounded-tl-none'
              }`}>
                <span className={m.role === 'user' ? '' : 'text-gray-800 dark:text-gray-200'}>{m.content}</span>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="card-enterprise px-4 py-3 rounded-2xl rounded-tl-none flex gap-1.5">
                <div className="w-2 h-2 bg-accent rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-2 h-2 bg-accent rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-2 h-2 bg-accent rounded-full animate-bounce" />
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-5 bg-white dark:bg-navy-light/30 border-t border-gray-200 dark:border-white/10 pb-10">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Query rebar, mix, or codes..."
              className="flex-1 px-5 py-4 bg-surface-tertiary dark:bg-white/5 rounded-xl outline-none font-medium text-[15px] border border-gray-200 dark:border-white/10 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all dark:text-white placeholder:text-slate-light"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="w-14 h-14 btn-primary text-white rounded-xl flex items-center justify-center shadow-accent active:scale-90 transition-all disabled:opacity-50"
            >
              <svg className="w-6 h-6 rotate-90" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
