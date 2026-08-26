import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, Coffee, Plus, HelpCircle, Sparkles, Heart } from 'lucide-react';
import { Language } from '../types';

interface BobaMakerProps {
  lang: Language;
}

interface ToppingItem {
  id: number;
  type: 'pearl' | 'king' | 'natadecoco' | 'zakuro' | 'okome';
  x: number; // horizontal placement % inside cup (e.g. 20 to 80)
  y: number; // rest height (randomized stack layered from bottom)
  rotation: number;
}

export default function BobaMaker(props: BobaMakerProps) {
  const { lang } = props;
  const [flavor, setFlavor] = useState<'traditional' | 'matcha' | 'taro' | 'strawberry' | 'sky_ramune'>('traditional');
  const [sweetness, setSweetness] = useState<number>(100);
  const [iceLevel, setIceLevel] = useState<'none' | 'less' | 'normal' | 'extra'>('normal');
  const [toppings, setToppings] = useState<ToppingItem[]>([]);
  const [isSlurping, setIsSlurping] = useState<boolean>(false);
  const [slurpCount, setSlurpCount] = useState<number>(0);

  const flavorColors = {
    traditional: { bg: 'bg-amber-100', color: '#DDB892', nameEn: 'Royal Milk Tea', nameJa: '極上ミルクティー' },
    matcha: { bg: 'bg-emerald-50', color: '#A3E635', nameEn: 'Kyoto Matcha Latte', nameJa: '贅沢抹茶ラテ' },
    taro: { bg: 'bg-purple-100', color: '#C084FC', nameEn: 'Creamy Taro Milk', nameJa: 'もちもちタロミルク' },
    strawberry: { bg: 'bg-rose-100', color: '#F472B6', nameEn: 'Sweet Strawberry', nameJa: '完熟いちごミルク' },
    sky_ramune: { bg: 'bg-sky-100', color: '#38BDF8', nameEn: 'Blue Sky Ramune', nameJa: 'あおぞらラムネソーダ' }
  };

  const addTopping = (type: ToppingItem['type']) => {
    if (toppings.length >= 35) return; // Limit to avoid performance lag

    // Layer them dynamically. Higher index toppings sit slightly higher to look stacked.
    const stackHeight = Math.floor(toppings.length / 5) * 10; // offset based on total items
    const randomX = 20 + Math.random() * 60; // 20% to 80% width of cup
    const randomY = 60 + stackHeight + (Math.random() * 15 - 7.5); // base heights start at ~60% up from top of cup
    const randomRot = Math.random() * 360;

    const newItem: ToppingItem = {
      id: Date.now() + Math.random(),
      type,
      x: randomX,
      y: Math.min(88, randomY), // cap to stay inside bottom of glass
      rotation: randomRot
    };

    setToppings((prev) => [...prev, newItem]);
  };

  const handleSlurp = () => {
    if (toppings.length === 0 || isSlurping) return;
    setIsSlurping(true);
    setSlurpCount((p) => p + 1);

    // After 0.8 seconds of anim, remove 4 random items
    setTimeout(() => {
      setToppings((prev) => {
        const copy = [...prev];
        // Remove up to 4 elements from the bottom or random
        const countToRemove = Math.min(4, copy.length);
        for (let i = 0; i < countToRemove; i++) {
          const randomIndex = Math.floor(Math.random() * copy.length);
          copy.splice(randomIndex, 1);
        }
        return copy;
      });
      setIsSlurping(false);
    }, 850);
  };

  const clearCup = () => {
    setToppings([]);
  };

  return (
    <div id="boba-creator-sandbox" className="max-w-4xl mx-auto bg-amber-50/70 border-4 border-amber-200 rounded-3xl p-6 shadow-xl relative">
      <div className="absolute top-0 left-0 right-0 h-3 bg-amber-200" />

      {/* Grid container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Interactive Boba Cup Sandbox Canvas */}
        <div className="col-span-1 lg:col-span-5 flex flex-col items-center justify-center">
          <div className="text-center mb-2">
            <span className="text-xs font-mono bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-bold">
              🥤 TAPI LAB CANVAS
            </span>
          </div>

          <div className="relative w-64 h-[420px] flex items-end justify-center bg-white border-2 border-amber-100 rounded-2xl shadow-inner p-4 overflow-hidden">
            {/* Cup Outline Glass Container */}
            <div className="absolute inset-x-8 bottom-4 top-20 border-4 border-slate-300 border-t-0 rounded-b-[40px] rounded-t-sm z-30 pointer-events-none shadow-[inset_0_4px_16px_rgba(0,0,0,0.05)]">
              {/* Cup Rim Highlight */}
              <div className="absolute -top-1 inset-x-0 h-1 bg-slate-300 rounded-t-full" />
              {/* The "TAPI LIFE" Logo printed on cup */}
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-40 select-none">
                <div className="text-neutral-500 font-display font-black text-xl tracking-wider select-none transform -rotate-12 select-none">TAPI LIFE</div>
                <div className="text-[9px] text-neutral-400 font-mono select-none">Est. 2026</div>
              </div>
            </div>

            {/* Straw */}
            <div className="absolute left-[54%] bottom-[35px] top-2 w-8 bg-red-400/80 border-l border-r border-red-500/50 z-20 pointer-events-none transform -rotate-[10deg] origin-bottom rounded-t-md overflow-hidden">
              {/* Red Stripes */}
              <div className="absolute inset-y-0 left-0 w-2.5 bg-red-500/20" />
              <div className="absolute inset-y-0 right-2 w-1 bg-red-600/30" />
            </div>

            {/* Bubble Tea Liquid Fill */}
            <motion.div 
              animate={{ 
                height: flavor === 'none' ? '0%' : '78%',
                backgroundColor: flavorColors[flavor].color
              }}
              transition={{ duration: 0.5 }}
              className="absolute inset-x-10 bottom-[22px] rounded-b-[34px] overflow-hidden z-10 origin-bottom"
            >
              {/* Sweetness Caramel Drips Overlay */}
              {sweetness >= 100 && (
                <div className="absolute top-0 inset-x-0 h-12 bg-amber-800/20 rounded-b-xl blur-[1px] pointer-events-none flex justify-around">
                  <div className="w-2.5 h-6 bg-amber-800/20 rounded-b-full" />
                  <div className="w-1.5 h-10 bg-amber-800/15 rounded-b-full" />
                  <div className="w-3 h-4 bg-amber-800/20 rounded-b-full" />
                  <div className="w-2 h-8 bg-amber-800/20 rounded-b-full" />
                </div>
              )}

              {/* Slurp Overlay Straw sucking whirlpool effect */}
              <AnimatePresence>
                {isSlurping && (
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: [1, 1.3, 0.8], opacity: [1, 0.8, 1], rotate: [0, 360, 720] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute bottom-2 left-[48%] -translate-x-1/2 w-14 h-14 border-4 border-dashed border-amber-950/20 rounded-full"
                  />
                )}
              </AnimatePresence>

              {/* Floating Ice Cubes */}
              {iceLevel !== 'none' && (
                <div className="absolute inset-x-0 top-6 flex flex-wrap justify-around gap-2 pointer-events-none px-4 opacity-50">
                  <div className="w-6 h-6 bg-white/40 border border-white/60 rounded-md transform rotate-12" />
                  <div className="w-5 h-5 bg-white/30 border border-white/60 rounded-md transform -rotate-45" />
                  {iceLevel === 'extra' && (
                    <>
                      <div className="w-6 h-6 bg-white/40 border border-white/60 rounded-md transform rotate-45" />
                      <div className="w-4 h-4 bg-white/30 border border-white/50 rounded-md transform -rotate-12" />
                    </>
                  )}
                </div>
              )}
            </motion.div>

            {/* Topping Sprites rendered dynamically */}
            <div className="absolute inset-x-10 bottom-[22px] h-[78%] z-15 pointer-events-none rounded-b-[34px] overflow-hidden">
              <AnimatePresence>
                {toppings.map((topping, index) => (
                  <motion.div
                    key={topping.id}
                    initial={{ y: -300, x: `${topping.x}%`, opacity: 0, scale: 0.5 }}
                    animate={{ 
                      y: `${topping.y}%`, // settles at bottom base
                      x: `${topping.x}%`, 
                      opacity: 1, 
                      scale: 1,
                      rotate: topping.rotation
                    }}
                    exit={{ scale: 0, opacity: 0, y: 300 }}
                    transition={{ 
                      type: 'spring',
                      stiffness: 110,
                      damping: 12,
                      mass: 1.1,
                      delay: 0.02
                    }}
                    className="absolute -ml-5 -mb-5"
                    style={{ bottom: 0, left: 0 }}
                  >
                    {topping.type === 'pearl' && (
                      <div className="w-10 h-10 rounded-full bg-neutral-800 border-2 border-neutral-900 shadow-md flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-neutral-600/60 -mt-1 -ml-1" />
                      </div>
                    )}
                    {topping.type === 'king' && (
                      <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-md">
                        <circle cx="50" cy="55" r="35" fill="#7F7F7F" stroke="#111" strokeWidth="5" />
                        <path d="M30 30 L40 45 L50 25 L60 45 L70 30 L65 45 L35 45 Z" fill="#FFE03C" stroke="#111" strokeWidth="4" />
                        <text x="50" y="42" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#333333">王</text>
                        <line x1="38" y1="50" x2="48" y2="50" stroke="#333" strokeWidth="5" strokeLinecap="round" />
                        <line x1="52" y1="50" x2="62" y2="50" stroke="#333" strokeWidth="5" strokeLinecap="round" />
                        <path d="M43 65 Q50 60 57 65" fill="none" stroke="#333" strokeWidth="5" strokeLinecap="round" />
                        {/* Red Bow */}
                        <polygon points="43,80 57,80 50,85" fill="#EF4444" stroke="#111" strokeWidth="2" />
                        <polygon points="43,90 57,90 50,85" fill="#EF4444" stroke="#111" strokeWidth="2" />
                        <circle cx="50" cy="85" r="3" fill="#B91C1C" />
                      </svg>
                    )}
                    {topping.type === 'natadecoco' && (
                      <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-md">
                        <circle cx="50" cy="55" r="35" fill="#4ADE80" stroke="#111" strokeWidth="5" />
                        <path d="M34 46 L44 56 M44 46 L34 56" stroke="#111" strokeWidth="5" strokeLinecap="round" />
                        <path d="M56 46 L66 56 M66 46 L56 56" stroke="#111" strokeWidth="5" strokeLinecap="round" />
                        <path d="M42 66 Q50 60 58 66" fill="none" stroke="#111" strokeWidth="5" strokeLinecap="round" />
                      </svg>
                    )}
                    {topping.type === 'zakuro' && (
                      <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-md">
                        <rect x="18" y="25" width="64" height="64" rx="10" fill="#FB7185" stroke="#111" strokeWidth="5" />
                        <circle cx="36" cy="50" r="4.5" fill="#111" />
                        <circle cx="64" cy="50" r="4.5" fill="#111" />
                        <rect x="42" y="60" width="16" height="8" rx="2" fill="white" stroke="#111" strokeWidth="3.5" />
                      </svg>
                    )}
                    {topping.type === 'okome' && (
                      <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-md">
                        <rect x="30" y="20" width="40" height="68" rx="20" fill="#FFFFFF" stroke="#111" strokeWidth="5" />
                        <path d="M22 42 L78 42" stroke="#111" strokeWidth="6.5" strokeLinecap="round" />
                        <polygon points="30,42 45,42 43,52 32,52" fill="#111" stroke="#111" strokeWidth="2" />
                        <polygon points="55,42 70,42 68,52 57,52" fill="#111" stroke="#111" strokeWidth="2" />
                      </svg>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Customizer Control Panel */}
        <div className="col-span-1 lg:col-span-7 space-y-6">
          <div>
            <span className="text-xs bg-amber-200 text-amber-900 font-bold px-2.5 py-1 rounded-md uppercase font-mono">
              {lang === 'en' ? 'Step 1: Choose Flavor' : 'ステップ1：フレーバーを選ぶ'}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
              {Object.entries(flavorColors).map(([key, item]) => (
                <button
                  key={key}
                  onClick={() => setFlavor(key as any)}
                  className={`px-3 py-2.5 rounded-xl text-xs font-bold border-2 transition-all flex items-center gap-2 ${flavor === key ? 'border-amber-500 bg-white shadow-sm scale-[1.02]' : 'border-neutral-200/60 bg-neutral-50/50 hover:bg-white text-neutral-600'}`}
                >
                  <span className="w-4.5 h-4.5 rounded-full shadow-inner border border-neutral-300" style={{ backgroundColor: item.color }} />
                  {lang === 'en' ? item.nameEn : item.nameJa}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs bg-amber-200 text-amber-900 font-bold px-2.5 py-1 rounded-md uppercase font-mono">
              {lang === 'en' ? 'Step 2: Ice & Sweetness' : 'ステップ2：甘さと氷の量'}
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              {/* Ice Selector */}
              <div className="bg-white border border-neutral-200/80 p-3 rounded-2xl">
                <div className="text-xs font-bold text-neutral-500 mb-2">🧊 {lang === 'en' ? 'Ice Level' : '氷の量'}</div>
                <div className="flex gap-1">
                  {(['none', 'less', 'normal', 'extra'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setIceLevel(level)}
                      className={`flex-1 text-[10px] py-1.5 font-bold rounded-lg uppercase border transition ${iceLevel === level ? 'bg-sky-100 text-sky-800 border-sky-300' : 'bg-neutral-50 text-neutral-500 hover:bg-neutral-100 border-neutral-200/50'}`}
                    >
                      {level === 'none' && (lang === 'en' ? 'None' : 'ゼロ')}
                      {level === 'less' && (lang === 'en' ? 'Less' : '少なめ')}
                      {level === 'normal' && (lang === 'en' ? 'Normal' : 'ふつう')}
                      {level === 'extra' && (lang === 'en' ? 'Extra' : '多め')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sweetness Selector */}
              <div className="bg-white border border-neutral-200/80 p-3 rounded-2xl">
                <div className="text-xs font-bold text-neutral-500 mb-2">🍬 {lang === 'en' ? 'Sweetness' : '甘さ'}</div>
                <div className="flex gap-1">
                  {([0, 50, 100, 120] as const).map((sweet) => (
                    <button
                      key={sweet}
                      onClick={() => setSweetness(sweet)}
                      className={`flex-1 text-[10px] py-1.5 font-bold rounded-lg border transition ${sweetness === sweet ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-neutral-50 text-neutral-500 hover:bg-neutral-100 border-neutral-200/50'}`}
                    >
                      {sweet === 0 && '0%'}
                      {sweet === 50 && '50%'}
                      {sweet === 100 && '100%'}
                      {sweet === 120 && '120%'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between border-b border-dashed border-neutral-200 pb-2">
              <span className="text-xs bg-amber-200 text-amber-900 font-bold px-2.5 py-1 rounded-md uppercase font-mono">
                {lang === 'en' ? 'Step 3: Spawn Boba Buddies (Tap!)' : 'ステップ3：トッピングを降らせよう！'}
              </span>
              <span className="text-[10px] font-mono text-neutral-400">
                {toppings.length} / 35 {lang === 'en' ? 'items' : '個'}
              </span>
            </div>
            {/* Click to add buttons */}
            <div className="flex flex-wrap gap-2.5 mt-3">
              <button
                onClick={() => addTopping('pearl')}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-900 active:scale-95 text-white text-xs font-bold rounded-full shadow-md flex items-center gap-1.5 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                ⚫ {lang === 'en' ? 'Tapioca Pearl' : 'もちもちタピオカ'}
              </button>
              <button
                onClick={() => addTopping('king')}
                className="px-4 py-2 bg-[#7F7F7F] hover:bg-neutral-700 active:scale-95 text-white text-xs font-bold rounded-full shadow-md flex items-center gap-1.5 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                👑 {lang === 'en' ? 'King Tapi' : 'たぴおか王'}
              </button>
              <button
                onClick={() => addTopping('natadecoco')}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 active:scale-95 text-white text-xs font-bold rounded-full shadow-md flex items-center gap-1.5 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                🤖 {lang === 'en' ? 'Natadecoco' : 'ナタデココ'}
              </button>
              <button
                onClick={() => addTopping('zakuro')}
                className="px-4 py-2 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white text-xs font-bold rounded-full shadow-md flex items-center gap-1.5 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                🟥 {lang === 'en' ? 'Zakuro' : 'ざくろ'}
              </button>
              <button
                onClick={() => addTopping('okome')}
                className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border border-slate-300 active:scale-95 text-xs font-bold rounded-full shadow-md flex items-center gap-1.5 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                🕶️ {lang === 'en' ? 'Okome' : 'おコメ'}
              </button>
            </div>
          </div>

          {/* Interactive Actions */}
          <div className="flex gap-3 border-t border-amber-200/40 pt-5">
            <button
              disabled={toppings.length === 0 || isSlurping}
              onClick={handleSlurp}
              className={`flex-1 px-4 py-3 bg-gradient-to-r from-red-400 to-rose-400 hover:from-red-500 hover:to-rose-500 text-white font-black text-sm rounded-2xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 ${toppings.length === 0 ? 'opacity-40 cursor-not-allowed' : 'animate-pulse'}`}
            >
              🥤 {lang === 'en' ? 'SLURP! (Take a Sip)' : 'ゴクゴク！飲む！'}
            </button>

            <button
              onClick={clearCup}
              className="px-4 py-3 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 font-bold text-xs rounded-2xl transition-all active:scale-95 flex items-center gap-1.5"
            >
              <RefreshCw className="w-4 h-4" />
              {lang === 'en' ? 'Empty Cup' : 'カップを空にする'}
            </button>
          </div>

          {/* Dialog bubble */}
          <div className="bg-amber-100/60 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-2.5">
            <Sparkles className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">
                {lang === 'en' ? 'Tapioca Slurp Physics:' : 'たぴおかゴクゴク物理学：'}
              </p>
              <p className="mt-1 leading-relaxed text-neutral-600">
                {lang === 'en' 
                  ? 'Each sip sucks up 4 random boba cookies from the bottom. If you slurped too much, just spawn more! Your final mix shows up in the shop as customized Tapioca tea!'
                  : 'ストローでゴクゴク飲むと、カップの底から4つのたぴおか達がランダムでシュッと吸い込まれるタピ！。いっぱい飲んだらまた追加してね。'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
