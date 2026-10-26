import React from 'react';
import { motion } from 'motion/react';
import { ThemeMode } from '../types';
import CenterDescendingSpider from './CenterDescendingSpider';

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
      {/* 2. CENTER DESCENDING SPIDER (APPEARS EVERY 45 SECONDS)    */}
      {/* ========================================================= */}
      <CenterDescendingSpider theme={theme} />

      {/* ========================================================= */}
      {/* 3. RIGHT AND LEFT EXTREMES (PERIPHERAL ACCENTS)            */}
      {/* ========================================================= */}
      
      {/* LEFT EXTREME: Corner Spiderweb WITH Dangling Boba Spider SEAMLESSLY CONNECTED */}
      <div 
        className="fixed top-14 left-0 pointer-events-none z-10 select-none"
        aria-hidden="true"
      >
        <div className={`w-28 h-64 sm:w-36 sm:h-72 transition-opacity ${
          isDark ? 'opacity-85' : 'opacity-70'
        }`}>
          <svg viewBox="0 0 120 260" className="w-full h-full overflow-visible">
            {/* Corner spiderweb radial threads */}
            <g stroke="#A8A29E" strokeWidth="0.8" opacity={isDark ? 0.35 : 0.25}>
              <line x1="0" y1="0" x2="115" y2="0" strokeDasharray="3,2" />
              <line x1="0" y1="0" x2="0" y2="115" strokeDasharray="3,2" />
              <line x1="0" y1="0" x2="105" y2="35" strokeWidth="0.7" />
              <line x1="0" y1="0" x2="85" y2="72" strokeWidth="0.7" />
              <line x1="0" y1="0" x2="45" y2="100" strokeWidth="0.7" />

              {/* Spiderweb concentric arches */}
              <path d="M25 0 Q20 20 0 25" fill="none" />
              <path d="M52 0 Q42 42 0 52" fill="none" />
              <path d="M82 0 Q66 66 0 82" fill="none" />
              <path d="M110 0 Q90 90 0 110" fill="none" />
            </g>

            {/* Seamless Dangling Unit: Silk Thread connects directly to Web Knot at (32, 75) */}
            <g style={{ transformOrigin: '32px 75px' }} className="animate-sway-gentle">
              {/* Knot anchor at the web intersection */}
              <circle cx="32" cy="75" r="1.6" fill={isDark ? '#E2E8F0' : '#78716C'} opacity="0.8" />
              
              {/* Continuous Silk Thread dropping straight down from web to spider */}
              <line 
                x1="32" 
                y1="75" 
                x2="32" 
                y2="190" 
                stroke={isDark ? '#CBD5E1' : '#78716C'} 
                strokeWidth="0.9" 
                strokeOpacity={isDark ? 0.75 : 0.65} 
              />

              {/* Cute Boba Spider at the end of the thread */}
              <g transform="translate(32, 190)">
                {/* Spider Legs */}
                <g stroke="#44403C" strokeWidth="1.1" fill="none" strokeLinecap="round">
                  <path d="M-8 -5 Q-13 -8 -15 -4" />
                  <path d="M-8 -1 Q-15 -1 -17 4" />
                  <path d="M-8 4 Q-14 9 -15 13" />
                  <path d="M8 -5 Q13 -8 15 -4" />
                  <path d="M8 -1 Q15 -1 17 4" />
                  <path d="M8 4 Q14 9 15 13" />
                </g>

                {/* Boba Round Body */}
                <circle cx="0" cy="0" r="6.5" fill="#292524" stroke="#1C1917" strokeWidth="0.9" />
                {/* Cute White Dot Eyes */}
                <circle cx="-2.2" cy="-1.2" r="1.0" fill="#FFFFFF" />
                <circle cx="2.2" cy="-1.2" r="1.0" fill="#FFFFFF" />
              </g>
            </g>
          </svg>
        </div>

        {/* Faint vertical edge accents along left border */}
        <div className="absolute top-1/2 -translate-y-1/2 left-1.5 flex flex-col items-center gap-12 opacity-35">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-blink-orange" />
          <div className="w-1 h-1 rounded-full bg-white animate-blink-white" style={{ animationDelay: '0.8s' }} />
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-blink-orange" style={{ animationDelay: '1.4s' }} />
        </div>
      </div>

      {/* RIGHT EXTREME: Corner Spiderweb WITH Dangling Mini-Lantern SEAMLESSLY CONNECTED */}
      <div 
        className="fixed top-14 right-0 pointer-events-none z-10 select-none"
        aria-hidden="true"
      >
        <div className={`w-28 h-64 sm:w-36 sm:h-72 transition-opacity ${
          isDark ? 'opacity-85' : 'opacity-70'
        }`}>
          <svg viewBox="0 0 120 260" className="w-full h-full overflow-visible">
            {/* Corner spiderweb radial threads */}
            <g stroke="#A8A29E" strokeWidth="0.8" opacity={isDark ? 0.35 : 0.25}>
              <line x1="120" y1="0" x2="5" y2="0" strokeDasharray="3,2" />
              <line x1="120" y1="0" x2="120" y2="115" strokeDasharray="3,2" />
              <line x1="120" y1="0" x2="15" y2="35" strokeWidth="0.7" />
              <line x1="120" y1="0" x2="35" y2="72" strokeWidth="0.7" />
              <line x1="120" y1="0" x2="75" y2="100" strokeWidth="0.7" />

              {/* Spiderweb concentric arches */}
              <path d="M95 0 Q100 20 120 25" fill="none" />
              <path d="M68 0 Q78 42 120 52" fill="none" />
              <path d="M38 0 Q54 66 120 82" fill="none" />
              <path d="M10 0 Q30 90 120 110" fill="none" />
            </g>

            {/* Seamless Dangling Unit: Silk Thread connects directly to Web Knot at (88, 75) */}
            <g style={{ transformOrigin: '88px 75px' }} className="animate-sway-gentle">
              {/* Knot anchor at the web intersection */}
              <circle cx="88" cy="75" r="1.6" fill={isDark ? '#E2E8F0' : '#78716C'} opacity="0.8" />
              
              {/* Continuous Silk Thread dropping straight down from web to lantern */}
              <line 
                x1="88" 
                y1="75" 
                x2="88" 
                y2="190" 
                stroke={isDark ? '#CBD5E1' : '#78716C'} 
                strokeWidth="0.9" 
                strokeOpacity={isDark ? 0.75 : 0.65} 
              />

              {/* Glowing Mini-Lantern at the end of the thread */}
              <g transform="translate(88, 190)" className="drop-shadow-[0_0_8px_rgba(245,158,11,0.85)]">
                {/* Lantern suspension ring */}
                <ellipse cx="0" cy="-14" rx="2" ry="2.5" fill="none" stroke="#44403C" strokeWidth="0.8" />
                {/* Lantern cap */}
                <polygon points="0,-13 -6,-7 6,-7" fill="#44403C" />
                {/* Glowing body */}
                <rect x="-5" y="-7" width="10" height="13" rx="2.5" fill="#F59E0B" stroke="#D97706" strokeWidth="0.7" />
                {/* Inner bright flame */}
                <ellipse cx="0" cy="-0.5" rx="3" ry="3.5" fill="#FEF3C7" />
                <ellipse cx="0" cy="0" rx="1.5" ry="1.8" fill="#FFFFFF" />
                {/* Bottom base */}
                <rect x="-3.5" y="6" width="7" height="1.8" rx="0.5" fill="#44403C" />
              </g>
            </g>
          </svg>
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

