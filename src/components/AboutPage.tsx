import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, BookOpen, Heart, Eye, Award, ExternalLink, Mail } from 'lucide-react';
import { Language } from '../types';
import Footer from './Footer';

// Import Yoshi character avatar illustration
import yoshiAvatar from '../assets/images/yoshi_avatar.svg';

interface AboutPageProps {
  lang: Language;
  onBack: () => void;
  onNavigate: (path: string) => void;
  visits?: number | null;
  visits24h?: number | null;
}

export default function AboutPage(props: AboutPageProps) {
  const { lang, onBack, onNavigate } = props;

  return (
    <div id="about-page-container" className="min-h-screen bg-[#FBF9F6] text-neutral-800 pb-24 selection:bg-neutral-200 select-none">
      {/* Mini sticky header */}
      <header className="border-b border-neutral-200 bg-[#FBF9F6]/80 backdrop-blur-md py-6 px-6 sm:px-10 sticky top-0 z-30 flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-4 py-2 hover:bg-neutral-100 text-neutral-800 rounded-lg text-xs transition-all flex items-center gap-1.5 border border-neutral-300 font-medium cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 text-neutral-700" />
          <span>{lang === 'en' ? 'Back' : '戻る'}</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="font-mono tracking-widest text-xs font-bold text-neutral-900">ARTIST PROFILE</span>
        </div>

        <div className="text-[10px] border border-neutral-300 text-neutral-600 px-2.5 py-0.5 rounded-full font-mono uppercase tracking-wider">
          {lang === 'en' ? 'ABOUT YOSHI' : '辻義について'}
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 pt-16 space-y-16">
        {/* Intro Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Yoshi Avatar & Character Showcase */}
          <div className="md:col-span-5 space-y-4">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-5 border border-neutral-200 rounded-2xl shadow-sm"
            >
              <div className="relative aspect-square overflow-hidden rounded-xl border border-neutral-150 bg-[#F8F7F4] flex items-center justify-center p-4 group">
                <img 
                  src={yoshiAvatar} 
                  alt="Yoshi Tsuiji - Original Character & Creator Avatar" 
                  className="w-full h-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-500 ease-out"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-4 text-center space-y-1">
                <p className="font-serif text-sm font-bold text-neutral-900">
                  {lang === 'en' ? 'Yoshi Tsuiji (Creator)' : '辻 義 (Yoshi Tsuiji)'}
                </p>
                <p className="font-mono text-[10px] text-neutral-400">
                  {lang === 'en' ? 'Original Character & Artist Persona' : '原作者公式キャラクター・アバター'}
                </p>
              </div>
            </motion.div>

            <div className="text-[11px] font-mono text-neutral-500 leading-relaxed bg-neutral-50 p-4 border border-neutral-200/60 rounded-xl">
              <p>
                {lang === 'en' 
                  ? '✨ Original character illustration by Yoshi Tsuiji. Dressed with a signature top hat, red bow tie, and sparkling creative spirit.' 
                  : '✨ 辻 義によるオリジナルキャラクターイラスト。トレードマークのシルクハットと赤い蝶ネクタイでおめかしした、ユーモアあふれる創作のシンボル。'}
              </p>
            </div>
          </div>

          {/* Right Column: Narrative Biography */}
          <div className="md:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-bold block">
                {lang === 'en' ? 'THE CREATIVE MIND' : '原作者・クリエイターの紹介'}
              </span>
              <h1 className="text-3xl sm:text-4xl font-serif text-neutral-950 font-medium tracking-tight">
                {lang === 'en' ? 'Yoshi Tsuiji' : '辻 義 (Yoshi Tsuiji)'}
              </h1>
              <div className="space-y-2">
                <p className="text-xs font-mono text-neutral-500">
                  {lang === 'en' 
                    ? 'Son of Hiromi Tsuiji & Brother of Miori Tsuiji' 
                    : '辻 裕美（母）の息子、そして 辻 美織（妹）の兄'}
                </p>
                <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-600 pt-0.5">
                  <Mail className="w-3.5 h-3.5 text-neutral-400" />
                  <a href="mailto:yoshi@tapi.life" className="hover:text-neutral-950 hover:underline transition-colors">
                    yoshi@tapi.life
                  </a>
                </div>
              </div>
            </div>

            <div className="text-neutral-700 text-sm sm:text-[15px] leading-relaxed space-y-6 font-serif text-justify">
              <p>
                {lang === 'en' ? (
                  "All the designs, characters, and intricate world-building of Tapi Life are the original creation of Yoshi Tsuiji. He is a young, exceptionally talented creative mind who is profoundly passionate about life, visual arts, creative essay writing, and the quiet beauty of literature."
                ) : (
                  "「TAPI LIFE」の可愛らしくてどこか哀愁漂う世界観、キャラクター、ストーリーのすべては、辻 義（Yoshi Tsuiji）の手によって創り出されています。日々の生活を愛し、絵を描くこと、エッセイを執筆すること、そして本を読むことに深い情熱を注ぐ、豊かな才能に溢れた若きクリエイターです。"
                )}
              </p>

              <p>
                {lang === 'en' ? (
                  "Yoshi is a truly voracious reader. He consumes books at an extraordinary rate, exploring literature, history, natural science, and philosophy. This deep curiosity and extensive reading are the core sources of his endless imagination, feeding the detailed lore of characters like King Tapioca, Natadecoco, and Zakuro, as well as his award-winning reflective essays."
                ) : (
                  "彼は非常に熱心な読書家（Voracious Reader）でもあります。文学、歴史、自然科学、哲学にいたるまで、驚くべきスピードで数多くの本を読み漁ります。このあくなき探求心と読書体験こそが、彼の無限の想像力の源泉であり、たぴおか王やナタデココ、ザクロといった個性豊かなキャラクターの緻密な背景設定や、心温まるエッセイの執筆へとつながっています。"
                )}
              </p>

              <p>
                {lang === 'en' ? (
                  "To Yoshi, imagination is the ultimate human capability. Through Tapi Life, he aims to share the joy of hand-drawn art, reminding us to slow down, notice the small details of our daily routines, and appreciate the warm connections of family and community."
                ) : (
                  "辻 義にとって、想像力とは人間が持つ最も気高く、幸福な能力です。手書きのアートを通じて、慌ただしい現代社会を少しだけスローダウンさせ、日常の些細な美しさや、家族やコミュニティとの温かい絆の大切さを、世界中のみんなに伝えていくことを目指しています。"
                )}
              </p>
            </div>

            {/* Quick stats / facts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-250">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">{lang === 'en' ? 'Passions' : '情熱'}</span>
                <span className="text-xs font-serif font-bold text-neutral-900 block">
                  {lang === 'en' ? 'Art, Reading & Prose' : '芸術・読書・執筆'}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">{lang === 'en' ? 'Reading Style' : '読書スタイル'}</span>
                <span className="text-xs font-serif font-bold text-neutral-900 block">
                  {lang === 'en' ? 'Voracious, Multi-genre' : '乱読・多読家、研究熱心'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Yoshi's Pillars of Passion */}
        <div className="space-y-8 pt-8 border-t border-neutral-200">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block">CREATIVE VALUES</span>
            <h2 className="text-xl sm:text-2xl font-serif font-medium text-neutral-950">
              {lang === 'en' ? 'The Pillars of Yoshi’s World' : '辻義を形づくる3つの情熱'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <div className="p-6 bg-white border border-neutral-200 rounded-xl space-y-4">
              <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700">
                <Heart className="w-4.5 h-4.5" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-md font-bold text-neutral-900">
                  {lang === 'en' ? 'Art & Design' : '手書きのアート＆デザイン'}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  {lang === 'en' 
                    ? 'Creating lovable characters from mere notebook scribbles. Yoshi custom-designs and publishes digital illustrations, line stickers, and original merchandise.' 
                    : 'ノートの落書きから生まれた愛らしいキャラクターたち。タブレットを用いて自身で一から描き上げ、LINEスタンプやグッズとして国内外で展開しています。'}
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 bg-white border border-neutral-200 rounded-xl space-y-4">
              <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700">
                <BookOpen className="w-4.5 h-4.5" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-md font-bold text-neutral-900">
                  {lang === 'en' ? 'Reflective Essay Writing' : '思考と思索を綴る文筆'}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  {lang === 'en' 
                    ? 'Using prose to examine deep topics—from evolutionary adaptation in the dark deep sea to the ancestral heritage and cultural weight of Japanese rice.' 
                    : '深海生物の不思議な生存適応力から、日本におけるお米の民族的歴史にいたるまで、自身の感性と膨大な知識を頼りに深いテーマの随筆を執筆しています。'}
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 bg-white border border-neutral-200 rounded-xl space-y-4">
              <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700">
                <Eye className="w-4.5 h-4.5" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-md font-bold text-neutral-900">
                  {lang === 'en' ? 'Voracious Reading' : 'あくなき読書体験'}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  {lang === 'en' 
                    ? 'A voracious reader who dives into encyclopedias, stories, and global history. Yoshi filters this vast knowledge into humor, design, and philosophy.' 
                    : 'あらゆるジャンルを網羅する熱心な読書家。そこから吸収した膨大なファクトや知恵が、思わずクスッと笑えるユーモアや洗練された設定に活かされています。'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Family Support Callout block */}
        <div className="bg-neutral-50 rounded-xl border border-neutral-250 p-8 space-y-6">
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-neutral-700" />
            <h3 className="font-serif text-lg font-bold text-neutral-900">
              {lang === 'en' ? 'Family Mutual Support' : 'ひとつのチームとしての家族'}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-serif">
            {lang === 'en' ? (
              "As described beautifully in Yoshi’s essay 'Support' (援護), the Tsuiji family operates like a tight-knit team. With mother Hiromi offering endless encouragement and backing, and sister Miori sharing in the creative journey, Yoshi is fully supported in pushing his boundaries—even traveling to Finland to showcase and sell his designs to a global audience."
            ) : (
              "エッセイ「援護」でも書かれているように、辻家はまるでお互いを補い合う一つのチームのようです。いつも全力でバックアップし、時には海外イベントでの販売活動を後押ししてくれる母・裕美、そして喜びを分かち合える妹・美織。彼らの確かな支え（援護）があるからこそ、辻義は自らの豊かな世界を表現し続けることができます。"
            )}
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate('/essays')}
              className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-950 text-white rounded-lg text-xs font-mono tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Read "Support" Essay' : 'エッセイ「援護」を読む'}</span>
            </button>
          </div>
        </div>

        {/* Return Button */}
        <div className="flex justify-center pt-8">
          <button
            onClick={onBack}
            className="px-8 py-3 bg-neutral-900 hover:bg-neutral-950 text-white rounded-lg text-xs tracking-widest transition-all active:scale-95 font-mono cursor-pointer"
          >
            {lang === 'en' ? 'RETURN TO MAIN PAGE' : 'メインページに戻る'}
          </button>
        </div>
      </div>

      {/* Site Footer */}
      <Footer lang={lang} visits={props.visits ?? props.visits24h} />
    </div>
  );
}
