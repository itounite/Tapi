import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Heart, Eye, Award, Mail, ArrowLeft } from 'lucide-react';
import { Language, ThemeMode } from '../types';

// Import Yoshi character avatar illustration
import yoshiAvatar from '../assets/images/yoshi_avatar.svg';

interface AboutPageProps {
  lang: Language;
  onNavigate: (path: string) => void;
  theme?: ThemeMode;
}

export default function AboutPage({ lang, onNavigate, theme = 'dark' }: AboutPageProps) {
  const isDark = theme === 'dark';
  const getSubhead = () => {
    if (lang === 'fi') return 'TAITEILIJAN ESITTELY';
    if (lang === 'en') return 'THE CREATIVE MIND';
    return '原作者・クリエイターの紹介';
  };

  const getFamilyLine = () => {
    if (lang === 'fi') return 'Hiromi Tsuijin (äiti) poika & Miori Tsuijin (pikkusisko) isoveli';
    if (lang === 'en') return 'Son of Hiromi Tsuiji & Brother of Miori Tsuiji';
    return '辻裕美（母）の息子、そして 辻美織（妹）の兄';
  };

  const getBioP1 = () => {
    if (lang === 'fi') {
      return 'Kaikki Tapi Lifen sydämelliset hahmot, leikkisä maailma ja kuvitukset ovat nuoren ja lahjakkaan luojan Yoshi Tsuijin käsialaa. Hän suhtautuu suurella intohimolla visuaaliseen taiteeseen, esseiden kirjoittamiseen sekä kirjallisuuteen.';
    }
    if (lang === 'en') {
      return 'All the designs, characters, and intricate world-building of Tapi Life are the original creation of Yoshi Tsuiji. He is a young, exceptionally talented creative mind who is profoundly passionate about life, visual arts, creative essay writing, and the quiet beauty of literature.';
    }
    return '「TAPI LIFE」の可愛らしくてどこか哀愁漂う世界観、キャラクター、ストーリーのすべては、辻義（Yoshi Tsuiji）の手によって創り出されています。日々の生活を愛し、絵を描くこと、エッセイを執筆すること、そして本を読むことに深い情熱を注ぐ、豊かな才能に溢れた若きクリエイターです。';
  };

  const getBioP2 = () => {
    if (lang === 'fi') {
      return 'Yoshi on todellinen kirjallisuuden suurkuluttaja. Hän lukee valtavan määrän teoksia tieteestä, historiasta ja filosofiasta. Tämä syvä uteliaisuus ja monipuolinen lukeneisuus ruokkivat hänen ehtymätöntä mielikuvitustaan – niin Kuningas Tapiokan, Natadecocon ja muiden hahmojen maailmoissa kuin hänen pohdiskelevissa esseissään.';
    }
    if (lang === 'en') {
      return 'Yoshi is a truly voracious reader. He consumes books at an extraordinary rate, exploring literature, history, natural science, and philosophy. This deep curiosity and extensive reading are the core sources of his endless imagination, feeding the detailed lore of characters like King Tapioca, Natadecoco, and Zakuro, as well as his award-winning reflective essays.';
    }
    return '彼は非常に熱心な読書家（Voracious Reader）でもあります。文学、歴史、自然科学、哲学にいたるまで、驚くべきスピードで数多くの本を読み漁ります。このあくなき探求心と読書体験こそが、彼の無限の想像力の源泉であり、たぴおか王やナタデココ、ザクロといった個性豊かなキャラクターの緻密な背景設定や、心温まるエッセイの執筆へとつながっています。';
  };

  const getBioP3 = () => {
    if (lang === 'fi') {
      return 'Yoshille mielikuvitus on inhimillisyyden suurin lahja. Tapi Lifen käsin piirretyn taiteen kautta hän muistuttaa meitä hidastamaan tahtia, arvostamaan arjen pieniä hetkiä ja vaalimaan perheen ja yhteisön välistä lämpöä.';
    }
    if (lang === 'en') {
      return 'To Yoshi, imagination is the ultimate human capability. Through Tapi Life, he aims to share the joy of hand-drawn art, reminding us to slow down, notice the small details of our daily routines, and appreciate the warm connections of family and community.';
    }
    return '辻義にとって、想像力とは人間が持つ最も気高く、幸福な能力です。手書きのアートを通じて、慌ただしい現代社会を少しだけスローダウンさせ、日常の些細な美しさや、家族やコミュニティとの温かい絆の大切さを、世界中のみんなに伝えていくことを目指しています。';
  };

  return (
    <div id="about-page-container" className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-16">
      
      {/* Top back navigation link */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('/')}
          className={`inline-flex items-center gap-1.5 text-xs font-mono transition-colors py-1.5 px-3 rounded-md border shadow-xs cursor-pointer ${
            isDark 
              ? 'bg-[#181622] border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700' 
              : 'bg-white border-neutral-200 text-neutral-600 hover:text-neutral-950'
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>
            {lang === 'fi' ? 'Takaisin etusivulle' : lang === 'en' ? 'Back to Home' : 'ホームに戻る'}
          </span>
        </button>

        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-semibold">
          {lang === 'fi' ? 'PROFIILI & TAUSTA' : lang === 'en' ? 'ARTIST PROFILE' : '原作者プロフィール'}
        </span>
      </div>

      {/* Intro Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Yoshi Avatar & Character Showcase */}
        <div className="md:col-span-5 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`p-5 border rounded-2xl shadow-xs transition-colors ${
              isDark ? 'bg-[#181622] border-neutral-800' : 'bg-white border-neutral-200'
            }`}
          >
            <div className={`relative aspect-square overflow-hidden rounded-xl border flex items-center justify-center p-4 group ${
              isDark ? 'bg-[#201d2d] border-neutral-750' : 'bg-[#F8F7F4] border-neutral-150'
            }`}>
              <img 
                src={yoshiAvatar} 
                alt="Yoshi Tsuiji - Original Character & Creator Avatar" 
                className="w-full h-full object-contain drop-shadow-xs group-hover:scale-105 transition-transform duration-500 ease-out"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="mt-4 text-center space-y-1">
              <p className={`font-serif text-sm font-bold notranslate ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`} translate="no">
                {lang === 'ja' ? '辻義 (Yoshi Tsuiji)' : 'Yoshi Tsuiji'}
              </p>
              <p className="font-mono text-[10px] text-neutral-400">
                {lang === 'fi' ? 'Alkuperäinen luoja & taiteilijahahmo' : lang === 'en' ? 'Original Character & Artist Persona' : '原作者公式キャラクター・アバター'}
              </p>
            </div>
          </motion.div>

          <div className={`text-[11px] font-mono leading-relaxed p-4 border rounded-xl ${
            isDark ? 'bg-[#14121d] border-neutral-800 text-neutral-300' : 'bg-neutral-50 border-neutral-200/70 text-neutral-600'
          }`}>
            <p>
              {lang === 'fi' 
                ? '✨ Yoshi Tsuijin alkuperäinen hahmokuvitus: silinterihattunsa, punaisen rusetin ja leikkisän luovuuden kera.' 
                : lang === 'en' 
                ? '✨ Original character illustration by Yoshi Tsuiji. Dressed with a signature top hat, red bow tie, and sparkling creative spirit.' 
                : '✨ 辻義によるオリジナルキャラクターイラスト。トレードマークのシルクハットと赤い蝶ネクタイでおめかしした、ユーモアあふれる創作のシンボル。'}
            </p>
          </div>
        </div>

        {/* Right Column: Narrative Biography */}
        <div className="md:col-span-7 space-y-6">
          <div className="space-y-3">
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-bold block">
              {getSubhead()}
            </span>
            <h1 className={`text-3xl sm:text-4xl font-serif font-medium tracking-tight notranslate ${
              isDark ? 'text-neutral-100' : 'text-neutral-950'
            }`} translate="no">
              {lang === 'ja' ? '辻義 (Yoshi Tsuiji)' : 'Yoshi Tsuiji'}
            </h1>
            <div className="space-y-1.5">
              <p className="text-xs font-mono text-neutral-400">
                {getFamilyLine()}
              </p>
              <div className={`flex items-center gap-1.5 text-xs font-mono pt-0.5 ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
                <Mail className="w-3.5 h-3.5 text-amber-500" />
                <a href="mailto:yoshi@tapi.life" className="hover:text-amber-400 hover:underline transition-colors">
                  yoshi@tapi.life
                </a>
              </div>
            </div>
          </div>

          <div className={`text-sm sm:text-[15px] leading-relaxed space-y-5 font-serif text-justify ${
            isDark ? 'text-neutral-300' : 'text-neutral-700'
          }`}>
            <p>{getBioP1()}</p>
            <p>{getBioP2()}</p>
            <p>{getBioP3()}</p>
          </div>

          {/* Quick stats / facts */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t ${
            isDark ? 'border-neutral-800' : 'border-neutral-200'
          }`}>
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">
                {lang === 'fi' ? 'Intohimot' : lang === 'en' ? 'Passions' : '情熱'}
              </span>
              <span className={`text-xs font-serif font-bold block ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>
                {lang === 'fi' ? 'Kuvataide, lukeminen ja proosa' : lang === 'en' ? 'Art, Reading & Prose' : '芸術・読書・執筆'}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">
                {lang === 'fi' ? 'Lukutyyli' : lang === 'en' ? 'Reading Style' : '読書スタイル'}
              </span>
              <span className={`text-xs font-serif font-bold block ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>
                {lang === 'fi' ? 'Loputon uteliaisuus, monialainen' : lang === 'en' ? 'Voracious, Multi-genre' : '乱読・多読家、研究熱心'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Yoshi's Pillars of Passion */}
      <div className={`space-y-8 pt-6 border-t ${isDark ? 'border-neutral-800' : 'border-neutral-200'}`}>
        <div className="text-center space-y-2">
          <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block">
            {lang === 'fi' ? 'LUOVAT ARVOT' : 'CREATIVE VALUES'}
          </span>
          <h2 className={`text-xl sm:text-2xl font-serif font-medium ${isDark ? 'text-neutral-100' : 'text-neutral-950'}`}>
            {lang === 'fi' ? 'Yoshin maailman 3 kulmakiveä' : lang === 'en' ? 'The Pillars of Yoshi’s World' : '辻義を形づくる3つの情熱'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <div className={`p-6 border rounded-xl space-y-3 transition-colors ${
            isDark ? 'bg-[#181622] border-neutral-800' : 'bg-white border-neutral-200'
          }`}>
            <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
              isDark ? 'bg-amber-950/40 text-amber-400' : 'bg-neutral-100 text-neutral-700'
            }`}>
              <Heart className="w-4 h-4" />
            </div>
            <div className="space-y-1.5">
              <h3 className={`font-serif text-sm font-bold ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>
                {lang === 'fi' ? 'Kuvitus & Muotoilu' : lang === 'en' ? 'Art & Design' : '手書きのアート＆デザイン'}
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                {lang === 'fi'
                  ? 'Luonnoskirjan sivuilta syntyneet herttaiset hahmot. Yoshi piirtää ja luo itse digitaaliset kuvitukset, LINE-tarrat ja tuotteet.'
                  : lang === 'en' 
                  ? 'Creating lovable characters from mere notebook scribbles. Yoshi custom-designs and publishes digital illustrations, line stickers, and original merchandise.' 
                  : 'ノートの落書きから生まれた愛らしいキャラクターたち。タブレットを用いて自身で一から描き上げ、LINEスタンプやグッズとして国内外で展開しています。'}
              </p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className={`p-6 border rounded-xl space-y-3 transition-colors ${
            isDark ? 'bg-[#181622] border-neutral-800' : 'bg-white border-neutral-200'
          }`}>
            <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
              isDark ? 'bg-amber-950/40 text-amber-400' : 'bg-neutral-100 text-neutral-700'
            }`}>
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="space-y-1.5">
              <h3 className={`font-serif text-sm font-bold ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>
                {lang === 'fi' ? 'Esseet ja Tarinat' : lang === 'en' ? 'Reflective Essay Writing' : '思考と思索を綴る文筆'}
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                {lang === 'fi'
                  ? 'Kirjoituksissaan Yoshi käsittelee syvällisiä teemoja – syvänmeren eliöiden sopeutumisesta japanilaisen riisin kulttuuriseen merkitykseen.'
                  : lang === 'en' 
                  ? 'Using prose to examine deep topics—from evolutionary adaptation in the dark deep sea to the ancestral heritage and cultural weight of Japanese rice.' 
                  : '深海生物の不思議な生存適応力から、日本におけるお米の民族的歴史にいたるまで、自身の感性と膨大な知識を頼りに深いテーマの随筆を執筆しています。'}
              </p>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className={`p-6 border rounded-xl space-y-3 transition-colors ${
            isDark ? 'bg-[#181622] border-neutral-800' : 'bg-white border-neutral-200'
          }`}>
            <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
              isDark ? 'bg-amber-950/40 text-amber-400' : 'bg-neutral-100 text-neutral-700'
            }`}>
              <Eye className="w-4 h-4" />
            </div>
            <div className="space-y-1.5">
              <h3 className={`font-serif text-sm font-bold ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>
                {lang === 'fi' ? 'Kyltymätön Lukuhalu' : lang === 'en' ? 'Voracious Reading' : 'あくなき読書体験'}
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                {lang === 'fi'
                  ? 'Monipuolinen lukija, joka ammentaa tietoa tietosanakirjoista, historiasta ja tarinoista. Tämä tieto muuntuu huumoriksi ja oivalluksiksi.'
                  : lang === 'en' 
                  ? 'A voracious reader who dives into encyclopedias, stories, and global history. Yoshi filters this vast knowledge into humor, design, and philosophy.' 
                  : 'あらゆるジャンルを網羅する熱心な読書家。そこから吸収した膨大なファクトや知恵が、思わずクスッと笑えるユーモアや洗練された設定に活かされています。'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Family Support Callout block (including Finland connection) */}
      <div className={`rounded-xl border p-6 sm:p-8 space-y-5 transition-colors ${
        isDark ? 'bg-[#181622] border-neutral-800' : 'bg-neutral-50 border-neutral-200'
      }`}>
        <div className="flex items-center gap-3">
          <Award className={`w-5 h-5 ${isDark ? 'text-amber-400' : 'text-neutral-700'}`} />
          <h3 className={`font-serif text-base sm:text-lg font-bold ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>
            {lang === 'fi' ? 'Perheen yhteinen tuki' : lang === 'en' ? 'Family Mutual Support' : 'ひとつのチームとしての家族'}
          </h3>
        </div>
        <p className={`text-xs sm:text-sm leading-relaxed font-serif ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
          {lang === 'fi' ? (
            "Kuten Yoshi kauniisti kuvaa esseessään 'Tuki' (援護), Tsuijin perhe toimii saumattomana tiiminä. Äiti Hiromin antaessa jatkuvaa kannustusta ja pikkusisko Miorin jakaessa luovaa iloa, Yoshi on voinut laajentaa rajojaan – matkustaen jopa Suomeen asti esittelemään ja myymään taideteoksiaan kansainväliselle yleisölle!"
          ) : lang === 'en' ? (
            "As described beautifully in Yoshi’s essay 'Support' (援護), the Tsuiji family operates like a tight-knit team. With mother Hiromi offering endless encouragement and backing, and sister Miori sharing in the creative journey, Yoshi is fully supported in pushing his boundaries—even traveling to Finland to showcase and sell his designs to a global audience."
          ) : (
            "エッセイ「援護」でも書かれているように、辻家はまるでお互いを補い合う一つのチームのようです。いつも全力でバックアップし、時には海外イベントでの販売活動を後押ししてくれる母・裕美、そして喜びを分かち合える妹・美織。彼らの確かな支え（援護）があるからこそ、辻義は自らの豊かな世界を表現し続けることができます。"
          )}
        </p>
        <div className="pt-2 flex flex-wrap gap-4">
          <button
            onClick={() => onNavigate('/essays')}
            className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-neutral-950 font-bold rounded-lg text-xs font-mono tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{lang === 'fi' ? 'Lue "Tuki"-essee' : lang === 'en' ? 'Read "Support" Essay' : 'エッセイ「援護」を読む'}</span>
          </button>
        </div>
      </div>

      {/* Return Button */}
      <div className="flex justify-center pt-4">
        <button
          onClick={() => onNavigate('/')}
          className={`px-8 py-3 rounded-lg text-xs tracking-widest transition-all active:scale-95 font-mono cursor-pointer border ${
            isDark 
              ? 'bg-[#181622] hover:bg-[#201d2e] border-amber-500/40 text-amber-300 shadow-[0_0_15px_rgba(255,140,0,0.15)]' 
              : 'bg-neutral-900 hover:bg-neutral-950 border-neutral-900 text-white'
          }`}
        >
          {lang === 'fi' ? 'PALAA ETUSIVULLE' : lang === 'en' ? 'RETURN TO MAIN PAGE' : 'メインページに戻る'}
        </button>
      </div>

    </div>
  );
}
