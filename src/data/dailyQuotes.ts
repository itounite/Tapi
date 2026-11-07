export interface DailyQuoteItem {
  day: number;
  week: number;
  weekTitle: {
    ja: string;
    en: string;
    fi: string;
  };
  teacher: {
    ja: string;
    en: string;
    fi: string;
  };
  quote: {
    ja: string;
    en: string;
    fi: string;
  };
  thinkPrompt: {
    ja: string;
    en: string;
    fi: string;
  };
}

export const DAILY_QUOTES: DailyQuoteItem[] = [
  // --- Week 1: Starting the Journey (Simplicity & Beginnings) ---
  {
    day: 1,
    week: 1,
    weekTitle: {
      ja: '第1週：旅立ちのとき（素直さと第一歩）',
      en: 'Week 1: Starting the Journey (Simplicity & Beginnings)',
      fi: 'Viikko 1: Matkan aloitus (Yksinkertaisuus & Alut)'
    },
    teacher: {
      ja: '老子（道徳経）',
      en: 'Lao Tzu (Tao Te Ching)',
      fi: 'Laozi (Daodejing)'
    },
    quote: {
      ja: '千里の道も一歩から始まる。',
      en: 'A journey of a thousand miles begins with a single step.',
      fi: 'Tuhannen mailin matka alkaa yhdestä ainoasta askeleesta.'
    },
    thinkPrompt: {
      ja: 'やってみたいことのために、今日できる「小さな一歩」はなんだろう？',
      en: 'What is one small step you can take today toward something you want to do?',
      fi: 'Mikä on yksi pieni askel, jonka voit ottaa tänään kohti jotain, mitä haluat tehdä?'
    }
  },
  {
    day: 2,
    week: 1,
    weekTitle: {
      ja: '第1週：旅立ちのとき（素直さと第一歩）',
      en: 'Week 1: Starting the Journey (Simplicity & Beginnings)',
      fi: 'Viikko 1: Matkan aloitus (Yksinkertaisuus & Alut)'
    },
    teacher: {
      ja: 'カール・ユング',
      en: 'Carl Jung',
      fi: 'Carl Jung'
    },
    quote: {
      ja: '子どもは大人の言葉ではなく、大人の生き方そのものから学ぶ。',
      en: 'Children are educated by what the grown-up is and not by his talk.',
      fi: 'Lapset oppivat siitä, mitä aikuinen on, eivät hänen puheistaan.'
    },
    thinkPrompt: {
      ja: '見ているだけで学ぶことが多い大人は誰ですか？ その人はどんなことをしていますか？',
      en: 'Who is someone you learn from just by watching them? What do they do?',
      fi: 'Kuka on henkilö, jolta opit vain katsomalla häntä? Mitä hän tekee?'
    }
  },
  {
    day: 3,
    week: 1,
    weekTitle: {
      ja: '第1週：旅立ちのとき（素直さと第一歩）',
      en: 'Week 1: Starting the Journey (Simplicity & Beginnings)',
      fi: 'Viikko 1: Matkan aloitus (Yksinkertaisuus & Alut)'
    },
    teacher: {
      ja: 'ティク・ナット・ハン',
      en: 'Thich Nhat Hanh',
      fi: 'Thích Nhất Hạnh'
    },
    quote: {
      ja: 'マインドフルネス（気づき）はエネルギーです。このエネルギーが、「今ここ」で起きていることを心から味わわせてくれます。',
      en: 'Mindfulness is energy. This energy helps us enjoy what is happening right now.',
      fi: 'Tietoinen läsnäolo on energiaa. Tämä energia auttaa meitä nauttimaan siitä, mitä tapahtuu juuri nyt.'
    },
    thinkPrompt: {
      ja: '目を閉じて、ゆっくり深呼吸を3回してみて。今、まわりでどんなことが感じられますか？',
      en: 'Try closing your eyes and taking three slow breaths. What do you notice right now?',
      fi: 'Kokeile sulkea silmäsi ja ottaa kolme rauhallista hengitystä. Mitä huomaat juuri nyt?'
    }
  },
  {
    day: 4,
    week: 1,
    weekTitle: {
      ja: '第1週：旅立ちのとき（素直さと第一歩）',
      en: 'Week 1: Starting the Journey (Simplicity & Beginnings)',
      fi: 'Viikko 1: Matkan aloitus (Yksinkertaisuus & Alut)'
    },
    teacher: {
      ja: '老子（道徳経）',
      en: 'Lao Tzu (Tao Te Ching)',
      fi: 'Laozi (Daodejing)'
    },
    quote: {
      ja: '他者を知る者は知恵ある者だが、自分自身を知る者こそが真の賢者である。',
      en: 'Knowing others is intelligence; knowing yourself is true wisdom.',
      fi: 'Muiden tunteminen on älykkyyttä; itsensä tunteminen on todellista viisautta.'
    },
    thinkPrompt: {
      ja: 'あなたが自分自身について知っている、あなたを特別にしているところはどんなこと？',
      en: 'What is one thing you know about yourself that makes you special?',
      fi: 'Mikä on yksi asia, jonka tiedät itsestäsi ja joka tekee sinusta erityisen?'
    }
  },
  {
    day: 5,
    week: 1,
    weekTitle: {
      ja: '第1週：旅立ちのとき（素直さと第一歩）',
      en: 'Week 1: Starting the Journey (Simplicity & Beginnings)',
      fi: 'Viikko 1: Matkan aloitus (Yksinkertaisuus & Alut)'
    },
    teacher: {
      ja: 'デヴィッド・ボーム',
      en: 'David Bohm',
      fi: 'David Bohm'
    },
    quote: {
      ja: '違った見方や考え方ができる力は、得られた知識そのものよりもずっと大切である。',
      en: 'The ability to perceive or think differently is more important than the knowledge gained.',
      fi: 'Kyky havainnoida tai ajatella toisin on tärkeämpää kuin saavutettu tieto.'
    },
    thinkPrompt: {
      ja: '物事をいつもと違う新しい目線で見て、気持ちがふっと変わった経験はありますか？',
      en: 'Have you ever seen something in a new way that changed how you felt about it?',
      fi: 'Oletko koskaan nähnyt jonkin asian uudella tavalla, joka muutti tuntemuksiasi siitä?'
    }
  },
  {
    day: 6,
    week: 1,
    weekTitle: {
      ja: '第1週：旅立ちのとき（素直さと第一歩）',
      en: 'Week 1: Starting the Journey (Simplicity & Beginnings)',
      fi: 'Viikko 1: Matkan aloitus (Yksinkertaisuus & Alut)'
    },
    teacher: {
      ja: '老子（道徳経）',
      en: 'Lao Tzu (Tao Te Ching)',
      fi: 'Laozi (Daodejing)'
    },
    quote: {
      ja: '柔らかくしなやかなものが、硬く強ばったものに打ち勝つ。',
      en: 'The soft and weak can overcome the hard and strong.',
      fi: 'Pehmeä ja joustava voi voittaa kovan ja vahvan.'
    },
    thinkPrompt: {
      ja: '無理に力で押すのではなく、優しさやしなやかさで問題を解決できたことはありますか？',
      en: 'Have you ever solved a problem by being gentle instead of forceful?',
      fi: 'Oletko koskaan ratkaissut ongelman olemalla lempeä voiman käyttämisen sijaan?'
    }
  },
  {
    day: 7,
    week: 1,
    weekTitle: {
      ja: '第1週：旅立ちのとき（素直さと第一歩）',
      en: 'Week 1: Starting the Journey (Simplicity & Beginnings)',
      fi: 'Viikko 1: Matkan aloitus (Yksinkertaisuus & Alut)'
    },
    teacher: {
      ja: 'カール・ユング',
      en: 'Carl Jung',
      fi: 'Carl Jung'
    },
    quote: {
      ja: 'すべての大人の心の中には子どもが息づいている。常に新しく生まれ変わり、決して完成しない永遠の子どもが。',
      en: 'In every adult there lurks a child—an eternal child, something that is always becoming, never completed.',
      fi: 'Jokaisessa aikuisessa piilee lapsi — ikuinen lapsi, joka on aina muotoutumassa, ei koskaan valmis.'
    },
    thinkPrompt: {
      ja: '今大好きなことで、大人になってもずっと好きでいたいと思うものは何ですか？',
      en: 'What is something you love to do now that you hope you never stop loving?',
      fi: 'Mitä rakastat tehdä nyt, mitä toivot ettet koskaan lakkaa rakastamasta?'
    }
  },

  // --- Week 2: Growing & Learning ---
  {
    day: 8,
    week: 2,
    weekTitle: {
      ja: '第2週：学びと成長',
      en: 'Week 2: Growing & Learning',
      fi: 'Viikko 2: Kasvu & Oppiminen'
    },
    teacher: {
      ja: '老子（道徳経）',
      en: 'Lao Tzu (Tao Te Ching)',
      fi: 'Laozi (Daodejing)'
    },
    quote: {
      ja: '他者に勝つ者は力があるが、自分に打ち克つ者こそが真の強さを持つ。',
      en: 'Mastering others is strength; mastering yourself is true power.',
      fi: 'Muiden hallitseminen on voimaa; itsensä hallitseminen on todellista mahtavuutta.'
    },
    thinkPrompt: {
      ja: '怒りや不安など、今上手に付き合えるよう練習している気持ちはありますか？',
      en: 'What is one feeling (like anger or fear) you are learning to handle?',
      fi: 'Mikä on yksi tunne (kuten suuttumus tai pelko), jota opettelet käsittelemään?'
    }
  },
  {
    day: 9,
    week: 2,
    weekTitle: {
      ja: '第2週：学びと成長',
      en: 'Week 2: Growing & Learning',
      fi: 'Viikko 2: Kasvu & Oppiminen'
    },
    teacher: {
      ja: '荘子（道家古典）',
      en: 'Zhuangzi (Taoist classic)',
      fi: 'Zhuangzi'
    },
    quote: {
      ja: '私は蝶の夢を見ている人間なのだろうか、それとも人間の夢を見ている蝶なのだろうか？',
      en: 'Am I a person dreaming I am a butterfly—or a butterfly dreaming I am a person?',
      fi: 'Olenko ihminen, joka uneksii olevansa perhonen — vai perhonen, joka uneksii olevansa ihminen?'
    },
    thinkPrompt: {
      ja: 'もしどんな動物の夢でも見られるとしたら、何になってみたい？ それはなぜ？',
      en: 'If you could dream about being any animal, what would it be and why?',
      fi: 'Jos saisit nähdä unta siitä, että olet mikä tahansa eläin, mikä se olisi ja miksi?'
    }
  },
  {
    day: 10,
    week: 2,
    weekTitle: {
      ja: '第2週：学びと成長',
      en: 'Week 2: Growing & Learning',
      fi: 'Viikko 2: Kasvu & Oppiminen'
    },
    teacher: {
      ja: 'カール・ユング',
      en: 'Carl Jung',
      fi: 'Carl Jung'
    },
    quote: {
      ja: '私たちが「想像力で遊ぶこと」から受けている恵みは、計り知れないほど大きい。',
      en: 'The debt we owe to the play of imagination is incalculable.',
      fi: 'Velka, jonka olemme velkaa mielikuvituksen leikille, on mittaamaton.'
    },
    thinkPrompt: {
      ja: 'これまで頭の中で空想したり、自分の手で作ったりした中で、一番ワクワクしたものは何ですか？',
      en: 'What is the most fun thing you have ever imagined or built?',
      fi: 'Mikä on hauskinta, mitä olet koskaan kuvitellut tai rakentanut?'
    }
  },
  {
    day: 11,
    week: 2,
    weekTitle: {
      ja: '第2週：学びと成長',
      en: 'Week 2: Growing & Learning',
      fi: 'Viikko 2: Kasvu & Oppiminen'
    },
    teacher: {
      ja: '老子（道徳経）',
      en: 'Lao Tzu (Tao Te Ching)',
      fi: 'Laozi (Daodejing)'
    },
    quote: {
      ja: '「自分はまだ知らない」と知っている者こそが、最も賢い。',
      en: 'He who knows he does not know is the wisest.',
      fi: 'Hän, joka tietää ettei tiedä, on viisain.'
    },
    thinkPrompt: {
      ja: '「もっと知りたい！」「どうしてだろう？」と好奇心がわくことは何ですか？',
      en: 'What is something you are curious to learn more about?',
      fi: 'Mistä asiasta olet utelias oppimaan lisää?'
    }
  },
  {
    day: 12,
    week: 2,
    weekTitle: {
      ja: '第2週：学びと成長',
      en: 'Week 2: Growing & Learning',
      fi: 'Viikko 2: Kasvu & Oppiminen'
    },
    teacher: {
      ja: 'デヴィッド・ボーム',
      en: 'David Bohm',
      fi: 'David Bohm'
    },
    quote: {
      ja: '対話とは、自分たちの思考の奥底にひそむ思い込みに気づくことのできる場である。',
      en: 'Dialogue is a space where we may see the assumptions which lay beneath the surface of our thoughts.',
      fi: 'Vuoropuhelu on tila, jossa voimme nähdä ajatustemme pinnan alla piilevät oletukset.'
    },
    thinkPrompt: {
      ja: '友達と意見が合わないとき、相手をもっとよく理解するためにどんな質問ができますか？',
      en: 'When you disagree with a friend, what is one thing you could ask them to understand them better?',
      fi: 'Kun olet eri mieltä ystäväsi kanssa, mitä voisit kysyä ymmärtääksesi häntä paremmin?'
    }
  },
  {
    day: 13,
    week: 2,
    weekTitle: {
      ja: '第2週：学びと成長',
      en: 'Week 2: Growing & Learning',
      fi: 'Viikko 2: Kasvu & Oppiminen'
    },
    teacher: {
      ja: '老子（道徳経）',
      en: 'Lao Tzu (Tao Te Ching)',
      fi: 'Laozi (Daodejing)'
    },
    quote: {
      ja: '心が静まりかえっているとき、全世界がその静けさに寄り添う。',
      en: 'To the mind that is still, the whole universe surrenders.',
      fi: 'Mieleeelle, joka on tyyni, koko maailmankaikkeus avautuu ja antautuu.'
    },
    thinkPrompt: {
      ja: 'あなたが一番心が落ち着いて、穏やかになれるのはどんな時ですか？',
      en: 'When do you feel most calm and peaceful?',
      fi: 'Milloin tunnet olosi kaikkein rauhallisimmaksi ja tyyneimmäksi?'
    }
  },
  {
    day: 14,
    week: 2,
    weekTitle: {
      ja: '第2週：学びと成長',
      en: 'Week 2: Growing & Learning',
      fi: 'Viikko 2: Kasvu & Oppiminen'
    },
    teacher: {
      ja: 'ティク・ナット・ハン',
      en: 'Thich Nhat Hanh',
      fi: 'Thích Nhất Hạnh'
    },
    quote: {
      ja: '悲しんでいる人にしてあげられる最も優しく愛情深いことは、ただ隣に寄り添い、一緒に呼吸することです。',
      en: 'One of the simplest and most loving things you can do for someone who feels bad is just to be with them and breathe with them.',
      fi: 'Yksi yksinkertaisimmista ja rakastavimmista teoista pahalta tuntuvalle on vain olla hänen kanssaan ja hengittää hänen rinnallaan.'
    },
    thinkPrompt: {
      ja: 'もし悲しんでいる人がいたら、今日静かにそばに寄り添ってあげられる人は誰ですか？',
      en: 'Who is someone you could sit quietly with today if they were sad?',
      fi: 'Kenen vieressä voisit istua hiljaa tänään, jos hän olisi surullinen?'
    }
  },

  // --- Week 3: Kindness, Love & Connection ---
  {
    day: 15,
    week: 3,
    weekTitle: {
      ja: '第3週：優しさ・愛・つながり',
      en: 'Week 3: Kindness, Love & Connection',
      fi: 'Viikko 3: Ystävällisyys, Rakkaus & Yhteys'
    },
    teacher: {
      ja: 'ルーミー',
      en: 'Rumi',
      fi: 'Rumi'
    },
    quote: {
      ja: '私にとって愛とは、ふたつの杭の間に張られた一本の細い糸でした。しかし今やそれは光の輪へと変わり…すべての存在を包み込むように広がっています。',
      en: 'Love was for me a delicate thread stretched between two adjacent pegs, but now it has been transformed into a halo... expanding to embrace all that ever will be.',
      fi: 'Rakkaus oli minulle herkkä lanka kahden tapin välillä, mutta nyt se on muuttunut sädekehäksi... laajentuen syleilemään kaikkea, mitä koskaan tulee olemaan.'
    },
    thinkPrompt: {
      ja: 'ふたりの間で始まった小さな糸のような思いやりは、どうすればもっと多くの人を包み込むように広がるかな？',
      en: 'What starts as a thread between two people—how can it grow to include more?',
      fi: 'Miten kahden ihmisen välinen hento lanka voi kasvaa koskettamaan useampia?'
    }
  },
  {
    day: 16,
    week: 3,
    weekTitle: {
      ja: '第3週：優しさ・愛・つながり',
      en: 'Week 3: Kindness, Love & Connection',
      fi: 'Viikko 3: Ystävällisyys, Rakkaus & Yhteys'
    },
    teacher: {
      ja: 'ティク・ナット・ハン',
      en: 'Thich Nhat Hanh',
      fi: 'Thích Nhất Hạnh'
    },
    quote: {
      ja: 'ひとりの人を愛することは、すべての人を愛する素晴らしいきっかけです。本当の愛なら…愛の対象は日々大きくなり、やがてすべての人を包み込めるようになります。',
      en: 'To love someone is a very wonderful opportunity for you to love everyone. If it is true love... the object of your love grows every day, until you can embrace everyone.',
      fi: 'Yhden ihmisen rakastaminen on ihana tilaisuus rakastaa kaikkia. Jos se on totta rakkautta... rakkauden kohde kasvaa päivittäin, kunnes pystyt syleilemään kaikkia.'
    },
    thinkPrompt: {
      ja: '誰かひとりを大切に想う気持ちは、どうして他の人たちにも優しくなる手助けになるのかな？',
      en: 'How can loving one person help you become better at loving others, too?',
      fi: 'Miten yhden ihmisen rakastaminen voi auttaa sinua rakastamaan paremmin myös muita?'
    }
  },
  {
    day: 17,
    week: 3,
    weekTitle: {
      ja: '第3週：優しさ・愛・つながり',
      en: 'Week 3: Kindness, Love & Connection',
      fi: 'Viikko 3: Ystävällisyys, Rakkaus & Yhteys'
    },
    teacher: {
      ja: 'デヴィッド・ボーム',
      en: 'David Bohm',
      fi: 'David Bohm'
    },
    quote: {
      ja: '理解することなくして、本当の愛はありえない。',
      en: 'There can be no real love without understanding.',
      fi: 'Ei voi olla todellista rakkautta ilman ymmärrystä.'
    },
    thinkPrompt: {
      ja: 'よく知らない、理解していない相手を心から大切にすることが難しいのはなぜだと思う？',
      en: 'Why do you think it is hard to truly love someone you do not understand?',
      fi: 'Miksi luulet, että on vaikeaa todella rakastaa jotakuta, jota ei ymmärrä?'
    }
  },
  {
    day: 18,
    week: 3,
    weekTitle: {
      ja: '第3週：優しさ・愛・つながり',
      en: 'Week 3: Kindness, Love & Connection',
      fi: 'Viikko 3: Ystävällisyys, Rakkaus & Yhteys'
    },
    teacher: {
      ja: '老子（道徳経）',
      en: 'Lao Tzu (Tao Te Ching)',
      fi: 'Laozi (Daodejing)'
    },
    quote: {
      ja: '最上のリーダーとは、人々がその存在を意識しないようなリーダーである。仕事が成し遂げられたとき、人々は「自分たちの力でやり遂げた」と言う。',
      en: "A leader is best when people barely know he exists… when his work is done, the people say: 'We did it ourselves.'",
      fi: 'Johtaja on parhaimmillaan silloin, kun ihmiset tuskin tietävät hänen olevan olemassa… kun työ on tehty, ihmiset sanovat: ”Teimme sen itse.”'
    },
    thinkPrompt: {
      ja: 'いばったり命令したりせずに、みんなを優しく助けるにはどんな方法があるかな？',
      en: 'How can you help a group without needing to be the boss?',
      fi: 'Miten voit auttaa ryhmää ilman, että sinun tarvitsee olla pomo?'
    }
  },
  {
    day: 19,
    week: 3,
    weekTitle: {
      ja: '第3週：優しさ・愛・つながり',
      en: 'Week 3: Kindness, Love & Connection',
      fi: 'Viikko 3: Ystävällisyys, Rakkaus & Yhteys'
    },
    teacher: {
      ja: 'カール・ユング',
      en: 'Carl Jung',
      fi: 'Carl Jung'
    },
    quote: {
      ja: '子どもに変えてほしいと思うところがあれば、まず自分自身の中で変えられるところがないか見つめ直すべきである。',
      en: 'If there is anything we wish to change in the child, we should first examine it and see whether it is not something that could better be changed in ourselves.',
      fi: 'Jos on jotain, mitä toivomme muuttavamme lapsessa, meidän tulisi ensin tutkia, eikö se ole jotain, mitä voisimme muuttaa itsessämme.'
    },
    thinkPrompt: {
      ja: '「もっとこうなってほしいな」と思う周りの出来事の中で、自分自身の行動で変えられる部分はどこだろう？',
      en: 'Is there something you wish were different? What part of it can you change yourself?',
      fi: 'Onko jotain, mitä toivoisit toisin? Minkä osan siitä voit muuttaa itse?'
    }
  },
  {
    day: 20,
    week: 3,
    weekTitle: {
      ja: '第3週：優しさ・愛・つながり',
      en: 'Week 3: Kindness, Love & Connection',
      fi: 'Viikko 3: Ystävällisyys, Rakkaus & Yhteys'
    },
    teacher: {
      ja: '老子（道徳経）',
      en: 'Lao Tzu (Tao Te Ching)',
      fi: 'Laozi (Daodejing)'
    },
    quote: {
      ja: '相手を十分に信じない者は、相手からも信じてもらえない。',
      en: 'He who does not trust enough will not be trusted.',
      fi: 'Hän, joka ei luota tarpeeksi, ei tule saamaan muiden luottamusta.'
    },
    thinkPrompt: {
      ja: '「信頼できる人」ってどんな人かな？ あなたはどうやって信じる気持ちを行動で表しますか？',
      en: 'What does it mean to be trustworthy? How do you show it?',
      fi: 'Mitä tarkoittaa olla luotettava? Miten osoitat sen?'
    }
  },
  {
    day: 21,
    week: 3,
    weekTitle: {
      ja: '第3週：優しさ・愛・つながり',
      en: 'Week 3: Kindness, Love & Connection',
      fi: 'Viikko 3: Ystävällisyys, Rakkaus & Yhteys'
    },
    teacher: {
      ja: 'ティク・ナット・ハン',
      en: 'Thich Nhat Hanh',
      fi: 'Thích Nhất Hạnh'
    },
    quote: {
      ja: '私たちは、「自分たちはバラバラに離れている」という思い込みの錯覚から目覚めるためにここにいるのです。',
      en: 'We are here to awaken from the illusion of our separateness.',
      fi: 'Olemme täällä heräämäisemme erillisyyden illuusiosta.'
    },
    thinkPrompt: {
      ja: '今日出会ったすべての人と、目に見えない糸でつながっていると想像してみて。接し方はどう変わる？',
      en: 'Imagine an invisible thread connecting you to everyone you met today. How does that change how you treat them?',
      fi: 'Kuvittele näkymätön lanka, joka yhdistää sinut jokaiseen tänään tapaamaasi ihmiseen. Miten se muuttaa tapaasi kohdella heitä?'
    }
  },

  // --- Week 4: Strength & Wonder ---
  {
    day: 22,
    week: 4,
    weekTitle: {
      ja: '第4週：強さと不思議・好奇心',
      en: 'Week 4: Strength & Wonder',
      fi: 'Viikko 4: Voima & Ihmetys'
    },
    teacher: {
      ja: '老子（道徳経）',
      en: 'Lao Tzu (Tao Te Ching)',
      fi: 'Laozi (Daodejing)'
    },
    quote: {
      ja: '誰かと比べたり競ったりせず、ありのままの自分で満ち足りているとき、周りの人は誰もがあなたを敬うようになる。',
      en: "When you are content to be simply yourself and don't compare or compete, everyone will respect you.",
      fi: 'Kun olet tyytyväinen olemaan vain oma itsesi etkä vertaile tai kilpaile, jokainen kunnioittaa sinua.'
    },
    thinkPrompt: {
      ja: '友達とは違っていて、自分が気に入っている「自分らしさ」はどんなところ？',
      en: 'What is something you like about yourself that is different from your friends?',
      fi: 'Mistä asiasta itsessäsi pidät, joka on erilainen kuin ystävilläsi?'
    }
  },
  {
    day: 23,
    week: 4,
    weekTitle: {
      ja: '第4週：強さと不思議・好奇心',
      en: 'Week 4: Strength & Wonder',
      fi: 'Viikko 4: Voima & Ihmetys'
    },
    teacher: {
      ja: 'デヴィッド・ボーム',
      en: 'David Bohm',
      fi: 'David Bohm'
    },
    quote: {
      ja: '個々の存在（個性）は、全体というひとつながりの輪から広がるからこそ成り立っている。',
      en: 'Individuality is only possible if it unfolds from wholeness.',
      fi: 'Yksilöllisyys on mahdollista vain, jos se kumpuaa kokonaisuudesta.'
    },
    thinkPrompt: {
      ja: '自分自身というひとりでありながら、家族やクラスという大きなつながりとどんな風に結ばれているかな？',
      en: 'How are you connected to your family or your class, even while being your own person?',
      fi: 'Miten olet yhteydessä perheeseesi tai luokkaasi, samalla kun olet täysin oma itsesi?'
    }
  },
  {
    day: 24,
    week: 4,
    weekTitle: {
      ja: '第4週：強さと不思議・好奇心',
      en: 'Week 4: Strength & Wonder',
      fi: 'Viikko 4: Voima & Ihmetys'
    },
    teacher: {
      ja: '道元禅師',
      en: 'Dogen (Zen)',
      fi: 'Dōgen (Zen)'
    },
    quote: {
      ja: 'ただ静かに坐り、「考えないこと」を思う。（非思量）',
      en: "Just sit quietly and think 'not thinking.'",
      fi: 'Istu vain hiljaa ja ajattele ”ei-ajattelevaista”.'
    },
    thinkPrompt: {
      ja: '1分間だけ、何も考えようとせずにじっと座ってみて。どんなことが起きた？',
      en: 'Try sitting still for one minute without trying to think about anything. What happened?',
      fi: 'Kokeile istua liikkumatta minuutin ajan yrittämättä ajatella mitään. Mitä tapahtui?'
    }
  },
  {
    day: 25,
    week: 4,
    weekTitle: {
      ja: '第4週：強さと不思議・好奇心',
      en: 'Week 4: Strength & Wonder',
      fi: 'Viikko 4: Voima & Ihmetys'
    },
    teacher: {
      ja: '老子（道徳経）',
      en: 'Lao Tzu (Tao Te Ching)',
      fi: 'Laozi (Daodejing)'
    },
    quote: {
      ja: '問題が起こる前に整え、乱れる前に治めておく。',
      en: 'Treat things before they exist. Regulate things before disorder begins.',
      fi: 'Käsittele asioita ennen kuin ne ilmenevät. Järjestä asiat ennen kuin epäjärjestys alkaa.'
    },
    thinkPrompt: {
      ja: '明日を笑顔で気持ちよく迎えるために、今準備できることは何があるかな？',
      en: 'What is something you can prepare for now so tomorrow is easier?',
      fi: 'Mitä voit valmistella nyt, jotta huomisesta tulisi helpompi?'
    }
  },
  {
    day: 26,
    week: 4,
    weekTitle: {
      ja: '第4週：強さと不思議・好奇心',
      en: 'Week 4: Strength & Wonder',
      fi: 'Viikko 4: Voima & Ihmetys'
    },
    teacher: {
      ja: 'ティク・ナット・ハン',
      en: 'Thich Nhat Hanh',
      fi: 'Thích Nhất Hạnh'
    },
    quote: {
      ja: 'ほほえみ、呼吸し、そしてゆっくりと歩もう。',
      en: 'Smile, breathe, and go slowly.',
      fi: 'Hymyile, hengitä ja etene hitaasti.'
    },
    thinkPrompt: {
      ja: '今日何かひとつのことを、あえていつもよりゆっくり丁寧にやってみませんか？ どんな気分になる？',
      en: 'Can you try doing one thing slowly today, just to see how it feels?',
      fi: 'Voitko kokeilla tehdä yhden asian hitaasti tänään, vain nähdäksesi miltä se tuntuu?'
    }
  },
  {
    day: 27,
    week: 4,
    weekTitle: {
      ja: '第4週：強さと不思議・好奇心',
      en: 'Week 4: Strength & Wonder',
      fi: 'Viikko 4: Voima & Ihmetys'
    },
    teacher: {
      ja: 'カール・ユング',
      en: 'Carl Jung',
      fi: 'Carl Jung'
    },
    quote: {
      ja: '何時間もの時間がまるで数分のようにあっという間に過ぎ去った、あの夢中になった遊びは何でしたか？',
      en: 'What did you do as a child that made the hours pass like minutes?',
      fi: 'Mitä teit lapsena, mikä sai tunnit kulumaan kuin minuutit?'
    },
    thinkPrompt: {
      ja: '時間を忘れるくらい夢中になれる、大好きなことは何ですか？',
      en: 'What activity makes you lose track of time in a good way?',
      fi: 'Mikä toiminta saa sinut unohtamaan ajan kulumisen hyvällä tavalla?'
    }
  },
  {
    day: 28,
    week: 4,
    weekTitle: {
      ja: '第4週：強さと不思議・好奇心',
      en: 'Week 4: Strength & Wonder',
      fi: 'Viikko 4: Voima & Ihmetys'
    },
    teacher: {
      ja: 'デヴィッド・ボーム',
      en: 'David Bohm',
      fi: 'David Bohm'
    },
    quote: {
      ja: '思考は私たちの世界を作り出しておきながら、「自分は何もしていない」と平気で言う。',
      en: "Thought creates our world, and then says 'I didn't do it.'",
      fi: 'Ajatus luo maailmamme ja sanoo sitten: ”En minä sitä tehnyt.”'
    },
    thinkPrompt: {
      ja: '頭の中のひとつの思い込みが、気づかないうちに行動を変えてしまった経験はありませんか？',
      en: 'Have you ever had a thought that changed how you acted, without even realizing it at first?',
      fi: 'Onko sinulla koskaan ollut ajatusta, joka muutti toimintaasi, edes huomaamatta sitä heti?'
    }
  },
  {
    day: 29,
    week: 4,
    weekTitle: {
      ja: '第4週：強さと不思議・好奇心',
      en: 'Week 4: Strength & Wonder',
      fi: 'Viikko 4: Voima & Ihmetys'
    },
    teacher: {
      ja: '老子（道徳経）',
      en: 'Lao Tzu (Tao Te Ching)',
      fi: 'Laozi (Daodejing)'
    },
    quote: {
      ja: '物事の終わりにも、始めたときと同じ慎重さと心を保っていれば、決して失敗することはない。',
      en: 'Remain careful to the end as in the beginning and you will not fail.',
      fi: 'Pysy huolellisena loppuun asti aivan kuten alussa, etkä epäonnistu.'
    },
    thinkPrompt: {
      ja: '今週、最後まで丁寧にやり遂げたいことやプロジェクトは何ですか？',
      en: 'What is a project you can finish this week by staying careful until the very end?',
      fi: 'Mikä on projekti, jonka voit saattaa loppuun tällä viikolla pysymällä huolellisena aivan loppuun saakka?'
    }
  },
  {
    day: 30,
    week: 4,
    weekTitle: {
      ja: '第4週：強さと不思議・好奇心',
      en: 'Week 4: Strength & Wonder',
      fi: 'Viikko 4: Voima & Ihmetys'
    },
    teacher: {
      ja: '老子（道徳経）',
      en: 'Lao Tzu (Tao Te Ching)',
      fi: 'Laozi (Daodejing)'
    },
    quote: {
      ja: '強さを知った上で優しさを保つ者は、世界をつなぐ清らかな流れとなる…そして再び幼子のような純粋さに立ち戻る。',
      en: 'He who, having experienced the masculine nature, preserves in himself the feminine, will become a universal channel… He will become a little child again.',
      fi: 'Hän, joka kokeneena voiman säilyttää itsessään lempeyden, tulee universaaliksi virraksi… Hänestä tulee jälleen pieni lapsi.'
    },
    thinkPrompt: {
      ja: '成長して背が伸びても、幼い子どものように好奇心いっぱい、オープンな心でいるとはどういうことだろう？',
      en: 'What does it mean to stay curious and open like a little child, even as you grow?',
      fi: 'Mitä tarkoittaa pysyä uteliaana ja avoimena pienen lapsen tavoin, vaikka vartut aikuiseksi?'
    }
  },

  // --- Day 31: Special Day (Whenever month has 31 days) ---
  {
    day: 31,
    week: 5,
    weekTitle: {
      ja: '31日：生涯の言葉（特別マントラ）',
      en: 'Day 31: Lifelong Mantra & Blessing',
      fi: 'Päivä 31: Elämän mantra & Siunaus'
    },
    teacher: {
      ja: 'Nobody（誰でもない、あなた自身の心の声）',
      en: 'Nobody',
      fi: 'Nobody'
    },
    quote: {
      ja: '私は愛そのもの。私の中には愛がある。私は愛されるにふさわしい。',
      en: 'I am love. I have love. I deserve love.',
      fi: 'Minä olen rakkaus. Minussa on rakkautta. Ansaitsen rakkautta.'
    },
    thinkPrompt: {
      ja: 'このマントラ（心の言葉）を、これからの人生ずっと、心のお守りとして持ち続けてください。',
      en: 'Carry this mantra for the rest of your life.',
      fi: 'Kanna tätä mantraa mukanasi koko loppuelämäsi.'
    }
  }
];
