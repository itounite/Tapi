import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, RefreshCw, Play, Volume2, Award, Zap, HelpCircle } from 'lucide-react';
import { Language } from '../types';

interface SpotTheKingGameProps {
  lang: Language;
}

interface BobaItem {
  id: number;
  isRealKing: boolean;
  type: 'fake' | 'normal' | 'zakuro' | 'natadecoco' | 'okome' | 'impostor_crown' | 'impostor_bowtie';
  rotation: number;
  scale: number;
  x: number; // grid position or offset for organic feeling
  y: number;
  expression: string; // for fun faces
}

export default function SpotTheKingGame(props: SpotTheKingGameProps) {
  const { lang } = props;
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(() => {
    return Number(localStorage.getItem('tapi_game_highscore') || '0');
  });
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [bobas, setBobas] = useState<BobaItem[]>([]);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [showFeedback, setShowFeedback] = useState<'success' | 'fail' | null>(null);
  const [hintsUsed, setHintsUsed] = useState<number>(0);
  const [feedbackCoord, setFeedbackCoord] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Generate a random list of bobas for the grid
  const generateLevel = () => {
    const list: BobaItem[] = [];
    const count = 35; // 35 total grid items
    const kingIndex = Math.floor(Math.random() * count);

    const impostorCrowns = ['玉', '主', '土', '国', '工'];
    const fakeTypes: Array<BobaItem['type']> = ['normal', 'zakuro', 'natadecoco', 'okome', 'impostor_crown', 'impostor_bowtie'];

    for (let i = 0; i < count; i++) {
      if (i === kingIndex) {
        list.push({
          id: i,
          isRealKing: true,
          type: 'normal', // King body is normal grey
          rotation: Math.random() * 20 - 10,
          scale: 1,
          x: Math.random() * 20 - 10,
          y: Math.random() * 20 - 10,
          expression: '王'
        });
      } else {
        // Randomly select impostor or normal boba
        const selectedType = fakeTypes[Math.floor(Math.random() * fakeTypes.length)];
        let expression = '';
        if (selectedType === 'impostor_crown') {
          expression = impostorCrowns[Math.floor(Math.random() * impostorCrowns.length)];
        }
        list.push({
          id: i,
          isRealKing: false,
          type: selectedType,
          rotation: Math.random() * 40 - 20,
          scale: 0.9 + Math.random() * 0.2, // 0.9 to 1.1 size variation
          x: Math.random() * 24 - 12,
          y: Math.random() * 24 - 12,
          expression: expression
        });
      }
    }
    setBobas(list);
    setShowFeedback(null);
  };

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(30);
    setGameWon(false);
    setHintsUsed(0);
    generateLevel();
  };

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      setIsPlaying(false);
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('tapi_game_highscore', score.toString());
      }
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, timeLeft]);

  const handleBobaClick = (boba: BobaItem, e: React.MouseEvent) => {
    if (!isPlaying) return;

    // Get click position relative to target container for feedback animation
    const rect = e.currentTarget.getBoundingClientRect();
    const parentRect = e.currentTarget.parentElement?.getBoundingClientRect();
    if (parentRect) {
      setFeedbackCoord({
        x: rect.left - parentRect.left + rect.width / 2,
        y: rect.top - parentRect.top + rect.height / 2
      });
    }

    if (boba.isRealKing) {
      // Correct!
      setScore((prev) => prev + 1);
      setShowFeedback('success');
      // Briefly delay generating new level so player sees their victory bounce
      setTimeout(() => {
        generateLevel();
      }, 700);
    } else {
      // Incorrect! Deduct a small bit of time or penalty
      setShowFeedback('fail');
      setTimeLeft((prev) => Math.max(0, prev - 2)); // Subtract 2 seconds penalty!
      setTimeout(() => {
        setShowFeedback(null);
      }, 600);
    }
  };

  const handleHint = () => {
    if (!isPlaying || hintsUsed >= 1) return;
    setHintsUsed((prev) => prev + 1);
    // Find real king index and highlight him
    const king = bobas.find(b => b.isRealKing);
    if (king) {
      alert(lang === 'en' ? 'Hint: Watch closely! The King has a yellow crown with "王" and a red bowtie!' : 'ヒント：王様のカンムリには「王」という文字と、赤い蝶ネクタイがあるよ！');
    }
  };

  return (
    <div id="game-playground" className="max-w-4xl mx-auto bg-amber-50/70 border-4 border-amber-200 rounded-3xl p-6 shadow-xl relative overflow-hidden">
      {/* Decorative floating top elements */}
      <div className="absolute top-0 left-0 right-0 h-3 bg-amber-200" />
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 border-b border-amber-200/50 pb-4">
        <div>
          <h3 className="text-2xl font-bold text-neutral-800 flex items-center gap-2 font-display">
            <span className="text-3xl animate-bounce">{isPlaying ? '🔍' : '👑'}</span>
            {lang === 'en' ? 'Spot King Tapioca!' : '大量発生！たぴおか王を探せ！'}
          </h3>
          <p className="text-sm text-neutral-500 mt-1 max-w-lg">
            {lang === 'en' 
              ? 'Click the REAL King Tapioca! Fakes have wrong bowties or crown letters (like 国, 玉, 土, 主). Hurry, time is ticking!'
              : '大量のたぴおかの中に「たぴおか王」が1人だけ隠れているタピ！王冠に「王」の文字、赤い蝶ネクタイがあるのが本物タピ。'}
          </p>
        </div>

        {/* High Score / Stats */}
        <div className="flex items-center gap-4">
          <div className="bg-white border-2 border-amber-200 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
            <Trophy className="w-5 h-5 text-yellow-500 fill-current" />
            <div className="text-left">
              <div className="text-[9px] text-neutral-400 uppercase font-mono tracking-wider">High Score</div>
              <div className="text-lg font-bold text-neutral-800">{highScore}</div>
            </div>
          </div>
          <div className="bg-white border-2 border-amber-200 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
            <Zap className="w-5 h-5 text-amber-500 fill-current" />
            <div className="text-left">
              <div className="text-[9px] text-neutral-400 uppercase font-mono tracking-wider">Score</div>
              <div className="text-lg font-bold text-amber-600">{score}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative min-h-[380px] flex items-center justify-center bg-white rounded-2xl border-2 border-amber-100 p-4">
        <AnimatePresence mode="wait">
          {!isPlaying ? (
            <motion.div 
              key="start-screen"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-10 max-w-md px-4 flex flex-col items-center"
            >
              {/* Cute visual icon */}
              <div className="relative w-24 h-24 mb-6 animate-float-slow">
                {/* SVG representing King Tapioca */}
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                  <circle cx="50" cy="55" r="35" fill="#7F7F7F" stroke="#333333" strokeWidth="4" />
                  {/* Eyes */}
                  <line x1="38" y1="50" x2="48" y2="50" stroke="#333333" strokeWidth="4" strokeLinecap="round" />
                  <line x1="52" y1="50" x2="62" y2="50" stroke="#333333" strokeWidth="4" strokeLinecap="round" />
                  {/* Mouth */}
                  <path d="M43 65 Q50 60 57 65" fill="none" stroke="#333333" strokeWidth="4" strokeLinecap="round" />
                  {/* Crown */}
                  <path d="M30 30 L40 45 L50 25 L60 45 L70 30 L65 45 L35 45 Z" fill="#FFE03C" stroke="#333333" strokeWidth="3" />
                  <text x="50" y="42" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#333333">王</text>
                  {/* Bowtie */}
                  <polygon points="40,78 60,78 50,85" fill="#EF4444" stroke="#333333" strokeWidth="2" />
                  <polygon points="40,92 60,92 50,85" fill="#EF4444" stroke="#333333" strokeWidth="2" />
                  <circle cx="50" cy="85" r="4" fill="#B91C1C" />
                </svg>
              </div>

              <h4 className="text-xl font-bold text-neutral-800">
                {timeLeft === 0 
                  ? (lang === 'en' ? "Time's Up!" : 'タイムアップタピ！') 
                  : (lang === 'en' ? 'Are you ready?' : 'たぴおか王を探しよう！')}
              </h4>
              <p className="text-neutral-500 mt-2 text-sm">
                {timeLeft === 0 
                  ? (lang === 'en' ? `Amazing effort! You spotted ${score} King Tapiocas!` : `すごいタピ！今回は【${score}回】たぴおか王を見つけられたタピ。`)
                  : (lang === 'en' ? 'Spot as many King Tapiocas as you can in 30 seconds!' : '30秒以内に、できるだけ多くの本物のたぴおか王をタップして見つけるゲームタピ！')}
              </p>

              {timeLeft === 0 && score > 0 && score >= highScore && (
                <div className="mt-4 bg-amber-100 text-amber-800 px-4 py-1.5 rounded-full text-xs font-bold font-mono">
                  🎉 NEW HIGH SCORE! 新記録樹立！
                </div>
              )}

              <button
                onClick={startGame}
                className="mt-6 font-display flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white font-bold px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 text-base"
              >
                <Play className="w-5 h-5 fill-current" />
                {timeLeft === 0 
                  ? (lang === 'en' ? 'Play Again' : 'もう一度あそぶ') 
                  : (lang === 'en' ? 'Start Hunting!' : 'ゲームスタート！')}
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="game-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full flex flex-col justify-between"
            >
              {/* Dynamic Game Overlay banner */}
              <div className="flex items-center justify-between px-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-neutral-500">
                  <span className="font-semibold text-neutral-700">
                    {lang === 'en' ? 'Time Remaining:' : 'のこり時間：'}
                  </span>
                  <div className={`font-mono text-lg font-bold px-3 py-1 rounded-xl shadow-sm ${timeLeft <= 8 ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-neutral-100 text-neutral-700'}`}>
                    {timeLeft}s
                  </div>
                </div>

                {/* Hint Button */}
                <button
                  disabled={hintsUsed >= 1}
                  onClick={handleHint}
                  style={{ opacity: hintsUsed >= 1 ? 0.4 : 1 }}
                  className="flex items-center gap-1.5 px-3 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 rounded-xl text-xs transition font-semibold"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  {lang === 'en' ? 'Hint' : 'ヒント'}
                </button>
              </div>

              {/* Central Grid */}
              <div className="grid grid-cols-5 sm:grid-cols-7 gap-3 py-2 px-1 border-t border-b border-dashed border-amber-100 relative">
                {/* Score popups overlay */}
                <AnimatePresence>
                  {showFeedback === 'success' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: -25, scale: 1.2 }}
                      exit={{ opacity: 0 }}
                      className="absolute pointer-events-none z-10 bg-green-500 text-white font-bold font-mono px-3 py-1 rounded-full text-sm shadow-md"
                      style={{ left: feedbackCoord.x - 30, top: feedbackCoord.y - 20 }}
                    >
                      👑 OK (+1)
                    </motion.div>
                  )}
                  {showFeedback === 'fail' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: -25, scale: 1.2 }}
                      exit={{ opacity: 0 }}
                      className="absolute pointer-events-none z-10 bg-red-500 text-white font-bold font-mono px-3 py-1 rounded-full text-sm shadow-md"
                      style={{ left: feedbackCoord.x - 30, top: feedbackCoord.y - 20 }}
                    >
                      ❌ -2s
                    </motion.div>
                  )}
                </AnimatePresence>

                {bobas.map((boba) => (
                  <motion.div
                    key={boba.id}
                    onClick={(e) => handleBobaClick(boba, e)}
                    whileHover={{ scale: 1.15, rotate: boba.rotation + 5 }}
                    whileTap={{ scale: 0.85 }}
                    style={{ 
                      transform: `rotate(${boba.rotation}deg)`,
                      marginLeft: `${boba.x}px`,
                      marginTop: `${boba.y}px`
                    }}
                    className="aspect-square flex items-center justify-center cursor-pointer select-none"
                  >
                    {/* Render customized SVGs based on boba type */}
                    <div className="w-[45px] h-[45px] relative">
                      {/* Normal and Impostor */}
                      {(boba.type === 'normal' || boba.type === 'impostor_crown' || boba.type === 'impostor_bowtie') && (
                        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
                          {/* Body */}
                          <circle cx="50" cy="55" r="35" fill={boba.isRealKing ? '#7F7F7F' : '#6A6A6A'} stroke="#333333" strokeWidth="4" />
                          
                          {/* Face */}
                          {boba.isRealKing ? (
                            <>
                              <line x1="38" y1="52" x2="48" y2="52" stroke="#333333" strokeWidth="4.5" strokeLinecap="round" />
                              <line x1="52" y1="52" x2="62" y2="52" stroke="#333333" strokeWidth="4.5" strokeLinecap="round" />
                              <path d="M43 66 Q50 61 57 66" fill="none" stroke="#333333" strokeWidth="4" strokeLinecap="round" />
                            </>
                          ) : (
                            <>
                              {/* Slanted or curious face to throw user off */}
                              {boba.id % 3 === 0 ? (
                                <>
                                  <circle cx="40" cy="50" r="3.5" fill="#333333" />
                                  <circle cx="60" cy="50" r="3.5" fill="#333333" />
                                  <circle cx="50" cy="62" r="5" fill="#ec4899" />
                                </>
                              ) : boba.id % 3 === 1 ? (
                                <>
                                  <path d="M35 48 L45 52" stroke="#333333" strokeWidth="4" strokeLinecap="round" />
                                  <path d="M65 48 L55 52" stroke="#333333" strokeWidth="4" strokeLinecap="round" />
                                  <path d="M45 61 Q50 67 55 61" fill="none" stroke="#333333" strokeWidth="4.5" />
                                </>
                              ) : (
                                <>
                                  <circle cx="40" cy="50" r="4.5" fill="#333333" />
                                  <circle cx="60" cy="50" r="4.5" fill="#333333" />
                                  <path d="M45 61 L55 61" stroke="#333333" strokeWidth="4" strokeLinecap="round" />
                                </>
                              )}
                            </>
                          )}

                          {/* Crown - Real King OR Impostor Crown */}
                          {(boba.isRealKing || boba.type === 'impostor_crown') && (
                            <>
                              <path d="M30 30 L40 45 L50 25 L60 45 L70 30 L65 45 L35 45 Z" fill="#FFE03C" stroke="#333333" strokeWidth="3" />
                              <text x="50" y="42" fontSize="13" fontWeight="black" textAnchor="middle" fill="#333333" fontFamily="sans-serif">
                                {boba.isRealKing ? '王' : boba.expression}
                              </text>
                            </>
                          )}

                          {/* Bowtie - Real King OR Impostor Bowtie */}
                          {(boba.isRealKing || boba.type === 'impostor_bowtie') && (
                            <g className="drop-shadow-sm">
                              {/* Real bow is red, impostor bowtie is blue or missing */}
                              <polygon points="40,78 60,78 50,85" fill={boba.isRealKing ? '#EF4444' : '#3B82F6'} stroke="#333333" strokeWidth="2.5" />
                              <polygon points="40,92 60,92 50,85" fill={boba.isRealKing ? '#EF4444' : '#3B82F6'} stroke="#333333" strokeWidth="2.5" />
                              <circle cx="50" cy="85" r="4" fill={boba.isRealKing ? '#B91C1C' : '#1D4ED8'} />
                            </g>
                          )}
                        </svg>
                      )}

                      {/* Zakuro Side-character */}
                      {boba.type === 'zakuro' && (
                        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
                          <rect x="18" y="25" width="64" height="64" rx="10" fill="#FB7185" stroke="#333333" strokeWidth="4" />
                          <circle cx="36" cy="50" r="4" fill="#333333" />
                          <circle cx="64" cy="50" r="4" fill="#333333" />
                          <rect x="42" y="60" width="16" height="8" rx="2" fill="white" stroke="#333333" strokeWidth="3" />
                        </svg>
                      )}

                      {/* Natadecoco Side-character */}
                      {boba.type === 'natadecoco' && (
                        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
                          <circle cx="50" cy="55" r="35" fill="#4ADE80" stroke="#333333" strokeWidth="4" />
                          {/* Crossed eyes */}
                          <path d="M34 46 L44 56 M44 46 L34 56" stroke="#333333" strokeWidth="4" strokeLinecap="round" />
                          <path d="M56 46 L66 56 M66 46 L56 56" stroke="#333333" strokeWidth="4" strokeLinecap="round" />
                          <path d="M42 66 Q50 60 58 66" fill="none" stroke="#333333" strokeWidth="4" strokeLinecap="round" />
                        </svg>
                      )}

                      {/* Okome Side-character */}
                      {boba.type === 'okome' && (
                        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
                          <rect x="32" y="22" width="36" height="66" rx="18" fill="#FFFFFF" stroke="#333333" strokeWidth="4" />
                          {/* Sunglasses */}
                          <path d="M26 44 L74 44" stroke="#333333" strokeWidth="5.5" strokeLinecap="round" />
                          <polygon points="32,44 46,44 44,54 34,54" fill="#111" stroke="#333333" strokeWidth="2" />
                          <polygon points="54,44 68,44 66,54 56,54" fill="#111" stroke="#333333" strokeWidth="2" />
                        </svg>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-neutral-400 font-mono">
                <div>* {lang === 'en' ? 'Click real King Tapioca!' : '本物のたぴおか王だけをクリックしてね。'}</div>
                <div>{bobas.filter(b => b.isRealKing).length} {lang === 'en' ? 'target present' : '人ターゲット'}</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
