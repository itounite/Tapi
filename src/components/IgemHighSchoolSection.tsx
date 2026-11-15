import React from 'react';
import { Dna, ExternalLink, Globe2, BookOpen, ArrowUpRight, Play } from 'lucide-react';
import { Language, ThemeMode } from '../types';
import {
  SYNTHETIC_BIOLOGY_INTRO,
  IGEM_ORIGIN_INTRO,
  IGEM_LEARNING_PATHWAY,
  IGEM_HIGH_SCHOOL_METRICS,
  IGEM_BLOG_ARTICLES,
} from '../data/igemHighSchool';

interface IgemHighSchoolSectionProps {
  lang: Language;
  theme?: ThemeMode;
  onNavigate?: (path: string) => void;
}

export default function IgemHighSchoolSection({
  lang,
  theme = 'light',
  onNavigate,
}: IgemHighSchoolSectionProps) {
  const isDark = theme === 'dark';

  const introParagraph =
    lang === 'fi'
      ? SYNTHETIC_BIOLOGY_INTRO.fi
      : lang === 'en'
      ? SYNTHETIC_BIOLOGY_INTRO.en
      : SYNTHETIC_BIOLOGY_INTRO.ja;

  const igemOriginParagraph =
    lang === 'fi'
      ? IGEM_ORIGIN_INTRO.fi
      : lang === 'en'
      ? IGEM_ORIGIN_INTRO.en
      : IGEM_ORIGIN_INTRO.ja;

  const t = {
    kicker:
      lang === 'fi'
        ? 'SYNTEETTINEN BIOLOGIA · LUKIO & NUORET'
        : lang === 'en'
        ? 'SYNTHETIC BIOLOGY · NATURE ENGINEERING'
        : '合成生物学 (SYNTHETIC BIOLOGY) · 入門とiGEM',
    title:
      lang === 'fi'
        ? 'Synteettinen biologia: Luonnon rakennuspalikat & iGEM'
        : lang === 'en'
        ? 'Synthetic Biology: Playing with the Code of Life'
        : '合成生物学：自然のレゴブロックで未来をつくる',
    photoCaption:
      lang === 'fi'
        ? 'The Heart of Synthetic Biology — iGEM Grand Jamboree'
        : lang === 'en'
        ? 'The Heart of Synthetic Biology — Building Blocks of iGEM wall'
        : '「The Heart of Synthetic Biology」— iGEM Grand Jamboree のコミュニティウォール',
    aboutBtn:
      lang === 'fi'
        ? 'iGEM-kilpailun esittely'
        : lang === 'en'
        ? 'About iGEM Competition'
        : 'iGEM 大会について (About)',
    blogBtn:
      lang === 'fi'
        ? 'iGEM High School -blogit'
        : lang === 'en'
        ? 'High School Blogs'
        : 'iGEM 高校生ブログ一覧',
    playGameTitle:
      lang === 'fi'
        ? 'Kokeile itse: BioBuilder Academy -peli'
        : lang === 'en'
        ? 'Try It Yourself: BioBuilder Academy Puzzle Game'
        : '遊びながら学ぶ：BioBuilder Academy 遺伝子パズルゲーム',
    playGameDesc:
      lang === 'fi'
        ? 'Vedä ja yhdistä geenejä mikrobeihin, kasveihin ja soluihin 12 interaktiivisessa tehtävässä suoraan selaimessa.'
        : lang === 'en'
        ? 'Snap DNA gene bricks into microbes, drought-hardy wheat, immune cells, and glowing city trees across 12 hands-on missions.'
        : '12のミッションを通じて、プラスチックを食べる微生物や乾燥に強い小麦、光る街路樹を自分の手でプログラムしよう。',
    playGameBtn:
      lang === 'fi'
        ? 'Pelaa BioBuilder (/learning/biobuilder)'
        : lang === 'en'
        ? 'Play BioBuilder Game (/learning/biobuilder)'
        : 'ゲームをプレイする (/learning/biobuilder)',
    blogsHeading:
      lang === 'fi'
        ? 'Poimintoja iGEM High School -blogista'
        : lang === 'en'
        ? 'Stories & Guides from the iGEM High School Blog'
        : 'iGEM 高校生公式ブログ・ガイド',
    blogsSub:
      lang === 'fi'
        ? 'Lue iGEM-säätiön blogista, miten koululaiset ja nuoret tutkijat rakentavat turvallisia bioprojekteja.'
        : lang === 'en'
        ? 'Explore articles tagged High School on blog.igem.org covering safety White Lists, BioBuilder clubs, and student discoveries.'
        : '公式ブログ（tag: High School）で語られる、高校生の挑戦・バイオセーフティ・学びの記録。',
    readMoreBlog:
      lang === 'fi' ? 'Lue blogissa' : lang === 'en' ? 'Read on iGEM Blog' : 'ブログ記事を見る',
    igemOriginHeading:
      lang === 'fi'
        ? 'Mistä iGEM alkoi?'
        : lang === 'en'
        ? 'How iGEM Started'
        : 'iGEM の始まりと高校生部門',
    pathwayHeading:
      lang === 'fi'
        ? 'Näin pääset alkuun: Opi · Harjoittele · Rakenna'
        : lang === 'en'
        ? 'How You Can Start: Learn · Practise · Build'
        : 'はじめ方のステップ：学ぶ · 練習する · つくる',
  };

  return (
    <section
      aria-labelledby="igem-hs-heading"
      className="space-y-6 max-w-5xl mx-auto pt-8"
    >
      {/* Introduction Card: Two-Column Asymmetric Split with User Photo */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border transition-colors ${
          isDark
            ? 'bg-[#12161f] border-teal-900/50 shadow-[0_8px_30px_rgba(0,0,0,0.4)]'
            : 'bg-white border-neutral-200/90 shadow-sm'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
            <div className="space-y-3.5">
              <div
                className={`flex items-center gap-2 text-xs font-mono tracking-wider uppercase ${
                  isDark ? 'text-teal-300' : 'text-teal-700'
                }`}
              >
                <Dna className="w-4 h-4 shrink-0" />
                <span>{t.kicker}</span>
              </div>

              <h2
                id="igem-hs-heading"
                className={`text-2xl sm:text-3xl font-serif font-bold tracking-tight leading-snug text-balance ${
                  isDark ? 'text-neutral-100' : 'text-neutral-900'
                }`}
              >
                {t.title}
              </h2>

              <p
                className={`text-sm sm:text-[15px] font-serif leading-relaxed ${
                  isDark ? 'text-neutral-200' : 'text-neutral-700'
                }`}
              >
                {introParagraph}
              </p>

              <div
                className={`pt-3.5 border-t space-y-1.5 ${
                  isDark ? 'border-neutral-800/90' : 'border-neutral-200/80'
                }`}
              >
                <h3
                  className={`text-xs font-mono font-bold uppercase tracking-wider ${
                    isDark ? 'text-teal-300' : 'text-teal-800'
                  }`}
                >
                  {t.igemOriginHeading}
                </h3>
                <p
                  className={`text-xs sm:text-sm font-serif leading-relaxed ${
                    isDark ? 'text-neutral-300' : 'text-neutral-600'
                  }`}
                >
                  {igemOriginParagraph}
                </p>
              </div>
            </div>

            {/* Action Links: competition.igem.org/about & blog.igem.org/blog/tag/High+School */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="https://competition.igem.org/about"
                target="_blank"
                rel="noreferrer noopener"
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap shrink-0 min-h-[42px] cursor-pointer ${
                  isDark
                    ? 'bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-sm'
                    : 'bg-teal-700 hover:bg-teal-800 text-white shadow-sm'
                }`}
              >
                <Globe2 className="w-4 h-4 shrink-0" />
                <span>{t.aboutBtn}</span>
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              </a>

              <a
                href="https://blog.igem.org/blog/tag/High+School"
                target="_blank"
                rel="noreferrer noopener"
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-mono font-semibold transition-all whitespace-nowrap shrink-0 min-h-[42px] cursor-pointer ${
                  isDark
                    ? 'border-teal-500/40 bg-teal-950/30 hover:bg-teal-900/40 text-teal-200'
                    : 'border-teal-200 bg-teal-50/60 hover:bg-teal-100/70 text-teal-900'
                }`}
              >
                <BookOpen className="w-4 h-4 shrink-0" />
                <span>{t.blogBtn}</span>
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              </a>
            </div>
          </div>

          {/* Right Photo Column: "The Heart of Synthetic Biology" iGEM Wall */}
          <div className="lg:col-span-5 flex flex-col">
            <div
              className={`flex-1 rounded-2xl overflow-hidden border flex flex-col ${
                isDark
                  ? 'border-neutral-800 bg-[#0d1017]'
                  : 'border-neutral-200 bg-neutral-50'
              }`}
            >
              <div className="relative flex-1 min-h-[240px] sm:min-h-[280px] overflow-hidden">
                <img
                  src="/assets/aistudio/image_156430f1.png"
                  alt="The Heart of Synthetic Biology community signature wall with Building Blocks of iGEM"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
              <div
                className={`px-3.5 py-2.5 text-[11px] font-mono border-t ${
                  isDark
                    ? 'border-neutral-800 text-neutral-400'
                    : 'border-neutral-200/80 text-neutral-600'
                }`}
              >
                {t.photoCaption}
              </div>
            </div>
          </div>
        </div>

        {/* Learn · Practise · Build 3-Step Pathway inside the Introduction */}
        <div
          className={`mt-6 pt-6 border-t space-y-4 ${
            isDark ? 'border-neutral-800/90' : 'border-neutral-200/80'
          }`}
        >
          <div
            className={`text-xs font-mono font-bold uppercase tracking-wider ${
              isDark ? 'text-teal-300' : 'text-teal-800'
            }`}
          >
            {t.pathwayHeading}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {IGEM_LEARNING_PATHWAY.map((item) => {
              const title =
                lang === 'fi'
                  ? item.titleFi
                  : lang === 'en'
                  ? item.titleEn
                  : item.titleJa;
              const desc =
                lang === 'fi'
                  ? item.descFi
                  : lang === 'en'
                  ? item.descEn
                  : item.descJa;
              const actionLabel =
                lang === 'fi'
                  ? item.actionLabelFi
                  : lang === 'en'
                  ? item.actionLabelEn
                  : item.actionLabelJa;

              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 ${
                    isDark
                      ? 'bg-[#171b26] border-neutral-800'
                      : 'bg-[#F8FAF9] border-neutral-200/90'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span
                        className={`font-bold tabular-nums ${
                          isDark ? 'text-teal-300' : 'text-teal-700'
                        }`}
                      >
                        {item.step}
                      </span>
                      <span aria-hidden="true" className="text-neutral-400">
                        ·
                      </span>
                      <h4
                        className={`font-serif text-sm sm:text-base font-bold ${
                          isDark ? 'text-neutral-100' : 'text-neutral-900'
                        }`}
                      >
                        {title}
                      </h4>
                    </div>

                    <p
                      className={`text-xs font-serif leading-relaxed ${
                        isDark ? 'text-neutral-300' : 'text-neutral-600'
                      }`}
                    >
                      {desc}
                    </p>
                  </div>

                  {item.actionType === 'route' ? (
                    <button
                      type="button"
                      onClick={() => {
                        if (onNavigate) {
                          onNavigate(item.target);
                        } else {
                          window.history.pushState({}, '', item.target);
                          window.dispatchEvent(new PopStateEvent('popstate'));
                        }
                      }}
                      className={`inline-flex items-center gap-1.5 text-xs font-mono font-bold transition-colors cursor-pointer self-start pt-1 ${
                        isDark
                          ? 'text-emerald-300 hover:text-emerald-200'
                          : 'text-emerald-700 hover:text-emerald-900'
                      }`}
                    >
                      <Play className="w-3.5 h-3.5 fill-current shrink-0" />
                      <span>{actionLabel}</span>
                    </button>
                  ) : (
                    <a
                      href={item.target}
                      target="_blank"
                      rel="noreferrer noopener"
                      className={`inline-flex items-center gap-1.5 text-xs font-mono font-bold transition-colors self-start pt-1 ${
                        isDark
                          ? 'text-teal-300 hover:text-teal-200'
                          : 'text-teal-700 hover:text-teal-900'
                      }`}
                    >
                      <span>{actionLabel}</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Clean 3-Column Tabular Metrics Strip */}
        <div
          className={`mt-6 pt-6 border-t grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 ${
            isDark ? 'border-neutral-800/90' : 'border-neutral-200/80'
          }`}
        >
          {IGEM_HIGH_SCHOOL_METRICS.map((metric) => (
            <div key={metric.value} className="space-y-1">
              <div
                className={`text-2xl sm:text-3xl font-mono font-bold tabular-nums tracking-tight ${
                  isDark ? 'text-teal-300' : 'text-teal-700'
                }`}
              >
                {metric.value}
              </div>
              <div
                className={`text-xs font-serif font-semibold ${
                  isDark ? 'text-neutral-100' : 'text-neutral-900'
                }`}
              >
                {lang === 'fi'
                  ? metric.labelFi
                  : lang === 'en'
                  ? metric.labelEn
                  : metric.labelJa}
              </div>
              <div
                className={`text-[11px] font-mono ${
                  isDark ? 'text-neutral-400' : 'text-neutral-500'
                }`}
              >
                {lang === 'fi'
                  ? metric.detailFi
                  : lang === 'en'
                  ? metric.detailEn
                  : metric.detailJa}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive BioBuilder Academy Game Launch Banner */}
      <div
        className={`p-6 sm:p-7 rounded-3xl border flex flex-col md:flex-row md:items-center justify-between gap-5 transition-colors ${
          isDark
            ? 'bg-[#141a24] border-emerald-500/35'
            : 'bg-emerald-50/60 border-emerald-200/90'
        }`}
      >
        <div className="space-y-1.5 max-w-2xl">
          <div
            className={`text-[11px] font-mono uppercase tracking-wider ${
              isDark ? 'text-emerald-300' : 'text-emerald-800'
            }`}
          >
            BioBuilder Academy · 4 Worlds · 12 Levels
          </div>
          <h3
            className={`text-lg sm:text-xl font-serif font-bold ${
              isDark ? 'text-neutral-100' : 'text-neutral-900'
            }`}
          >
            {t.playGameTitle}
          </h3>
          <p
            className={`text-xs sm:text-sm font-serif leading-relaxed ${
              isDark ? 'text-neutral-300' : 'text-neutral-700'
            }`}
          >
            {t.playGameDesc}
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            if (onNavigate) {
              onNavigate('/learning/biobuilder');
            } else {
              window.history.pushState({}, '', '/learning/biobuilder');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }
          }}
          className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap shrink-0 min-h-[44px] cursor-pointer active:scale-95 ${
            isDark
              ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-sm'
              : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm'
          }`}
        >
          <Play className="w-4 h-4 fill-current shrink-0" />
          <span>{t.playGameBtn}</span>
        </button>
      </div>

      {/* iGEM High School Blog Highlights Panel */}
      <div
        className={`p-6 sm:p-7 rounded-3xl border space-y-5 ${
          isDark
            ? 'bg-[#12161f] border-neutral-800/90'
            : 'bg-[#F5F9F8] border-teal-200/70'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-1">
            <h3
              className={`font-serif text-lg sm:text-xl font-bold ${
                isDark ? 'text-neutral-100' : 'text-neutral-900'
              }`}
            >
              {t.blogsHeading}
            </h3>
            <p
              className={`text-xs font-serif max-w-2xl leading-relaxed ${
                isDark ? 'text-neutral-400' : 'text-neutral-600'
              }`}
            >
              {t.blogsSub}
            </p>
          </div>

          <a
            href="https://blog.igem.org/blog/tag/High+School"
            target="_blank"
            rel="noreferrer noopener"
            className={`inline-flex items-center gap-1.5 text-xs font-mono font-semibold whitespace-nowrap shrink-0 transition-colors ${
              isDark
                ? 'text-teal-300 hover:text-teal-200'
                : 'text-teal-800 hover:text-teal-950'
            }`}
          >
            <span>blog.igem.org/blog/tag/High+School</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {IGEM_BLOG_ARTICLES.map((post) => {
            const category =
              lang === 'fi'
                ? post.categoryFi
                : lang === 'en'
                ? post.categoryEn
                : post.categoryJa;
            const title =
              lang === 'fi'
                ? post.titleFi
                : lang === 'en'
                ? post.titleEn
                : post.titleJa;
            const summary =
              lang === 'fi'
                ? post.summaryFi
                : lang === 'en'
                ? post.summaryEn
                : post.summaryJa;

            return (
              <a
                key={post.id}
                href={post.url}
                target="_blank"
                rel="noreferrer noopener"
                className={`group p-4 sm:p-5 rounded-2xl border transition-colors flex flex-col justify-between space-y-3 cursor-pointer ${
                  isDark
                    ? 'bg-[#171b26] border-neutral-800 hover:border-teal-500/50'
                    : 'bg-white border-neutral-200/90 hover:border-teal-500'
                }`}
              >
                <div className="space-y-2">
                  <div
                    className={`flex items-center gap-2 text-[11px] font-mono ${
                      isDark ? 'text-neutral-400' : 'text-neutral-500'
                    }`}
                  >
                    <span>{category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h4
                    className={`font-serif text-sm sm:text-base font-bold leading-snug transition-colors ${
                      isDark
                        ? 'text-neutral-100 group-hover:text-teal-300'
                        : 'text-neutral-900 group-hover:text-teal-700'
                    }`}
                  >
                    {title}
                  </h4>

                  <p
                    className={`text-xs font-serif leading-relaxed ${
                      isDark ? 'text-neutral-300' : 'text-neutral-600'
                    }`}
                  >
                    {summary}
                  </p>
                </div>

                <div
                  className={`pt-2.5 border-t flex items-center justify-between text-xs font-mono font-medium ${
                    isDark
                      ? 'border-neutral-800 text-teal-300'
                      : 'border-neutral-100 text-teal-700'
                  }`}
                >
                  <span>{t.readMoreBlog}</span>
                  <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
