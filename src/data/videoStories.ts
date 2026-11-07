export interface VideoStoryItem {
  id: string;
  youtubeId: string;
  youtubeUrl: string;
  customImage?: string;
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
    customImage: '/assets/aistudio/image_963448d7.png',
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
    synopsisJa: '約300年前の日本、富士山のふもとの村に尊敬される禅僧・白隠が暮らしていました。ある日、店の娘が身ごもり、真実を言えずに白隠が父親だと告げました。激怒した父親が山を登って問いただすと、白隠は弁解もせずただ「そうであるか」とだけ答えました。赤ん坊が生まれると寺に預けられ、評判が地に落ちる中、白隠は近所に乳を乞い、慈しみ育てました。一年後、娘は本当の父親は魚屋の若者だと告白。店主は深く詫びて赤ん坊を返してほしいと頼むと、白隠はただ「そうであるか」と優しく子を手渡し、何事もなかったかのように掃除へ戻りました。',
    synopsisEn: 'In Japan, almost 300 years ago, a respected monk named Hakuin lived in a village at the foot of Mount Fuji. When a shopkeeper\'s daughter was going to have a baby and was afraid to tell the truth, she named Hakuin as the father. The angry shopkeeper dragged her up the mountain, and Hakuin said only, "Is that so?"—he did not argue or explain. When the baby was born, the family handed it to him, and he became the baby\'s caretaker, begging neighbors for milk and rocking the child to sleep while his reputation melted away. A year later, the girl finally told the truth—the father was a young man from the fish market—and the shopkeeper begged forgiveness and asked for the baby back. Hakuin simply said, "Is that so?", handed the baby over, and went back to sweeping.',
    synopsisFi: 'Noin 300 vuotta sitten Japanissa, Fuji-vuoren juurella asui arvostettu zen-munkki Hakuin. Kun kauppiaan tytär tuli raskaaksi ja pelkäsi kertoa totuutta, hän nimesi Hakuinin lapsen isäksi. Vihainen kauppias raahasi tyttärensä vuorelle, johon Hakuin sanoi vain rauhallisesti: ”Niinkö se on?” – väittelemättä tai selittelemättä. Kun lapsi syntyi, perhe jätti sen Hakuinille. Hänestä tuli lapsen hellä hoitaja, joka pyysi naapureilta maitoa ja tuuditti lasta uneen maineensa murentuessa. Vuotta myöhemmin tyttö paljasti totuuden – oikea isä oli kalatorin nuorukainen. Kauppias pyysi anteeksi ja aneli lasta takaisin. Hakuin totesi vain: ”Niinkö se on?”, ojensi lapsen takaisin ja jatkoi lakaisemistaan.',
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
