import React, { useState } from 'react';
import { User, BookOpen, MessageSquare, Instagram, Menu, X, Home, Sun, Moon } from 'lucide-react';
import { Language, ThemeMode } from '../types';
import tapiCupLogo from '../assets/images/tapi_cup_logo.svg';

interface HeaderProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  currentPath: string;
  onNavigate: (path: string) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onReplaySlash?: () => void;
}

export default function Header({ 
  lang, 
  onLanguageChange, 
  currentPath, 
  onNavigate,
  theme,
  onToggleTheme,
  onReplaySlash
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDark = theme === 'dark';

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
    <header className={`border-b sticky top-0 z-40 px-3 sm:px-8 py-2.5 sm:py-3 transition-colors backdrop-blur-md ${
      isDark 
        ? 'bg-[#0e0d16]/95 border-neutral-800/80 text-neutral-100' 
        : 'bg-[#FBF9F6]/95 border-neutral-200/90 text-neutral-900'
    }`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo & Title (Top Left) */}
        <div 
          onClick={() => handleNav('/')}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') handleNav('/'); }}
        >
          {/* Authentic Tapioka Cup Character Logo */}
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 shrink-0 flex items-center justify-center">
            <img 
              src={tapiCupLogo} 
              alt="Tapi Life King Tapioka Cup Logo" 
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Clean TAPI [Bright Pumpkin] LIFE Brand Title */}
          <div className="flex items-center gap-1.5">
            <span className={`font-serif tracking-widest text-base sm:text-lg font-bold uppercase leading-none transition-colors ${
              isDark ? 'text-neutral-100 group-hover:text-amber-400' : 'text-neutral-900 group-hover:text-amber-800'
            }`}>
              TAPI
            </span>

            {/* Bright and Lighted Pumpkin between TAPI and LIFE */}
            <div 
              className="inline-flex items-center justify-center self-center" 
              title="Happy Halloween! 🎃"
            >
              <svg 
                viewBox="0 0 32 32" 
                className="w-5 h-5 sm:w-5.5 sm:h-5.5 transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(245,158,11,0.95)]"
                style={{
                  filter: 'drop-shadow(0 0 4px #FFA000) drop-shadow(0 0 10px #FFD54F) drop-shadow(0 0 16px rgba(255,160,0,0.7))'
                }}
              >
                <defs>
                  <radialGradient id="brightPumpkinLight" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="35%" stopColor="#FFF9A6" />
                    <stop offset="70%" stopColor="#FFB300" />
                    <stop offset="100%" stopColor="#FF6D00" />
                  </radialGradient>
                  <linearGradient id="pumpkinSkinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFB020" />
                    <stop offset="45%" stopColor="#FF7A00" />
                    <stop offset="100%" stopColor="#E65100" />
                  </linearGradient>
                </defs>

                {/* Stem */}
                <path d="M15 5.5 Q16 1.5 19 1.5 Q18 4.5 16.5 6.5 Z" fill="#2E7D32" stroke="#1B5E20" strokeWidth="0.8" />
                
                {/* Lobes */}
                <ellipse cx="9.5" cy="18" rx="6.2" ry="8.5" fill="url(#pumpkinSkinGrad)" stroke="#BF360C" strokeWidth="0.7" />
                <ellipse cx="22.5" cy="18" rx="6.2" ry="8.5" fill="url(#pumpkinSkinGrad)" stroke="#BF360C" strokeWidth="0.7" />
                <ellipse cx="12.5" cy="18" rx="5.8" ry="9.5" fill="url(#pumpkinSkinGrad)" stroke="#BF360C" strokeWidth="0.7" />
                <ellipse cx="19.5" cy="18" rx="5.8" ry="9.5" fill="url(#pumpkinSkinGrad)" stroke="#BF360C" strokeWidth="0.7" />
                <ellipse cx="16" cy="18" rx="5.4" ry="10" fill="url(#pumpkinSkinGrad)" stroke="#BF360C" strokeWidth="0.7" />

                {/* Eyes */}
                <polygon points="10.5,14 14,16 10.5,17" fill="url(#brightPumpkinLight)" stroke="#FFF9C4" strokeWidth="0.5" />
                <polygon points="21.5,14 18,16 21.5,17" fill="url(#brightPumpkinLight)" stroke="#FFF9C4" strokeWidth="0.5" />

                {/* Nose */}
                <polygon points="16,16 15,18.5 17,18.5" fill="url(#brightPumpkinLight)" stroke="#FFF9C4" strokeWidth="0.4" />

                {/* Grinning Mouth */}
                <path 
                  d="M10 20 Q16 26.5 22 20 Q19 22.8 16 21.5 Q13 22.8 10 20 Z" 
                  fill="url(#brightPumpkinLight)" 
                  stroke="#FFF9C4" 
                  strokeWidth="0.5" 
                />
                <rect x="13.2" y="20.8" width="1.4" height="1.5" fill="#FFE082" />
                <rect x="17.4" y="21.8" width="1.4" height="1.4" fill="#FFE082" />
              </svg>
            </div>

            <span className={`font-serif tracking-widest text-base sm:text-lg font-bold uppercase leading-none transition-colors ${
              isDark ? 'text-neutral-100 group-hover:text-amber-400' : 'text-neutral-900 group-hover:text-amber-800'
            }`}>
              LIFE
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className={`hidden md:flex items-center gap-5 lg:gap-6 text-xs font-mono tracking-wider ${
          isDark ? 'text-neutral-300' : 'text-neutral-600'
        }`}>
          <button 
            onClick={() => handleNav('/')}
            className={`transition-colors flex items-center gap-1.5 font-medium cursor-pointer py-1 ${
              currentPath === '/' 
                ? (isDark ? 'text-amber-400 font-bold border-b-2 border-amber-500' : 'text-neutral-950 font-bold border-b-2 border-neutral-900')
                : (isDark ? 'hover:text-amber-300' : 'hover:text-neutral-950')
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>{getNavLabel('home')}</span>
          </button>

          <button 
            onClick={() => handleNav('/about')}
            className={`transition-colors flex items-center gap-1.5 font-medium cursor-pointer py-1 ${
              currentPath === '/about' 
                ? (isDark ? 'text-amber-400 font-bold border-b-2 border-amber-500' : 'text-neutral-950 font-bold border-b-2 border-neutral-900')
                : (isDark ? 'hover:text-amber-300' : 'hover:text-neutral-950')
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>{getNavLabel('about')}</span>
          </button>

          <button 
            onClick={() => handleNav('/essays')}
            className={`transition-colors flex items-center gap-1.5 font-medium cursor-pointer py-1 ${
              currentPath === '/essays' 
                ? (isDark ? 'text-amber-400 font-bold border-b-2 border-amber-500' : 'text-neutral-950 font-bold border-b-2 border-neutral-900')
                : (isDark ? 'hover:text-amber-300' : 'hover:text-neutral-950')
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{getNavLabel('essays')}</span>
          </button>

          {/* External Links */}
          <div className="flex items-center gap-3 pl-1 border-l border-neutral-300/60 dark:border-neutral-800">
            <a 
              href="https://store.line.me/stickershop/author/4712842/en" 
              target="_blank" 
              rel="noreferrer" 
              className={`transition-colors flex items-center gap-1 font-medium py-1 ${
                isDark ? 'hover:text-amber-300 text-neutral-400' : 'hover:text-neutral-950 text-neutral-500'
              }`}
              title="Official LINE Stickers (公式スタンプ)"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">{getNavLabel('stickers')}</span>
            </a>

            <a 
              href="https://www.instagram.com/tapitaka_119/" 
              target="_blank" 
              rel="noreferrer" 
              className={`transition-colors flex items-center gap-1 font-medium py-1 ${
                isDark ? 'hover:text-amber-300 text-neutral-400' : 'hover:text-neutral-950 text-neutral-500'
              }`}
              title="Instagram (@tapitaka_119)"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">INSTAGRAM</span>
            </a>
          </div>
        </nav>

        {/* Right Section: Streamlined Action Controls (Katana, Theme Toggle, Language Switcher) */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          
          {/* Katana Pumpkin Slash Trigger Icon Button */}
          {onReplaySlash && (
            <button
              type="button"
              onClick={onReplaySlash}
              className={`flex items-center justify-center w-8 h-8 rounded-lg border text-xs transition-all cursor-pointer ${
                isDark 
                  ? 'border-amber-500/40 bg-amber-950/40 text-amber-300 hover:bg-amber-900/60 hover:border-amber-400 shadow-[0_0_8px_rgba(255,140,0,0.2)]' 
                  : 'border-amber-300 bg-amber-50/80 text-amber-800 hover:bg-amber-100'
              }`}
              title="日本刀でカボチャを一刀両断 (Slash Pumpkin with Katana)"
              aria-label="Slash Pumpkin with Katana"
            >
              <span className="text-sm">⚔️</span>
            </button>
          )}

          {/* Theme Toggle: Dark with Orange Pumpkin default <-> Light Mode */}
          <button
            type="button"
            onClick={onToggleTheme}
            className={`flex items-center justify-center w-8 h-8 rounded-lg border text-xs transition-all cursor-pointer ${
              isDark
                ? 'border-amber-500/50 bg-[#1e182a] text-amber-300 hover:bg-[#282138] shadow-[0_0_10px_rgba(255,140,0,0.25)]'
                : 'border-neutral-300/80 bg-neutral-100/90 text-amber-600 hover:bg-neutral-200/60'
            }`}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Pumpkin Mode"}
            aria-label="Toggle dark / light mode"
          >
            {isDark ? (
              <span className="text-sm">🎃</span>
            ) : (
              <Sun className="w-4 h-4 text-amber-600" />
            )}
          </button>

          {/* 3-Way Minimalist Language Selector */}
          <div className={`inline-flex items-center p-0.5 rounded-lg border text-xs font-mono ${
            isDark ? 'border-neutral-800 bg-neutral-900/90' : 'border-neutral-200 bg-neutral-100/90'
          }`}>
            <button
              type="button"
              onClick={() => onLanguageChange('ja')}
              className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                lang === 'ja'
                  ? (isDark ? 'bg-amber-500/25 text-amber-300 font-bold' : 'bg-white text-neutral-900 shadow-xs font-bold')
                  : (isDark ? 'text-neutral-400 hover:text-neutral-200' : 'text-neutral-500 hover:text-neutral-900')
              }`}
              title="日本語 (Japanese)"
            >
              JP
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                lang === 'en'
                  ? (isDark ? 'bg-amber-500/25 text-amber-300 font-bold' : 'bg-white text-neutral-900 shadow-xs font-bold')
                  : (isDark ? 'text-neutral-400 hover:text-neutral-200' : 'text-neutral-500 hover:text-neutral-900')
              }`}
              title="English"
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('fi')}
              className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                lang === 'fi'
                  ? (isDark ? 'bg-amber-500/25 text-amber-300 font-bold' : 'bg-white text-neutral-900 shadow-xs font-bold')
                  : (isDark ? 'text-neutral-400 hover:text-neutral-200' : 'text-neutral-500 hover:text-neutral-900')
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
            className={`md:hidden p-1.5 rounded-md transition-colors cursor-pointer ${
              isDark ? 'text-neutral-300 hover:text-white hover:bg-neutral-800/60' : 'text-neutral-700 hover:text-neutral-950 hover:bg-neutral-200/60'
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden mt-3 pt-3 border-t pb-2 space-y-2 font-mono text-xs ${
          isDark ? 'border-neutral-800 text-neutral-200' : 'border-neutral-200 text-neutral-700'
        }`}>
          <button 
            onClick={() => handleNav('/')}
            className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 ${
              currentPath === '/' 
                ? (isDark ? 'bg-amber-950/40 text-amber-300 font-bold border border-amber-500/30' : 'bg-neutral-200 text-neutral-950 font-bold') 
                : (isDark ? 'hover:bg-neutral-800/60' : 'hover:bg-neutral-100')
            }`}
          >
            <Home className="w-4 h-4" />
            <span>{getNavLabel('home')}</span>
          </button>

          <button 
            onClick={() => handleNav('/about')}
            className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 ${
              currentPath === '/about' 
                ? (isDark ? 'bg-amber-950/40 text-amber-300 font-bold border border-amber-500/30' : 'bg-neutral-200 text-neutral-950 font-bold') 
                : (isDark ? 'hover:bg-neutral-800/60' : 'hover:bg-neutral-100')
            }`}
          >
            <User className="w-4 h-4" />
            <span>{getNavLabel('about')}</span>
          </button>

          <button 
            onClick={() => handleNav('/essays')}
            className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 ${
              currentPath === '/essays' 
                ? (isDark ? 'bg-amber-950/40 text-amber-300 font-bold border border-amber-500/30' : 'bg-neutral-200 text-neutral-950 font-bold') 
                : (isDark ? 'hover:bg-neutral-800/60' : 'hover:bg-neutral-100')
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{getNavLabel('essays')}</span>
          </button>

          <a 
            href="https://store.line.me/stickershop/author/4712842/en" 
            target="_blank" 
            rel="noreferrer" 
            className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 ${
              isDark ? 'hover:bg-neutral-800/60 text-neutral-300' : 'hover:bg-neutral-100 text-neutral-700'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>{getNavLabel('stickers')}</span>
          </a>

          <a 
            href="https://www.instagram.com/tapitaka_119/" 
            target="_blank" 
            rel="noreferrer" 
            className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 ${
              isDark ? 'hover:bg-neutral-800/60 text-neutral-300' : 'hover:bg-neutral-100 text-neutral-700'
            }`}
          >
            <Instagram className="w-4 h-4" />
            <span>INSTAGRAM (@tapitaka_119)</span>
          </a>
        </div>
      )}
    </header>
  );
}
