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

export default function Header({ 
  lang, 
  onLanguageChange, 
  currentPath, 
  onNavigate
}: HeaderProps) {
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
            <div className="flex items-center gap-1 sm:gap-1.5">
              <span className="font-serif tracking-widest text-lg sm:text-xl font-bold text-neutral-900 uppercase leading-tight group-hover:text-amber-800 transition-colors">
                TAPI
              </span>

              {/* Bright and Lighted Pumpkin between TAPI and LIFE */}
              <div 
                className="inline-flex items-center justify-center self-center" 
                title="Happy Halloween! 🎃"
              >
                <svg 
                  viewBox="0 0 32 32" 
                  className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(245,158,11,0.95)]"
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
                  
                  {/* Outer & middle lobes */}
                  <ellipse cx="9.5" cy="18" rx="6.2" ry="8.5" fill="url(#pumpkinSkinGrad)" stroke="#BF360C" strokeWidth="0.7" />
                  <ellipse cx="22.5" cy="18" rx="6.2" ry="8.5" fill="url(#pumpkinSkinGrad)" stroke="#BF360C" strokeWidth="0.7" />
                  <ellipse cx="12.5" cy="18" rx="5.8" ry="9.5" fill="url(#pumpkinSkinGrad)" stroke="#BF360C" strokeWidth="0.7" />
                  <ellipse cx="19.5" cy="18" rx="5.8" ry="9.5" fill="url(#pumpkinSkinGrad)" stroke="#BF360C" strokeWidth="0.7" />
                  <ellipse cx="16" cy="18" rx="5.4" ry="10" fill="url(#pumpkinSkinGrad)" stroke="#BF360C" strokeWidth="0.7" />

                  {/* Lit Carved Eyes (Luminous yellow-white) */}
                  <polygon points="10.5,14 14,16 10.5,17" fill="url(#brightPumpkinLight)" stroke="#FFF9C4" strokeWidth="0.5" />
                  <polygon points="21.5,14 18,16 21.5,17" fill="url(#brightPumpkinLight)" stroke="#FFF9C4" strokeWidth="0.5" />

                  {/* Lit Carved Nose */}
                  <polygon points="16,16 15,18.5 17,18.5" fill="url(#brightPumpkinLight)" stroke="#FFF9C4" strokeWidth="0.4" />

                  {/* Lit Smiling Jack-o'-lantern Mouth */}
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

              <span className="font-serif tracking-widest text-lg sm:text-xl font-bold text-neutral-900 uppercase leading-tight group-hover:text-amber-800 transition-colors">
                LIFE
              </span>
            </div>

            <span className="text-[9px] font-mono tracking-wider text-neutral-400 font-medium px-1.5 py-0.2 sm:py-0.5 border border-neutral-200 rounded w-fit bg-white/60 notranslate" translate="no">
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
