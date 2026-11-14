import React, { useState } from 'react';
import { Dna, ExternalLink, Globe2, BookOpen, ArrowUpRight, Microscope } from 'lucide-react';
import { Language, ThemeMode } from '../types';
import {
  IGEM_HIGH_SCHOOL_METRICS,
  IGEM_REGIONAL_PROFILES,
  IGEM_BLOG_ARTICLES,
  IgemRegionId,
} from '../data/igemHighSchool';

interface IgemHighSchoolSectionProps {
  lang: Language;
  theme?: ThemeMode;
}

export default function IgemHighSchoolSection({ lang, theme = 'light' }: IgemHighSchoolSectionProps) {
  const isDark = theme === 'dark';
  const [selectedRegion, setSelectedRegion] = useState<IgemRegionId>('all');

  const visibleRegions =
    selectedRegion === 'all'
      ? IGEM_REGIONAL_PROFILES
      : IGEM_REGIONAL_PROFILES.filter((r) => r.id === selectedRegion);

  const t = {
    kicker:
      lang === 'fi'
        ? 'SYNTEETTINEN BIOLOGIA · LUKIOVALIOKUNTA'
        : lang === 'en'
        ? 'SYNTHETIC BIOLOGY · HIGH SCHOOL DIVISION'
        : '合成生物学の世界大会 · 高校生部門 (iGEM)',
    title:
      lang === 'fi'
        ? 'iGEM High School · Itä-Aasian nuoret Eurooppaa ja Yhdysvaltoja vastaan'
        : lang === 'en'
        ? 'iGEM High School: Japan, Korea, Taiwan & China on the Global Stage'
        : 'iGEM 高校生部門：日本・韓国・台湾・中国から、欧米と競う若き科学者たち',
    subtitle:
      lang === 'fi'
        ? 'Vuonna 2003 MIT:ssä alkanut iGEM on maailman suurin synteettisen biologian kilpailu. Lukiosarjassa (perustettu 2011) nuoret Japanista, Etelä-Koreasta, Taiwanista ja Kiinasta ratkovat terveys- ja ympäristöhaasteita rinta rinnan Euroopan ja Yhdysvaltojen tiimien kanssa Pariisin Grand Jamboreessa.'
        : lang === 'en'
        ? 'Started at MIT in 2003, the iGEM Competition is the world’s premier synthetic biology arena. In its High School Division (launched in 2011), teenagers from Japan, South Korea, Taiwan, and China design real biological systems—competing and collaborating side-by-side with teams from Europe and the USA at the Grand Jamboree.'
        : '2003年にMITで始まった世界最大の合成生物学大会「iGEM」。2011年に誕生した高校生部門では、日本・韓国・台湾・中国の10代たちが学校の枠や研究室の制約を越えてチームを組み、ヨーロッパやアメリカの強豪校と肩を並べて、医療・環境・食料の未来を微生物やDNA設計で競い合っています。',
    aboutBtn:
      lang === 'fi'
        ? 'iGEM-kilpailun esittely'
        : lang === 'en'
        ? 'About iGEM Competition'
        : 'iGEM 大会公式ガイド (About)',
    blogBtn:
      lang === 'fi'
        ? 'iGEM High School -blogit'
        : lang === 'en'
        ? 'High School Blogs'
        : 'iGEM 高校生公式ブログ一覧',
    filterAll:
      lang === 'fi' ? 'Kaikki alueet' : lang === 'en' ? 'All Regions' : 'すべての地域',
    filterJapan:
      lang === 'fi' ? 'Japani' : lang === 'en' ? 'Japan' : '日本',
    filterKorea:
      lang === 'fi' ? 'Etelä-Korea' : lang === 'en' ? 'Korea' : '韓国',
    filterTaiwan:
      lang === 'fi' ? 'Taiwan' : lang === 'en' ? 'Taiwan' : '台湾',
    filterChina:
      lang === 'fi' ? 'Kiina' : lang === 'en' ? 'China' : '中国',
    filterWest:
      lang === 'fi' ? 'Eurooppa & USA' : lang === 'en' ? 'Europe & USA' : '欧州・米国',
    eastAsiaTag:
      lang === 'fi' ? 'Itä-Aasia' : lang === 'en' ? 'East Asia' : '東アジア',
    westTag:
      lang === 'fi' ? 'Eurooppa & USA' : lang === 'en' ? 'Europe & USA' : '欧米',
    spotlightLabel:
      lang === 'fi' ? 'Esimerkkitiimi' : lang === 'en' ? 'Team Spotlight' : '注目チーム',
    projectLabel:
      lang === 'fi' ? 'Merkittävä saavutus' : lang === 'en' ? 'Notable Milestone' : '代表的な成果',
    blogsHeading:
      lang === 'fi'
        ? 'Poimintoja iGEM High School -blogista'
        : lang === 'en'
        ? 'Stories & Reflections from the iGEM High School Blog'
        : 'iGEM 高校生ブログからの注目トピック',
    blogsSub:
      lang === 'fi'
        ? 'Lue suoraan iGEM-säätiön blogista, miten lukiot ympäri maailmaa järjestäytyvät, voittavat haasteita ja kohtaavat Pariisin Jamboreessa.'
        : lang === 'en'
        ? 'Insights tagged High School on blog.igem.org—covering safety White Lists, community labs, and East Asia’s rising synthetic biology teams.'
        : '公式ブログ（tag: High School）で語られる、高校生の挑戦・バイオセーフティ・地域ラボ連携のリアルな記録。',
    readMoreBlog:
      lang === 'fi' ? 'Lue blogissa' : lang === 'en' ? 'Read on iGEM Blog' : 'ブログ記事を見る',
  };

  const regionTabs: { id: IgemRegionId; label: string }[] = [
    { id: 'all', label: t.filterAll },
    { id: 'japan', label: t.filterJapan },
    { id: 'korea', label: t.filterKorea },
    { id: 'taiwan', label: t.filterTaiwan },
    { id: 'china', label: t.filterChina },
    { id: 'europe-usa', label: t.filterWest },
  ];

  return (
    <section
      aria-labelledby="igem-hs-heading"
      className="space-y-6 max-w-5xl mx-auto pt-8"
    >
      {/* Main Header Panel — Clean surface, hairline border, 60-30-10 teal/emerald biotech accent */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border transition-colors ${
          isDark
            ? 'bg-[#12161f] border-teal-900/50 shadow-[0_8px_30px_rgba(0,0,0,0.4)]'
            : 'bg-white border-neutral-200/90 shadow-sm'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            {/* Unboxed kicker metadata with typographic separator */}
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
              className={`text-xs sm:text-sm font-serif leading-relaxed ${
                isDark ? 'text-neutral-300' : 'text-neutral-600'
              }`}
            >
              {t.subtitle}
            </p>
          </div>

          {/* Primary External Links: competition.igem.org/about & blog.igem.org/blog/tag/High+School */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
            <a
              href="https://competition.igem.org/about"
              target="_blank"
              rel="noreferrer noopener"
              className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap shrink-0 min-h-[42px] cursor-pointer ${
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
              className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-mono font-semibold transition-all whitespace-nowrap shrink-0 min-h-[42px] cursor-pointer ${
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

        {/* Clean 4-Column Quantitative Strip with Tabular Numerals */}
        <div
          className={`mt-6 pt-6 border-t grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 ${
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

      {/* Regional Filter Segmented Control (Interactive Buttons) */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div
          className={`inline-flex items-center gap-1 p-1 rounded-xl border text-xs font-mono overflow-x-auto max-w-full no-scrollbar touch-momentum ${
            isDark
              ? 'bg-[#141720] border-neutral-800'
              : 'bg-neutral-100 border-neutral-200'
          }`}
          role="tablist"
          aria-label="Filter iGEM high school regions"
        >
          {regionTabs.map((tab) => {
            const active = selectedRegion === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedRegion(tab.id)}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 min-h-[36px] text-xs font-medium ${
                  active
                    ? isDark
                      ? 'bg-teal-500/20 text-teal-200 font-bold border border-teal-500/40'
                      : 'bg-white text-neutral-900 shadow-xs font-bold'
                    : isDark
                    ? 'text-neutral-400 hover:text-neutral-200'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <span
          className={`text-xs font-mono ${
            isDark ? 'text-neutral-400' : 'text-neutral-500'
          }`}
        >
          Japan · Korea · Taiwan · China vs Europe · USA
        </span>
      </div>

      {/* Regional Profiles Grid — Zero-pill clean typography & subtle 1px borders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {visibleRegions.map((region) => {
          const country =
            lang === 'fi'
              ? region.countryFi
              : lang === 'en'
              ? region.countryEn
              : region.countryJa;
          const focus =
            lang === 'fi'
              ? region.focusAreaFi
              : lang === 'en'
              ? region.focusAreaEn
              : region.focusAreaJa;
          const summary =
            lang === 'fi'
              ? region.summaryFi
              : lang === 'en'
              ? region.summaryEn
              : region.summaryJa;
          const milestone =
            lang === 'fi'
              ? region.notableProjectFi
              : lang === 'en'
              ? region.notableProjectEn
              : region.notableProjectJa;

          return (
            <article
              key={region.id}
              className={`p-5 sm:p-6 rounded-2xl border transition-colors flex flex-col justify-between space-y-4 ${
                isDark
                  ? 'bg-[#161923] border-neutral-800/90 hover:border-teal-500/50'
                  : 'bg-white border-neutral-200/90 hover:border-teal-400'
              }`}
            >
              <div className="space-y-3">
                {/* Quiet 1-line unboxed metadata kicker */}
                <div
                  className={`flex items-center gap-2 text-[11px] font-mono ${
                    isDark ? 'text-teal-300/90' : 'text-teal-700'
                  }`}
                >
                  <span>
                    {region.regionGroup === 'east-asia' ? t.eastAsiaTag : t.westTag}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{focus}</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{region.yearTag}</span>
                </div>

                <div className="flex items-baseline justify-between gap-3">
                  <h3
                    className={`font-serif text-lg sm:text-xl font-bold ${
                      isDark ? 'text-neutral-100' : 'text-neutral-900'
                    }`}
                  >
                    {country}
                  </h3>
                  <span
                    className={`text-xs font-mono shrink-0 ${
                      isDark ? 'text-neutral-400' : 'text-neutral-500'
                    }`}
                  >
                    {t.spotlightLabel}: {region.teamHighlight}
                  </span>
                </div>

                <p
                  className={`text-xs sm:text-sm font-serif leading-relaxed ${
                    isDark ? 'text-neutral-300' : 'text-neutral-600'
                  }`}
                >
                  {summary}
                </p>
              </div>

              {/* Clean hairline separator instead of nested rounded cards or thick left bars */}
              <div
                className={`pt-3.5 border-t space-y-1 ${
                  isDark ? 'border-neutral-800' : 'border-neutral-200/80'
                }`}
              >
                <div
                  className={`flex items-center gap-1.5 text-[11px] font-mono font-semibold ${
                    isDark ? 'text-amber-300' : 'text-amber-800'
                  }`}
                >
                  <Microscope className="w-3.5 h-3.5 shrink-0" />
                  <span>{t.projectLabel}</span>
                </div>
                <p
                  className={`text-xs font-serif leading-relaxed ${
                    isDark ? 'text-neutral-200' : 'text-neutral-700'
                  }`}
                >
                  {milestone}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      {/* Dedicated iGEM High School Blog Highlights Panel */}
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
                  {/* Unboxed quiet metadata */}
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
