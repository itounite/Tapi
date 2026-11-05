export interface RaspberryPiSectionItem {
  id: string;
  name: string;
  nameJa: string;
  nameEn: string;
  nameFi: string;
  url: string;
  descJa: string;
  descEn: string;
  descFi: string;
  badgeJa: string;
  badgeEn: string;
  badgeFi: string;
  ageBracketJa: string;
  ageBracketEn: string;
  ageBracketFi: string;
  requirementsJa: string;
  requirementsEn: string;
  requirementsFi: string;
  needsHardware: boolean;
  iconType: 'scratch' | 'python' | 'web' | 'ai' | 'hardware' | 'cad';
  bgGradient: string;
  iconBg: string;
  borderColor: string;
}

export const RASPBERRY_PI_PROJECTS: RaspberryPiSectionItem[] = [
  {
    id: 'scratch',
    name: 'Scratch',
    nameJa: 'Scratch (スクラッチ)',
    nameEn: 'Scratch',
    nameFi: 'Scratch',
    url: 'https://projects.raspberrypi.org/en/technology/scratch',
    descJa: '初心者・入門に最適！カラフルなブロックをつなげて、ゲームや対話型アニメーションを作ってみよう。',
    descEn: 'Great for beginners! Try coding in this block-based language.',
    descFi: 'Täydellinen aloittelijoille! Kokeile koodausta tällä palikkapohjaisella kielellä.',
    badgeJa: 'ビジュアルプログラミング',
    badgeEn: 'Block-Based Coding',
    badgeFi: 'Palikkakoodaus',
    ageBracketJa: '7〜12歳（小学生・入門）',
    ageBracketEn: 'Ages 7–12 (Elementary)',
    ageBracketFi: '7–12 vuotta (Alakoulu)',
    requirementsJa: 'パソコン または タブレット（WebブラウザのみでOK）',
    requirementsEn: 'Computer or tablet (web browser only)',
    requirementsFi: 'Tietokone tai tabletti (vain verkkoselain)',
    needsHardware: false,
    iconType: 'scratch',
    bgGradient: 'from-sky-500/10 to-blue-500/5',
    iconBg: 'bg-sky-500',
    borderColor: 'border-sky-500/30'
  },
  {
    id: 'python',
    name: 'Python',
    nameJa: 'Python (パイソン)',
    nameEn: 'Python',
    nameFi: 'Python',
    url: 'https://projects.raspberrypi.org/en/technology/python',
    descJa: 'Scratchに慣れたら挑戦！世界中で使われている本格的なテキストプログラミングを学ぼう。',
    descEn: "A text-based coding language, try this when you're comfortable with Scratch.",
    descFi: 'Tekstipohjainen ohjelmointikieli, kokeile tätä kun Scratch tuntuu tutulta.',
    badgeJa: 'テキストコーディング',
    badgeEn: 'Text-Based Programming',
    badgeFi: 'Tekstikoodaus',
    ageBracketJa: '9〜16歳以上（小学高学年・中高生）',
    ageBracketEn: 'Ages 9–16+ (Upper Elem to Teens)',
    ageBracketFi: '9–16+ vuotta (Yläkoulu & nuoret)',
    requirementsJa: 'パソコン または タブレット（Webブラウザまたはエディタ）',
    requirementsEn: 'Computer or tablet (web browser or code editor)',
    requirementsFi: 'Tietokone tai tabletti (verkkoselain tai koodieditori)',
    needsHardware: false,
    iconType: 'python',
    bgGradient: 'from-blue-900/10 to-indigo-900/5',
    iconBg: 'bg-[#1b2559]',
    borderColor: 'border-indigo-500/30'
  },
  {
    id: 'web-development',
    name: 'Web development',
    nameJa: 'Web開発 (HTML & CSS)',
    nameEn: 'Web development',
    nameFi: 'Verkkokehitys',
    url: 'https://projects.raspberrypi.org/en/technology/web_development',
    descJa: 'HTMLとCSSを使って、世界中に公開できるオリジナルWebページやWebアプリをデザインしよう。',
    descEn: 'Design and make web pages using HTML and CSS.',
    descFi: 'Suunnittele ja rakenna verkkosivuja käyttämällä HTML- ja CSS-kieliä.',
    badgeJa: 'HTML & CSS デザイン',
    badgeEn: 'HTML & CSS Design',
    badgeFi: 'HTML & CSS -verkkosivut',
    ageBracketJa: '9〜16歳以上（小学高学年・中高生）',
    ageBracketEn: 'Ages 9–16+ (Upper Elem to Teens)',
    ageBracketFi: '9–16+ vuotta (Alakoulusta lukioon)',
    requirementsJa: 'パソコン または タブレット（Webブラウザとテキストエディタ）',
    requirementsEn: 'Computer or tablet (web browser & text editor)',
    requirementsFi: 'Tietokone tai tabletti (verkkoselain & tekstieditori)',
    needsHardware: false,
    iconType: 'web',
    bgGradient: 'from-rose-500/10 to-pink-500/5',
    iconBg: 'bg-[#ea4353]',
    borderColor: 'border-rose-500/30'
  },
  {
    id: 'ai-and-data',
    name: 'AI & data',
    nameJa: 'AI & データ (AI & data)',
    nameEn: 'AI & data',
    nameFi: 'Tekoäly & data',
    url: 'https://projects.raspberrypi.org/en/technology/ai_and_data',
    descJa: '機械学習や画像認識、AIテクノロジーの基礎を学び、データを活用した賢い仕組みを作ろう。',
    descEn: 'Discover machine learning and AI applications and technologies.',
    descFi: 'Tutustu koneoppimiseen ja tekoälysovelluksiin sekä nykyaikaisiin teknologioihin.',
    badgeJa: '機械学習 & データ分析',
    badgeEn: 'Machine Learning & Tech',
    badgeFi: 'Koneoppiminen & teknologiat',
    ageBracketJa: '10〜18歳以上（中学生・高校生〜大人）',
    ageBracketEn: 'Ages 10–18+ (Middle School to Adults)',
    ageBracketFi: '10–18+ vuotta (Yläkoulusta aikuisille)',
    requirementsJa: 'パソコン または タブレット（画像認識プロジェクトにはWebカメラ推奨）',
    requirementsEn: 'Computer or tablet (webcam optional for vision AI)',
    requirementsFi: 'Tietokone tai tabletti (valinnainen verkkokamera tekoälynäölle)',
    needsHardware: false,
    iconType: 'ai',
    bgGradient: 'from-amber-500/10 to-orange-500/5',
    iconBg: 'bg-[#f77f3a]',
    borderColor: 'border-amber-500/30'
  },
  {
    id: 'physical-computing',
    name: 'Physical computing',
    nameJa: 'フィジカル・コンピューティング (電子工作)',
    nameEn: 'Physical computing',
    nameFi: 'Fyysinen laskenta (Elektroniikka)',
    url: 'https://projects.raspberrypi.org/en/technology/physical_computing',
    descJa: 'プログラムを書いてLED、センサー、ブザー、モーターなどの電子パーツや実機を動かしてみよう。',
    descEn: 'Code something that controls a physical device.',
    descFi: 'Koodaa ohjelmia, jotka ohjaavat fyysisiä laitteita, sensoreita ja ledejä.',
    badgeJa: 'ハードウェア & 電子工作',
    badgeEn: 'Hardware & Circuits',
    badgeFi: 'Laitteet & kytkennät',
    ageBracketJa: '8〜18歳以上（小学生〜中高生・メイカー）',
    ageBracketEn: 'Ages 8–18+ (Elementary to Makers)',
    ageBracketFi: '8–18+ vuotta (Alakoulusta harrastajiin)',
    requirementsJa: 'Raspberry Pi本体（またはmicro:bit / Pico）、パソコン、電子パーツ（LED・センサー・配線等）',
    requirementsEn: 'Raspberry Pi (or micro:bit / Pico), computer, and electronics (LEDs, sensors, jumper wires)',
    requirementsFi: 'Raspberry Pi (tai micro:bit / Pico), tietokone ja elektroniikkaa (ledit, sensorit, johdot)',
    needsHardware: true,
    iconType: 'hardware',
    bgGradient: 'from-teal-500/10 to-emerald-500/5',
    iconBg: 'bg-[#14b8a6]',
    borderColor: 'border-teal-500/30'
  },
  {
    id: '3d-and-cad',
    name: '3D & CAD',
    nameJa: '3D & CAD (3Dモデリング)',
    nameEn: '3D & CAD',
    nameFi: '3D & CAD',
    url: 'https://projects.raspberrypi.org/en/technology/3d_and_cad',
    descJa: '立体CADツールやグラフィックスソフトウェアを使って、仮想3D空間やモデリング作品を作ろう。',
    descEn: 'Create and explore 3D worlds.',
    descFi: 'Luo ja tutki virtuaalisia 3D-maailmoja ja geometrisia malleja.',
    badgeJa: '3Dモデリング & 空間設計',
    badgeEn: '3D Modeling & Design',
    badgeFi: '3D-mallinnus & suunnittelu',
    ageBracketJa: '9〜18歳以上（小学高学年〜中高生・クリエイター）',
    ageBracketEn: 'Ages 9–18+ (Upper Elem to Creators)',
    ageBracketFi: '9–18+ vuotta (Alakoulusta tekijöihin)',
    requirementsJa: 'パソコン（マウス推奨）& 3Dプリンター（立体造形を出力する場合）',
    requirementsEn: 'Computer (mouse recommended) & 3D printer (optional for physical fabrication)',
    requirementsFi: 'Tietokone (hiiri suositeltava) & 3D-tulostin (fyysiseen tulostukseen)',
    needsHardware: true,
    iconType: 'cad',
    bgGradient: 'from-purple-500/10 to-violet-500/5',
    iconBg: 'bg-[#4338ca]',
    borderColor: 'border-purple-500/30'
  }
];
