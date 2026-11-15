export type WorldId = 'ocean' | 'farm' | 'body' | 'city';

export interface GeneDef {
  label: string;
  bg: string;
  color: string;
  border: string;
}

export interface WorldDef {
  id: WorldId;
  label: string;
  icon: string;
  color: string;
  bg: string;
}

export interface StatResult {
  label: string;
  display: string;
  pct: number;
  color: string;
}

export interface SimulationOutcome {
  verdict: 'win' | 'warn' | 'fail';
  msg: string;
  spread?: 'contained' | 'partial' | 'full';
  _spines?: boolean;
  stats: Record<string, StatResult>;
}

export interface GridConfig {
  label: string;
  cols: number;
  rows: number;
  cellHeight: number;
  defaultColor: string;
  legend: { color: string; label: string }[];
}

export interface LevelManifestItem {
  id: number;
  world: WorldId;
  title: string;
  tagline: string;
  concepts: string[];
  ngss: string[];
}

export interface LevelConfig {
  id: number;
  world: WorldId;
  title: string;
  organismLabel?: string;
  slots: number;
  growLabel?: string;
  genes: string[];
  lockedGenes?: string[];
  zoeIntro: string;
  zoeWin: string;
  zoeFail: string;
  zoeWarn: string;
  grid?: GridConfig;
  getCellColors?: (result: SimulationOutcome) => string[];
  buildOrganismSvg: (genes: string[]) => string;
  stats: string[];
  outcomes: Record<string, SimulationOutcome>;
  defaultOutcome: (genes: string[]) => SimulationOutcome;
}

// ── Gene Library (35 genes across 4 worlds) ──────────────────────────────────
export const GENES: Record<string, GeneDef> = {
  // Ocean Lab genes
  detect:      { label: 'Detect plastic',      bg: '#E6F1FB', color: '#0C447C', border: '#B5D4F4' },
  eat:         { label: 'Break down plastic',  bg: '#EAF3DE', color: '#27500A', border: '#C0DD97' },
  stop:        { label: 'Stop signal',         bg: '#FAEEDA', color: '#633806', border: '#FAC775' },
  swim:        { label: 'Swim toward plastic', bg: '#EEEDFE', color: '#3C3489', border: '#CECBF6' },
  multiply:    { label: 'Multiply fast',       bg: '#FAECE7', color: '#712B13', border: '#F5C4B3' },
  glow:        { label: 'Glow when full',      bg: '#FBEAF0', color: '#72243E', border: '#F4C0D1' },
  timer:       { label: '24-hour timer',       bg: '#FAEEDA', color: '#633806', border: '#FAC775' },
  counter:     { label: 'Meal counter',        bg: '#EEEDFE', color: '#3C3489', border: '#CECBF6' },
  signal:      { label: 'Friend signal',       bg: '#E1F5EE', color: '#085041', border: '#9FE1CB' },
  coldtol:     { label: 'Cold tolerance',      bg: '#E6F1FB', color: '#0C447C', border: '#B5D4F4' },
  armor:       { label: 'Tough armor',         bg: '#F1EFE8', color: '#444441', border: '#D3D1C7' },
  boost:       { label: 'Speed boost',         bg: '#FAECE7', color: '#712B13', border: '#F5C4B3' },
  // FarmBot genes
  store:       { label: 'Store water',         bg: '#FAEEDA', color: '#633806', border: '#FAC775' },
  waxy:        { label: 'Waxy leaf coat',      bg: '#E6F1FB', color: '#0C447C', border: '#B5D4F4' },
  spine:       { label: 'Grow spines',         bg: '#FAECE7', color: '#712B13', border: '#F5C4B3' },
  deep:        { label: 'Deep roots',          bg: '#EEEDFE', color: '#3C3489', border: '#CECBF6' },
  stomata:     { label: 'Close stomata',       bg: '#E1F5EE', color: '#085041', border: '#9FE1CB' },
  smooth:      { label: 'Smooth flowers',      bg: '#EAF3DE', color: '#27500A', border: '#C0DD97' },
  night:       { label: 'Night breathing',     bg: '#FBEAF0', color: '#72243E', border: '#F4C0D1' },
  pollblock:   { label: 'Pollen blocker',      bg: '#E6F1FB', color: '#0C447C', border: '#B5D4F4' },
  fragrance:   { label: 'Sweet fragrance',     bg: '#FBEAF0', color: '#72243E', border: '#F4C0D1' },
  // Body Defenders genes
  recognize:   { label: 'Recognize virus',     bg: '#E6F1FB', color: '#0C447C', border: '#B5D4F4' },
  attack:      { label: 'Attack command',      bg: '#FAECE7', color: '#712B13', border: '#F5C4B3' },
  selftag:     { label: 'Self-recognition',    bg: '#EAF3DE', color: '#27500A', border: '#C0DD97' },
  brakes:      { label: 'Safety brakes',       bg: '#FAEEDA', color: '#633806', border: '#FAC775' },
  memory:      { label: 'Memory gene',         bg: '#EEEDFE', color: '#3C3489', border: '#CECBF6' },
  address:     { label: 'Address protein',     bg: '#E6F1FB', color: '#0C447C', border: '#B5D4F4' },
  payload:     { label: 'Medicine payload',    bg: '#EAF3DE', color: '#27500A', border: '#C0DD97' },
  dissolve:    { label: 'Self-dissolve',       bg: '#FAEEDA', color: '#633806', border: '#FAC775' },
  // BioCity genes
  lucifer:     { label: 'Luciferase (glow)',   bg: '#FAEEDA', color: '#633806', border: '#FAC775' },
  darksense:   { label: 'Darkness sensor',     bg: '#EEEDFE', color: '#3C3489', border: '#CECBF6' },
  release:     { label: 'Timed release',       bg: '#E1F5EE', color: '#085041', border: '#9FE1CB' },
  healthsense: { label: 'Health sensor',       bg: '#FBEAF0', color: '#72243E', border: '#F4C0D1' },
  andgate:     { label: 'AND logic gate',      bg: '#FAECE7', color: '#712B13', border: '#F5C4B3' },
};

// ── Worlds ────────────────────────────────────────────────────────────────────
export const WORLDS: Record<WorldId, WorldDef> = {
  ocean: { id: 'ocean', label: 'Ocean Lab',      icon: '🌊', color: '#185FA5', bg: '#E6F1FB' },
  farm:  { id: 'farm',  label: 'FarmBot Fields', icon: '🌾', color: '#3B6D11', bg: '#EAF3DE' },
  body:  { id: 'body',  label: 'Body Defenders', icon: '🫀', color: '#993C1D', bg: '#FAECE7' },
  city:  { id: 'city',  label: 'BioCity',        icon: '🏙️', color: '#854F0B', bg: '#FAEEDA' },
};

// ── Level Manifest ────────────────────────────────────────────────────────────
export const LEVEL_MANIFEST: LevelManifestItem[] = [
  {
    id: 1, world: 'ocean',
    title: 'Plastic cleanup',
    tagline: 'Engineer a microbe to eat ocean plastic',
    concepts: ['genes as instructions', 'stop signals', 'design–build–test'],
    ngss: ['LS1.A', 'LS3.A'],
  },
  {
    id: 2, world: 'ocean',
    title: 'Runaway Microbe',
    tagline: 'Add a self-destruct timer to stop the spread',
    concepts: ['apoptosis', 'redundant safety', 'containment'],
    ngss: ['LS1.B', 'ETS1.B'],
  },
  {
    id: 3, world: 'ocean',
    title: 'Deep sea cleanup',
    tagline: 'Redesign the microbe for cold, high-pressure depths',
    concepts: ['protein folding', 'environmental adaptation', 'multi-gene'],
    ngss: ['LS4.C', 'LS1.A'],
  },
  {
    id: 4, world: 'farm',
    title: 'The drought',
    tagline: 'Give wheat cactus genes to survive dry summers',
    concepts: ['cross-species transfer', 'GMO basics', 'pollination'],
    ngss: ['LS3.B', 'LS4.B'],
  },
  {
    id: 5, world: 'farm',
    title: 'Pollen patrol',
    tagline: 'Keep modified genes on the farm',
    concepts: ['horizontal gene transfer', 'ecosystem risk', 'containment'],
    ngss: ['LS4.D', 'ETS1.C'],
  },
  {
    id: 6, world: 'farm',
    title: 'Nitrogen factory',
    tagline: 'Engineer a root bacterium to feed crops naturally',
    concepts: ['symbiosis', 'nitrogen fixation', 'gene circuits'],
    ngss: ['LS2.A', 'LS3.B'],
  },
  {
    id: 7, world: 'body',
    title: 'The virus',
    tagline: 'Program immune cells to recognize a new pathogen',
    concepts: ['cell signaling', 'receptor design', 'immune response'],
    ngss: ['LS1.A', 'LS1.C'],
  },
  {
    id: 8, world: 'body',
    title: 'Overzealous defender',
    tagline: 'Stop immune cells attacking healthy tissue',
    concepts: ['autoimmunity', 'target specificity', 'feedback loops'],
    ngss: ['LS1.A', 'ETS1.B'],
  },
  {
    id: 9, world: 'body',
    title: 'Tiny surgeons',
    tagline: 'Guide a cell to deliver medicine to one exact spot',
    concepts: ['drug delivery', 'address proteins', 'precision medicine'],
    ngss: ['LS1.C', 'ETS1.B'],
  },
  {
    id: 10, world: 'city',
    title: 'Glowing trees',
    tagline: 'Light city streets with firefly bioluminescence',
    concepts: ['bioluminescence', 'gene expression', 'cross-species transfer'],
    ngss: ['LS1.A', 'LS3.A'],
  },
  {
    id: 11, world: 'city',
    title: 'Brighter city',
    tagline: 'Chain two genes together as a logic gate',
    concepts: ['gene circuits', 'logic gates', 'multi-gene design'],
    ngss: ['LS1.A', 'ETS1.B'],
  },
  {
    id: 12, world: 'city',
    title: 'Final mission — design your own',
    tagline: 'Identify a problem and build a solution from scratch',
    concepts: ['open-ended design', 'ethics', 'full engineering loop'],
    ngss: ['ETS1.A', 'ETS1.B', 'ETS1.C'],
  },
];

// ── Complete Level Registry (Levels 1–12) ─────────────────────────────────────
export const LEVELS: Record<number, LevelConfig> = {
  1: {
    id: 1,
    world: 'ocean',
    title: 'Plastic cleanup',
    organismLabel: 'Your microbe',
    slots: 3,
    growLabel: 'Grow!',
    genes: ['detect', 'eat', 'stop', 'swim', 'multiply', 'glow'],
    zoeIntro: 'The ocean is full of plastic! Our microbe needs 3 gene parts to do its job — but choose carefully. Some combos cause problems!',
    zoeWin: 'Amazing work, scientist! You designed a microbe that cleans the ocean safely!',
    zoeFail: 'Uh oh! The microbe caused problems. Think about what each gene does and try again.',
    zoeWarn: 'So close! Read the hint and give it another go.',
    grid: {
      label: 'Ocean cleanup zone',
      cols: 12,
      rows: 4,
      cellHeight: 18,
      defaultColor: '#B5D4F4',
      legend: [
        { color: '#B5D4F4', label: 'ocean water' },
        { color: '#1D9E75', label: 'plastic cleaned' },
        { color: '#E24B4A', label: 'microbe escaped' },
      ],
    },
    getCellColors(result) {
      return Array.from({ length: 48 }, (_, i) => {
        const col = i % 12;
        if (result.verdict === 'win') return '#1D9E75';
        if (result.verdict === 'fail') return col > 7 ? '#E24B4A' : '#1D9E75';
        return col < 8 ? '#1D9E75' : '#B5D4F4';
      });
    },
    buildOrganismSvg(genes) {
      const hasMult = genes.includes('multiply');
      const hasGlow = genes.includes('glow');
      const hasEat = genes.includes('eat');
      const mouth = hasEat ? 'M42 54 Q50 60 58 54' : 'M44 54 Q50 57 56 54';
      const glowR = hasGlow ? '30' : '0';
      const bodyCount = hasMult ? [0, 1, 2] : [0];
      const offsets = [[0, 0], [-20, -10], [18, 8]];
      const cells = bodyCount
        .map((i) => {
          const [ox, oy] = offsets[i];
          return `<g transform="translate(${ox},${oy})" opacity="${i > 0 ? 0.5 : 1}">
            <ellipse cx="50" cy="50" rx="28" ry="22" fill="#E1F5EE" stroke="#5DCAA5" stroke-width="1.5"/>
            <circle cx="42" cy="46" r="4" fill="#9FE1CB"/>
            <circle cx="54" cy="46" r="4" fill="#9FE1CB"/>
            <path d="${mouth}" stroke="#085041" stroke-width="1.5" fill="none" stroke-linecap="round"/>
          </g>`;
        })
        .join('');
      return `<svg width="110" height="110" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="${glowR}" fill="#ED93B1" opacity="0.3"/>
        ${cells}
        <text x="50" y="90" text-anchor="middle" font-size="10" fill="#0F6E56" font-weight="600">${genes.length}/3 genes</text>
      </svg>`;
    },
    stats: ['yield', 'health', 'side'],
    outcomes: {
      'detect,eat,stop': {
        verdict: 'win',
        msg: 'Perfect combo! The microbe finds plastic, eats it, then stops before eating anything else. The ocean is getting cleaner!',
        stats: {
          yield:  { label: 'plastic cleaned', display: '92%',  pct: 92, color: '#1D9E75' },
          health: { label: 'microbe health',  display: '88%',  pct: 88, color: '#378ADD' },
          side:   { label: 'side effects',    display: 'none', pct: 5,  color: '#E24B4A' },
        },
      },
      'detect,eat,swim': {
        verdict: 'warn',
        msg: 'Great cleanup, but without a stop signal the microbe ate fishing nets too! Try adding a stop signal instead of swim.',
        stats: {
          yield:  { label: 'plastic cleaned', display: '95%',   pct: 95, color: '#1D9E75' },
          health: { label: 'microbe health',  display: '72%',   pct: 72, color: '#378ADD' },
          side:   { label: 'side effects',    display: 'nets!', pct: 42, color: '#E24B4A' },
        },
      },
      'detect,eat,multiply': {
        verdict: 'fail',
        msg: 'The microbe multiplied so fast it started eating coral reefs! Multiplying without a stop signal is dangerous. Can you fix it?',
        stats: {
          yield:  { label: 'plastic cleaned', display: '99%',    pct: 99, color: '#1D9E75' },
          health: { label: 'microbe health',  display: '40%',    pct: 40, color: '#378ADD' },
          side:   { label: 'side effects',    display: 'coral!', pct: 88, color: '#E24B4A' },
        },
      },
      'eat,stop,swim': {
        verdict: 'warn',
        msg: 'The microbe is safe but it can\'t find the plastic! It needs a "detect plastic" gene to know where to go.',
        stats: {
          yield:  { label: 'plastic cleaned', display: '45%',  pct: 45, color: '#1D9E75' },
          health: { label: 'microbe health',  display: '90%',  pct: 90, color: '#378ADD' },
          side:   { label: 'side effects',    display: 'none', pct: 0,  color: '#E24B4A' },
        },
      },
      'detect,stop,swim': {
        verdict: 'warn',
        msg: 'The microbe found the plastic and swam to it — but it can\'t eat it! It needs a "break down plastic" gene.',
        stats: {
          yield:  { label: 'plastic cleaned', display: '20%',  pct: 20, color: '#1D9E75' },
          health: { label: 'microbe health',  display: '95%',  pct: 95, color: '#378ADD' },
          side:   { label: 'side effects',    display: 'none', pct: 0,  color: '#E24B4A' },
        },
      },
      'detect,eat,glow': {
        verdict: 'warn',
        msg: 'Nice idea with the glow — you\'d be able to see when it\'s full! But without a stop signal it kept eating. What could you add?',
        stats: {
          yield:  { label: 'plastic cleaned', display: '78%',   pct: 78, color: '#1D9E75' },
          health: { label: 'microbe health',  display: '80%',   pct: 80, color: '#378ADD' },
          side:   { label: 'side effects',    display: 'nets!', pct: 35, color: '#E24B4A' },
        },
      },
      'eat,multiply,glow': {
        verdict: 'fail',
        msg: 'Without a detect gene the microbe ate randomly — including ship hulls! Multiplying made it worse. Detection is essential.',
        stats: {
          yield:  { label: 'plastic cleaned', display: '60%',    pct: 60, color: '#1D9E75' },
          health: { label: 'microbe health',  display: '55%',    pct: 55, color: '#378ADD' },
          side:   { label: 'side effects',    display: 'ships!', pct: 70, color: '#E24B4A' },
        },
      },
    },
    defaultOutcome() {
      return {
        verdict: 'warn',
        msg: 'Interesting combo! The microbe tried its best but results were mixed. Try: detect plastic + break down plastic + stop signal.',
        stats: {
          yield:  { label: 'plastic cleaned', display: '30%',  pct: 30, color: '#1D9E75' },
          health: { label: 'microbe health',  display: '60%',  pct: 60, color: '#378ADD' },
          side:   { label: 'side effects',    display: 'mild', pct: 20, color: '#E24B4A' },
        },
      };
    },
  },

  2: {
    id: 2,
    world: 'ocean',
    title: 'Runaway Microbe',
    organismLabel: 'Upgrade your microbe',
    slots: 2,
    growLabel: 'Test it!',
    genes: ['timer', 'counter', 'signal', 'coldtol', 'armor', 'boost'],
    lockedGenes: ['detect', 'eat', 'stop'],
    zoeIntro: 'Great work last time! But your microbes are spreading to places they shouldn\'t be. Add 2 new genes to contain them — but be careful what you pick!',
    zoeWin: 'You did it! You just learned what real scientists call apoptosis — programmed cell death. It\'s one of the most important safety tools in synthetic biology!',
    zoeFail: 'The microbes escaped everywhere! Think about what could make them stop completely.',
    zoeWarn: 'Getting closer! You need TWO different kinds of stopping — one for time, one for quantity.',
    grid: {
      label: 'Ocean map — microbe spread (24 hours)',
      cols: 12,
      rows: 4,
      cellHeight: 18,
      defaultColor: '#B5D4F4',
      legend: [
        { color: '#B5D4F4', label: 'clean ocean' },
        { color: '#1D9E75', label: 'plastic cleaned' },
        { color: '#E24B4A', label: 'microbe escaped' },
      ],
    },
    getCellColors(result) {
      return Array.from({ length: 48 }, (_, i) => {
        const col = i % 12;
        if (result.spread === 'contained') return col < 8 ? '#1D9E75' : '#B5D4F4';
        if (result.spread === 'full') return col < 7 ? '#1D9E75' : '#E24B4A';
        return col < 8 ? '#1D9E75' : col < 10 ? '#E24B4A' : '#B5D4F4';
      });
    },
    buildOrganismSvg(genes) {
      const hasTimer = genes.includes('timer');
      const hasArmor = genes.includes('armor');
      const fill = hasArmor ? '#D3D1C7' : '#E1F5EE';
      const stroke = hasArmor ? '#888780' : '#5DCAA5';
      const clockHand = hasTimer
        ? '<path d="M50 44 L50 50 L54 53" stroke="#854F0B" stroke-width="1.5" stroke-linecap="round" fill="none"/><circle cx="50" cy="50" r="7" fill="none" stroke="#FAC775" stroke-width="1.2"/>'
        : '';
      return `<svg width="110" height="110" viewBox="0 0 100 100">
        <ellipse cx="50" cy="50" rx="32" ry="26" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>
        <circle cx="42" cy="46" r="4" fill="${hasArmor ? '#B4B2A9' : '#9FE1CB'}"/>
        <circle cx="55" cy="46" r="4" fill="${hasArmor ? '#B4B2A9' : '#9FE1CB'}"/>
        ${clockHand}
        <path d="M44 56 Q50 59 56 56" stroke="#085041" stroke-width="1.5" fill="none" stroke-linecap="round"/>
        <text x="50" y="90" text-anchor="middle" font-size="10" fill="#0F6E56" font-weight="600">${genes.length}/2 new genes</text>
      </svg>`;
    },
    stats: ['cleaned', 'contained', 'escaped'],
    outcomes: {
      'counter,timer': {
        verdict: 'win',
        spread: 'contained',
        msg: 'Brilliant! The timer tells the microbe when to shut down, and the meal counter stops it once it\'s eaten enough. The ocean stays clean and the microbes stay where they belong!',
        stats: {
          cleaned:   { label: 'plastic cleaned',    display: '88%', pct: 88, color: '#1D9E75' },
          contained: { label: 'microbes contained', display: '97%', pct: 97, color: '#378ADD' },
          escaped:   { label: 'escaped zones',      display: '2',   pct: 2,  color: '#E24B4A' },
        },
      },
      'signal,timer': {
        verdict: 'warn',
        spread: 'partial',
        msg: 'The friend signal slows them near each other, but doesn\'t stop them completely. Some still wandered off. Try a meal counter instead of the friend signal.',
        stats: {
          cleaned:   { label: 'plastic cleaned',    display: '80%', pct: 80, color: '#1D9E75' },
          contained: { label: 'microbes contained', display: '85%', pct: 85, color: '#378ADD' },
          escaped:   { label: 'escaped zones',      display: '12',  pct: 30, color: '#E24B4A' },
        },
      },
      'boost,timer': {
        verdict: 'warn',
        spread: 'full',
        msg: 'The timer worked, but speed boost made them spread so far in 24 hours the damage was already done! Try swapping boost for a meal counter.',
        stats: {
          cleaned:   { label: 'plastic cleaned',    display: '95%', pct: 95, color: '#1D9E75' },
          contained: { label: 'microbes contained', display: '55%', pct: 55, color: '#378ADD' },
          escaped:   { label: 'escaped zones',      display: '38',  pct: 70, color: '#E24B4A' },
        },
      },
      'armor,timer': {
        verdict: 'warn',
        spread: 'partial',
        msg: 'Tough armor makes it harder for the microbe to break down after the timer goes off! Some survived too long. What could limit how much they eat?',
        stats: {
          cleaned:   { label: 'plastic cleaned',    display: '82%', pct: 82, color: '#1D9E75' },
          contained: { label: 'microbes contained', display: '70%', pct: 70, color: '#378ADD' },
          escaped:   { label: 'escaped zones',      display: '25',  pct: 50, color: '#E24B4A' },
        },
      },
      'coldtol,timer': {
        verdict: 'warn',
        spread: 'partial',
        msg: 'Cold tolerance let the microbes drift into deep cold water where the timer didn\'t stop them! They need a meal counter too.',
        stats: {
          cleaned:   { label: 'plastic cleaned',    display: '84%', pct: 84, color: '#1D9E75' },
          contained: { label: 'microbes contained', display: '72%', pct: 72, color: '#378ADD' },
          escaped:   { label: 'escaped zones',      display: '22',  pct: 44, color: '#E24B4A' },
        },
      },
      'counter,signal': {
        verdict: 'warn',
        spread: 'partial',
        msg: 'The meal counter helps, but without a timer they keep going after eating — just more slowly. Add a 24-hour timer to fully shut them down!',
        stats: {
          cleaned:   { label: 'plastic cleaned',    display: '80%', pct: 80, color: '#1D9E75' },
          contained: { label: 'microbes contained', display: '65%', pct: 65, color: '#378ADD' },
          escaped:   { label: 'escaped zones',      display: '30',  pct: 55, color: '#E24B4A' },
        },
      },
      'boost,counter': {
        verdict: 'fail',
        spread: 'full',
        msg: 'The speed boost let them race across the ocean before the meal counter kicked in! They need a time limit. Try replacing boost with a timer.',
        stats: {
          cleaned:   { label: 'plastic cleaned',    display: '90%', pct: 90, color: '#1D9E75' },
          contained: { label: 'microbes contained', display: '30%', pct: 30, color: '#378ADD' },
          escaped:   { label: 'escaped zones',      display: '60+', pct: 90, color: '#E24B4A' },
        },
      },
    },
    defaultOutcome(genes) {
      const hasTimer = genes.includes('timer');
      const hasCounter = genes.includes('counter');
      if (!hasTimer && !hasCounter) {
        return {
          verdict: 'fail',
          spread: 'full',
          msg: 'Without any timer or counter, the microbes just kept going forever! You need at least a 24-hour timer.',
          stats: {
            cleaned:   { label: 'plastic cleaned',    display: '55%', pct: 55, color: '#1D9E75' },
            contained: { label: 'microbes contained', display: '20%', pct: 20, color: '#378ADD' },
            escaped:   { label: 'escaped zones',      display: '75+', pct: 90, color: '#E24B4A' },
          },
        };
      }
      return {
        verdict: 'warn',
        spread: 'partial',
        msg: 'Interesting combo! The key insight is combining a time limit AND a meal limit. Try a 24-hour timer and a meal counter together.',
        stats: {
          cleaned:   { label: 'plastic cleaned',    display: '60%', pct: 60, color: '#1D9E75' },
          contained: { label: 'microbes contained', display: '50%', pct: 50, color: '#378ADD' },
          escaped:   { label: 'escaped zones',      display: '40',  pct: 60, color: '#E24B4A' },
        },
      };
    },
  },

  3: {
    id: 3,
    world: 'ocean',
    title: 'Deep sea cleanup',
    organismLabel: 'Deep-sea microbe',
    slots: 4,
    growLabel: 'Dive & Test!',
    genes: ['detect', 'eat', 'stop', 'coldtol', 'armor', 'timer', 'counter'],
    lockedGenes: [],
    zoeIntro: 'The ocean floor is cold and high-pressure — your Level 1 microbe dies down there. Add 4 genes to redesign it for the deep sea!',
    zoeWin: 'Multi-gene engineering complete! Real deep-sea organisms use these exact adaptations.',
    zoeFail: 'The microbe couldn\'t survive the pressure and cold. Try cold tolerance and armor together.',
    zoeWarn: 'Surviving but not thriving. You need cold tolerance AND cleanup + stop genes working together.',
    grid: {
      label: 'Deep ocean cleanup zone',
      cols: 12,
      rows: 4,
      cellHeight: 18,
      defaultColor: '#0C447C',
      legend: [
        { color: '#0C447C', label: 'deep water' },
        { color: '#1D9E75', label: 'cleaned' },
        { color: '#B4B2A9', label: 'microbe died' },
      ],
    },
    getCellColors(result) {
      return Array.from({ length: 48 }, () =>
        result.verdict === 'win' ? '#1D9E75' : '#B4B2A9'
      );
    },
    buildOrganismSvg(genes) {
      return `<svg width="110" height="110" viewBox="0 0 100 100">
        <ellipse cx="50" cy="50" rx="32" ry="26" fill="${genes.includes('coldtol') ? '#E6F1FB' : '#E1F5EE'}" stroke="#5DCAA5" stroke-width="1.5"/>
        <circle cx="42" cy="46" r="3.5" fill="#0C447C" opacity="0.5"/>
        <circle cx="58" cy="46" r="3.5" fill="#0C447C" opacity="0.5"/>
        <text x="50" y="90" text-anchor="middle" font-size="10" fill="#085041" font-weight="600">${genes.length}/4 genes</text>
      </svg>`;
    },
    stats: ['yield', 'health', 'side'],
    outcomes: {
      'coldtol,detect,eat,stop': {
        verdict: 'win',
        msg: 'Cold tolerance + detection + breakdown + stop signal. All four working together!',
        stats: {
          yield:  { label: 'plastic cleaned',  display: '80%',  pct: 80, color: '#1D9E75' },
          health: { label: 'microbe survival', display: '85%',  pct: 85, color: '#378ADD' },
          side:   { label: 'side effects',     display: 'none', pct: 5,  color: '#E24B4A' },
        },
      },
      'armor,coldtol,detect,eat': {
        verdict: 'warn',
        msg: 'The microbe survived the freezing pressure with armor and cold tolerance, but without a stop signal it began nibbling deep-sea tube worms! Swap armor for a stop signal.',
        stats: {
          yield:  { label: 'plastic cleaned',  display: '82%',   pct: 82, color: '#1D9E75' },
          health: { label: 'microbe survival', display: '90%',   pct: 90, color: '#378ADD' },
          side:   { label: 'side effects',     display: 'mild!', pct: 40, color: '#E24B4A' },
        },
      },
    },
    defaultOutcome() {
      return {
        verdict: 'warn',
        msg: 'The deep sea requires cold tolerance AND core cleanup + stop controls. Try cold tolerance, detect, eat, and stop.',
        stats: {
          yield:  { label: 'plastic cleaned',  display: '40%',  pct: 40, color: '#1D9E75' },
          health: { label: 'microbe survival', display: '35%',  pct: 35, color: '#378ADD' },
          side:   { label: 'side effects',     display: 'mild', pct: 25, color: '#E24B4A' },
        },
      };
    },
  },

  4: {
    id: 4,
    world: 'farm',
    title: 'The drought',
    organismLabel: 'Your wheat plant',
    slots: 3,
    growLabel: 'Grow!',
    genes: ['store', 'waxy', 'spine', 'deep', 'stomata', 'smooth', 'night'],
    zoeIntro: 'The village is running out of water and the wheat is dying! A cactus survives the desert — can we borrow some of its genes? Pick 3, but watch out: cactus genes can have surprising side effects!',
    zoeWin: 'Amazing! You just did what real agricultural scientists do — borrow genes from wild plants to make crops tougher. That\'s called genetic engineering!',
    zoeFail: 'Oh no — the village is still hungry. Read the hint and try a different combo!',
    zoeWarn: 'Getting warmer! Think carefully about what the bees need to do their job.',
    grid: {
      label: 'Farm field — crop health',
      cols: 16,
      rows: 4,
      cellHeight: 18,
      defaultColor: '#EF9F27',
      legend: [
        { color: '#C0DD97', label: 'healthy' },
        { color: '#EF9F27', label: 'drought stressed' },
        { color: '#E24B4A', label: 'no bees / failed' },
        { color: '#B4B2A9', label: 'wilted / dead' },
      ],
    },
    getCellColors(result) {
      const hasSpine = !!result._spines;
      return Array.from({ length: 64 }, (_, i) => {
        const col = i % 16;
        if (result.verdict === 'win') return '#C0DD97';
        if (result.verdict === 'fail') return '#B4B2A9';
        if (hasSpine) return col < 10 ? '#E24B4A' : '#EF9F27';
        return col < 8 ? '#C0DD97' : '#EF9F27';
      });
    },
    buildOrganismSvg(genes) {
      const hasSpine = genes.includes('spine');
      const hasStore = genes.includes('store');
      const hasDeep = genes.includes('deep');
      const hasSmooth = genes.includes('smooth');
      const hasNight = genes.includes('night');
      const sw = hasSpine ? '2' : '0';
      const headFill = hasNight ? '#CECBF6' : '#C0DD97';
      return `<svg width="110" height="130" viewBox="0 0 110 130">
        <rect x="30" y="100" width="50" height="14" rx="3" fill="#C0DD97"/>
        <rect x="52" y="28" width="6" height="74" rx="3" fill="#97C459"/>
        <path d="M52 70 Q30 55 34 40 Q44 52 52 60Z" fill="#97C459"/>
        <path d="M58 60 Q80 48 78 32 Q68 44 58 52Z" fill="#97C459"/>
        ${hasStore ? '<ellipse cx="55" cy="82" rx="10" ry="8" fill="#B5D4F4" opacity="0.6"/>' : ''}
        <path d="M52 48 L38 42" stroke="#F0997B" stroke-width="${sw}" stroke-linecap="round"/>
        <path d="M58 48 L72 42" stroke="#F0997B" stroke-width="${sw}" stroke-linecap="round"/>
        <path d="M52 60 L36 56" stroke="#F0997B" stroke-width="${sw}" stroke-linecap="round"/>
        <path d="M58 60 L74 56" stroke="#F0997B" stroke-width="${sw}" stroke-linecap="round"/>
        ${hasDeep ? '<path d="M55 114 L55 128" stroke="#97C459" stroke-width="3" stroke-linecap="round"/>' : ''}
        <ellipse cx="55" cy="22" rx="8" ry="14" fill="${headFill}" stroke="#97C459" stroke-width="1"/>
        ${hasSmooth ? '<circle cx="55" cy="10" r="6" fill="#F4C0D1"/>' : ''}
        <text x="55" y="126" text-anchor="middle" font-size="10" fill="#27500A" font-weight="600">${genes.length}/3 genes</text>
      </svg>`;
    },
    stats: ['yield', 'bees', 'side'],
    outcomes: {
      'smooth,spine,store': {
        verdict: 'win',
        _spines: false,
        msg: 'Perfect! The wheat stores water from the cactus, and smooth-flowers stops the spines growing on the flowers — so bees can still land and pollinate. The village has food!',
        stats: {
          yield: { label: 'crop yield',   display: '88%',  pct: 88, color: '#639922' },
          bees:  { label: 'bee visits',   display: '92%',  pct: 92, color: '#EF9F27' },
          side:  { label: 'side effects', display: 'tiny', pct: 8,  color: '#E24B4A' },
        },
      },
      'smooth,stomata,store': {
        verdict: 'win',
        _spines: false,
        msg: 'Excellent! Storing water and closing stomata during the day gives great drought resistance, and smooth flowers keep the bees happy.',
        stats: {
          yield: { label: 'crop yield',   display: '91%',  pct: 91, color: '#639922' },
          bees:  { label: 'bee visits',   display: '90%',  pct: 90, color: '#EF9F27' },
          side:  { label: 'side effects', display: 'none', pct: 5,  color: '#E24B4A' },
        },
      },
      'deep,smooth,store': {
        verdict: 'win',
        _spines: false,
        msg: 'Great thinking! Deep roots find water underground, storing water keeps reserves, and smooth flowers let the bees in. The village is fed!',
        stats: {
          yield: { label: 'crop yield',   display: '85%',  pct: 85, color: '#639922' },
          bees:  { label: 'bee visits',   display: '88%',  pct: 88, color: '#EF9F27' },
          side:  { label: 'side effects', display: 'tiny', pct: 8,  color: '#E24B4A' },
        },
      },
      'night,smooth,store': {
        verdict: 'win',
        _spines: false,
        msg: 'Clever science! Night breathing keeps the plant hydrated, stored water provides reserves, and smooth flowers invite the bees. Real plants like pineapples use this exact strategy — it\'s called CAM photosynthesis!',
        stats: {
          yield: { label: 'crop yield',   display: '90%',  pct: 90, color: '#639922' },
          bees:  { label: 'bee visits',   display: '92%',  pct: 92, color: '#EF9F27' },
          side:  { label: 'side effects', display: 'none', pct: 5,  color: '#E24B4A' },
        },
      },
      'spine,store,waxy': {
        verdict: 'warn',
        _spines: true,
        msg: 'The plant holds water — but spines grew on the flowers too! Bees can\'t land to pollinate, so most crops failed. You need something to keep the flowers smooth.',
        stats: {
          yield: { label: 'crop yield',   display: '72%',     pct: 72, color: '#639922' },
          bees:  { label: 'bee visits',   display: '18%',     pct: 18, color: '#EF9F27' },
          side:  { label: 'side effects', display: 'spines!', pct: 65, color: '#E24B4A' },
        },
      },
      'deep,spine,store': {
        verdict: 'warn',
        _spines: true,
        msg: 'The plant survives the drought — but spines on the flowers are blocking pollinators. What gene could keep the flowers clear?',
        stats: {
          yield: { label: 'crop yield',   display: '65%',     pct: 65, color: '#639922' },
          bees:  { label: 'bee visits',   display: '14%',     pct: 14, color: '#EF9F27' },
          side:  { label: 'side effects', display: 'spines!', pct: 75, color: '#E24B4A' },
        },
      },
      'deep,spine,waxy': {
        verdict: 'fail',
        _spines: true,
        msg: 'The cactus genes took over! The plant is now more cactus than wheat — covered in spines, no bees, waxy coat made the leaves too stiff to grow grain. Try fewer cactus genes, and make sure bees can reach the flowers.',
        stats: {
          yield: { label: 'crop yield',   display: '35%',     pct: 35, color: '#639922' },
          bees:  { label: 'bee visits',   display: '5%',      pct: 5,  color: '#EF9F27' },
          side:  { label: 'side effects', display: 'spines!', pct: 90, color: '#E24B4A' },
        },
      },
      'stomata,store,waxy': {
        verdict: 'warn',
        _spines: false,
        msg: 'Really good! But combining two water-sealing genes made the leaves too closed — the plant couldn\'t breathe well. Try "store water" with just one other drought gene and smooth flowers.',
        stats: {
          yield: { label: 'crop yield',   display: '80%',  pct: 80, color: '#639922' },
          bees:  { label: 'bee visits',   display: '88%',  pct: 88, color: '#EF9F27' },
          side:  { label: 'side effects', display: 'mild', pct: 10, color: '#E24B4A' },
        },
      },
    },
    defaultOutcome(genes) {
      const hasSpine = genes.includes('spine');
      const hasSmooth = genes.includes('smooth');
      const hasWater = ['store', 'deep', 'night', 'stomata', 'waxy'].some((g) => genes.includes(g));
      if (hasSpine && !hasSmooth) {
        return {
          verdict: 'warn',
          _spines: true,
          msg: 'The spines are blocking the bees! Without a smooth-flowers gene, pollinators can\'t reach the wheat. Try replacing "grow spines" or adding "smooth flowers".',
          stats: {
            yield: { label: 'crop yield',   display: '50%',     pct: 50, color: '#639922' },
            bees:  { label: 'bee visits',   display: '20%',     pct: 20, color: '#EF9F27' },
            side:  { label: 'side effects', display: 'spines!', pct: 70, color: '#E24B4A' },
          },
        };
      }
      if (!hasWater) {
        return {
          verdict: 'fail',
          _spines: false,
          msg: 'The bees are happy, but the plant still wilted in the drought! It needs at least one water-saving gene — "store water", "deep roots", "close stomata", or "night breathing".',
          stats: {
            yield: { label: 'crop yield',   display: '22%',  pct: 22, color: '#639922' },
            bees:  { label: 'bee visits',   display: '70%',  pct: 70, color: '#EF9F27' },
            side:  { label: 'side effects', display: 'none', pct: 5,  color: '#E24B4A' },
          },
        };
      }
      return {
        verdict: 'warn',
        _spines: false,
        msg: 'The plant survived but didn\'t thrive. Key combo: one or two drought-survival genes plus something to protect the flowers for the bees.',
        stats: {
          yield: { label: 'crop yield',   display: '60%',  pct: 60, color: '#639922' },
          bees:  { label: 'bee visits',   display: '65%',  pct: 65, color: '#EF9F27' },
          side:  { label: 'side effects', display: 'mild', pct: 30, color: '#E24B4A' },
        },
      };
    },
  },

  5: {
    id: 5,
    world: 'farm',
    title: 'Pollen patrol',
    organismLabel: 'Your drought-resistant wheat',
    slots: 2,
    growLabel: 'Release pollen!',
    genes: ['pollblock', 'smooth', 'fragrance', 'stop', 'timer'],
    lockedGenes: ['store', 'stomata', 'smooth'],
    zoeIntro: 'Your drought-resistant wheat worked great! But bees are carrying the new gene to wild plants nearby. Add 2 genes to keep modified pollen on the farm.',
    zoeWin: 'You just solved one of the hardest problems in GMO science — keeping engineered genes in one place!',
    zoeFail: 'The modified gene spread to wild plants. That could disrupt the whole ecosystem! Try again.',
    zoeWarn: 'Almost! Some pollen still escaped. Think about what stops pollen from traveling.',
    stats: ['yield', 'spread', 'side'],
    outcomes: {
      'pollblock,timer': {
        verdict: 'win',
        msg: 'The pollen blocker stops the gene from being carried, and the timer ensures the blocker itself degrades harmlessly. No spread!',
        stats: {
          yield:  { label: 'crop yield',   display: '84%',  pct: 84, color: '#639922' },
          spread: { label: 'gene spread',  display: '2%',   pct: 2,  color: '#378ADD' },
          side:   { label: 'side effects', display: 'none', pct: 3,  color: '#E24B4A' },
        },
      },
    },
    defaultOutcome() {
      return {
        verdict: 'warn',
        msg: 'Some pollen still escaped. The key is a pollen blocker combined with a timer so the blocker degrades naturally after the season.',
        stats: {
          yield:  { label: 'crop yield',   display: '70%',  pct: 70, color: '#639922' },
          spread: { label: 'gene spread',  display: '30%',  pct: 30, color: '#378ADD' },
          side:   { label: 'side effects', display: 'mild', pct: 25, color: '#E24B4A' },
        },
      };
    },
    grid: {
      label: 'Farm & surrounding wild plants',
      cols: 14,
      rows: 4,
      cellHeight: 18,
      defaultColor: '#C0DD97',
      legend: [
        { color: '#C0DD97', label: 'farm crop' },
        { color: '#EAF3DE', label: 'wild plants (safe)' },
        { color: '#E24B4A', label: 'gene escaped' },
      ],
    },
    getCellColors(result) {
      return Array.from({ length: 56 }, (_, i) => {
        const col = i % 14;
        if (col < 9) return '#C0DD97';
        return result.verdict === 'win' ? '#EAF3DE' : '#E24B4A';
      });
    },
    buildOrganismSvg(genes) {
      return `<svg width="110" height="95" viewBox="0 0 100 90">
        <rect x="10" y="25" width="80" height="50" rx="8" fill="#EAF3DE" stroke="#C0DD97" stroke-width="1.5"/>
        <text x="50" y="53" text-anchor="middle" font-size="11" fill="#27500A" font-weight="600">Wheat plant</text>
        <text x="50" y="69" text-anchor="middle" font-size="10" fill="#3B6D11">${genes.length}/2 new genes</text>
      </svg>`;
    },
  },

  6: {
    id: 6,
    world: 'farm',
    title: 'Nitrogen factory',
    organismLabel: 'Root bacterium',
    slots: 3,
    growLabel: 'Test soil!',
    genes: ['signal', 'stop', 'andgate', 'timer', 'deep'],
    lockedGenes: ['store', 'smooth'],
    zoeIntro: 'Crops need fertilizer but it pollutes rivers. Can you engineer a soil bacterium to make nitrogen naturally — only when it\'s near crop roots?',
    zoeWin: 'Real symbiotic bacteria called rhizobia do exactly this! You just re-created one of nature\'s cleverest partnerships.',
    zoeFail: 'The bacterium made nitrogen in the wrong places, polluting the river. It needs to sense the crop roots first.',
    zoeWarn: 'Getting close! The bacterium needs to detect the roots AND only make nitrogen near them.',
    stats: ['yield', 'pollution', 'efficiency'],
    outcomes: {
      'andgate,signal,stop': {
        verdict: 'win',
        msg: 'The signal gene detects root chemicals, the AND gate ensures both conditions are met, and stop prevents over-production. Symbiosis achieved!',
        stats: {
          yield:      { label: 'crop yield',      display: '88%', pct: 88, color: '#639922' },
          pollution:  { label: 'river pollution', display: '3%',  pct: 3,  color: '#E24B4A' },
          efficiency: { label: 'efficiency',      display: '94%', pct: 94, color: '#1D9E75' },
        },
      },
    },
    defaultOutcome() {
      return {
        verdict: 'warn',
        msg: 'The bacterium is producing nitrogen but not targeting it well. Use a friend/signal gene to detect roots, an AND logic gate to ensure it only acts near crops, and a stop signal.',
        stats: {
          yield:      { label: 'crop yield',      display: '60%', pct: 60, color: '#639922' },
          pollution:  { label: 'river pollution', display: '45%', pct: 45, color: '#E24B4A' },
          efficiency: { label: 'efficiency',      display: '55%', pct: 55, color: '#1D9E75' },
        },
      };
    },
    grid: {
      label: 'Farm soil — nitrogen distribution',
      cols: 14,
      rows: 4,
      cellHeight: 18,
      defaultColor: '#D3D1C7',
      legend: [
        { color: '#EAF3DE', label: 'healthy soil' },
        { color: '#D3D1C7', label: 'dry soil' },
        { color: '#378ADD', label: 'river (watch pollution)' },
      ],
    },
    getCellColors(result) {
      return Array.from({ length: 56 }, (_, i) => {
        const col = i % 14;
        if (col >= 12) return result.verdict === 'win' ? '#378ADD' : '#E24B4A';
        return result.verdict === 'win' ? '#EAF3DE' : '#D3D1C7';
      });
    },
    buildOrganismSvg(genes) {
      return `<svg width="110" height="95" viewBox="0 0 100 90">
        <ellipse cx="50" cy="45" rx="30" ry="22" fill="#EAF3DE" stroke="#C0DD97" stroke-width="1.5"/>
        <text x="50" y="48" text-anchor="middle" font-size="10" fill="#27500A" font-weight="600">${genes.length}/3 genes</text>
      </svg>`;
    },
  },

  7: {
    id: 7,
    world: 'body',
    title: 'The virus',
    organismLabel: 'Your immune cell',
    slots: 3,
    growLabel: 'Deploy!',
    genes: ['recognize', 'attack', 'selftag', 'memory', 'brakes'],
    zoeIntro: 'A new virus is spreading through Celltown! The immune system can\'t recognize it. Design an immune cell that can find and destroy the virus safely.',
    zoeWin: 'You designed a cell that works like real CAR-T cell therapy — one of the most exciting treatments in medicine today!',
    zoeFail: 'The cell attacked healthy tissue! That\'s called an autoimmune reaction. Make sure it can recognize "self" vs "enemy".',
    zoeWarn: 'The cell found the virus but something went wrong. Read the hint carefully.',
    stats: ['viruses', 'health', 'side'],
    outcomes: {
      'attack,recognize,selftag': {
        verdict: 'win',
        msg: 'Perfect — the cell recognizes the virus, attacks it, and leaves healthy cells alone because of the self-recognition tag. Celltown is saved!',
        stats: {
          viruses: { label: 'viruses destroyed',  display: '94%',  pct: 94, color: '#993C1D' },
          health:  { label: 'healthy cells safe', display: '96%',  pct: 96, color: '#1D9E75' },
          side:    { label: 'side effects',       display: 'none', pct: 3,  color: '#E24B4A' },
        },
      },
      'attack,memory,recognize': {
        verdict: 'win',
        msg: 'Great! The memory gene means if this virus ever comes back, the immune system will be ready 10x faster. That\'s how vaccines work!',
        stats: {
          viruses: { label: 'viruses destroyed',  display: '91%',  pct: 91, color: '#993C1D' },
          health:  { label: 'healthy cells safe', display: '88%',  pct: 88, color: '#1D9E75' },
          side:    { label: 'side effects',       display: 'tiny', pct: 8,  color: '#E24B4A' },
        },
      },
    },
    defaultOutcome(genes) {
      const badAttack = genes.includes('attack') && !genes.includes('recognize');
      return {
        verdict: badAttack ? 'fail' : 'warn',
        msg: badAttack
          ? 'The cell attacked randomly — including healthy tissue! Without a recognize gene, it can\'t tell friend from foe.'
          : 'This combo needs some work. The cell needs to recognize the virus AND attack it. Add a self-recognition tag (or memory gene) to protect healthy cells.',
        stats: {
          viruses: { label: 'viruses destroyed',  display: '50%',  pct: 50, color: '#993C1D' },
          health:  { label: 'healthy cells safe', display: '55%',  pct: 55, color: '#1D9E75' },
          side:    { label: 'side effects',       display: 'mild', pct: 40, color: '#E24B4A' },
        },
      };
    },
    grid: {
      label: 'Celltown — infection spread',
      cols: 12,
      rows: 4,
      cellHeight: 18,
      defaultColor: '#F5C4B3',
      legend: [
        { color: '#F5C4B3', label: 'infected cells' },
        { color: '#E1F5EE', label: 'healthy cells' },
        { color: '#E24B4A', label: 'autoimmune damage' },
      ],
    },
    getCellColors(result) {
      return Array.from({ length: 48 }, () =>
        result.verdict === 'win'
          ? '#E1F5EE'
          : result.verdict === 'fail'
          ? '#E24B4A'
          : '#9FE1CB'
      );
    },
    buildOrganismSvg(genes) {
      return `<svg width="110" height="110" viewBox="0 0 100 100">
        <ellipse cx="50" cy="50" rx="36" ry="30" fill="#FAECE7" stroke="#F5C4B3" stroke-width="1.5"/>
        <circle cx="50" cy="48" r="10" fill="#F0997B"/>
        <text x="50" y="90" text-anchor="middle" font-size="10" fill="#712B13" font-weight="600">${genes.length}/3 genes</text>
      </svg>`;
    },
  },

  8: {
    id: 8,
    world: 'body',
    title: 'Overzealous defender',
    organismLabel: 'Your upgraded immune cell',
    slots: 2,
    growLabel: 'Deploy!',
    genes: ['selftag', 'brakes', 'memory', 'stop', 'signal'],
    lockedGenes: ['recognize', 'attack'],
    zoeIntro: 'Your immune cell is too powerful — it\'s attacking healthy tissue too! Add 2 genes to make it safer without losing its power.',
    zoeWin: 'You just learned about autoimmunity and how the body uses multiple checkpoints to protect itself!',
    zoeFail: 'The cell is still attacking healthy tissue. Real autoimmune diseases work exactly this way. Safety brakes and self-recognition together are the answer.',
    zoeWarn: 'Better, but not fully safe yet. The cell still occasionally attacks the wrong target.',
    stats: ['viruses', 'healthy', 'autoimmune'],
    outcomes: {
      'brakes,selftag': {
        verdict: 'win',
        msg: 'Two safety systems working together — self-recognition tells the cell what NOT to attack, and safety brakes stop it mid-action if it starts to go wrong.',
        stats: {
          viruses:    { label: 'viruses stopped',   display: '89%', pct: 89, color: '#993C1D' },
          healthy:    { label: 'healthy protected', display: '97%', pct: 97, color: '#1D9E75' },
          autoimmune: { label: 'autoimmune risk',   display: '3%',  pct: 3,  color: '#E24B4A' },
        },
      },
    },
    defaultOutcome() {
      return {
        verdict: 'warn',
        msg: 'The cell is safer but still occasionally misidentifies healthy cells. Try combining self-recognition with safety brakes for full protection.',
        stats: {
          viruses:    { label: 'viruses stopped',   display: '80%', pct: 80, color: '#993C1D' },
          healthy:    { label: 'healthy protected', display: '75%', pct: 75, color: '#1D9E75' },
          autoimmune: { label: 'autoimmune risk',   display: '25%', pct: 25, color: '#E24B4A' },
        },
      };
    },
    grid: {
      label: 'Body scan — cell damage',
      cols: 12,
      rows: 4,
      cellHeight: 18,
      defaultColor: '#F5C4B3',
      legend: [
        { color: '#E1F5EE', label: 'healthy' },
        { color: '#F5C4B3', label: 'virus cells' },
        { color: '#E24B4A', label: 'autoimmune damage' },
      ],
    },
    getCellColors(result) {
      return Array.from({ length: 48 }, () =>
        result.verdict === 'win' ? '#E1F5EE' : '#E24B4A'
      );
    },
    buildOrganismSvg(genes) {
      return `<svg width="110" height="110" viewBox="0 0 100 100">
        <ellipse cx="50" cy="50" rx="36" ry="30" fill="#FAECE7" stroke="#F5C4B3" stroke-width="1.5"/>
        <circle cx="50" cy="48" r="10" fill="#D85A30"/>
        <text x="50" y="90" text-anchor="middle" font-size="10" fill="#712B13" font-weight="600">${genes.length}/2 new genes</text>
      </svg>`;
    },
  },

  9: {
    id: 9,
    world: 'body',
    title: 'Tiny surgeons',
    organismLabel: 'Precision carrier cell',
    slots: 3,
    growLabel: 'Deliver!',
    genes: ['address', 'payload', 'dissolve', 'selftag', 'brakes'],
    lockedGenes: ['recognize'],
    zoeIntro: 'A patient has a tumor. Design a cell that finds it, delivers medicine, then disappears safely!',
    zoeWin: 'You just designed a drug delivery system like real nanoparticle medicine!',
    zoeFail: 'The medicine was delivered to the wrong place! The address gene is essential.',
    zoeWarn: 'Almost! Make sure the cell can find the tumor, deliver the medicine, then dissolve.',
    stats: ['accuracy', 'delivery', 'side'],
    outcomes: {
      'address,dissolve,payload': {
        verdict: 'win',
        msg: 'Address finds the tumor, payload delivers medicine, dissolve removes the cell safely. Precision medicine!',
        stats: {
          accuracy: { label: 'targeting accuracy', display: '96%',  pct: 96, color: '#993C1D' },
          delivery: { label: 'medicine delivered', display: '91%',  pct: 91, color: '#1D9E75' },
          side:     { label: 'side effects',       display: 'none', pct: 3,  color: '#E24B4A' },
        },
      },
    },
    defaultOutcome() {
      return {
        verdict: 'warn',
        msg: 'The cell needs three things: an address protein to find the tumor, a medicine payload to deliver treatment, and a self-dissolve gene to clean up after.',
        stats: {
          accuracy: { label: 'targeting accuracy', display: '50%',  pct: 50, color: '#993C1D' },
          delivery: { label: 'medicine delivered', display: '45%',  pct: 45, color: '#1D9E75' },
          side:     { label: 'side effects',       display: 'mild', pct: 35, color: '#E24B4A' },
        },
      };
    },
    grid: {
      label: 'Body scan — tumor targeting',
      cols: 12,
      rows: 4,
      cellHeight: 18,
      defaultColor: '#FAECE7',
      legend: [
        { color: '#FAECE7', label: 'body tissue' },
        { color: '#1D9E75', label: 'tumor treated' },
        { color: '#E24B4A', label: 'wrong tissue hit' },
      ],
    },
    getCellColors(result) {
      return Array.from({ length: 48 }, () =>
        result.verdict === 'win' ? '#E1F5EE' : '#E24B4A'
      );
    },
    buildOrganismSvg(genes) {
      return `<svg width="110" height="110" viewBox="0 0 100 100">
        <ellipse cx="50" cy="50" rx="36" ry="30" fill="#FAECE7" stroke="#F5C4B3" stroke-width="1.5"/>
        <text x="50" y="54" text-anchor="middle" font-size="10" fill="#712B13" font-weight="600">${genes.length}/3 genes</text>
      </svg>`;
    },
  },

  10: {
    id: 10,
    world: 'city',
    title: 'Glowing trees',
    organismLabel: 'Your city tree',
    slots: 3,
    growLabel: 'Plant it!',
    genes: ['lucifer', 'darksense', 'release', 'deep', 'stop'],
    zoeIntro: 'BioCity\'s power grid is failing! Can you engineer a tree whose leaves glow at night? Pick 3 genes — but the glow needs to last all night, not just 2 hours!',
    zoeWin: 'Bioluminescence is real — scientists have already made glowing plants! The luciferase gene comes from fireflies.',
    zoeFail: 'The tree glows, but caused unexpected problems for the city. Think about when and how it should glow.',
    zoeWarn: 'The tree glows but not all night. It needs a timed release to keep the chemical reaction going.',
    stats: ['brightness', 'duration', 'side'],
    outcomes: {
      'darksense,lucifer,release': {
        verdict: 'win',
        msg: 'The darkness sensor turns the glow on at sunset, luciferase produces the light, and timed release keeps the chemicals flowing all night. The streets are lit!',
        stats: {
          brightness: { label: 'brightness',      display: '88%',  pct: 88, color: '#BA7517' },
          duration:   { label: 'lasts all night', display: '94%',  pct: 94, color: '#EF9F27' },
          side:       { label: 'side effects',    display: 'none', pct: 4,  color: '#E24B4A' },
        },
      },
    },
    defaultOutcome() {
      return {
        verdict: 'warn',
        msg: 'The tree glows but not reliably all night. You need: luciferase to produce the glow, a darkness sensor to turn it on, and a timed release to keep it going.',
        stats: {
          brightness: { label: 'brightness',      display: '60%',  pct: 60, color: '#BA7517' },
          duration:   { label: 'lasts all night', display: '40%',  pct: 40, color: '#EF9F27' },
          side:       { label: 'side effects',    display: 'mild', pct: 20, color: '#E24B4A' },
        },
      };
    },
    grid: {
      label: 'City block — light coverage at night',
      cols: 14,
      rows: 3,
      cellHeight: 20,
      defaultColor: '#2C2C2A',
      legend: [
        { color: '#FAC775', label: 'lit street' },
        { color: '#2C2C2A', label: 'dark street' },
      ],
    },
    getCellColors(result) {
      return Array.from({ length: 42 }, (_, i) =>
        result.verdict === 'win' ? '#FAC775' : i % 3 === 0 ? '#FAC775' : '#2C2C2A'
      );
    },
    buildOrganismSvg(genes) {
      return `<svg width="110" height="115" viewBox="0 0 100 110">
        <rect x="44" y="70" width="12" height="35" rx="4" fill="#97C459"/>
        <ellipse cx="50" cy="52" rx="28" ry="32" fill="${genes.includes('lucifer') ? '#FAC775' : '#EAF3DE'}" stroke="#C0DD97" stroke-width="1.5"/>
        <text x="50" y="56" text-anchor="middle" font-size="10" fill="#27500A" font-weight="600">${genes.length}/3 genes</text>
      </svg>`;
    },
  },

  11: {
    id: 11,
    world: 'city',
    title: 'Brighter city',
    organismLabel: 'Your logic-gated tree',
    slots: 2,
    growLabel: 'Wire it up!',
    genes: ['darksense', 'healthsense', 'andgate', 'stop', 'release'],
    lockedGenes: ['lucifer', 'release'],
    zoeIntro: 'The trees glow — but they glow even when sick, which wastes energy and spreads disease. Can you wire two sensors together so the tree only glows when it\'s dark AND healthy?',
    zoeWin: 'You just built a biological AND gate — a logic circuit made from genes! Real scientists call this a genetic toggle switch.',
    zoeFail: 'The tree glowed at the wrong times. An AND gate needs BOTH conditions true before the output fires.',
    zoeWarn: 'Getting closer! The AND logic gate needs both the health sensor and logic wiring.',
    stats: ['efficiency', 'coverage', 'side'],
    outcomes: {
      'andgate,healthsense': {
        verdict: 'win',
        msg: 'The AND gate wires the darkness sensor AND health sensor together — the tree only glows when both are true. A real biological logic circuit!',
        stats: {
          efficiency: { label: 'energy efficiency', display: '95%',  pct: 95, color: '#BA7517' },
          coverage:   { label: 'street coverage',   display: '90%',  pct: 90, color: '#EF9F27' },
          side:       { label: 'side effects',      display: 'none', pct: 2,  color: '#E24B4A' },
        },
      },
      'andgate,darksense': {
        verdict: 'warn',
        msg: 'Close! The tree senses darkness, but without the health sensor it still glows when sick. Add the health sensor alongside the AND logic gate.',
        stats: {
          efficiency: { label: 'energy efficiency', display: '65%',  pct: 65, color: '#BA7517' },
          coverage:   { label: 'street coverage',   display: '75%',  pct: 75, color: '#EF9F27' },
          side:       { label: 'side effects',      display: 'mild', pct: 25, color: '#E24B4A' },
        },
      },
    },
    defaultOutcome() {
      return {
        verdict: 'warn',
        msg: 'The logic isn\'t quite right. Wire a health sensor into an AND logic gate so the tree checks both health and darkness before glowing.',
        stats: {
          efficiency: { label: 'energy efficiency', display: '55%',  pct: 55, color: '#BA7517' },
          coverage:   { label: 'street coverage',   display: '70%',  pct: 70, color: '#EF9F27' },
          side:       { label: 'side effects',      display: 'mild', pct: 30, color: '#E24B4A' },
        },
      };
    },
    grid: {
      label: 'City block — smart lighting',
      cols: 14,
      rows: 3,
      cellHeight: 20,
      defaultColor: '#2C2C2A',
      legend: [
        { color: '#FAC775', label: 'smart-lit street' },
        { color: '#EF9F27', label: 'dim / inconsistent' },
        { color: '#2C2C2A', label: 'dark' },
      ],
    },
    getCellColors(result) {
      return Array.from({ length: 42 }, () =>
        result.verdict === 'win' ? '#FAC775' : '#EF9F27'
      );
    },
    buildOrganismSvg(genes) {
      return `<svg width="110" height="115" viewBox="0 0 100 110">
        <rect x="44" y="70" width="12" height="35" rx="4" fill="#97C459"/>
        <ellipse cx="50" cy="52" rx="28" ry="32" fill="${genes.includes('andgate') ? '#FAC775' : '#EAF3DE'}" stroke="#C0DD97" stroke-width="1.5"/>
        <text x="50" y="54" text-anchor="middle" font-size="9" fill="#633806" font-weight="600">${genes.includes('andgate') ? 'AND gate' : ''}</text>
        <text x="50" y="98" text-anchor="middle" font-size="10" fill="#633806" font-weight="600">${genes.length}/2 new genes</text>
      </svg>`;
    },
  },

  12: {
    id: 12,
    world: 'city',
    title: 'Final mission — design your own',
    organismLabel: 'Custom organism',
    slots: 4,
    growLabel: 'Submit to Ethics Review!',
    genes: [
      'detect', 'eat', 'stop', 'lucifer',
      'recognize', 'address', 'payload', 'dissolve',
      'andgate', 'timer', 'counter', 'signal',
    ],
    lockedGenes: [],
    zoeIntro: 'You\'ve learned so much! Now it\'s your turn to choose a problem and design your own solution. Pick any 4 genes — your peer ethics committee will review your design!',
    zoeWin: 'Congratulations, scientist! You completed BioBuilder Academy. Your design has been sent to the ethics committee and approved!',
    zoeFail: 'The design had unintended consequences. Think about what stop conditions and containment you need.',
    zoeWarn: 'Interesting design! The ethics committee has some questions. Think about what could go wrong without a safety switch.',
    stats: ['impact', 'safety', 'ethics'],
    outcomes: {},
    defaultOutcome(genes) {
      const hasSafety =
        genes.includes('stop') ||
        genes.includes('timer') ||
        genes.includes('counter') ||
        genes.includes('dissolve');
      return {
        verdict: hasSafety ? 'win' : 'warn',
        msg: hasSafety
          ? 'Your design includes a biological safety / containment mechanism — the ethics committee approves! Well done, you graduated BioBuilder Academy.'
          : 'Your design is creative, but the ethics committee notes it has no off-switch or containment (stop signal, timer, counter, or dissolve). Real scientists always build safety systems!',
        stats: {
          impact: {
            label: 'real-world impact',
            display: genes.length >= 3 ? 'high' : 'medium',
            pct: Math.min(100, genes.length * 23),
            color: '#1D9E75',
          },
          safety: {
            label: 'safety rating',
            display: hasSafety ? 'safe' : 'risky',
            pct: hasSafety ? 92 : 30,
            color: '#378ADD',
          },
          ethics: {
            label: 'ethics review',
            display: hasSafety ? 'pass' : 'review',
            pct: hasSafety ? 90 : 40,
            color: '#BA7517',
          },
        },
      };
    },
    grid: {
      label: 'World map — problem zones',
      cols: 14,
      rows: 4,
      cellHeight: 18,
      defaultColor: '#B5D4F4',
      legend: [
        { color: '#1D9E75', label: 'problem solved' },
        { color: '#B5D4F4', label: 'still affected' },
        { color: '#EF9F27', label: 'needs review' },
      ],
    },
    getCellColors(result) {
      return Array.from({ length: 56 }, () =>
        result.verdict === 'win' ? '#1D9E75' : '#EF9F27'
      );
    },
    buildOrganismSvg(genes) {
      return `<svg width="110" height="110" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="35" fill="#EEEDFE" stroke="#CECBF6" stroke-width="1.5"/>
        <text x="50" y="46" text-anchor="middle" font-size="10" fill="#3C3489" font-weight="600">my organism</text>
        <text x="50" y="62" text-anchor="middle" font-size="10" fill="#534AB7">${genes.length}/4 genes</text>
      </svg>`;
    },
  },
};
