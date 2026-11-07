import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code, 
  BookOpen, 
  Atom, 
  ExternalLink, 
  Search, 
  CheckCircle2, 
  Sparkles, 
  GraduationCap, 
  ArrowLeft,
  Filter,
  Gamepad2,
  Terminal,
  Box,
  FileText,
  Globe,
  Calculator,
  Compass
} from 'lucide-react';
import { Language, ThemeMode } from '../types';
import { LEARNING_RESOURCES, LearningResource } from '../data/learningResources';
import Bookshelf from './Bookshelf';
import RaspberryPiSection from './RaspberryPiSection';
import VideoStorySection from './VideoStorySection';

interface LearningPageProps {
  lang: Language;
  onNavigate: (path: string) => void;
  theme?: ThemeMode;
}

export default function LearningPage({ lang, onNavigate, theme = 'dark' }: LearningPageProps) {
  const isDark = theme === 'dark';
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'coding' | 'reading' | 'stem'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Icon mapping
  const renderIcon = (iconName: LearningResource['iconName']) => {
    const className = "w-5 h-5";
    switch (iconName) {
      case 'code': return <Code className={className} />;
      case 'terminal': return <Terminal className={className} />;
      case 'box': return <Box className={className} />;
      case 'gamepad': return <Gamepad2 className={className} />;
      case 'book-open': return <BookOpen className={className} />;
      case 'file-text': return <FileText className={className} />;
      case 'globe': return <Globe className={className} />;
      case 'calculator': return <Calculator className={className} />;
      case 'atom': return <Atom className={className} />;
      case 'sparkles':
      default: return <Sparkles className={className} />;
    }
  };

  // Filtered resources
  const filteredResources = useMemo(() => {
    return LEARNING_RESOURCES.filter(res => {
      // Category check
      if (selectedCategory !== 'all' && res.category !== selectedCategory) {
        return false;
      }
      // Search query check
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();

      const nameMatch = res.name.toLowerCase().includes(q) || res.domain.toLowerCase().includes(q);
      const titleMatch = res.titleJa.toLowerCase().includes(q) || res.titleEn.toLowerCase().includes(q) || res.titleFi.toLowerCase().includes(q);
      const descMatch = res.descJa.toLowerCase().includes(q) || res.descEn.toLowerCase().includes(q) || res.descFi.toLowerCase().includes(q);
      const subjectsMatch = [...res.subjectsJa, ...res.subjectsEn, ...res.subjectsFi].some(s => s.toLowerCase().includes(q));

      return nameMatch || titleMatch || descMatch || subjectsMatch;
    });
  }, [selectedCategory, searchQuery]);

  // Counts
  const counts = useMemo(() => {
    return {
      all: LEARNING_RESOURCES.length,
      coding: LEARNING_RESOURCES.filter(r => r.category === 'coding').length,
      reading: LEARNING_RESOURCES.filter(r => r.category === 'reading').length,
      stem: LEARNING_RESOURCES.filter(r => r.category === 'stem').length,
    };
  }, []);

  // Multilingual UI labels
  const t = {
    backHome: lang === 'fi' ? 'Takaisin etusivulle' : lang === 'en' ? 'Back to Home' : 'ホームへ戻る',
    badge: lang === 'fi' ? 'KURAATTORIN VALITSEMAT OPPIMISRESURSSIT' : lang === 'en' ? 'CURATED EDUCATIONAL DIRECTORY' : '公式セレクト・学習リソース',
    heroTitle: lang === 'fi' 
      ? 'Oppimisen iloa & uusia taitoja' 
      : lang === 'en' 
      ? 'Curiosity, Coding & Discovery' 
      : '知的好奇心と、学びの冒険へ',
    heroSubtitle: lang === 'fi'
      ? 'Parhaat ilmaiset ja avoimet verkkoresurssit koodaukseen, lukutaitoon, englannin kieleen, matematiikkaan ja luonnontieteisiin.'
      : lang === 'en'
      ? 'Explore premier open learning platforms for coding, reading comprehension, mathematics, English, and science.'
      : 'プログラミング、英語読解、物語の創作、算数・数学、そして科学の実験まで。世界最高峰の信頼できる学習サイトを厳選してご紹介します。',
    allTab: lang === 'fi' ? 'Kaikki' : lang === 'en' ? 'All Resources' : 'すべて',
    codingTab: lang === 'fi' ? 'Koodaus' : lang === 'en' ? 'Coding' : 'プログラミング',
    readingTab: lang === 'fi' ? 'Lukutaito & Englanti' : lang === 'en' ? 'Reading' : '読書・英語読解',
    stemTab: lang === 'fi' ? 'Matematiikka, englanti ja luonnontieteet' : lang === 'en' ? 'Maths, English and Science' : '算数・数学・英語・理科',
    searchPlaceholder: lang === 'fi' 
      ? 'Etsi resursseja (esim. Khan Academy, Python, Scratch, Lexile)...' 
      : lang === 'en' 
      ? 'Search resources by keyword, subject, or language (e.g. Khan Academy, Scratch, Python)...' 
      : 'キーワードで検索 (例: Khan Academy, Scratch, Python, 算数, 英語, 読解)...',
    clearSearch: lang === 'fi' ? 'Tyhjennä haku' : lang === 'en' ? 'Clear' : 'クリア',
    visitSite: lang === 'fi' ? 'Avaa verkkosivusto' : lang === 'en' ? 'Visit Website' : '公式サイトを開く',
    recommendedLevel: lang === 'fi' ? 'Kohderyhmä' : lang === 'en' ? 'Target Level' : '対象レベル',
    subjectsHeading: lang === 'fi' ? 'Keskeiset aiheet' : lang === 'en' ? 'Key Subjects' : '学べる分野',
    highlightsHeading: lang === 'fi' ? 'Erityispiirteet' : lang === 'en' ? 'Highlights' : '主な特徴',
    noResultsTitle: lang === 'fi' ? 'Ei hakutuloksia' : lang === 'en' ? 'No Matching Resources Found' : '一致するリソースが見つかりませんでした',
    noResultsDesc: lang === 'fi' 
      ? 'Kokeile toista hakusanaa tai nollaa suodattimet.' 
      : lang === 'en' 
      ? 'Try adjusting your search terms or selecting a different category filter.' 
      : '検索キーワードを変更するか、カテゴリーフィルターを切り替えてみてください。',
  };

  return (
    <div className={`min-h-screen py-8 sm:py-14 px-4 sm:px-8 transition-colors ${
      isDark ? 'bg-[#0d0c14] text-[#F5F3EC]' : 'bg-[#FBF9F6] text-[#2E2E2E]'
    }`}>
      <div className="max-w-6xl mx-auto space-y-10 sm:space-y-12">

        {/* Back Link Breadcrumb */}
        <div>
          <button
            onClick={() => onNavigate('/')}
            className={`inline-flex items-center gap-2 text-xs font-mono tracking-wider transition-colors cursor-pointer group ${
              isDark ? 'text-amber-400 hover:text-amber-300' : 'text-neutral-600 hover:text-neutral-950'
            }`}
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>{t.backHome}</span>
          </button>
        </div>

        {/* Hero Section */}
        <div className="relative text-center max-w-3xl mx-auto space-y-4">
          {/* Subtle Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-[11px] font-mono tracking-widest uppercase transition-colors shadow-xs"
            style={{
              borderColor: isDark ? 'rgba(245, 158, 11, 0.4)' : 'rgba(217, 119, 6, 0.3)',
              backgroundColor: isDark ? 'rgba(245, 158, 11, 0.1)' : 'rgba(254, 243, 199, 0.6)',
              color: isDark ? '#FCD34D' : '#92400E'
            }}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>

          {/* Page Heading */}
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight leading-tight ${
            isDark ? 'text-neutral-100' : 'text-neutral-900'
          }`}>
            {t.heroTitle}
          </h1>

          {/* Subtitle */}
          <p className={`text-sm sm:text-base leading-relaxed font-serif max-w-2xl mx-auto ${
            isDark ? 'text-neutral-300' : 'text-neutral-600'
          }`}>
            {t.heroSubtitle}
          </p>
        </div>

        {/* Curated Bookshelf (Placed above open learning platforms) */}
        <Bookshelf lang={lang} theme={theme} />

        {/* Open Learning Platforms Section Header */}
        <div className="pt-8 border-t border-neutral-800/40 text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full border text-[11px] font-mono tracking-widest uppercase"
            style={{
              borderColor: isDark ? 'rgba(245, 158, 11, 0.4)' : 'rgba(217, 119, 6, 0.3)',
              backgroundColor: isDark ? 'rgba(245, 158, 11, 0.1)' : 'rgba(254, 243, 199, 0.6)',
              color: isDark ? '#FCD34D' : '#92400E'
            }}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>
              {lang === 'fi' 
                ? 'Avoimet ja vuorovaikutteiset oppimisalustat' 
                : lang === 'en' 
                ? 'Curated Open Learning Platforms' 
                : '厳選オープン学習プラットフォーム'}
            </span>
          </div>
          <p className={`text-xs sm:text-sm font-serif ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
            {lang === 'fi'
              ? 'Koodaus, lukutaito, matematiikka ja luonnontieteet'
              : lang === 'en'
              ? 'Explore free and open interactive platforms for coding, reading, maths, and sciences'
              : 'プログラミング、英語読解、算数・数学、理科の無料・オープン学習サイト'}
          </p>
        </div>

        {/* Controls: Filter Pills & Search Bar */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            
            {/* Category Filter Pills */}
            <div className={`flex items-center gap-1.5 p-1 rounded-xl border text-xs font-mono overflow-x-auto no-scrollbar touch-momentum shrink-0 max-w-full ${
              isDark ? 'bg-[#14121e] border-neutral-800' : 'bg-neutral-100 border-neutral-200'
            }`}>
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-medium whitespace-nowrap min-h-[36px] flex items-center touch-manipulation active:scale-95 ${
                  selectedCategory === 'all'
                    ? (isDark ? 'bg-amber-500/25 text-amber-300 font-bold border border-amber-500/40' : 'bg-white text-neutral-900 shadow-xs font-bold')
                    : (isDark ? 'text-neutral-400 hover:text-neutral-200' : 'text-neutral-600 hover:text-neutral-900')
                }`}
              >
                {t.allTab} ({counts.all})
              </button>

              <button
                type="button"
                onClick={() => setSelectedCategory('coding')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-medium flex items-center gap-1.5 whitespace-nowrap min-h-[36px] touch-manipulation active:scale-95 ${
                  selectedCategory === 'coding'
                    ? (isDark ? 'bg-amber-500/25 text-amber-300 font-bold border border-amber-500/40' : 'bg-white text-neutral-900 shadow-xs font-bold')
                    : (isDark ? 'text-neutral-400 hover:text-neutral-200' : 'text-neutral-600 hover:text-neutral-900')
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>{t.codingTab} ({counts.coding})</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedCategory('reading')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-medium flex items-center gap-1.5 whitespace-nowrap min-h-[36px] touch-manipulation active:scale-95 ${
                  selectedCategory === 'reading'
                    ? (isDark ? 'bg-amber-500/25 text-amber-300 font-bold border border-amber-500/40' : 'bg-white text-neutral-900 shadow-xs font-bold')
                    : (isDark ? 'text-neutral-400 hover:text-neutral-200' : 'text-neutral-600 hover:text-neutral-900')
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{t.readingTab} ({counts.reading})</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedCategory('stem')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-medium flex items-center gap-1.5 whitespace-nowrap min-h-[36px] touch-manipulation active:scale-95 ${
                  selectedCategory === 'stem'
                    ? (isDark ? 'bg-amber-500/25 text-amber-300 font-bold border border-amber-500/40' : 'bg-white text-neutral-900 shadow-xs font-bold')
                    : (isDark ? 'text-neutral-400 hover:text-neutral-200' : 'text-neutral-600 hover:text-neutral-900')
                }`}
              >
                <Atom className="w-3.5 h-3.5" />
                <span>{t.stemTab} ({counts.stem})</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative min-w-[260px] sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className={`w-full pl-9 pr-8 py-2 rounded-xl text-xs font-mono border transition-all outline-hidden ${
                  isDark
                    ? 'bg-[#14121e] border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30'
                    : 'bg-white border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:border-amber-600 focus:ring-1 focus:ring-amber-600/20'
                }`}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-mono text-neutral-400 hover:text-neutral-200 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Resources Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredResources.map((res, index) => {
              const localizedTitle = lang === 'fi' ? res.titleFi : lang === 'en' ? res.titleEn : res.titleJa;
              const localizedBadge = lang === 'fi' ? res.badgeFi : lang === 'en' ? res.badgeEn : res.badgeJa;
              const localizedTagline = lang === 'fi' ? res.taglineFi : lang === 'en' ? res.taglineEn : res.taglineJa;
              const localizedDesc = lang === 'fi' ? res.descFi : lang === 'en' ? res.descEn : res.descJa;
              const localizedLevel = lang === 'fi' ? res.levelFi : lang === 'en' ? res.levelEn : res.levelJa;
              const localizedSubjects = lang === 'fi' ? res.subjectsFi : lang === 'en' ? res.subjectsEn : res.subjectsJa;
              const localizedHighlights = lang === 'fi' ? res.highlightsFi : lang === 'en' ? res.highlightsEn : res.highlightsJa;
              const localizedPricing = lang === 'fi' ? res.pricingFi : lang === 'en' ? res.pricingEn : res.pricingJa;

              return (
                <motion.article
                  key={res.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className={`relative rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 ${
                    isDark
                      ? 'bg-[#151322] border-neutral-800/90 hover:border-amber-500/50 hover:shadow-[0_12px_36px_rgba(0,0,0,0.5)]'
                      : 'bg-white border-neutral-200/90 hover:border-amber-400 hover:shadow-[0_12px_28px_rgba(245,158,11,0.12)]'
                  }`}
                >
                  {/* Card Header Top Row */}
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      {/* Icon & Provider Details */}
                      <div className="flex items-center gap-3">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border transition-transform group-hover:scale-105 ${
                          isDark 
                            ? 'bg-neutral-900/90 border-neutral-700/80 text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.15)]' 
                            : 'bg-amber-50 border-amber-200 text-amber-700'
                        }`}>
                          {renderIcon(res.iconName)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-semibold tracking-wider text-amber-500">
                              {res.domain}
                            </span>
                          </div>
                          <h2 className={`font-serif text-lg sm:text-xl font-bold tracking-tight leading-snug group-hover:text-amber-500 transition-colors ${
                            isDark ? 'text-neutral-100' : 'text-neutral-900'
                          }`}>
                            {res.name}
                          </h2>
                        </div>
                      </div>

                      {/* Pricing Tag */}
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md shrink-0 border ${
                        isDark 
                          ? 'border-emerald-500/30 bg-emerald-950/30 text-emerald-300' 
                          : 'border-emerald-300 bg-emerald-50 text-emerald-800'
                      }`}>
                        {localizedPricing}
                      </span>
                    </div>

                    {/* Category & Feature Badge */}
                    <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border"
                      style={{
                        borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
                        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
                        color: isDark ? '#E2E8F0' : '#475569'
                      }}
                    >
                      {localizedBadge}
                    </div>

                    {/* Tagline */}
                    <p className={`font-serif text-xs sm:text-sm font-medium leading-snug ${
                      isDark ? 'text-amber-200/90' : 'text-amber-900'
                    }`}>
                      {localizedTagline}
                    </p>

                    {/* Long Description */}
                    <p className={`font-serif text-xs leading-relaxed ${
                      isDark ? 'text-neutral-300' : 'text-neutral-600'
                    }`}>
                      {localizedDesc}
                    </p>

                    {/* Target Age / Level Badge */}
                    <div className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs font-mono ${
                      isDark ? 'bg-neutral-900/60 border-neutral-800/80 text-neutral-300' : 'bg-neutral-50 border-neutral-200 text-neutral-700'
                    }`}>
                      <Compass className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="text-[10px] uppercase font-bold text-neutral-400">
                        {t.recommendedLevel}:
                      </span>
                      <span className="truncate">{localizedLevel}</span>
                    </div>

                    {/* Key Subjects Pills */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                        {t.subjectsHeading}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {localizedSubjects.map((subject, sIdx) => (
                          <span
                            key={sIdx}
                            className={`text-[10px] font-mono px-2 py-0.5 rounded-md transition-colors ${
                              isDark 
                                ? 'bg-neutral-800/80 text-neutral-300 border border-neutral-700/60' 
                                : 'bg-neutral-100 text-neutral-700 border border-neutral-200'
                            }`}
                          >
                            #{subject}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Highlights List */}
                    <div className="space-y-1 pt-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                        {t.highlightsHeading}
                      </span>
                      <ul className="space-y-1 text-xs font-serif">
                        {localizedHighlights.map((hl, hIdx) => (
                          <li key={hIdx} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                            <span className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>
                              {hl}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className={`mt-6 pt-4 border-t flex items-center justify-between gap-3 ${
                    isDark ? 'border-neutral-800' : 'border-neutral-100'
                  }`}>
                    <span className="font-mono text-[11px] text-neutral-400 truncate">
                      {res.domain}
                    </span>

                    <a
                      href={res.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all shadow-xs cursor-pointer group/btn ${
                        isDark
                          ? 'bg-amber-500/20 hover:bg-amber-500/35 border border-amber-500/40 text-amber-300 hover:shadow-[0_0_16px_rgba(245,158,11,0.25)]'
                          : 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs'
                      }`}
                    >
                      <span>{t.visitSite}</span>
                      <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </a>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty Search State */}
        {filteredResources.length === 0 && (
          <div className={`text-center py-16 px-6 max-w-md mx-auto rounded-2xl border space-y-3 ${
            isDark ? 'bg-[#14121e] border-neutral-800' : 'bg-white border-neutral-200'
          }`}>
            <Search className="w-8 h-8 text-neutral-400 mx-auto" />
            <h3 className={`font-serif text-lg font-bold ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>
              {t.noResultsTitle}
            </h3>
            <p className="font-serif text-xs text-neutral-400">
              {t.noResultsDesc}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className={`mt-2 px-4 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
                isDark ? 'bg-amber-950/60 text-amber-300 border border-amber-500/30' : 'bg-amber-100 text-amber-900'
              }`}
            >
              {t.clearSearch}
            </button>
          </div>
        )}

        {/* Full Separate Section on Raspberry Pi (Placed after the Curation Section) */}
        <RaspberryPiSection lang={lang} theme={theme} />

        {/* Video Story Section with Scroll Option (Placed at the bottom of the learning page) */}
        <VideoStorySection lang={lang} theme={theme} />

        {/* Bottom Navigation Prompt */}
        <div className={`p-6 sm:p-8 rounded-2xl border text-center max-w-2xl mx-auto space-y-4 ${
          isDark ? 'bg-[#14121e] border-neutral-800' : 'bg-white border-neutral-200'
        }`}>
          <h3 className={`font-serif text-base sm:text-lg font-bold ${
            isDark ? 'text-neutral-100' : 'text-neutral-900'
          }`}>
            {lang === 'fi' 
              ? 'Haluatko lukea lisää Yoshi Tsuijin tarinoita ja luovuutta?' 
              : lang === 'en' 
              ? 'Curious to explore Yoshi Tsuiji’s original stories & art?' 
              : '辻義の世界観やオリジナルエッセイもぜひお読みください'}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('/')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-colors cursor-pointer border ${
                isDark 
                  ? 'border-neutral-700 bg-neutral-800/80 hover:bg-neutral-700 text-neutral-200' 
                  : 'border-neutral-300 bg-neutral-100 hover:bg-neutral-200 text-neutral-800'
              }`}
            >
              {t.backHome}
            </button>
            <button
              onClick={() => onNavigate('/essays')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-colors cursor-pointer ${
                isDark 
                  ? 'bg-amber-500/25 text-amber-300 border border-amber-500/40 hover:bg-amber-500/40' 
                  : 'bg-amber-600 text-white hover:bg-amber-700'
              }`}
            >
              {lang === 'fi' ? 'Lue esseitä' : lang === 'en' ? 'Read Essays' : 'エッセイ・文集へ'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
