import React from 'react';
import { ChevronRight, ExternalLink, Cpu, Sparkles } from 'lucide-react';
import { Language, ThemeMode } from '../types';
import { RASPBERRY_PI_PROJECTS, RaspberryPiSectionItem } from '../data/raspberryPiProjects';

interface RaspberryPiSectionProps {
  lang: Language;
  theme?: ThemeMode;
}

export default function RaspberryPiSection({ lang, theme = 'light' }: RaspberryPiSectionProps) {
  const isDark = theme === 'dark';

  // Trilingual labels
  const t = {
    badge: lang === 'fi' 
      ? 'RASPBERRY PI FOUNDATION · OPPIMISPOLUT' 
      : lang === 'en' 
      ? 'RASPBERRY PI FOUNDATION · PROJECTS' 
      : 'ラズベリーパイ財団公式 · プロジェクト学習',
    title: lang === 'fi'
      ? 'Raspberry Pi -projektit · 6 teknologiapolkua'
      : lang === 'en'
      ? 'Raspberry Pi Projects · 6 Technology Pathways'
      : 'Raspberry Pi 公式プロジェクト (6つの技術領域)',
    subtitle: lang === 'fi'
      ? 'Käytännönläheisiä, vaiheittaisia digitaalisen rakentamisen ja koodauksen projekteja Raspberry Pi Foundationilta.'
      : lang === 'en'
      ? 'Step-by-step hands-on coding and digital making projects from the Raspberry Pi Foundation.'
      : '世界最高水準の非営利教育組織・ラズベリーパイ財団が提供する、ステップ・バイ・ステップの体験型デジタル教材。',
    visitPortal: lang === 'fi'
      ? 'Avaa kaikki Raspberry Pi -projektit'
      : lang === 'en'
      ? 'Explore All Raspberry Pi Projects'
      : 'Raspberry Pi 公式ポータルを開く',
    whatYouNeed: lang === 'fi'
      ? 'Mitä tarvitset'
      : lang === 'en'
      ? 'What you need'
      : '必要なもの',
    ageLabel: lang === 'fi'
      ? 'Ikä'
      : lang === 'en'
      ? 'Age'
      : '対象',
  };

  // Render authentic illustrative SVG icons matching the screenshot
  const renderCardIcon = (type: RaspberryPiSectionItem['iconType']) => {
    switch (type) {
      case 'scratch':
        return (
          <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-[#0094e8] relative overflow-hidden flex items-center justify-center p-2 shadow-sm shrink-0">
            {/* Organic Scratch-style curved wave background */}
            <div className="absolute inset-0 bg-radial from-sky-400 to-[#0082cf] opacity-90" />
            <svg viewBox="0 0 80 80" className="w-full h-full relative z-10 drop-shadow-xs">
              {/* Stacked Scratch blocks */}
              <path 
                d="M10 22 C10 18 14 15 18 15 L28 15 Q33 15 36 21 Q39 27 44 27 L66 27 C70 27 74 31 74 35 L74 42 C74 46 70 50 66 50 L44 50 Q39 50 36 56 Q33 62 28 62 L18 62 C14 62 10 59 10 55 Z" 
                fill="#FFAB19" 
                stroke="#E69000" 
                strokeWidth="2.5" 
              />
              <rect x="20" y="32" width="16" height="5.5" rx="2.5" fill="#FFFFFF" opacity="0.9" />
              <rect x="40" y="32" width="22" height="5.5" rx="2.5" fill="#FFFFFF" opacity="0.9" />
            </svg>
          </div>
        );

      case 'python':
        return (
          <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-[#141b41] relative overflow-hidden flex items-center justify-center p-2.5 shadow-sm shrink-0">
            {/* Subtle blue gradient depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1e275d] to-[#0c122f]" />
            <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 drop-shadow-xs">
              {/* Python official dual-tone snake motif */}
              <g transform="translate(10, 10) scale(0.8)">
                {/* Blue snake */}
                <path
                  d="M49.6 0c-23.7 0-22.2 10.3-22.2 10.3l.02 10.7h22.6v3.2H18.7S2.5 22.3 2.5 45.9c0 23.6 14.1 22.8 14.1 22.8h8.4v-11.8s-.5-14.1 13.9-14.1h22.5s13.3.2 13.3-13.1V13.3S76.1 0 49.6 0zM35.4 7.2a4.3 4.3 0 1 1 0 8.6 4.3 4.3 0 0 1 0-8.6z"
                  fill="#3776AB"
                />
                {/* Yellow snake */}
                <path
                  d="M50.4 100c23.7 0 22.2-10.3 22.2-10.3l-.02-10.7H49.98v-3.2h31.32s16.2 1.9 16.2-21.7c0-23.6-14.1-22.8-14.1-22.8h-8.4v11.8s.5 14.1-13.9 14.1H38.7s-13.3-.2-13.3 13.1v16.4s-1.4 13.3 25 13.3zm14.2-7.2a4.3 4.3 0 1 1 0-8.6 4.3 4.3 0 0 1 0 8.6z"
                  fill="#FFD43B"
                />
              </g>
            </svg>
          </div>
        );

      case 'web':
        return (
          <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-[#ea4353] relative overflow-hidden flex items-center justify-center p-2.5 shadow-sm shrink-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#f25c6a] to-[#d63040]" />
            <svg viewBox="0 0 80 80" className="w-full h-full relative z-10 drop-shadow-xs">
              {/* Desktop Monitor */}
              <rect x="8" y="14" width="56" height="38" rx="4" fill="#FFFFFF" stroke="#333333" strokeWidth="2.5" />
              <rect x="12" y="18" width="48" height="30" rx="2" fill="#F8FAFC" />
              <circle cx="22" cy="28" r="5" fill="#FF7043" />
              <rect x="32" y="24" width="22" height="3.5" rx="1.5" fill="#94A3B8" />
              <rect x="32" y="30" width="16" height="3.5" rx="1.5" fill="#CBD5E1" />
              {/* Monitor stand */}
              <path d="M30 52 L42 52 L44 58 L28 58 Z" fill="#475569" />
              <rect x="24" y="58" width="24" height="3" rx="1.5" fill="#334155" />
              {/* Mobile phone in foreground */}
              <rect x="46" y="28" width="26" height="42" rx="4" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
              <rect x="49" y="34" width="20" height="30" rx="1" fill="#F1F5F9" />
              <circle cx="59" cy="67" r="1.5" fill="#64748B" />
              <rect x="52" y="38" width="14" height="2.5" rx="1" fill="#FF7043" />
              <rect x="52" y="43" width="10" height="2.5" rx="1" fill="#94A3B8" />
            </svg>
          </div>
        );

      case 'ai':
        return (
          <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-[#f77f3a] relative overflow-hidden flex items-center justify-center p-2.5 shadow-sm shrink-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#ff9352] to-[#e4641d]" />
            <svg viewBox="0 0 80 80" className="w-full h-full relative z-10 drop-shadow-xs">
              {/* Large central 4-pointed radiant AI star */}
              <path
                d="M40 8 C40 24 24 40 8 40 C24 40 40 56 40 72 C40 56 56 40 72 40 C56 40 40 24 40 8 Z"
                fill="#FFEB3B"
                stroke="#FBC02D"
                strokeWidth="1.5"
              />
              {/* Small companion star top-right */}
              <path
                d="M62 12 C62 18 56 24 50 24 C56 24 62 30 62 36 C62 30 68 24 74 24 C68 24 62 18 62 12 Z"
                fill="#FFF59D"
              />
              {/* Small companion star bottom-left */}
              <path
                d="M20 54 C20 58 16 62 12 62 C16 62 20 66 20 70 C20 66 24 62 28 62 C24 62 20 58 20 54 Z"
                fill="#FFF59D"
              />
            </svg>
          </div>
        );

      case 'hardware':
        return (
          <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-[#14b8a6] relative overflow-hidden flex items-center justify-center p-2.5 shadow-sm shrink-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#2dd4bf] to-[#0d9488]" />
            <svg viewBox="0 0 80 80" className="w-full h-full relative z-10 drop-shadow-xs">
              {/* LED bulb body */}
              <path
                d="M28 28 C28 18 33 12 40 12 C47 12 52 18 52 28 L52 42 L28 42 Z"
                fill="#EF4444"
                stroke="#B91C1C"
                strokeWidth="2"
              />
              <rect x="25" y="42" width="30" height="5" rx="1.5" fill="#DC2626" />
              {/* Shiny reflection on LED */}
              <path d="M33 18 Q36 15 40 15" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8" />
              {/* LED legs (cathode and anode wires) */}
              <line x1="34" y1="47" x2="31" y2="72" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
              <line x1="46" y1="47" x2="49" y2="76" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
              {/* Radiating emission rays */}
              <line x1="16" y1="20" x2="22" y2="24" stroke="#FEE2E2" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="64" y1="20" x2="58" y2="24" stroke="#FEE2E2" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="12" y1="34" x2="20" y2="34" stroke="#FEE2E2" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="68" y1="34" x2="60" y2="34" stroke="#FEE2E2" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        );

      case 'cad':
        return (
          <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-[#4338ca] relative overflow-hidden flex items-center justify-center p-2.5 shadow-sm shrink-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1] to-[#3730a3]" />
            <svg viewBox="0 0 80 80" className="w-full h-full relative z-10 drop-shadow-xs">
              {/* 3D Tetrahedron / Pyramid in green */}
              <polygon points="56,36 38,68 74,66" fill="#10B981" opacity="0.9" />
              <polygon points="56,36 38,68 52,72" fill="#059669" />
              {/* 3D Icosahedron / Gem in pink */}
              <polygon points="26,30 40,24 46,38 32,48 18,40" fill="#EC4899" />
              <polygon points="26,30 40,24 34,36" fill="#F472B6" />
              <polygon points="40,24 46,38 34,36" fill="#DB2777" />
              {/* Floating 3D Cube in cyan */}
              <polygon points="46,14 54,10 62,14 54,18" fill="#38BDF8" />
              <polygon points="46,14 54,18 54,26 46,22" fill="#0EA5E9" />
              <polygon points="54,18 62,14 62,22 54,26" fill="#0284C7" />
            </svg>
          </div>
        );
    }
  };

  return (
    <section className="space-y-6 max-w-5xl mx-auto pt-6">
      {/* Section Header */}
      <div className={`p-6 sm:p-8 rounded-3xl border transition-all ${
        isDark 
          ? 'bg-[#151221] border-neutral-800 shadow-[0_8px_30px_rgba(0,0,0,0.4)]' 
          : 'bg-white border-neutral-200/90 shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-mono tracking-widest uppercase transition-colors"
              style={{
                borderColor: isDark ? 'rgba(239, 68, 68, 0.4)' : 'rgba(225, 29, 72, 0.3)',
                backgroundColor: isDark ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255, 228, 230, 0.6)',
                color: isDark ? '#FDA4AF' : '#BE123C'
              }}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>{t.badge}</span>
            </div>

            <h2 className={`text-2xl sm:text-3xl font-serif font-bold tracking-tight ${
              isDark ? 'text-neutral-100' : 'text-neutral-900'
            }`}>
              {t.title}
            </h2>

            <p className={`text-xs sm:text-sm font-serif max-w-2xl leading-relaxed ${
              isDark ? 'text-neutral-300' : 'text-neutral-600'
            }`}>
              {t.subtitle}
            </p>
          </div>

          <a
            href="https://projects.raspberrypi.org/en/"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-mono font-bold transition-all shadow-sm hover:shadow-md self-start md:self-center shrink-0 cursor-pointer"
          >
            <span>{t.visitPortal}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* 6 Technology Pathway Cards Grid (2 columns on md+, exactly like screenshot) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {RASPBERRY_PI_PROJECTS.map((item) => {
          const localizedName = lang === 'fi' ? item.nameFi : lang === 'en' ? item.nameEn : item.nameJa;
          const localizedDesc = lang === 'fi' ? item.descFi : lang === 'en' ? item.descEn : item.descJa;
          const localizedBadge = lang === 'fi' ? item.badgeFi : lang === 'en' ? item.badgeEn : item.badgeJa;
          const localizedAge = lang === 'fi' ? item.ageBracketFi : lang === 'en' ? item.ageBracketEn : item.ageBracketJa;
          const localizedRequirements = lang === 'fi' ? item.requirementsFi : lang === 'en' ? item.requirementsEn : item.requirementsJa;

          return (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noreferrer noopener"
              className={`group p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex items-start gap-4 sm:gap-5 cursor-pointer ${
                isDark 
                  ? 'bg-[#181524] border-neutral-800/90 hover:border-amber-500/50 hover:bg-[#201c30] shadow-md hover:shadow-xl hover:-translate-y-0.5' 
                  : 'bg-white border-neutral-200/90 hover:border-neutral-400 hover:shadow-md hover:-translate-y-0.5'
              }`}
            >
              {/* Distinctive Illustrated Icon Container */}
              {renderCardIcon(item.iconType)}

              {/* Title & Description & Pointer */}
              <div className="min-w-0 flex-1 space-y-1.5">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3 className={`font-serif text-lg sm:text-xl font-bold flex items-center gap-1 transition-colors ${
                    isDark ? 'text-neutral-100 group-hover:text-amber-400' : 'text-neutral-900 group-hover:text-rose-600'
                  }`}>
                    <span>{item.name}</span>
                    <ChevronRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${
                      isDark ? 'text-neutral-400 group-hover:text-amber-400' : 'text-neutral-500 group-hover:text-rose-600'
                    }`} />
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-neutral-500/20 text-neutral-400">
                    {localizedBadge}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-medium ${
                    isDark 
                      ? 'bg-amber-950/40 text-amber-300/90 border border-amber-500/30' 
                      : 'bg-rose-50 text-rose-700 border border-rose-200/80'
                  }`}>
                    🎯 {localizedAge}
                  </span>
                </div>

                <p className={`text-xs sm:text-sm font-serif leading-relaxed line-clamp-2 ${
                  isDark ? 'text-neutral-300' : 'text-neutral-600'
                }`}>
                  {localizedDesc}
                </p>

                {/* Pointer: What you need */}
                <div className={`pt-2 mt-2 border-t flex items-start gap-1.5 text-[11px] font-mono leading-tight ${
                  isDark ? 'border-neutral-800/80' : 'border-neutral-100'
                }`}>
                  <span className={`inline-flex items-center gap-1 font-semibold shrink-0 ${
                    item.needsHardware
                      ? (isDark ? 'text-amber-400' : 'text-rose-600')
                      : (isDark ? 'text-neutral-400' : 'text-neutral-500')
                  }`}>
                    <span>👉</span>
                    <span>{t.whatYouNeed}:</span>
                  </span>
                  <span className={`font-serif text-xs ${
                    item.needsHardware
                      ? (isDark ? 'text-amber-200/90 font-medium' : 'text-rose-900 font-medium')
                      : (isDark ? 'text-neutral-300' : 'text-neutral-700')
                  }`}>
                    {localizedRequirements}
                  </span>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
