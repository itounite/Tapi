import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, BookOpen, Clock, ArrowRight, CornerDownRight, Globe } from 'lucide-react';
import { Language } from '../types';
import Footer from './Footer';

interface EssaysPageProps {
  lang: Language;
  onBack: () => void;
  visits?: number | null;
  visits24h?: number | null;
  recentFlags?: string[];
}

interface Essay {
  id: number;
  tagEn: string;
  tagJa: string;
  titleEn: string;
  titleJa: string;
  readTimeEn: string;
  readTimeJa: string;
  contentJa: string[];
  contentEn: string[];
}

export default function EssaysPage(props: EssaysPageProps) {
  const { lang, onBack } = props;
  
  // View mode can be 'bilingual' | 'ja' | 'en'
  const [viewMode, setViewMode] = useState<'bilingual' | 'ja' | 'en'>('bilingual');

  // Synchronize viewMode with the outer lang when lang changes, but allow manual toggle
  useEffect(() => {
    setViewMode(lang === 'en' ? 'en' : 'ja');
  }, [lang]);

  const essays: Essay[] = [
    {
      id: 1,
      tagEn: 'Scientific Adaptation',
      tagJa: '科学的考察',
      titleEn: 'Environmental Adaptation of Deep Sea Organisms',
      titleJa: '自然界における環境変化と深海生物の進化・適応能力',
      readTimeEn: '5 min read',
      readTimeJa: '読了時間 約5分',
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
      ]
    },
    {
      id: 2,
      tagEn: 'Philosophy & Imagination',
      tagJa: '創作とイマジネーション',
      titleEn: 'Dance',
      titleJa: 'ダンス',
      readTimeEn: '4 min read',
      readTimeJa: '読了時間 約4分',
      contentEn: [
        'If I had to say what I am best at, it would probably be imagination.',
        'In the second grade, I was the fastest runner in my grade, but from the third grade on, I spent so much time drawing cartoons of my characters that I dropped both the basketball and baseball sports teams I had been taking concurrently. This was probably the biggest mistake I made in my elementary school life. My legs had become sluggish from quitting my sports, and I had dropped to about medium speed. But instead, I only had the imagination to draw.',
        'My teacher said, “Your humor and imagination make people smile! (Your humor is outstanding.)” and people from overseas have told me that my imagination may be outstanding in exchange for sports in some way. Indeed, when I write poems in my Japanese class at school, they also say, “The poems you write, Mr. Yamada, are interesting because they include everyday life.” So I think imagination is number one.',
        'The character “King Tapioca,” a product of my imagination, was originally nothing more than a scribble in a notebook. But as I was writing it, I felt like my child, which might be said to be a parent\'s heart. So I bought a tablet and have been drawing pictures all the time.',
        'For this trip to Finland, I have been working hard for the past three months to create original goods for the King of Tapioca. The reason why I have been making them is to sell them in Finland. I started at 9:00 a.m. in a busy park, carrying desks, setting up the display, and serving customers in broken English. I enjoy this kind of life. There are so many things I can do with my imagination. This is true even for this essay I am writing now. I use it not only to draw pictures, but also to make a gag in the middle of a story, or to try out a new dish. It is important for human beings to use their brains well. Think, think, think.',
        'Whenever I paint, I always write while playing cheerful music like “Entertainer.” I may not be a good artist, but I can be creative in my designs, so I try my best to be creative in my own way. I put the pen on the tablet and sit down with a thud. Then my characters move and dance with the pen. They run, laugh, and cry. I can\'t stop them, and I have no desire to stop them.',
        'That\'s how I imagine it in my head. Everyone is in my head. They are with me when I am depressed because someone is mad at me, or when I am happy and excited. It\'s like a community of fate. I think, worry, laugh, cry, and run through the present like that. I am proud now that I think that I am entering my own world faster than anyone else.'
      ],
      contentJa: [
        '自分が一番得意なことは何かと聞かれたら、それはおそらく「想像力」だと思う。',
        '小学2年生のとき、僕は学年で一番足が速かった。しかし3年生になってから、自分のオリジナルキャラクターの漫画を描くことに没頭するあまり、それまで掛け持ちしていたバスケットボールと野球のスポーツチームを両方とも辞めてしまった。これはおそらく、僕の小学校生活における最大の失敗だった。スポーツをやめたことで足はすっかり鈍くなり、走る速さも平均レベルまで落ちてしまった。しかし、その代わりに僕の手元には、絵を描くための豊かな想像力だけが残った。',
        '先生は「君のユーモアと想像力はみんなを笑顔にするね！（ユーモアのセンスが抜群だ）」と言ってくれた。また、海外の人からも、スポーツを諦めた代わりに抜群の想像力を手に入れたんだね、と言われたことがある。確かに、学校の国語の授業で詩を書いたときも、「山田君の書く詩は、日常が描かれていて面白い」と褒められた。だから、想像力こそが僕の1番の強みだと思っている。',
        '僕の想像力から生まれたキャラクター「たぴおか王」は、最初はノートの隅の落書きにすぎなかった。しかし描いているうちに、まるで自分の子供のように思えてきて、親心のようなものが芽生えてきた。そこでタブレットを購入し、それからはずっと絵を描き続けている。',
        '今回のフィンランド旅行に向けて、僕は過去3ヶ月間、たぴおか王のオリジナルグッズ制作に励んできた。それらを作った理由は、フィンランドで販売するためだ。朝の9時、賑やかな公園で机を運び、ディスプレイを設置し、つたない英語で接客を始めた。僕はこのような生き方がとても好きだ。想像力があれば、できることは無限にある。今書いているこのエッセイもそうだ。絵を描くだけでなく、ストーリーの途中にギャグを挟んだり、新しい料理に挑戦したりするのにも想像力を使っている。人間にとって頭をよく使うことは大切だ。考え、考え、考え抜くこと。',
        '絵を描くときは、いつも「エンターテイナー」のような陽気な音楽をかけながら描いている。僕は決して絵が上手なわけではないけれど、デザインにおいて自分なりの工夫を凝らし、全力でクリエイティブであろうとしている。タブレットにペンを置き、どっかと腰を下ろす。すると、僕のキャラクターたちがペン先とともに動き、踊り出す。彼らは走り、笑い、泣く。僕には彼らを止めることはできないし、止めるつもりもない。',
        'それが、僕の頭の中の想像の世界だ。みんな、僕の頭の中に生きている。誰かに怒られて落ち込んでいるときも、嬉しくてワクワクしているときも、彼らはいつも僕のそばにいてくれる。まるで運命共同体だ。そうやって考え、悩み、笑い、泣きながら、今という瞬間を駆け抜けている。誰よりも早く自分の世界に入り込めるということを、今の僕は誇りに思っている。'
      ]
    },
    {
      id: 3,
      tagEn: 'Culture & Food',
      tagJa: '食と文化',
      titleEn: 'Japanese Rice (日本米)',
      titleJa: '日本米 (Japanese Rice)',
      readTimeEn: '4 min read',
      readTimeJa: '読了時間 約4分',
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
      ]
    },
    {
      id: 4,
      tagEn: 'Family & Collaboration',
      tagJa: '家族と協力',
      titleEn: 'Support (援護)',
      titleJa: '援護 (Support)',
      readTimeEn: '3 min read',
      readTimeJa: '読了時間 約3分',
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
      ]
    }
  ];

  return (
    <div id="essays-page-container" className="min-h-screen bg-[#FBF9F6] text-neutral-800 pb-24 selection:bg-neutral-200 select-none">
      {/* Essays Header */}
      <header className="border-b border-neutral-200 bg-[#FBF9F6]/80 backdrop-blur-md py-6 px-6 sm:px-10 sticky top-0 z-30 flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-4 py-2 hover:bg-neutral-100 text-neutral-800 rounded-lg text-xs transition-all flex items-center gap-1.5 border border-neutral-300 font-medium cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 text-neutral-700" />
          <span>{lang === 'en' ? 'Back' : '戻る'}</span>
        </button>

        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-neutral-600" />
          <span className="font-mono tracking-widest text-xs font-bold text-neutral-900">YOSHI TSUIJI WRITINGS</span>
        </div>

        <div className="text-[10px] border border-neutral-300 text-neutral-600 px-2.5 py-0.5 rounded-full font-mono uppercase tracking-wider">
          {lang === 'en' ? 'BILINGUAL PROSE' : '日英対訳エッセイ・文集'}
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 pt-16 space-y-12">
        {/* Intro Section */}
        <div className="space-y-4 pb-8 border-b border-neutral-200">
          <h1 className="text-2xl sm:text-3xl font-serif text-neutral-950 tracking-tight font-medium">
            {lang === 'en' ? 'Essays & Reflections' : '辻義（Yoshi Tsuiji）寄稿エッセイ・文集'}
          </h1>
          <p className="text-sm text-neutral-500 leading-relaxed font-sans max-w-xl">
            {lang === 'en' 
              ? 'A collection of four creative and reflective essays written by Yoshi Tsuiji, completely presented in both Japanese and English. Choose your preferred reading language layout below.'
              : '辻 義（Yoshi Tsuiji）が執筆した4つのエッセイ（日本語・英語の完全対訳）。深海生物の生態から、創作の想像力、お米の文化史、そして家族の協力体制まで、多岐にわたる独自の視点を日英二ヶ国語でお楽しみいただけます。'}
          </p>

          {/* View Mode Segmented Selector */}
          <div className="pt-4 flex flex-wrap gap-2 items-center">
            <span className="text-[10px] font-mono tracking-wider text-neutral-400 uppercase font-bold mr-2">
              {lang === 'en' ? 'DISPLAY LAYOUT' : '表示言語'}
            </span>
            <div className="inline-flex rounded-lg border border-neutral-300 bg-neutral-100/50 p-0.5 shadow-xs">
              <button
                onClick={() => setViewMode('bilingual')}
                className={`px-3 py-1 rounded-md text-[11px] font-mono font-medium transition-all cursor-pointer ${
                  viewMode === 'bilingual'
                    ? 'bg-white text-neutral-950 shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-800'
                }`}
              >
                {lang === 'en' ? 'Bilingual (Side-by-Side)' : '日英対訳'}
              </button>
              <button
                onClick={() => setViewMode('ja')}
                className={`px-3 py-1 rounded-md text-[11px] font-mono font-medium transition-all cursor-pointer ${
                  viewMode === 'ja'
                    ? 'bg-white text-neutral-950 shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-800'
                }`}
              >
                日本語 (JP)
              </button>
              <button
                onClick={() => setViewMode('en')}
                className={`px-3 py-1 rounded-md text-[11px] font-mono font-medium transition-all cursor-pointer ${
                  viewMode === 'en'
                    ? 'bg-white text-neutral-950 shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-800'
                }`}
              >
                English (EN)
              </button>
            </div>
          </div>
        </div>

        {/* Essay Index Table of Contents */}
        <div className="p-6 bg-neutral-50 rounded-xl border border-neutral-250/65 space-y-4 shadow-2xs">
          <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-bold flex items-center gap-1.5">
            <span>{lang === 'en' ? 'ESSAY INDEX' : '収録エッセイ目次'}</span>
            <CornerDownRight className="w-3.5 h-3.5" />
          </div>
          <div className="divide-y divide-neutral-200">
            {essays.map((essay, index) => (
              <button
                key={essay.id}
                onClick={() => {
                  const element = document.getElementById(`essay-${essay.id}`);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="w-full text-left py-3.5 group flex items-center justify-between text-xs sm:text-sm font-sans hover:text-neutral-950 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-neutral-400">0{index + 1}.</span>
                  <span className="text-neutral-700 group-hover:text-neutral-950 group-hover:underline transition-all font-serif">
                    {lang === 'en' ? essay.titleEn : essay.titleJa}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-neutral-400 group-hover:text-neutral-600">
                  <span className="font-mono text-[10px]">{lang === 'en' ? essay.readTimeEn : essay.readTimeJa}</span>
                  <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Essays list */}
        <div className="space-y-24 pt-8">
          {essays.map((essay, index) => (
            <motion.article 
              key={essay.id}
              id={`essay-${essay.id}`}
              className="space-y-8 scroll-mt-24 pb-12 border-b border-neutral-200/80 last:border-b-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <header className="space-y-4 pb-6 border-b border-neutral-200">
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                  <span className="text-neutral-400">0{index + 1}</span>
                  <span className="text-neutral-300">/</span>
                  <span className="text-neutral-500 tracking-wider uppercase">
                    {lang === 'en' ? essay.tagEn : essay.tagJa}
                  </span>
                  <span className="text-neutral-300">/</span>
                  <span className="bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded text-[10px] font-medium font-sans">
                    {viewMode === 'bilingual' ? 'JP & EN' : viewMode.toUpperCase()}
                  </span>
                </div>
                
                <h2 className="text-xl sm:text-2xl font-serif text-neutral-900 leading-tight">
                  {viewMode === 'en' ? essay.titleEn : essay.titleJa}
                  {viewMode === 'bilingual' && (
                    <span className="block text-sm sm:text-base text-neutral-500 font-serif font-normal mt-2 leading-snug">
                      {essay.titleEn}
                    </span>
                  )}
                </h2>

                <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400">
                  <Clock className="w-3.5 h-3.5 text-neutral-300" />
                  <span>{lang === 'en' ? essay.readTimeEn : essay.readTimeJa}</span>
                </div>
              </header>

              {/* Essay Content Area */}
              <div className="space-y-8 font-serif">
                {/* 1. Japanese Only */}
                {viewMode === 'ja' && (
                  <div className="text-neutral-800 text-sm sm:text-[15px] leading-relaxed space-y-6 text-justify">
                    {essay.contentJa.map((paragraph, pIdx) => (
                      <p key={pIdx} className="indent-4 leading-loose tracking-wide">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}

                {/* 2. English Only */}
                {viewMode === 'en' && (
                  <div className="text-neutral-800 text-sm sm:text-[15px] leading-relaxed space-y-6 text-justify">
                    {essay.contentEn.map((paragraph, pIdx) => (
                      <p key={pIdx} className="indent-4 leading-loose tracking-wide">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}

                {/* 3. Bilingual Side-by-Side or Stacked */}
                {viewMode === 'bilingual' && (
                  <div className="space-y-8">
                    {essay.contentJa.map((paragraphJa, pIdx) => {
                      const paragraphEn = essay.contentEn[pIdx] || '';
                      return (
                        <div key={pIdx} className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-neutral-100/60 last:border-b-0 last:pb-0">
                          {/* JP Left */}
                          <div className="space-y-2">
                            <span className="text-[9px] font-mono text-neutral-300 tracking-wider font-bold block uppercase">JP</span>
                            <p className="text-neutral-800 text-[14px] sm:text-[15px] leading-loose text-justify font-serif tracking-wide">
                              {paragraphJa}
                            </p>
                          </div>
                          {/* EN Right */}
                          <div className="space-y-2 bg-neutral-50/50 p-4 md:p-0 md:bg-transparent rounded-lg md:rounded-none">
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

              <div className="pt-6 flex justify-end">
                <span className="font-serif italic text-xs text-neutral-400">■ Yoshi Tsuiji</span>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Back to Home button at the end */}
        <div className="flex justify-center pt-12 border-t border-neutral-200">
          <button
            onClick={onBack}
            className="px-8 py-3 bg-neutral-900 hover:bg-neutral-950 text-white rounded-lg text-xs tracking-widest transition-all active:scale-95 font-mono cursor-pointer"
          >
            {lang === 'en' ? 'RETURN TO MAIN PAGE' : 'メインページに戻る'}
          </button>
        </div>
      </div>

      {/* Site Footer */}
      <Footer 
        lang={lang} 
        visits={props.visits ?? props.visits24h} 
        recentFlags={props.recentFlags}
      />
    </div>
  );
}
