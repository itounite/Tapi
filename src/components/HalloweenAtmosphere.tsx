import React from 'react';
import { motion } from 'motion/react';
import { ThemeMode } from '../types';

interface HalloweenAtmosphereProps {
  theme?: ThemeMode;
}

export default function HalloweenAtmosphere({ theme = 'dark' }: HalloweenAtmosphereProps) {
  const isDark = theme === 'dark';
  return (
    <>
      {/* ========================================================= */}
      {/* 1. FLOATING GHOST IN THE BACKGROUND (TRANSLUCENT)         */}
      {/* ========================================================= */}
      <div 
        className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
        aria-hidden="true"
      >
        {/* Primary floating translucent ghost drifting gently in far-right ambient margin */}
        <motion.div
          initial={{ x: 0, y: 0, rotate: -2 }}
          animate={{
            x: [0, 30, -20, 25, 0],
            y: [0, -30, 15, -20, 0],
            rotate: [-2, 2, -1, 3, -2],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className={`absolute top-44 sm:top-52 right-[3%] sm:right-[6%] md:right-[8%] transition-opacity ${
            isDark ? 'opacity-[0.16]' : 'opacity-[0.12]'
          }`}
        >
          <svg 
            viewBox="0 0 120 140" 
            className="w-24 h-28 sm:w-32 sm:h-36 md:w-38 md:h-44 drop-shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
          >
            <defs>
              <linearGradient id="translucentGhostGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                <stop offset="65%" stopColor="#F8FAFC" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#F1F5F9" stopOpacity="0.25" />
              </linearGradient>
            </defs>

            {/* Ghost body with soft waving hem */}
            <path
              d="M30 65 C30 30, 45 15, 60 15 C75 15, 90 30, 90 65 C90 98, 86 118, 80 118 C75 118, 72 110, 68 110 C63 110, 60 118, 55 118 C50 118, 47 110, 42 110 C38 110, 35 118, 30 118 C26 118, 30 98, 30 65 Z"
              fill="url(#translucentGhostGrad)"
              stroke="#94A3B8"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />

            {/* Little floating side arm/fin */}
            <path
              d="M32 70 C24 73, 20 78, 22 84 C25 87, 29 82, 33 77"
              fill="none"
              stroke="#94A3B8"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
            <path
              d="M88 70 C96 73, 100 78, 98 84 C95 87, 91 82, 87 77"
              fill="none"
              stroke="#94A3B8"
              strokeWidth="1.1"
              strokeLinecap="round"
            />

            {/* Sleepy minimal eyes (Yoshi Tsuiji hand-drawn style) */}
            <path d="M47 52 Q52 48 57 52" fill="none" stroke="#64748B" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M63 52 Q68 48 73 52" fill="none" stroke="#64748B" strokeWidth="1.8" strokeLinecap="round" />

            {/* Rosy translucent cheeks */}
            <circle cx="45" cy="58" r="3.2" fill="#FDA4AF" opacity="0.5" />
            <circle cx="75" cy="58" r="3.2" fill="#FDA4AF" opacity="0.5" />

            {/* Cute gentle mouth */}
            <ellipse cx="60" cy="59" rx="2.2" ry="2.6" fill="#64748B" opacity="0.6" />
          </svg>
        </motion.div>

        {/* Secondary smaller translucent ghost drifting in the lower-left */}
        <motion.div
          initial={{ x: 0, y: 0, rotate: 3 }}
          animate={{
            x: [0, -25, 15, -10, 0],
            y: [0, 20, -18, 15, 0],
            rotate: [3, -1, 3, -1, 3],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 4,
          }}
          className={`absolute top-[62%] left-[4%] sm:left-[8%] transition-opacity ${
            isDark ? 'opacity-[0.14]' : 'opacity-[0.10]'
          }`}
        >
          <svg 
            viewBox="0 0 100 120" 
            className="w-18 h-22 sm:w-24 sm:h-28 drop-shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
          >
            <path
              d="M25 55 C25 25, 38 12, 50 12 C62 12, 75 25, 75 55 C75 80, 72 95, 66 95 C62 95, 59 88, 55 88 C51 88, 48 95, 44 95 C40 95, 37 88, 34 88 C30 88, 25 95, 25 55 Z"
              fill="#FFFFFF"
              stroke="#94A3B8"
              strokeWidth="1.1"
              strokeLinejoin="round"
            />
            {/* Friendly sleepy face */}
            <circle cx="43" cy="45" r="1.5" fill="#64748B" />
            <circle cx="57" cy="45" r="1.5" fill="#64748B" />
            <path d="M48 52 Q50 55 52 52" fill="none" stroke="#64748B" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="39" cy="49" r="2.2" fill="#FDA4AF" opacity="0.45" />
            <circle cx="61" cy="49" r="2.2" fill="#FDA4AF" opacity="0.45" />
          </svg>
        </motion.div>
      </div>

      {/* ========================================================= */}
      {/* 2. RIGHT AND LEFT EXTREMES (PERIPHERAL ACCENTS)            */}
      {/* ========================================================= */}
      
      {/* LEFT EXTREME: Corner Cobweb, Dangling Spider & Edge Fairy Accents */}
      <div 
        className="fixed top-14 left-0 bottom-0 pointer-events-none z-10 select-none"
        aria-hidden="true"
      >
        {/* Subtle Peripheral Spiderweb below Header */}
        <div className={`absolute top-0 left-0 w-20 h-20 sm:w-26 sm:h-26 transition-opacity ${
          isDark ? 'opacity-25' : 'opacity-18'
        }`}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <line x1="0" y1="0" x2="100" y2="0" stroke="#A8A29E" strokeWidth="0.8" strokeDasharray="3,2" />
            <line x1="0" y1="0" x2="0" y2="100" stroke="#A8A29E" strokeWidth="0.8" strokeDasharray="3,2" />
            <line x1="0" y1="0" x2="95" y2="35" stroke="#A8A29E" strokeWidth="0.6" />
            <line x1="0" y1="0" x2="80" y2="70" stroke="#A8A29E" strokeWidth="0.6" />
            <line x1="0" y1="0" x2="45" y2="92" stroke="#A8A29E" strokeWidth="0.6" />

            <path d="M22 0 Q18 18 0 22" fill="none" stroke="#A8A29E" strokeWidth="0.6" />
            <path d="M45 0 Q38 38 0 45" fill="none" stroke="#A8A29E" strokeWidth="0.6" />
            <path d="M70 0 Q58 58 0 70" fill="none" stroke="#A8A29E" strokeWidth="0.6" />
            <path d="M95 0 Q78 78 0 95" fill="none" stroke="#A8A29E" strokeWidth="0.6" />
          </svg>
        </div>

        {/* Delicate Dangling Boba Spider hanging along outer left margin */}
        <div className="absolute top-24 sm:top-32 left-2 sm:left-3 flex flex-col items-center opacity-70">
          <div className="w-[1px] h-8 sm:h-12 bg-stone-400/40" />
          
          <div className="animate-sway-gentle origin-top -mt-0.5 flex flex-col items-center">
            <svg viewBox="0 0 32 32" className="w-3.5 h-3.5 sm:w-4 sm:h-4 drop-shadow-xs">
              <path d="M8 12 Q4 8 2 12" fill="none" stroke="#44403C" strokeWidth="1" strokeLinecap="round" />
              <path d="M8 16 Q2 16 1 20" fill="none" stroke="#44403C" strokeWidth="1" strokeLinecap="round" />
              <path d="M8 20 Q3 24 2 28" fill="none" stroke="#44403C" strokeWidth="1" strokeLinecap="round" />
              <path d="M24 12 Q28 8 30 12" fill="none" stroke="#44403C" strokeWidth="1" strokeLinecap="round" />
              <path d="M24 16 Q30 16 31 20" fill="none" stroke="#44403C" strokeWidth="1" strokeLinecap="round" />
              <path d="M24 20 Q29 24 30 28" fill="none" stroke="#44403C" strokeWidth="1" strokeLinecap="round" />
              <circle cx="16" cy="18" r="6" fill="#292524" stroke="#1C1917" strokeWidth="0.8" />
              <circle cx="14" cy="17" r="0.9" fill="#FFFFFF" />
              <circle cx="18" cy="17" r="0.9" fill="#FFFFFF" />
            </svg>
          </div>
        </div>

        {/* Faint vertical edge accents along left border */}
        <div className="absolute top-1/2 -translate-y-1/2 left-1.5 flex flex-col items-center gap-12 opacity-35">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-blink-orange" />
          <div className="w-1 h-1 rounded-full bg-white animate-blink-white" style={{ animationDelay: '0.8s' }} />
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-blink-orange" style={{ animationDelay: '1.4s' }} />
        </div>
      </div>

      {/* RIGHT EXTREME: Corner Cobweb, Hanging Mini-Lantern & Edge Fairy Accents */}
      <div 
        className="fixed top-14 right-0 bottom-0 pointer-events-none z-10 select-none"
        aria-hidden="true"
      >
        {/* Subtle Peripheral Spiderweb below Header */}
        <div className={`absolute top-0 right-0 w-20 h-20 sm:w-26 sm:h-26 transition-opacity ${
          isDark ? 'opacity-25' : 'opacity-18'
        }`}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <line x1="100" y1="0" x2="0" y2="0" stroke="#A8A29E" strokeWidth="0.8" strokeDasharray="3,2" />
            <line x1="100" y1="0" x2="100" y2="100" stroke="#A8A29E" strokeWidth="0.8" strokeDasharray="3,2" />
            <line x1="100" y1="0" x2="5" y2="35" stroke="#A8A29E" strokeWidth="0.6" />
            <line x1="100" y1="0" x2="20" y2="70" stroke="#A8A29E" strokeWidth="0.6" />
            <line x1="100" y1="0" x2="55" y2="92" stroke="#A8A29E" strokeWidth="0.6" />

            <path d="M78 0 Q82 18 100 22" fill="none" stroke="#A8A29E" strokeWidth="0.6" />
            <path d="M55 0 Q62 38 100 45" fill="none" stroke="#A8A29E" strokeWidth="0.6" />
            <path d="M30 0 Q42 58 100 70" fill="none" stroke="#A8A29E" strokeWidth="0.6" />
            <path d="M5 0 Q22 78 100 95" fill="none" stroke="#A8A29E" strokeWidth="0.6" />
          </svg>
        </div>

        {/* Delicate Dangling Glowing Mini Lantern along outer right margin */}
        <div className="absolute top-24 sm:top-32 right-2 sm:right-3 flex flex-col items-center opacity-75">
          <div className="w-[1px] h-8 sm:h-12 bg-stone-400/40" />

          <div className="animate-sway-gentle origin-top -mt-0.5 flex flex-col items-center">
            <svg 
              viewBox="0 0 24 32" 
              className="w-3.5 h-4.5 sm:w-4.5 sm:h-5.5 drop-shadow-[0_0_5px_rgba(245,158,11,0.7)]"
            >
              <polygon points="12,2 5,8 19,8" fill="#44403C" />
              <rect x="6" y="8" width="12" height="15" rx="3" fill="#F59E0B" stroke="#D97706" strokeWidth="0.7" />
              <ellipse cx="12" cy="15.5" rx="3" ry="4" fill="#FEF3C7" />
              <ellipse cx="12" cy="16" rx="1.6" ry="2" fill="#FFFFFF" />
              <rect x="8" y="23" width="8" height="2" rx="0.5" fill="#44403C" />
            </svg>
          </div>
        </div>

        {/* Faint vertical edge accents along right border */}
        <div className="absolute top-1/2 -translate-y-1/2 right-1.5 flex flex-col items-center gap-12 opacity-35">
          <div className="w-1.5 h-1.5 rounded-full bg-white animate-blink-white" style={{ animationDelay: '0.3s' }} />
          <div className="w-1 h-1 rounded-full bg-amber-400 animate-blink-orange" style={{ animationDelay: '1.1s' }} />
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-blink-orange" style={{ animationDelay: '0.6s' }} />
        </div>
      </div>
    </>
  );
}
