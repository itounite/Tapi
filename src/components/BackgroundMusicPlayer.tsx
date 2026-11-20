import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Music, Pause, Play, ExternalLink } from 'lucide-react';
import { Language, ThemeMode } from '../types';

declare global {
  interface Window {
    YT?: {
      Player: new (
        element: HTMLElement | string,
        options: {
          height?: string;
          width?: string;
          videoId: string;
          playerVars?: Record<string, string | number>;
          events?: {
            onReady?: (event: { target: YTPlayerInstance }) => void;
            onStateChange?: (event: { data: number; target: YTPlayerInstance }) => void;
            onError?: (event: { data: number }) => void;
          };
        }
      ) => YTPlayerInstance;
      PlayerState?: {
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YTPlayerInstance {
  playVideo: () => void;
  pauseVideo: () => void;
  setVolume: (volume: number) => void;
  destroy: () => void;
  getPlayerState?: () => number;
}

interface BackgroundMusicPlayerProps {
  lang: Language;
  theme: ThemeMode;
}

const SPITZ_CHERRY_VIDEO_ID = 'Eze6-eHmtJg';
const SPITZ_CHERRY_URL = `https://www.youtube.com/watch?v=${SPITZ_CHERRY_VIDEO_ID}`;

export default function BackgroundMusicPlayer({ lang, theme }: BackgroundMusicPlayerProps) {
  const isDark = theme === 'dark';
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayerInstance | null>(null);
  const userPausedRef = useRef<boolean>(false);

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [embedBlocked, setEmbedBlocked] = useState(false);

  const tryPlay = useCallback(() => {
    if (userPausedRef.current || !playerRef.current) return;
    try {
      playerRef.current.setVolume(45);
      playerRef.current.playVideo();
    } catch {}
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    let isCancelled = false;

    const initPlayer = () => {
      if (isCancelled || !containerRef.current || !window.YT?.Player || playerRef.current) {
        return;
      }

      playerRef.current = new window.YT.Player(containerRef.current, {
        height: '1',
        width: '1',
        videoId: SPITZ_CHERRY_VIDEO_ID,
        playerVars: {
          autoplay: 1,
          loop: 1,
          playlist: SPITZ_CHERRY_VIDEO_ID,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          origin: window.location.origin,
        },
        events: {
          onReady: (event) => {
            if (isCancelled) return;
            setIsReady(true);
            try {
              event.target.setVolume(45);
              if (!userPausedRef.current) {
                event.target.playVideo();
              }
            } catch {}
          },
          onStateChange: (event) => {
            if (isCancelled) return;
            // YT.PlayerState: 1 = PLAYING, 2 = PAUSED, 0 = ENDED
            if (event.data === 1) {
              setIsPlaying(true);
            } else if (event.data === 2) {
              setIsPlaying(false);
            } else if (event.data === 0) {
              if (!userPausedRef.current) {
                try {
                  event.target.playVideo();
                } catch {}
              }
            }
          },
          onError: () => {
            if (isCancelled) return;
            setEmbedBlocked(true);
            setIsPlaying(false);
          },
        },
      });
    };

    if (window.YT?.Player) {
      initPlayer();
    } else {
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback();
        initPlayer();
      };

      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        script.async = true;
        document.head.appendChild(script);
      }
    }

    return () => {
      isCancelled = true;
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {}
        playerRef.current = null;
      }
    };
  }, []);

  // Unlock background music on the visitor's first interaction if browser blocked unmuted autoplay
  useEffect(() => {
    if (isPlaying || embedBlocked || userPausedRef.current) return;

    const handleFirstGesture = () => {
      tryPlay();
    };

    window.addEventListener('pointerdown', handleFirstGesture, { passive: true, once: true });
    window.addEventListener('keydown', handleFirstGesture, { passive: true, once: true });

    return () => {
      window.removeEventListener('pointerdown', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };
  }, [isReady, isPlaying, embedBlocked, tryPlay]);

  const handleTogglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      userPausedRef.current = true;
      try {
        playerRef.current.pauseVideo();
      } catch {}
      setIsPlaying(false);
    } else {
      userPausedRef.current = false;
      tryPlay();
    }
  };

  const trackLabel =
    lang === 'ja' ? 'チェリー · スピッツ' : 'Cherry · Spitz';

  const statusText = isPlaying
    ? lang === 'ja'
      ? '再生中'
      : lang === 'fi'
      ? 'Soi'
      : 'Playing'
    : lang === 'ja'
    ? '再生'
    : lang === 'fi'
    ? 'Soita'
    : 'Play';

  return (
    <>
      {/* Hidden YouTube audio container */}
      <div
        className="fixed -left-[9999px] -top-[9999px] w-px h-px opacity-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div ref={containerRef} />
      </div>

      {/* Compact interactive music pill inside the left birthday badge */}
      {embedBlocked ? (
        <a
          href={SPITZ_CHERRY_URL}
          target="_blank"
          rel="noreferrer noopener"
          className={`pointer-events-auto mt-1.5 w-full inline-flex items-center justify-between gap-1.5 px-2 py-1 rounded-lg border text-[9.5px] sm:text-[10px] font-mono font-semibold transition-colors ${
            isDark
              ? 'bg-pink-500/15 border-pink-400/35 text-pink-200 hover:bg-pink-500/25'
              : 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100'
          }`}
          title="Cherry - Spitz (YouTube)"
        >
          <span className="inline-flex items-center gap-1 truncate">
            <Music className="w-2.5 h-2.5 shrink-0" />
            <span className="truncate">{trackLabel}</span>
          </span>
          <ExternalLink className="w-2.5 h-2.5 shrink-0" />
        </a>
      ) : (
        <button
          type="button"
          onClick={handleTogglePlay}
          className={`pointer-events-auto mt-1.5 w-full inline-flex items-center justify-between gap-1.5 px-2 py-1 rounded-lg border text-[9.5px] sm:text-[10px] font-mono font-semibold transition-colors cursor-pointer active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 ${
            isPlaying
              ? isDark
                ? 'bg-pink-500/25 border-pink-400/50 text-pink-100 hover:bg-pink-500/35'
                : 'bg-rose-600 border-rose-600 text-white hover:bg-rose-700'
              : isDark
              ? 'bg-neutral-800/80 border-pink-400/30 text-pink-200 hover:bg-neutral-800'
              : 'bg-rose-50 border-rose-200 text-rose-800 hover:bg-rose-100'
          }`}
          aria-label={isPlaying ? `Pause ${trackLabel}` : `Play ${trackLabel}`}
          title={trackLabel}
        >
          <span className="inline-flex items-center gap-1 truncate">
            <Music className="w-2.5 h-2.5 shrink-0" />
            <span className="truncate">{trackLabel}</span>
          </span>
          <span className="inline-flex items-center gap-0.5 shrink-0">
            {isPlaying ? (
              <Pause className="w-2.5 h-2.5" />
            ) : (
              <Play className="w-2.5 h-2.5 fill-current" />
            )}
            <span>{statusText}</span>
          </span>
        </button>
      )}
    </>
  );
}
