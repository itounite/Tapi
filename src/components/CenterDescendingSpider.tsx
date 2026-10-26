import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeMode } from '../types';

interface CenterDescendingSpiderProps {
  theme?: ThemeMode;
}

/**
 * CenterDescendingSpider
 * A cute boba spider that emerges from top-center, descends down to the middle of the screen,
 * pauses and wiggles its little legs with cute blinking eyes, and climbs back up and disappears,
 * repeating every 45 seconds.
 */
export default function CenterDescendingSpider({ theme = 'dark' }: CenterDescendingSpiderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isWiggling, setIsWiggling] = useState(false);
  const isDark = theme === 'dark';

  useEffect(() => {
    // Initial surprise emergence after 5 seconds
    const initialTimer = setTimeout(() => {
      triggerSpiderDescent();
    }, 5000);

    // Recurring emergence every 45 seconds
    const intervalTimer = setInterval(() => {
      triggerSpiderDescent();
    }, 45000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
    };
  }, []);

  const triggerSpiderDescent = () => {
    setIsVisible(true);

    // After descent (2.2s) + pause in middle (4.0s) = 6.2s, it climbs back up
    // The climb-up takes 1.8s, so total duration is 8.0s before hiding
    setTimeout(() => {
      setIsVisible(false);
    }, 6500);
  };

  const handleSpiderClick = () => {
    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 1200);
  };

  return (
    <div 
      className="fixed inset-x-0 top-0 pointer-events-none z-35 flex justify-center select-none"
      aria-hidden="true"
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            key="center-spider"
            initial={{ y: '-10vh' }}
            animate={{ 
              y: ['-10vh', '42vh', '42vh', '-10vh'],
            }}
            transition={{
              duration: 6.5,
              times: [0, 0.35, 0.72, 1],
              ease: ['easeInOut', 'linear', 'easeInOut'],
            }}
            exit={{ y: '-10vh' }}
            className="relative flex flex-col items-center"
          >
            {/* The vertical silk thread stretching from top (0px) down to the spider */}
            <div 
              className="w-[1.2px] absolute top-[-50vh] bottom-4"
              style={{
                background: isDark
                  ? 'linear-gradient(to bottom, rgba(255,255,255,0.7), rgba(226,232,240,0.85))'
                  : 'linear-gradient(to bottom, rgba(120,113,108,0.5), rgba(68,64,60,0.75))',
                boxShadow: isDark ? '0 0 6px rgba(255,255,255,0.4)' : 'none',
              }}
            />

            {/* The Cute Yoshi Tsuiji Boba Spider Hanging at the Middle Center */}
            <motion.div
              animate={{
                rotate: isWiggling ? [-18, 18, -12, 12, 0] : [-5, 5, -4, 4, 0],
                scale: isWiggling ? 1.25 : 1,
              }}
              transition={{
                duration: isWiggling ? 0.6 : 3.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              onClick={handleSpiderClick}
              className="pointer-events-auto cursor-pointer relative mt-auto flex flex-col items-center group"
              title="タピオカ・スパイダー (Tapioka Spider) 🕷️"
            >
              <svg 
                viewBox="0 0 64 64" 
                className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
              >
                {/* Spider Legs with Gentle Animated Twitches */}
                <g stroke={isDark ? '#F1F5F9' : '#292524'} strokeWidth="2.2" fill="none" strokeLinecap="round">
                  {/* Left Legs */}
                  <motion.path 
                    d="M20 26 Q10 18 5 24" 
                    animate={{ d: ['M20 26 Q10 18 5 24', 'M20 26 Q10 14 6 22', 'M20 26 Q10 18 5 24'] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                  />
                  <motion.path 
                    d="M18 32 Q7 30 4 38" 
                    animate={{ d: ['M18 32 Q7 30 4 38', 'M18 32 Q7 34 5 40', 'M18 32 Q7 30 4 38'] }}
                    transition={{ duration: 1.6, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.path 
                    d="M20 38 Q11 44 8 52" 
                    animate={{ d: ['M20 38 Q11 44 8 52', 'M20 38 Q12 48 9 54', 'M20 38 Q11 44 8 52'] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                  />
                  <path d="M22 42 Q15 52 14 58" />

                  {/* Right Legs */}
                  <motion.path 
                    d="M44 26 Q54 18 59 24" 
                    animate={{ d: ['M44 26 Q54 18 59 24', 'M44 26 Q54 14 58 22', 'M44 26 Q54 18 59 24'] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                  />
                  <motion.path 
                    d="M46 32 Q57 30 60 38" 
                    animate={{ d: ['M46 32 Q57 30 60 38', 'M46 32 Q57 34 59 40', 'M46 32 Q57 30 60 38'] }}
                    transition={{ duration: 1.6, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.path 
                    d="M44 38 Q53 44 56 52" 
                    animate={{ d: ['M44 38 Q53 44 56 52', 'M44 38 Q52 48 55 54', 'M44 38 Q53 44 56 52'] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                  />
                  <path d="M42 42 Q49 52 50 58" />
                </g>

                {/* Round Boba Tapioca Body (Yoshi Tsuiji Hand-drawn Boba Style) */}
                <circle 
                  cx="32" 
                  cy="35" 
                  r="14" 
                  fill={isDark ? '#1C1917' : '#292524'} 
                  stroke={isDark ? '#F59E0B' : '#1C1917'} 
                  strokeWidth="1.6" 
                />

                {/* Boba Pearl Highlight Gloss */}
                <ellipse cx="27" cy="28" rx="3.5" ry="2" fill="#FFFFFF" opacity="0.35" transform="rotate(-20 27 28)" />

                {/* Cute Blinking Eyes */}
                <motion.g
                  animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
                  transition={{ duration: 2.8, repeat: Infinity, times: [0, 0.45, 0.5, 0.55, 1] }}
                  style={{ transformOrigin: '32px 34px' }}
                >
                  <circle cx="27" cy="34" r="2.4" fill="#FFFFFF" />
                  <circle cx="37" cy="34" r="2.4" fill="#FFFFFF" />
                  <circle cx="28" cy="34" r="1.2" fill="#0F172A" />
                  <circle cx="38" cy="34" r="1.2" fill="#0F172A" />
                </motion.g>

                {/* Shy Translucent Pink Cheeks */}
                <circle cx="23" cy="39" r="2" fill="#FDA4AF" opacity="0.6" />
                <circle cx="41" cy="39" r="2" fill="#FDA4AF" opacity="0.6" />

                {/* Little Gentle Smile */}
                <path d="M30 40 Q32 42 34 40" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
