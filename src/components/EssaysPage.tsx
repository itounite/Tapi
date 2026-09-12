import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Clock, ArrowRight, ArrowLeft } from 'lucide-react';
import { Language } from '../types';

import tapiSupportImg from '../assets/images/tapi_essay_support.png';
import tapiRiceImg from '../assets/images/tapi_essay_rice.png';
import tapiDanceImg from '../assets/images/tapi_essay_dance.png';
import turtleStickerImg from '../assets/images/turtle_sticker.jpg';

interface EssaysPageProps {
  lang: Language;
  onNavigate: (path: string) => void;
}

interface EssayImage {
  src: string;
  alt: string;
  captionJa?: string;
  captionEn?: string;
  captionFi?: string;
  credit?: {
    text: string;
    url: string;
  };
}

interface Essay {
  id: number;
  tagEn: string;
  tagJa: string;
  tagFi: string;
  titleEn: string;
  titleJa: string;
  titleFi: string;
  readTimeEn: string;
  readTimeJa: string;
  readTimeFi: string;
  image?: EssayImage;
  contentJa: string[];
  contentEn: string[];
  contentFi: string[];
}

export default function EssaysPage({ lang, onNavigate }: EssaysPageProps) {
  // View mode can be 'ja' | 'en' | 'fi' | 'bilingual'
  const [viewMode, setViewMode] = useState<'ja' | 'en' | 'fi' | 'bilingual'>('bilingual');

  // Sync initial view mode when outer lang changes
  useEffect(() => {
    if (lang === 'fi') {
      setViewMode('fi');
    } else if (lang === 'en') {
      setViewMode('en');
    } else {
      setViewMode('ja');
    }
  }, [lang]);

  const essays: Essay[] = [
    {
      id: 1,
      tagEn: 'Scientific Adaptation',
      tagJa: '科学的考察',
      tagFi: 'Tieteellinen sopeutuminen',
      titleEn: 'Environmental Adaptation of Deep Sea Organisms',
      titleJa: '自然界における環境変化と深海生物の進化・適応能力',
      titleFi: 'Syvänmeren eliöiden evoluutio ja ympäristöön sopeutuminen',
      readTimeEn: '5 min read',
      readTimeJa: '読了時間 約5分',
      readTimeFi: 'Lukuajaksi n. 5 min',
      image: {
        src: turtleStickerImg,
        alt: 'Jockomo Nature Sea Turtle Sticker',
        captionJa: '自然界の適応と進化を象徴するウミガメのインレイステッカー',
        captionEn: 'Sea turtle inlay sticker symbolizing marine life adaptation and evolution',
        captionFi: 'Merikilpikonnan helmiäiskuviointi kuvaamassa merieliöiden sopeutumista ja evoluutiota',
        credit: {
          text: 'Jockomo Nature Sea Turtle Sticker',
          url: 'https://www.thomann.fi/jockomo_nature_sea_turtle_sticker.htm'
        }
      },
      contentJa: [
        '自然界では、環境の変化が生物に与える影響は非常に大きい。生物は、どのような環境でも生存期間に、絶えず適応し進化してきた。その過程で、生命は極めて適切な適応能力を発揮し、過酷な環境でも生き抜くための工夫をしている。まず、環境の変化が生物にどのような影響を与えるかを考えることが重要だ。',
        '例えば、海洋の深さによる水圧の影響は、生物にとって大きな挑戦となる。このように、水圧の変化に対して生物がどのように適応してきたかが、深海生物の進化のカギを握っている。',
        '深海魚は、その限界な環境に適応する非常にために特殊な特徴を持っている。深海では、光が当たらず、驚くような水圧、低温、酸素不足など、多くの厳しい条件が揃っている。その中で生き抜くために圧力に耐えるようになったり、深海魚は体を巨大化させたり、発光器官を持つようになった。',
        '発光する魚たちは、光のない深海で獲物を引き寄せるために発光器官を使う。光を発することで、エサをおびき寄せ、暗闇の中で効率よく狩りを行うことができる。その代わりに脂肪を減らして浮力を調整している。浮き袋が破裂してしまうリスクを恐れて、浮力を脂肪で調整する方法を進化させたのだ。',
        'また、深海魚はその体の構造も異なる。深海水圧に配慮するため、体を柔軟で強靭に保つ必要があり、硬い骨構造を持たない魚が多い。骨が柔らかければ、圧力がかかっても体が壊れにくいので、深海での生活に適応している。その中でも特に注目すべきは、タカアシガニのような生物だ。',
        'タカアシガニは深海に観察する甲殻類で、深海の高い水圧に耐えられるだけでなく、陸上に上がっても生き延びることができる。タカアシガニが浮き袋や肺のような気体を含んだ器官を持たないためだ。気体を含む器官がないため、水圧の変化をほとんど受けない。',
        'タカアシガニの適応は、環境の変化に対する生物の強靭な適応力を象徴している。海という環境でも生きられるだけでなく、陸上にも適応できるという柔軟さを持っている。進化とは、環境に最適な形態や機能を持つ個体が生き残り、その遺伝子を次世代に伝えることによって、種全体がその環境に適応していく過程だ。',
        '深海魚やタカアシガニのような生物が持つ特有な特徴は、何百万年もの進化の結果である。進化の過程では、遺伝的変異が重要な役割を足たす。環境の変化に適応するためには、偶然に起こる遺伝的変異が環境に有利な形で作用し、それがやがて種全体に広がることで、新たな適応が生まれる。',
        '環境の変化が生物に与える影響は非常に大きく、それに対して適応していくかが生存の鍵を定めている。深海魚やタカアシガニは、限界な環境に適応するために進化し、独自の特徴を持つようになったのだ。'
      ],
      contentEn: [
        'In the natural world, environmental changes exert an immense influence on living organisms. Throughout their existence, organisms have continuously adapted and evolved to survive in diverse conditions. Through this process, life exhibits an exceptional capacity for adaptation, developing ingenious strategies to endure even the most hostile environments. First, it is crucial to understand how these environmental shifts impact living systems.',
        'For instance, the water pressure determined by ocean depth poses a formidable challenge. Thus, how organisms have adapted to these shifting pressures holds the key to the evolution of deep-sea life.',
        'Deep-sea fish possess highly specialized traits to survive in extreme habitats. The deep ocean presents an array of harsh conditions: a total absence of light, crushing pressure, near-freezing temperatures, and severe oxygen deprivation. To survive, deep-sea fish have developed pressure tolerance, gigantism, or bioluminescent organs.',
        'These bioluminescent fish use their light-emitting organs to lure prey in the pitch-black depths. By producing light, they can efficiently hunt in the dark. Conversely, some species have reduced their body fat to regulate buoyancy. Fearing the risk of their swim bladders rupturing, they evolved to adjust their buoyancy using lipids instead of gas.',
        'Furthermore, the skeletal structures of deep-sea fish are distinct. To cope with extreme deep-sea pressure, they must keep their bodies flexible and resilient; hence, many lack rigid bone structures. Having pliable bones prevents their bodies from collapsing under immense pressure, facilitating deep-sea survival. Among these, the Japanese spider crab (Takaashigani) is particularly noteworthy.',
        'The Japanese spider crab is a deep-sea crustacean that not only withstands high deep-sea pressures but can also survive when brought to land. This is because it lacks any gas-filled organs, such as swim bladders or lungs. Without gas-filled cavities, its body is virtually unaffected by changes in external pressure.',
        'The adaptation of the spider crab exemplifies the resilient adaptive power of living organisms. It possesses the flexibility to survive not only in marine environments but also on land. Evolution is a process in which individuals with traits best suited to their environment survive, passing those genes to the next generation, thereby adapting the entire species.',
        'The unique characteristics of deep-sea fish and the Japanese spider crab are the results of millions of years of evolution. Genetic mutations play a vital role in this process. To cope with environmental shifts, random genetic mutations occasionally offer favorable advantages, eventually spreading through the population to form new adaptations.',
        'Environmental variations have a profound impact, and whether organisms can successfully adapt defines their survival. Deep-sea fish and spider crabs have evolved precisely to thrive in these extreme environments, developing their own remarkable characteristics.'
      ],
      contentFi: [
        'Luonnossa ympäristönmuutokset vaikuttavat eliöihin valtavasti. Koko olemassaolonsa ajan organismit ovat jatkuvasti sopeutuneet ja kehittyneet selviytyäkseen mitä erilaisimmissa olosuhteissa. Tässä prosessissa elämä osoittaa hämmästyttävää kekseliäisyyttä ja sopeutumiskykyä vaativimmissakin ympäristöissä. Ensin on ymmärrettävä, kuinka nämä muutokset vaikuttavat elollisiin järjestelmiin.',
        'Esimerkiksi valtameren syvyyden aiheuttama musertava vedenpaine on eliöille ankara haaste. Kuinka organismit ovat sopeutuneet näihin paineen vaihteluihin, onkin syvänmeren elämän evoluution ehdoton avainkysymys.',
        'Syvänmeren kaloilla on erittäin erikoistuneita piirteitä äärimmäisissä elinympäristöissä selviytymiseen: täydellinen pimeys, valtava paine, jäätävä kylmyys ja hapenpuute. Selviytyäkseen ne ovat kehittäneet paineensietokykyä, jättikasvua ja valoa hohtavia elimiä.',
        'Valoa tuottavat kalat käyttävät valoelimiään houkutellakseen saalista pilkkopimeässä. Toisaalta monet lajit säätelevät nostettaan rasvan avulla välttääkseen uimarakon vaarallisen repeämisen vedenpaineen vaihdellessa.',
        'Myös syvänmeren kalojen luusto on aivan erilainen. Paineen kestämiseksi kehojen on oltava joustavia, joten monilta puuttuu kova luuranko. Pehmeät ja kimmoisat luut estävät kehoa murtumasta paineen alla. Erityisen kiehtova esimerkki on japanilainen jättiläistaskurapu (Takaashigani).',
        'Jättiläistaskurapu sietää paitsi valtavaa syvyyksien vedenpainetta, se voi selviytyä jopa kuivalle maalle tuotuna. Tämä johtuu siitä, ettei sillä ole kaasulla täytettyjä elimiä kuten uimarakkoa tai keuhkoja. Ilman kaasutaskuja paineenvaihtelut eivät vahingoita sitä.',
        'Taskuravun sopeutuminen kuvastaa elävien organismien sitkeää elinvoimaa. Sillä on kyky selviytyä meressä ja joustavuutta elää maalla. Evoluutio on prosessi, jossa ympäristöön parhaiten sopeutuvat yksilöt selviytyvät ja siirtävät geeninsä seuraavalle sukupolvelle.',
        'Syvänmeren kalojen ja jättiläistaskuravun poikkeukselliset ominaisuudet ovat miljoonien vuosien evoluution hedelmää, jossa hyödylliset geneettiset mutaatiot vakiintuvat osaksi lajin perimää.',
        'Ympäristönmuutokset ovat voimakkaita, ja kyky sopeutua ratkaisee elämän jatkumisen. Syvänmeren eliöt ovat kehittyneet loistamaan äärimmäisissä oloissa omilla ainutlaatuisilla tavoillaan.'
      ]
    },
    {
      id: 2,
      tagEn: 'Philosophy & Imagination',
      tagJa: '創作とイマジネーション',
      tagFi: 'Luovuus ja mielikuvitus',
      titleEn: 'Dance',
      titleJa: 'ダンス',
      titleFi: 'Tanssi (Dance)',
      readTimeEn: '4 min read',
      readTimeJa: '読了時間 約4分',
      readTimeFi: 'Lukuajaksi n. 4 min',
      image: {
        src: tapiDanceImg,
        alt: 'King Tapioka Smiling and Dancing (ニコ〜)',
        captionJa: '『ニコ〜』— 陽気な音楽に合わせてペン先で踊る笑顔のたぴおか王',
        captionEn: '“Niko~ (Beaming Smile)” — King Tapioka smiling and dancing at the tip of the pen to cheerful music',
        captionFi: '”Niko~ (Hymy)” – Kuningas Tapioka tanssimassa ja hymyilemässä iloisen musiikin tahtiin'
      },
      contentJa: [
        '自分が一番得意なことは何かと聞かれたら、それはおそらく「想像力」だと思う。',
        '小学2年生のとき、僕は学年で一番足が速かった。しかし3年生になってから、自分のオリジナルキャラクターの漫画を描くことに没頭するあまり、それまで掛け持ちしていたバスケットボールと野球のスポーツチームを両方とも辞めてしまった。これはおそらく、僕の小学校生活における最大の失敗だった。スポーツをやめたことで足はすっかり鈍くなり、走る速さも平均レベルまで落ちてしまった。しかし、その代わりに僕の手元には、絵を描くための豊かな想像力だけが残った。',
        '先生は「君のユーモアと想像力はみんなを笑顔にするね！（ユーモアのセンスが抜群だ）」と言ってくれた。また、海外の人からも、スポーツを諦めた代わりに抜群の想像力を手に入れたんだね、と言われたことがある。確かに、学校の国語の授業で詩を書いたときも、「山田君の書く詩は、日常が描かれていて面白い」と褒められた。だから、想像力こそが僕の1番の強みだと思っている。',
        '僕の想像力から生まれたキャラクター「たぴおか王」は、最初はノートの隅の落書きにすぎなかった。しかし描いているうちに、まるで自分の子供のように思えてきて、親心のようなものが芽生えてきた。そこでタブレットを購入し、それからはずっと絵を描き続けている。',
        '今回のフィンランド旅行に向けて、僕は過去3ヶ月間、たぴおか王のオリジナルグッズ制作に励んできた。それらを作った理由は、フィンランドで販売するためだ。朝の9時、賑やかな公園で机を運び、ディスプレイを設置し、つたない英語で接客を始めた。僕はこのような生き方がとても好きだ。想像力があれば、できることは無限にある。今書いているこのエッセイもそうだ。絵を描くだけでなく、ストーリーの途中にギャグを挟んだり、新しい料理に挑戦したりするのにも想像力を使っている。人間にとって頭をよく使うことは大切だ。考え、考え、考え抜くこと。',
        '絵を描くときは、いつも「エンターテイナー」のような陽気な音楽をかけながら描いている。僕は決して絵が上手なわけではないけれど、デザインにおいて自分なりの工夫を凝らし、全力でクリエイティブであろうとしている。タブレットにペンを置き、どっかと腰を下ろす。すると、僕のキャラクターたちがペン先とともに動き、踊り出す。彼らは走り、笑い、泣く。僕には彼らを止めることはできないし、止めるつもりもない。',
        'それが、僕の頭の中の想像の世界だ。みんな、僕の頭の中に生きている。誰かに怒られて落ち込んでいるときも、嬉しくてワクワクしているときも、彼らはいつも僕のそばにいてくれる。まるで運命共同体だ。そうやって考え、悩み、笑い、泣きながら、今という瞬間を駆け抜けている。誰よりも早く自分の世界に入り込めるということを、今の僕は誇りに思っている。'
      ],
      contentEn: [
        'If I had to say what I am best at, it would probably be imagination.',
        'In the second grade, I was the fastest runner in my grade, but from the third grade on, I spent so much time drawing cartoons of my characters that I dropped both the basketball and baseball sports teams I had been taking concurrently. This was probably the biggest mistake I made in my elementary school life. My legs had become sluggish from quitting my sports, and I had dropped to about medium speed. But instead, I only had the imagination to draw.',
        'My teacher said, “Your humor and imagination make people smile! (Your humor is outstanding.)” and people from overseas have told me that my imagination may be outstanding in exchange for sports in some way. Indeed, when I write poems in my Japanese class at school, they also say, “The poems you write, Mr. Yamada, are interesting because they include everyday life.” So I think imagination is number one.',
        'The character “King Tapioca,” a product of my imagination, was originally nothing more than a scribble in a notebook. But as I was writing it, I felt like my child, which might be said to be a parent\'s heart. So I bought a tablet and have been drawing pictures all the time.',
        'For this trip to Finland, I have been working hard for the past three months to create original goods for the King of Tapioca. The reason why I have been making them is to sell them in Finland. I started at 9:00 a.m. in a busy park, carrying desks, setting up the display, and serving customers in broken English. I enjoy this kind of life. There are so many things I can do with my imagination. This is true even for this essay I am writing now. I use it not only to draw pictures, but also to make a gag in the middle of a story, or to try out a new dish. It is important for human beings to use their brains well. Think, think, think.',
        'Whenever I paint, I always write while playing cheerful music like “Entertainer.” I may not be a good artist, but I can be creative in my designs, so I try my best to be creative in my own way. I put the pen on the tablet and sit down with a thud. Then my characters move and dance with the pen. They run, laugh, and cry. I can\'t stop them, and I have no desire to stop them.',
        'That\'s how I imagine it in my head. Everyone is in my head. They are with me when I am depressed because someone is mad at me, or when I am happy and excited. It\'s like a community of fate. I think, worry, laugh, cry, and run through the present like that. I am proud now that I think that I am entering my own world faster than anyone else.'
      ],
      contentFi: [
        'Jos minun pitäisi sanoa, missä olen paras, se olisi luultavasti mielikuvitus.',
        'Toisella luokalla olin ikäluokkani nopein juoksija. Kolmannelta luokalta alkaen kuitenkin vietin niin paljon aikaa omien hahmojeni sarjakuvien piirtämiseen, että jätin sekä koripallo- että baseball-joukkueet. Se oli ehkä alakouluvuosieni suurin erehdys: jalkani hidastuivat keskitasolle. Mutta sen sijaan minulle jäi ehtymätön mielikuvitus piirtämiseen.',
        'Opettajani sanoi: ”Huumorisi ja mielikuvituksesi saavat ihmiset hymyilemään!” Myös ulkomaalaiset ovat sanoneet minulle, että mielikuvitukseni on vertaansa vailla vastineeksi urheilusta luopumisesta. Koulun japanin tunneilla runojani kehuttiin siitä, kuinka ne kuvaavat arkea hauskasti. Siksi uskon, että mielikuvitus on suurin vahvuuteni.',
        'Mielikuvituksestani syntynyt hahmo ”Kuningas Tapioka” oli aluksi vain pelkkä luonnos vihon kulmassa. Piirtäessäni aloin kuitenkin tuntea hänet kuin omaksi lapsekseni. Niinpä hankin tabletin ja olen siitä asti piirtänyt lakkaamatta.',
        'Tätä Suomen-matkaa varten työskentelin edeltävät kolme kuukautta ahkerasti luodakseni Kuningas Tapiokan alkuperäisiä tuotteita myytäväksi Suomessa! Aloitin aamuyhdeksältä vilkkaassa puistossa kantamalla pöytiä, pystyttämällä esillepanon ja palvelemalla asiakkaita haparoivalla englannilla. Nautin tällaisesta elämästä suunnattomasti. Mielikuvituksella voin tehdä mitä vain: piirtää, keksiä vitsejä tai kokeilla uutta ruokalajia. Ihmiselle on tärkeää käyttää aivojaan. Ajatella, pohtia ja luoda.',
        'Maalatessani soitan aina taustalla iloista musiikkia, kuten ”The Entertainer”. En ehkä ole teknisesti mestarillinen piirtäjä, mutta panostan kekseliäisyyteen ja suunnitteluun omalla tavallani. Asetan kynän tabletille ja istahdan alas. Silloin hahmoni heräävät eloon ja tanssivat kynän kärjessä. Ne juoksevat, nauravat ja itkevät. En voi pysäyttää niitä, enkä edes haluaisi.',
        'Sellainen on mielikuvitukseni maailma. Kaikki hahmot asuvat päässäni. He ovat kanssani silloin kun minua harmittaa, ja silloin kun olen innoissani. Olemme kuin erottamaton yhteisö. Ajattelen, pohdin, nauran, itken ja kuljen tämän hetken läpi. Olen ylpeä siitä, että pääsen omaan maailmaani nopeammin kuin kukaan muu.'
      ]
    },
    {
      id: 3,
      tagEn: 'Culture & Food',
      tagJa: '食と文化',
      tagFi: 'Ruokakulttuuri ja perinne',
      titleEn: 'Japanese Rice (日本米)',
      titleJa: '日本米 (Japanese Rice)',
      titleFi: 'Japanilainen riisi (Nihonmai)',
      readTimeEn: '4 min read',
      readTimeJa: '読了時間 約4分',
      readTimeFi: 'Lukuajaksi n. 4 min',
      image: {
        src: tapiRiceImg,
        alt: 'King Tapioka Full Stomach (お腹いっぱい)',
        captionJa: '『お腹いっぱい』— 美味しいお米をお腹いっぱいに食べた満足げなたぴおか王',
        captionEn: '“Full Stomach (Onaka Ippai)” — King Tapioka resting happily after enjoying delicious rice',
        captionFi: '”Vatsa täynnä (Onaka Ippai)” – Kuningas Tapioka lepäämässä herkullisen riisiaterian jälkeen'
      },
      contentJa: [
        '欧米で大ヒットしたホットケーキミックスは、電気釜で作れるように改良し日本市場に進出したが完全な失敗に終わった。理由はライス・カルチャー（お米の文化）といわれる日本文化の中で、ごはんをたくのと同じ器でケーキを作ると、バニラやチョコレートに汚染されてしまうのではないか―という懸念とわかり、問題がそこまで民族的な伝統に根ざしている以上、手の打ちようがないと日本市場から引き上げる結果となった。',
        '僕は米が好きだ。たぶん、日本人の多くがそうだろう。だが、米が単に「おいしい」だけでなく、先人たちの知恵や工夫、歴史によって支えられていることを、もっと意識する必要があると思う。',
        'そもそも、今の市販で売られているものは大体白米だが、昔は精米しないといけない白米はかなりの高級品で、江戸時代になってからようやく町民たちが食べれるようになってきた。そこからどんどん食べ方は増えていく。',
        'なぜ、おにぎりの具は梅干しが代表的か知っているだろうか？ コンビニ等で豊富に売られているおにぎりの具材、例えば、タラコは江戸時代には手に入りにくかった。昆布は高級品で庶民は買えなかった。ツナマヨはマヨネーズがもちろん無い。 そんな具材の中から、手に入りやすく、安価で、ご飯と合う物。それが梅干しだったのだ。また、梅干しに含まれるクエン酸が、まわりのご飯の腐敗防止に役立つことを、経験上知っていたのかもしれない。そして、昔から「日の丸弁当」というのは世に出され続けており、やはり梅干しは日本を表すのにぴったりだったのではないかと思う。',
        '日本での米の歴史は縄文時代の終わりに始まり、弥生時代に水稲栽培が定着した。やがて米は年貢や通貨として使われ、江戸時代には「石高」で領地の価値が計られるようになった。武士も大名も、米を中心に社会を動かしていたのだ。食としての米も変化してきた。今は当たり前のように白米を食べているが、かつては玄米が主流だった。白米は精米に手間がかかり、高級品だった。都市の町民が白米を口にできるようになったのは江戸中期以降だ。',
        '祖母の実家の前には田んぼがある。春に田植えをし、夏に青々と育ち、秋には黄金に色づき、収穫後の田んぼで泥まみれになって遊んだ。祖母はその一年の流れをずっと見てきた。一株の稲からとれる米の量は意外なほど少なく、だからこそ、一粒の米の重みがよくわかったのだろう。',
        'おにぎりをにぎるときに手に塩をつけるのもまた、味つけと防腐のための知恵だ。少ない塩でしっかり味を感じさせることができる。こうした工夫の一つ一つが、米を守り、味わいを深めてきた。',
        '僕たちが日々口にしている米は、単なる主食ではない。祖母の田んぼで見た稲の成長、そして母の話にあった文化に根ざした拒否感に触れるたびに、米は日本人にとって特別な存在なのだと感じる。',
        '米とは、人間にとって「食」であると同時に、「歴史」であり、「文化」であり、「生き方」そのものなのだ。'
      ],
      contentEn: [
        'A pancake mix that was a massive hit in Western countries was specially adapted to be baked in electric rice cookers and introduced to the Japanese market, but it ended in complete failure. The reason was discovered to be rooted in the "rice culture" of Japan. People felt that baking a cake in the very same vessel used for cooking their daily rice would contaminate it with aromas of vanilla or chocolate. Realizing that the barrier was deeply embedded in national traditions, the company found no way to counter it and ultimately withdrew from the Japanese market.',
        'I love rice. Probably most Japanese people do. However, I believe we need to be more conscious of the fact that rice is not simply "delicious," but is supported by the wisdom, ingenuity, and history of our ancestors.',
        'In the first place, while most rice sold in stores today is white rice, polished white rice was once an extreme luxury. It was only during the Edo period that ordinary townspeople finally gained access to it, from which point various ways of eating it began to flourish.',
        'Do you know why pickled plum (umeboshi) became the representative filling for rice balls (onigiri)? Many fillings sold abundantly in convenience stores today, such as cod roe (tarako), were difficult to obtain during the Edo period. Kelp (konbu) was a luxury that commoners could not afford. And tuna-mayo, of course, was impossible without mayonnaise. Among all potential ingredients, the pickled plum was easily accessible, inexpensive, and paired beautifully with rice. Furthermore, people might have known from experience that the citric acid in umeboshi helped prevent the surrounding rice from spoiling. Ever since, the simple "Hinomaru Bento" (resembling the Japanese flag with a single red plum in white rice) has continued to exist, and I think the pickled plum remains the perfect symbol of Japan.',
        'The history of rice in Japan began at the end of the Jomon period, with wet-rice cultivation firmly establishing itself in the Yayoi period. Eventually, rice was used as land tax (nengu) and currency, and during the Edo period, the value of territories was measured in "kokudaka" (rice yield). Both samurai and feudal lords ran society centered around rice. The way rice was consumed also shifted over time. While we eat white rice as a matter of course today, brown rice (genmai) was once the staple. Polishing white rice required intensive labor and was highly expensive. It was only after the mid-Edo period that urban residents could regularly eat white rice.',
        'In front of my grandmother\'s family home, there is a rice paddy. I remember planting rice in the spring, watching it grow lush and green in the summer, turning into brilliant gold in the autumn, and playing covered in mud in the empty fields after harvest. My grandmother has observed this annual cycle her whole life. The amount of rice harvested from a single rice plant is surprisingly small, which is why she understood so deeply the weight of a single grain.',
        'Applying salt to your hands when shaping onigiri is also a technique for seasoning and preservation. It allows one to taste the flavor clearly with only a small amount of salt. Each of these small details represents an accumulated wisdom that has protected rice and deepened its flavor over generations.',
        'The rice we eat every day is not merely a staple food. Whenever I reflect on the growth of the rice stalks I saw in my grandmother\'s field, or the cultural rejection of baking cakes in rice cookers that my mother mentioned, I feel that rice holds a truly special place for Japanese people.',
        'For humans, rice is "sustenance," but at the same time, it is "history," "culture," and "a way of life" itself.'
      ],
      contentFi: [
        'Länsimaissa suosittu pannukakkujauheseos sovitettiin sähköisissä riisinkeittimissä leivottavaksi ja lanseerattiin Japanissa, mutta se epäonnistui täysin. Syynä oli Japanin syvä riisikulttuuri: ihmiset pelkäsivät, että kakun leipominen samassa astiassa, jossa päivittäinen riisi keitetään, saastuttaisi riisin vaniljan tai suklaan tuoksulla. Koska asia liittyi kansalliseen identiteettiin, valmistajan oli lopulta vetäydyttävä markkinoilta.',
        'Rakastan riisiä, kuten luultavasti useimmat japanilaiset. Meidän on kuitenkin syytä muistaa, että riisi ei ole vain ”herkullista”, vaan sitä kannattelee esivanhempiemme viisaus ja vuosisatainen perinne.',
        'Vaikka nykyään kaupoissa myydään pääasiassa valkoista riisiä, kiillotettu valkoinen riisi oli aikoinaan suuri ylellisyys. Vasta Edo-kaudella kaupunkilaiset saivat sitä säännöllisesti ruokapöytiinsä, mistä alkoi lukemattomien reseptien kukoistus.',
        'Tiedätkö, miksi japanilainen suolaluumu (umeboshi) on perinteisin riisipallojen (onigiri) täyte? Edo-kaudella turskanmäti oli harvinaista, merilevä kallista ja majoneesia ei luonnollisesti tunnettu. Suolaluumu sen sijaan oli edullinen, säilyvä ja sopi riisin makuun loistavasti. Lisäksi sen sitruunahappo suojasi riisiä pilaantumiselta helteessä.',
        'Riisinviljelyn historia alkoi Jomon-kauden lopulla ja vakiintui Yayoi-kaudella. Aikanaan riisiä käytettiin jopa verona ja valuuttana, ja feodaaliherrojen varallisuus mitattiin riisin satomäärissä.',
        'Isoäitini kotitalon edessä on riisipelto. Muistan riisintaimien istutuksen keväällä, kesän vehreyden, syksyn kultaiset sävyt ja mutaiset leikit pellolla sadonkorjuun jälkeen. Isoäitini on seurannut tätä kiertoa koko elämänsä. Yhdestä korresta saatava riisimäärä on pieni, minkä vuoksi hän ymmärsi jokaisen yksittäisen riisinjyvän suuren arvon.',
        'Myös kämmenten suolaaminen onigireja muotoiltaessa on ikivanhaa säilöntä- ja maustamisviisautta.',
        'Riisi, jota syömme päivittäin, ei ole vain ravintoa. Se on japanilaisille elävä yhteys luontoon, perheeseen ja sukupolvien ketjuun.',
        'Riisi on ravintoa, mutta samalla se on historiaa, kulttuuria ja elämäntapa itsessään.'
      ]
    },
    {
      id: 4,
      tagEn: 'Family & Collaboration',
      tagJa: '家族と協力',
      tagFi: 'Perhe ja yhteistyö',
      titleEn: 'Support (援護)',
      titleJa: '援護 (Support)',
      titleFi: 'Tuki (Support - 援護)',
      readTimeEn: '3 min read',
      readTimeJa: '読了時間 約3分',
      readTimeFi: 'Lukuajaksi n. 3 min',
      image: {
        src: tapiSupportImg,
        alt: 'King Tapioka Saying Thank You (ありがとう)',
        captionJa: '『ありがとう』— 家族への深い感謝と相互扶助を描いたたぴおか王',
        captionEn: '“Arigatou (Thank you)” — King Tapioka expressing gratitude for family support and mutual aid',
        captionFi: '”Arigatou (Kiitos)” – Kuningas Tapioka kiittämässä perheen tuesta ja yhteistyöstä'
      },
      contentJa: [
        '僕の家族は、それぞれの役割がはっきりしている。集団で物事を進めるうえで、役割分担は欠かせない。役割を明確にすることで、各自が自分の責任に集中でき、作業の効率が上がる。',
        'また、それぞれの得意分野や能力を活かすことができ、全体の成果にもつながる。誰が何をするのかがはっきりしていれば、誤解や混乱も起こりにくいし、無駄な重複作業も避けられる。つまり、役割分担は集団の中で協力し合うための基本であり、目的を達成するために、とても大切なものだと思う。そしてそれを家族の中で自然に補い合えているというのは、それぞれにとっても、とてもありがたいことだ。',
        '母は、ほとんど毎日在宅勤務で、ミーティングの繰り返しで忙しそうだ。僕が布団でごろごろしているときも、その向こうでは「カチャカチャ」とキーボードを打つ音が聞こえ、母の真剣な声が部屋に響いている。そんな様子を見ていると、自分と比べて申し訳ない気持ちになるのは、もはや自然現象だろう。それでも母は、僕がドッジボール大会で表彰されたとき、どんなに忙しくても、わざわざ学校まで来てくれた。',
        'それだけではない。母が海外での仕事のイベントに参加するとき、僕もついて行く機会があった。そのとき、母のすすめで僕の描いたイラストを使ったオリジナルグッズを作って、なんとフィンランドで販売したのだ。緊張したけれど、グッズを手に取ってくれる人を見てとても嬉しかった。あのとき、母が僕の力を信じて背中を押してくれたことが、僕にとって何よりの支えだった。',
        '母は、僕のことをいつも全力でバックアップしてくれる。ただ仕事をこなすだけでなく、僕や家族の一人ひとりのことをしっかり見ていて、必要なときにはちゃんと助けてくれる。',
        'そんな母の姿を見ていると、自分も誰かを支えられるようになりたいと思う。',
        '家族とは、人間にとって生きていくうえでの支えだ。得意なこと、苦手なことはみんな違うけれど、だからこそ補い合える。',
        '困ったときに手を貸してくれる、喜びを一緒に分かち合える、そんな存在が家族なのだ。',
        '相互扶助という言葉があるように、僕の家族は、まるで一つのチームのようだ。',
        'それぞれの個性が違っていても、みんなが自分の役割を果たすことで、家族としての形が成り立っている。これからも、この家族の中で僕の役割を見つけて、果たしていきたいと思う。'
      ],
      contentEn: [
        'In my family, everyone\'s role is clearly defined. When a group moves forward together, dividing responsibilities is indispensable. Clarifying roles allows each of us to focus on our own duties, enhancing overall efficiency.',
        'Furthermore, it allows us to utilize each individual\'s strengths and talents, contributing to the family\'s success as a whole. When who does what is transparent, misunderstandings and confusion rarely arise, and wasteful, overlapping tasks are avoided. In other words, dividing roles is the fundamental baseline of cooperating within a group, and is vital for achieving our goals. Being able to complement one another naturally within our family is something we are all incredibly grateful for.',
        'My mother works from home almost every day, and she always seems busy with endless online meetings. Even while I am lounging in bed, I can hear the rapid tap-tap-tap of her keyboard, and her earnest voice echoing through the room. Observing her work so hard makes me feel somewhat guilty by comparison—a reaction that is practically a law of nature at this point. Even so, when I was honored at our school\'s dodgeball tournament, she made sure to take time out of her busy schedule to come and support me.',
        'That was not all. When she attended an overseas business event, I had the opportunity to accompany her. Under her encouragement, we produced original merchandise using illustrations I had drawn, and we actually sold them in Finland! Although I was nervous, seeing people hold my designs in their hands filled me with joy. At that moment, the fact that my mother believed in my ability and pushed me forward was the ultimate support.',
        'My mother backs me up with all her heart. Rather than simply getting through her daily work, she watches over each family member carefully and extends a helping hand exactly when it is needed. Watching her, I feel a growing desire to become someone who can support others in return.',
        'For human beings, family is the ultimate emotional and structural support in life. Our strengths and weaknesses vary, but that is precisely why we can lift each other up. They are the ones who lend a hand when we are in trouble, and share our happiness when we succeed.',
        'True to the spirit of mutual aid, my family operates like a cohesive team. Despite our differing personalities, our structure works beautifully because everyone fulfills their respective roles. Moving forward, I hope to continue finding and playing my part within this wonderful team.'
      ],
      contentFi: [
        'Perheessämme jokaisen rooli on selkeä. Kun ryhmä etenee yhdessä, tehtävien jakaminen on välttämätöntä. Selkeät roolit auttavat meitä keskittymään omiin vastuisiimme ja lisäävät tehokkuutta.',
        'Lisäksi voimme hyödyntää jokaisen vahvuuksia koko perheen hyväksi. Kun tiedetään kuka tekee mitäkin, väärinkäsityksiltä vältytään ja turhat päällekkäisyydet karsiutuvat. Toistemme luonnollinen tukeminen perheen sisällä on asia, josta olemme kaikki syvästi kiitollisia.',
        'Äitini tekee etätöitä lähes joka päivä ja on usein kiireinen verkkokokouksissaan. Vaikka itse loikoilisin vuoteessa, kuulen näppäimistön naputuksen ja äitini keskittyneen äänen. Se saa minut tuntemaan pientä syyllisyyttä ahkeruuteensa verrattuna. Silti, kun minut palkittiin koulun polttopalloturnauksessa, hän järjesti aikaa tullakseen paikan päälle kannustamaan minua.',
        'Eikä siinä kaikki. Kun äitini osallistui kansainväliseen työseminaariin, pääsin hänen mukaansa matkalle. Hänen rohkaisustaan teimme alkuperäisiä tuotteita piirtämistäni kuvituksista – ja myimme niitä Suomessa! Vaikka minua jännitti, oli sanoin kuvaamattoman hienoa nähdä ihmisten tutustuvan teoksiini. Se, että äitini uskoi kykyihini ja tuki minua, oli minulle valtava voimanlähde.',
        'Äitini tukee minua koko sydämestään. Pelkän työnteon lisäksi hän pitää huolta jokaisesta meistä ja auttaa aina tarvittaessa. Häntä seuratessani minussa kasvaa halu tulla ihmiseksi, joka voi vastavuoroisesti tukea muita.',
        'Perhe on ihmiselle elämän suurin henkinen ja arjen tukipilari. Vahvuutemme ja heikkoutemme ovat erilaisia, ja juuri siksi täydennämme toisiamme.',
        'Keskinäisen avunannon mukaisesti perheemme toimii kuin yhtenäinen joukkue. Erilaisista luonteistamme huolimatta kokonaisuus toimii kauniisti, kun jokainen kantaa kortensa kekoon. Haluan jatkossakin löytää ja täyttää oman roolini tässä mahtavassa tiimissä.'
      ]
    }
  ];

  const getPageTitle = () => {
    if (lang === 'fi') return 'YOSHI TSUIJIN ESSEET & TEKSTIT';
    if (lang === 'en') return 'ESSAYS & WRITINGS BY YOSHI TSUIJI';
    return '辻 義のエッセイ・文集';
  };

  const getPageIntro = () => {
    if (lang === 'fi') {
      return 'Tutustu Yoshi Tsuijin henkilökohtaisiin esseisiin. Hän pohtii syvänmeren elämää, mielikuvituksen merkitystä ja matkaansa Suomeen, jossa hän myi itse suunnittelemiaan Kuningas Tapioka -tuotteita!';
    }
    if (lang === 'en') {
      return 'Explore reflective personal essays written by Yoshi Tsuiji. From the evolutionary adaptations of deep-sea creatures to his joyful journey selling King Tapioca designs in Finland.';
    }
    return 'タピ・ライフ原作者・辻義による書き下ろしエッセイ・文集。深海生物の知恵から、日本のお米文化、そしてフィンランドで自身のオリジナルグッズを販売した心温まる思い出までを掲載。';
  };

  const getEssayTitle = (essay: Essay) => {
    if (viewMode === 'fi') return essay.titleFi;
    if (viewMode === 'en') return essay.titleEn;
    return essay.titleJa;
  };

  const getEssayTag = (essay: Essay) => {
    if (viewMode === 'fi') return essay.tagFi;
    if (viewMode === 'en') return essay.tagEn;
    return essay.tagJa;
  };

  const getReadTime = (essay: Essay) => {
    if (viewMode === 'fi') return essay.readTimeFi;
    if (viewMode === 'en') return essay.readTimeEn;
    return essay.readTimeJa;
  };

  const renderStickerThumb = (essay: Essay, size: 'normal' | 'compact' = 'normal') => {
    if (!essay.image) return null;
    const isCompact = size === 'compact';
    return (
      <div
        className={`float-left ${
          isCompact
            ? 'mr-4 mb-2.5 max-w-[110px] sm:max-w-[125px]'
            : 'mr-5 mb-3 sm:mr-6 sm:mb-4 max-w-[118px] sm:max-w-[145px]'
        } shrink-0 flex flex-col items-center select-none`}
      >
        <div
          className={`${
            isCompact ? 'w-24 h-24 sm:w-28 sm:h-28 p-1.5' : 'w-28 h-28 sm:w-36 sm:h-36 p-2'
          } rounded-xl bg-neutral-50 border border-neutral-200/80 shadow-2xs flex items-center justify-center overflow-hidden`}
        >
          <img
            src={essay.image.src}
            alt={essay.image.alt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain"
          />
        </div>
        {essay.image.credit && (
          <div className="mt-1.5 text-center px-0.5 w-full">
            <p className="text-[9px] sm:text-[10px] leading-tight text-neutral-500 font-sans">
              <span className="text-neutral-400 block text-[8px] uppercase tracking-wider">picture credits:</span>
              <a
                href={essay.image.credit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-700 underline underline-offset-2 hover:text-amber-800 transition-colors font-medium break-words inline-block mt-0.5"
              >
                {essay.image.credit.text} ↗
              </a>
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div id="essays-page-container" className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12">
      
      {/* Top back navigation link */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-600 hover:text-neutral-950 transition-colors py-1.5 px-3 rounded-md bg-white border border-neutral-200 shadow-xs cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>
            {lang === 'fi' ? 'Takaisin etusivulle' : lang === 'en' ? 'Back to Home' : 'ホームに戻る'}
          </span>
        </button>

        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-semibold">
          {lang === 'fi' ? 'LUKUSALI' : lang === 'en' ? 'READING ROOM' : '読書空間'}
        </span>
      </div>

      {/* Page Title & Intro */}
      <div className="space-y-4 text-center sm:text-left border-b border-neutral-200 pb-8">
        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-bold block">
          {lang === 'fi' ? 'KIRJOITUKSET & AJATUKSET' : lang === 'en' ? 'COLLECTED ESSAYS' : '原作者書き下ろし文集'}
        </span>
        <h1 className="text-2xl sm:text-4xl font-serif text-neutral-950 font-medium">
          {getPageTitle()}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 font-serif leading-relaxed max-w-2xl">
          {getPageIntro()}
        </p>
      </div>

      {/* Reading Mode Selector Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white rounded-xl border border-neutral-200">
        <span className="text-xs font-mono text-neutral-500 font-medium">
          {lang === 'fi' ? 'Valitse lukukieli:' : lang === 'en' ? 'Reading language:' : '表示言語モード:'}
        </span>
        <div className="flex items-center gap-1.5 text-xs font-mono">
          <button
            type="button"
            onClick={() => setViewMode('ja')}
            className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
              viewMode === 'ja'
                ? 'bg-neutral-900 text-white font-medium'
                : 'text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            日本語
          </button>
          <button
            type="button"
            onClick={() => setViewMode('en')}
            className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
              viewMode === 'en'
                ? 'bg-neutral-900 text-white font-medium'
                : 'text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => setViewMode('fi')}
            className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
              viewMode === 'fi'
                ? 'bg-neutral-900 text-white font-medium'
                : 'text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            Suomi
          </button>
          <button
            type="button"
            onClick={() => setViewMode('bilingual')}
            className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
              viewMode === 'bilingual'
                ? 'bg-neutral-900 text-white font-medium'
                : 'text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            {lang === 'fi' ? 'Rinnakkaislukutila' : lang === 'en' ? 'Bilingual' : '日英対訳'}
          </button>
        </div>
      </div>

      {/* Essay Index Table of Contents */}
      <div className="bg-neutral-50/80 p-5 rounded-xl border border-neutral-200/80 space-y-3">
        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-semibold block">
          {lang === 'fi' ? 'SISÄLLYSLUETTELO' : lang === 'en' ? 'ESSAYS INDEX' : '目次一覧'}
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-serif">
          {essays.map((essay, index) => (
            <a
              key={essay.id}
              href={`#essay-${essay.id}`}
              className="flex items-center justify-between p-2.5 rounded-lg hover:bg-white hover:shadow-xs transition-all text-neutral-700 hover:text-neutral-950 border border-transparent hover:border-neutral-200/60"
            >
              <div className="flex items-center gap-2.5 truncate">
                <span className="font-mono text-neutral-400">0{index + 1}.</span>
                {essay.image && (
                  <div className="w-8 h-8 rounded bg-white border border-neutral-200/80 p-0.5 shrink-0 flex items-center justify-center overflow-hidden">
                    <img
                      src={essay.image.src}
                      alt={essay.image.alt}
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
                <span className="truncate">{getEssayTitle(essay)}</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 shrink-0 text-neutral-400 ml-1" />
            </a>
          ))}
        </div>
      </div>

      {/* Essays Articles List */}
      <div className="space-y-16 pt-4">
        {essays.map((essay, index) => (
          <motion.article 
            key={essay.id}
            id={`essay-${essay.id}`}
            className="space-y-6 scroll-mt-24 pb-12 border-b border-neutral-200 last:border-b-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <header className="space-y-3 pb-5 border-b border-neutral-200">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="text-neutral-400">0{index + 1}</span>
                <span className="text-neutral-300">/</span>
                <span className="text-neutral-600 tracking-wider uppercase">
                  {getEssayTag(essay)}
                </span>
                <span className="text-neutral-300">/</span>
                <span className="bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded text-[10px] font-medium font-sans">
                  {viewMode === 'bilingual' ? 'JP & EN' : viewMode.toUpperCase()}
                </span>
              </div>
              
              <h2 className="text-xl sm:text-2xl font-serif text-neutral-900 leading-tight">
                {getEssayTitle(essay)}
                {viewMode === 'bilingual' && (
                  <span className="block text-sm sm:text-base text-neutral-500 font-serif font-normal mt-1.5 leading-snug">
                    {essay.titleEn}
                  </span>
                )}
              </h2>

              <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400">
                <Clock className="w-3.5 h-3.5 text-neutral-300" />
                <span>{getReadTime(essay)}</span>
              </div>
            </header>

            {/* Essay Content Area with Blended Initial Sticker */}
            <div className="font-serif">
              {/* 1. Japanese Only */}
              {viewMode === 'ja' && (
                <div className="text-neutral-800 text-sm sm:text-[15px] leading-relaxed space-y-5 text-justify">
                  {renderStickerThumb(essay)}
                  {essay.contentJa.map((paragraph, pIdx) => (
                    <p key={pIdx} className="indent-4 leading-loose tracking-wide">
                      {paragraph}
                    </p>
                  ))}
                  <div className="clear-both" />
                </div>
              )}

              {/* 2. English Only */}
              {viewMode === 'en' && (
                <div className="text-neutral-800 text-sm sm:text-[15px] leading-relaxed space-y-5 text-justify">
                  {renderStickerThumb(essay)}
                  {essay.contentEn.map((paragraph, pIdx) => (
                    <p key={pIdx} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                  <div className="clear-both" />
                </div>
              )}

              {/* 3. Finnish Only */}
              {viewMode === 'fi' && (
                <div className="text-neutral-800 text-sm sm:text-[15px] leading-relaxed space-y-5 text-justify">
                  {renderStickerThumb(essay)}
                  {essay.contentFi.map((paragraph, pIdx) => (
                    <p key={pIdx} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                  <div className="clear-both" />
                </div>
              )}

              {/* 4. Bilingual (Side-by-side or stacked) */}
              {viewMode === 'bilingual' && (
                <div className="space-y-8">
                  {essay.contentJa.map((paragraphJa, pIdx) => {
                    const paragraphEn = essay.contentEn[pIdx] || '';
                    return (
                      <div key={pIdx} className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-neutral-100 last:border-b-0 last:pb-0">
                        {/* JP Left */}
                        <div className="space-y-2">
                          <span className="text-[9px] font-mono text-neutral-400 tracking-wider font-bold block uppercase">JP</span>
                          <div className="text-neutral-800 text-[14px] sm:text-[15px] leading-loose text-justify font-serif tracking-wide">
                            {pIdx === 0 && renderStickerThumb(essay, 'compact')}
                            <p className="indent-4">
                              {paragraphJa}
                            </p>
                            <div className="clear-both" />
                          </div>
                        </div>
                        {/* EN Right */}
                        <div className="space-y-2 bg-neutral-50/70 p-4 md:p-0 md:bg-transparent rounded-lg md:rounded-none">
                          <span className="text-[9px] font-mono text-neutral-400 tracking-wider font-bold block uppercase">EN</span>
                          <p className="text-neutral-600 text-[13px] sm:text-[14px] leading-relaxed text-justify font-serif">
                            {paragraphEn}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="pt-4 flex justify-end">
              <span className="font-serif italic text-xs text-neutral-400">■ Yoshi Tsuiji</span>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Back to Home button at the end */}
      <div className="flex justify-center pt-8 border-t border-neutral-200">
        <button
          onClick={() => onNavigate('/')}
          className="px-8 py-3 bg-neutral-900 hover:bg-neutral-950 text-white rounded-lg text-xs tracking-widest transition-all active:scale-95 font-mono cursor-pointer"
        >
          {lang === 'fi' ? 'PALAA ETUSIVULLE' : lang === 'en' ? 'RETURN TO MAIN PAGE' : 'メインページに戻る'}
        </button>
      </div>

    </div>
  );
}
