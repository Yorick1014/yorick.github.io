import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles } from 'lucide-react';
import { sendChatMsg } from '../services/geminiService';
import { ChatMessage } from '../types';
import { RESUME_CONTEXT, ABOUT_CONTENT, SITE_CONFIG } from '../constants';
import { Button } from './ui/Button';

export const About: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: `Hi! I'm ${SITE_CONFIG.name.split(' ')[0]}'s AI Assistant. Ask me anything!` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Filter history for API to avoid sending error flags or internal types if any
    const apiHistory = messages.map(m => ({ role: m.role, text: m.text }));
    
    const responseText = await sendChatMsg(input, apiHistory, RESUME_CONTEXT);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <section id="about" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left: Static Content & Profile Image */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Profile Image */}
            <div className="relative group shrink-0">
               <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
               <img 
                 src={ABOUT_CONTENT.profileImage} 
                 alt="Profile" 
                 className="relative w-32 h-32 md:w-40 md:h-40 object-cover rounded-2xl shadow-xl ring-1 ring-slate-900/5"
               />
            </div>
            
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white flex items-center gap-2 mb-4">
                About Me
              </h2>
              <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
                {ABOUT_CONTENT.introduction.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
            
          <div className="pt-2">
            <h3 className="text-lg font-semibold text-white mb-3">Core Stack</h3>
            <div className="flex flex-wrap gap-2">
              {ABOUT_CONTENT.skills.map(tech => (
                <span key={tech} className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-xs text-indigo-300 font-mono hover:bg-slate-700 transition-colors cursor-default">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: AI Chat Interface */}
        <div className="glass-panel rounded-2xl p-1 shadow-2xl shadow-indigo-500/10 flex flex-col h-[500px]">
          <div className="bg-slate-900/50 p-4 rounded-t-xl border-b border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-500 p-2 rounded-lg">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">{SITE_CONFIG.name.split(' ')[0]}'s Digital Twin</h3>
                <p className="text-xs text-indigo-300">Powered by Gemini Flash</p>
              </div>
            </div>
            <Sparkles size={16} className="text-indigo-400 animate-pulse" />
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`
                  max-w-[85%] rounded-2xl px-4 py-3 text-sm
                  ${msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-br-none' 
                    : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'}
                `}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 rounded-2xl rounded-bl-none px-4 py-3 border border-slate-700 flex items-center gap-1">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-slate-700 bg-slate-900/30 rounded-b-xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask quickly..."
                className="flex-1 bg-slate-950 border border-slate-700 text-white text-sm rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none placeholder:text-slate-500"
              />
              <Button 
                onClick={handleSend} 
                disabled={!input.trim() || isLoading}
                variant="primary"
                className="!p-2"
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};