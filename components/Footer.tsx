import React from 'react';
import { SITE_CONFIG } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-slate-500 text-sm">
          © {new Date().getFullYear()} {SITE_CONFIG.name}. Built with React, Tailwind & Gemini.
        </div>
        <div className="flex gap-6 text-sm text-slate-400">
          <a href={SITE_CONFIG.github} className="hover:text-indigo-400 transition-colors">Github</a>
          <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-indigo-400 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};