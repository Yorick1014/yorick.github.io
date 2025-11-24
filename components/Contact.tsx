import React, { useState } from 'react';
import { Mail, Sparkles, RefreshCw } from 'lucide-react';
import { Button } from './ui/Button';
import { draftContactMessage } from '../services/geminiService';

export const Contact: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Professional');
  const [message, setMessage] = useState('');
  const [isDrafting, setIsDrafting] = useState(false);

  const handleAIDraft = async () => {
    if (!topic) return;
    setIsDrafting(true);
    const draft = await draftContactMessage(topic, tone);
    setMessage(draft);
    setIsDrafting(false);
  };

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-slate-950 pointer-events-none -z-10">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Let's Connect</h2>
          <p className="text-slate-400">
            Have a project in mind or just want to say hi? <br/>
            Use the <span className="text-indigo-400">AI Assistant</span> below if you have writer's block.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8 bg-slate-900/50 border border-slate-800 rounded-2xl p-8 backdrop-blur-md">
          
          {/* AI Drafting Sidebar */}
          <div className="md:col-span-2 space-y-6 border-b md:border-b-0 md:border-r border-slate-800 pb-6 md:pb-0 md:pr-6">
            <div className="flex items-center gap-2 text-indigo-400 mb-2">
              <Sparkles size={18} />
              <h3 className="font-semibold text-white">AI Magic Drafter</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">What's this about?</label>
                <input 
                  type="text" 
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Freelance React project"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Tone</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Professional', 'Casual', 'Urgent', 'Friendly'].map(t => (
                    <button
                      key={t}
                      onClick={() => setTone(t)}
                      className={`text-xs py-1.5 px-2 rounded border transition-colors ${
                        tone === t 
                        ? 'bg-indigo-600 border-indigo-500 text-white' 
                        : 'bg-slate-950 border-slate-700 text-slate-400 hover:border-slate-600'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <Button 
                onClick={handleAIDraft} 
                isLoading={isDrafting}
                disabled={!topic}
                className="w-full"
                size="sm"
                icon={<Sparkles size={14} />}
              >
                Generate Draft
              </Button>
            </div>
          </div>

          {/* Main Form */}
          <div className="md:col-span-3 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Name</label>
                <input type="text" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-indigo-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Email</label>
                <input type="email" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-indigo-500 outline-none" />
              </div>
            </div>
            
            <div className="relative">
              <label className="block text-xs text-slate-400 mb-1">Message</label>
              <textarea 
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-indigo-500 outline-none resize-none leading-relaxed"
                placeholder="Type your message here..."
              ></textarea>
              {message && (
                <button 
                  onClick={() => setMessage('')}
                  className="absolute top-8 right-3 text-slate-500 hover:text-white transition-colors"
                  title="Clear"
                >
                  <RefreshCw size={14} />
                </button>
              )}
            </div>

            <Button className="w-full" size="lg" icon={<Mail size={18} />}>
              Send Message
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};