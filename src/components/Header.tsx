import React, { useState } from 'react';
import { User, BookOpen, MessageSquare, Instagram, Menu, X, Home, Sun, Moon, GraduationCap } from 'lucide-react';
import { Language, ThemeMode } from '../types';
import tapiCupLogo from '../assets/images/tapi_cup_logo.svg';

interface HeaderProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  currentPath: string;
  onNavigate: (path: string) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
}

export default function Header({ 
  lang, 
  onLanguageChange, 
  currentPath, 
  onNavigate,
  theme,
  onToggleTheme
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDark = theme === 'dark';

  const getNavLabel = (key: 'about' | 'essays' | 'stickers' | 'home' | 'learning') => {
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
      case 'learning':
        if (lang === 'fi') return 'OPPIMINEN';
        if (lang === 'en') return 'LEARNING';
        return '学習リソース';
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
    <header 
      style={{ paddingTop: 'max(env(safe-area-inset-top, 0px), 0.625rem)' }}
      className={`border-b sticky top-0 z-40 px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 transition-colors backdrop-blur-md ${
      isDark 
        ? 'bg-[#0e0d16]/95 border-neutral-800/80 text-neutral-100' 
        : 'bg-[#FBF9F6]/95 border-neutral-200/90 text-neutral-900'
    }`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        
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

          {/* Clean TAPI [Subtle Christmas Tree] LIFE Brand Title */}
          <div className="flex items-center gap-1.5">
            <span className={`font-serif tracking-widest text-base sm:text-lg font-bold uppercase leading-none transition-colors ${
              isDark ? 'text-neutral-100 group-hover:text-amber-400' : 'text-neutral-900 group-hover:text-amber-800'
            }`}>
              TAPI
            </span>

            {/* Subtle Christmas Pine Tree with Star between TAPI and LIFE */}
            <div 
              className="inline-flex items-center justify-center self-center" 
              title="Happy Holidays & Seasons Greetings! 🎄"
            >
              <svg 
                viewBox="0 0 24 24" 
                className="w-5 h-5 sm:w-5.5 sm:h-5.5 transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_6px_rgba(252,211,77,0.7)]"
              >
                {/* Golden Star at the pinnacle */}
                <polygon 
                  points="12,1.5 13.5,5 17,5 14,7.5 15,11 12,9 9,11 10,7.5 7,5 10.5,5" 
                  fill="#FCD34D" 
                  stroke="#F59E0B" 
                  strokeWidth="0.4"
                />
                {/* Pine Tree Foliage - Layered Tiers */}
                <polygon points="12,4.5 7.5,9.5 16.5,9.5" fill="#059669" />
                <polygon points="12,8 6,14 18,14" fill="#047857" />
                <polygon points="12,12 4.5,19 19.5,19" fill="#065F46" />
                {/* Small Wooden Trunk */}
                <rect x="10.5" y="19" width="3" height="4" rx="0.5" fill="#78350F" />
                {/* Tiny Subtle Baubles / Lights */}
                <circle cx="10" cy="8" r="0.8" fill="#F87171" />
                <circle cx="14" cy="12.5" r="0.9" fill="#FCD34D" />
                <circle cx="9" cy="16" r="0.8" fill="#6EE7B7" />
                <circle cx="15" cy="17" r="0.85" fill="#F87171" />
              </svg>
            </div>

            <span className={`font-serif tracking-widest text-base sm:text-lg font-bold uppercase leading-none transition-colors ${
              isDark ? 'text-neutral-100 group-hover:text-amber-400' : 'text-neutral-900 group-hover:text-amber-800'
            }`}>
              LIFE
            </span>
          </div>
        </div>

        {/* Desktop & Tablet Navigation Links */}
        <nav className={`hidden md:flex items-center gap-3 lg:gap-5 xl:gap-6 text-[11px] lg:text-xs font-mono tracking-wider ${
          isDark ? 'text-neutral-300' : 'text-neutral-600'
        }`}>
          <button 
            onClick={() => handleNav('/')}
            className={`transition-colors flex items-center gap-1.5 font-medium cursor-pointer py-1.5 whitespace-nowrap ${
              currentPath === '/' 
                ? (isDark ? 'text-amber-400 font-bold border-b-2 border-amber-500' : 'text-neutral-950 font-bold border-b-2 border-neutral-900')
                : (isDark ? 'hover:text-amber-300' : 'hover:text-neutral-950')
            }`}
          >
            <Home className="w-3.5 h-3.5 shrink-0" />
            <span>{getNavLabel('home')}</span>
          </button>

          <button 
            onClick={() => handleNav('/about')}
            className={`transition-colors flex items-center gap-1.5 font-medium cursor-pointer py-1.5 whitespace-nowrap ${
              currentPath === '/about' 
                ? (isDark ? 'text-amber-400 font-bold border-b-2 border-amber-500' : 'text-neutral-950 font-bold border-b-2 border-neutral-900')
                : (isDark ? 'hover:text-amber-300' : 'hover:text-neutral-950')
            }`}
          >
            <User className="w-3.5 h-3.5 shrink-0" />
            <span>{getNavLabel('about')}</span>
          </button>

          <button 
            onClick={() => handleNav('/essays')}
            className={`transition-colors flex items-center gap-1.5 font-medium cursor-pointer py-1.5 whitespace-nowrap ${
              currentPath === '/essays' 
                ? (isDark ? 'text-amber-400 font-bold border-b-2 border-amber-500' : 'text-neutral-950 font-bold border-b-2 border-neutral-900')
                : (isDark ? 'hover:text-amber-300' : 'hover:text-neutral-950')
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 shrink-0" />
            <span>{getNavLabel('essays')}</span>
          </button>

          <button 
            onClick={() => handleNav('/learning')}
            className={`transition-colors flex items-center gap-1.5 font-medium cursor-pointer py-1.5 whitespace-nowrap ${
              currentPath === '/learning' 
                ? (isDark ? 'text-amber-400 font-bold border-b-2 border-amber-500' : 'text-neutral-950 font-bold border-b-2 border-neutral-900')
                : (isDark ? 'hover:text-amber-300' : 'hover:text-neutral-950')
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 shrink-0" />
            <span>{getNavLabel('learning')}</span>
          </button>

          {/* External Links */}
          <div className="flex items-center gap-2 lg:gap-3 pl-1 border-l border-neutral-300/60 dark:border-neutral-800">
            <a 
              href="https://store.line.me/stickershop/author/4712842/en" 
              target="_blank" 
              rel="noreferrer" 
              className={`transition-colors flex items-center gap-1 font-medium py-1.5 whitespace-nowrap ${
                isDark ? 'hover:text-amber-300 text-neutral-400' : 'hover:text-neutral-950 text-neutral-500'
              }`}
              title="Official LINE Stickers (公式スタンプ)"
            >
              <MessageSquare className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden xl:inline">{getNavLabel('stickers')}</span>
            </a>

            <a 
              href="https://www.instagram.com/tapitaka_119/" 
              target="_blank" 
              rel="noreferrer" 
              className={`transition-colors flex items-center gap-1 font-medium py-1.5 whitespace-nowrap ${
                isDark ? 'hover:text-amber-300 text-neutral-400' : 'hover:text-neutral-950 text-neutral-500'
              }`}
              title="Instagram (@tapitaka_119)"
            >
              <Instagram className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden xl:inline">INSTAGRAM</span>
            </a>
          </div>
        </nav>

        {/* Right Section: Streamlined Action Controls (Theme Toggle, Language Switcher) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          
          {/* Theme Toggle: Light Mode <-> Cozy Dark Mode */}
          <button
            type="button"
            onClick={onToggleTheme}
            className={`flex items-center justify-center w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-lg border text-xs transition-all cursor-pointer active:scale-95 touch-manipulation ${
              isDark
                ? 'border-emerald-500/40 bg-[#16211a] text-amber-300 hover:bg-[#1e2f25] shadow-[0_0_8px_rgba(52,211,153,0.2)]'
                : 'border-emerald-200 bg-emerald-50/70 text-emerald-800 hover:bg-emerald-100/80 shadow-xs'
            }`}
            title={
              isDark 
                ? (lang === 'fi' ? 'Vaihda vaaleaan tilaan (☀️)' : lang === 'en' ? 'Switch to Light Mode (☀️)' : 'ライトモードに切り替え (☀️)')
                : (lang === 'fi' ? 'Vaihda talviseen tummaan tilaan (🌙)' : lang === 'en' ? 'Switch to Cozy Dark Mode (🌙)' : 'コージー・ダークモードに切り替え (🌙)')
            }
            aria-label={isDark ? "Switch to Light Mode" : "Switch to Cozy Dark Mode"}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-300" />
            ) : (
              <Moon className="w-4 h-4 text-emerald-800" />
            )}
          </button>

          {/* 3-Way Minimalist Language Selector */}
          <div className={`inline-flex items-center p-0.5 rounded-lg border text-xs font-mono shrink-0 ${
            isDark ? 'border-neutral-800 bg-neutral-900/90' : 'border-neutral-200 bg-neutral-100/90'
          }`}>
            <button
              type="button"
              onClick={() => onLanguageChange('ja')}
              className={`px-2 py-1 sm:px-2.5 sm:py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer touch-manipulation ${
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
              className={`px-2 py-1 sm:px-2.5 sm:py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer touch-manipulation ${
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
              className={`px-2 py-1 sm:px-2.5 sm:py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer touch-manipulation ${
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
            className={`md:hidden p-2 rounded-md transition-colors cursor-pointer min-w-[38px] min-h-[38px] flex items-center justify-center touch-manipulation ${
              isDark ? 'text-neutral-300 hover:text-white hover:bg-neutral-800/60 active:bg-neutral-800' : 'text-neutral-700 hover:text-neutral-950 hover:bg-neutral-200/60 active:bg-neutral-200'
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu with Safe Area Support */}
      {mobileMenuOpen && (
        <div 
          style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 0.75rem)' }}
          className={`md:hidden mt-3 pt-3 border-t space-y-1 font-mono text-xs animate-in slide-in-from-top-2 duration-150 ${
            isDark ? 'border-neutral-800 text-neutral-200' : 'border-neutral-200 text-neutral-700'
          }`}
        >
          <button 
            onClick={() => handleNav('/')}
            className={`w-full text-left px-3.5 py-3 rounded-lg flex items-center gap-3 min-h-[44px] transition-colors touch-manipulation ${
              currentPath === '/' 
                ? (isDark ? 'bg-amber-950/40 text-amber-300 font-bold border border-amber-500/30' : 'bg-neutral-200 text-neutral-950 font-bold') 
                : (isDark ? 'hover:bg-neutral-800/60 active:bg-neutral-800' : 'hover:bg-neutral-100 active:bg-neutral-200')
            }`}
          >
            <Home className="w-4 h-4 shrink-0" />
            <span>{getNavLabel('home')}</span>
          </button>

          <button 
            onClick={() => handleNav('/about')}
            className={`w-full text-left px-3.5 py-3 rounded-lg flex items-center gap-3 min-h-[44px] transition-colors touch-manipulation ${
              currentPath === '/about' 
                ? (isDark ? 'bg-amber-950/40 text-amber-300 font-bold border border-amber-500/30' : 'bg-neutral-200 text-neutral-950 font-bold') 
                : (isDark ? 'hover:bg-neutral-800/60 active:bg-neutral-800' : 'hover:bg-neutral-100 active:bg-neutral-200')
            }`}
          >
            <User className="w-4 h-4 shrink-0" />
            <span>{getNavLabel('about')}</span>
          </button>

          <button 
            onClick={() => handleNav('/essays')}
            className={`w-full text-left px-3.5 py-3 rounded-lg flex items-center gap-3 min-h-[44px] transition-colors touch-manipulation ${
              currentPath === '/essays' 
                ? (isDark ? 'bg-amber-950/40 text-amber-300 font-bold border border-amber-500/30' : 'bg-neutral-200 text-neutral-950 font-bold') 
                : (isDark ? 'hover:bg-neutral-800/60 active:bg-neutral-800' : 'hover:bg-neutral-100 active:bg-neutral-200')
            }`}
          >
            <BookOpen className="w-4 h-4 shrink-0" />
            <span>{getNavLabel('essays')}</span>
          </button>

          <button 
            onClick={() => handleNav('/learning')}
            className={`w-full text-left px-3.5 py-3 rounded-lg flex items-center gap-3 min-h-[44px] transition-colors touch-manipulation ${
              currentPath === '/learning' 
                ? (isDark ? 'bg-amber-950/40 text-amber-300 font-bold border border-amber-500/30' : 'bg-neutral-200 text-neutral-950 font-bold') 
                : (isDark ? 'hover:bg-neutral-800/60 active:bg-neutral-800' : 'hover:bg-neutral-100 active:bg-neutral-200')
            }`}
          >
            <GraduationCap className="w-4 h-4 shrink-0" />
            <span>{getNavLabel('learning')}</span>
          </button>

          <a 
            href="https://store.line.me/stickershop/author/4712842/en" 
            target="_blank" 
            rel="noreferrer" 
            className={`w-full text-left px-3.5 py-3 rounded-lg flex items-center gap-3 min-h-[44px] transition-colors touch-manipulation ${
              isDark ? 'hover:bg-neutral-800/60 active:bg-neutral-800 text-neutral-300' : 'hover:bg-neutral-100 active:bg-neutral-200 text-neutral-700'
            }`}
          >
            <MessageSquare className="w-4 h-4 shrink-0" />
            <span>{getNavLabel('stickers')}</span>
          </a>

          <a 
            href="https://www.instagram.com/tapitaka_119/" 
            target="_blank" 
            rel="noreferrer" 
            className={`w-full text-left px-3.5 py-3 rounded-lg flex items-center gap-3 min-h-[44px] transition-colors touch-manipulation ${
              isDark ? 'hover:bg-neutral-800/60 active:bg-neutral-800 text-neutral-300' : 'hover:bg-neutral-100 active:bg-neutral-200 text-neutral-700'
            }`}
          >
            <Instagram className="w-4 h-4 shrink-0" />
            <span>INSTAGRAM (@tapitaka_119)</span>
          </a>

          {/* Mobile Theme Toggle Button */}
          <div className="pt-2 border-t border-neutral-300/40 dark:border-neutral-800/60">
            <button
              type="button"
              onClick={() => {
                onToggleTheme();
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3.5 py-3 rounded-lg flex items-center justify-between min-h-[44px] transition-colors cursor-pointer touch-manipulation ${
                isDark 
                  ? 'bg-emerald-950/30 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-900/40' 
                  : 'bg-emerald-50/80 text-emerald-900 border border-emerald-300/80 hover:bg-emerald-100'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="text-base select-none">{isDark ? '☀️' : '🌙'}</span>
                <span className="font-medium">
                  {isDark
                    ? (lang === 'fi' ? 'Vaihda vaaleaan tilaan' : lang === 'en' ? 'Switch to Light Mode' : 'ライトモードに切り替え')
                    : (lang === 'fi' ? 'Talvinen tumma tila' : lang === 'en' ? 'Cozy Dark Mode' : 'コージー・ダークモード')}
                </span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20">
                {isDark ? '☀️ Light' : '🌙 Dark'}
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
