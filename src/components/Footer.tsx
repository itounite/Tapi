import React from 'react';
import { Language } from '../types';

interface FooterProps {
  lang: Language;
}

export default function Footer({ lang }: FooterProps) {
  const getCopyrightNote = () => {
    if (lang === 'fi') {
      return 'Tapi Life -brändin konsepti, hahmot ja kuvitukset ovat Yoshi Tsuijin suunnittelemia ja luomia. Kaikki oikeudet pidätetään.';
    }
    if (lang === 'en') {
      return 'Tapi Life brand concept, characters, and illustrations are designed and created by Yoshi Tsuiji. All rights reserved.';
    }
    return 'Tapi Lifeのキャラクター、世界観、イラストレーション、ストーリー企画および著作権は、原作者である辻義（Yoshi Tsuiji）に帰属します。';
  };

  // Translucent blinking fairy lights array positioned behind the footer
  const footerLights = [
    { color: 'orange', delay: '0s', offset: '3%' },
    { color: 'white', delay: '0.5s', offset: '9%' },
    { color: 'orange', delay: '1.2s', offset: '15%' },
    { color: 'white', delay: '0.8s', offset: '21%' },
    { color: 'orange', delay: '1.6s', offset: '27%' },
    { color: 'white', delay: '0.2s', offset: '33%' },
    { color: 'orange', delay: '1.0s', offset: '39%' },
    { color: 'white', delay: '1.4s', offset: '45%' },
    { color: 'orange', delay: '0.4s', offset: '51%' },
    { color: 'white', delay: '1.1s', offset: '57%' },
    { color: 'orange', delay: '0.7s', offset: '63%' },
    { color: 'white', delay: '1.5s', offset: '69%' },
    { color: 'orange', delay: '0.3s', offset: '75%' },
    { color: 'white', delay: '1.3s', offset: '81%' },
    { color: 'orange', delay: '0.9s', offset: '87%' },
    { color: 'white', delay: '0.6s', offset: '93%' },
    { color: 'orange', delay: '1.4s', offset: '97%' },
  ];

  return (
    <footer id="site-footer" className="relative border-t border-neutral-200/90 bg-[#F5F3EE] py-14 text-xs text-neutral-500 font-serif overflow-hidden">
      
      {/* Translucent ambient footer lights positioned strictly behind footer content */}
      <div 
        className="absolute inset-x-0 bottom-0 z-0 pointer-events-none select-none overflow-hidden" 
        aria-hidden="true"
      >
        {/* Soft, faint warm upward glow behind footer */}
        <div className="h-10 bg-gradient-to-t from-amber-500/8 via-amber-400/3 to-transparent w-full" />

        {/* Delicate garland wire line */}
        <div className="relative w-full h-6 overflow-hidden">
          <svg 
            viewBox="0 0 1000 24" 
            preserveAspectRatio="none" 
            className="absolute top-0 left-0 w-full h-2.5 opacity-20 stroke-neutral-700"
          >
            <path 
              d="M0,2 Q25,7 50,2 Q75,7 100,2 Q125,7 150,2 Q175,7 200,2 Q225,7 250,2 Q275,7 300,2 Q325,7 350,2 Q375,7 400,2 Q425,7 450,2 Q475,7 500,2 Q525,7 550,2 Q575,7 600,2 Q625,7 650,2 Q675,7 700,2 Q725,7 750,2 Q775,7 800,2 Q825,7 850,2 Q875,7 900,2 Q925,7 950,2 Q975,7 1000,2" 
              fill="none" 
              strokeWidth="1" 
            />
          </svg>

          {/* Translucent Orange & White Fairy Lights */}
          {footerLights.map((bulb, idx) => {
            const isOrange = bulb.color === 'orange';
            return (
              <div
                key={idx}
                className="absolute top-0.5 -translate-x-1/2 flex flex-col items-center"
                style={{ left: bulb.offset }}
              >
                {/* Translucent mini socket cap */}
                <div className="w-1.5 h-1 bg-stone-500/30 rounded-t-xs" />

                {/* Translucent blinking bulb */}
                <div
                  className={`w-2.5 h-3.5 sm:w-3 sm:h-4 rounded-full transition-all ${
                    isOrange ? 'animate-blink-orange' : 'animate-blink-white'
                  }`}
                  style={{
                    backgroundColor: isOrange ? 'rgba(255, 122, 0, 0.45)' : 'rgba(255, 255, 255, 0.55)',
                    border: isOrange ? '1px solid rgba(255, 154, 60, 0.35)' : '1px solid rgba(255, 255, 255, 0.4)',
                    animationDelay: bulb.delay,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Footer Content in Front (z-10) */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-4">
        <div className="flex justify-center items-center gap-2">
          <span className="tracking-widest text-neutral-900 font-medium uppercase text-sm">TAPI LIFE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
          <span className="text-[10px] text-neutral-400 uppercase font-mono notranslate" translate="no">辻義 / YOSHI TSUIJI</span>
        </div>
        <p className="max-w-md mx-auto text-[11px] leading-relaxed text-neutral-500">
          {getCopyrightNote()}
        </p>
        <div className="text-[10px] font-mono text-neutral-400 pt-2 select-none">
          © 2026 Yoshi Tsuiji. All Rights Reserved. Follow @tapitaka_119
        </div>
      </div>
    </footer>
  );
}
