import React from 'react';
import { Language } from '../types';

interface FooterProps {
  lang: Language;
  visits?: number | null;
  visits24h?: number | null;
  recentFlags?: string[];
}

export default function Footer({ lang, visits, visits24h, recentFlags = [] }: FooterProps) {
  const displayVisits = visits ?? visits24h;
  const flagsToShow = recentFlags.slice(0, 3);

  return (
    <footer id="site-footer" className="border-t border-neutral-200 bg-[#F5F3EE] py-12 text-xs text-neutral-500 font-serif">
      <div className="max-w-4xl mx-auto px-6 text-center space-y-4">
        <div className="flex justify-center items-center gap-2">
          <span className="tracking-widest text-neutral-900 font-medium uppercase text-sm">TAPI LIFE</span>
          <span className="w-1 h-1 rounded-full bg-neutral-400" />
          <span className="text-[10px] text-neutral-400 uppercase font-mono">辻義 / YOSHI TSUIJI</span>
        </div>
        <p className="max-w-md mx-auto text-[11px] leading-relaxed text-neutral-500">
          {lang === 'en' 
            ? 'Tapi Life brand concept, characters, and illustrations are designed and created by Yoshi Tsuiji. All rights reserved.' 
            : 'Tapi Lifeのキャラクター、世界観、イラストレーション、ストーリー企画および著作権は、原作者である辻義（Yoshi Tsuiji）に帰属します。'}
        </p>
        <div className="text-[10px] font-mono text-neutral-400 pt-2">
          © 2026 Yoshi Tsuiji. All Rights Reserved. Follow @tapitaka_119
        </div>

        {/* Total site visit count and last three visits country flags: no pop ups */}
        {displayVisits !== null && displayVisits !== undefined && (
          <div 
            id="site-visits-count"
            className="pt-2 inline-flex items-center justify-center gap-2 text-neutral-400 font-mono text-[10px] select-none tracking-wider"
            title={lang === 'en' ? 'Total site visits & last 3 visit country flags' : '累計アクセス数と直近3回の訪問国フラグ'}
          >
            <span>{displayVisits}</span>
            {flagsToShow.length > 0 && (
              <>
                <span className="text-neutral-300">·</span>
                <span className="inline-flex items-center gap-1 text-sm leading-none" aria-label="Last 3 visit countries">
                  {flagsToShow.map((flag, idx) => (
                    <span key={idx} className="inline-block transition-transform hover:scale-110">
                      {flag}
                    </span>
                  ))}
                </span>
              </>
            )}
          </div>
        )}
      </div>
    </footer>
  );
}

