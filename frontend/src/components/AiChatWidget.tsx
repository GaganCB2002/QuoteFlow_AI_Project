import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, LogIn, Sparkles, Loader2 } from 'lucide-react';
import { apiRequest } from '../utils/api';
import { storage } from '../utils/storage';
import { useNavigate } from 'react-router-dom';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  requiresAuth?: boolean;
  redirectTo?: string;
}

const INITIAL_MESSAGE: ChatMessage = {
  role: 'assistant',
  content: "Hello! I'm your QuoteFlow AI Assistant. I can help you with:\n\n" +
    "- **How to generate a quotation** (step by step)\n" +
    "- **How to create an account**\n" +
    "- **How to log in**\n" +
    "- **What is QuoteFlow AI**\n" +
    "- **Features and pricing**\n" +
    "- **How AI quotations work**\n\n" +
    "What would you like to know?",
};

const AiChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleLoginRedirect = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: ChatMessage = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await apiRequest<{
        answer: string;
        requiresAuth?: boolean;
        redirectTo?: string;
      }>('/api/chat/ask', {
        method: 'POST',
        body: JSON.stringify({ question: input.trim() }),
      });

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: res.answer,
        requiresAuth: res.requiresAuth,
        redirectTo: res.redirectTo,
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch {
      const isLoggedIn = !!storage.getToken();
      const lower = input.toLowerCase();

      let answer = '';
      if (!isLoggedIn && (lower.includes('quotation') || lower.includes('quote') || lower.includes('invoice'))) {
        answer = "You need to be logged in to generate quotations or invoices. Please sign in first, or create an account if you don't have one. After logging in, come back and I'll guide you through the process step by step!";
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: answer,
          requiresAuth: true,
          redirectTo: '/login',
        }]);
      } else {
        answer = "I'm here to help! Try asking about:\n\n" +
          "- How to generate a quotation\n" +
          "- How to create an account\n" +
          "- How to log in\n" +
          "- Features of QuoteFlow AI\n" +
          "- How AI quotations work\n" +
          "- Pricing plans";
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: answer,
        }]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderMessage = (msg: ChatMessage, idx: number) => {
    const isLast = idx === messages.length - 1;

    return (
      <div key={idx} className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
        {msg.role === 'assistant' && (
          <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 mt-1">
            <Bot size={14} className="text-indigo-600" />
          </div>
        )}
        <div className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
          msg.role === 'user'
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-100 text-gray-800'
        }`}>
          <div className="whitespace-pre-wrap">{msg.content}</div>
          {msg.requiresAuth && (
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => handleLoginRedirect('/login')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white text-[12px] font-bold rounded-lg hover:bg-indigo-700 transition-all"
              >
                <LogIn size={13} /> Sign In
              </button>
              <button
                onClick={() => handleLoginRedirect('/register')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white text-[12px] font-bold rounded-lg hover:bg-emerald-700 transition-all"
              >
                <Sparkles size={13} /> Register
              </button>
            </div>
          )}
        </div>
        {msg.role === 'user' && (
          <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center shrink-0 mt-1">
            <User size={14} className="text-white" />
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between px-4 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                <Bot size={16} />
              </div>
              <div>
                <h3 className="font-bold text-[14px]">AI Assistant</h3>
                <p className="text-[11px] text-white/70">QuoteFlow AI Guide</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white p-1">
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 max-h-[420px] min-h-[300px] bg-gray-50/50">
            {messages.map((msg, idx) => renderMessage(msg, idx))}
            {loading && (
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                  <Bot size={14} className="text-indigo-600" />
                </div>
                <div className="bg-gray-100 rounded-xl px-3.5 py-2.5">
                  <Loader2 size={16} className="animate-spin text-indigo-600" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-gray-200 bg-white">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything about QuoteFlow..."
                className="flex-1 px-3.5 py-2.5 border border-gray-200 rounded-xl text-[13px] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                disabled={loading}
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="px-3.5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </button>
            </div>
            <p className="text-[10px] text-gray-400 mt-1.5 text-center">
              Ask about quotations, invoices, features, account setup, and more
            </p>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center"
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </>
  );
};

export default AiChatWidget;
