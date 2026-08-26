import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, Tv, RotateCcw, ChevronLeft, ChevronRight, Sparkles, HelpCircle, Flame } from 'lucide-react';
import { Language, VideoEpisode } from '../types';
import { EPISODES } from '../data';

interface EpisodesPlayerProps {
  lang: Language;
}

export default function EpisodesPlayer(props: EpisodesPlayerProps) {
  const { lang } = props;
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(60);
  const [playProgress, setPlayProgress] = useState<number>(12);
  
  // Scenario states
  const [fallRotation, setFallRotation] = useState<number>(0);
  const [fallTriggerCount, setFallTriggerCount] = useState<number>(0);
  const [watermelonSliced, setWatermelonSliced] = useState<boolean>(false);
  const [umeboshiEaten, setUmeboshiEaten] = useState<boolean>(false);
  const [leverPosition, setLeverPosition] = useState<'up' | 'down'>('up');
  const [danceSpeed, setDanceSpeed] = useState<number>(1);
  const [stampSelection, setStampSelection] = useState<'king' | 'zakuro' | 'natadecoco'>('king');
  const [stampedCake, setStampedCake] = useState<Array<{ id: number; x: number; y: number; type: 'king' | 'zakuro' | 'natadecoco' }>>([]);

  const currentEp: VideoEpisode = EPISODES[currentEpisodeIndex];

  // Auto-tick play progress bar for cinematic feel
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlayProgress((prev) => {
          if (prev >= 100) {
            // loop
            return 0;
          }
          return prev + 1.5;
        });
      }, 350);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const nextEpisode = () => {
    setCurrentEpisodeIndex((prev) => (prev + 1) % EPISODES.length);
    resetScenarios();
  };

  const prevEpisode = () => {
    setCurrentEpisodeIndex((prev) => (prev - 1 + EPISODES.length) % EPISODES.length);
    resetScenarios();
  };

  const resetScenarios = () => {
    setWatermelonSliced(false);
    setUmeboshiEaten(false);
    setLeverPosition('up');
    setStampedCake([]);
    setPlayProgress(0);
    setIsPlaying(true);
  };

  return (
    <div id="video-episodes-player" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
      {/* Cartoon Retro TV Enclosure */}
      <div className="col-span-1 lg:col-span-8 flex flex-col">
        <div className="bg-neutral-800 border-[10px] border-neutral-700 rounded-[32px] p-4 flex flex-col shadow-2xl relative overflow-hidden">
          {/* TV Antenna details */}
          <div className="absolute top-2 right-12 w-1.5 h-10 bg-neutral-600 origin-bottom transform rotate-[25deg]" />
          <div className="absolute top-2 right-12 w-1.5 h-14 bg-neutral-600 origin-bottom transform -rotate-[15deg]" />
          <div className="absolute top-0 inset-x-0 h-4 bg-neutral-750" />

          {/* Screen area with CRT glass glare */}
          <div className="relative aspect-[16/10] w-full bg-slate-900 rounded-2xl overflow-hidden shadow-[inset_0_4px_24px_rgba(0,0,0,0.8)] border-4 border-neutral-900 group">
            {/* Screen Glare reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 z-20 pointer-events-none" />
            {/* CRT TV lines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_4px] z-10 pointer-events-none" />

            {/* INTERACTIVE SCENARIO CANVAS CANVAS */}
            <div className="absolute inset-0 flex items-center justify-center select-none bg-sky-950/40">
              <AnimatePresence mode="wait">
                {/* 1. FALL SCENARIO */}
                {currentEp.animatedScenario === 'fall' && (
                  <motion.div 
                    key="fall"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full relative bg-gradient-to-b from-sky-400 to-amber-100 flex items-center justify-center overflow-hidden"
                  >
                    {/* Clouds */}
                    <div className="absolute top-6 left-6 opacity-80 animate-wiggle"><span className="text-4xl">☁️</span></div>
                    <div className="absolute top-12 right-8 opacity-60 animate-float-slow"><span className="text-3xl">☁️</span></div>
                    <div className="absolute top-2 left-1/3 opacity-70 animate-float-slow" style={{ animationDelay: '1s' }}><span className="text-4xl">☁️</span></div>

                    {/* King Falling */}
                    <motion.div
                      key={fallTriggerCount}
                      animate={isPlaying ? {
                        y: [-120, 100, 30, 100],
                        rotate: [0, 180, 270, 360],
                        scale: [1, 1, 0.9, 1]
                      } : {}}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        repeatType: 'loop', 
                        ease: 'easeOut'
                      }}
                      className="absolute top-10 flex flex-col items-center cursor-pointer"
                      onClick={() => setFallTriggerCount((p) => p + 1)}
                    >
                      <div className="relative w-20 h-20 drop-shadow-lg">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          <circle cx="50" cy="55" r="35" fill="#7F7F7F" stroke="#333" strokeWidth="4.5" />
                          <path d="M30 30 L40 45 L50 25 L60 45 L70 30 L65 45 L35 45 Z" fill="#FFE03C" stroke="#333" strokeWidth="3" />
                          <text x="50" y="42" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#333">王</text>
                          {/* Squeezed crying eyes */}
                          <path d="M34 50 Q39 45 44 50" fill="none" stroke="#333" strokeWidth="4.5" strokeLinecap="round" />
                          <path d="M56 50 Q61 45 66 50" fill="none" stroke="#333" strokeWidth="4.5" strokeLinecap="round" />
                          {/* Open screaming mouth */}
                          <circle cx="50" cy="65" r="8" fill="#EF4444" stroke="#333" strokeWidth="3" />
                          {/* Bowtie */}
                          <polygon points="40,79 60,79 50,85" fill="#EF4444" stroke="#333" strokeWidth="2" />
                          <polygon points="40,91 60,91 50,85" fill="#EF4444" stroke="#333" strokeWidth="2" />
                          <circle cx="50" cy="85" r="3.5" fill="#B91C1C" />
                        </svg>
                      </div>
                      
                      {/* Crying bubble */}
                      <div className="mt-3 bg-white text-zinc-950 px-3 py-1 border-2 border-zinc-950 rounded-full font-bold text-[10px] uppercase font-mono shadow">
                        {lang === 'en' ? 'Why?!' : 'どうしてタピ〜！'}
                      </div>
                    </motion.div>
                    
                    {/* Ground */}
                    <div className="absolute bottom-0 inset-x-0 h-8 bg-zinc-700/60 flex items-center justify-center border-t border-zinc-800">
                      <span className="text-[10px] text-zinc-100 font-bold uppercase tracking-wider font-mono">
                        {lang === 'en' ? 'Tap King to restart fall!' : '王様をクリックすると最初から落ちるよ'}
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* 2. WATERMELON SCENARIO */}
                {currentEp.animatedScenario === 'watermelon' && (
                  <motion.div 
                    key="watermelon"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full relative bg-amber-50 flex flex-col items-center justify-center p-4"
                  >
                    {!watermelonSliced ? (
                      <motion.div 
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex flex-col items-center cursor-pointer"
                        onClick={() => setWatermelonSliced(true)}
                      >
                        {/* Whole Striped Watermelon with King Face */}
                        <div className="relative w-36 h-36">
                          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                            <circle cx="50" cy="50" r="44" fill="#15803D" stroke="#14532D" strokeWidth="4" />
                            {/* Watermelon Stripes */}
                            <path d="M50 6 C25 20 25 80 50 94" fill="none" stroke="#166534" strokeWidth="5.5" />
                            <path d="M50 6 C75 20 75 80 50 94" fill="none" stroke="#166534" strokeWidth="5.5" />
                            <path d="M50 6 C38 15 38 85 50 94" fill="none" stroke="#14532D" strokeWidth="4" />
                            <path d="M50 6 C62 15 62 85 50 94" fill="none" stroke="#14532D" strokeWidth="4" />
                            {/* King face carved */}
                            <circle cx="34" cy="46" r="4.5" fill="#14532D" />
                            <circle cx="66" cy="46" r="4.5" fill="#14532D" />
                            <path d="M42 62 Q50 56 58 62" fill="none" stroke="#14532D" strokeWidth="5" strokeLinecap="round" />
                          </svg>
                        </div>
                        <span className="mt-4 bg-red-500 text-white font-bold px-4 py-1.5 rounded-full text-xs animate-bounce shadow">
                          🔪 {lang === 'en' ? 'Click to Slice!' : 'クリックして割るタピ！'}
                        </span>
                      </motion.div>
                    ) : (
                      <div className="flex gap-4 items-center justify-center">
                        <motion.div 
                          initial={{ x: -100, rotate: -20, opacity: 0 }}
                          animate={{ x: 0, rotate: 0, opacity: 1 }}
                          className="w-28 h-32 flex flex-col items-center"
                        >
                          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
                            {/* Half watermelon block Left */}
                            <path d="M10 50 Q10 85 45 92 L45 8 Z" fill="#EF4444" stroke="#14532D" strokeWidth="3" />
                            <circle cx="28" cy="50" r="5" fill="#7F7F7F" stroke="#333" strokeWidth="2" /> {/* Embedded King Left */}
                            <path d="M15 50 A 30 30 0 0 1 45 90" fill="none" stroke="#22C55E" strokeWidth="4" />
                          </svg>
                        </motion.div>

                        <div className="text-center font-display text-emerald-800 font-bold self-center">
                          <div className="text-2xl font-black">TA-DA!</div>
                          <div className="text-[10px] text-neutral-500 mt-1 max-w-[100px]">
                            {lang === 'en' ? 'Red Sweet Pulp inside!' : '真っ赤な美味しそうな中身タピ！'}
                          </div>
                          <button 
                            onClick={() => setWatermelonSliced(false)}
                            className="mt-3 px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[9px]"
                          >
                            <RotateCcw className="w-2.5 h-2.5 inline mr-1" /> Re-assemble
                          </button>
                        </div>

                        <motion.div 
                          initial={{ x: 100, rotate: 20, opacity: 0 }}
                          animate={{ x: 0, rotate: 0, opacity: 1 }}
                          className="w-28 h-32 flex flex-col items-center"
                        >
                          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
                            <path d="M90 50 Q90 85 55 92 L55 8 Z" fill="#EF4444" stroke="#14532D" strokeWidth="3" />
                            <circle cx="72" cy="50" r="5" fill="#7F7F7F" stroke="#333" strokeWidth="2" /> {/* Embedded King Right */}
                            <path d="M85 50 A 30 30 0 0 0 55 90" fill="none" stroke="#22C55E" strokeWidth="4" />
                          </svg>
                        </motion.div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* 3. UMEBOSHI SCENARIO */}
                {currentEp.animatedScenario === 'umeboshi' && (
                  <motion.div 
                    key="umeboshi"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full relative bg-red-50 flex items-center justify-center p-4 overflow-hidden"
                  >
                    <div className="grid grid-cols-2 gap-4 items-center max-w-sm">
                      {/* Left: Plate of sour pickled giant plums */}
                      <div className="text-center">
                        <div className="text-xs font-bold text-red-800 mb-2">{lang === 'en' ? 'Umeboshi Board' : '梅干しのお皿'}</div>
                        <motion.div 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setUmeboshiEaten(true)}
                          className="bg-white/80 border-2 border-red-200 rounded-2xl p-3 flex flex-col items-center cursor-pointer shadow-sm relative group"
                        >
                          {/* Animated Plum */}
                          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center border-2 border-red-800 animate-wiggle">
                            <div className="w-4 h-4 bg-red-500/70 rounded-full -mt-2 -ml-2" />
                          </div>
                          <span className="text-[9px] text-red-600 mt-1 font-bold">
                            {lang === 'en' ? 'Click to Feed King' : '王様に食べさせる'}
                          </span>
                        </motion.div>
                      </div>

                      {/* Right: Sour King face */}
                      <div className="flex flex-col items-center">
                        <motion.div
                          animate={umeboshiEaten ? {
                            scale: [1, 0.7, 1.2, 1],
                            rotate: [0, 15, -15, 0],
                            x: [0, 4, -4, 0]
                          } : {}}
                          transition={{ duration: 0.8 }}
                          className="w-24 h-24 relative"
                        >
                          <svg viewBox="0 0 100 100" className="w-full h-full">
                            <circle cx="50" cy="55" r="35" fill="#7F7F7F" stroke="#333" strokeWidth="4.5" />
                            <path d="M30 30 L40 45 L50 25 L60 45 L70 30 L65 45 L35 45 Z" fill="#FFE03C" stroke="#333" strokeWidth="3" />
                            <text x="50" y="42" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#333">王</text>
                            
                            {umeboshiEaten ? (
                              <>
                                {/* Spiral squeezed eyes */}
                                <path d="M32 48 Q38 52 42 48 M34 52 Q38 48 42 52" fill="none" stroke="#333" strokeWidth="4" />
                                <path d="M58 48 Q64 52 68 48 M60 52 Q64 48 68 52" fill="none" stroke="#333" strokeWidth="4" />
                                {/* Squeezed star-shaped mouth */}
                                <path d="M46 66 L54 62 L48 60 L52 68" fill="none" stroke="#333" strokeWidth="4" strokeLinecap="round" />
                                {/* Red blush */}
                                <circle cx="28" cy="62" r="5" fill="#EF4444" opacity="0.6" />
                                <circle cx="72" cy="62" r="5" fill="#EF4444" opacity="0.6" />
                              </>
                            ) : (
                              <>
                                {/* Normal tired eyes */}
                                <line x1="38" y1="52" x2="48" y2="52" stroke="#333" strokeWidth="4" strokeLinecap="round" />
                                <line x1="52" y1="52" x2="62" y2="52" stroke="#333" strokeWidth="4" strokeLinecap="round" />
                                <path d="M43 65 Q50 63 57 65" fill="none" stroke="#333" strokeWidth="4" />
                              </>
                            )}
                          </svg>
                        </motion.div>
                        
                        {umeboshiEaten && (
                          <span className="mt-2 text-[10px] text-red-600 font-bold tracking-widest animate-pulse font-display">
                            {lang === 'en' ? 'SO SOUR! 😖' : 'ス、スッパ〜！！！'}
                          </span>
                        )}

                        {umeboshiEaten && (
                          <button 
                            onClick={() => setUmeboshiEaten(false)}
                            className="mt-2 px-1.5 py-0.5 bg-neutral-200 text-neutral-700 text-[8px] rounded font-bold"
                          >
                            Reset
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 4. ROBOT SCENARIO */}
                {currentEp.animatedScenario === 'robot' && (
                  <motion.div 
                    key="robot"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full relative bg-green-950/90 flex flex-col items-center justify-center p-4 text-green-400 font-mono"
                  >
                    {/* Cockpit radar grid layout */}
                    <div className="absolute inset-4 border border-green-500/20 rounded-xl pointer-events-none" />
                    <div className="absolute top-2 left-4 text-[9px] text-green-500/80">RADAR ACTIVE: OKO_C9</div>
                    <div className="absolute top-2 right-4 text-[9px] text-green-500/80">SPEED: 119m/s</div>

                    {/* Cockpit central layout */}
                    <div className="grid grid-cols-12 gap-2 w-full max-w-sm items-center">
                      {/* Left: Buttons and dials */}
                      <div className="col-span-5 flex flex-col gap-2 bg-neutral-900/80 p-2 rounded-xl border border-green-500/30">
                        <div className="text-[8px] text-green-300 font-semibold uppercase">{lang === 'en' ? 'Thrusters' : 'ブースター'}</div>
                        <div className="flex gap-1.5">
                          <button 
                            onClick={() => setLeverPosition(prev => prev === 'up' ? 'down' : 'up')}
                            className={`flex-1 text-[8px] px-1 py-2 font-bold rounded-md border text-center transition ${leverPosition === 'down' ? 'bg-red-900 border-red-600 text-red-200' : 'bg-green-900 border-green-600 text-green-200'}`}
                          >
                            {leverPosition === 'up' ? 'LAUNCH' : 'ON FIRE'}
                          </button>
                        </div>
                      </div>

                      {/* Middle: Screen HUD with Pilot */}
                      <div className="col-span-7 flex flex-col items-center bg-neutral-950 p-2 rounded-xl border-2 border-green-500/60 shadow-[0_0_12px_rgba(34,197,94,0.3)]">
                        <div className="relative w-20 h-20 bg-green-900/20 rounded-full overflow-hidden flex items-center justify-center border border-green-500/30">
                          {/* Animated background coordinates */}
                          <div className="absolute inset-0 flex items-center justify-center text-[10px] opacity-10 animate-pulse">0101 1010</div>
                          
                          {/* Pilot: Cute pink tiny pilot inside */}
                          <motion.div 
                            animate={isPlaying ? {
                              y: [0, -3, 0],
                              rotate: [-2, 2, -2]
                            } : {}}
                            transition={{ duration: 1.2, repeat: Infinity }}
                            className="w-12 h-12 relative"
                          >
                            <svg viewBox="0 0 100 100" className="w-full h-full">
                              <circle cx="50" cy="50" r="32" fill="#E11D48" /> {/* Pink body */}
                              {/* Big sleepy robot eyes or headset */}
                              <circle cx="35" cy="46" r="5" fill="#FFF" />
                              <circle cx="35" cy="46" r="2.5" fill="#111" />
                              <circle cx="65" cy="46" r="5" fill="#FFF" />
                              <circle cx="65" cy="46" r="2.5" fill="#111" />
                              <path d="M22 46 L78 46" stroke="#F43F5E" strokeWidth="4" /> {/* Headset band */}
                              <rect x="16" y="40" width="8" height="12" rx="2" fill="#4B5563" />
                              <rect x="76" y="40" width="8" height="12" rx="2" fill="#4B5563" />
                              {/* Smiling cute pilot mouth */}
                              <path d="M43 62 Q50 68 57 62" fill="none" stroke="#FFF" strokeWidth="5" strokeLinecap="round" />
                            </svg>
                          </motion.div>
                        </div>
                        <div className="text-[8px] text-center mt-1.5 text-green-300 font-bold uppercase tracking-wider animate-pulse">
                          {leverPosition === 'down' ? '💥 BOOSTERS ENGAGED 💥' : '🤖 STANDBY: PILOT TAPI'}
                        </div>
                      </div>
                    </div>

                    {/* Interactive feedback */}
                    <div className="absolute bottom-1 right-2 text-[8px] text-green-500/50">SYS.OK_v1.19</div>
                  </motion.div>
                )}

                {/* 5. BOBA CUP DANCE */}
                {currentEp.animatedScenario === 'bobaCup' && (
                  <motion.div 
                    key="bobaCup"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full relative bg-pink-50 flex flex-col items-center justify-center p-4 overflow-hidden"
                  >
                    <div className="flex gap-4 items-end h-32 w-full max-w-sm justify-around relative">
                      {/* Music Notes decoration */}
                      <div className="absolute top-1 left-12 text-pink-400 animate-bounce">🎵</div>
                      <div className="absolute top-3 right-16 text-pink-400 animate-bounce" style={{ animationDelay: '0.4s' }}>🎶</div>

                      {/* Cups with bouncing character heads */}
                      {/* Cup 1 - King */}
                      <div className="flex flex-col items-center">
                        <motion.div 
                          animate={isPlaying ? {
                            y: [0, -35, 0],
                            rotate: [-10, 10, -10]
                          } : {}}
                          transition={{ duration: 1.2 / danceSpeed, repeat: Infinity, ease: 'easeInOut' }}
                          className="w-12 h-12 z-20"
                        >
                          <svg viewBox="0 0 100 100" className="w-full h-full">
                            <circle cx="50" cy="55" r="35" fill="#7F7F7F" stroke="#111" strokeWidth="4.5" />
                            <path d="M30 30 L40 45 L50 25 L60 45 L70 30 L65 45 L35 45 Z" fill="#FFE03C" stroke="#111" strokeWidth="3" />
                            <text x="50" y="42" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#333">王</text>
                            <line x1="38" y1="52" x2="48" y2="52" stroke="#333" strokeWidth="4.5" strokeLinecap="round" />
                            <line x1="52" y1="52" x2="62" y2="52" stroke="#333" strokeWidth="4.5" strokeLinecap="round" />
                            <path d="M43 66 Q50 60 57 66" fill="none" stroke="#333" strokeWidth="4" />
                          </svg>
                        </motion.div>
                        {/* Cup Frame */}
                        <div className="w-14 h-16 bg-white/60 border-2 border-pink-200 border-t-0 rounded-b-xl z-10 flex items-center justify-center">
                          <span className="text-[8px] text-pink-500 font-bold uppercase font-mono">King</span>
                        </div>
                      </div>

                      {/* Cup 2 - Natadecoco */}
                      <div className="flex flex-col items-center">
                        <motion.div 
                          animate={isPlaying ? {
                            y: [0, -45, 0],
                            rotate: [15, -15, 15]
                          } : {}}
                          transition={{ duration: 1.5 / danceSpeed, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                          className="w-12 h-12 z-20"
                        >
                          <svg viewBox="0 0 100 100" className="w-full h-full">
                            <circle cx="50" cy="55" r="35" fill="#4ADE80" stroke="#111" strokeWidth="4.5" />
                            <path d="M34 46 L44 56 M44 46 L34 56" stroke="#111" strokeWidth="4.5" />
                            <path d="M56 46 L66 56 M66 46 L56 56" stroke="#111" strokeWidth="4.5" />
                            <path d="M42 66 Q50 60 58 66" fill="none" stroke="#111" strokeWidth="4.5" />
                          </svg>
                        </motion.div>
                        {/* Cup Frame */}
                        <div className="w-14 h-16 bg-white/60 border-2 border-pink-200 border-t-0 rounded-b-xl z-10 flex items-center justify-center">
                          <span className="text-[8px] text-green-500 font-bold uppercase font-mono">Coco</span>
                        </div>
                      </div>

                      {/* Cup 3 - Zakuro */}
                      <div className="flex flex-col items-center">
                        <motion.div 
                          animate={isPlaying ? {
                            y: [0, -25, 0],
                            rotate: [-5, 5, -5]
                          } : {}}
                          transition={{ duration: 0.9 / danceSpeed, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                          className="w-12 h-12 z-20"
                        >
                          <svg viewBox="0 0 100 100" className="w-full h-full">
                            <rect x="18" y="25" width="64" height="64" rx="10" fill="#FB7185" stroke="#111" strokeWidth="4.5" />
                            <circle cx="36" cy="50" r="4.5" fill="#111" />
                            <circle cx="64" cy="50" r="4.5" fill="#111" />
                            <rect x="42" y="60" width="16" height="8" rx="2" fill="white" stroke="#111" strokeWidth="3" />
                          </svg>
                        </motion.div>
                        {/* Cup Frame */}
                        <div className="w-14 h-16 bg-white/60 border-2 border-pink-200 border-t-0 rounded-b-xl z-10 flex items-center justify-center">
                          <span className="text-[8px] text-rose-500 font-bold uppercase font-mono">Zakuro</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <span className="text-[10px] text-pink-600 font-bold">{lang === 'en' ? 'Boba Tempo:' : 'テンポ調整:'}</span>
                      <input 
                        type="range" 
                        min="0.5" 
                        max="2.5" 
                        step="0.5" 
                        value={danceSpeed} 
                        onChange={(e) => setDanceSpeed(Number(e.target.value))}
                        className="w-24 h-1 bg-pink-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </motion.div>
                )}

                {/* 6. OKOME'S JUNGLE JIVE */}
                {currentEp.animatedScenario === 'okome' && (
                  <motion.div 
                    key="okome"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full relative bg-emerald-900 flex flex-col items-center justify-center p-4 overflow-hidden"
                  >
                    {/* Tropical backdrop leaves */}
                    <div className="absolute top-2 left-2 text-6xl opacity-30 select-none pointer-events-none">🌴</div>
                    <div className="absolute top-4 right-2 text-6xl opacity-30 select-none pointer-events-none">🍌</div>
                    <div className="absolute bottom-2 left-10 text-5xl opacity-40 select-none pointer-events-none">🌿</div>
                    <div className="absolute bottom-4 right-10 text-5xl opacity-40 select-none pointer-events-none">🍍</div>

                    {/* Okome walking around */}
                    <motion.div 
                      animate={isPlaying ? {
                        x: [-120, 120, -120],
                        y: [-10, 10, -10],
                        rotate: [-5, 5, -5]
                      } : {}}
                      transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                      className="w-16 h-24 flex flex-col items-center"
                    >
                      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
                        <rect x="30" y="18" width="40" height="66" rx="20" fill="#FFFFFF" stroke="#333" strokeWidth="4.5" />
                        <path d="M22 40 L78 40" stroke="#333" strokeWidth="5.5" strokeLinecap="round" />
                        <g>
                          <polygon points="30,40 45,40 43,50 32,50" fill="#111" stroke="#333" strokeWidth="2" />
                          <polygon points="55,40 70,40 68,50 57,50" fill="#111" stroke="#333" strokeWidth="2" />
                        </g>
                        {/* Whistling mouth */}
                        <circle cx="50" cy="62" r="3" fill="none" stroke="#222" strokeWidth="3" />
                        {/* Tiny cool legs */}
                        <line x1="42" y1="84" x2="42" y2="94" stroke="#333" strokeWidth="4" strokeLinecap="round" />
                        <line x1="58" y1="84" x2="58" y2="94" stroke="#333" strokeWidth="4" strokeLinecap="round" />
                      </svg>
                      <div className="bg-amber-100 text-amber-900 border border-amber-300 font-mono text-[9px] font-bold px-2 py-0.5 rounded-full -mt-2 shadow-sm">
                        OKOME
                      </div>
                    </motion.div>

                    <div className="absolute bottom-2 right-2 bg-neutral-900/80 px-2 py-1 rounded text-[8px] text-emerald-400 font-mono">
                      SURVIVING WILDERNESS...
                    </div>
                  </motion.div>
                )}

                {/* 7. SPOT REAL KING BANNER LINK */}
                {currentEp.animatedScenario === 'findKing' && (
                  <motion.div 
                    key="findKing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full relative bg-amber-100 flex flex-col items-center justify-center p-4 text-center"
                  >
                    <div className="absolute inset-0 bg-neutral-950/20 backdrop-blur-[0.5px]" />
                    <div className="z-10 bg-white/95 border-4 border-amber-300 p-5 rounded-3xl max-w-sm shadow-xl flex flex-col items-center">
                      <span className="text-4xl animate-bounce mb-3">🔍</span>
                      <h5 className="font-bold text-neutral-800 text-sm">
                        {lang === 'en' ? 'Launch Full Mini-Game!' : 'ゲームコーナーにGOタピ！'}
                      </h5>
                      <p className="text-[11px] text-neutral-500 mt-1 max-w-xs leading-relaxed">
                        {lang === 'en' 
                          ? 'Wanna try spotting King Tapioca yourself? We placed an interactive game right on this landing page! Scroll down or tap below!' 
                          : '本物のたぴおか王を見つけ出すミニゲームが、このページの下にあるよ！スクロールするか、下のボタンを押してみてね。'}
                      </p>
                      <a 
                        href="#game-playground"
                        className="mt-4 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-full text-xs shadow transition active:scale-95 flex items-center gap-1.5"
                      >
                        <Flame className="w-3.5 h-3.5 fill-current text-white animate-pulse" />
                        {lang === 'en' ? 'Play game now' : '今すぐ遊ぶタピ！'}
                      </a>
                    </div>
                  </motion.div>
                )}

                {/* 8. ROLL CAKE STAMP */}
                {currentEp.animatedScenario === 'cakeStamp' && (
                  <motion.div 
                    key="cakeStamp"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full relative bg-amber-50/50 flex flex-col items-center justify-center p-4 overflow-hidden"
                  >
                    <div className="grid grid-cols-12 gap-4 w-full max-w-md items-center">
                      {/* Left: Selector Stamp */}
                      <div className="col-span-4 flex flex-col gap-2 bg-white border border-amber-200 p-2.5 rounded-2xl">
                        <div className="text-[8px] text-neutral-400 font-bold uppercase font-mono tracking-wider">{lang === 'en' ? 'Stamp tool' : '焼きごて選定'}</div>
                        
                        {(['king', 'zakuro', 'natadecoco'] as const).map((type) => (
                          <button
                            key={type}
                            onClick={() => setStampSelection(type)}
                            className={`px-2 py-1.5 text-[9px] font-bold rounded-lg border flex items-center gap-1 transition ${stampSelection === type ? 'bg-amber-100 border-amber-400 text-amber-800' : 'bg-neutral-50 text-neutral-500 hover:bg-neutral-100 border-neutral-200/50'}`}
                          >
                            <span>{type === 'king' ? '👑' : type === 'zakuro' ? '🟥' : '🤖'}</span>
                            <span className="capitalize">{type}</span>
                          </button>
                        ))}
                      </div>

                      {/* Right: Roll cake board */}
                      <div className="col-span-8 flex flex-col items-center justify-center">
                        {/* Tap to imprint area */}
                        <div 
                          onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const x = ((e.clientX - rect.left) / rect.width) * 100;
                            const y = ((e.clientY - rect.top) / rect.height) * 100;
                            setStampedCake((prev) => [...prev, { id: Date.now(), x, y, type: stampSelection }]);
                          }}
                          className="relative w-44 h-32 bg-white border-2 border-dashed border-amber-200 hover:border-amber-400 rounded-3xl cursor-crosshair flex items-center justify-center overflow-hidden shadow-inner group"
                        >
                          {/* Fluffy Roll Cake Slice graphic */}
                          <div className="absolute inset-4 rounded-full border-4 border-amber-200/50 bg-amber-100 flex items-center justify-center">
                            {/* Whipped Cream layer inside */}
                            <div className="w-[84%] h-[84%] bg-white rounded-full border-2 border-dashed border-amber-200/30 flex items-center justify-center">
                              {/* Inner custard swirl */}
                              <div className="w-[45%] h-[45%] border-t-4 border-l-4 border-amber-100 rounded-full rotate-45" />
                            </div>
                          </div>

                          {/* Render Stamps */}
                          {stampedCake.map((stamp) => (
                            <motion.div 
                              key={stamp.id}
                              initial={{ scale: 3, opacity: 0 }}
                              animate={{ scale: 1, opacity: 0.7 }}
                              className="absolute -ml-4 -mt-4 pointer-events-none"
                              style={{ left: `${stamp.x}%`, top: `${stamp.y}%` }}
                            >
                              {stamp.type === 'king' && (
                                <svg viewBox="0 0 100 100" className="w-8 h-8 opacity-75">
                                  <circle cx="50" cy="55" r="35" fill="none" stroke="#78350F" strokeWidth="8" />
                                  <path d="M30 30 L40 45 L50 25 L60 45 L70 30 L65 45 L35 45 Z" fill="none" stroke="#78350F" strokeWidth="6" />
                                  <text x="50" y="42" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#78350F">王</text>
                                  <line x1="38" y1="52" x2="48" y2="52" stroke="#78350F" strokeWidth="8" strokeLinecap="round" />
                                  <line x1="52" y1="52" x2="62" y2="52" stroke="#78350F" strokeWidth="8" strokeLinecap="round" />
                                </svg>
                              )}
                              {stamp.type === 'zakuro' && (
                                <svg viewBox="0 0 100 100" className="w-8 h-8 opacity-75">
                                  <rect x="18" y="25" width="64" height="64" rx="10" fill="none" stroke="#78350F" strokeWidth="8" />
                                  <circle cx="36" cy="50" r="6" fill="#78350F" />
                                  <circle cx="64" cy="50" r="6" fill="#78350F" />
                                  <rect x="42" y="60" width="16" height="8" rx="2" fill="none" stroke="#78350F" strokeWidth="6" />
                                </svg>
                              )}
                              {stamp.type === 'natadecoco' && (
                                <svg viewBox="0 0 100 100" className="w-8 h-8 opacity-75">
                                  <circle cx="50" cy="55" r="35" fill="none" stroke="#78350F" strokeWidth="8" />
                                  <path d="M34 46 L44 56 M44 46 L34 56" stroke="#78350F" strokeWidth="8" strokeLinecap="round" />
                                  <path d="M56 46 L66 56 M66 46 L56 56" stroke="#78350F" strokeWidth="8" strokeLinecap="round" />
                                </svg>
                              )}
                            </motion.div>
                          ))}

                          <div className="absolute inset-0 bg-amber-900/0 group-hover:bg-amber-900/5 transition duration-200 pointer-events-none" />
                        </div>
                        
                        <div className="text-[8px] text-neutral-400 mt-1 font-bold text-center">
                          {lang === 'en' ? 'Click to stamp roll cake!' : '白いケーキ部分をタップして刻印するタピ！'}
                        </div>
                        {stampedCake.length > 0 && (
                          <button 
                            onClick={(e) => { e.stopPropagation(); setStampedCake([]); }}
                            className="mt-2 px-1.5 py-0.5 bg-neutral-200 text-neutral-700 text-[8px] rounded font-bold"
                          >
                            Clear Cake
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Floating button to watch real video on Instagram */}
            <div className="absolute top-4 right-4 z-30">
              <a 
                href="https://www.instagram.com/tapitaka_119/" 
                target="_blank" 
                rel="noreferrer"
                className="bg-pink-500 hover:bg-pink-600 border-2 border-white text-white text-[10px] sm:text-xs font-black px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg hover:scale-105 transition-all active:scale-95 cursor-pointer"
              >
                <span>🎥</span>
                <span>{lang === 'en' ? 'Watch Real Reel Video' : '実物インスタ動画を見る'}</span>
              </a>
            </div>

            {/* Bottom video overlay stats / controls */}
            <div className="absolute bottom-4 inset-x-4 z-20 pointer-events-none flex items-center justify-between text-white/90 drop-shadow">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
                <span className="font-mono text-xs font-semibold tracking-wider bg-black/40 px-2 py-0.5 rounded-md">
                  PLAYING • {currentEp.duration}
                </span>
              </div>
              <span className="text-[10px] bg-indigo-500/80 px-2 py-0.5 rounded font-black font-mono tracking-widest">
                TAPI-MAX 4K
              </span>
            </div>
          </div>

          {/* TV Bottom Console Controls Panel */}
          <div className="mt-4 flex items-center justify-between bg-neutral-900 rounded-2xl p-4 border border-neutral-700">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full bg-amber-400 hover:bg-amber-500 text-neutral-900 flex items-center justify-center transition active:scale-90"
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
              </button>
              
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-neutral-400" />
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-16 h-1 bg-neutral-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Video Progress Scrubber */}
            <div className="flex-1 max-w-sm mx-4 bg-neutral-800 rounded-full h-1.5 overflow-hidden">
              <div className="bg-amber-400 h-full transition-all duration-300" style={{ width: `${playProgress}%` }} />
            </div>

            {/* Interactive Dial Knob */}
            <div className="flex items-center gap-2">
              <div className="text-[9px] text-neutral-500 uppercase font-mono leading-none tracking-wider text-right hidden sm:block">Ch.<br/><span className="text-amber-400 font-bold">{currentEpisodeIndex + 1}</span></div>
              <button 
                onClick={prevEpisode}
                className="p-1 px-2 bg-neutral-800 hover:bg-neutral-700 rounded border border-neutral-700 text-neutral-300 active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={nextEpisode}
                className="p-1 px-2 bg-neutral-800 hover:bg-neutral-700 rounded border border-neutral-700 text-neutral-300 active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Playlist Selector sidebar card */}
      <div className="col-span-1 lg:col-span-4 flex flex-col bg-white border-2 border-neutral-100 rounded-3xl p-5 shadow-lg select-none">
        <h4 className="text-lg font-black text-neutral-800 flex items-center gap-2 border-b border-neutral-100 pb-3 font-display">
          <Tv className="w-5 h-5 text-indigo-500" />
          {lang === 'en' ? 'Story Episodes' : 'ストーリー紹介（動画）'}
        </h4>

        {/* List of episodes */}
        <div className="space-y-2 mt-4 overflow-y-auto max-h-[360px] pr-1 flex-1">
          {EPISODES.map((ep, idx) => {
            const isSelected = idx === currentEpisodeIndex;
            return (
              <button
                key={ep.id}
                onClick={() => {
                  setCurrentEpisodeIndex(idx);
                  resetScenarios();
                }}
                className={`w-full text-left p-3 rounded-2xl border-2 transition-all flex gap-3 items-start ${isSelected ? 'border-amber-400 bg-amber-50/40 shadow-sm' : 'border-neutral-100 bg-white hover:bg-neutral-50 hover:border-neutral-200'}`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs ${isSelected ? 'bg-amber-400 text-neutral-900' : 'bg-neutral-100 text-neutral-500'}`}>
                  {idx + 1}
                </div>
                <div className="min-w-0">
                  <div className={`text-xs font-bold truncate ${isSelected ? 'text-neutral-900' : 'text-neutral-700'}`}>
                    {lang === 'en' ? ep.titleEn : ep.titleJa}
                  </div>
                  <div className="text-[10px] text-neutral-400 line-clamp-2 mt-1 leading-normal">
                    {lang === 'en' ? ep.descriptionEn : ep.descriptionJa}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        
        {/* Helper bottom hint */}
        <div className="mt-4 pt-3 border-t border-dashed border-neutral-100 text-[10px] text-neutral-400 leading-normal flex items-start gap-1 pb-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
          <span>
            {lang === 'en' 
              ? 'Click items INSIDE the preview monitor screen above to control the active stories!'
              : '上部モニター画面の中をタップ＆クリックすると、色んなギミックを操作できるよ！'}
          </span>
        </div>
      </div>
    </div>
  );
}
