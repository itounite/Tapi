import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { Language } from '../types';

interface KatanaPumpkinIntroProps {
  lang: Language;
  onComplete: () => void;
}

// Audio synthesizer for katana blade "shing-zash!" slash sound without external MP3
function playKatanaSlashSound() {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const now = ctx.currentTime;

    // 1. Blade metallic ring (high-frequency resonant ping)
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(2800, now);
    osc.frequency.exponentialRampToValueAtTime(750, now + 0.35);

    gain.gain.setValueAtTime(0.28, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.45);

    // 2. Whoosh / blade cutting air (filtered white noise)
    const bufferSize = ctx.sampleRate * 0.3;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.exponentialRampToValueAtTime(450, now + 0.28);
    filter.Q.setValueAtTime(3.5, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.35, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    whiteNoise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    whiteNoise.start(now);
    whiteNoise.stop(now + 0.32);

    // 3. Low impact thud when pumpkin splits
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(160, now + 0.05);
    subOsc.frequency.exponentialRampToValueAtTime(40, now + 0.35);

    subGain.gain.setValueAtTime(0.3, now + 0.05);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    subOsc.connect(subGain);
    subGain.connect(ctx.destination);
    subOsc.start(now + 0.05);
    subOsc.stop(now + 0.45);
  } catch {
    // Graceful fallback if Web Audio is restricted by browser policy
  }
}

export default function KatanaPumpkinIntro({ lang, onComplete }: KatanaPumpkinIntroProps) {
  const [isSliced, setIsSliced] = useState(false);
  const [slashLineVisible, setSlashLineVisible] = useState(false);
  const [pointerPos, setPointerPos] = useState({ x: -100, y: -100 });
  const [isHoveringPumpkin, setIsHoveringPumpkin] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track mouse/touch movement for the Katana blade follow effect
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isSliced) return;
    setPointerPos({ x: e.clientX, y: e.clientY });
  };

  const handleSlash = useCallback(() => {
    if (isSliced) return;
    setIsSliced(true);
    setSlashLineVisible(true);

    // Play crisp Katana blade strike sound effect
    playKatanaSlashSound();

    // Trigger complete after the slice & burst animation completes
    setTimeout(() => {
      onComplete();
    }, 850);
  }, [isSliced, onComplete]);

  // Keyboard accessibility: Press Space or Enter to slash
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        handleSlash();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSlash]);

  return (
    <motion.div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center select-none overflow-hidden cursor-none"
      style={{
        backgroundColor: 'rgba(10, 9, 16, 0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
      aria-modal="true"
      role="dialog"
      aria-label="Japanese Katana Pumpkin Slash Entrance"
    >
      {/* Background Japanese Katana Kanji Watermark */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04] text-white font-serif text-[18vw] font-black tracking-widest leading-none select-none"
        aria-hidden="true"
      >
        一刀両断
      </div>

      {/* Floating Orange Ember Particles in Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {[...Array(14)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-amber-400"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${(i * 7 + 4) % 100}%`,
              top: `${(i * 13 + 10) % 100}%`,
              boxShadow: '0 0 8px #FF9500',
            }}
            animate={{
              y: [-15, 15, -15],
              opacity: [0.2, 0.85, 0.2],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: 3 + (i % 4),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: (i * 0.3) % 2,
            }}
          />
        ))}
      </div>

      {/* Top Header Controls: Skip Button */}
      <div className="absolute top-5 sm:top-6 right-5 sm:right-6 z-30">
        <button
          type="button"
          onClick={handleSlash}
          className="text-xs font-mono tracking-wider text-amber-200/60 hover:text-amber-300 px-3 py-1.5 rounded-full border border-amber-500/20 hover:border-amber-500/40 bg-black/40 backdrop-blur-xs transition-colors cursor-pointer"
        >
          {lang === 'fi' ? 'Ohita ✕' : lang === 'en' ? 'Skip ✕' : 'スキップ ✕'}
        </button>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 max-w-xl text-center space-y-6 sm:space-y-8">
        
        {/* Japanese Instruction Typography */}
        <div className="space-y-2.5">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-amber-500/30 bg-amber-950/40 text-amber-400 text-xs font-mono tracking-widest uppercase shadow-[0_0_12px_rgba(255,140,0,0.25)]"
          >
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
            <span>日本刀でカボチャを一刀両断せよ</span>
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
          </motion.div>

          {/* Big Japanese Calligraphic Action Text: カボチャを斬れ！ */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-serif font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5E5] via-[#FFA726] to-[#FF6D00] drop-shadow-[0_4px_16px_rgba(255,109,0,0.6)]"
          >
            カボチャを斬れ！
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xs sm:text-sm text-amber-200/70 font-mono tracking-wide"
          >
            {lang === 'fi' 
              ? 'Napsauta tai pyyhkäise katanalla halkaistaksesi kurpitsan' 
              : lang === 'en' 
              ? 'Click or swipe with the katana sword to slash the pumpkin' 
              : '南瓜を一刀両断して、TAPI LIFEの世界へ'}
          </motion.p>
        </div>

        {/* Centerpiece: The Bright Bling Orange Pumpkin */}
        <div 
          className="relative flex items-center justify-center py-4 cursor-pointer"
          onClick={handleSlash}
          onPointerEnter={() => setIsHoveringPumpkin(true)}
          onPointerLeave={() => setIsHoveringPumpkin(false)}
        >
          {/* Luminous Pulsing Bling Orange Aura behind pumpkin */}
          <div 
            className="absolute -inset-10 rounded-full pointer-events-none transition-all duration-300"
            style={{
              background: 'radial-gradient(circle, rgba(255,122,0,0.55) 0%, rgba(255,160,0,0.25) 50%, transparent 75%)',
              filter: isHoveringPumpkin ? 'blur(28px) brightness(1.3)' : 'blur(22px)',
              transform: isHoveringPumpkin ? 'scale(1.15)' : 'scale(1)',
            }}
          />

          {/* Shimmering Bling Sparkles around the pumpkin */}
          {!isSliced && (
            <div className="absolute inset-0 pointer-events-none">
              {/* Bling Sparkle 1 (Top Left) */}
              <div 
                className="absolute -top-3 -left-4 w-7 h-7 text-amber-300 animate-pulse"
                style={{ animationDuration: '1.4s' }}
              >
                <svg viewBox="0 0 24 24" className="w-full h-full fill-amber-300 drop-shadow-[0_0_8px_#FFE082]">
                  <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" />
                </svg>
              </div>

              {/* Bling Sparkle 2 (Top Right) */}
              <div 
                className="absolute -top-2 -right-5 w-8 h-8 text-yellow-200 animate-pulse"
                style={{ animationDuration: '1.9s', animationDelay: '0.4s' }}
              >
                <svg viewBox="0 0 24 24" className="w-full h-full fill-yellow-200 drop-shadow-[0_0_10px_#FFF59D]">
                  <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" />
                </svg>
              </div>

              {/* Bling Sparkle 3 (Bottom Left) */}
              <div 
                className="absolute -bottom-3 -left-3 w-6 h-6 text-amber-400 animate-pulse"
                style={{ animationDuration: '1.6s', animationDelay: '0.8s' }}
              >
                <svg viewBox="0 0 24 24" className="w-full h-full fill-amber-400 drop-shadow-[0_0_8px_#FFB74D]">
                  <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" />
                </svg>
              </div>

              {/* Bling Sparkle 4 (Bottom Right) */}
              <div 
                className="absolute -bottom-2 -right-4 w-7 h-7 text-amber-200 animate-pulse"
                style={{ animationDuration: '2.1s', animationDelay: '0.2s' }}
              >
                <svg viewBox="0 0 24 24" className="w-full h-full fill-amber-200 drop-shadow-[0_0_8px_#FFE082]">
                  <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" />
                </svg>
              </div>
            </div>
          )}

          {/* Sliced Half 1 (Top-Right Halve) */}
          <motion.div
            animate={
              isSliced
                ? {
                    x: 65,
                    y: -65,
                    rotate: 22,
                    opacity: 0,
                    scale: 0.95,
                  }
                : isHoveringPumpkin
                ? { scale: 1.05, y: -4 }
                : { scale: 1, y: 0 }
            }
            transition={{
              duration: isSliced ? 0.7 : 0.25,
              ease: isSliced ? [0.2, 0.9, 0.3, 1] : 'easeOut',
            }}
            className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64"
          >
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full drop-shadow-[0_0_30px_rgba(255,122,0,0.9)]"
              style={{
                filter:
                  'drop-shadow(0 0 15px #FF6D00) drop-shadow(0 0 35px #FFA000) drop-shadow(0 0 65px rgba(255,140,0,0.85))',
              }}
            >
              <defs>
                {/* Radiant Bling Orange Gradient */}
                <radialGradient id="blingOrangeBody" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFF3B0" />
                  <stop offset="25%" stopColor="#FFA000" />
                  <stop offset="65%" stopColor="#FF6D00" />
                  <stop offset="100%" stopColor="#D84315" />
                </radialGradient>

                {/* Bling Internal Candle Flame Light */}
                <radialGradient id="moltenFireLight" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="30%" stopColor="#FFF9A6" />
                  <stop offset="65%" stopColor="#FFD54F" />
                  <stop offset="100%" stopColor="#FF8F00" />
                </radialGradient>

                <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4CAF50" />
                  <stop offset="60%" stopColor="#2E7D32" />
                  <stop offset="100%" stopColor="#1B5E20" />
                </linearGradient>
              </defs>

              {/* Stem */}
              <path
                d="M94 40 C98 15, 114 10, 126 12 C120 28, 110 38, 104 44 Z"
                fill="url(#stemGrad)"
                stroke="#1B5E20"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />

              {/* Pumpkin Lobes with 3D Depth */}
              <ellipse cx="60" cy="118" rx="42" ry="58" fill="url(#blingOrangeBody)" stroke="#BF360C" strokeWidth="2.5" />
              <ellipse cx="140" cy="118" rx="42" ry="58" fill="url(#blingOrangeBody)" stroke="#BF360C" strokeWidth="2.5" />
              <ellipse cx="78" cy="118" rx="38" ry="64" fill="url(#blingOrangeBody)" stroke="#BF360C" strokeWidth="2.5" />
              <ellipse cx="122" cy="118" rx="38" ry="64" fill="url(#blingOrangeBody)" stroke="#BF360C" strokeWidth="2.5" />
              <ellipse cx="100" cy="118" rx="35" ry="68" fill="url(#blingOrangeBody)" stroke="#BF360C" strokeWidth="2.5" />

              {/* Glowing Rib Highlight Lines */}
              <path d="M85 54 Q65 118 85 182" fill="none" stroke="#FFE082" strokeWidth="1.5" opacity="0.6" />
              <path d="M115 54 Q135 118 115 182" fill="none" stroke="#FFE082" strokeWidth="1.5" opacity="0.6" />

              {/* Lit Jack-o'-lantern Carved Eyes (Bright Bling) */}
              <polygon
                points="65,95 86,108 65,116"
                fill="url(#moltenFireLight)"
                stroke="#FFFDE7"
                strokeWidth="2"
              />
              <polygon
                points="135,95 114,108 135,116"
                fill="url(#moltenFireLight)"
                stroke="#FFFDE7"
                strokeWidth="2"
              />

              {/* Lit Carved Nose */}
              <polygon
                points="100,108 92,124 108,124"
                fill="url(#moltenFireLight)"
                stroke="#FFFDE7"
                strokeWidth="1.8"
              />

              {/* Lit Bling Grinning Mouth with fangs */}
              <path
                d="M62 136 Q100 182 138 136 Q120 156 100 148 Q80 156 62 136 Z"
                fill="url(#moltenFireLight)"
                stroke="#FFFDE7"
                strokeWidth="2"
              />
              {/* Carved Teeth */}
              <rect x="82" y="141" width="9" height="10" rx="1.5" fill="#FFE082" />
              <rect x="109" y="147" width="9" height="9" rx="1.5" fill="#FFE082" />
            </svg>
          </motion.div>

          {/* Sliced Half 2 (Bottom-Left Halve) when sliced */}
          {isSliced && (
            <motion.div
              initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
              animate={{
                x: -65,
                y: 65,
                rotate: -24,
                opacity: 0,
                scale: 0.95,
              }}
              transition={{ duration: 0.7, ease: [0.2, 0.9, 0.3, 1] }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <svg
                viewBox="0 0 200 200"
                className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 drop-shadow-[0_0_30px_rgba(255,122,0,0.9)]"
              >
                <ellipse cx="100" cy="118" rx="60" ry="60" fill="url(#blingOrangeBody)" stroke="#BF360C" strokeWidth="2.5" />
                <path
                  d="M62 136 Q100 182 138 136 Q120 156 100 148 Q80 156 62 136 Z"
                  fill="url(#moltenFireLight)"
                />
              </svg>
            </motion.div>
          )}

          {/* Katana White-Hot Lightning Slash Line & Orange Spark Burst */}
          <AnimatePresence>
            {slashLineVisible && (
              <>
                {/* Diagonal Blade Slash Streak */}
                <motion.div
                  initial={{ scaleX: 0, opacity: 1 }}
                  animate={{ scaleX: 1.6, opacity: [1, 1, 0] }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="absolute w-96 h-1.5 sm:h-2 bg-white rounded-full z-20 pointer-events-none"
                  style={{
                    transform: 'rotate(-28deg)',
                    boxShadow:
                      '0 0 16px #FFFFFF, 0 0 32px #FF9500, 0 0 54px #FF5500',
                  }}
                />

                {/* Bling Orange Radiant Light Burst from center */}
                <motion.div
                  initial={{ scale: 0.2, opacity: 1 }}
                  animate={{ scale: 2.8, opacity: 0 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="absolute w-60 h-60 rounded-full z-15 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,160,0,0.9) 35%, rgba(255,85,0,0.4) 70%, transparent 100%)',
                  }}
                />

                {/* Sliced Spark Particles */}
                {[...Array(16)].map((_, i) => {
                  const angle = (i / 16) * Math.PI * 2;
                  const dist = 110 + (i % 3) * 40;
                  return (
                    <motion.div
                      key={i}
                      initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                      animate={{
                        x: Math.cos(angle) * dist,
                        y: Math.sin(angle) * dist,
                        scale: 0.2,
                        opacity: 0,
                      }}
                      transition={{ duration: 0.65, ease: 'easeOut' }}
                      className="absolute w-2 h-2 rounded-full bg-amber-300 pointer-events-none"
                      style={{
                        boxShadow: '0 0 10px #FF9500',
                      }}
                    />
                  );
                })}
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Action Button for Touch & Click */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pt-2"
        >
          <button
            type="button"
            onClick={handleSlash}
            className="group relative inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-serif text-sm sm:text-base font-bold text-neutral-950 transition-all duration-300 cursor-pointer shadow-[0_0_24px_rgba(255,122,0,0.6)] hover:shadow-[0_0_40px_rgba(255,140,0,0.9)] hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #FFE082 0%, #FFA000 45%, #FF6D00 100%)',
            }}
          >
            {/* Katana Mini Blade Icon */}
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-neutral-950 transition-transform group-hover:-rotate-45">
              <path d="M21.7 2.3c-.4-.4-1-.4-1.4 0L12 10.6l-1.3-1.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l1.3 1.3-7.9 7.9c-.8.8-.8 2 0 2.8.8.8 2 .8 2.8 0l7.9-7.9 1.3 1.3c.4.4 1 .4 1.4 0s.4-1 0-1.4L13.4 12l8.3-8.3c.4-.4.4-1 0-1.4z" />
            </svg>
            <span className="tracking-widest">刀を振るう・斬る (SLASH)</span>
          </button>
        </motion.div>
      </div>

      {/* Realistic Japanese Katana Sword Following Cursor */}
      {!isSliced && pointerPos.x > 0 && (
        <div
          className="fixed pointer-events-none z-50 transition-transform duration-75 ease-out"
          style={{
            left: pointerPos.x,
            top: pointerPos.y,
            transform: `translate(-25px, -35px) rotate(-38deg) scale(${isHoveringPumpkin ? 1.15 : 1})`,
            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.6)) drop-shadow(0 0 8px rgba(255,160,0,0.5))',
          }}
        >
          <svg viewBox="0 0 180 32" className="w-36 h-8 sm:w-44 sm:h-9">
            {/* Katana Blade Curved Steel */}
            <defs>
              <linearGradient id="katanaSteelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="40%" stopColor="#E2E8F0" />
                <stop offset="70%" stopColor="#94A3B8" />
                <stop offset="100%" stopColor="#64748B" />
              </linearGradient>
              {/* Wavy Hamon (Temper Line) */}
              <linearGradient id="hamonGlint" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#FFF9C4" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Blade Spine & Body */}
            <path
              d="M45 13 Q100 11 165 14 Q176 15 178 18 Q165 21 45 19 Z"
              fill="url(#katanaSteelGrad)"
              stroke="#475569"
              strokeWidth="0.8"
            />
            {/* Razor Edge / Hamon Wave */}
            <path
              d="M48 18 Q75 16 100 18 Q130 16 160 18 Q174 18 178 18"
              fill="none"
              stroke="url(#hamonGlint)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />

            {/* Habaki (Golden blade collar) */}
            <rect x="42" y="12" width="7" height="8" rx="1" fill="#F59E0B" stroke="#B45309" strokeWidth="0.8" />

            {/* Tsuba (Sword Guard - Black Iron with Gold Rim) */}
            <ellipse cx="41" cy="16" rx="3.5" ry="11" fill="#1E293B" stroke="#D97706" strokeWidth="1" />

            {/* Tsuka (Hilt wrapped in black cord over white samegawa) */}
            <rect x="5" y="13" width="35" height="6" rx="1.5" fill="#F8FAFC" stroke="#0F172A" strokeWidth="0.8" />
            {/* Cord Wrap Diamond Patterns */}
            <path d="M10 13 L14 19 M14 13 L10 19 M18 13 L22 19 M22 13 L18 19 M26 13 L30 19 M30 13 L26 19 M34 13 L38 19 M38 13 L34 19" stroke="#0F172A" strokeWidth="1.4" />

            {/* Kashira (Pommel cap) */}
            <path d="M5 13 Q2 16 5 19 Z" fill="#D97706" />
          </svg>
        </div>
      )}
    </motion.div>
  );
}
