import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Volume2,
  VolumeX,
  Lock,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Compass,
  Play,
  Unlock,
  Dna,
} from 'lucide-react';
import { Language, ThemeMode } from '../types';
import {
  GENES,
  WORLDS,
  LEVEL_MANIFEST,
  LEVELS,
  WorldId,
  LevelConfig,
  SimulationOutcome,
} from '../data/bioBuilderData';

interface BioBuilderPageProps {
  lang: Language;
  onNavigate: (path: string) => void;
  theme?: ThemeMode;
  embedded?: boolean;
}

type ProgressMap = Record<number, boolean>;
type ScreenMode = 'worlds' | 'worldLevels' | 'level';

const STORAGE_KEY = 'biobuilder_progress';

function loadProgress(): ProgressMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ProgressMap) : {};
  } catch {
    return {};
  }
}

function saveProgress(progress: ProgressMap) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // ignore storage errors
  }
}

export default function BioBuilderPage({
  lang,
  onNavigate,
  theme = 'light',
  embedded = false,
}: BioBuilderPageProps) {
  const isDark = theme === 'dark';

  // Persistent campaign progress
  const [progress, setProgress] = useState<ProgressMap>(loadProgress);
  const [unlockAll, setUnlockAll] = useState(false);

  // Screen navigation within the BioBuilder game
  const [screen, setScreen] = useState<ScreenMode>('worlds');
  const [selectedWorld, setSelectedWorld] = useState<WorldId>('ocean');
  const [currentLevelId, setCurrentLevelId] = useState<number>(1);

  // Level simulation state
  const [chosenGenes, setChosenGenes] = useState<(string | null)[]>([]);
  const [activeSlot, setActiveSlot] = useState<number>(0);
  const [simResult, setSimResult] = useState<SimulationOutcome | null>(null);
  const [revealedCells, setRevealedCells] = useState<number>(0);
  const [hintText, setHintText] = useState<string>('');
  const [hintTone, setHintTone] = useState<'neutral' | 'win' | 'warn' | 'fail'>('neutral');

  // Optional soft sound effects using Web Audio API (no external audio files needed)
  const [soundEnabled, setSoundEnabled] = useState(true);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const animTimersRef = useRef<number[]>([]);

  const clearAnimTimers = useCallback(() => {
    animTimersRef.current.forEach((id) => window.clearTimeout(id));
    animTimersRef.current = [];
  }, []);

  useEffect(() => {
    return () => {
      clearAnimTimers();
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [clearAnimTimers]);

  const playTone = useCallback(
    (type: 'snap' | 'remove' | 'run' | 'win' | 'warn' | 'fail') => {
      if (!soundEnabled || typeof window === 'undefined') return;
      try {
        const AudioCtx =
          window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtx) return;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioCtx();
        }
        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') {
          ctx.resume().catch(() => {});
        }
        const now = ctx.currentTime;

        const playNote = (freq: number, start: number, dur: number, gainVal = 0.06, oscType: OscillatorType = 'sine') => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = oscType;
          osc.frequency.setValueAtTime(freq, now + start);
          gain.gain.setValueAtTime(0.001, now + start);
          gain.gain.exponentialRampToValueAtTime(gainVal, now + start + 0.015);
          gain.gain.exponentialRampToValueAtTime(0.001, now + start + dur);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + start);
          osc.stop(now + start + dur + 0.02);
        };

        if (type === 'snap') {
          playNote(523.25, 0, 0.09, 0.05, 'triangle');
          playNote(659.25, 0.04, 0.1, 0.04, 'triangle');
        } else if (type === 'remove') {
          playNote(392, 0, 0.08, 0.04, 'sine');
        } else if (type === 'run') {
          playNote(440, 0, 0.1, 0.04, 'triangle');
          playNote(554.37, 0.08, 0.12, 0.04, 'triangle');
        } else if (type === 'win') {
          playNote(523.25, 0, 0.14, 0.06, 'triangle');
          playNote(659.25, 0.1, 0.14, 0.06, 'triangle');
          playNote(783.99, 0.2, 0.28, 0.07, 'triangle');
        } else if (type === 'warn') {
          playNote(440, 0, 0.12, 0.05, 'sine');
          playNote(415.3, 0.12, 0.18, 0.04, 'sine');
        } else {
          playNote(329.63, 0, 0.15, 0.05, 'sawtooth');
          playNote(261.63, 0.14, 0.24, 0.05, 'sawtooth');
        }
      } catch {
        // ignore audio context failures
      }
    },
    [soundEnabled]
  );

  // Derived progress stats
  const totalLevels = LEVEL_MANIFEST.length;
  const completedCount = useMemo(
    () => Object.values(progress).filter(Boolean).length,
    [progress]
  );

  const nextPlayableLevelId = useMemo(() => {
    const next = LEVEL_MANIFEST.find((m) => !progress[m.id]);
    return next ? next.id : 1;
  }, [progress]);

  const isLevelUnlocked = useCallback(
    (levelId: number) => {
      if (unlockAll || levelId === 1) return true;
      return Boolean(progress[levelId - 1] || progress[levelId]);
    },
    [progress, unlockAll]
  );

  // Initialize a level cleanly
  const openLevel = useCallback(
    (levelId: number) => {
      const cfg = LEVELS[levelId];
      if (!cfg) return;
      clearAnimTimers();
      setSelectedWorld(cfg.world);
      setCurrentLevelId(levelId);
      setChosenGenes(Array(cfg.slots).fill(null));
      setActiveSlot(0);
      setSimResult(null);
      setRevealedCells(0);
      setHintText(cfg.zoeIntro);
      setHintTone('neutral');
      setScreen('level');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [clearAnimTimers]
  );

  const openWorld = useCallback((worldId: WorldId) => {
    setSelectedWorld(worldId);
    setScreen('worldLevels');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const currentConfig: LevelConfig = LEVELS[currentLevelId] || LEVELS[1];

  const placedGeneIds = useMemo(
    () => chosenGenes.filter((g): g is string => g !== null),
    [chosenGenes]
  );

  const allSlotsFilled = chosenGenes.length === currentConfig.slots && chosenGenes.every(Boolean);

  const handleSelectSlot = (slotIdx: number) => {
    if (chosenGenes[slotIdx]) {
      // Remove gene from filled slot
      const removed = chosenGenes[slotIdx];
      const next = [...chosenGenes];
      next[slotIdx] = null;
      setChosenGenes(next);
      setActiveSlot(slotIdx);
      setSimResult(null);
      setRevealedCells(0);
      clearAnimTimers();
      setHintText(
        `Removed "${removed ? GENES[removed]?.label : ''}" — click another gene from the library to fill Slot ${slotIdx + 1}.`
      );
      setHintTone('neutral');
      playTone('remove');
    } else {
      setActiveSlot(slotIdx);
      setHintText(
        `Slot ${slotIdx + 1} selected — pick any gene from the DNA library to insert here.`
      );
      setHintTone('neutral');
    }
  };

  const handlePlaceGene = (geneId: string) => {
    if (placedGeneIds.includes(geneId)) return;

    // Target currently selected empty slot, or first empty slot
    let targetSlot = activeSlot;
    if (chosenGenes[targetSlot] !== null) {
      const firstEmpty = chosenGenes.findIndex((g) => g === null);
      if (firstEmpty === -1) {
        setHintText('All gene slots are full! Click a filled slot to swap out a gene.');
        return;
      }
      targetSlot = firstEmpty;
    }

    const next = [...chosenGenes];
    next[targetSlot] = geneId;
    setChosenGenes(next);
    setSimResult(null);
    setRevealedCells(0);
    clearAnimTimers();

    const nextEmpty = next.findIndex((g) => g === null);
    if (nextEmpty !== -1) {
      setActiveSlot(nextEmpty);
      setHintText(
        `Added "${GENES[geneId]?.label}"! Pick ${next.filter((g) => g === null).length} more gene(s).`
      );
    } else {
      setActiveSlot(targetSlot);
      setHintText(
        `All ${currentConfig.slots} genes loaded! Press "${currentConfig.growLabel || 'Grow!'}" to run the simulation.`
      );
    }
    setHintTone('neutral');
    playTone('snap');
  };

  const handleResetSlots = () => {
    clearAnimTimers();
    setChosenGenes(Array(currentConfig.slots).fill(null));
    setActiveSlot(0);
    setSimResult(null);
    setRevealedCells(0);
    setHintText(currentConfig.zoeIntro);
    setHintTone('neutral');
    playTone('remove');
  };

  const handleRunSimulation = () => {
    if (!allSlotsFilled) return;
    clearAnimTimers();
    playTone('run');

    const sortedKey = [...placedGeneIds].sort().join(',');
    const outcome =
      currentConfig.outcomes[sortedKey] ||
      currentConfig.defaultOutcome(placedGeneIds);

    setSimResult(outcome);
    setRevealedCells(0);

    // Progressive cell animation
    const totalCells = currentConfig.grid
      ? currentConfig.grid.cols * currentConfig.grid.rows
      : 0;

    if (totalCells > 0) {
      const stepDelay = 12;
      for (let i = 1; i <= totalCells; i++) {
        const timerId = window.setTimeout(() => {
          setRevealedCells(i);
        }, i * stepDelay);
        animTimersRef.current.push(timerId);
      }
    }

    const resultDelay = totalCells > 0 ? totalCells * 12 + 120 : 120;
    const verdictTimer = window.setTimeout(() => {
      if (outcome.verdict === 'win') {
        setHintText(currentConfig.zoeWin);
        setHintTone('win');
        playTone('win');
        setProgress((prev) => {
          const updated = { ...prev, [currentConfig.id]: true };
          saveProgress(updated);
          return updated;
        });
      } else if (outcome.verdict === 'fail') {
        setHintText(currentConfig.zoeFail);
        setHintTone('fail');
        playTone('fail');
      } else {
        setHintText(currentConfig.zoeWarn);
        setHintTone('warn');
        playTone('warn');
      }
    }, resultDelay);
    animTimersRef.current.push(verdictTimer);
  };

  const handleResetCampaign = () => {
    clearAnimTimers();
    const empty: ProgressMap = {};
    saveProgress(empty);
    setProgress(empty);
    setScreen('worlds');
  };

  // Trilingual UI chrome around the English science missions
  const t = {
    backLearning:
      lang === 'fi'
        ? 'Takaisin oppimiseen'
        : lang === 'en'
        ? 'Back to Learning'
        : '学習リソースへ戻る',
    backWorlds:
      lang === 'fi' ? 'Kaikki maailmat' : lang === 'en' ? 'All Worlds' : 'ワールド一覧',
    backLevels:
      lang === 'fi' ? 'Tason valinta' : lang === 'en' ? 'Level List' : 'ミッション一覧',
    subtitle:
      lang === 'fi'
        ? 'Rakenna eläviä ratkaisuja geenipalikoilla — interaktiivinen synteettisen biologian peli (iGEM BioBuilders).'
        : lang === 'en'
        ? 'Engineer microbes, crops, immune cells, and glowing trees with DNA gene parts.'
        : 'DNAパーツを組み合わせて微生物や植物をプログラムする、iGEM発・合成生物学パズルゲーム。',
    progressLabel:
      lang === 'fi' ? 'Edistyminen' : lang === 'en' ? 'Academy Progress' : 'クリア進捗',
    playNext:
      lang === 'fi' ? 'Pelaa seuraava taso' : lang === 'en' ? 'Play Next Mission' : '次のミッションをプレイ',
    freePlayOn:
      lang === 'fi' ? 'Kaikki tasot auki' : lang === 'en' ? 'Free Explore: All Unlocked' : 'フリー探索：全ステージ開放中',
    freePlayOff:
      lang === 'fi' ? 'Avaa kaikki tasot' : lang === 'en' ? 'Unlock All Levels' : '全ステージを開放する',
    resetProgress:
      lang === 'fi' ? 'Nollaa edistyminen' : lang === 'en' ? 'Reset Progress' : '進捗をリセット',
    geneLibrary:
      lang === 'fi' ? 'Geenikirjasto' : lang === 'en' ? 'Gene Library' : '遺伝子パーツライブラリ',
    geneLibraryHint:
      lang === 'fi'
        ? 'Valitse paikka ja napsauta geeniä lisätäksesi sen.'
        : lang === 'en'
        ? 'Click a gene chip to insert it into the highlighted slot.'
        : '使いたい遺伝子パーツをクリックしてスロットに組み込みます。',
    lockedGenesTitle:
      lang === 'fi'
        ? 'Edellisen tason lukitut geenit'
        : lang === 'en'
        ? 'Built-in genes from previous mission'
        : '前のミッションから引き継いだ遺伝子',
    yourSlots:
      lang === 'fi' ? 'Geenipaikkasi' : lang === 'en' ? 'Your Gene Slots' : '組み込みスロット',
    resetSlots:
      lang === 'fi' ? 'Tyhjennä' : lang === 'en' ? 'Clear Slots' : 'リセット',
    nextMission:
      lang === 'fi' ? 'Seuraava tehtävä' : lang === 'en' ? 'Continue to Next Level' : '次のレベルへ進む',
    tryAgain:
      lang === 'fi' ? 'Kokeile uudelleen' : lang === 'en' ? 'Try Another Combo' : '別の組み合わせを試す',
    allDoneMsg:
      lang === 'fi'
        ? 'Onnittelut! Olet suorittanut kaikki BioBuilder Academy -tehtävät.'
        : lang === 'en'
        ? 'Academy Complete! You engineered solutions across all 4 worlds.'
        : '全12ミッション完了！BioBuilder Academy を卒業しました。',
    sourceCredit:
      lang === 'fi'
        ? 'Alkuperäinen avoimen lähdekoodin peli: iGEM BioBuilders (MIT-lisenssi)'
        : lang === 'en'
        ? 'Open-source game adapted from iGEM BioBuilders (MIT License)'
        : 'オープンソース原作：iGEM BioBuilders (MIT License)',
  };

  // Current cell colors for the simulation grid
  const cellColors = useMemo(() => {
    if (!currentConfig.grid) return [];
    const total = currentConfig.grid.cols * currentConfig.grid.rows;
    if (!simResult || !currentConfig.getCellColors) {
      return Array(total).fill(currentConfig.grid.defaultColor);
    }
    const targetColors = currentConfig.getCellColors(simResult);
    return targetColors.map((col, idx) =>
      idx < revealedCells ? col : currentConfig.grid!.defaultColor
    );
  }, [currentConfig, simResult, revealedCells]);

  const worldObj = WORLDS[selectedWorld];

  return (
    <div
      className={
        embedded
          ? 'pt-2 pb-8 transition-colors'
          : `min-h-screen py-6 sm:py-10 px-4 sm:px-8 transition-colors ${
              isDark ? 'bg-[#0d0c14] text-[#F5F3EC]' : 'bg-[#FBF9F6] text-[#2E2E2E]'
            }`
      }
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Top Utility Bar: Navigation Breadcrumbs & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {!embedded && (
              <button
                type="button"
                onClick={() => onNavigate('/learning/curated')}
                className={`inline-flex items-center gap-1.5 text-xs font-mono tracking-wide transition-colors cursor-pointer min-h-[40px] px-2.5 rounded-lg whitespace-nowrap shrink-0 ${
                  isDark
                    ? 'text-teal-300 hover:bg-neutral-800/70'
                    : 'text-teal-800 hover:bg-neutral-200/60'
                }`}
              >
                <ArrowLeft className="w-4 h-4 shrink-0" />
                <span>{t.backLearning}</span>
              </button>
            )}

            {screen !== 'worlds' && (
              <>
                {!embedded && <span className="text-neutral-400 text-xs">/</span>}
                <button
                  type="button"
                  onClick={() => setScreen('worlds')}
                  className={`text-xs font-mono cursor-pointer min-h-[40px] px-2.5 rounded-lg whitespace-nowrap shrink-0 ${
                    isDark
                      ? 'text-neutral-300 hover:bg-neutral-800/70'
                      : 'text-neutral-700 hover:bg-neutral-200/60'
                  }`}
                >
                  {t.backWorlds}
                </button>
              </>
            )}

            {screen === 'level' && (
              <>
                <span className="text-neutral-400 text-xs">/</span>
                <button
                  type="button"
                  onClick={() => setScreen('worldLevels')}
                  className={`text-xs font-mono cursor-pointer min-h-[40px] px-2.5 rounded-lg whitespace-nowrap shrink-0 ${
                    isDark
                      ? 'text-neutral-300 hover:bg-neutral-800/70'
                      : 'text-neutral-700 hover:bg-neutral-200/60'
                  }`}
                >
                  {WORLDS[currentConfig.world].label}
                </button>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Free Explore Unlock Toggle */}
            <button
              type="button"
              onClick={() => setUnlockAll((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-[11px] font-mono font-medium transition-colors cursor-pointer min-h-[40px] whitespace-nowrap shrink-0 ${
                unlockAll
                  ? isDark
                    ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300'
                    : 'border-emerald-300 bg-emerald-50 text-emerald-800'
                  : isDark
                  ? 'border-neutral-800 bg-[#151322] text-neutral-300 hover:border-neutral-700'
                  : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
              }`}
              title="Toggle campaign lock"
            >
              <Unlock className="w-3.5 h-3.5 shrink-0" />
              <span>{unlockAll ? t.freePlayOn : t.freePlayOff}</span>
            </button>

            {/* Sound Toggle */}
            <button
              type="button"
              onClick={() => setSoundEnabled((s) => !s)}
              className={`inline-flex items-center justify-center w-10 h-10 rounded-xl border transition-colors cursor-pointer shrink-0 ${
                isDark
                  ? 'border-neutral-800 bg-[#151322] text-neutral-300 hover:border-neutral-700'
                  : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
              }`}
              aria-label={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
              title={soundEnabled ? 'Sound On' : 'Sound Muted'}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-teal-500" />
              ) : (
                <VolumeX className="w-4 h-4 text-neutral-400" />
              )}
            </button>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════ */}
        {/* SCREEN 1: WORLD SELECT (HOME)                                       */}
        {/* ════════════════════════════════════════════════════════════════════ */}
        {screen === 'worlds' && (
          <div className="space-y-6">
            {/* Hero Banner */}
            <div
              className={`p-6 sm:p-8 rounded-3xl border space-y-5 ${
                isDark
                  ? 'bg-[#12161f] border-neutral-800 shadow-[0_8px_30px_rgba(0,0,0,0.4)]'
                  : 'bg-white border-neutral-200 shadow-xs'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div className="space-y-2 max-w-2xl">
                  <div
                    className={`flex items-center gap-2 text-xs font-mono tracking-wider uppercase ${
                      isDark ? 'text-teal-300' : 'text-teal-700'
                    }`}
                  >
                    <Dna className="w-4 h-4 shrink-0" />
                    <span>BioBuilder Academy · Interactive Lab</span>
                  </div>
                  <h1
                    className={`text-2xl sm:text-4xl font-serif font-bold tracking-tight ${
                      isDark ? 'text-neutral-100' : 'text-neutral-900'
                    }`}
                  >
                    BioBuilder Academy
                  </h1>
                  <p
                    className={`text-sm font-serif leading-relaxed ${
                      isDark ? 'text-neutral-300' : 'text-neutral-600'
                    }`}
                  >
                    {t.subtitle}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => openLevel(nextPlayableLevelId)}
                    className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer min-h-[44px] whitespace-nowrap active:scale-95 ${
                      isDark
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                        : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                    }`}
                  >
                    <Play className="w-4 h-4 fill-current shrink-0" />
                    <span>
                      {t.playNext} (#{nextPlayableLevelId})
                    </span>
                  </button>
                </div>
              </div>

              {/* Overall Progress Bar */}
              <div
                className={`pt-4 border-t space-y-2 ${
                  isDark ? 'border-neutral-800' : 'border-neutral-100'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>
                    {t.progressLabel}
                  </span>
                  <span className="font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
                    {completedCount} / {totalLevels} missions
                  </span>
                </div>
                <div
                  className={`h-2.5 rounded-full overflow-hidden ${
                    isDark ? 'bg-neutral-800' : 'bg-neutral-100'
                  }`}
                >
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.round((completedCount / totalLevels) * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* 4 Worlds Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {(Object.keys(WORLDS) as WorldId[]).map((wId) => {
                const w = WORLDS[wId];
                const worldMissions = LEVEL_MANIFEST.filter((m) => m.world === wId);
                const worldDone = worldMissions.filter((m) => progress[m.id]).length;

                return (
                  <button
                    key={wId}
                    type="button"
                    onClick={() => openWorld(wId)}
                    className={`group text-left p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 cursor-pointer hover:-translate-y-0.5 ${
                      isDark
                        ? 'bg-[#151322] border-neutral-800 hover:border-teal-500/50'
                        : 'bg-white border-neutral-200 hover:border-teal-400 shadow-xs'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span
                          className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl"
                          style={{ backgroundColor: w.bg }}
                          aria-hidden="true"
                        >
                          {w.icon}
                        </span>
                        <span
                          className="text-xs font-mono font-bold tabular-nums px-2 py-0.5 rounded-md"
                          style={{
                            color: w.color,
                            backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : w.bg,
                          }}
                        >
                          {worldDone} / {worldMissions.length}
                        </span>
                      </div>

                      <h2
                        className={`font-serif text-lg font-bold group-hover:text-teal-600 dark:group-hover:text-teal-300 transition-colors ${
                          isDark ? 'text-neutral-100' : 'text-neutral-900'
                        }`}
                      >
                        {w.label}
                      </h2>

                      <ul className="space-y-1 text-xs font-serif">
                        {worldMissions.map((m) => (
                          <li
                            key={m.id}
                            className={`flex items-center gap-1.5 ${
                              isDark ? 'text-neutral-400' : 'text-neutral-600'
                            }`}
                          >
                            {progress[m.id] ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            ) : (
                              <Compass className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                            )}
                            <span className="truncate">
                              L{m.id}: {m.title}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-1.5 pt-2">
                      <div
                        className={`h-1.5 rounded-full overflow-hidden ${
                          isDark ? 'bg-neutral-800' : 'bg-neutral-100'
                        }`}
                      >
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${Math.round((worldDone / worldMissions.length) * 100)}%`,
                            backgroundColor: w.color,
                          }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                        <span>Explore world</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {completedCount > 0 && (
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleResetCampaign}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono cursor-pointer transition-colors ${
                    isDark
                      ? 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50'
                      : 'text-neutral-500 hover:text-neutral-800 hover:bg-neutral-200/60'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t.resetProgress}</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════════ */}
        {/* SCREEN 2: WORLD LEVEL LIST                                          */}
        {/* ════════════════════════════════════════════════════════════════════ */}
        {screen === 'worldLevels' && (
          <div className="space-y-5">
            <div
              className={`p-6 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isDark
                  ? 'bg-[#12161f] border-neutral-800'
                  : 'bg-white border-neutral-200'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <span
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                  style={{ backgroundColor: worldObj.bg }}
                  aria-hidden="true"
                >
                  {worldObj.icon}
                </span>
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                    World Curriculum · 3 Missions
                  </div>
                  <h1
                    className={`text-2xl font-serif font-bold ${
                      isDark ? 'text-neutral-100' : 'text-neutral-900'
                    }`}
                  >
                    {worldObj.label}
                  </h1>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setScreen('worlds')}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border text-xs font-mono cursor-pointer min-h-[42px] whitespace-nowrap self-start sm:self-auto ${
                  isDark
                    ? 'border-neutral-700 bg-neutral-900 text-neutral-200 hover:bg-neutral-800'
                    : 'border-neutral-300 bg-neutral-50 text-neutral-800 hover:bg-neutral-100'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{t.backWorlds}</span>
              </button>
            </div>

            <div className="space-y-3">
              {LEVEL_MANIFEST.filter((m) => m.world === selectedWorld).map((m) => {
                const done = Boolean(progress[m.id]);
                const unlocked = isLevelUnlocked(m.id);

                return (
                  <button
                    key={m.id}
                    type="button"
                    disabled={!unlocked}
                    onClick={() => unlocked && openLevel(m.id)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      unlocked
                        ? isDark
                          ? 'bg-[#151322] border-neutral-800 hover:border-teal-500/60 cursor-pointer'
                          : 'bg-white border-neutral-200 hover:border-teal-500 cursor-pointer shadow-xs'
                        : isDark
                        ? 'bg-[#11101a] border-neutral-900 opacity-55 cursor-not-allowed'
                        : 'bg-neutral-100/70 border-neutral-200 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
                        <span
                          className="font-bold uppercase"
                          style={{ color: worldObj.color }}
                        >
                          Level {m.id}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className={isDark ? 'text-neutral-400' : 'text-neutral-500'}>
                          NGSS: {m.ngss.join(', ')}
                        </span>
                      </div>

                      <h2
                        className={`text-lg font-serif font-bold ${
                          isDark ? 'text-neutral-100' : 'text-neutral-900'
                        }`}
                      >
                        {m.title}
                      </h2>

                      <p
                        className={`text-xs sm:text-sm font-serif ${
                          isDark ? 'text-neutral-300' : 'text-neutral-600'
                        }`}
                      >
                        {m.tagline}
                      </p>

                      <div
                        className={`text-[11px] font-mono pt-0.5 ${
                          isDark ? 'text-neutral-400' : 'text-neutral-500'
                        }`}
                      >
                        {m.concepts.join(' · ')}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {done ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-300">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Completed</span>
                        </span>
                      ) : unlocked ? (
                        <span
                          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap ${
                            isDark
                              ? 'bg-teal-500 text-slate-950'
                              : 'bg-teal-700 text-white'
                          }`}
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Play Level</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono text-neutral-400">
                          <Lock className="w-3.5 h-3.5" />
                          <span>Complete Level {m.id - 1}</span>
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════════ */}
        {/* SCREEN 3: PLAYABLE LEVEL WORKBENCH                                  */}
        {/* ════════════════════════════════════════════════════════════════════ */}
        {screen === 'level' && (
          <div className="space-y-5">
            {/* Level Header Bar */}
            <div
              className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isDark
                  ? 'bg-[#12161f] border-neutral-800'
                  : 'bg-white border-neutral-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                  style={{ backgroundColor: WORLDS[currentConfig.world].bg }}
                  aria-hidden="true"
                >
                  {WORLDS[currentConfig.world].icon}
                </span>
                <div>
                  <div className="text-[11px] font-mono text-neutral-400">
                    {WORLDS[currentConfig.world].label} · Level {currentConfig.id} of {totalLevels}
                  </div>
                  <h1
                    className={`text-lg sm:text-xl font-serif font-bold ${
                      isDark ? 'text-neutral-100' : 'text-neutral-900'
                    }`}
                  >
                    {currentConfig.title}
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setScreen('worldLevels')}
                  className={`px-3 py-2 rounded-xl border text-xs font-mono cursor-pointer min-h-[40px] whitespace-nowrap ${
                    isDark
                      ? 'border-neutral-700 bg-neutral-900 text-neutral-300 hover:bg-neutral-800'
                      : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  {t.backLevels}
                </button>
              </div>
            </div>

            {/* Assistant Jon Dialogue Box */}
            <div
              className={`p-4 sm:p-5 rounded-2xl border flex items-start gap-3.5 transition-colors ${
                hintTone === 'win'
                  ? isDark
                    ? 'bg-emerald-950/30 border-emerald-500/40'
                    : 'bg-emerald-50/80 border-emerald-300'
                  : hintTone === 'fail'
                  ? isDark
                    ? 'bg-red-950/30 border-red-500/40'
                    : 'bg-red-50/80 border-red-300'
                  : hintTone === 'warn'
                  ? isDark
                    ? 'bg-amber-950/30 border-amber-500/40'
                    : 'bg-amber-50/80 border-amber-300'
                  : isDark
                  ? 'bg-[#151824] border-teal-800/60'
                  : 'bg-[#F0F7F5] border-teal-200'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0 border ${
                  isDark
                    ? 'bg-neutral-900 border-neutral-700'
                    : 'bg-white border-teal-200'
                }`}
                aria-hidden="true"
              >
                🔬
              </div>
              <div className="space-y-1">
                <div
                  className={`text-xs font-mono font-bold uppercase tracking-wider ${
                    isDark ? 'text-teal-300' : 'text-teal-800'
                  }`}
                >
                  Assistant Jon says:
                </div>
                <p
                  className={`text-sm font-serif leading-relaxed ${
                    isDark ? 'text-neutral-200' : 'text-neutral-800'
                  }`}
                >
                  {hintText}
                </p>
              </div>
            </div>

            {/* Simulation Zone Grid */}
            {currentConfig.grid && (
              <div
                className={`p-4 sm:p-5 rounded-2xl border space-y-3 ${
                  isDark
                    ? 'bg-[#12161f] border-neutral-800'
                    : 'bg-white border-neutral-200'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span
                    className={`text-xs font-mono font-semibold ${
                      isDark ? 'text-neutral-300' : 'text-neutral-700'
                    }`}
                  >
                    {currentConfig.grid.label}
                  </span>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono">
                    {currentConfig.grid.legend.map((item) => (
                      <span
                        key={item.label}
                        className={`inline-flex items-center gap-1.5 ${
                          isDark ? 'text-neutral-400' : 'text-neutral-600'
                        }`}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-xs shrink-0 border border-black/10"
                          style={{ backgroundColor: item.color }}
                        />
                        <span>{item.label}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  className="grid gap-1"
                  style={{
                    gridTemplateColumns: `repeat(${currentConfig.grid.cols}, minmax(0, 1fr))`,
                  }}
                >
                  {cellColors.map((bgColor, idx) => (
                    <div
                      key={idx}
                      className="rounded-xs transition-colors duration-300"
                      style={{
                        height: `${currentConfig.grid!.cellHeight}px`,
                        backgroundColor: bgColor,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Main Workbench: Gene Library (Left) + Organism Designer (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              {/* Left Column: Gene Library */}
              <div
                className={`lg:col-span-5 p-5 rounded-2xl border space-y-4 ${
                  isDark
                    ? 'bg-[#151322] border-neutral-800'
                    : 'bg-white border-neutral-200'
                }`}
              >
                <div className="space-y-1">
                  <h2
                    className={`font-serif text-base font-bold ${
                      isDark ? 'text-neutral-100' : 'text-neutral-900'
                    }`}
                  >
                    {t.geneLibrary}
                  </h2>
                  <p
                    className={`text-xs font-serif ${
                      isDark ? 'text-neutral-400' : 'text-neutral-500'
                    }`}
                  >
                    {t.geneLibraryHint}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                  {currentConfig.genes.map((geneId) => {
                    const gene = GENES[geneId];
                    if (!gene) return null;
                    const isUsed = placedGeneIds.includes(geneId);

                    return (
                      <button
                        key={geneId}
                        type="button"
                        disabled={isUsed}
                        onClick={() => handlePlaceGene(geneId)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-xs font-mono font-semibold transition-all flex items-center justify-between gap-2 min-h-[44px] ${
                          isUsed
                            ? 'opacity-40 cursor-not-allowed'
                            : 'cursor-pointer hover:scale-[1.01] active:scale-[0.98]'
                        }`}
                        style={{
                          backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : gene.bg,
                          color: isDark ? gene.border : gene.color,
                          borderColor: isDark ? 'rgba(255,255,255,0.14)' : gene.border,
                        }}
                      >
                        <span className="truncate">{gene.label}</span>
                        <span className="text-[11px] shrink-0">
                          {isUsed ? 'In slot' : '+ Add'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Organism Preview + Gene Slots + Action Controls */}
              <div
                className={`lg:col-span-7 p-5 rounded-2xl border space-y-5 ${
                  isDark
                    ? 'bg-[#151322] border-neutral-800'
                    : 'bg-white border-neutral-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-center gap-5">
                  {/* Dynamic SVG Organism Preview */}
                  <div
                    className={`w-32 h-32 rounded-2xl border flex items-center justify-center shrink-0 p-2 ${
                      isDark
                        ? 'bg-[#10131d] border-neutral-800'
                        : 'bg-[#F8FAF9] border-neutral-200'
                    }`}
                  >
                    <div
                      className="flex items-center justify-center"
                      dangerouslySetInnerHTML={{
                        __html: currentConfig.buildOrganismSvg(placedGeneIds),
                      }}
                    />
                  </div>

                  <div className="flex-1 w-full space-y-3">
                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                        Organism Blueprint
                      </div>
                      <h2
                        className={`text-lg font-serif font-bold ${
                          isDark ? 'text-neutral-100' : 'text-neutral-900'
                        }`}
                      >
                        {currentConfig.organismLabel || 'Engineered Organism'}
                      </h2>
                    </div>

                    {/* Locked Genes from Prior Level */}
                    {currentConfig.lockedGenes && currentConfig.lockedGenes.length > 0 && (
                      <div className="space-y-1.5">
                        <div className="text-[11px] font-mono text-neutral-400">
                          {t.lockedGenesTitle}:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {currentConfig.lockedGenes.map((gid) => {
                            const g = GENES[gid];
                            if (!g) return null;
                            return (
                              <span
                                key={gid}
                                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-mono ${
                                  isDark
                                    ? 'border-neutral-700 bg-neutral-900 text-neutral-300'
                                    : 'border-neutral-200 bg-neutral-100 text-neutral-700'
                                }`}
                              >
                                <Lock className="w-3 h-3 shrink-0" />
                                <span>{g.label}</span>
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Interactive Gene Slots */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>
                      {t.yourSlots} ({placedGeneIds.length}/{currentConfig.slots})
                    </span>
                    <span className="text-neutral-400 text-[11px]">
                      Click filled slot to remove
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {chosenGenes.map((geneId, idx) => {
                      const gene = geneId ? GENES[geneId] : null;
                      const isSelected = activeSlot === idx && !geneId;

                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSelectSlot(idx)}
                          className={`px-3.5 py-3 rounded-xl border-2 text-xs font-mono font-semibold transition-all min-h-[48px] flex items-center justify-between gap-2 cursor-pointer ${
                            gene
                              ? ''
                              : isSelected
                              ? isDark
                                ? 'border-teal-400 bg-teal-950/30 text-teal-200 border-dashed'
                                : 'border-teal-600 bg-teal-50/70 text-teal-900 border-dashed'
                              : isDark
                              ? 'border-neutral-700 bg-neutral-900/50 text-neutral-400 border-dashed hover:border-neutral-500'
                              : 'border-neutral-300 bg-neutral-50 text-neutral-500 border-dashed hover:border-neutral-400'
                          }`}
                          style={
                            gene
                              ? {
                                  backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : gene.bg,
                                  color: isDark ? gene.border : gene.color,
                                  borderColor: gene.border,
                                  borderStyle: 'solid',
                                }
                              : undefined
                          }
                        >
                          <span className="truncate">
                            {gene ? gene.label : `Slot ${idx + 1}: + Add gene`}
                          </span>
                          {gene && (
                            <span className="text-[10px] opacity-75 shrink-0">✕ remove</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Simulation Trigger Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    type="button"
                    disabled={!allSlotsFilled}
                    onClick={handleRunSimulation}
                    className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-mono font-bold transition-all min-h-[44px] whitespace-nowrap ${
                      allSlotsFilled
                        ? isDark
                          ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 cursor-pointer active:scale-95'
                          : 'bg-emerald-700 hover:bg-emerald-800 text-white cursor-pointer active:scale-95'
                        : isDark
                        ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                        : 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 shrink-0" />
                    <span>{currentConfig.growLabel || 'Grow!'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleResetSlots}
                    className={`inline-flex items-center gap-1.5 px-4 py-3 rounded-xl border text-xs font-mono font-medium transition-colors min-h-[44px] whitespace-nowrap cursor-pointer ${
                      isDark
                        ? 'border-neutral-700 bg-neutral-900 text-neutral-300 hover:bg-neutral-800'
                        : 'border-neutral-300 bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    <RotateCcw className="w-3.5 h-3.5 shrink-0" />
                    <span>{t.resetSlots}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Simulation Output Metrics & Verdict */}
            {simResult && (
              <div
                className={`p-5 sm:p-6 rounded-2xl border space-y-5 animate-in fade-in duration-300 ${
                  isDark
                    ? 'bg-[#12161f] border-neutral-800'
                    : 'bg-white border-neutral-200'
                }`}
              >
                {/* 3 Quantitative Stat Bars */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {currentConfig.stats.map((statKey) => {
                    const st = simResult.stats[statKey];
                    if (!st) return null;
                    return (
                      <div
                        key={statKey}
                        className={`p-3.5 rounded-xl border space-y-2 ${
                          isDark
                            ? 'bg-[#171b26] border-neutral-800'
                            : 'bg-neutral-50 border-neutral-200'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>
                            {st.label}
                          </span>
                          <span
                            className="font-bold tabular-nums"
                            style={{ color: st.color }}
                          >
                            {st.display}
                          </span>
                        </div>
                        <div
                          className={`h-2 rounded-full overflow-hidden ${
                            isDark ? 'bg-neutral-800' : 'bg-neutral-200'
                          }`}
                        >
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${st.pct}%`,
                              backgroundColor: st.color,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Detailed Scientific Outcome Feedback */}
                <div
                  className={`p-4 rounded-xl border space-y-3 ${
                    simResult.verdict === 'win'
                      ? isDark
                        ? 'bg-emerald-950/25 border-emerald-500/40 text-emerald-100'
                        : 'bg-emerald-50 border-emerald-300 text-emerald-950'
                      : simResult.verdict === 'fail'
                      ? isDark
                        ? 'bg-red-950/25 border-red-500/40 text-red-100'
                        : 'bg-red-50 border-red-300 text-red-950'
                      : isDark
                      ? 'bg-amber-950/25 border-amber-500/40 text-amber-100'
                      : 'bg-amber-50 border-amber-300 text-amber-950'
                  }`}
                >
                  <p className="text-sm font-serif leading-relaxed">{simResult.msg}</p>

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    {simResult.verdict === 'win' && currentConfig.id < totalLevels && (
                      <button
                        type="button"
                        onClick={() => openLevel(currentConfig.id + 1)}
                        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all min-h-[42px] whitespace-nowrap cursor-pointer ${
                          isDark
                            ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                            : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                        }`}
                      >
                        <span>{t.nextMission}</span>
                        <ArrowRight className="w-4 h-4 shrink-0" />
                      </button>
                    )}

                    {simResult.verdict === 'win' && currentConfig.id === totalLevels && (
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-300">
                          {t.allDoneMsg}
                        </span>
                        <button
                          type="button"
                          onClick={() => setScreen('worlds')}
                          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold cursor-pointer min-h-[40px] ${
                            isDark
                              ? 'bg-emerald-500 text-slate-950'
                              : 'bg-emerald-700 text-white'
                          }`}
                        >
                          <span>{t.backWorlds}</span>
                        </button>
                      </div>
                    )}

                    {simResult.verdict !== 'win' && (
                      <button
                        type="button"
                        onClick={handleResetSlots}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border text-xs font-mono font-semibold cursor-pointer min-h-[40px] ${
                          isDark
                            ? 'border-neutral-700 bg-neutral-900/70 text-neutral-200 hover:bg-neutral-800'
                            : 'border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-100'
                        }`}
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>{t.tryAgain}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Attribution Footer */}
        <footer
          className={`pt-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono ${
            isDark
              ? 'border-neutral-800/80 text-neutral-400'
              : 'border-neutral-200 text-neutral-500'
          }`}
        >
          <span>{t.sourceCredit}</span>
          <a
            href="https://gitlab.igem.org/nfrezzia/bio-builders"
            target="_blank"
            rel="noreferrer noopener"
            className={`inline-flex items-center gap-1 transition-colors ${
              isDark ? 'text-teal-300 hover:text-teal-200' : 'text-teal-700 hover:text-teal-900'
            }`}
          >
            <span>gitlab.igem.org/nfrezzia/bio-builders</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </footer>
      </div>
    </div>
  );
}
