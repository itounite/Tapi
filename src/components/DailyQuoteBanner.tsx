import React, { useState, useEffect, useMemo } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Sparkles, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  BookOpen,
  Calendar
} from 'lucide-react';
import { Language, ThemeMode } from '../types';
import { DAILY_QUOTES, DailyQuoteItem } from '../data/dailyQuotes';

interface DailyQuoteBannerProps {
  lang: Language;
  theme: ThemeMode;
}

export default function DailyQuoteBanner({ lang, theme }: DailyQuoteBannerProps) {
  // Determine current day of month (1 - 31)
  const todayDay = useMemo(() => {
    const day = new Date().getDate();
    return Math.min(Math.max(day, 1), 31);
  }, []);

  const [activeDay, setActiveDay] = useState<number>(todayDay);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // Read status stored in localStorage
  const [readDays, setReadDays] = useState<Record<number, boolean>>(() => {
    if (typeof window === 'undefined') return {};
    try {
      const stored = localStorage.getItem('tapi_quote_read_days');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  // Current quote object
  const currentItem: DailyQuoteItem = useMemo(() => {
    const found = DAILY_QUOTES.find(q => q.day === activeDay);
    return found || DAILY_QUOTES[0];
  }, [activeDay]);

  const isToday = activeDay === todayDay;
  const isRead = !!readDays[activeDay];

  const handleMarkAsRead = () => {
    const nextReadDays = { ...readDays, [activeDay]: true };
    setReadDays(nextReadDays);

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('tapi_quote_read_days', JSON.stringify(nextReadDays));
      } catch {}
    }
  };

  // Text to speech narration - hardened for iOS Safari, Android Chrome, Mac Safari, and Firefox
  const handleToggleSpeak = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isPlayingAudio) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
      setIsPlayingAudio(false);
      return;
    }

    try {
      window.speechSynthesis.cancel();
      // iOS Safari and Chrome workaround: resume before speaking
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    } catch {}

    const quoteText = lang === 'fi' 
      ? `${currentItem.teacher.fi}. ${currentItem.quote.fi}. Pohdi: ${currentItem.thinkPrompt.fi}`
      : lang === 'en'
      ? `${currentItem.teacher.en}. ${currentItem.quote.en}. Think: ${currentItem.thinkPrompt.en}`
      : `${currentItem.teacher.ja}のことば。「${currentItem.quote.ja}」。考えてみよう：${currentItem.thinkPrompt.ja}`;

    const utterance = new SpeechSynthesisUtterance(quoteText);
    const targetLangCode = lang === 'fi' ? 'fi-FI' : lang === 'en' ? 'en-US' : 'ja-JP';
    utterance.lang = targetLangCode;
    utterance.rate = 0.95; // Gentle pace for kids

    // Attempt to pick a matching language voice if voices are loaded
    try {
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        const langPrefix = lang === 'fi' ? 'fi' : lang === 'en' ? 'en' : 'ja';
        const matched = voices.find(v => v.lang.toLowerCase().startsWith(langPrefix));
        if (matched) {
          utterance.voice = matched;
        }
      }
    } catch {}

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    setIsPlayingAudio(true);
    try {
      window.speechSynthesis.speak(utterance);
    } catch {
      setIsPlayingAudio(false);
    }
  };

  // Stop speech when component unmounts or activeDay changes
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
        } catch {}
      }
    };
  }, [activeDay]);

  const handlePrevDay = () => {
    setActiveDay(prev => (prev > 1 ? prev - 1 : 31));
  };

  const handleNextDay = () => {
    setActiveDay(prev => (prev < 31 ? prev + 1 : 1));
  };

  const handleJumpToToday = () => {
    setActiveDay(todayDay);
  };

  const isDark = theme === 'dark';

  // Localized UI strings
  const labels = {
    dayLabel: {
      ja: `${activeDay}日目（全31日）`,
      en: `Day ${activeDay} of 31`,
      fi: `Päivä ${activeDay} / 31`
    },
    todayBadge: {
      ja: '今日',
      en: 'Today',
      fi: 'Tänään'
    },
    thinkHeader: {
      ja: '💭 考えてみよう:',
      en: '💭 Think:',
      fi: '💭 Pohdi:'
    },
    markReadBtn: {
      ja: '読んだよ！ ✨',
      en: 'I read this! ✨',
      fi: 'Luin tämän! ✨'
    },
    completedBadge: {
      ja: '読了！すばらしい ★',
      en: 'Read Today! Great job ★',
      fi: 'Luettu! Hienoa työtä ★'
    },
    listenBtn: {
      ja: '音声で聴く',
      en: 'Listen',
      fi: 'Kuuntele'
    },
    stopAudioBtn: {
      ja: '停止',
      en: 'Stop',
      fi: 'Pysäytä'
    }
  };

  const curTeacher = lang === 'fi' 
    ? currentItem.teacher.fi 
    : lang === 'en' 
    ? currentItem.teacher.en 
    : currentItem.teacher.ja;

  const curQuote = lang === 'fi' 
    ? currentItem.quote.fi 
    : lang === 'en' 
    ? currentItem.quote.en 
    : currentItem.quote.ja;

  const curThink = lang === 'fi' 
    ? currentItem.thinkPrompt.fi 
    : lang === 'en' 
    ? currentItem.thinkPrompt.en 
    : currentItem.thinkPrompt.ja;

  const curWeekTitle = lang === 'fi'
    ? currentItem.weekTitle.fi
    : lang === 'en'
    ? currentItem.weekTitle.en
    : currentItem.weekTitle.ja;

  return (
    <section 
      aria-label="Daily Inspirational Quote & Teacher"
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-2 transition-colors duration-300"
    >
      <div 
        className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
          isDark 
            ? 'bg-gradient-to-br from-[#161324] via-[#1a162b] to-[#141121] border-neutral-800 text-neutral-100 shadow-[0_8px_30px_rgba(0,0,0,0.5)]' 
            : 'bg-gradient-to-br from-amber-50/90 via-[#fffdfa] to-orange-50/60 border-amber-200/90 text-neutral-900 shadow-sm'
        }`}
      >
        {/* Top Header Row: Prominent Week Chapter Heading + Day Navigation Controls */}
        <div className={`px-4 sm:px-6 py-3 border-b flex flex-col md:flex-row md:items-center justify-between gap-3 ${
          isDark ? 'border-neutral-800/80 bg-neutral-900/40' : 'border-amber-200/70 bg-amber-100/35'
        }`}>
          
          {/* PROMINENT, HIGHLY VISIBLE WEEK HEADING */}
          <div className="flex items-center gap-2.5 min-w-0">
            <span className={`inline-flex items-center justify-center w-6 h-6 rounded-md shrink-0 text-xs ${
              isDark ? 'bg-amber-500/20 text-amber-300' : 'bg-amber-200/80 text-amber-900'
            }`}>
              ✦
            </span>
            <h2 className={`font-serif text-sm sm:text-base md:text-lg font-bold tracking-tight truncate ${
              isDark ? 'text-amber-300' : 'text-amber-950'
            }`}>
              {curWeekTitle}
            </h2>
          </div>

          {/* Right Controls: Day Navigation, Today badge, Audio listen, Collapse toggle */}
          <div className="flex items-center gap-2 sm:gap-2.5 self-end md:self-auto shrink-0 flex-wrap">
            
            {/* Day indicator badge */}
            <span className={`inline-flex items-center gap-1.5 font-mono text-xs font-semibold px-2.5 py-1 rounded-lg border ${
              isDark ? 'bg-neutral-800/90 text-neutral-200 border-neutral-700' : 'bg-white text-neutral-800 border-neutral-300 shadow-2xs'
            }`}>
              <BookOpen className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>{labels.dayLabel[lang]}</span>
            </span>

            {/* Today status or Return to Today button */}
            {isToday ? (
              <span className={`text-[11px] font-mono px-2 py-1 rounded-lg font-bold border ${
                isDark ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800' : 'bg-emerald-100 text-emerald-800 border-emerald-300'
              }`}>
                {labels.todayBadge[lang]}
              </span>
            ) : (
              <button
                type="button"
                onClick={handleJumpToToday}
                className={`text-[11px] font-mono px-2 py-1 rounded-lg font-semibold border cursor-pointer transition active:scale-95 touch-manipulation ${
                  isDark ? 'bg-amber-950/50 text-amber-300 border-amber-800 hover:bg-amber-900/60' : 'bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200'
                }`}
                title="Back to today's date"
              >
                {labels.todayBadge[lang]} ↩
              </button>
            )}

            {/* Prev / Next Day Switcher */}
            <div className="inline-flex items-center border rounded-lg overflow-hidden divide-x dark:border-neutral-700 dark:divide-neutral-700 border-neutral-300 divide-neutral-200 shrink-0 bg-white dark:bg-neutral-900 shadow-2xs">
              <button 
                type="button"
                onClick={handlePrevDay}
                aria-label="Previous day quote"
                className={`p-1.5 sm:p-1.5 min-w-[32px] min-h-[32px] flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all cursor-pointer active:scale-95 touch-manipulation ${
                  isDark ? 'text-neutral-300' : 'text-neutral-700'
                }`}
                title="Previous Day"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                type="button"
                onClick={handleNextDay}
                aria-label="Next day quote"
                className={`p-1.5 sm:p-1.5 min-w-[32px] min-h-[32px] flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all cursor-pointer active:scale-95 touch-manipulation ${
                  isDark ? 'text-neutral-300' : 'text-neutral-700'
                }`}
                title="Next Day"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Read-Aloud Audio */}
            <button
              type="button"
              onClick={handleToggleSpeak}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer active:scale-95 touch-manipulation min-h-[32px] border ${
                isPlayingAudio
                  ? 'bg-amber-600 text-white border-amber-600 animate-pulse'
                  : isDark
                  ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-neutral-700'
                  : 'bg-white hover:bg-amber-50 text-neutral-800 border-neutral-300 shadow-2xs'
              }`}
              title="Read aloud for kids"
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-white" />
                  <span>{labels.stopAudioBtn[lang]}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span className="hidden sm:inline">{labels.listenBtn[lang]}</span>
                </>
              )}
            </button>

            {/* Expand / Minimize Toggle */}
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className={`p-1.5 rounded-lg transition-all cursor-pointer active:scale-95 touch-manipulation min-w-[32px] min-h-[32px] flex items-center justify-center border ${
                isDark 
                  ? 'border-neutral-700 text-neutral-400 hover:text-white hover:bg-neutral-800' 
                  : 'border-neutral-300 bg-white text-neutral-500 hover:text-neutral-900 hover:bg-amber-50 shadow-2xs'
              }`}
              aria-label={isExpanded ? 'Collapse quote banner' : 'Expand quote banner'}
              title={isExpanded ? 'Collapse' : 'Expand'}
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Box Body Area */}
        <div className="p-4 sm:p-6 space-y-3">
          
          {/* Teacher Attribution Kicker */}
          <div className="flex items-center gap-2">
            <span className={`text-xs sm:text-sm font-mono uppercase tracking-wider font-bold ${
              isDark ? 'text-amber-400' : 'text-amber-800'
            }`}>
              {lang === 'ja' 
                ? `今日の先生：${curTeacher}` 
                : lang === 'fi' 
                ? `Päivän opettaja: ${curTeacher}` 
                : `Today's Teacher: ${curTeacher}`}
            </span>
          </div>

          {/* PROMINENT, BOLD QUOTE */}
          <blockquote className="my-1.5">
            <p className={`text-lg sm:text-xl md:text-2xl font-bold font-serif leading-snug tracking-tight break-words text-balance ${
              isDark 
                ? 'text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]' 
                : 'text-neutral-950 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]'
            }`}>
              “{curQuote}”
            </p>
          </blockquote>

          {/* Expanded Content: Think Prompt & Interactive Check-in */}
          {isExpanded && (
            <div className="pt-2">
              <div className={`p-3.5 sm:p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 ${
                isDark 
                  ? 'bg-[#100d1b] border-neutral-750/70 text-neutral-200' 
                  : 'bg-white/95 border-amber-200/90 text-neutral-800 shadow-xs'
              }`}>
                <div className="space-y-1.5 flex-1">
                  <span className={`text-xs font-bold block ${
                    isDark ? 'text-amber-400' : 'text-amber-800'
                  }`}>
                    {labels.thinkHeader[lang]}
                  </span>
                  <p className="text-xs sm:text-sm font-medium leading-relaxed italic break-words">
                    {curThink}
                  </p>
                </div>

                {/* Interactive Button: Mark as Read */}
                <div className="flex items-center gap-2 shrink-0 pt-1 sm:pt-0 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleMarkAsRead}
                    className={`w-full sm:w-auto px-4 py-2 sm:py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2 min-h-[42px] sm:min-h-[38px] active:scale-95 touch-manipulation ${
                      isRead
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : isDark
                        ? 'bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-md'
                        : 'bg-amber-600 hover:bg-amber-700 text-white shadow-sm'
                    }`}
                  >
                    {isRead ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{labels.completedBadge[lang]}</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>{labels.markReadBtn[lang]}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
