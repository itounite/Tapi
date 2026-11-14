export type IgemRegionId = 'all' | 'japan' | 'korea' | 'taiwan' | 'china' | 'europe-usa';

export interface IgemRegionProfile {
  id: Exclude<IgemRegionId, 'all'>;
  countryEn: string;
  countryJa: string;
  countryFi: string;
  regionGroup: 'east-asia' | 'west';
  teamHighlight: string;
  focusAreaEn: string;
  focusAreaJa: string;
  focusAreaFi: string;
  summaryEn: string;
  summaryJa: string;
  summaryFi: string;
  notableProjectEn: string;
  notableProjectJa: string;
  notableProjectFi: string;
  yearTag: string;
}

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
  dateLabel: string;
  readTime: string;
  url: string;
}

export const IGEM_HIGH_SCHOOL_METRICS = [
  {
    value: '2003',
    labelEn: 'Founded at MIT',
    labelJa: 'MITにて創設',
    labelFi: 'Perustettu MIT:ssä',
    detailEn: 'Undergraduate roots',
    detailJa: '大学の実験講座から誕生',
    detailFi: 'Alkoi yliopistokurssina',
  },
  {
    value: '2011',
    labelEn: 'High School Launch',
    labelJa: '高校部門が発足',
    labelFi: 'Lukiosarjan alku',
    detailEn: 'From 5 teams to global',
    detailJa: '5チームから世界規模へ',
    detailFi: 'Viidestä tiimistä maailmanlaajuiseksi',
  },
  {
    value: '100+',
    labelEn: 'HS Teams Annually',
    labelJa: '毎年の高校参加数',
    labelFi: 'Lukiotiimiä vuosittain',
    detailEn: 'Shared Grand Jamboree',
    detailJa: 'ジャンボリーで大学勢と競演',
    detailFi: 'Samalla lavalla yliopistojen kanssa',
  },
  {
    value: '6',
    labelEn: 'Featured Regions',
    labelJa: '注目の競演地域',
    labelFi: 'Keskeistä aluetta',
    detailEn: 'East Asia · Europe · USA',
    detailJa: '東アジア・欧州・米国',
    detailFi: 'Itä-Aasia · Eurooppa · USA',
  },
];

export const IGEM_REGIONAL_PROFILES: IgemRegionProfile[] = [
  {
    id: 'japan',
    countryEn: 'Japan',
    countryJa: '日本',
    countryFi: 'Japani',
    regionGroup: 'east-asia',
    teamHighlight: 'Japan-United',
    focusAreaEn: 'Therapeutics & Bio-Production',
    focusAreaJa: '医療・バイオ生産',
    focusAreaFi: 'Terapiat ja biotuotanto',
    summaryEn:
      'High schoolers across Japan unite across school boundaries and partner with university mentors to engineer safe microbial systems, overcoming limited school wet-lab infrastructure.',
    summaryJa:
      '日本各地の高校生が学校の枠を超えて連合チームを組み、大学のメンターと連携しながら、高校の実験設備の壁を越えて安全な微生物工学に挑戦しています。',
    summaryFi:
      'Japanilaiset lukiolaiset yhdistävät voimansa yli koulurajojen ja rakentavat yliopistomentorien tuella turvallisia mikrobijärjestelmiä.',
    notableProjectEn:
      'Saffrocure: Engineered bacteria to produce saffron-derived antidepressant compounds, earning the High School Grand Prize at the Grand Jamboree.',
    notableProjectJa:
      '「Saffrocure」プロジェクト：サフラン由来の抗うつ成分を微生物で生産する設計で、Grand Jamboree高校部門グランプリを受賞。',
    notableProjectFi:
      'Saffrocure-projekti: Suunnitteli bakteereja tuottamaan sahramiperäisiä yhdisteitä ja voitti lukiosarjan pääpalkinnon Grand Jamboreessa.',
    yearTag: '2023 Grand Prize',
  },
  {
    id: 'korea',
    countryEn: 'South Korea',
    countryJa: '韓国',
    countryFi: 'Etelä-Korea',
    regionGroup: 'east-asia',
    teamHighlight: 'CSIA-SouthKorea & Korea-HS',
    focusAreaEn: 'Environmental Repair & Waste Upcycling',
    focusAreaJa: '環境修復・廃棄物アップサイクル',
    focusAreaFi: 'Ympäristön kunnostus ja kierrätys',
    summaryEn:
      'Korean high school squads apply disciplined wet-lab design and computational modeling to regional ecological problems, from desert sand stabilization to biological food-waste breakdown.',
    summaryJa:
      '韓国の高校生チームは、精緻な実験設計と数理モデリングを武器に、砂漠化防止や食品廃棄物の微生物分解といった環境課題に正面から挑んでいます。',
    summaryFi:
      'Korealaiset lukiotiimit yhdistävät tarkan laboratoriokokeilun ja mallinnuksen ratkoakseen aavikoitumista ja ruokahävikkiä.',
    notableProjectEn:
      'CSIA-SouthKorea engineered Klebsiella oxytoca to precipitate calcite and solidify shifting sand against desertification—winning a High School Grand Prize.',
    notableProjectJa:
      'CSIA-SouthKoreaは炭酸カルシウムを沈殿させて砂を固め砂漠化を防ぐ細菌を設計し、高校部門グランプリを獲得。近年のKorea-HSも果皮分解などで活躍。',
    notableProjectFi:
      'CSIA-SouthKorea suunnitteli bakteerin sitomaan aavikkohiekkaa kalsiitin avulla ja voitti lukiosarjan pääpalkinnon.',
    yearTag: 'Grand Prize & Gold',
  },
  {
    id: 'taiwan',
    countryEn: 'Taiwan',
    countryJa: '台湾',
    countryFi: 'Taiwan',
    regionGroup: 'east-asia',
    teamHighlight: 'TAS_Taipei & HSiTAIWAN',
    focusAreaEn: 'Diagnostics, Biosensing & Public Health',
    focusAreaJa: '診断技術・バイオセンサー・公衆衛生',
    focusAreaFi: 'Diagnostiikka ja biosensorit',
    summaryEn:
      'Taiwanese high school programs have built multi-year lab cultures that consistently rival university teams, excelling in molecular diagnostics, wiki engineering, and science education.',
    summaryJa:
      '台湾の高校チームは学校主導・地域連携の研究文化を築き、大学部門に匹敵する高度な分子診断システムや教育プログラムで毎年世界トップクラスの実績を誇ります。',
    summaryFi:
      'Taiwanilaiset lukiotiimit ovat rakentaneet pitkäjänteisen laboratoriokulttuurin ja kilpailevat tasavertaisesti yliopistojen kanssa diagnostiikassa.',
    notableProjectEn:
      'Repeated High School Grand Prize winners (2015–2017 & beyond) for projects tackling chronic inflammation, aflatoxin biosensing, COVID-19 detection, and UniversO blood-type conversion.',
    notableProjectJa:
      'TAS_TaipeiやHSiTAIWANは慢性炎症対策、漢方薬の有害物質検出、コロナ検査、血液型変換研究などで複数のグランプリ・金賞・最優秀Wiki賞を受賞。',
    notableProjectFi:
      'Useita pääpalkintoja ja kultamitaleja projekteilla, jotka käsittelevät biosensoriikkaa, tautien diagnosointia ja veriryhmämuunnosta.',
    yearTag: 'Multi-Year Champions',
  },
  {
    id: 'china',
    countryEn: 'China',
    countryJa: '中国',
    countryFi: 'Kiina',
    regionGroup: 'east-asia',
    teamHighlight: 'BASIS-China & Shanghai HS Squads',
    focusAreaEn: 'SynBio Education & Sustainable Villages',
    focusAreaJa: '合成生物学教育・持続可能社会',
    focusAreaFi: 'Synteettisen biologian koulutus',
    summaryEn:
      'Rapidly expanding cohorts of high school students in Shanghai, Shenzhen, and Beijing use BioBuilder clubs and community labs to step beyond exam textbooks into open-ended bio-engineering.',
    summaryJa:
      '上海・深圳・北京などの高校生がBioBuilderやコミュニティラボを足がかりに、受験勉強の枠を超えた自律的な合成生物学の研究と国際交流を展開しています。',
    summaryFi:
      'Shanghain, Shenzhenin ja Pekingin lukiolaiset siirtyvät koekeskeisestä opiskelusta aitoon biotekniseen suunnitteluun BioBuilder-kerhojen kautta.',
    notableProjectEn:
      'Teams consistently earn Gold Medals and Best Education nominations by designing local biodiversity sensors and translating synthetic biology handbooks for younger students.',
    notableProjectJa:
      '地域生態系センサーの開発や、小中学生向けの分かりやすい合成生物学教材づくりで金賞やBest Education賞の常連として存在感を放っています。',
    notableProjectFi:
      'Tiimit keräävät kultamitaleja ja koulutuspalkintoja rakentamalla ympäristösensoreita ja oppimateriaaleja nuoremmille oppilaille.',
    yearTag: 'Fastest Growing Cohort',
  },
  {
    id: 'europe-usa',
    countryEn: 'Europe & USA',
    countryJa: 'ヨーロッパ・アメリカ',
    countryFi: 'Eurooppa & USA',
    regionGroup: 'west',
    teamHighlight: 'Lambert-GA & Paris Jamboree Hosts',
    focusAreaEn: 'Community Labs & Global Jamboree Exchange',
    focusAreaFi: 'Yhteisölaboratoriot ja Jamboree',
    focusAreaJa: 'コミュニティラボ・ジャンボリー交流',
    summaryEn:
      'Since iGEM began at MIT (2003) and launched its High School track in Indiana (2011), US public-school programs and European community labs set strong benchmarks—now meeting Asia in Paris.',
    summaryJa:
      'MIT発祥（2003年）および米国インディアナ州での高校部門誕生（2011年）から続く欧米のコミュニティラボや高校勢と、東アジアの若者たちがパリのGrand Jamboreeで直接競い、学び合います。',
    summaryFi:
      'MIT:stä alkanut kilpailu ja yhdysvaltalaisten sekä eurooppalaisten lukioiden pitkät perinteet kohtaavat Aasian joukkueet vuosittain Pariisin Grand Jamboreessa.',
    notableProjectEn:
      'Long-running high school powerhouses like Lambert-GA (featured on 60 Minutes) alongside European high school Village teams foster cross-continental peer review and shared open parts.',
    notableProjectJa:
      '米国の名門高校チームLambert-GA（CBS『60 Minutes』でも特集）や欧州の高校チームが、パリのVillage展示区画でアジア勢と互いの設計図や安全基準を共有。',
    notableProjectFi:
      'Pitkän linjan lukiotiimit kuten Lambert-GA sekä eurooppalaiset Village-tiimit jakavat avoimia biologisia osia ja vertaisarviointia yli maanosarajojen.',
    yearTag: 'MIT Origin → Paris Expo',
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
      '2011年に実験的に始まった高校部門が、2015年の本大会統合を経て、大学生・大学院生と同じテーマ別Villageで発表する現在の姿へと進化した軌跡。',
    summaryFi:
      'Miten vuonna 2011 käynnistynyt lukiosarja kasvoi osaksi pääkilpailun teemakyliä yliopistotutkijoiden rinnalla.',
    dateLabel: 'iGEM High School Blog',
    readTime: 'Archive · Tag: High School',
    url: 'https://blog.igem.org/blog/tag/High+School',
  },
  {
    id: 'east-asia-spotlight',
    categoryEn: 'Regional Spotlight',
    categoryJa: 'アジアの躍進',
    categoryFi: 'Itä-Aasian nousu',
    titleEn: 'East Asian High Schoolers Stepping Beyond Textbooks',
    titleJa: '教科書を飛び出す日本・韓国・台湾・中国の高校生たち',
    titleFi: 'Japanin, Korean, Taiwanin ja Kiinan nuoret tutkijat',
    summaryEn:
      'Stories of students in Japan, Korea, Taiwan, and China bridging exam-focused curricula with hands-on genetic circuit design, BioBuilder clubs, and social impact.',
    summaryJa:
      '試験中心の学習環境や実験室の制約を乗り越え、BioBuilderや地域ラボを活用して世界の医療・環境課題に挑む東アジアの中高生たちの記録。',
    summaryFi:
      'Tarinoita siitä, miten nuoret ylittävät perinteisen kouluopetuksen rajat ja suunnittelevat omia biologisia järjestelmiä.',
    dateLabel: 'iGEM High School Blog',
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
      'Reflections on how schools, teacher Principal Investigators, and community labs uphold strict biosafety while letting 14-to-18-year-olds build real biological solutions.',
    summaryJa:
      '14〜18歳の生徒が安心して最先端研究に取り組めるよう、学校や教員PIの承認、iGEMホワイトリストによる厳格なバイオセーフティがどう機能しているかを解説。',
    summaryFi:
      'Näin koulut, opettajat ja turvallisuusluettelot mahdollistavat 14–18-vuotiaille vastuullisen laboratoriotyön.',
    dateLabel: 'iGEM Competition',
    readTime: 'About & Guidelines',
    url: 'https://competition.igem.org/about',
  },
];
