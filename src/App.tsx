import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Instagram, 
  MessageSquare, 
  BookOpen, 
  ChevronRight, 
  X,
  ArrowUpRight,
  User
} from 'lucide-react';

import { Language, CharacterItem, ThemeMode } from './types';
import { CHARACTERS } from './data';

// Shared Components
import Header from './components/Header';
import Footer from './components/Footer';
import EssaysPage from './components/EssaysPage';
import AboutPage from './components/AboutPage';
import HalloweenAtmosphere from './components/HalloweenAtmosphere';
import KatanaPumpkinIntro from './components/KatanaPumpkinIntro';
import { trackPageView } from './utils/visitTracker';

// Import path of hero artwork asset
import heroBanner from "./assets/images/tapioka_find_king_artwork.svg";

export default function App() {
  // Default language is Japanese ('ja') for Tapi Life core identity
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      try {
        // 1. Check explicit URL query param (?lang=ja|en|fi)
        const params = new URLSearchParams(window.location.search);
        const urlLang = params.get('lang');
        if (urlLang === 'ja' || urlLang === 'en' || urlLang === 'fi') {
          return urlLang;
        }
      } catch {}

      // 2. Check if user explicitly chose a language during this active session
      const sessionChoice = sessionStorage.getItem('tapi_user_chosen_lang');
      if (sessionChoice === 'en' || sessionChoice === 'fi' || sessionChoice === 'ja') {
        return sessionChoice;
      }

      // Clear any stale cached language that was defaulting to English
      try {
        localStorage.removeItem('tapi_lang');
      } catch {}
    }
    // Default strictly to Japanese
    return 'ja';
  });

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('tapi_user_chosen_lang', newLang);
      localStorage.setItem('tapi_lang', newLang);
    }
  };

  // Default theme is 'dark' with orange pumpkin as requested!
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tapi_theme');
      if (saved === 'dark' || saved === 'light') return saved;
    }
    return 'dark'; // Dark mode default
  });

  // Opening Katana Pumpkin Slash Intro Gatekeeper
  const [showSlashIntro, setShowSlashIntro] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const alreadySlashed = sessionStorage.getItem('tapi_slashed_pumpkin');
      return !alreadySlashed;
    }
    return true;
  });

  const handleCompleteSlash = () => {
    setShowSlashIntro(false);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('tapi_slashed_pumpkin', 'true');
    }
  };

  const handleReplaySlash = () => {
    setShowSlashIntro(true);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const [selectedCharacter, setSelectedCharacter] = useState<CharacterItem | null>(null);

  // Sync html lang attribute and persist to localStorage
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  // Sync theme attribute on document.body and persist to localStorage
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.classList.remove('theme-dark', 'theme-light');
      document.body.classList.add(`theme-${theme}`);
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('tapi_theme', theme);
    }
  }, [theme]);
  
  // Custom SPA Path Routing State with hash/param support
  const resolveCurrentPath = useCallback((): string => {
    if (typeof window === 'undefined') return '/';
    const path = window.location.pathname;
    const hash = window.location.hash;

    if (path === '/about' || hash === '#about' || hash === '#/about') {
      return '/about';
    }
    if (path === '/essays' || hash === '#essays' || hash === '#/essays') {
      return '/essays';
    }
    return '/';
  }, []);

  const [currentPath, setCurrentPath] = useState<string>(resolveCurrentPath);

  // Sync state with back/forward browser navigation and hash changes
  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentPath(resolveCurrentPath());
    };
    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
    };
  }, [resolveCurrentPath]);

  // Track pageview, country, IP, and time spent
  useEffect(() => {
    const cleanup = trackPageView(currentPath);
    return () => {
      cleanup();
    };
  }, [currentPath]);

  // Dynamic SEO and Document Title/Meta Sync for SPA routing & search
  useEffect(() => {
    let title = '';
    let description = '';
    let keywords = '';

    if (currentPath === '/about') {
      if (lang === 'fi') {
        title = 'Tietoa Yoshi Tsuijista | Tapi Lifen luoja';
        description = 'Tutustu Yoshi Tsuijiin, Tapi Lifen lahjakkaaseen luojaan. Hiromi Tsuijin poika ja Miori Tsuijin isoveli. Lue hänen taiteestaan, kirjoistaan ja Suomen-matkastaan.';
        keywords = 'Yoshi Tsuiji, Tapi Life luoja, Hiromi Tsuiji, Miori Tsuiji, taiteilija, Japani, Suomi, manga, boba taide';
      } else if (lang === 'en') {
        title = 'About Yoshi Tsuiji | Creator of Tapi Life';
        description = 'Meet Yoshi Tsuiji, the creative artist behind Tapi Life. Son of Hiromi Tsuiji, brother of Miori Tsuiji. Discover his background, artwork, voracious reading, and stories.';
        keywords = 'Yoshi Tsuiji, About Yoshi, Tapi Life creator, Hiromi Tsuiji, Miori Tsuiji, biography, artist, King Tapioca';
      } else {
        title = '辻義について | タピ・ライフ原作者プロフィール';
        description = 'タピ・ライフ原作者、辻義（Yoshi Tsuiji）の公式プロフィール。家族である母の裕美、妹の美織とのあたたかいエピソードや、創作にかける情熱について。';
        keywords = '辻義, 辻義 プロフィール, タピライフ 作者, 辻裕美, 辻美織, 原作者, イラストレーター, まつざかクリニック';
      }
    } else if (currentPath === '/essays') {
      if (lang === 'fi') {
        title = 'Esseet & Kirjoitukset | Tapi Life - Yoshi Tsuiji';
        description = 'Lue Yoshi Tsuijin henkilökohtaisia esseitä tieteestä, mielikuvituksesta, japanilaisesta riisikulttuurista sekä perheen tuesta ja Kuningas Tapioka -tuotteiden myynnistä Suomessa.';
        keywords = 'Tapi Life esseet, Yoshi Tsuiji esseet, luovuus, Japanilainen riisi, Kuningas Tapioka Suomi';
      } else if (lang === 'en') {
        title = 'Essays & Stories | Tapi Life by Yoshi Tsuiji';
        description = 'Read heartwarming personal essays and stories written by Yoshi Tsuiji, exploring deep-sea biology, imagination, Japanese rice, and family collaboration in Finland.';
        keywords = 'Tapi Life Essays, stories, Yoshi Tsuiji essays, creative writing, boba stories, family reflections';
      } else {
        title = 'エッセイ・文集 | タピ・ライフ原作者コラム';
        description = 'タピ・ライフの作者・辻義によるエッセイ、コラム、文集。深海生物の知恵から、日本米の歴史、そしてフィンランドでのオリジナルグッズ販売体験記まで。';
        keywords = 'タピライフ エッセイ, 辻義 エッセイ, 辻義 文集, コラム, 読み物, 家族エピソード, フィンランド';
      }
    } else {
      // Home
      if (lang === 'fi') {
        title = 'Tapi Life | Kuningas Tapiokan & Yoshi Tsuijin sympaattinen maailma';
        description = 'Yoshi Tsuijin luoman Tapi Life -hahmosarjan virallinen sivusto. Tapaa Kuningas Tapioka, Natadecoco, Zakuro, Okome ja Tapiokan Jumala!';
        keywords = 'Tapi Life, Kuningas Tapioka, Yoshi Tsuiji, Natadecoco, Zakuro, Okome, boba hahmot, söpö taide';
      } else if (lang === 'en') {
        title = 'Tapi Life | Whimsical Character World of King Tapioca & Yoshi Tsuiji';
        description = 'Official home of Tapi Life character series created by Yoshi Tsuiji. Meet King Tapioca, Natadecoco, Zakuro, Okome, and God of Tapioka!';
        keywords = 'Tapi Life, King Tapioca, Yoshi Tsuiji, Natadecoco, Zakuro, Okome, God of Tapioka, boba characters, kawaii art';
      } else {
        title = 'タピ・ライフ (Tapi Life) | たぴおか王と辻義の公式創作ワールド';
        description = 'イラストレーター・デザイナーの辻義がお届けする「タピ・ライフ（Tapi Life）」の公式ウェブサイト。たぴおか王、ナタデココ、ざくろ達のゆるくて不思議な世界。';
        keywords = 'Tapi Life, タピライフ, 辻義, たぴおか王, ナタデココ, ざくろ, おコメ, タピオカの神様, まつざかクリニック, キャラクターデザイン, 個人製作';
      }
    }

    // Set document title
    document.title = title;

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Update Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords);

    // Update OG Title & Description
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', title);

    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute('content', description);
  }, [currentPath, lang]);

  // Safe SPA navigation helper
  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  // Helper text strings for home page
  const getHeroBadge = () => {
    if (lang === 'fi') return 'Yoshi Tsuijin alkuperäinen taide & esseet';
    if (lang === 'en') return 'Original Illustration & Prose by Yoshi Tsuiji';
    return '辻義（Yoshi Tsuiji）手書きの世界観';
  };

  const isDark = theme === 'dark';

  const getHeroTitle = () => {
    const brandClass = isDark 
      ? "font-extrabold text-amber-400 drop-shadow-[0_0_16px_rgba(255,140,0,0.45)]" 
      : "font-extrabold text-neutral-950";

    if (lang === 'fi') {
      return (
        <>
          Kuningas Tapiokan lämmin ja lempeä <br />
          <span className={brandClass}>TAPI LIFE</span>
        </>
      );
    }
    if (lang === 'en') {
      return (
        <>
          The Quiet & Warm World of <br />
          <span className={brandClass}>Tapi Life</span>
        </>
      );
    }
    return (
      <>
        ゆるかわ可愛い手書きアート <br />
        <span className={brandClass}>TAPI LIFE</span>
      </>
    );
  };

  const getHeroIntro = () => {
    if (lang === 'fi') {
      return 'Tapaa Kuningas Tapioka, Natadecoco, Zakuro, Okome ja Tapiokan Jumala. Lämpimät käsin piirretyt boba-hahmot tuovat arkeen hymyä, rauhaa ja kodikasta iloa.';
    }
    if (lang === 'en') {
      return 'Meet King Tapioca, Natadecoco, Zakuro, Okome, and Kamisama. Simple characters brought to life on paper, representing warmth, memory, and the slow, peaceful rhythms of daily living.';
    }
    return 'だらしなさすぎて人間界に落とされちゃった灰色タピオカの「たぴおか王」と、その愉快な仲間たち。どこか懐かしく、温かい手書きのイラストを通じて、穏やかで優しい時間をお届けします。';
  };

  const getQuoteText = () => {
    if (lang === 'fi') {
      return '”Jos olisin etsinyt virheettömyyttä, emme olisi varmaankaan koskaan kohdanneet” – Tapioka-helmi';
    }
    if (lang === 'en') {
      return '“まちがいさがしの正解の方じゃ、きっと出会えなかったと思う　byタピオカ玉”';
    }
    return 'まちがいさがしの正解の方じゃ、きっと出会えなかったと思う　byタピオカ玉';
  };

  return (
    <div 
      id="app-root" 
      className={`min-h-screen font-sans flex flex-col justify-between transition-colors duration-300 ${
        isDark 
          ? 'bg-[#0d0c14] text-[#F5F3EC] selection:bg-amber-900/60 selection:text-amber-100' 
          : 'bg-[#FBF9F6] text-[#2E2E2E] selection:bg-neutral-200'
      }`}
    >
      {/* 
        Unified Constant Header across ALL pages!
        Includes: Logo at top left next to TAPI LIFE, responsive navigation, 
        theme switcher (Dark with pumpkin orange default <-> Light mode),
        and 3-way language switcher (JP / EN / FI).
      */}
      <Header 
        lang={lang} 
        onLanguageChange={handleLanguageChange} 
        currentPath={currentPath} 
        onNavigate={navigate}
        theme={theme}
        onToggleTheme={toggleTheme}
        onReplaySlash={handleReplaySlash}
      />

      {/* Main View Router Container */}
      <main className="flex-1">
        {currentPath === '/about' ? (
          <AboutPage lang={lang} onNavigate={navigate} theme={theme} />
        ) : currentPath === '/essays' ? (
          <EssaysPage lang={lang} onNavigate={navigate} theme={theme} />
        ) : (
          /* Home Page View */
          <div>
            {/* Hero Section */}
            <section className="py-12 sm:py-20 max-w-5xl mx-auto px-6 space-y-10">
              <div className="text-center space-y-5 max-w-2xl mx-auto">
                <div className={`inline-block px-3 py-1 border rounded-full text-[10px] font-mono tracking-widest uppercase transition-colors ${
                  isDark 
                    ? 'border-amber-500/40 bg-amber-950/40 text-amber-300 shadow-[0_0_12px_rgba(255,140,0,0.2)]' 
                    : 'border-neutral-300 bg-white/60 text-neutral-500'
                }`}>
                  {getHeroBadge()}
                </div>

                <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-serif leading-tight tracking-tight font-medium ${
                  isDark ? 'text-neutral-100' : 'text-neutral-900'
                }`}>
                  {getHeroTitle()}
                </h1>

                <p className={`text-sm leading-relaxed max-w-xl mx-auto font-serif ${
                  isDark ? 'text-neutral-300' : 'text-neutral-600'
                }`}>
                  {getHeroIntro()}
                </p>
              </div>

              {/* Framed Artwork Display */}
              <div className="max-w-3xl mx-auto">
                <div className={`p-3.5 sm:p-4 border rounded-xl transition-colors ${
                  isDark 
                    ? 'bg-[#181622] border-neutral-800 shadow-[0_8px_30px_rgba(0,0,0,0.6)]' 
                    : 'bg-white border-neutral-200 shadow-xs'
                } space-y-3`}>
                  <div className={`relative aspect-[16/10] overflow-hidden rounded-lg border ${
                    isDark ? 'border-neutral-750 bg-[#252233]' : 'border-neutral-200 bg-[#757575]'
                  }`}>
                    <img 
                      src={heroBanner} 
                      alt="まちがいさがし - を見つけろ！" 
                      className="w-full h-full object-contain hover:scale-[1.01] transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  {/* Artwork Quote Caption */}
                  <div className={`pt-2 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-1 ${
                    isDark ? 'border-neutral-800' : 'border-neutral-100'
                  }`}>
                    <p className={`font-serif text-xs sm:text-sm tracking-wide font-medium ${
                      isDark ? 'text-neutral-200' : 'text-neutral-800'
                    }`}>
                      {getQuoteText()}
                    </p>
                    <span className={`text-[10px] font-mono shrink-0 uppercase ${
                      isDark ? 'text-amber-400/80' : 'text-neutral-400'
                    }`}>
                      YOSHI TSUIJI — TAPI LIFE
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Core Navigation Hub — Minimalist Callouts */}
            <section className={`border-t border-b py-14 transition-colors ${
              isDark ? 'bg-[#12111b] border-neutral-800/80' : 'bg-white border-neutral-200'
            }`}>
              <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* About Yoshi Callout */}
                <button 
                  onClick={() => navigate('/about')}
                  className={`group text-left p-6 border rounded-xl transition-all space-y-4 cursor-pointer ${
                    isDark 
                      ? 'border-neutral-800 bg-[#181622] hover:bg-[#201d2e] hover:border-amber-500/50' 
                      : 'border-neutral-200 bg-white hover:bg-neutral-50 hover:border-neutral-300'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    isDark 
                      ? 'bg-amber-950/40 text-amber-400 group-hover:bg-amber-900/50' 
                      : 'bg-neutral-100 text-neutral-600 group-hover:bg-neutral-200'
                  }`}>
                    <User className="w-5 h-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className={`font-serif text-base font-medium flex items-center justify-between ${
                      isDark ? 'text-neutral-100' : 'text-neutral-900'
                    }`}>
                      <span>{lang === 'fi' ? 'Tietoa Yoshista' : lang === 'en' ? 'About Yoshi' : '辻義について'}</span>
                      <ArrowUpRight className={`w-4 h-4 transition-all ${
                        isDark 
                          ? 'text-neutral-500 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5' 
                          : 'text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                      }`} />
                    </h3>
                    <p className={`text-[11px] leading-relaxed ${
                      isDark ? 'text-neutral-400' : 'text-neutral-500'
                    }`}>
                      {lang === 'fi' 
                        ? 'Tutustu taiteilija Yoshi Tsuijin tarinaan, hänen perheeseensä ja ehtymättömään intohimoonsa kirjoja kohtaan.'
                        : lang === 'en' 
                        ? 'Learn about original creator Yoshi Tsuiji, his supportive family, and his voracious reading habits.' 
                        : '作者・辻義のプロフィール。創作にかける情熱や、温かい支援（援護）を贈る母と妹のご紹介。'}
                    </p>
                  </div>
                </button>

                {/* Essays Callout */}
                <button 
                  onClick={() => navigate('/essays')}
                  className={`group text-left p-6 border rounded-xl transition-all space-y-4 cursor-pointer ${
                    isDark 
                      ? 'border-neutral-800 bg-[#181622] hover:bg-[#201d2e] hover:border-amber-500/50' 
                      : 'border-neutral-200 bg-white hover:bg-neutral-50 hover:border-neutral-300'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    isDark 
                      ? 'bg-amber-950/40 text-amber-400 group-hover:bg-amber-900/50' 
                      : 'bg-neutral-100 text-neutral-600 group-hover:bg-neutral-200'
                  }`}>
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className={`font-serif text-base font-medium flex items-center justify-between ${
                      isDark ? 'text-neutral-100' : 'text-neutral-900'
                    }`}>
                      <span>{lang === 'fi' ? 'Esseet & Tarinat' : lang === 'en' ? 'Bilingual Essays' : 'エッセイ・文集'}</span>
                      <ArrowUpRight className={`w-4 h-4 transition-all ${
                        isDark 
                          ? 'text-neutral-500 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5' 
                          : 'text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                      }`} />
                    </h3>
                    <p className={`text-[11px] leading-relaxed ${
                      isDark ? 'text-neutral-400' : 'text-neutral-500'
                    }`}>
                      {lang === 'fi'
                        ? 'Lue Yoshin omakohtaisia esseitä luonnosta, ympäristöstä, mielikuvituksesta ja perheen tuesta.'
                        : lang === 'en' 
                        ? 'Explore original essays on biology, environmental coexistence, imagination, Japanese rice, and family collaboration.' 
                        : '自然科学、環境との共存、想像力、お米、そして家族の協力。執筆された5つのエッセイを多言語で掲載。'}
                    </p>
                  </div>
                </button>

                {/* WeChat & LINE Stickers Callout */}
                <a 
                  href="https://store.line.me/stickershop/author/4712842/en" 
                  target="_blank" 
                  rel="noreferrer"
                  className={`group p-6 border rounded-xl transition-all space-y-4 block ${
                    isDark 
                      ? 'border-neutral-800 bg-[#181622] hover:bg-[#201d2e] hover:border-amber-500/50' 
                      : 'border-neutral-200 bg-white hover:bg-neutral-50 hover:border-neutral-300'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    isDark 
                      ? 'bg-amber-950/40 text-amber-400 group-hover:bg-amber-900/50' 
                      : 'bg-neutral-100 text-neutral-600 group-hover:bg-neutral-200'
                  }`}>
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className={`font-serif text-base font-medium flex items-center justify-between ${
                      isDark ? 'text-neutral-100' : 'text-neutral-900'
                    }`}>
                      <span>{lang === 'fi' ? 'LINE-tarrat' : lang === 'en' ? 'LINE Stickers' : '公式スタンプ'}</span>
                      <ArrowUpRight className={`w-4 h-4 transition-all ${
                        isDark 
                          ? 'text-neutral-500 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5' 
                          : 'text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                      }`} />
                    </h3>
                    <p className={`text-[11px] leading-relaxed ${
                      isDark ? 'text-neutral-400' : 'text-neutral-500'
                    }`}>
                      {lang === 'fi'
                        ? 'Lataa Kuningas Tapiokan, Okomen ja muiden kavereiden viralliset digitaaliset tarrat viesteihisi!'
                        : lang === 'en' 
                        ? 'Download lovable custom stickers featuring King Tapioca, Okome, and all our friends!' 
                        : 'たぴおか王の豊かな表情や、おコメ、ナタデココたちの日常に使える愛らしいスタンプを配信中。'}
                    </p>
                  </div>
                </a>

                {/* Instagram Callout */}
                <a 
                  href="https://www.instagram.com/tapitaka_119/" 
                  target="_blank" 
                  rel="noreferrer"
                  className={`group p-6 border rounded-xl transition-all space-y-4 block ${
                    isDark 
                      ? 'border-neutral-800 bg-[#181622] hover:bg-[#201d2e] hover:border-amber-500/50' 
                      : 'border-neutral-200 bg-white hover:bg-neutral-50 hover:border-neutral-300'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    isDark 
                      ? 'bg-amber-950/40 text-amber-400 group-hover:bg-amber-900/50' 
                      : 'bg-neutral-100 text-neutral-600 group-hover:bg-neutral-200'
                  }`}>
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className={`font-serif text-base font-medium flex items-center justify-between ${
                      isDark ? 'text-neutral-100' : 'text-neutral-900'
                    }`}>
                      <span>{lang === 'fi' ? 'Instagram' : lang === 'en' ? 'Instagram Feed' : '公式インスタグラム'}</span>
                      <ArrowUpRight className={`w-4 h-4 transition-all ${
                        isDark 
                          ? 'text-neutral-500 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5' 
                          : 'text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                      }`} />
                    </h3>
                    <p className={`text-[11px] leading-relaxed ${
                      isDark ? 'text-neutral-400' : 'text-neutral-500'
                    }`}>
                      {lang === 'fi'
                        ? 'Seuraa tiliä @tapitaka_119 nähdäksesi Yoshin päivittäisiä käsinpiirrettyjä kuvituksia ja luonnoksia.'
                        : lang === 'en' 
                        ? 'Follow @tapitaka_119 for daily hand-drawn illustrations, character updates, and stories.' 
                        : '辻義（Yoshi Tsuiji）の手書きイラスト、最新のイラスト投稿や日々のつぶやきはこちらから。'}
                    </p>
                  </div>
                </a>

              </div>
            </section>

            {/* Character Library Section */}
            <section className="py-20 max-w-5xl mx-auto px-6 space-y-12">
              <div className="text-center space-y-3">
                <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                  {lang === 'fi' ? 'HAHMOGALLERIA' : lang === 'en' ? 'THE CHARACTER CATALOG' : 'キャラクターの紹介'}
                </span>
                <h2 className={`text-2xl sm:text-3xl font-serif font-medium ${isDark ? 'text-neutral-100' : 'text-neutral-950'}`}>
                  {lang === 'fi' ? 'Tapioka-valtakunnan ystävät' : lang === 'en' ? 'Meet the Boba Buddies' : 'タピオカ王国の静かな仲間たち'}
                </h2>
                <p className={`text-xs max-w-md mx-auto ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  {lang === 'fi'
                    ? 'Klikkaa hahmokorttia lukeaksesi salaisen profiilin, tarinan ja lempiruoat.'
                    : lang === 'en' 
                    ? 'Click any character below to read their personal diary, favorites, and unique background lore.'
                    : 'カードを選択すると、それぞれの好物や、ちょっとした内緒の極秘プロファイルが表示されます。'}
                </p>
              </div>

              {/* Grid display for characters with thin borders */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {CHARACTERS.map((char) => (
                  <motion.div
                    key={char.id}
                    whileHover={{ y: -4 }}
                    onClick={() => setSelectedCharacter(char)}
                    className={`border rounded-lg p-5 text-center cursor-pointer transition-all flex flex-col justify-between ${
                      isDark 
                        ? 'bg-[#181622] border-neutral-800 hover:border-amber-500/60 shadow-[0_4px_16px_rgba(0,0,0,0.4)]' 
                        : 'bg-white border-neutral-200 hover:border-neutral-300 shadow-xs'
                    }`}
                  >
                    {/* Clean SVG Rendering of character */}
                    <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                      <svg viewBox="0 0 100 100" className="w-full h-full opacity-90">
                        {char.id === 'tapioka_king' && (
                          <>
                            <circle cx="50" cy="55" r="35" fill="#A5A5A5" stroke="#333" strokeWidth="4.5" />
                            <line x1="38" y1="52" x2="48" y2="52" stroke="#333" strokeWidth="4.5" strokeLinecap="round" />
                            <line x1="52" y1="52" x2="62" y2="52" stroke="#333" strokeWidth="4.5" strokeLinecap="round" />
                            <path d="M43 66 Q50 60 57 66" fill="none" stroke="#333" strokeWidth="4.5" strokeLinecap="round" />
                            <path d="M30 30 L40 45 L50 25 L60 45 L70 30 L65 45 L35 45 Z" fill="#FFE03C" stroke="#333" strokeWidth="3" />
                            <text x="50" y="42" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#333">王</text>
                          </>
                        )}
                        {char.id === 'natadecoco' && (
                          <>
                            <circle cx="50" cy="55" r="35" fill="#E6E6E6" stroke="#333" strokeWidth="4.5" />
                            <path d="M34 46 L44 56 M44 46 L34 56" stroke="#333" strokeWidth="4.5" strokeLinecap="round" />
                            <path d="M56 46 L66 56 M66 46 L56 56" stroke="#333" strokeWidth="4.5" strokeLinecap="round" />
                            <path d="M42 66 Q50 60 58 66" fill="none" stroke="#333" strokeWidth="4.5" strokeLinecap="round" />
                          </>
                        )}
                        {char.id === 'zakuro' && (
                          <>
                            <rect x="22" y="25" width="56" height="56" rx="6" fill="#F8A5A5" stroke="#333" strokeWidth="4.5" />
                            <circle cx="38" cy="48" r="4.5" fill="#333" />
                            <circle cx="62" cy="48" r="4.5" fill="#333" />
                            <rect x="42" y="58" width="16" height="6" rx="1" fill="white" stroke="#333" strokeWidth="3" />
                          </>
                        )}
                        {char.id === 'okome' && (
                          <>
                            <rect x="34" y="20" width="32" height="66" rx="16" fill="#FFFFFF" stroke="#333" strokeWidth="4.5" />
                            <path d="M22 42 L78 42" stroke="#333" strokeWidth="4.5" strokeLinecap="round" />
                          </>
                        )}
                        {char.id === 'kamisama' && (
                          <>
                            <circle cx="50" cy="50" r="28" fill="#FEE2E2" stroke="#333" strokeWidth="4" />
                            <path d="M38 48 Q43 54 48 48" fill="none" stroke="#333" strokeWidth="4" strokeLinecap="round" />
                            <path d="M52 48 Q57 54 62 48" fill="none" stroke="#333" strokeWidth="4" strokeLinecap="round" />
                            <ellipse cx="50" cy="14" rx="16" ry="4" fill="none" stroke="#FBBF24" strokeWidth="2.5" />
                          </>
                        )}
                      </svg>
                    </div>

                    <div>
                      <h3 className={`font-serif font-medium text-sm ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>
                        {lang === 'fi' ? char.nameFi : lang === 'en' ? char.nameEn : char.nameJa}
                      </h3>
                      <span className="text-[10px] text-neutral-400 font-mono block mt-0.5">
                        {lang === 'fi' ? char.roleFi : lang === 'en' ? char.roleEn : char.roleJa}
                      </span>
                    </div>

                    <div className={`mt-4 pt-2 border-t flex items-center justify-center gap-1 text-[10px] font-mono ${
                      isDark ? 'border-neutral-800 text-neutral-400' : 'border-neutral-100 text-neutral-400'
                    }`}>
                      <span>{char.emoji}</span>
                      <span>{lang === 'fi' ? 'Profiili' : lang === 'en' ? 'Profile' : 'プロファイル'}</span>
                      <ChevronRight className="w-3 h-3 text-neutral-400" />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Character detail popup modal */}
              <AnimatePresence>
                {selectedCharacter && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
                      isDark ? 'bg-black/75 backdrop-blur-md' : 'bg-[#2e2e2e]/40 backdrop-blur-xs'
                    }`}
                  >
                    <motion.div 
                      initial={{ scale: 0.98, y: 10 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.98, y: 10 }}
                      className={`border rounded-xl max-w-md w-full p-6 relative overflow-hidden transition-colors ${
                        isDark 
                          ? 'bg-[#181622] border-neutral-750 text-neutral-100 shadow-[0_0_35px_rgba(0,0,0,0.8)]' 
                          : 'bg-white border-neutral-300 text-neutral-900 shadow-lg'
                      }`}
                    >
                      {/* Close Button */}
                      <button 
                        onClick={() => setSelectedCharacter(null)}
                        className={`absolute top-5 right-5 p-1.5 rounded-full transition cursor-pointer ${
                          isDark ? 'text-neutral-400 hover:text-white hover:bg-neutral-800/60' : 'text-neutral-500 hover:bg-neutral-100'
                        }`}
                        aria-label="Close dialog"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      {/* Header Profile */}
                      <div className={`flex gap-4 items-center mb-6 border-b pb-4 ${
                        isDark ? 'border-neutral-800' : 'border-neutral-200'
                      }`}>
                        <div className={`w-16 h-16 shrink-0 rounded-lg border p-1 flex items-center justify-center ${
                          isDark ? 'bg-[#201d2d] border-neutral-750' : 'bg-neutral-50 border-neutral-200'
                        }`}>
                          <svg viewBox="0 0 100 100" className="w-full h-full">
                            {selectedCharacter.id === 'tapioka_king' && (
                              <>
                                <circle cx="50" cy="55" r="35" fill="#A5A5A5" stroke="#333" strokeWidth="4.5" />
                                <line x1="38" y1="52" x2="48" y2="52" stroke="#333" strokeWidth="4.5" strokeLinecap="round" />
                                <line x1="52" y1="52" x2="62" y2="52" stroke="#333" strokeWidth="4.5" strokeLinecap="round" />
                                <path d="M43 66 Q50 60 57 66" fill="none" stroke="#333" strokeWidth="4.5" strokeLinecap="round" />
                                <path d="M30 30 L40 45 L50 25 L60 45 L70 30 L65 45 L35 45 Z" fill="#FFE03C" stroke="#333" strokeWidth="3" />
                                <text x="50" y="42" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#333">王</text>
                              </>
                            )}
                            {selectedCharacter.id === 'natadecoco' && (
                              <>
                                <circle cx="50" cy="55" r="35" fill="#E6E6E6" stroke="#333" strokeWidth="4.5" />
                                <path d="M34 46 L44 56 M44 46 L34 56" stroke="#333" strokeWidth="4.5" strokeLinecap="round" />
                                <path d="M56 46 L66 56 M66 46 L56 56" stroke="#333" strokeWidth="4.5" strokeLinecap="round" />
                                <path d="M42 66 Q50 60 58 66" fill="none" stroke="#333" strokeWidth="4.5" strokeLinecap="round" />
                              </>
                            )}
                            {selectedCharacter.id === 'zakuro' && (
                              <>
                                <rect x="22" y="25" width="56" height="56" rx="6" fill="#F8A5A5" stroke="#333" strokeWidth="4.5" />
                                <circle cx="38" cy="48" r="4.5" fill="#333" />
                                <circle cx="62" cy="48" r="4.5" fill="#333" />
                                <rect x="42" y="58" width="16" height="6" rx="1" fill="white" stroke="#333" strokeWidth="3" />
                              </>
                            )}
                            {selectedCharacter.id === 'okome' && (
                              <>
                                <rect x="34" y="20" width="32" height="66" rx="16" fill="#FFFFFF" stroke="#333" strokeWidth="4.5" />
                                <path d="M22 42 L78 42" stroke="#333" strokeWidth="4.5" strokeLinecap="round" />
                              </>
                            )}
                            {selectedCharacter.id === 'kamisama' && (
                              <>
                                <circle cx="50" cy="50" r="28" fill="#FEE2E2" stroke="#333" strokeWidth="4" />
                                <path d="M38 48 Q43 54 48 48" fill="none" stroke="#333" strokeWidth="4" strokeLinecap="round" />
                                <path d="M52 48 Q57 54 62 48" fill="none" stroke="#333" strokeWidth="4" strokeLinecap="round" />
                                <ellipse cx="50" cy="14" rx="16" ry="4" fill="none" stroke="#FBBF24" strokeWidth="2.5" />
                              </>
                            )}
                          </svg>
                        </div>
                        <div>
                          <h3 className={`text-lg font-serif font-medium ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>
                            {lang === 'fi' ? selectedCharacter.nameFi : lang === 'en' ? selectedCharacter.nameEn : selectedCharacter.nameJa}
                          </h3>
                          <span className="text-xs text-neutral-400 font-mono block">
                            {lang === 'fi' ? selectedCharacter.roleFi : lang === 'en' ? selectedCharacter.roleEn : selectedCharacter.roleJa}
                          </span>
                        </div>
                      </div>

                      {/* Body Info */}
                      <div className="space-y-4 font-serif">
                        <div className="space-y-1.5">
                          <span className="text-[10px] text-neutral-400 uppercase font-mono tracking-widest block">
                            {lang === 'fi' ? 'ESITTELY & HISTORIA' : lang === 'en' ? 'BIO / BACKGROUND' : '経歴・プロフィール'}
                          </span>
                          <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                            {lang === 'fi' ? selectedCharacter.descFi : lang === 'en' ? selectedCharacter.descEn : selectedCharacter.descJa}
                          </p>
                        </div>

                        <div className={`p-3 rounded-lg border ${
                          isDark ? 'bg-[#14121d] border-neutral-800' : 'bg-neutral-50 border-neutral-200'
                        }`}>
                          <span className="text-[9px] text-neutral-400 uppercase font-mono tracking-widest block">
                            {lang === 'fi' ? 'LEMPIRUOKA' : lang === 'en' ? 'FAVORITE FOOD' : '大好物'}
                          </span>
                          <p className={`text-xs font-medium mt-1 ${isDark ? 'text-amber-300' : 'text-neutral-800'}`}>
                            {lang === 'fi' ? selectedCharacter.likesFi : lang === 'en' ? selectedCharacter.likesEn : selectedCharacter.likesJa}
                          </p>
                        </div>
                      </div>

                      <div className={`mt-6 pt-4 border-t flex justify-end ${
                        isDark ? 'border-neutral-800' : 'border-neutral-200'
                      }`}>
                        <button 
                          onClick={() => setSelectedCharacter(null)}
                          className={`px-4 py-2 border rounded text-xs font-mono transition-colors cursor-pointer ${
                            isDark 
                              ? 'border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-neutral-200' 
                              : 'border-neutral-300 hover:bg-neutral-100 text-neutral-700'
                          }`}
                        >
                          {lang === 'fi' ? 'Sulje' : lang === 'en' ? 'Close' : '閉じる'}
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          </div>
        )}
      </main>

      {/* Constant Footer across ALL pages */}
      <Footer lang={lang} theme={theme} />

      {/* Ambient Minimalist Halloween Atmosphere: Translucent Background Ghost, Blinking Bottom Lights, Left & Right Extremes */}
      <HalloweenAtmosphere theme={theme} />

      {/* 
        Opening Katana Pumpkin Slash Gatekeeper Experience
        "when someone opens the page - first thing they need to do is slash the pumpkin - with japanese sword -
        say it in japanese cut the pumpkin and the pumpking should bright bling orange - at the centre and everything
        is opaque behind, but tranclucent - when they cut then the page appears"
      */}
      <AnimatePresence>
        {showSlashIntro && (
          <KatanaPumpkinIntro 
            lang={lang} 
            onComplete={handleCompleteSlash} 
          />
        )}
      </AnimatePresence>

    </div>
  );
}
