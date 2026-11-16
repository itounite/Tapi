import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, BookOpen, Feather } from 'lucide-react';
import { Language, ThemeMode } from '../types';

interface HangingBookmarkProps {
  lang: Language;
  theme: ThemeMode;
  currentPath: string;
  onNavigateCurated: () => void;
  onNavigateEssays: () => void;
}

export default function HangingBookmark({
  lang,
  theme,
  currentPath,
  onNavigateCurated,
  onNavigateEssays,
}: HangingBookmarkProps) {
  const isDark = theme === 'dark';
  const isOnCurated = currentPath === '/learning/curated';
  const isOnEssays = currentPath === '/essays';

  const [curatedImgError, setCuratedImgError] = useState(false);
  const [essaysImgError, setEssaysImgError] = useState(false);

  const curatedSubLabel =
    lang === 'ja'
      ? '厳選学習リソース'
      : lang === 'fi'
      ? 'Oppimisresurssit'
      : isOnCurated
      ? 'Jump to bookshelf'
      : 'Curated learning';

  const essaysSubLabel =
    lang === 'ja'
      ? '辻義のエッセイ'
      : lang === 'fi'
      ? 'Yoshin esseet'
      : 'Stories & essays';

  const handleCuratedClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isOnCurated) {
      const target =
        document.getElementById('bookshelf') ||
        document.getElementById('learning-curated-anchor');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    onNavigateCurated();
  };

  const handleEssaysClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isOnEssays) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    onNavigateEssays();
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 flex flex-wrap items-start justify-end gap-2 sm:gap-3.5 pointer-events-none relative z-20 -mt-px">
      {/* Primary Hanging Bookmark: Learn from Curated Resources */}
      <motion.a
        href="/learning/curated"
        onClick={handleCuratedClick}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ rotate: -1.5, y: 1 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: 'top center' }}
        className="group pointer-events-auto inline-flex flex-col items-center cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
        title="Learn from Curated Resources"
      >
        {/* Top pin + hanging silk thread attached to header bottom border */}
        <div className="flex flex-col items-center leading-none">
          <svg
            width="24"
            height="19"
            viewBox="0 0 24 19"
            className="overflow-visible block"
            aria-hidden="true"
          >
            <circle
              cx="12"
              cy="2"
              r="2.3"
              fill={isDark ? '#FBBF24' : '#D97706'}
              stroke={isDark ? '#181524' : '#78350F'}
              strokeWidth="1"
            />
            <path
              d="M12 4 Q10.6 10.5 12 16"
              fill="none"
              stroke={isDark ? '#F59E0B' : '#B45309'}
              strokeWidth="1.7"
              strokeLinecap="round"
            />
            <circle
              cx="12"
              cy="17.5"
              r="2.4"
              fill="none"
              stroke={isDark ? '#FCD34D' : '#D97706'}
              strokeWidth="1.5"
            />
          </svg>
        </div>

        {/* Bookmark Ribbon Tag with V-notched tail */}
        <div className="relative -mt-0.5 px-2.5 sm:px-3.5 pt-2 sm:pt-2.5 pb-3.5 sm:pb-4 max-w-[196px] sm:max-w-[272px]">
          <svg
            viewBox="0 0 272 90"
            preserveAspectRatio="none"
            className={`absolute inset-0 w-full h-full transition-all duration-200 ${
              isDark
                ? 'drop-shadow-[0_6px_14px_rgba(0,0,0,0.55)] group-hover:drop-shadow-[0_8px_18px_rgba(245,158,11,0.25)]'
                : 'drop-shadow-[0_4px_10px_rgba(120,80,30,0.14)] group-hover:drop-shadow-[0_7px_14px_rgba(180,83,9,0.2)]'
            }`}
            aria-hidden="true"
          >
            <path
              d="M 10,1 L 262,1 Q 271,1 271,10 L 271,88 L 136,75 L 1,88 L 1,10 Q 1,1 10,1 Z"
              fill={isDark ? '#1e1930' : '#fffaf0'}
              stroke={isDark ? '#f59e0b' : '#d97706'}
              strokeOpacity={isDark ? '0.6' : '0.68'}
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <path
              d="M 12,5 L 260,5 Q 266,5 266,11 L 266,82 L 136,70 L 6,82 L 6,11 Q 6,5 12,5 Z"
              fill="none"
              stroke={isDark ? '#fbbf24' : '#f59e0b'}
              strokeOpacity={isDark ? '0.25' : '0.35'}
              strokeWidth="1"
              strokeDasharray="3 3"
              strokeLinejoin="round"
            />
          </svg>

          {/* Top eyelet brass ring */}
          <span
            aria-hidden="true"
            className={`relative z-10 mx-auto mb-1 block w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full border ${
              isDark
                ? 'bg-[#0d0c14] border-amber-400/80'
                : 'bg-[#FBF9F6] border-amber-600/80'
            }`}
          />

          <div className="relative z-10 flex items-center gap-2 sm:gap-2.5">
            {/* Cute Scholar Character Badge */}
            <div
              className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 border overflow-hidden ${
                isDark
                  ? 'bg-[#fffdf8] border-amber-400/60 shadow-xs'
                  : 'bg-white border-amber-300/90 shadow-2xs'
              }`}
            >
              {!curatedImgError ? (
                <img
                  src="/assets/aistudio/image_fdd78277.png"
                  alt="Scholar Tapioka character"
                  referrerPolicy="no-referrer"
                  onError={() => setCuratedImgError(true)}
                  className="w-full h-full object-contain p-0.5 transition-transform duration-200 group-hover:scale-105"
                />
              ) : (
                <BookOpen className="w-4 h-4 text-amber-700" />
              )}
            </div>

            <div className="min-w-0 flex-1 text-left">
              <div
                className={`font-serif text-[11px] sm:text-[13px] font-bold leading-tight tracking-tight ${
                  isDark ? 'text-amber-100' : 'text-neutral-900'
                }`}
              >
                Learn from Curated Resources
              </div>
              <div
                className={`mt-0.5 flex items-center gap-1 text-[9.5px] sm:text-[10px] font-mono leading-none ${
                  isDark ? 'text-amber-300/85' : 'text-amber-800/85'
                }`}
              >
                <span className="truncate">{curatedSubLabel}</span>
                <ArrowRight className="w-2.5 h-2.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
              </div>
            </div>
          </div>
        </div>
      </motion.a>

      {/* Secondary Smaller Hanging Bookmark on the Right: Read Essays by Yoshi */}
      <motion.a
        href="/essays"
        onClick={handleEssaysClick}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ rotate: 1.8, y: 1 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.28, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: 'top center' }}
        className="group pointer-events-auto inline-flex flex-col items-center cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
        title="Read Essays by Yoshi"
      >
        {/* Slightly shorter hanging silk thread */}
        <div className="flex flex-col items-center leading-none">
          <svg
            width="22"
            height="13"
            viewBox="0 0 22 13"
            className="overflow-visible block"
            aria-hidden="true"
          >
            <circle
              cx="11"
              cy="2"
              r="2"
              fill={isDark ? '#FDA4AF' : '#E11D48'}
              stroke={isDark ? '#181524' : '#881337'}
              strokeWidth="1"
            />
            <path
              d="M11 3.8 Q12.2 7.5 11 10.8"
              fill="none"
              stroke={isDark ? '#FB7185' : '#BE123C'}
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <circle
              cx="11"
              cy="12"
              r="2.1"
              fill="none"
              stroke={isDark ? '#FDA4AF' : '#E11D48'}
              strokeWidth="1.4"
            />
          </svg>
        </div>

        {/* Smaller Bookmark Ribbon Tag with V-notched tail */}
        <div className="relative -mt-0.5 px-2.5 sm:px-3 pt-1.5 sm:pt-2 pb-3 sm:pb-3.5 max-w-[154px] sm:max-w-[208px]">
          <svg
            viewBox="0 0 210 78"
            preserveAspectRatio="none"
            className={`absolute inset-0 w-full h-full transition-all duration-200 ${
              isDark
                ? 'drop-shadow-[0_6px_14px_rgba(0,0,0,0.55)] group-hover:drop-shadow-[0_8px_18px_rgba(244,63,94,0.25)]'
                : 'drop-shadow-[0_4px_10px_rgba(159,18,57,0.12)] group-hover:drop-shadow-[0_7px_14px_rgba(225,29,72,0.18)]'
            }`}
            aria-hidden="true"
          >
            <path
              d="M 9,1 L 201,1 Q 209,1 209,9 L 209,76 L 105,65 L 1,76 L 1,9 Q 1,1 9,1 Z"
              fill={isDark ? '#231726' : '#fff7f7'}
              stroke={isDark ? '#fb7185' : '#e11d48'}
              strokeOpacity={isDark ? '0.55' : '0.55'}
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
            <path
              d="M 11,4.5 L 199,4.5 Q 204.5,4.5 204.5,10 L 204.5,71 L 105,60.5 L 5.5,71 L 5.5,10 Q 5.5,4.5 11,4.5 Z"
              fill="none"
              stroke={isDark ? '#fda4af' : '#f43f5e'}
              strokeOpacity={isDark ? '0.25' : '0.3'}
              strokeWidth="1"
              strokeDasharray="3 3"
              strokeLinejoin="round"
            />
          </svg>

          {/* Top eyelet ring */}
          <span
            aria-hidden="true"
            className={`relative z-10 mx-auto mb-0.5 sm:mb-1 block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full border ${
              isDark
                ? 'bg-[#0d0c14] border-rose-400/80'
                : 'bg-[#FBF9F6] border-rose-500/80'
            }`}
          />

          <div className="relative z-10 flex items-center gap-1.5 sm:gap-2">
            {/* Cute Top-Hat Character Badge */}
            <div
              className={`w-7 h-7 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shrink-0 border overflow-hidden ${
                isDark
                  ? 'bg-[#fffdf8] border-rose-400/60 shadow-xs'
                  : 'bg-white border-rose-200 shadow-2xs'
              }`}
            >
              {!essaysImgError ? (
                <img
                  src="/assets/aistudio/image_8ebc772c.png"
                  alt="Top-Hat Tapioka character"
                  referrerPolicy="no-referrer"
                  onError={() => setEssaysImgError(true)}
                  className="w-full h-full object-contain p-0.5 transition-transform duration-200 group-hover:scale-105"
                />
              ) : (
                <Feather className="w-3.5 h-3.5 text-rose-700" />
              )}
            </div>

            <div className="min-w-0 flex-1 text-left">
              <div
                className={`font-serif text-[10px] sm:text-xs font-bold leading-tight tracking-tight ${
                  isDark ? 'text-rose-100' : 'text-neutral-900'
                }`}
              >
                Read Essays by Yoshi
              </div>
              <div
                className={`mt-0.5 flex items-center gap-0.5 text-[9px] sm:text-[9.5px] font-mono leading-none ${
                  isDark ? 'text-rose-300/85' : 'text-rose-700/85'
                }`}
              >
                <span className="truncate">{essaysSubLabel}</span>
                <ArrowRight className="w-2.5 h-2.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
              </div>
            </div>
          </div>
        </div>
      </motion.a>
    </div>
  );
}
