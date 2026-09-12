import { CharacterItem, VideoEpisode, GalleryItem, MerchItem } from './types';

export const CHARACTERS: CharacterItem[] = [
  {
    id: 'tapioka_king',
    nameEn: 'King Tapioca',
    nameJa: 'たぴおか王',
    nameFi: 'Kuningas Tapioka',
    color: '#7F7F7F',
    borderColor: '#ffd700',
    iconBg: 'bg-neutral-500',
    roleEn: 'Crown Prince of Tapioka Kingdom',
    roleJa: 'タピオカ王国の世継ぎ王',
    roleFi: 'Tapioka-valtakunnan kruununprinssi',
    descEn: 'A gray, round royal boba who wears a golden crown with the letter "王" (King). He is naturally helpful and beloved by his followers. However, because he was extremely lazy, his father dropped him down to the human world! He is working hard in the human world so he can return home.',
    descJa: '灰色で丸くて、「王」と書かれた黄色い王冠をかぶっているよ。とても面倒見が良いので、部下たちからすごく慕われているタピ。でも最近、ちょっとだらけすぎていたから怒られて人間界に落とされちゃった！戻るために人間界で頑張っているタピオカ王だよ。',
    descFi: 'Harmaa, pyöreä ja kuninkaallinen boba-hahmo, jolla on kultainen kruunu "王" (Kuningas) -kirjaimella. Hän on huolehtivainen ja alamaisensa rakastama. Koska hän kuitenkin laiskotteli liikaa, hänen isänsä pudotti hänet ihmisten maailmaan! Hän tekee ahkerasti töitä päästäkseen takaisin kotiin.',
    likesEn: 'Umeboshi (Pickled Plums) - extremely sour!',
    likesJa: '梅干し（だから言ったタピ！）',
    likesFi: 'Umeboshi (japanilaiset suolaluumut) – superhapanta!',
    emoji: '👑'
  },
  {
    id: 'natadecoco',
    nameEn: 'Natadecoco',
    nameJa: 'ナタデココ',
    nameFi: 'Natadecoco',
    color: '#4ADE80',
    borderColor: '#22C55E',
    iconBg: 'bg-green-500',
    roleEn: 'Guard Captain & Best Friend',
    roleJa: 'タピオカ親衛隊の隊長',
    roleFi: 'Kaartin kapteeni & paras ystävä',
    descEn: 'King Tapioca’s best friend and captain of the personal guard. He looks like a round green gelatin with crossed "X X" eyes, but he is actually a mechanical robot! He is controlled by a tiny, adorable pilot sleeping or working hard inside.',
    descJa: 'タピオカ王の親友で、親衛隊の隊長。バッテンおめめ（✕✕）をした黄緑色のからだをしているけど、実は中が操縦室になっているロボットなんだって！中に入って操縦している「ナタデココ本体」が、本当の彼なんだタピ。',
    descFi: 'Kuningas Tapiokan paras ystävä ja kuninkaallisen kaartin kapteeni. Hän näyttää pyöreältä vihreältä hyytelöltä risti-silmillä (✕✕), mutta on todellisuudessa robotti, jota ohjaa pikkuruinen sisällä ahkeroiva lentäjä!',
    likesEn: 'Kaki-pi (Spicy Rice Crackers with Peanuts)',
    likesJa: '柿ピー（ピリッとおいしいタピ）',
    likesFi: 'Kaki-pi (mausteiset japanilaiset riisikeksit)',
    emoji: '🤖'
  },
  {
    id: 'zakuro',
    nameEn: 'Zakuro',
    nameJa: 'ざくろ',
    nameFi: 'Zakuro',
    color: '#FB7185',
    borderColor: '#E11D48',
    iconBg: 'bg-rose-500',
    roleEn: 'The Self-Proclaimed Rival',
    roleJa: '自称・たぴおか王のライバル',
    roleFi: 'Itsejulistautunut kilpailija',
    descEn: 'A pink, box-shaped boba who thinks of King Tapioca as his absolute rival! While he tries to act tough, grinning blocky, he is actually incredibly shy and easily embarrassed. He loves hiding behind corners or in boba cups.',
    descJa: 'ピンク色の四角いからだをしていて、いつもニカッと笑っている。たぴおか王のことを勝手にライバルだと思っているんだ！威勢がよく見えるけど、こう見えて実はめちゃくちゃ恥ずかしがり屋な一面がある可愛いキャラクタータピ。',
    descFi: 'Vaaleanpunainen, neliönmuotoinen boba, joka pitää Kuningas Tapiokaa suurena kilpailijanaan! Vaikka hän yrittää esittää kovaa leveällä hymyllään, hän on todellisuudessa ujo ja rakastaa piiloutua boba-kuppeihin.',
    likesEn: 'Cornflakes & Crunchy Cereal',
    likesJa: 'コーンフレーク（サクサクがたまらんタピ）',
    likesFi: 'Maissihiutaleet ja rapea aamiaismuro',
    emoji: '🟥'
  },
  {
    id: 'okome',
    nameEn: 'Okome',
    nameJa: 'おコメ',
    nameFi: 'Okome',
    color: '#FFFFFF',
    borderColor: '#E2E8F0',
    iconBg: 'bg-white text-black border border-slate-300',
    roleEn: 'The Jungle Mystery',
    roleJa: 'ジャングルのミステリー米',
    roleFi: 'Viidakon salaperäinen riisi',
    descEn: 'A little grain of rice shaped like a friendly jelly-bean, wearing sporty shades and looking super cool. Everything else about him is completely classified. Some say he originated deep inside a tropical jungle, some say he just fell off a dinner plate.',
    descJa: '白いお米のつぶに、黒いサングラスをかけたクールなナイスガイ。おコメ。それ以外は何も分かっていない謎に包まれた仲間タピ。熱帯のジャングルで生まれたとか生まれてないとか、いろんな噂があるタピ。',
    descFi: 'Pieni valkoinen riisinjyvä, joka käyttää aurinkolaseja ja näyttää erittäin rennolta. Kaikki muu hänestä on tarkkaan varjeltu salaisuus. Jotkut sanovat hänen tulleen viidakosta, toiset sanovat hänen pudonneen lautaselta.',
    likesEn: 'Tropical Jungle exploration',
    likesJa: 'ジャングルの探検、ウインクすること',
    likesFi: 'Trooppisen viidakon tutkiminen',
    emoji: '🕶️'
  },
  {
    id: 'kamisama',
    nameEn: 'God of Tapioka',
    nameJa: 'タピオカの神様',
    nameFi: 'Tapiokan Jumala',
    color: '#CBD5E1',
    borderColor: '#F59E0B',
    iconBg: 'bg-amber-100 border border-amber-300 text-amber-600',
    roleEn: 'The Positive Creator',
    roleJa: 'すべてを見守るタピオカの創造主',
    roleFi: 'Kaikkea suojeleva luoja',
    descEn: 'The supreme deity who supposedly created all boba in the world! He floats happily on a fluffy yellow cloud, wears an invisible halo, and carries a golden staff. He has an incredibly positive attitude and always cheers everyone on.',
    descJa: 'タピオカを作ったと言われている偉大な神様。とってもポジティブでいつもにこにこ、黄色い雲の上に乗ってぷかぷか浮かんでいるよ。周りにハッピーをふりまく神様タピ。',
    descFi: 'Suuri jumaluus, jonka sanotaan luoneen kaikki maailman boba-helmet! Hän leijuu aurinkoisella keltaisella pilvellä, hymyilee aina ja tuo positiivista energiaa jokaiseen päivään.',
    likesEn: 'Classic Milk Tea with Boba',
    likesJa: 'ミルクティー（タピオカたっぷり！）',
    likesFi: 'Klassinen boba-maitotee',
    emoji: '☁️'
  }
];

export const EPISODES: VideoEpisode[] = [
  {
    id: 1,
    titleEn: 'Episode 1: King Falls to Earth!',
    titleJa: '第1話：たぴおか王、人間界に落下する！',
    titleFi: 'Jakso 1: Kuningas putoaa Maahan!',
    descriptionEn: 'Because King Tapioca was always slacking off, his father pushed him off the clouds into the human world! "Why?!" he cried as he plummeted down.',
    descriptionJa: 'たぴおか王がだらけていたから、お城から人間界に落とされちゃった！「Why?」と叫びながら落下する王の運命はいかに！？',
    descriptionFi: 'Koska Kuningas Tapioka laiskotteli linnassa, hänen isänsä pudotti hänet pilvistä ihmisten maailmaan! "Miksi?!" hän huusi pudotessaan.',
    icon: 'CloudLightning',
    duration: '0:35',
    animatedScenario: 'fall'
  },
  {
    id: 2,
    titleEn: 'Episode 2: The Watermelon Face-off',
    titleJa: '第2話：すいかカット！中から何が出る？',
    titleFi: 'Jakso 2: Vesimeloni leikataan!',
    descriptionEn: 'A high-stakes experiment where King Tapiocas face is carved onto a real watermelon and split open. Watch the red center unfold!',
    descriptionJa: 'リアルなすいかに「たぴおか王」の顔を彫刻して真っ二つにカット！中は真っ赤でジューシー！おいしそうなすいかだよ。',
    descriptionFi: 'Kuningas Tapiokan ilme kaiverrettiin oikeaan vesimeloniin ja leikattiin kahtia. Mehukas punainen sisus paljastuu!',
    icon: 'Citrus',
    duration: '0:20',
    animatedScenario: 'watermelon'
  },
  {
    id: 3,
    titleEn: 'Episode 3: Sour Pickled Plum!',
    titleJa: '第3話：酸っぱい！恐怖の梅干し体験',
    titleFi: 'Jakso 3: Hapanta! Umeboshi-kokemus',
    descriptionEn: 'King Tapioca loves Umeboshi, but one giant pickled plum makes his face turn into a squeezed-up sour ball! Is it too sour?',
    descriptionJa: 'たぴおか王の大好物は「梅干し」！でも、超絶すっぱい特製梅干しを食べたら、顔がキューっとシワシワになっちゃったタピ！',
    descriptionFi: 'Kuningas Tapioka rakastaa suolaluumuja, mutta erittäin hapan luumu vetää hänen kasvonsa aivan ryttyyn!',
    icon: 'Skull',
    duration: '0:45',
    animatedScenario: 'umeboshi'
  },
  {
    id: 4,
    titleEn: 'Episode 4: The Core of Natadecoco',
    titleJa: '第4話：ナタデココの巨大ロボコックピット',
    titleFi: 'Jakso 4: Natadecocon robottiohjaamo',
    descriptionEn: 'Discover the secret mechanics of Natadecoco! Watch the pilot enter the brain computer and navigate this green jelly robot.',
    descriptionJa: '緑色のからだをした強敵ナタデココの秘密基地！実は中はコックピットで、本物のナタデココがせっせと操縦している様子を公開！',
    descriptionFi: 'Kurkista vihreän Natadecoco-robotin salaisuuteen! Pieni lentäjä istuu ohjaamossa ja ohjaa jättimäistä hyytelörobottia.',
    icon: 'Bot',
    duration: '0:30',
    animatedScenario: 'robot'
  },
  {
    id: 5,
    titleEn: 'Episode 5: Boba Dancing Trio',
    titleJa: '第5話：タピおか３人衆、カップでダンシング！',
    titleFi: 'Jakso 5: Boba-kolmikon tanssi kupissa!',
    descriptionEn: 'King Tapioca, Natadecoco, and Zakuro dive in and out of sweet milk tea cups, performing a bubbly and energetic synchronized boba dance.',
    descriptionJa: 'たぴおか王、ナタデココ、ざくろがタピオカドリンクのカップに入って大はしゃぎ！ぷかぷかと上下に跳ねながらの可愛いダンス。',
    descriptionFi: 'Kuningas Tapioka, Natadecoco ja Zakuro hyppäävät maitoteekuppiin ja esittävät riemukkaan ja rytmikkään boba-tanssin.',
    icon: 'Music',
    duration: '0:50',
    animatedScenario: 'bobaCup'
  },
  {
    id: 6,
    titleEn: 'Episode 6: Okome’s Jungle Survival',
    titleJa: '第6話：おコメ、ジャングルのサバイバル',
    titleFi: 'Jakso 6: Okomen viidakkoseikkailu',
    descriptionEn: 'Okome wears sunglasses and wanders through a thick jungle. How did he get there, and what is he searching for? The ultimate mystery.',
    descriptionJa: 'サングラスをかけたおコメがジャングルを探検！ヤシの木やバナナの間をくぐり抜け、自分のルーツをたどるミステリアスな物語。',
    descriptionFi: 'Coolisti aurinkolaseja käyttävä Okome vaeltaa syvällä viidakossa etsimässä juuriaan.',
    icon: 'Compass',
    duration: '0:40',
    animatedScenario: 'okome'
  },
  {
    id: 7,
    titleEn: 'Episode 7: Spot the Real King!',
    titleJa: '第7話：大量発生！ニセモノから本物を見つけろ',
    titleFi: 'Jakso 7: Löydä oikea Kuningas!',
    descriptionEn: 'A massive crowd of bobas flood the screen! Some are smiling, some are crying, but only one is the true King Tapioca. Can you spot him?',
    descriptionJa: '画面いっぱいにたぴおか王の顔がいっぱい！でも変な顔ばかり。王冠をかぶって気だるい表情の本物の王様はどこに隠れているタピ？',
    descriptionFi: 'Valtava joukko boba-hahmoja täyttää ruudun! Vain yksi heistä on aito Kuningas Tapioka. Löydätkö hänet?',
    icon: 'Eye',
    duration: '1:10',
    animatedScenario: 'findKing'
  },
  {
    id: 8,
    titleEn: 'Episode 8: Stamping the Fluffy Roll Cake',
    titleJa: '第8話：特製スタンプ・ロールケーキ誕生！',
    titleFi: 'Jakso 8: Pehmeän kääretortun leimaus!',
    descriptionEn: 'The delicious creation of the Tapi Life Roll Cake. Watch hot metal stamps imprint the outlines of King, Zakuro, and Natadecoco on the sponge.',
    descriptionJa: 'ほかほかの真っ白いロールケーキの生地に、焼きごてをポンポン！たぴおか達のイラストがくっきりとスタンプされる癒やしの瞬間。',
    descriptionFi: 'Pehmeän Tapi Life -kääretortun valmistus. Hahmojen iloiset kasvot leimataan kääretortun pintaan!',
    icon: 'Sparkles',
    duration: '0:30',
    animatedScenario: 'cakeStamp'
  }
];

export const GALLERY: GalleryItem[] = [
  {
    id: 'gal_collage',
    type: 'drawing',
    titleEn: 'Character Doodle Collage Board',
    titleJa: 'たぴおか王と仲間たちの落書きボード',
    titleFi: 'Hahmojen piirustus- ja luonnoskollaasi',
    descEn: 'A huge paper board filled with colorful drawings, character designs, doodles, and pictures showing the full roster of Tapi Life.',
    descJa: '手書きの可愛い落書きや写真がいっぱい散りばめられた、みんなで作ったにぎやかなコラージュボード。お気に入りを見つけてね。',
    descFi: 'Suuri paperipinta täynnä värikkäitä piirustuksia, hahmoluonnoksia ja valokuvia Tapi Lifen ystävistä.'
  },
  {
    id: 'gal_building',
    type: 'photo',
    titleEn: 'Kingdom Clinic Building Directory',
    titleJa: 'ビルインフォメーション案内板',
    titleFi: 'Kuninkaan klinikan rakennuskartta',
    descEn: 'Handwritten diagram for the building layout, including a 1F clinic, 2F bicycle shop, 3F conveyer belt sushi, 4F restaurant, 5F bowling, and 6F cinema.',
    descJa: '1階のまつざかクリニックから、3階の回転ずし、5階のボウリング・ビリヤードコーナー、6階の映画館まで、面白施設が並ぶ手書きの案内板！',
    descFi: 'Käsinpiirretty hauska opastaulu, jossa esitellään klinikan kerrokset aina sushibaarista elokuvateatteriin asti!'
  },
  {
    id: 'gal_sdgs',
    type: 'drawing',
    titleEn: 'SDGs Rainbow Colorful Display',
    titleJa: 'SDGsカラフルクラフトボードと手形',
    titleFi: 'Värikäs sateenkaari- ja kädenjälkitaulu',
    descEn: 'A handmade colorful craft project with SDGs cards and rainbow colors showcasing Tapi Lifes support for sustainable global goals!',
    descJa: 'みんなでカラフルに絵の具をぬって、SDGs（持続可能な開発目標）のアイコンを並べた、ハッピーで地球にやさしいクラフト作品。',
    descFi: 'Käsintehty värikäs taideprojekti, joka tukee kestävän kehityksen tavoitteita iloisilla sateenkaaren väreillä.'
  },
  {
    id: 'gal_watermelon_real',
    type: 'photo',
    titleEn: 'Hand-Carved Tapioka Watermelon',
    titleJa: '手彫りのたぴおかスイカ王',
    titleFi: 'Käsinveistetty vesimelonikuningas',
    descEn: 'A real premium striped watermelon meticulously hand-carved with King Tapioca’s grumbling facial features, ready to be sliced open.',
    descJa: '本物の大きなスイカに、たぴおか王の顔を彫り込んだ芸術作品！真ん中でパカッと切ると、美味しい赤色の果肉が登場したよ。',
    descFi: 'Aitoon raikkaaseen vesimeloniin huolellisesti kaiverrettu Kuningas Tapiokan hahmo.'
  },
  {
    id: 'gal_scroll',
    type: 'photo',
    titleEn: 'Scroll of Eternal Boba Stories',
    titleJa: '大人のスクロール熱演ペイント',
    titleFi: 'Ikuisten boba-tarinoiden käärö',
    descEn: 'A young girl concentrated on hand-writing boba character comics down an incredibly long paper scroll stretching across the dining room floor!',
    descJa: '何メートルもある長い巻物に、たぴおか達の楽しい4コマ漫画や文字をぎっしり手書きで描いている可愛い創作の様子。',
    descFi: 'Pitkä paperikäärö lattialla, johon on piirretty hauskoja neliruutuisia sarjakuvia Tapi Lifen seikkailuista.'
  },
  {
    id: 'gal_merch_showcase',
    type: 'merch',
    titleEn: 'Merch Collection Outfit',
    titleJa: 'タピ・ライフ限定グッズ大集合！',
    titleFi: 'Tapi Life -tuotekokoelma',
    descEn: 'Premium Tapi Life canvas tote bags, custom printed T-shirts, and the large plush gray cushion arranged on a wooden floor.',
    descJa: '木の床の上に並んだ、たぴおか王クッション、オリジナルトートバッグ、そして特製Tシャツ！お部屋やお出かけがハッピーになるグッズたち。',
    descFi: 'Tapi Life -kangaskasseja, t-paitoja ja pehmeä harmaa jättityyny puulattialla.'
  }
];

export const MERCH: MerchItem[] = [
  {
    id: 'm1',
    nameEn: 'Kingdom Clinic Directory Art Print',
    nameJa: 'まつざかクリニック案内板 アートプリント',
    nameFi: 'Opastaulun taidejuliste',
    price: '¥2,200',
    descriptionEn: 'High-quality fine-art print of the hand-drawn retro building directory of Kingdom Clinic, as featured on Yoshi Tsuijis official Instagram.',
    descriptionJa: 'インスタで大反響を呼んだ、原作者・辻義直筆のゆるかわいい「まつざかクリニック案内板」の高品質アートプリント複製画です。',
    descriptionFi: 'Laadukas taideprintti Yoshi Tsuijin käsinpiirtämästä suositusta klinikan opastaulusta.',
    svgId: 'building'
  },
  {
    id: 'm2',
    nameEn: 'Hand-Carved Watermelon Premium Photo Card',
    nameJa: '手彫りすいか王 プレミアムフォトカード',
    nameFi: 'Vesimelonikuninkaan valokuvakortti',
    price: '¥800',
    descriptionEn: 'Glossy commemorative photograph of the real hand-carved striped watermelon capturing King Tapioca’s grumbling facial features.',
    descriptionJa: '本物の大きなスイカに、たぴおか王を丁寧に手彫りした特別な「すいか王」の撮り下ろしプレミアムコレクターカードです。',
    descriptionFi: 'Kiiltävä keräilyvalokuvakortti aidosta käsinveistetystä vesimelonikuninkaasta.',
    svgId: 'watermelon'
  },
  {
    id: 'm3',
    nameEn: 'Character Doodle Collage High-Quality Board',
    nameJa: 'たぴおか落書きコラージュ 複製イラストボード',
    nameFi: 'Luonnoskollaasin taulukortti',
    price: '¥3,500',
    descriptionEn: 'Beautiful matte cardstock board compilation showing Yoshi Tsuijis hand-designed doodles and draft illustrations of boba friends.',
    descriptionJa: 'たぴおか王やナタデココたちの初期デザインや日常の落書きをにぎやかに集めた、コラージュ木製フレーム入りイラストボード。',
    descriptionFi: 'Mattapintainen kehystettävä taulukortti Yoshi Tsuijin hahmoluonnoksista ja piirroksista.',
    svgId: 'collage'
  },
  {
    id: 'm4',
    nameEn: 'SDGs Rainbow Colorful Canvas Board',
    nameJa: 'SDGsカラフル手形アート 複製キャンバス',
    nameFi: 'Värikäs sateenkaaricanvas',
    price: '¥4,800',
    descriptionEn: 'A vibrant canvas reproduction of the organic handmade rainbow handprint art design supporting sustainable global goals.',
    descriptionJa: '地球とみんながハッピーになるSDGsへの思いが込められた、絵の具のカラフル手形アートの高品質キャンバスプリント。',
    descriptionFi: 'Eläväinen kanvaasitaulu käsintehdystä värikkäästä kädenjälkitaiteesta.',
    svgId: 'sdgs'
  },
  {
    id: 'm5',
    nameEn: 'Scroll of Eternal Stories Replica Roll',
    nameJa: '4コマ漫画 複製エマーブル絵巻物',
    nameFi: 'Sarjakuvakäärön replika',
    price: '¥5,500',
    descriptionEn: 'A miniature high-fidelity replica scroll featuring the full handwritten comic trails of Tapi Life friends on continuous styled parchment.',
    descriptionJa: 'テーブルいっぱいに広がる、たぴおか達の愉快な日常を描いた手書き長尺絵巻物（4コマ漫画ロール）をお部屋に飾れる形で完全再現。',
    descriptionFi: 'Tarkka miniatyyrikäärö, jossa on Tapi Lifen hauskoja käsinpiirrettyjä sarjakuvatarinoita.',
    svgId: 'scroll'
  }
];
