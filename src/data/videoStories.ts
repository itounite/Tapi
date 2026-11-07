export interface VideoStoryItem {
  id: string;
  youtubeId: string;
  youtubeUrl: string;
  isShort?: boolean;
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
    youtubeId: 'sucZmx4MTUA',
    youtubeUrl: 'https://www.youtube.com/shorts/sucZmx4MTUA',
    isShort: true,
    titleJa: '赤ん坊を育てた禅僧・白隠慧鶴「そうであるか」',
    titleEn: "The Monk Who Raised a Baby That Wasn't His",
    titleFi: "Munkki joka kasvatti lapsen jota ei ollut siittänyt",
    authorJa: '白隠慧鶴（臨済宗中興の祖、1686–1769）',
    authorEn: 'Hakuin Ekaku (1686–1769) · Japanese Zen Master',
    authorFi: 'Hakuin Ekaku (1686–1769) · Japanilainen zen-mestari',
    badgeJa: '禅の寓話 · 受容と非執着',
    badgeEn: 'Zen Parable · Radical Acceptance',
    badgeFi: 'Zen-vertaus · Takertumattomuus',
    synopsisJa: '身に覚えのない赤ん坊の父親だと名指しされ、町中から激しい非難を浴びながらも、ただ一言「そうであるか」と静かに引き取り、愛情を注いで育て上げた白隠禅師。真実が明かされた時も動じることなく「そうであるか」と子を返したという。執着の手放し、大いなる受容（ラディカル・アクセプタンス）、そして自我（エゴ）の脱却を説く不朽の教え。',
    synopsisEn: 'A Japanese Zen master, Hakuin Ekaku (1686–1769) who revitalized the Rinzai school of Zen. The famous "Is that so?" parable is attributed to him and illustrates the Zen concepts of non-attachment, radical acceptance, and shedding the ego.',
    synopsisFi: 'Japanilainen zen-mestari Hakuin Ekaku (1686–1769), joka elvytti Rinzai-zenin. Kuuluisa ”Niinkö se on?” -vertaus liittyy häneen ja ilmentää takertumattomuuden, radikaalin hyväksymisen ja egon häivyttämisen syvää viisautta.',
    coreMoralJa: '評価や誤解に心を乱されず、目の前の命に慈悲を注ぐ。',
    coreMoralEn: 'Non-attachment, radical acceptance, and acting from selfless kindness.',
    coreMoralFi: 'Takertumattomuus, syvä hyväksyntä ja pyyteetön lempeys.'
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
    synopsisJa: '容姿の不器用さから鳥の仲間たちにいじめられ、どこにも居場所を見いだせなかった夜鷹（よだか）。誰かを傷つけて命を奪うことへの深い痛みに涙し、空の果てを目指して飛び続けた彼は、やがて夜空で静かに青白く燃え続ける美しい星となった。無理に世間に合わせようとするのをやめ、純粋な優しさと光として輝くことを選ぶ魂の物語。',
    synopsisEn: 'Just like the Nighthawk, who was bullied and shunned but eventually burned as a beautiful, blue star, you can stop trying to "fit" into the material world and choose to burn with the light of pure kindness instead.',
    synopsisFi: 'Aivan kuten kiusattu ja hyljeksitty kehrääjälintu, joka lopulta syttyi palamaan kauniina, sinisenä tähtenä, voit lakata yrittämästä väkisin sopeutua aineelliseen maailmaan ja valita sen sijaan säteillä puhtaan ystävällisyyden valoa.',
    coreMoralJa: '世間に迎合するのではなく、純粋な思いやりと優しさの光として生きる。',
    coreMoralEn: 'Stop trying to fit in; choose to burn with the light of pure kindness instead.',
    coreMoralFi: 'Älä yritä pakottaa itseäsi muottiin; loista puhtaan ystävällisyyden valona.'
  }
];
