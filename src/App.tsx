import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Instagram, 
  MessageSquare, 
  BookOpen, 
  ChevronRight, 
  X,
  ArrowUpRight,
  Heart,
  User
} from 'lucide-react';

import { Language, CharacterItem } from './types';
import { CHARACTERS } from './data';

// Subcomponents
import EssaysPage from './components/EssaysPage';
import AboutPage from './components/AboutPage';
import Footer from './components/Footer';

// Import path of hero artwork asset
import heroBanner from "./assets/images/tapioka_find_king_artwork.svg";

export default function App() {
  const [lang, setLang] = useState<Language>('ja'); // Default to Japanese as requested for Tapi Life audience
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterItem | null>(null);
  const [visits24h, setVisits24h] = useState<number | null>(null);
  
  // Custom SPA Path Routing State
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);

  // Sync state with back/forward browser navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Track site visit and retrieve trailing 24-hour visits count
  useEffect(() => {
    let isMounted = true;

    const fetchVisits = async () => {
      try {
        let hasRecordedSession = false;
        try {
          hasRecordedSession = !!sessionStorage.getItem('tapi_session_visited_24h');
        } catch {
          // In case sessionStorage is blocked by browser privacy modes
        }

        // Use POST if new session to increment count, else GET to just refresh count
        const method = hasRecordedSession ? 'GET' : 'POST';
        const res = await fetch('/api/visits', {
          method,
          headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
          const data = await res.json();
          if (isMounted && typeof data.visits24h === 'number') {
            setVisits24h(data.visits24h);
          }
          try {
            sessionStorage.setItem('tapi_session_visited_24h', 'true');
          } catch {
            // ignore
          }
        }
      } catch (err) {
        console.error('Failed to sync 24h visits:', err);
      }
    };

    fetchVisits();

    // Periodically sync every 2 minutes
    const interval = setInterval(() => {
      fetch('/api/visits')
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => {
          if (isMounted && data && typeof data.visits24h === 'number') {
            setVisits24h(data.visits24h);
          }
        })
        .catch(() => {});
    }, 120000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Dynamic SEO and Document Title/Meta Sync for SPA routing & AI search
  useEffect(() => {
    let title = '';
    let description = '';
    let keywords = '';

    if (currentPath === '/about') {
      if (lang === 'en') {
        title = 'About Yoshi Tsuiji | Creator of Tapi Life';
        description = 'Meet Yoshi Tsuiji, the creative artist behind Tapi Life. Son of Hiromi Tsuiji, brother of Miori Tsuiji. Discover his background, artwork, and stories.';
        keywords = 'Yoshi Tsuiji, About Yoshi, Tapi Life creator, Hiromi Tsuiji, Miori Tsuiji, biography, artist';
      } else {
        title = '辻 義について | タピ・ライフ原作者プロフィール';
        description = 'タピ・ライフ原作者、辻 義（Yoshi Tsuiji）の公式プロフィール。家族である母の裕美、妹の美織とのあたたかいエピソードや、クリエイティブな作品創作活動について。';
        keywords = '辻義, 辻義 プロフィール, タピライフ 作者, 辻裕美, 辻美織, 原作者, イラストレーター, まつざかクリニック';
      }
    } else if (currentPath === '/essays') {
      if (lang === 'en') {
        title = 'Essays & Stories | Tapi Life';
        description = 'Read heartwarming personal essays and stories written by Yoshi Tsuiji, exploring family, creativity, and the characters of Tapi Life.';
        keywords = 'Tapi Life Essays, stories, Yoshi Tsuiji essays, creative writing, boba stories, family reflections';
      } else {
        title = 'エッセイ・文集 | タピ・ライフ原作者コラム';
        description = 'タピ・ライフの作者・辻 義によるエッセイ、コラム、文集。日々の創作活動、家族の思い出、キャラクター誕生の裏話などを綴ったあたたかい読物。';
        keywords = 'タピライフ エッセイ, 辻義 エッセイ, 辻義 文集, コラム, 読み物, 家族エピソード, 創作秘話';
      }
    } else {
      // Home
      if (lang === 'en') {
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

  // Toggle language
  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'ja' : 'en'));
  };

  // Router dispatcher
  if (currentPath === '/essays') {
    return <EssaysPage lang={lang} onBack={() => navigate('/')} visits24h={visits24h} />;
  }

  if (currentPath === '/about') {
    return <AboutPage lang={lang} onBack={() => navigate('/')} onNavigate={navigate} visits24h={visits24h} />;
  }

  return (
    <div id="app-root" className="min-h-screen bg-[#FBF9F6] text-[#2E2E2E] font-sans selection:bg-neutral-200">
      
      {/* Minimalist Top Header */}
      <header className="border-b border-neutral-200 bg-[#FBF9F6]/80 backdrop-blur-md sticky top-0 z-40 px-6 py-4 sm:px-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-serif tracking-widest text-lg font-bold text-neutral-900 uppercase">
            TAPI LIFE
          </span>
          <span className="text-[9px] font-mono tracking-widest text-neutral-400 font-medium px-2 py-0.5 border border-neutral-200 rounded">
            辻義 / YOSHI TSUIJI
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider text-neutral-600">
          <button 
            onClick={() => navigate('/about')}
            className="hover:text-neutral-950 transition-colors flex items-center gap-1.5 font-medium cursor-pointer"
          >
            <User className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'ABOUT YOSHI' : '辻義について'}</span>
          </button>

          <button 
            onClick={() => navigate('/essays')}
            className="hover:text-neutral-950 transition-colors flex items-center gap-1.5 font-medium cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'ESSAYS' : 'エッセイ・文集'}</span>
          </button>

          <a 
            href="https://store.line.me/stickershop/author/4712842/en" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-neutral-950 transition-colors flex items-center gap-1 font-medium"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'STICKERS' : '公式スタンプ'}</span>
          </a>

          <a 
            href="https://www.instagram.com/tapitaka_119/" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-neutral-950 transition-colors flex items-center gap-1 font-medium"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>INSTAGRAM</span>
          </a>
        </nav>

        {/* Language & Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-neutral-300 hover:bg-neutral-100 text-xs font-mono transition-all cursor-pointer text-neutral-700"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? '日本語' : 'ENGLISH'}</span>
          </button>
        </div>
      </header>

      {/* Hero Section - Exquisite Minimalist Presentation */}
      <section className="py-16 sm:py-24 max-w-5xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-6 max-w-2xl mx-auto">
          <div className="inline-block px-3 py-1 border border-neutral-300 rounded-full text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
            {lang === 'en' ? 'Original Illustration & Prose' : '辻義（Yoshi Tsuiji）手書きの世界観'}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-neutral-900 leading-tight tracking-tight font-medium">
            {lang === 'en' ? (
              <>
                The Quiet & Warm World of <br />
                <span className="font-extrabold text-neutral-950">Tapi Life</span>
              </>
            ) : (
              <>
                ゆるかわ可愛い手書きアート <br />
                <span className="font-extrabold text-neutral-950">TAPI LIFE</span>
              </>
            )}
          </h1>

          <p className="text-sm text-neutral-500 leading-relaxed max-w-xl mx-auto font-serif">
            {lang === 'en' ? (
              "Meet King Tapioca, Natadecoco, Zakuro, Okome, and Kamisama. Simple characters brought to life on paper, representing warmth, memory, and the slow, peaceful rhythms of daily living."
            ) : (
              "だらしなさすぎて人間界に落とされちゃった灰色タピオカの「たぴおか王」と、その愉快な仲間たち。どこか懐かしく、温かい手書きのイラストを通じて、穏やかで優しい時間をお届けします。"
            )}
          </p>
        </div>

        {/* Framed Artwork Display */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-3.5 sm:p-4 border border-neutral-200 rounded-xl shadow-sm space-y-3">
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-neutral-200 bg-[#757575]">
              <img 
                src={heroBanner} 
                alt="まちがいさがし - を見つけろ！" 
                className="w-full h-full object-contain hover:scale-[1.01] transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* User Requested Caption */}
            <div className="pt-2 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-1">
              <p className="font-serif text-xs sm:text-sm text-neutral-800 tracking-wide font-medium">
                {lang === 'en' 
                  ? '“まちがいさがしの正解の方じゃ、きっと出会えなかったと思う　byタピオカ玉”' 
                  : 'まちがいさがしの正解の方じゃ、きっと出会えなかったと思う　byタピオカ玉'}
              </p>
              <span className="text-[10px] font-mono text-neutral-400 shrink-0 uppercase">
                YOSHI TSUIJI — TAPI LIFE
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Navigation Hub — Minimalist Callouts */}
      <section className="bg-white border-t border-b border-neutral-200 py-16">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* About Yoshi Callout */}
          <button 
            onClick={() => navigate('/about')}
            className="group text-left p-6 border border-neutral-200 rounded-xl hover:bg-neutral-50 hover:border-neutral-300 transition-all space-y-4 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 group-hover:bg-neutral-200 transition-colors">
              <User className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-base font-medium text-neutral-900 flex items-center justify-between">
                <span>{lang === 'en' ? 'About Yoshi' : '辻義について'}</span>
                <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </h3>
              <p className="text-[11px] text-neutral-500 leading-relaxed">
                {lang === 'en' 
                  ? 'Learn about original creator Yoshi Tsuiji, his supportive family, and his voracious reading habits.' 
                  : '作者・辻義のプロフィール。創作にかける情熱や、温かい支援（援護）を贈る母と妹のご紹介。'}
              </p>
            </div>
          </button>

          {/* Essays Callout */}
          <button 
            onClick={() => navigate('/essays')}
            className="group text-left p-6 border border-neutral-200 rounded-xl hover:bg-neutral-50 hover:border-neutral-300 transition-all space-y-4 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 group-hover:bg-neutral-200 transition-colors">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-base font-medium text-neutral-900 flex items-center justify-between">
                <span>{lang === 'en' ? 'Bilingual Essays' : 'エッセイ・文集'}</span>
                <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </h3>
              <p className="text-[11px] text-neutral-500 leading-relaxed">
                {lang === 'en' 
                  ? 'Explore original essays on biology, imagination, Japanese rice, and family team collaboration.' 
                  : '自然科学、想像力、お米、そして家族の協力。執筆された4つのエッセイを日英対訳で掲載。'}
              </p>
            </div>
          </button>

          {/* WeChat & LINE Stickers Callout */}
          <a 
            href="https://store.line.me/stickershop/author/4712842/en" 
            target="_blank" 
            rel="noreferrer"
            className="group p-6 border border-neutral-200 rounded-xl hover:bg-neutral-50 hover:border-neutral-300 transition-all space-y-4 block"
          >
            <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 group-hover:bg-neutral-200 transition-colors">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-base font-medium text-neutral-900 flex items-center justify-between">
                <span>{lang === 'en' ? 'LINE Stickers' : '公式スタンプ'}</span>
                <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </h3>
              <p className="text-[11px] text-neutral-500 leading-relaxed">
                {lang === 'en' 
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
            className="group p-6 border border-neutral-200 rounded-xl hover:bg-neutral-50 hover:border-neutral-300 transition-all space-y-4 block"
          >
            <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 group-hover:bg-neutral-200 transition-colors">
              <Instagram className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-base font-medium text-neutral-900 flex items-center justify-between">
                <span>{lang === 'en' ? 'Instagram Feed' : '公式インスタグラム'}</span>
                <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </h3>
              <p className="text-[11px] text-neutral-500 leading-relaxed">
                {lang === 'en' 
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
            {lang === 'en' ? 'THE CHARACTER CATALOG' : 'キャラクターの紹介'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-medium text-neutral-950">
            {lang === 'en' ? 'Meet the Boba Buddies' : 'タピオカ王国の静かな仲間たち'}
          </h2>
          <p className="text-xs text-neutral-500 max-w-md mx-auto">
            {lang === 'en' 
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
              className="bg-white border border-neutral-200 hover:border-neutral-300 rounded-lg p-5 text-center cursor-pointer transition-all flex flex-col justify-between"
            >
              {/* Clean SVG Rendering of character */}
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
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
                <h3 className="text-neutral-900 font-serif font-medium text-sm">
                  {lang === 'en' ? char.nameEn : char.nameJa}
                </h3>
                <span className="text-[10px] text-neutral-400 font-mono block mt-0.5">
                  {lang === 'en' ? char.roleEn : char.roleJa}
                </span>
              </div>

              <div className="mt-4 pt-2 border-t border-neutral-100 flex items-center justify-center gap-1 text-[10px] text-neutral-400 font-mono">
                <span>{char.emoji}</span>
                <span>{lang === 'en' ? 'Read' : 'プロファイル'}</span>
                <ChevronRight className="w-3 h-3 text-neutral-300" />
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
              className="fixed inset-0 z-50 bg-[#2e2e2e]/40 backdrop-blur-xs flex items-center justify-center p-4"
            >
              <motion.div 
                initial={{ scale: 0.98, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.98, y: 10 }}
                className="bg-white border border-neutral-300 rounded-xl max-w-md w-full p-6 relative shadow-lg overflow-hidden"
              >
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedCharacter(null)}
                  className="absolute top-5 right-5 p-1.5 hover:bg-neutral-100 rounded-full transition cursor-pointer text-neutral-500"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Header Profile */}
                <div className="flex gap-4 items-center mb-6 border-b border-neutral-200 pb-4">
                  <div className="w-16 h-16 flex-shrink-0 bg-neutral-50 rounded-lg border border-neutral-250 p-1 flex items-center justify-center">
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
                    <h3 className="text-lg font-serif font-medium text-neutral-900">
                      {lang === 'en' ? selectedCharacter.nameEn : selectedCharacter.nameJa}
                    </h3>
                    <span className="text-xs text-neutral-400 font-mono block">
                      {lang === 'en' ? selectedCharacter.roleEn : selectedCharacter.roleJa}
                    </span>
                  </div>
                </div>

                {/* Body Info */}
                <div className="space-y-4 font-serif">
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-neutral-400 uppercase font-mono tracking-widest block">BIO / 経歴</span>
                    <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                      {lang === 'en' ? selectedCharacter.descEn : selectedCharacter.descJa}
                    </p>
                  </div>

                  <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                    <span className="text-[9px] text-neutral-400 uppercase font-mono tracking-widest block">FAVORITE FOOD / 大好物</span>
                    <p className="text-xs font-medium text-neutral-800 mt-1">
                      {lang === 'en' ? selectedCharacter.likesEn : selectedCharacter.likesJa}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-200 flex justify-end">
                  <button 
                    onClick={() => setSelectedCharacter(null)}
                    className="px-4 py-2 border border-neutral-300 hover:bg-neutral-100 rounded text-xs font-mono transition-colors cursor-pointer"
                  >
                    {lang === 'en' ? 'Close' : '閉じる'}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Elegant Footer */}
      <Footer lang={lang} visits24h={visits24h} />

    </div>
  );
}
