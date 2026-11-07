import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, ExternalLink, Film, Sparkles, BookOpen } from 'lucide-react';
import { Language, ThemeMode } from '../types';
import { VIDEO_STORIES, VideoStoryItem } from '../data/videoStories';

interface VideoStorySectionProps {
  lang: Language;
  theme?: ThemeMode;
}

export default function VideoStorySection({ lang, theme = 'light' }: VideoStorySectionProps) {
  const isDark = theme === 'dark';
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Track which videos have been activated by user click to optimize initial page performance
  const [activePlayId, setActivePlayId] = useState<string | null>(null);

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
    const scrollAmount = Math.max(container.clientWidth * 0.75, 320);
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  // Trilingual labels
  const t = {
    badge: lang === 'fi' 
      ? 'INSPIRAATIOTA VIDEOINA · TARINAT' 
      : lang === 'en' 
      ? 'VIDEO STORIES & PARABLES' 
      : '心に響く映像物語・寓話',
    title: lang === 'fi'
      ? 'Ajattomia tarinoita & viisautta videona'
      : lang === 'en'
      ? 'Inspiring Video Stories & Timeless Parables'
      : '人生を照らす、映像と教えの物語',
    subtitle: lang === 'fi'
      ? 'Katso lyhyet videot ja lue tarinoiden syvällinen sanoma takertumattomuudesta, rohkeudesta ja puhtaasta hyvyydestä.'
      : lang === 'en'
      ? 'Watch these moving video stories and explore their timeless synopses on non-attachment, inner peace, and shining with pure kindness.'
      : '非執着、すべてを受け入れる覚悟、そして周りに迎合せず自分だけの純粋な優しさで輝くこと。珠玉の教えとあらすじを映像とともに。',
    watchOnYoutube: lang === 'fi' ? 'Katso YouTubessa' : lang === 'en' ? 'Watch on YouTube' : 'YouTubeで開く',
    moralHeader: lang === 'fi' ? 'Ydinsanoma' : lang === 'en' ? 'Core Moral' : '心に刻むメッセージ',
    synopsisHeader: lang === 'fi' ? 'Lyhyt tiivistelmä' : lang === 'en' ? 'Synopsis' : 'あらすじ・解説',
    scrollHint: lang === 'fi' ? 'Selaa tarinoita nuolilla' : lang === 'en' ? 'Scroll with arrows or swipe' : '矢印やスワイプで横スクロール',
    playVideo: lang === 'fi' ? 'Toista video' : lang === 'en' ? 'Play Video' : '動画を再生'
  };

  return (
    <section className="space-y-6 max-w-5xl mx-auto pt-8">
      {/* Header with Title and Scroll Controls */}
      <div className={`p-6 sm:p-8 rounded-3xl border transition-all ${
        isDark 
          ? 'bg-[#151221] border-neutral-800 shadow-[0_8px_30px_rgba(0,0,0,0.4)]' 
          : 'bg-white border-neutral-200/90 shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
          <div className="space-y-2">
            <div 
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-mono tracking-widest uppercase transition-colors"
              style={{
                borderColor: isDark ? 'rgba(244, 63, 94, 0.4)' : 'rgba(225, 29, 72, 0.3)',
                backgroundColor: isDark ? 'rgba(244, 63, 94, 0.1)' : 'rgba(255, 228, 230, 0.6)',
                color: isDark ? '#FDA4AF' : '#BE123C'
              }}
            >
              <Film className="w-3.5 h-3.5" />
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

          {/* Scroll Navigation Arrows */}
          <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
            <span className="text-[11px] font-mono text-neutral-400 hidden sm:inline-block mr-2">
              {t.scrollHint}
            </span>
            <button
              type="button"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll video stories left"
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer border active:scale-95 touch-manipulation ${
                canScrollLeft
                  ? isDark 
                    ? 'bg-amber-950/60 hover:bg-amber-900/80 border-amber-500/40 text-amber-300 shadow-sm' 
                    : 'bg-white hover:bg-amber-50 border-neutral-300 text-neutral-800 shadow-sm'
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
                    ? 'bg-amber-950/60 hover:bg-amber-900/80 border-amber-500/40 text-amber-300 shadow-sm' 
                    : 'bg-white hover:bg-amber-50 border-neutral-300 text-neutral-800 shadow-sm'
                  : 'opacity-30 cursor-not-allowed border-neutral-700 text-neutral-500'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scrolling Video Stories Container */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="flex gap-5 sm:gap-6 overflow-x-auto scroll-smooth pb-4 px-1 no-scrollbar snap-x snap-mandatory touch-pan-x touch-momentum items-stretch"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {VIDEO_STORIES.map((story) => {
          const localizedTitle = lang === 'fi' ? story.titleFi : lang === 'en' ? story.titleEn : story.titleJa;
          const localizedAuthor = lang === 'fi' ? story.authorFi : lang === 'en' ? story.authorEn : story.authorJa;
          const localizedBadge = lang === 'fi' ? story.badgeFi : lang === 'en' ? story.badgeEn : story.badgeJa;
          const localizedSynopsis = lang === 'fi' ? story.synopsisFi : lang === 'en' ? story.synopsisEn : story.synopsisJa;
          const localizedMoral = lang === 'fi' ? story.coreMoralFi : lang === 'en' ? story.coreMoralEn : story.coreMoralJa;

          const isPlaying = activePlayId === story.id;
          const youtubeEmbedUrl = `https://www.youtube-nocookie.com/embed/${story.youtubeId}?autoplay=1&rel=0`;

          return (
            <div
              key={story.id}
              className={`w-[310px] sm:w-[380px] md:w-[440px] shrink-0 snap-start rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm ${
                isDark 
                  ? 'bg-[#181524] border-neutral-800 hover:border-amber-500/50 hover:shadow-xl' 
                  : 'bg-white border-neutral-200/90 hover:border-amber-300 hover:shadow-lg'
              }`}
            >
              {/* Video Player Frame */}
              <div className="relative aspect-video w-full bg-black overflow-hidden border-b border-neutral-800">
                {isPlaying ? (
                  <iframe
                    src={youtubeEmbedUrl}
                    title={localizedTitle}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="relative w-full h-full group/video cursor-pointer" onClick={() => setActivePlayId(story.id)}>
                    {/* YouTube High-Res Thumbnail */}
                    <img
                      src={`https://img.youtube.com/vi/${story.youtubeId}/hqdefault.jpg`}
                      alt={localizedTitle}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/video:scale-105 opacity-90"
                      loading="lazy"
                    />

                    {/* Gradient Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

                    {/* Centered Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-rose-600/90 group-hover/video:bg-rose-500 text-white flex items-center justify-center shadow-lg transition-transform duration-300 group-hover/video:scale-110">
                        <Play className="w-6 h-6 fill-white ml-0.5" />
                      </div>
                    </div>

                    {/* Video Duration / Type Badge */}
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white/90">
                      <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-xs font-semibold">
                        {story.isShort ? 'YouTube Shorts' : 'YouTube Video'}
                      </span>
                      <span className="flex items-center gap-1 hover:text-amber-300">
                        <span>{t.playVideo}</span>
                        <Play className="w-3 h-3 fill-current" />
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Story Content & Synopsis */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                
                {/* Title & Author Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-sm bg-rose-500/15 text-rose-400 border border-rose-500/25">
                      {localizedBadge}
                    </span>
                  </div>

                  <h3 className={`font-serif text-base sm:text-lg font-bold leading-tight ${
                    isDark ? 'text-neutral-100' : 'text-neutral-900'
                  }`}>
                    {localizedTitle}
                  </h3>

                  <p className="font-mono text-xs text-neutral-400">
                    {localizedAuthor}
                  </p>
                </div>

                {/* Synopsis Paragraph */}
                <div className={`p-3.5 rounded-xl border text-xs leading-relaxed font-serif space-y-1.5 ${
                  isDark 
                    ? 'bg-[#12101c] border-neutral-800/90 text-neutral-300' 
                    : 'bg-amber-50/60 border-amber-200/70 text-neutral-700'
                }`}>
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider block ${
                    isDark ? 'text-amber-400' : 'text-amber-800'
                  }`}>
                    {t.synopsisHeader}
                  </span>
                  <p>{localizedSynopsis}</p>
                </div>

                {/* Core Moral Highlight */}
                <div className={`p-2.5 rounded-lg border text-xs flex items-start gap-2 ${
                  isDark ? 'bg-amber-950/20 border-amber-900/40 text-amber-200/90' : 'bg-amber-100/40 border-amber-200 text-amber-900'
                }`}>
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-[10px] uppercase font-bold block">
                      {t.moralHeader}
                    </span>
                    <p className="font-serif italic font-medium">
                      {localizedMoral}
                    </p>
                  </div>
                </div>

                {/* Action Link to open directly on YouTube */}
                <div className="pt-2 border-t border-neutral-200/60 dark:border-neutral-800 flex items-center justify-between">
                  <a
                    href={story.youtubeUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-rose-500 hover:text-rose-400 transition-colors"
                  >
                    <span>{t.watchOnYoutube}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  {!isPlaying && (
                    <button
                      type="button"
                      onClick={() => setActivePlayId(story.id)}
                      className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-rose-600 hover:bg-rose-500 text-white transition-all shadow-xs cursor-pointer active:scale-95 touch-manipulation"
                    >
                      {t.playVideo}
                    </button>
                  )}
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
