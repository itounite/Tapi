export interface IgemBlogArticle {
  id: string;
  categoryEn: string;
  categoryJa: string;
  categoryFi: string;
  titleEn: string;
  titleJa: string;
  titleFi: string;
  summaryEn: string;
  summaryJa: string;
  summaryFi: string;
  readTime: string;
  url: string;
}

export const SYNTHETIC_BIOLOGY_INTRO = {
  en: `Imagine if you could take the Lego bricks of nature—the tiny, invisible blueprints inside plants, animals, and bacteria—and rearrange them to solve the world’s biggest problems. That is Synthetic Biology. It is a kind of 'nature engineering' where scientists treat DNA like a set of instructions. Instead of just studying living things, they learn how to program them. By tweaking these blueprints, kids and scientists today are building living solutions: designing microbes that can eat pollution, creating plants that survive harsh climates, or engineering tiny biological factories to make clean energy. It is about playing with the code of life to build a safer, kinder, and more resilient future for our planet.`,
  ja: `自然界のレゴブロック――植物や動物、そして微生物の体の中にある目に見えない小さな「設計図」を自在に組み替えて、地球が抱える大きな課題を解決できるとしたらどうでしょう。それが「合成生物学（Synthetic Biology）」です。科学者たちはDNAをひとつの「命令セット（プログラム）」としてとらえ、いわば“自然のエンジニアリング”を行います。生き物をただ観察するだけでなく、「生命をどうプログラムするか」を学ぶのです。今日では子どもたちから最前線の研究者までが、この設計図を工夫して生きた解決策を生み出しています――プラスチックや汚染物質を食べる微生物を設計したり、厳しい気候を生き抜く植物をつくったり、クリーンエネルギーを生み出す極小のバイオ工場を動かしたり。生命のコードで遊び、探究しながら、私たちの地球をより安全で、優しく、しなやかな未来へと導く挑戦です。`,
  fi: `Kuvittele, että voisit ottaa luonnon omat Lego-palikat — kasvien, eläinten ja bakteerien sisällä piilevät pienenpienet näkymättömät piirustukset — ja järjestää ne uudelleen ratkaisemaan maailman suurimpia ongelmia. Sitä on synteettinen biologia. Se on eräänlaista "luonnon insinööritaitoa", jossa tutkijat käsittelevät DNA:ta kuin koodattavissa olevaa ohjekirjaa. Sen sijaan, että eläviä olentoja vain tutkittaisiin, opitaan ohjelmoimaan niitä. Nykyään sekä nuoret että tutkijat rakentavat eläviä ratkaisuja: suunnittelevat mikrobeja, jotka syövät saasteita, kehittävät vaikeita ilmasto-oloja kestäviä kasveja ja luovat pieniä biologisia tehtaita puhtaan energian tuottamiseen. Kyse on elämän koodin tutkimisesta turvallisemman, lempeämmän ja kestävämmän tulevaisuuden puolesta.`,
};

export const IGEM_ORIGIN_INTRO = {
  en: `What started at MIT in 2003 as a college winter workshop on standard, interchangeable DNA parts ("BioBricks") quickly grew into iGEM (the International Genetically Engineered Machine competition). In 2011, iGEM opened its High School Division—inviting students ages 14 to 18 to team up with teachers and community labs, work exclusively with safety-vetted parts on the iGEM White List, and present real-world solutions alongside university researchers at the global Grand Jamboree.`,
  ja: `iGEM（国際遺伝子組換えマシン大会）は、2003年にマサチューセッツ工科大学（MIT）で始まった学生向けの実験講座から誕生しました。共通規格のDNAパーツ（バイオブリック）を組み立てて新しい働きをつくるこの挑戦は世界へ広がり、2011年には「高校生部門（High School Division）」が正式にスタート。現在では14〜18歳の生徒たちが学校の先生や地域のバイオラボのメンター（PI）とともに、安全なホワイトリスト準拠パーツを使って社会課題に挑み、パリの世界大会 Grand Jamboree で大学生や研究者と肩を並べて成果を発表しています。`,
  fi: `Se, mikä alkoi MIT:ssä vuonna 2003 opiskelijoiden työpajana standardoiduista DNA-osista ("BioBricks"), kasvoi nopeasti maailman suurimmaksi synteettisen biologian kilpailuksi (iGEM). Vuonna 2011 iGEM avasi oman lukiosarjan: 14–18-vuotiaat nuoret voivat opettajien ja yhteisölaboratorioiden tuella käyttää turvalliseksi hyväksyttyjä osia (White List) ja esitellä omia ratkaisujaan kansainvälisessä Grand Jamboree -tapahtumassa yliopistotutkijoiden rinnalla.`,
};

export interface IgemPathwayStep {
  step: string;
  id: 'learn' | 'practise' | 'build';
  titleEn: string;
  titleJa: string;
  titleFi: string;
  descEn: string;
  descJa: string;
  descFi: string;
  actionLabelEn: string;
  actionLabelJa: string;
  actionLabelFi: string;
  actionType: 'external' | 'route';
  target: string;
}

export const IGEM_LEARNING_PATHWAY: IgemPathwayStep[] = [
  {
    step: '01',
    id: 'learn',
    titleEn: 'Learn',
    titleJa: '学ぶ (Learn)',
    titleFi: 'Opi (Learn)',
    descEn:
      'Start with how DNA works like code—sensors, switches, and stop signals—using iGEM’s beginner guides, High School blogs, and starter books.',
    descJa:
      'まずはDNAが「センサー」「スイッチ」「停止信号」のような命令コードとしてどう働くかを、iGEM公式ガイドや高校生ブログ、入門書から学びます。',
    descFi:
      'Aloita ymmärtämällä, miten DNA toimii koodin tavoin — antureina, kytkiminä ja pysäytysmerkkeinä — iGEM:n oppaiden ja lukio-blogien avulla.',
    actionLabelEn: 'Explore iGEM About',
    actionLabelJa: 'iGEM ガイドを読む',
    actionLabelFi: 'Tutustu iGEMiin',
    actionType: 'external',
    target: 'https://competition.igem.org/about',
  },
  {
    step: '02',
    id: 'practise',
    titleEn: 'Practise',
    titleJa: '練習する (Practise)',
    titleFi: 'Harjoittele (Practise)',
    descEn:
      'Test DNA gene combinations safely in a digital sandbox—debug side effects, containment timers, and logic gates in BioBuilder Academy.',
    descJa:
      '実験室に入る前に、ブラウザ上の「BioBuilder Academy」で遺伝子パーツを組み立て、副作用や安全タイマー、論理回路を何度でも試せます。',
    descFi:
      'Testaa geeniyhdistelmiä turvallisesti digitaalisessa laboratoriossa: kokeile ajastimia, turvajarruja ja logiikkaportteja BioBuilder Academyssa.',
    actionLabelEn: 'Play BioBuilder (/learning/biobuilder)',
    actionLabelJa: 'BioBuilder で試す',
    actionLabelFi: 'Pelaa BioBuilderia',
    actionType: 'route',
    target: '/learning/biobuilder',
  },
  {
    step: '03',
    id: 'build',
    titleEn: 'Build',
    titleJa: 'つくる (Build)',
    titleFi: 'Rakenna (Build)',
    descEn:
      'Form a school or BioBuilder club team with a teacher PI, pick a local problem, design safe White-List circuits, and share at iGEM.',
    descJa:
      '学校やBioBuilderクラブで先生（PI）とチームを組み、身近な課題をテーマに安全な設計・実験・社会実装のサイクルに挑みましょう。',
    descFi:
      'Perusta koulun tai tiedekerhon tiimi opettajan (PI) kanssa, valitse paikallinen haaste ja rakenna turvallinen projekti iGEMiin.',
    actionLabelEn: 'Read High School Blogs',
    actionLabelJa: '高校生の挑戦を見る',
    actionLabelFi: 'Lue lukioblogeja',
    actionType: 'external',
    target: 'https://blog.igem.org/blog/tag/High+School',
  },
];

export const IGEM_HIGH_SCHOOL_METRICS = [
  {
    value: '2003',
    labelEn: 'Founded at MIT',
    labelJa: 'MITにて創設',
    labelFi: 'Perustettu MIT:ssä',
    detailEn: 'From college lab course to world expo',
    detailJa: '大学の実験講座から世界大会へ',
    detailFi: 'Alkoi yliopistokurssina',
  },
  {
    value: '2011',
    labelEn: 'High School Track',
    labelJa: '高校生部門が発足',
    labelFi: 'Lukiosarjan alku',
    detailEn: 'Teenagers building real bio-systems',
    detailJa: '10代が本物のバイオ設計に挑戦',
    detailFi: 'Nuoret suunnittelevat biotekniikkaa',
  },
  {
    value: '12',
    labelEn: 'BioBuilder Missions',
    labelJa: 'BioBuilder ミッション',
    labelFi: 'BioBuilder-tehtävää',
    detailEn: 'Play & program DNA in /learning/biobuilder',
    detailJa: '/learning/biobuilder で遊べる遺伝子パズル',
    detailFi: 'Pelaa ja koodaa DNA:ta',
  },
];

export const IGEM_BLOG_ARTICLES: IgemBlogArticle[] = [
  {
    id: 'hs-history-evolution',
    categoryEn: 'Competition History',
    categoryJa: '大会の歴史',
    categoryFi: 'Kilpailun historia',
    titleEn: 'From 5 Indiana Schools to the Global Grand Jamboree Stage',
    titleJa: '5校から始まった高校部門が、パリの世界大会へ広がるまで',
    titleFi: 'Viidestä lukiosta globaalille Grand Jamboree -areenalle',
    summaryEn:
      'How iGEM piloted its High School Division in 2011 and integrated teenagers directly into the main Grand Jamboree Villages alongside university researchers.',
    summaryJa:
      '2011年に実験的に始まった高校部門が、大学生・大学院生と同じテーマ別Villageで発表する現在の姿へと進化した軌跡。',
    summaryFi:
      'Miten vuonna 2011 käynnistynyt lukiosarja kasvoi osaksi pääkilpailun teemakyliä yliopistotutkijoiden rinnalla.',
    readTime: 'iGEM Blog · Tag: High School',
    url: 'https://blog.igem.org/blog/tag/High+School',
  },
  {
    id: 'east-asia-spotlight',
    categoryEn: 'Youth Builders',
    categoryJa: '若き探究者たち',
    categoryFi: 'Nuoret rakentajat',
    titleEn: 'High Schoolers Stepping Beyond Textbooks into Real Wet Labs',
    titleJa: '教科書を飛び出し、実社会の課題に挑む中高生チーム',
    titleFi: 'Lukiolaiset ylittävät oppikirjojen rajat laboratorioissa',
    summaryEn:
      'Stories from the iGEM High School blog showing how students use community labs, BioBuilder clubs, and mentorship to tackle climate, plastic waste, and health.',
    summaryJa:
      '試験や教科書の枠を越え、BioBuilderクラブや地域のコミュニティラボを活用して気候変動や環境・医療問題に挑む若者たちの記録。',
    summaryFi:
      'Tarinoita siitä, miten nuoret ylittävät perinteisen kouluopetuksen rajat ja suunnittelevat omia biologisia järjestelmiä.',
    readTime: 'Student Perspectives',
    url: 'https://blog.igem.org/blog/tag/High+School',
  },
  {
    id: 'safety-villages-guide',
    categoryEn: 'Safety & Villages',
    categoryJa: '安全基準とVillage',
    categoryFi: 'Turvallisuus ja teemakylät',
    titleEn: 'Inside the High School Zone, Teacher PIs & White List Biosafety',
    titleJa: '安全な研究を支えるホワイトリスト制度と高校生のチームづくり',
    titleFi: 'Turvallinen biotekniikka ja opettajamentorien rooli',
    summaryEn:
      'How schools, teacher Principal Investigators, and community labs uphold strict biosafety while letting 14-to-18-year-olds build real biological solutions.',
    summaryJa:
      '14〜18歳の生徒が安心して最先端研究に取り組めるよう、学校や教員PIの承認、iGEMホワイトリストによる厳格なバイオセーフティがどう機能しているかを解説。',
    summaryFi:
      'Näin koulut, opettajat ja turvallisuusluettelot mahdollistavat 14–18-vuotiaille vastuullisen laboratoriotyön.',
    readTime: 'About & Guidelines',
    url: 'https://competition.igem.org/about',
  },
];
