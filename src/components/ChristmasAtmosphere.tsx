import React from 'react';
import { motion } from 'motion/react';
import { ThemeMode } from '../types';

interface ChristmasAtmosphereProps {
  theme?: ThemeMode;
}

/**
 * ChristmasAtmosphere
 * Features:
 * 1. Delicate, warm twinkling fairy lights garland along top edge
 * 2. LEFT SIDE: Three slender hand-drawn sticky Christmas pine trees (1 tall + 2 small)
 *    standing naturally on the baseline without any artificial platform
 * 3. RIGHT SIDE: Sticky character family (Mother in dark navy blue, Little Girl in pink, Boy in black)
 *    standing naturally without any platform, with "Onnellinen" and "幸せな" scribbled in pink
 *    in concentric child-like arches above them
 * 4. Fully size-optimized for mobile viewports so it never crowds or overflows on phones
 * 5. Ambient, gentle drifting snowflakes in the background
 */
export default function ChristmasAtmosphere({ theme = 'dark' }: ChristmasAtmosphereProps) {
  const isDark = theme === 'dark';

  // Light colors: Warm Gold, Soft Pine Emerald, Gentle Berry Red, Winter Ice White
  const fairyLights = [
    { color: '#FCD34D', glow: 'rgba(252, 211, 77, 0.65)', delay: '0s' },
    { color: '#F87171', glow: 'rgba(248, 113, 113, 0.6)', delay: '0.8s' },
    { color: '#6EE7B7', glow: 'rgba(110, 231, 183, 0.6)', delay: '1.4s' },
    { color: '#FDE68A', glow: 'rgba(253, 230, 138, 0.65)', delay: '0.4s' },
    { color: '#93C5FD', glow: 'rgba(147, 197, 253, 0.55)', delay: '1.9s' },
    { color: '#F87171', glow: 'rgba(248, 113, 113, 0.6)', delay: '1.1s' },
    { color: '#FCD34D', glow: 'rgba(252, 211, 77, 0.65)', delay: '0.3s' },
    { color: '#6EE7B7', glow: 'rgba(110, 231, 183, 0.6)', delay: '1.6s' },
    { color: '#FDE68A', glow: 'rgba(253, 230, 138, 0.65)', delay: '0.9s' },
    { color: '#93C5FD', glow: 'rgba(147, 197, 253, 0.55)', delay: '2.1s' },
    { color: '#F87171', glow: 'rgba(248, 113, 113, 0.6)', delay: '0.5s' },
    { color: '#FCD34D', glow: 'rgba(252, 211, 77, 0.65)', delay: '1.3s' },
    { color: '#6EE7B7', glow: 'rgba(110, 231, 183, 0.6)', delay: '0.7s' },
    { color: '#FDE68A', glow: 'rgba(253, 230, 138, 0.65)', delay: '1.8s' },
  ];

  // Dynamic ink colors for hand-drawn sticky characters
  const inkColor = isDark ? '#F8FAFC' : '#1E293B';
  const bootsColor = isDark ? '#78350F' : '#451A03';

  return (
    <>
      {/* ========================================================= */}
      {/* 1. DELICATE FAIRY LIGHTS GARLAND (TOP EDGE)               */}
      {/* ========================================================= */}
      <div 
        className="fixed top-0 inset-x-0 pointer-events-none z-30 select-none overflow-hidden h-7"
        aria-hidden="true"
      >
        <div className="relative w-full h-full flex items-start justify-between px-2 sm:px-6">
          {/* Subtle connecting wire */}
          <svg 
            className="absolute top-0 left-0 w-full h-4 overflow-visible"
            preserveAspectRatio="none"
            viewBox="0 0 1200 24"
          >
            <path
              d="M0,2 Q100,16 200,2 Q300,16 400,2 Q500,16 600,2 Q700,16 800,2 Q900,16 1000,2 Q1100,16 1200,2"
              fill="none"
              stroke={isDark ? 'rgba(255, 255, 255, 0.22)' : 'rgba(120, 113, 108, 0.28)'}
              strokeWidth="0.85"
            />
          </svg>

          {/* Individual glowing bulbs along the wire */}
          {fairyLights.map((light, i) => (
            <div 
              key={i} 
              className="relative flex flex-col items-center"
              style={{
                marginTop: `${(i % 2 === 0 ? 5 : 9)}px`,
              }}
            >
              {/* Little bulb socket / cap */}
              <div 
                className="w-1.5 h-1 rounded-t-xs"
                style={{
                  backgroundColor: isDark ? '#334155' : '#78716C',
                }}
              />
              {/* Glowing Bulb with smooth gentle twinkle */}
              <div
                className="w-2.5 h-3 rounded-full animate-twinkle-bulb"
                style={{
                  backgroundColor: light.color,
                  boxShadow: `0 0 6px ${light.glow}, 0 0 12px ${light.glow}`,
                  animationDelay: light.delay,
                  opacity: isDark ? 0.95 : 0.85,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ==================================================================================== */}
      {/* 2. RIGHT SIDE: STICKY FAMILY (MOTHER IN NAVY, GIRL IN PINK, BOY IN BLACK, NO PLATFORM) */}
      {/*    & ARCHED SCRIBBLED "Onnellinen" + "幸せな" IN CRISP PINK ABOVE                   */}
      {/*    Downsized on mobile so it stays neatly in the corner and never obscures text.      */}
      {/* ==================================================================================== */}
      <div
        className="fixed bottom-0 right-0 pointer-events-none z-10 select-none overflow-visible"
        aria-hidden="true"
      >
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
          className={`w-24 h-34 sm:w-48 sm:h-64 md:w-60 md:h-80 max-w-[28vw] sm:max-w-[36vw] transition-opacity ${
            isDark ? 'opacity-[0.95]' : 'opacity-[0.92]'
          }`}
        >
          <svg viewBox="0 0 320 380" className="w-full h-full overflow-visible">
            <defs>
              {/* Drop shadow filter to guarantee text pop on both dark and light modes */}
              <filter id="scribbleTextFilter" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow 
                  dx="0" 
                  dy="1.2" 
                  stdDeviation={isDark ? "1.8" : "1"} 
                  floodColor={isDark ? "rgba(0, 0, 0, 0.9)" : "rgba(255, 255, 255, 0.95)"} 
                />
              </filter>

              {/* Arch Path for the Hand-Scribbled Text "Onnellinen" */}
              <path
                id="onnellinenScribbleArchPath"
                d="M 25,124 Q 160,42 295,124"
                fill="none"
              />

              {/* Concentric Lower Arch Path for the Hand-Scribbled Japanese Text "幸せな" */}
              <path
                id="shiawasenaScribbleArchPath"
                d="M 52,156 Q 160,84 268,156"
                fill="none"
              />
            </defs>

            {/* ------------------------------------------------------------- */}
            {/* "Onnellinen" & "幸せな" IN SWEET GIRL'S PINK SCRIBBLE STYLE   */}
            {/* Highly visible, bold, legible without obstructive black fills */}
            {/* ------------------------------------------------------------- */}
            <g className="select-none" filter="url(#scribbleTextFilter)">
              {/* LINE 1: Onnellinen (arched in girl's pink scribble handwriting) */}
              <text>
                <textPath
                  href="#onnellinenScribbleArchPath"
                  startOffset="50%"
                  textAnchor="middle"
                  style={{
                    fontFamily: "'Chalkboard SE', 'Comic Sans MS', 'Caveat', cursive, sans-serif",
                    fontSize: '27px',
                    fontWeight: '800',
                    letterSpacing: '0.06em',
                    fill: isDark ? '#FDA4AF' : '#E11D48',
                    stroke: isDark ? '#BE123C' : '#9F1239',
                    strokeWidth: '0.75px',
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                  }}
                >
                  Onnellinen
                </textPath>
              </text>

              {/* LINE 2: 幸せな (below Onnellinen, arched in matching pink scribble style) */}
              <text>
                <textPath
                  href="#shiawasenaScribbleArchPath"
                  startOffset="50%"
                  textAnchor="middle"
                  style={{
                    fontFamily: "'Yuji Boku', 'Klee One', 'Zen Maru Gothic', 'Comic Sans MS', sans-serif, cursive",
                    fontSize: '22px',
                    fontWeight: '900',
                    letterSpacing: '0.12em',
                    fill: isDark ? '#FDA4AF' : '#E11D48',
                    stroke: isDark ? '#BE123C' : '#9F1239',
                    strokeWidth: '0.75px',
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                  }}
                >
                  幸せな
                </textPath>
              </text>

              {/* Sweet scribbled pink hearts on either side */}
              <path
                d="M 44,136 C 40,130 31,132 31,139 C 31,146 41,153 44,157 C 47,153 57,146 57,139 C 57,132 48,130 44,136 Z"
                fill={isDark ? '#F43F5E' : '#FDA4AF'}
                stroke={isDark ? '#FDA4AF' : '#E11D48'}
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="rotate(-15 44 144)"
                opacity="0.95"
              />
              <path
                d="M 276,136 C 272,130 263,132 263,139 C 263,146 273,153 276,157 C 279,153 289,146 289,139 C 289,132 280,130 276,136 Z"
                fill={isDark ? '#F43F5E' : '#FDA4AF'}
                stroke={isDark ? '#FDA4AF' : '#E11D48'}
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="rotate(15 276 144)"
                opacity="0.95"
              />
            </g>

            {/* ------------------------------------------------------------- */}
            {/* STICKY CHARACTERS FAMILY (RIGHT SIDE - STANDING ON BASELINE)   */}
            {/* ------------------------------------------------------------- */}

            {/* A. MOTHER STICKY CHARACTER (Center, in Dark Navy Blue Dress) */}
            <g transform="translate(160, 225)">
              {/* Head */}
              <circle cx="0" cy="0" r="14" fill={isDark ? '#1E293B' : '#FEF3C7'} stroke={inkColor} strokeWidth="2.2" />
              {/* Hair: Elegant bun & gentle side curl */}
              <circle cx="10" cy="-8" r="6" fill={inkColor} />
              {/* Holly Sprig in Mother's hair */}
              <circle cx="11" cy="-14" r="2.2" fill="#EF4444" />
              <circle cx="14" cy="-12" r="2" fill="#EF4444" />
              <polygon points="12,-16 16,-19 14,-15" fill="#10B981" />
              
              {/* Sweet smiling face */}
              <circle cx="-4" cy="-2" r="1.5" fill={inkColor} />
              <circle cx="4" cy="-2" r="1.5" fill={inkColor} />
              <path d="M-4,3 Q0,7 4,3" fill="none" stroke={inkColor} strokeWidth="1.6" strokeLinecap="round" />
              {/* Rosy blush */}
              <circle cx="-7" cy="2" r="2.2" fill="#FDA4AF" opacity="0.8" />
              <circle cx="7" cy="2" r="2.2" fill="#FDA4AF" opacity="0.8" />

              {/* Festive Winter Scarf around Neck (Warm Gold) */}
              <g transform="translate(0, 14)">
                <rect x="-9" y="-2" width="18" height="6.5" rx="3" fill="#FBBF24" stroke={inkColor} strokeWidth="1.2" />
                <path d="M4,4 Q7,18 9,24 L2,24 Q2,16 0,4 Z" fill="#FBBF24" stroke={inkColor} strokeWidth="1" />
              </g>

              {/* Torso & DARK NAVY BLUE DRESS */}
              <line x1="0" y1="18" x2="0" y2="65" stroke={inkColor} strokeWidth="2.4" strokeLinecap="round" />
              <polygon points="-15,68 0,22 15,68" fill="#0F172A" stroke={isDark ? '#38BDF8' : inkColor} strokeWidth="1.6" />
              <rect x="-17" y="65" width="34" height="5" rx="2.5" fill="#FFFFFF" stroke={inkColor} strokeWidth="1" />

              {/* Left Arm: holding daughter's hand */}
              <path d="M-8,24 Q-35,38 -55,54" fill="none" stroke={inkColor} strokeWidth="2.2" strokeLinecap="round" />
              <circle cx="-55" cy="54" r="3.2" fill="#1E3A8A" />

              {/* Right Arm: holding son's hand */}
              <path d="M8,24 Q30,36 48,52" fill="none" stroke={inkColor} strokeWidth="2.2" strokeLinecap="round" />
              <circle cx="48" cy="52" r="3.2" fill="#1E3A8A" />

              {/* Legs & Winter Boots directly standing at baseline (y=150 inside group = y=375 in SVG) */}
              <line x1="-5" y1="68" x2="-6" y2="145" stroke={inkColor} strokeWidth="2.4" strokeLinecap="round" />
              <line x1="5" y1="68" x2="6" y2="145" stroke={inkColor} strokeWidth="2.4" strokeLinecap="round" />
              <rect x="-11" y="142" width="9" height="6.5" rx="2" fill={bootsColor} stroke={inkColor} strokeWidth="1.2" />
              <rect x="3" y="142" width="9" height="6.5" rx="2" fill={bootsColor} stroke={inkColor} strokeWidth="1.2" />
            </g>

            {/* B. LITTLE GIRL STICKY CHARACTER (Left, in PINK DRESS) */}
            <g transform="translate(95, 270)">
              {/* Head */}
              <circle cx="0" cy="0" r="11" fill={isDark ? '#1E293B' : '#FEF3C7'} stroke={inkColor} strokeWidth="2" />
              {/* Twin Pigtails with Pink Ribbons */}
              <path d="M-9,-3 Q-18,-8 -20,-1" fill="none" stroke={inkColor} strokeWidth="2.2" strokeLinecap="round" />
              <circle cx="-13" cy="-5" r="2.5" fill="#EC4899" />
              <path d="M9,-3 Q18,-8 20,-1" fill="none" stroke={inkColor} strokeWidth="2.2" strokeLinecap="round" />
              <circle cx="13" cy="-5" r="2.5" fill="#EC4899" />

              {/* Smiling face */}
              <circle cx="-3.5" cy="-1.5" r="1.3" fill={inkColor} />
              <circle cx="3.5" cy="-1.5" r="1.3" fill={inkColor} />
              <path d="M-3,3 Q0,6 3,3" fill="none" stroke={inkColor} strokeWidth="1.4" strokeLinecap="round" />
              <circle cx="-6" cy="1.5" r="2" fill="#FDA4AF" opacity="0.85" />
              <circle cx="6" cy="1.5" r="2" fill="#FDA4AF" opacity="0.85" />

              {/* Pink Scarf */}
              <rect x="-7" y="9" width="14" height="5" rx="2" fill="#F472B6" stroke={inkColor} strokeWidth="1" />

              {/* PINK DRESS */}
              <line x1="0" y1="12" x2="0" y2="44" stroke={inkColor} strokeWidth="2" strokeLinecap="round" />
              <polygon points="-12,46 0,14 12,46" fill="#F472B6" stroke={inkColor} strokeWidth="1.4" />
              <rect x="-13.5" y="44" width="27" height="4" rx="2" fill="#FFFFFF" stroke={inkColor} strokeWidth="0.8" />

              {/* Right Arm: connected to Mother */}
              <path d="M5,16 Q10,14 14,11" fill="none" stroke={inkColor} strokeWidth="2" strokeLinecap="round" />

              {/* Left Arm: holding glowing star wand */}
              <path d="M-5,16 Q-18,6 -24,-4" fill="none" stroke={inkColor} strokeWidth="2" strokeLinecap="round" />
              <line x1="-24" y1="-3" x2="-26" y2="-22" stroke="#F59E0B" strokeWidth="1.4" strokeLinecap="round" />
              <polygon
                points="-26,-30 -23,-24 -17,-24 -22,-20 -20,-14 -26,-17 -32,-14 -30,-20 -35,-24 -29,-24"
                fill="#FCD34D"
                stroke="#F59E0B"
                strokeWidth="0.8"
                className="animate-blink-white"
              />

              {/* Legs & Pink Boots standing directly at baseline */}
              <line x1="-4" y1="46" x2="-4" y2="100" stroke={inkColor} strokeWidth="2" strokeLinecap="round" />
              <line x1="4" y1="46" x2="4" y2="100" stroke={inkColor} strokeWidth="2" strokeLinecap="round" />
              <rect x="-8" y="98" width="7" height="5" rx="1.5" fill="#EC4899" stroke={inkColor} strokeWidth="1" />
              <rect x="2" y="98" width="7" height="5" rx="1.5" fill="#EC4899" stroke={inkColor} strokeWidth="1" />
            </g>

            {/* C. LITTLE SON STICKY CHARACTER (Right, in BLACK DRESS/JACKET) */}
            <g transform="translate(225, 265)">
              {/* Head */}
              <circle cx="0" cy="0" r="11.5" fill={isDark ? '#1E293B' : '#FEF3C7'} stroke={inkColor} strokeWidth="2" />

              {/* Santa Hat with fluffy white brim and pom-pom */}
              <g transform="translate(0, -9)">
                <rect x="-12" y="-3" width="24" height="6" rx="3" fill="#FFFFFF" stroke={inkColor} strokeWidth="1" />
                <path d="M-10,-2 Q-2,-20 12,-16 Q18,-14 20,-4 L8,-2 Z" fill="#DC2626" stroke={inkColor} strokeWidth="1.2" />
                <circle cx="21" cy="-2" r="3.5" fill="#FFFFFF" stroke={inkColor} strokeWidth="0.9" />
              </g>

              {/* Cheerful smiling face */}
              <circle cx="-3.5" cy="-1.5" r="1.3" fill={inkColor} />
              <circle cx="3.5" cy="-1.5" r="1.3" fill={inkColor} />
              <path d="M-3.5,3.5 Q0,7.5 3.5,3.5" fill="none" stroke={inkColor} strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="-6.5" cy="1.5" r="2.2" fill="#FDA4AF" opacity="0.85" />
              <circle cx="6.5" cy="1.5" r="2.2" fill="#FDA4AF" opacity="0.85" />

              {/* Red Winter Scarf */}
              <rect x="-8" y="10" width="16" height="5.5" rx="2" fill="#DC2626" stroke={inkColor} strokeWidth="1" />

              {/* BLACK JACKET */}
              <line x1="0" y1="13" x2="0" y2="48" stroke={inkColor} strokeWidth="2.2" strokeLinecap="round" />
              <rect x="-10" y="15" width="20" height="26" rx="4" fill="#09090B" stroke={isDark ? '#52525B' : inkColor} strokeWidth="1.4" />
              <path d="M0,24 L0,32 M-4,28 L4,28" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />

              {/* Left Arm: connected to Mother */}
              <path d="M-8,18 Q-12,18 -16,14" fill="none" stroke={inkColor} strokeWidth="2" strokeLinecap="round" />

              {/* Right Arm: waving excitedly with Santa mitten */}
              <path d="M8,18 Q18,6 24,-6" fill="none" stroke={inkColor} strokeWidth="2.2" strokeLinecap="round" />
              <circle cx="25" cy="-8" r="3.5" fill="#DC2626" stroke={inkColor} strokeWidth="0.9" />
              <polygon points="32,-16 33,-12 37,-12 34,-9 35,-5 32,-8 29,-5 30,-9 27,-12 31,-12" fill="#FCD34D" opacity="0.9" />

              {/* Legs & Black Boots standing directly at baseline */}
              <line x1="-4" y1="48" x2="-4" y2="105" stroke={inkColor} strokeWidth="2.2" strokeLinecap="round" />
              <line x1="4" y1="48" x2="4" y2="105" stroke={inkColor} strokeWidth="2.2" strokeLinecap="round" />
              <rect x="-8" y="103" width="7" height="5.5" rx="1.5" fill="#18181B" stroke={inkColor} strokeWidth="1" />
              <rect x="2" y="103" width="8" height="5.5" rx="1.5" fill="#18181B" stroke={inkColor} strokeWidth="1" />
            </g>
          </svg>
        </motion.div>
      </div>

      {/* ========================================================= */}
      {/* 3. GENTLE, VERY SPARSE AMBIENT SNOWFLAKES                 */}
      {/* ========================================================= */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 select-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Subtle, slow-falling gentle snow particles (sparse, quiet, cozy) */}
        {[
          { left: '14%', duration: 18, delay: 0, size: 4 },
          { left: '28%', duration: 24, delay: 5, size: 3 },
          { left: '46%', duration: 20, delay: 2, size: 4.5 },
          { left: '68%', duration: 26, delay: 7, size: 3.5 },
          { left: '84%', duration: 22, delay: 3, size: 4 },
          { left: '94%', duration: 25, delay: 8, size: 3 },
        ].map((flake, idx) => (
          <motion.div
            key={idx}
            initial={{ y: -20, opacity: 0 }}
            animate={{
              y: ['0vh', '105vh'],
              x: [0, idx % 2 === 0 ? 18 : -18, 0],
              opacity: [0, isDark ? 0.45 : 0.28, isDark ? 0.45 : 0.28, 0],
            }}
            transition={{
              duration: flake.duration,
              delay: flake.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute rounded-full"
            style={{
              left: flake.left,
              width: `${flake.size}px`,
              height: `${flake.size}px`,
              backgroundColor: isDark ? '#FFFFFF' : '#94A3B8',
              filter: isDark ? 'blur(0.5px) drop-shadow(0 0 2px rgba(255,255,255,0.4))' : 'none',
            }}
          />
        ))}
      </div>
    </>
  );
}
