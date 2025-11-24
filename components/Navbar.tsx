import React, { useState, useEffect } from 'react';
import { NAV_SECTIONS, SITE_CONFIG } from '../constants';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const renderLogo = () => {
    const parts = SITE_CONFIG.title.split(' ');
    if (parts.length < 2) return SITE_CONFIG.title;
    return (
      <>
        {parts[0]} <span className="text-indigo-500">{parts.slice(1).join(' ')}</span>
      </>
    );
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="text-xl font-bold text-white tracking-tighter">
          {renderLogo()}
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_SECTIONS.map(section => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="text-sm font-medium text-slate-300 hover:text-white hover:text-indigo-400 transition-colors"
            >
              {section.label}
            </button>
          ))}
          <a 
            href={SITE_CONFIG.cvLink} 
            target="_blank" 
            rel="noreferrer"
            className="px-4 py-2 text-sm bg-slate-100 text-slate-900 rounded-full font-semibold hover:bg-white transition-colors"
          >
            Download CV
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-slate-300"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-slate-900 border-b border-slate-800 p-6 flex flex-col gap-4">
          {NAV_SECTIONS.map(section => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="text-left text-base font-medium text-slate-300 py-2 border-b border-slate-800/50"
            >
              {section.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};