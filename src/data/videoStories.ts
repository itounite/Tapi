export interface VideoStoryItem {
  id: string;
  youtubeId: string;
  youtubeUrl: string;
  customImage?: string;
  screenshotImage?: string;
  screenshotCaptionEn?: string;
  screenshotCaptionJa?: string;
  screenshotCaptionFi?: string;
  isShort?: boolean;
  hidden?: boolean;
  titleJa: string;
  titleEn: string;
  titleFi: string;
  authorJa: string;
  authorEn: string;
  authorFi: string;
  badgeJa: string;
  badgeEn: string;
  badgeFi: string;
  synopsisJa: string;
  synopsisEn: string;
  synopsisFi: string;
  coreMoralJa: string;
  coreMoralEn: string;
  coreMoralFi: string;
}

export const VIDEO_STORIES: VideoStoryItem[] = [
  {
    id: 'hakuin-monk-baby',
    hidden: true, // Hidden for now as it may not be suitable for young kids
    youtubeId: 'sucZmx4MTUA',
    youtubeUrl: 'https://www.youtube.com/shorts/sucZmx4MTUA',
    customImage: '/assets/aistudio/image_963448d7.png',
    isShort: true,
    titleJa: '赤ん坊を育てた禅僧・白隠慧鶴「そうであるか」',
    titleEn: "The Monk Who Raised a Baby That Wasn't His",
    titleFi: 'Munkki joka kasvatti lapsen jota ei ollut siittänyt',
    authorJa: '白隠慧鶴（臨済宗中興の祖、1686–1769）',
    authorEn: 'Hakuin Ekaku (1686–1769) · Japanese Zen Master',
    authorFi: 'Hakuin Ekaku (1686–1769) · Japanilainen zen-mestari',
    badgeJa: '禅の寓話 · 受容と非執着',
    badgeEn: 'Zen Parable · Radical Acceptance',
    badgeFi: 'Zen-vertaus · Takertumattomuus',
    synopsisJa:
      '約300年前の日本、富士山のふもとの村に尊敬される禅僧・白隠が暮らしていました。ある日、店の娘が身ごもり、真実を言えずに白隠が父親だと告げました。激怒した父親が山を登って問いただすと、白隠は弁解もせずただ「そうであるか」とだけ答えました。',
    synopsisEn:
      'In Japan, almost 300 years ago, a respected monk named Hakuin lived at the foot of Mount Fuji and met false blame only with calm acceptance: "Is that so?"',
    synopsisFi:
      'Noin 300 vuotta sitten Japanissa asunut zen-munkki Hakuin kohtasi väärän syytöksen tyynesti kysymättä: ”Niinkö se on?”',
    coreMoralJa: '評価や誤解に心を乱されず、目の前の命に慈悲を注ぐ。',
    coreMoralEn: 'Non-attachment, radical acceptance, and acting from selfless kindness.',
    coreMoralFi: 'Takertumattomuus, syvä hyväksyntä ja pyyteetön lempeys.',
  },
  {
    id: 'simple-minimalist-life',
    youtubeId: 'C1sAsoJVN1U',
    youtubeUrl: 'https://www.youtube.com/watch?v=C1sAsoJVN1U',
    screenshotImage: '/assets/aistudio/Screenshot_from_2026-11-15_20-28-55_427d4f5a.png',
    screenshotCaptionEn: '“I’m not only a minimalist. I’m a volunteer.”',
    screenshotCaptionJa: '「私はただのミニマリストではない。ボランティアでもある。」',
    screenshotCaptionFi: '”En ole vain minimalisti. Olen myös vapaaehtoinen.”',
    titleJa: 'なぜ私はシンプルなミニマリストの暮らしを選ぶのか',
    titleEn: 'Why I Live a Simple Minimalist Life',
    titleFi: 'Miksi elän yksinkertaista minimalistista elämää',
    authorJa: '生き方のドキュメンタリー · 短編フィルム',
    authorEn: 'Authentic Living Documentary',
    authorFi: 'Dokumenttielokuva aitoudesta',
    badgeJa: '生き方の哲学 · 自分の道',
    badgeEn: 'Minimalist Living · Own Path',
    badgeFi: 'Minimalismi · Oma polku',
    synopsisJa:
      '常識から外れた別の道を選ぶことは、ときに孤独を伴います。周囲は慣れ親しんだ安心へと引き戻そうとしますが、本当に自分の道を歩むためには、自分の感情や願い、心の奥にある原動力と向き合う必要があります。社会が「こうあるべき」と言う姿から離れ、自らの真実を見つめ、一歩ずつ自分のペースと目的を選び取っていく勇気を描いたフィルムです。',
    synopsisEn:
      'Choosing a different path in life, one that breaks away from the norm, can often feel lonely. The pressure to conform is constant, with those around you eager to pull you back to the familiar and the comfortable. So to walk the path that is truly your own, you must first connect with who you are at the deepest level — your emotions, your desires, and what truly drives you. This journey requires stepping away from what society says you should be, and instead discovering your truth for yourself. In the end, life is about making deliberate choices, setting your own pace, and defining your own purpose with each step forward. This film is a reflection on the courage it takes to follow that unique, authentic path, even when the world encourages you to turn back.',
    synopsisFi:
      'Tavallisesta poikkeavan polun valitseminen voi joskus tuntua yksinäiseltä, kun ympäristö vetää takaisin tuttuun ja turvalliseen. Kulkeakseen aidosti omaa tietään on kuunneltava syvimpiä tunteitaan ja arvojaan ja määriteltävä oma tarkoituksensa askel askeleelta.',
    coreMoralJa: '世間の「普通」に流されず、自分の歩幅と目的を自ら選び取る勇気。',
    coreMoralEn: 'Make deliberate choices, set your own pace, and walk your authentic path.',
    coreMoralFi: 'Tee tietoisia valintoja ja kulje omaa aitoa polkuasi omassa tahdissasi.',
  },
  {
    id: 'cheaper-your-pleasures',
    youtubeId: 'Oswc-jAgwgo',
    youtubeUrl: 'https://www.youtube.com/watch?v=Oswc-jAgwgo',
    titleJa: '喜びが素朴であるほど、心は豊かになる｜ミニマリズムの哲学',
    titleEn: 'The Cheaper Your Pleasures, The Richer You’ll Be | Minimalist Philosophy',
    titleFi: 'Mitä edullisempia ilosi ovat, sitä rikkaampi olet | Minimalistinen filosofia',
    authorJa: 'ミニマリズム哲学シリーズ',
    authorEn: 'Minimalist Philosophy Essay',
    authorFi: 'Minimalistinen filosofia',
    badgeJa: '哲学 · 豊かさの本質',
    badgeEn: 'Philosophy · True Abundance',
    badgeFi: 'Filosofia · Todellinen rikkaus',
    synopsisJa:
      'どうすればお金をかけずに満たされるのでしょうか。最小限のものだけで豊かであるとはどういうことでしょうか。過去の多くの哲学者たちがこの問いに向き合い、「喜びがささやかであればあるほど、人は豊かになれる」と語りました。富・欲望・喜びの関係を見つめ直し、物質に頼らない豊かな生き方を探る動画です。',
    synopsisEn:
      "How can we be satisfied without cost? How can we be wealthy with only the bare minimum? Several philosophers of the past shed their light on questions like these. And, according to some, the cheaper your pleasures, the richer you'll be. This video explores different views on wealth, desire, and pleasure and how being ‘rich’ can be pretty cheap (minimalist philosophy).",
    synopsisFi:
      'Miten voimme olla tyytyväisiä ilman suuria kustannuksia ja rikkaita vähällä? Menneiden aikojen filosofit osoittavat, että mitä yksinkertaisempia ilosi ovat, sitä vapaampi ja rikkaampi todellisuudessa olet.',
    coreMoralJa: '小さな自然や日常に喜びを見いだせる人ほど、人生は限りなく豊かになる。',
    coreMoralEn: 'When simple, everyday moments bring you joy, you need very little to feel rich.',
    coreMoralFi: 'Kun yksinkertaiset asiat tuovat iloa, tarvitset vain vähän ollaksesi rikas.',
  },
  {
    id: 'letting-go-true-wealth',
    youtubeId: 'JHcGmiZqKXo',
    youtubeUrl: 'https://www.youtube.com/watch?v=JHcGmiZqKXo',
    titleJa: '手放すことこそ本当の富である理由｜シンプルな暮らしの哲学',
    titleEn: 'Why Letting Go Is True Wealth | Minimalist Philosophy for Simple Living',
    titleFi: 'Miksi irti päästäminen on todellista rikkautta | Yksinkertainen elämä',
    authorJa: 'シンプルな暮らしの哲学',
    authorEn: 'Minimalist Philosophy for Simple Living',
    authorFi: 'Minimalistinen elämänfilosofia',
    badgeJa: '少ないほど豊か · Less Is More',
    badgeEn: 'Philosophy · Less Is More',
    badgeFi: 'Filosofia · Vähemmän on enemmän',
    synopsisJa:
      '私たちはしばしば生きるために必要な以上のモノを抱え込み、周囲の消費ペースに合わせるためだけに時間とエネルギーを費やしてしまいます。なぜ「多いことは少なく、少ないことは豊か（Less is more）」なのか、そして不要なものを手放すことがなぜ本当の富につながるのかを哲学的に紐解きます。',
    synopsisEn:
      'Humans often overburden themselves with all kinds of material possessions, buying much more than we need to stay alive and thriving. Consumerism comes with a price as well, as it requires resources to keep up with the other consumers. This video examines the philosophical side of minimalism and explores why more is less and why less is more, and why letting go is true wealth (minimalist philosophy for simple living).',
    synopsisFi:
      'Ihmiset kuormittavat itseään usein tarpeettomalla tavaralla ja kulutuskilpailulla. Tämä video tarkastelee filosofisesti, miksi vähemmän on enemmän ja miksi irti päästäminen tuo todellisen vapauden ja vaurauden.',
    coreMoralJa: 'モノを手放した余白にこそ、時間・自由・本当の心の富が宿る。',
    coreMoralEn: 'Letting go frees your time, attention, and peace from endless consumer pressure.',
    coreMoralFi: 'Irti päästäminen vapauttaa aikasi ja mielenrauhasi jatkuvalta kulutuspaineelta.',
  },
  {
    id: 'japanese-habits-zero-cost',
    youtubeId: 'aOIDuRiJEBg',
    youtubeUrl: 'https://www.youtube.com/watch?v=aOIDuRiJEBg',
    titleJa: '人生を変えるお金のかからない7つの日本の習慣（フィンランド人YouTuber）',
    titleEn: '7 Japanese Habits That Cost $0 But Change Everything (Finnish YouTuber)',
    titleFi: '7 ilmaista japanilaista tapaa, jotka muuttavat kaiken (Suomalainen YouTubettaja)',
    authorJa: 'フィンランド人YouTuber · 日本の知恵',
    authorEn: 'Finnish YouTuber · Japanese Cultural Wisdom',
    authorFi: 'Suomalainen YouTubettaja · Japanilainen viisaus',
    badgeJa: '日本の知恵 · 起きて半畳寝て一畳',
    badgeEn: 'Japanese Habits · Finnish Perspective',
    badgeFi: 'Japanilaiset tavat · Suomalainen näkökulma',
    synopsisJa:
      '「起きて半畳、寝て一畳、天下取っても二合半（ひとりが快適に暮らすのに必要なのはわずかな畳と一日二合半のご飯だけ）」——この日本のことわざは、どれほど富や権力があっても人が一日に食べられるお米や必要な空間には限りがあり、過剰な贅沢や欲を慎み足るを知ることの大切さを教えてくれます。',
    synopsisEn:
      '“You only need half a tatami mat to stand, one tatami mat to sleep, and even if you rule the world, you only need two and a half cups of rice.” This saying teaches us that a person needs only a few tatami mats to live comfortably, and that even powerful and wealthy people have a limited amount of rice they can eat in a day, so we should avoid excessive luxury and greed.',
    synopsisFi:
      '”Seisomiseen tarvitset vain puoli tatamia, nukkumiseen yhden tatamin, ja vaikka hallitsisit maailmaa, tarvitset vain kaksi ja puoli kupillista riisiä.” Tämä viisas sanonta opettaa kohtuullisuutta ja tyytymistä olennaiseen.',
    coreMoralJa: '起きて半畳、寝て一畳。足るを知ることで欲から自由になる。',
    coreMoralEn: 'Know what is truly enough—simplicity frees us from greed and excess.',
    coreMoralFi: 'Kun tunnet kohtuuden rajan, vapaudut liiallisesta haluamisesta.',
  },
  {
    id: 'nordic-habits-darkest-months',
    youtubeId: 'Sg9WB8XQ85c',
    youtubeUrl: 'https://youtu.be/Sg9WB8XQ85c',
    screenshotImage: '/assets/aistudio/image_3024f4d9.png',
    screenshotCaptionEn: '“There’s no such thing as bad weather, only bad clothing.”',
    screenshotCaptionJa: '「悪い天気などない、あるのは悪い服装だけだ」（北欧のことわざ）',
    screenshotCaptionFi: '”Ei ole huonoa säätä, on vain huono pukeutuminen.”',
    titleJa: '最も暗い冬の季節を乗り越える7つの北欧の習慣（フィンランド人YouTuber）',
    titleEn: '7 Nordic Habits to Get Through the Darkest Months (Finnish YouTuber)',
    titleFi: '7 pohjoismaista tapaa selvitä pimeimmistä kuukausista (Suomalainen YouTubettaja)',
    authorJa: 'フィンランド人YouTuber · 北欧の暮らしとSisu',
    authorEn: 'Finnish YouTuber · Nordic Seasons & Sisu',
    authorFi: 'Suomalainen YouTubettaja · Pohjoinen arki & sisu',
    badgeJa: '北欧の知恵 · 季節と生きる',
    badgeEn: 'Nordic Habits · Winter Routine',
    badgeFi: 'Pohjoismaiset tavat · Talvirutiini',
    synopsisJa:
      '天気が悪く、外に出るために何枚も冬服を着込むのさえ億劫に感じる日もあります。けれどフィンランドの厳しい冬とともに育つことは、「悪い天気などない、あるのは準備不足の服装だけ」「外出を迷う前に毎日の習慣にしてしまう」という季節と調和して生きる知恵を教えてくれます。',
    synopsisEn:
      'There are days when the weather is terrible, everything feels a little more difficult, and we Finns would happily skip the whole process of putting on winter clothes just to leave the house. But we think growing up with these seasons also teaches you a few things about living with them — including the saying: “There’s no such thing as bad weather, only bad clothing.”',
    synopsisFi:
      'On päiviä, jolloin sää on kurja ja talvivaatteiden pukeminen tuntuu työläältä. Mutta pohjoisen vuodenaikojen keskellä kasvaminen opettaa elämään niiden kanssa: kun ulkoilusta tekee rutiinin ja pukeutuu oikein, huonoa säätä ei ole olemassa.',
    coreMoralJa: '環境を嘆くのではなく、適切な備えと習慣でどの季節も前向きに歩む。',
    coreMoralEn: 'Build steady daily routines and prepare well—no weather stops an active spirit.',
    coreMoralFi: 'Hyvä varustus ja arjen rutiini auttavat nauttimaan jokaisesta vuodenajasta.',
  },
  {
    id: 'the-mountain-path',
    youtubeId: 'a7RqVBG4tVQ',
    youtubeUrl: 'https://youtu.be/a7RqVBG4tVQ',
    isShort: false,
    titleJa: 'THE MOUNTAIN PATH · 山道（終南山の隠者たち）',
    titleEn: 'THE MOUNTAIN PATH · 山道',
    titleFi: 'THE MOUNTAIN PATH · 山道 (Vuoristopolku)',
    authorJa: 'ドキュメンタリー · 中国・終南山',
    authorEn: 'Zhongnan Mountains Documentary',
    authorFi: 'Dokumentti · Zhongnan-vuoristo',
    badgeJa: '山林の知恵 · 簡素と覚り',
    badgeEn: 'Solitude & Simplicity · Zhongnan Mountains',
    badgeFi: 'Hiljaisuus & yksinkertaisuus · Zhongnan',
    synopsisJa:
      '中国・終南山の奥深い渓谷へと分け入り、何世紀にもわたって孤独・簡素・覚りの伝統を守り続ける仏教の隠者たちを訪ねる旅。“The Mountain Path”は、私たちの歩む道と、山の修行者たちが体現する時代を超えた静かな叡智を映し出します。',
    synopsisEn:
      'A journey deep into the remote valleys of China’s Zhongnan Mountains to meet Buddhist hermits upholding a centuries-old tradition of solitude, simplicity, and awakening. "The Mountain Path" reveals a deeper perspective on our journey and the timeless wisdom of these hermit practitioners.',
    synopsisFi:
      'Matka syvälle Kiinan Zhongnan-vuoriston syrjäisiin laaksoihin tapaamaan buddhalaisia erakkoja, jotka vaalivat vuosisataista yksinäisyyden, yksinkertaisuuden ja heräämisen perinnettä.',
    coreMoralJa:
      '「食べ物を育て、家を建て、布を織り、必要なものを愛を込めてつくる。ただそれだけ。手は働き、心は愛する。」— @Theravadinbuto',
    coreMoralEn:
      '“Grow food, build a home, weave cloth, make what you need with love. That’s all. Hands to work and hearts to love.” — @Theravadinbuto',
    coreMoralFi:
      '”Kasvata ruoka, rakenna koti, kudo kangas, tee tarvitsemasi rakkaudella. Siinä kaikki. Kädet työhön ja sydän rakastamaan.” — @Theravadinbuto',
  },
  {
    id: 'yodaka-no-hoshi',
    youtubeId: 'N1ZKWJIGFik',
    youtubeUrl: 'https://www.youtube.com/watch?v=N1ZKWJIGFik',
    isShort: false,
    titleJa: 'よだかの星（宮沢賢治）',
    titleEn: 'Yodaka No Hoshi (The Nighthawk Star) by Miyazawa Kenji',
    titleFi: 'Yodaka No Hoshi (Kehrääjätähden tarina) – Kenji Miyazawa',
    authorJa: '宮沢賢治（詩人・童話作家、1896–1933）',
    authorEn: 'Miyazawa Kenji (1896–1933) · Japanese Author & Poet',
    authorFi: 'Kenji Miyazawa (1896–1933) · Japanilainen kirjailija & runoilija',
    badgeJa: '日本文学名作 · 自己の輝き',
    badgeEn: 'Literary Masterpiece · Inner Light',
    badgeFi: 'Klassikkosatu · Sisäinen valo',
    synopsisJa:
      '容姿の不器用さから鳥の仲間たちにいじめられ、どこにも居場所を見いだせなかった夜鷹（よだか）。誰かを傷つけて命を奪うことへの深い痛みに涙し、空の果てを目指して飛び続けた彼は、やがて夜空で静かに青白く燃え続ける美しい星となった。無理に世間に合わせようとするのをやめ、純粋な優しさと光として輝くことを選ぶ魂の物語。',
    synopsisEn:
      'Just like the Nighthawk, who was bullied and shunned but eventually burned as a beautiful, blue star, you can stop trying to "fit" into the material world and choose to burn with the light of pure kindness instead.',
    synopsisFi:
      'Aivan kuten kiusattu ja hyljeksitty kehrääjälintu, joka lopulta syttyi palamaan kauniina, sinisenä tähtenä, voit lakata yrittämästä väkisin sopeutua aineelliseen maailmaan ja valita sen sijaan säteillä puhtaan ystävällisyyden valoa.',
    coreMoralJa: '世間に迎合するのではなく、純粋な思いやりと優しさの光として生きる。',
    coreMoralEn: 'Stop trying to fit in; choose to burn with the light of pure kindness instead.',
    coreMoralFi: 'Älä yritä pakottaa itseäsi muottiin; loista puhtaan ystävällisyyden valona.',
  },
];
