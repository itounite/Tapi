import React from 'react';
import { Language } from '../types';

interface FooterProps {
  lang: Language;
  onNavigate?: (path: string) => void;
}

export default function Footer({ lang, onNavigate }: FooterProps) {
  return (
    <footer id="site-footer" className="border-t border-neutral-200 bg-[#F5F3EE] py-12 text-xs text-neutral-500 font-serif">
      <div className="max-w-4xl mx-auto px-6 text-center space-y-4">
        <div className="flex justify-center items-center gap-2">
          <span className="tracking-widest text-neutral-900 font-medium uppercase text-sm">TAPI LIFE</span>
          <button
            type="button"
            onClick={() => onNavigate?.('/metrics')}
            className="w-1.5 h-1.5 rounded-full bg-neutral-300 hover:bg-neutral-500 transition-colors cursor-pointer"
            title=""
            aria-label="Private Metrics"
          />
          <span className="text-[10px] text-neutral-400 uppercase font-mono">辻義 / YOSHI TSUIJI</span>
        </div>
        <p className="max-w-md mx-auto text-[11px] leading-relaxed text-neutral-500">
          {lang === 'en' 
            ? 'Tapi Life brand concept, characters, and illustrations are designed and created by Yoshi Tsuiji. All rights reserved.' 
            : 'Tapi Lifeのキャラクター、世界観、イラストレーション、ストーリー企画および著作権は、原作者である辻義（Yoshi Tsuiji）に帰属します。'}
        </p>
        <div
          onDoubleClick={() => onNavigate?.('/metrics')}
          className="text-[10px] font-mono text-neutral-400 pt-2 select-none"
        >
          © 2026 Yoshi Tsuiji. All Rights Reserved. Follow @tapitaka_119
        </div>
      </div>
    </footer>
  );
}
