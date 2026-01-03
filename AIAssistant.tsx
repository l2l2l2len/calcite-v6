
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
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Check API availability on mount
  useEffect(() => {
    const checkConnection = async () => {
      const apiKey = process.env.API_KEY;

      if (!apiKey) {
        setConnectionStatus('error');
        setErrorMessage('API key not configured. Please set the API_KEY environment variable.');
        setMessages([{
          role: 'assistant',
          content: "I'm currently offline. The AI service requires an API key to be configured. Please contact the administrator or check the Help section for setup instructions."
        }]);
        return;
      }

      try {
        // Quick validation - just try to create the instance
        new GoogleGenAI({ apiKey });
        setConnectionStatus('connected');
        setMessages([{
          role: 'assistant',
          content: "CalcSite Pro AI here. I can help with rebar sizes, concrete mix ratios, structural codes, or complex material estimations. What's on your mind?"
        }]);
      } catch (e) {
        setConnectionStatus('error');
        setErrorMessage('Failed to initialize AI service. Please check your API key.');
        setMessages([{
          role: 'assistant',
          content: "I'm having trouble connecting to the AI service. Please check your internet connection and try again."
        }]);
      }
    };

    checkConnection();
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I can't process your request because the AI service is not configured. Please contact the administrator."
      }]);
      return;
    }

    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userText }]);
    setLoading(true);
    setErrorMessage(null);

    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [...messages, { role: 'user', content: userText }].map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        })),
        config: {
          systemInstruction: 'You are CalcSite Pro AI, an expert structural engineer. Provide precise technical advice, rebar estimations, and concrete standards (e.g., IS 456, ACI 318). Be professional, highly technical where needed, and helpful. Keep responses concise but accurate.',
          temperature: 0.7,
        }
      });

      const assistantResponse = response.text || 'I apologize, I could not process that specific engineering query.';
      setMessages(prev => [...prev, { role: 'assistant', content: assistantResponse }]);
      setConnectionStatus('connected');
    } catch (e: any) {
      console.error('AI Assistant Error:', e);

      let errorMsg = "I encountered an error processing your request.";

      if (e.message?.includes('API_KEY_INVALID') || e.message?.includes('API key')) {
        errorMsg = "The API key appears to be invalid. Please contact the administrator.";
        setConnectionStatus('error');
      } else if (e.message?.includes('QUOTA') || e.message?.includes('quota')) {
        errorMsg = "The AI service quota has been exceeded. Please try again later.";
      } else if (e.message?.includes('network') || e.message?.includes('fetch')) {
        errorMsg = "Network error. Please check your internet connection and try again.";
        setConnectionStatus('error');
      } else if (e.message?.includes('timeout')) {
        errorMsg = "The request timed out. Please try again with a shorter question.";
      }

      setMessages(prev => [...prev, { role: 'assistant', content: errorMsg }]);
      setErrorMessage(e.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setConnectionStatus('checking');
    setErrorMessage(null);

    // Re-check connection
    setTimeout(() => {
      const apiKey = process.env.API_KEY;
      if (apiKey) {
        setConnectionStatus('connected');
        setMessages([{
          role: 'assistant',
          content: "Connection restored. How can I help you with your engineering calculations?"
        }]);
      } else {
        setConnectionStatus('error');
        setErrorMessage('API key still not configured.');
      }
    }, 1000);
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
              <p className={`text-[10px] font-semibold uppercase tracking-widest flex items-center gap-1.5 ${
                connectionStatus === 'connected' ? 'text-mint' :
                connectionStatus === 'checking' ? 'text-amber-500' : 'text-red-500'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${
                  connectionStatus === 'connected' ? 'bg-mint animate-pulse' :
                  connectionStatus === 'checking' ? 'bg-amber-500 animate-pulse' : 'bg-red-500'
                }`} />
                {connectionStatus === 'connected' && 'AI Connected'}
                {connectionStatus === 'checking' && 'Connecting...'}
                {connectionStatus === 'error' && 'Offline'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center text-slate-light hover:text-gray-900 dark:hover:text-white active:scale-90 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Connection Error Banner */}
        {connectionStatus === 'error' && (
          <div className="px-4 py-3 bg-red-50 dark:bg-red-900/20 border-b border-red-100 dark:border-red-900/30 flex items-center justify-between">
            <p className="text-xs text-red-600 dark:text-red-400">
              {errorMessage || 'Unable to connect to AI service'}
            </p>
            <button
              onClick={handleRetry}
              className="text-xs font-semibold text-red-600 dark:text-red-400 hover:underline"
            >
              Retry
            </button>
          </div>
        )}

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
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
              placeholder={connectionStatus === 'error' ? 'AI service unavailable...' : 'Query rebar, mix, or codes...'}
              disabled={connectionStatus === 'error'}
              className="flex-1 px-5 py-4 bg-surface-tertiary dark:bg-white/5 rounded-xl outline-none font-medium text-[15px] border border-gray-200 dark:border-white/10 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all dark:text-white placeholder:text-slate-light disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading || connectionStatus === 'error'}
              className="w-14 h-14 btn-primary text-white rounded-xl flex items-center justify-center shadow-accent active:scale-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-6 h-6 rotate-90" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </div>
          <p className="text-[10px] text-slate-light text-center mt-3">
            Powered by Gemini AI. Responses are for reference only.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
