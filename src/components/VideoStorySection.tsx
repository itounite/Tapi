import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, ExternalLink, Film, Sparkles } from 'lucide-react';
import { Language, ThemeMode } from '../types';
import { VIDEO_STORIES } from '../data/videoStories';

interface VideoStorySectionProps {
  lang: Language;
  theme?: ThemeMode;
}

export default function VideoStorySection({ lang, theme = 'light' }: VideoStorySectionProps) {
  const isDark = theme === 'dark';
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activePlayId, setActivePlayId] = useState<string | null>(null);

  const visibleStories = VIDEO_STORIES.filter((story) => !story.hidden);

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollAmount = Math.max(container.clientWidth * 0.8, 340);
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const scrollToStoryIndex = (idx: number) => {
    if (!scrollContainerRef.current) return;
    const child = scrollContainerRef.current.children[idx] as HTMLElement | undefined;
    if (child) {
      child.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    }
  };

  const t = {
    kicker:
      lang === 'fi'
        ? 'OPPIMISFILOSOFIA · VIDEOT & DOKUMENTIT'
        : lang === 'en'
        ? 'LEARNING PHILOSOPHY · VIDEOS & DOCUMENTARIES'
        : '学びの哲学 · 映像・ドキュメンタリー棚',
    title:
      lang === 'fi'
        ? 'Learning Philosophy with Video Stories & Documentaries'
        : lang === 'en'
        ? 'Learning Philosophy with Video Stories & Documentaries'
        : '学びの哲学：映像物語・ドキュメンタリー＆寓話',
    subtitle:
      lang === 'fi'
        ? 'Minimalismia, japanilaisia ja pohjoismaisia arjen tapoja sekä ajattomia tarinoita tietoiseen ja lempeään elämään.'
        : lang === 'en'
        ? 'Thoughtful short documentaries and timeless parables on simple living, Japanese moderation, Nordic winter resilience, and pure kindness.'
        : 'ミニマリズムの哲学、日本の「足るを知る」習慣、北欧の冬を生きる知恵、そして純粋な優しさを描くドキュメンタリーと映像物語。',
    watchOnYoutube:
      lang === 'fi' ? 'Katso YouTubessa' : lang === 'en' ? 'Watch on YouTube' : 'YouTubeで開く',
    moralHeader: lang === 'fi' ? 'Ydinsanoma' : lang === 'en' ? 'Core Takeaway' : '心に刻むメッセージ',
    synopsisHeader: lang === 'fi' ? 'Tiivistelmä' : lang === 'en' ? 'Synopsis' : 'あらすじ・解説',
    scrollHint:
      lang === 'fi'
        ? 'Selaa videoita nuolilla'
        : lang === 'en'
        ? 'Scroll shelf or pick story'
        : '矢印や番号で切替',
    playVideo: lang === 'fi' ? 'Toista' : lang === 'en' ? 'Play' : '再生',
  };

  if (visibleStories.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="learning-philosophy-videos-heading"
      className="space-y-5"
    >
      {/* Shelf Header with Quick Number Jumpers & Scroll Arrows */}
      <div
        className={`p-5 sm:p-7 rounded-3xl border transition-all ${
          isDark
            ? 'bg-[#151221] border-neutral-800 shadow-[0_8px_30px_rgba(0,0,0,0.4)]'
            : 'bg-white border-neutral-200/90 shadow-xs'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            <div
              className={`flex items-center gap-2 text-xs font-mono tracking-wider uppercase ${
                isDark ? 'text-rose-300' : 'text-rose-700'
              }`}
            >
              <Film className="w-4 h-4 shrink-0" />
              <span>{t.kicker}</span>
            </div>

            <h2
              id="learning-philosophy-videos-heading"
              className={`text-2xl sm:text-3xl font-serif font-bold tracking-tight ${
                isDark ? 'text-neutral-100' : 'text-neutral-900'
              }`}
            >
              {t.title}
            </h2>

            <p
              className={`text-xs sm:text-sm font-serif leading-relaxed ${
                isDark ? 'text-neutral-300' : 'text-neutral-600'
              }`}
            >
              {t.subtitle}
            </p>
          </div>

          {/* Shelf Controls: Quick Jump Number Buttons + Prev/Next Arrows */}
          {visibleStories.length > 1 && (
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <div className="flex items-center gap-1 mr-1">
                {visibleStories.map((st, idx) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => scrollToStoryIndex(idx)}
                    aria-label={`Jump to video ${idx + 1}`}
                    className={`w-7 h-7 rounded-lg text-[11px] font-mono font-bold tabular-nums border transition-colors cursor-pointer ${
                      isDark
                        ? 'border-neutral-700 bg-neutral-900/70 hover:bg-neutral-800 text-neutral-300'
                        : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-700'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                aria-label="Scroll video stories left"
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer border active:scale-95 touch-manipulation ${
                  canScrollLeft
                    ? isDark
                      ? 'bg-amber-950/60 hover:bg-amber-900/80 border-amber-500/40 text-amber-300 shadow-xs'
                      : 'bg-white hover:bg-amber-50 border-neutral-300 text-neutral-800 shadow-xs'
                    : 'opacity-30 cursor-not-allowed border-neutral-700 text-neutral-500'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                aria-label="Scroll video stories right"
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer border active:scale-95 touch-manipulation ${
                  canScrollRight
                    ? isDark
                      ? 'bg-amber-950/60 hover:bg-amber-900/80 border-amber-500/40 text-amber-300 shadow-xs'
                      : 'bg-white hover:bg-amber-50 border-neutral-300 text-neutral-800 shadow-xs'
                    : 'opacity-30 cursor-not-allowed border-neutral-700 text-neutral-500'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Horizontal Scrolling Video Stories Shelf — Smaller Thumbnail Left + Synopsis Right */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="flex gap-5 overflow-x-auto scroll-smooth pb-4 px-1 no-scrollbar snap-x snap-mandatory items-stretch touch-pan-x touch-momentum"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {visibleStories.map((story, idx) => {
          const localizedTitle =
            lang === 'fi' ? story.titleFi : lang === 'en' ? story.titleEn : story.titleJa;
          const localizedAuthor =
            lang === 'fi' ? story.authorFi : lang === 'en' ? story.authorEn : story.authorJa;
          const localizedBadge =
            lang === 'fi' ? story.badgeFi : lang === 'en' ? story.badgeEn : story.badgeJa;
          const localizedSynopsis =
            lang === 'fi' ? story.synopsisFi : lang === 'en' ? story.synopsisEn : story.synopsisJa;
          const localizedMoral =
            lang === 'fi' ? story.coreMoralFi : lang === 'en' ? story.coreMoralEn : story.coreMoralJa;
          const localizedScreenshotCaption =
            lang === 'fi'
              ? story.screenshotCaptionFi
              : lang === 'en'
              ? story.screenshotCaptionEn
              : story.screenshotCaptionJa;

          const isPlaying = activePlayId === story.id;
          const youtubeEmbedUrl = `https://www.youtube-nocookie.com/embed/${story.youtubeId}?autoplay=1&rel=0`;

          return (
            <article
              key={story.id}
              className={`w-[88vw] sm:w-[590px] md:w-[660px] shrink-0 snap-start rounded-2xl border p-4 sm:p-5 transition-all duration-300 shadow-xs ${
                isDark
                  ? 'bg-[#181524] border-neutral-800 hover:border-amber-500/50'
                  : 'bg-white border-neutral-200/90 hover:border-amber-300'
              }`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-[225px_minmax(0,1fr)] gap-4 sm:gap-5 items-start h-full">
                {/* LEFT COLUMN: Smaller Video Thumbnail / Player + Optional Scene Screenshot */}
                <div className="space-y-3">
                  {/* Compact Video Frame */}
                  <div className="relative aspect-video w-full rounded-xl bg-black overflow-hidden border border-neutral-300/60 dark:border-neutral-800">
                    {isPlaying ? (
                      <iframe
                        src={youtubeEmbedUrl}
                        title={localizedTitle}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => setActivePlayId(story.id)}
                        className="relative w-full h-full group/video cursor-pointer block text-left"
                        aria-label={`${t.playVideo}: ${localizedTitle}`}
                      >
                        <img
                          src={`https://img.youtube.com/vi/${story.youtubeId}/hqdefault.jpg`}
                          alt={localizedTitle}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/video:scale-105 opacity-90"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="w-10 h-10 rounded-full bg-rose-600/95 group-hover/video:bg-rose-500 text-white flex items-center justify-center shadow-md transition-transform group-hover/video:scale-110">
                            <Play className="w-4 h-4 fill-white ml-0.5" />
                          </span>
                        </div>
                        <span className="absolute bottom-1.5 right-2 text-[10px] font-mono text-white/95 bg-black/70 px-1.5 py-0.5 rounded-sm">
                          {t.playVideo}
                        </span>
                      </button>
                    )}
                  </div>

                  {/* Attached Screenshot Photo (if provided) */}
                  {story.screenshotImage && (
                    <div
                      className={`rounded-xl overflow-hidden border ${
                        isDark
                          ? 'border-neutral-800 bg-[#12101c]'
                          : 'border-neutral-200 bg-neutral-50'
                      }`}
                    >
                      <img
                        src={story.screenshotImage}
                        alt={localizedScreenshotCaption || localizedTitle}
                        className="w-full h-auto object-cover"
                        loading="lazy"
                      />
                      {localizedScreenshotCaption && (
                        <div
                          className={`px-2.5 py-1.5 text-[10px] font-serif italic border-t leading-snug ${
                            isDark
                              ? 'border-neutral-800 text-neutral-300'
                              : 'border-neutral-200/80 text-neutral-600'
                          }`}
                        >
                          {localizedScreenshotCaption}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Quick External Link in Left Column */}
                  <a
                    href={story.youtubeUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={`inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold transition-colors ${
                      isDark ? 'text-rose-300 hover:text-rose-200' : 'text-rose-700 hover:text-rose-900'
                    }`}
                  >
                    <span>{t.watchOnYoutube}</span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                </div>

                {/* RIGHT COLUMN: Title, Metadata, Synopsis & Core Takeaway */}
                <div className="flex flex-col justify-between space-y-3 h-full">
                  <div className="space-y-2">
                    <div
                      className={`flex flex-wrap items-center gap-2 text-[11px] font-mono ${
                        isDark ? 'text-neutral-400' : 'text-neutral-500'
                      }`}
                    >
                      <span className="font-bold tabular-nums text-rose-600 dark:text-rose-400">
                        0{idx + 1}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{localizedBadge}</span>
                      <span aria-hidden="true">·</span>
                      <span>{localizedAuthor}</span>
                    </div>

                    <h3
                      className={`font-serif text-base sm:text-lg font-bold leading-snug ${
                        isDark ? 'text-neutral-100' : 'text-neutral-900'
                      }`}
                    >
                      {localizedTitle}
                    </h3>
                  </div>

                  {/* Synopsis */}
                  <div
                    className={`p-3.5 rounded-xl border text-xs leading-relaxed font-serif space-y-1 flex-1 ${
                      isDark
                        ? 'bg-[#12101c] border-neutral-800/90 text-neutral-300'
                        : 'bg-amber-50/50 border-amber-200/70 text-neutral-700'
                    }`}
                  >
                    <span
                      className={`text-[10px] font-mono font-bold uppercase tracking-wider block ${
                        isDark ? 'text-amber-400' : 'text-amber-800'
                      }`}
                    >
                      {t.synopsisHeader}
                    </span>
                    <p>{localizedSynopsis}</p>
                  </div>

                  {/* Core Takeaway */}
                  <div
                    className={`p-2.5 rounded-xl border text-xs flex items-start gap-2 ${
                      isDark
                        ? 'bg-amber-950/20 border-amber-900/40 text-amber-200/90'
                        : 'bg-amber-100/40 border-amber-200 text-amber-900'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <span className="font-mono text-[10px] uppercase font-bold block">
                        {t.moralHeader}
                      </span>
                      <p className="font-serif italic font-medium">{localizedMoral}</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
