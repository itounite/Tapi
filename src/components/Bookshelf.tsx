import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, BookMarked, ExternalLink, Quote, Sparkles } from 'lucide-react';
import { Language, ThemeMode } from '../types';
import { CURATED_BOOKS, CuratedBook } from '../data/curatedBooks';

interface BookshelfProps {
  lang: Language;
  theme?: ThemeMode;
}

export default function Bookshelf({ lang, theme = 'dark' }: BookshelfProps) {
  const isDark = theme === 'dark';
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeBook, setActiveBook] = useState<CuratedBook | null>(null);

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 8);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 8);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    // Scroll by width of approximately 2-3 books or half the container
    const scrollAmount = Math.max(container.clientWidth * 0.75, 300);
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  // Trilingual labels
  const t = {
    sectionBadge: lang === 'fi' 
      ? 'SUOSITELTU KIRJAHYLLY' 
      : lang === 'en' 
      ? 'CURATED BOOKSHELF' 
      : '心と知恵を育む・推薦本棚',
    sectionTitle: lang === 'fi' 
      ? 'Ajattomia kirjoja mielelle ja sydämelle' 
      : lang === 'en' 
      ? 'Inspiring Bookshelf for Curious Minds' 
      : '人生の糧になる、おすすめの本棚',
    sectionSubtitle: lang === 'fi'
      ? 'Valittuja teoksia kurinalaisuudesta, sisusta, empatiasta ja oman asenteen valitsemisesta elämässä.'
      : lang === 'en'
      ? 'Timeless reads exploring kindness, discipline, sisu, courage, and discovering meaning in any circumstance.'
      : '優しさ、弱さを受け入れる勇気、自立と規律、そしてどんな境遇でも前を向く強さを教えてくれる珠玉の名作。',
    shelfHint: lang === 'fi' 
      ? 'Selaa kirjoja nuolilla tai pyyhkäisemällä' 
      : lang === 'en' 
      ? 'Use arrows or swipe to browse books' 
      : '左右の矢印で本棚をスクロールできます',
    viewOnGoodreads: lang === 'fi' ? 'Näytä Goodreadsissa' : lang === 'en' ? 'View on Goodreads' : 'Goodreadsで詳細を見る',
    close: lang === 'fi' ? 'Sulje' : lang === 'en' ? 'Close' : '閉じる',
    coreMessage: lang === 'fi' ? 'Ydinsanoma' : lang === 'en' ? 'Core Message' : '心に響くメッセージ',
  };

  return (
    <div className={`mt-14 pt-10 pb-8 px-4 sm:px-6 rounded-3xl border transition-all ${
      isDark 
        ? 'bg-[#12101a] border-amber-900/40 shadow-[0_12px_40px_rgba(0,0,0,0.6)]' 
        : 'bg-[#fcfaf7] border-amber-200/80 shadow-md'
    }`}>
      {/* Header with Title and Scroll Arrows */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border text-[11px] font-mono tracking-widest uppercase mb-2"
            style={{
              borderColor: isDark ? 'rgba(245, 158, 11, 0.4)' : 'rgba(217, 119, 6, 0.3)',
              backgroundColor: isDark ? 'rgba(245, 158, 11, 0.1)' : 'rgba(254, 243, 199, 0.6)',
              color: isDark ? '#FCD34D' : '#92400E'
            }}
          >
            <BookMarked className="w-3.5 h-3.5" />
            <span>{t.sectionBadge}</span>
          </div>
          <h2 className={`text-2xl sm:text-3xl font-serif font-bold tracking-tight ${
            isDark ? 'text-neutral-100' : 'text-neutral-900'
          }`}>
            {t.sectionTitle}
          </h2>
          <p className={`text-xs sm:text-sm font-serif mt-1 max-w-xl ${
            isDark ? 'text-neutral-400' : 'text-neutral-600'
          }`}>
            {t.sectionSubtitle}
          </p>
        </div>

        {/* Scroll Controls */}
        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <span className="text-[11px] font-mono text-neutral-400 hidden md:inline-block mr-2">
            {t.shelfHint}
          </span>
          <button
            type="button"
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Scroll bookshelf left"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer border ${
              canScrollLeft
                ? isDark 
                  ? 'bg-amber-950/60 hover:bg-amber-900/80 border-amber-500/40 text-amber-300 shadow-sm active:scale-95' 
                  : 'bg-white hover:bg-amber-50 border-neutral-300 text-neutral-800 shadow-sm active:scale-95'
                : 'opacity-30 cursor-not-allowed border-neutral-700 text-neutral-500'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Scroll bookshelf right"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer border ${
              canScrollRight
                ? isDark 
                  ? 'bg-amber-950/60 hover:bg-amber-900/80 border-amber-500/40 text-amber-300 shadow-sm active:scale-95' 
                  : 'bg-white hover:bg-amber-50 border-neutral-300 text-neutral-800 shadow-sm active:scale-95'
                : 'opacity-30 cursor-not-allowed border-neutral-700 text-neutral-500'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* The Bookshelf Visual Area */}
      <div className="relative pt-4 pb-2">
        {/* Books Scroll Container - calibrated so ~6 books show on standard wide viewports */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex gap-4 sm:gap-5 overflow-x-auto scroll-smooth pb-4 px-1 no-scrollbar snap-x snap-mandatory items-end"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {CURATED_BOOKS.map((book) => {
            const localizedTitle = lang === 'fi' ? book.titleFi : lang === 'en' ? book.titleEn : book.titleJa;
            const localizedLesson = lang === 'fi' ? book.coreLessonFi : lang === 'en' ? book.coreLessonEn : book.coreLessonJa;
            const localizedBadge = lang === 'fi' ? book.badgeFi : lang === 'en' ? book.badgeEn : book.badgeJa;

            return (
              <div
                key={book.id}
                className="w-[145px] sm:w-[160px] md:w-[172px] lg:w-[175px] shrink-0 snap-start group flex flex-col justify-end"
              >
                {/* Book Card with 3D Depth & Shadow */}
                <div 
                  className={`relative rounded-md overflow-hidden transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-[0_16px_28px_rgba(0,0,0,0.5)] cursor-pointer flex flex-col ${
                    isDark 
                      ? 'shadow-[0_8px_16px_rgba(0,0,0,0.4)] ring-1 ring-white/10' 
                      : 'shadow-md ring-1 ring-black/10'
                  }`}
                  style={{ aspectRatio: '2 / 3.05' }}
                  onClick={() => setActiveBook(book)}
                >
                  {/* Subtle Spine Highlight on Left Edge */}
                  <div className="absolute top-0 bottom-0 left-0 w-2.5 z-20 pointer-events-none bg-gradient-to-r from-black/40 via-white/15 to-transparent" />
                  
                  {/* Book Ribbon / Badge */}
                  <div className="absolute top-2 right-2 z-20">
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-sm bg-black/70 backdrop-blur-xs text-amber-300 font-medium tracking-tight">
                      {localizedBadge}
                    </span>
                  </div>

                  {/* Book Cover Content */}
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover select-none"
                    loading="lazy"
                  />

                  {/* Hover Overlay with Quick Quote & Goodreads button */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2.5 z-30 flex flex-col justify-end text-left">
                    <p className="text-[10px] font-serif text-amber-200 line-clamp-3 mb-2 italic">
                      {localizedLesson}
                    </p>
                    <a
                      href={book.goodreadsUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center justify-center gap-1 w-full py-1 px-1.5 rounded-sm bg-amber-500 hover:bg-amber-400 text-stone-950 text-[10px] font-mono font-bold transition-colors"
                    >
                      <span>Goodreads</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>

                {/* Book Spine Shadow at Base */}
                <div className="w-11/12 mx-auto h-2 bg-black/40 blur-xs rounded-full transform translate-y-1" />

                {/* Book Metadata below shelf */}
                <div className="mt-3 text-center px-1">
                  <h4 
                    onClick={() => setActiveBook(book)}
                    className={`font-serif text-xs font-semibold line-clamp-1 cursor-pointer transition-colors ${
                      isDark ? 'text-neutral-200 hover:text-amber-400' : 'text-neutral-800 hover:text-amber-700'
                    }`}
                  >
                    {book.title}
                  </h4>
                  <p className="font-mono text-[10px] text-neutral-400 truncate mt-0.5">
                    {book.author}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Realistic Wooden Shelf Ledge */}
        <div className="relative mt-1">
          {/* Top shelf surface edge */}
          <div className={`h-3 w-full rounded-xs transition-colors shadow-inner ${
            isDark 
              ? 'bg-gradient-to-r from-[#2e1d10] via-[#4a2e1b] to-[#2e1d10] border-t border-amber-600/40' 
              : 'bg-gradient-to-r from-[#8c593b] via-[#a86e49] to-[#8c593b] border-t border-amber-300'
          }`} />
          {/* Front shelf plank depth & shadow */}
          <div className={`h-4 w-full rounded-b-md shadow-lg transition-colors ${
            isDark 
              ? 'bg-gradient-to-r from-[#1c120a] via-[#2a1a0f] to-[#1c120a] border-b border-black/40' 
              : 'bg-gradient-to-r from-[#5c371e] via-[#6d4225] to-[#5c371e] border-b border-black/20'
          }`} />
        </div>
      </div>

      {/* Book Detail Modal / Modal drawer on click */}
      {activeBook && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setActiveBook(null)}
        >
          <div 
            className={`relative max-w-lg w-full rounded-2xl border p-6 sm:p-7 space-y-5 transition-all shadow-2xl ${
              isDark 
                ? 'bg-[#181524] border-amber-500/30 text-[#F5F3EC]' 
                : 'bg-white border-amber-200 text-[#2E2E2E]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex gap-4 items-start">
              {/* Cover Thumbnail */}
              <div 
                className="w-24 sm:w-28 shrink-0 rounded-md overflow-hidden shadow-lg border border-white/10"
                style={{ aspectRatio: '2 / 3' }}
              >
                <img
                  src={activeBook.coverImage}
                  alt={activeBook.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title & Author */}
              <div className="space-y-1.5 flex-1 min-w-0">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                  {lang === 'fi' ? activeBook.badgeFi : lang === 'en' ? activeBook.badgeEn : activeBook.badgeJa}
                </span>
                <h3 className={`font-serif text-lg sm:text-xl font-bold leading-tight ${
                  isDark ? 'text-neutral-100' : 'text-neutral-900'
                }`}>
                  {lang === 'fi' ? activeBook.titleFi : lang === 'en' ? activeBook.titleEn : activeBook.titleJa}
                </h3>
                <p className="font-mono text-xs text-neutral-400">
                  by {activeBook.author}
                </p>
              </div>
            </div>

            {/* Core Message / Lesson */}
            <div className={`p-4 rounded-xl border space-y-2 ${
              isDark ? 'bg-[#12101b] border-neutral-800' : 'bg-amber-50/70 border-amber-200/60'
            }`}>
              <div className="flex items-center gap-2 text-xs font-mono font-medium text-amber-400">
                <Quote className="w-3.5 h-3.5" />
                <span>{t.coreMessage}</span>
              </div>
              <p className="font-serif text-xs sm:text-sm leading-relaxed">
                {lang === 'fi' ? activeBook.coreLessonFi : lang === 'en' ? activeBook.coreLessonEn : activeBook.coreLessonJa}
              </p>
            </div>

            {/* Direct Quote */}
            <blockquote className={`pl-3 border-l-2 text-xs sm:text-sm italic font-serif ${
              isDark ? 'border-amber-500/60 text-amber-200/90' : 'border-amber-500 text-neutral-700'
            }`}>
              {lang === 'fi' ? activeBook.quoteFi : lang === 'en' ? activeBook.quoteEn : activeBook.quoteJa}
            </blockquote>

            {/* Modal Actions */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveBook(null)}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-colors cursor-pointer border ${
                  isDark 
                    ? 'border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-neutral-300' 
                    : 'border-neutral-300 bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                }`}
              >
                {t.close}
              </button>
              <a
                href={activeBook.goodreadsUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-mono font-bold transition-all shadow-md hover:shadow-lg"
              >
                <span>{t.viewOnGoodreads}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
