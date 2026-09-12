import React, { useState } from 'react';
import { User, BookOpen, MessageSquare, Instagram, Menu, X, Home } from 'lucide-react';
import { Language } from '../types';
import tapiCupLogo from '../assets/images/tapi_cup_logo.svg';

interface HeaderProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  currentPath: string;
  onNavigate: (path: string) => void;
}

export default function Header({ lang, onLanguageChange, currentPath, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getNavLabel = (key: 'about' | 'essays' | 'stickers' | 'home') => {
    switch (key) {
      case 'home':
        if (lang === 'fi') return 'ETUSIVU';
        if (lang === 'en') return 'HOME';
        return 'ホーム';
      case 'about':
        if (lang === 'fi') return 'TIETOA YOSHISTA';
        if (lang === 'en') return 'ABOUT YOSHI';
        return '辻義について';
      case 'essays':
        if (lang === 'fi') return 'ESSEET & TARINAT';
        if (lang === 'en') return 'ESSAYS';
        return 'エッセイ・文集';
      case 'stickers':
        if (lang === 'fi') return 'LINE-TARRAT';
        if (lang === 'en') return 'STICKERS';
        return '公式スタンプ';
    }
  };

  const handleNav = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="border-b border-neutral-200/90 bg-[#FBF9F6]/95 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-8 py-3 transition-colors">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo & Title (Top Left) */}
        <div 
          onClick={() => handleNav('/')}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none group"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') handleNav('/'); }}
        >
          {/* Authentic Tapioka Cup Character Logo */}
          <div className="relative w-9 h-9 sm:w-11 sm:h-11 shrink-0 flex items-center justify-center">
            <img 
              src={tapiCupLogo} 
              alt="Tapi Life King Tapioka Cup Logo" 
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
            <span className="font-serif tracking-widest text-lg sm:text-xl font-bold text-neutral-900 uppercase leading-tight group-hover:text-amber-800 transition-colors">
              TAPI LIFE
            </span>
            <span className="text-[9px] font-mono tracking-wider text-neutral-400 font-medium px-1.5 py-0.2 sm:py-0.5 border border-neutral-200 rounded w-fit bg-white/60">
              辻義 / YOSHI TSUIJI
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-mono tracking-wider text-neutral-600">
          <button 
            onClick={() => handleNav('/')}
            className={`transition-colors flex items-center gap-1.5 font-medium cursor-pointer py-1 ${
              currentPath === '/' 
                ? 'text-neutral-950 font-bold border-b-2 border-neutral-900' 
                : 'hover:text-neutral-950'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>{getNavLabel('home')}</span>
          </button>

          <button 
            onClick={() => handleNav('/about')}
            className={`transition-colors flex items-center gap-1.5 font-medium cursor-pointer py-1 ${
              currentPath === '/about' 
                ? 'text-neutral-950 font-bold border-b-2 border-neutral-900' 
                : 'hover:text-neutral-950'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>{getNavLabel('about')}</span>
          </button>

          <button 
            onClick={() => handleNav('/essays')}
            className={`transition-colors flex items-center gap-1.5 font-medium cursor-pointer py-1 ${
              currentPath === '/essays' 
                ? 'text-neutral-950 font-bold border-b-2 border-neutral-900' 
                : 'hover:text-neutral-950'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{getNavLabel('essays')}</span>
          </button>

          <a 
            href="https://store.line.me/stickershop/author/4712842/en" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-neutral-950 transition-colors flex items-center gap-1 font-medium py-1"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{getNavLabel('stickers')}</span>
          </a>

          <a 
            href="https://www.instagram.com/tapitaka_119/" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-neutral-950 transition-colors flex items-center gap-1 font-medium py-1"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>INSTAGRAM</span>
          </a>
        </nav>

        {/* Right Section: Language Switcher (JA / EN / FI) */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* 3-Way Language Selector */}
          <div className="inline-flex items-center p-0.5 rounded-lg border border-neutral-300/80 bg-neutral-100/80 text-xs font-mono">
            <button
              type="button"
              onClick={() => onLanguageChange('ja')}
              className={`px-2 sm:px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-medium transition-all cursor-pointer ${
                lang === 'ja'
                  ? 'bg-white text-neutral-900 shadow-xs font-bold'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50'
              }`}
              title="日本語 (Japanese)"
            >
              JP
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`px-2 sm:px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-medium transition-all cursor-pointer ${
                lang === 'en'
                  ? 'bg-white text-neutral-900 shadow-xs font-bold'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50'
              }`}
              title="English"
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('fi')}
              className={`px-2 sm:px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-medium transition-all cursor-pointer ${
                lang === 'fi'
                  ? 'bg-white text-neutral-900 shadow-xs font-bold'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50'
              }`}
              title="Suomi (Finnish)"
            >
              FI
            </button>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-200/60 rounded-md transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-neutral-200 pb-2 space-y-2 font-mono text-xs">
          <button 
            onClick={() => handleNav('/')}
            className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 ${
              currentPath === '/' ? 'bg-neutral-200 text-neutral-950 font-bold' : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>{getNavLabel('home')}</span>
          </button>

          <button 
            onClick={() => handleNav('/about')}
            className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 ${
              currentPath === '/about' ? 'bg-neutral-200 text-neutral-950 font-bold' : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            <User className="w-4 h-4" />
            <span>{getNavLabel('about')}</span>
          </button>

          <button 
            onClick={() => handleNav('/essays')}
            className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 ${
              currentPath === '/essays' ? 'bg-neutral-200 text-neutral-950 font-bold' : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{getNavLabel('essays')}</span>
          </button>

          <a 
            href="https://store.line.me/stickershop/author/4712842/en" 
            target="_blank" 
            rel="noreferrer" 
            className="w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 text-neutral-700 hover:bg-neutral-100"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{getNavLabel('stickers')}</span>
          </a>

          <a 
            href="https://www.instagram.com/tapitaka_119/" 
            target="_blank" 
            rel="noreferrer" 
            className="w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 text-neutral-700 hover:bg-neutral-100"
          >
            <Instagram className="w-4 h-4" />
            <span>INSTAGRAM (@tapitaka_119)</span>
          </a>
        </div>
      )}
    </header>
  );
}
