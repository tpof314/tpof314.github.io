/* ============================================================
   Sky Striker — Central Config & Tuning
   ------------------------------------------------------------
   Every "magic number" lives here so gameplay can be tuned
   without hunting through scene code. Values marked (tunable)
   are placeholders we agreed to feel-tune once it's playable.
   ============================================================ */

const CONFIG = {
  // Build stamp — shown on the title screen and logged at boot so you can
  // confirm which build is actually running (helps catch stale caches).
  version: '1.3.0',

  // --- SFX (synthesized via Web Audio; no audio files needed) ---
  sfx: {
    masterVolume: 0.45,
    shootThrottleMs: 85,    // rapid auto-fire: don't play every single shot
    bossHitThrottleMs: 70,  // boss takes many hits/sec: throttle the tick
  },

  // --- Design resolution (portrait, ~9:16). Scaled to fit any screen. ---
  WIDTH: 450,
  HEIGHT: 800,

  // Letterbox / page background behind the play field
  BACKDROP: '#0b1021',

  // --- Player ---
  player: {
    startHealth: 100,
    maxHealth: 100,
    // How quickly the jet eases toward the pointer (0..1; higher = snappier)
    followLerp: 0.22,
    // On touch devices, lift the jet this many px ABOVE the finger so the
    // finger doesn't cover the ship. Ignored for mouse input.
    touchOffsetY: 90,
    // Invulnerability window after taking a hit (ms)
    invulnMs: 1200,
    // Vertical resting zone: player lives in the lower part of the screen
    startYFactor: 0.82,
  },

  // --- Weapon: single 5-level track with time-based decay ---
  weapon: {
    maxLevel: 5,
    startLevel: 1,
    bulletSpeed: 620,
    // Fire interval (ms) per level — index 0 unused, levels 1..5
    fireIntervalByLevel: [0, 230, 200, 175, 150, 120],
    // Damage per bullet per level
    damageByLevel: [0, 1, 1, 1, 1.5, 2],
    // (tunable) seconds without a weapon pickup before level drops by 1
    decaySeconds: 25,
  },

  // --- Bullets ---
  bullet: {
    poolSize: 128,     // object-pool cap (perf: no per-shot allocation)
  },

  // --- Background parallax star layers (depth, speed, count, size, alpha) ---
  starLayers: [
    { speed: 40,  count: 40, size: 1, alpha: 0.22 },
    { speed: 90,  count: 30, size: 2, alpha: 0.35 },
    { speed: 160, count: 18, size: 3, alpha: 0.5 },
  ],

  // --- Stages (structure only for now; waves/bosses filled in next phase) ---
  totalStages: 5,

  // --- Enemy archetypes (base stats; scaled per stage by stageScaling) ---
  enemies: {
    // Grunt: straight-line dive, occasional straight-down shot
    grunt:  { health: 2,  speed: 150, score: 100, size: 34,
              fireIntervalMs: 1800, bulletSpeed: 260, contactDamage: 12 },
    // Weaver: sine-wave descent, hard to hit, does not fire
    weaver: { health: 3,  speed: 130, score: 150, size: 32,
              fireIntervalMs: 0,    bulletSpeed: 0,   contactDamage: 12,
              waveAmplitude: 90, waveFreq: 2.4 },
    // Gunner: slow, fires AIMED shots, drops power-ups on death
    gunner: { health: 6,  speed: 70,  score: 300, size: 40,
              fireIntervalMs: 1400, bulletSpeed: 240, contactDamage: 16,
              dropsPowerup: true },
  },

  enemyBullet: {
    poolSize: 200,             // larger pool for bullet-heavy boss patterns
    damage: 10,
  },

  // --- Power-ups (dropped by Gunner-type enemies) ---
  powerup: {
    fallSpeed: 110,
    lifespanMs: 9000,           // despawns if not collected
    // Weighted drop chance when a Gunner dies
    weights: { weapon: 0.5, shield: 0.25, score: 0.25 },
    scoreValue: 250,
    shieldHits: 2,              // hits absorbed per shield pickup
  },

  // Player shield (populated by shield power-ups)
  shield: { maxHits: 4 },

  // --- Per-stage difficulty scaling (index by stage 1..5) ---
  // Multipliers applied to enemy health/speed + wave density.
  stageScaling: [
    null, // index 0 unused
    { hp: 1.0, speed: 1.0,  density: 1.0 },
    { hp: 1.2, speed: 1.1,  density: 1.2 },
    { hp: 1.5, speed: 1.2,  density: 1.4 },
    { hp: 1.9, speed: 1.35, density: 1.6 },
    { hp: 2.4, speed: 1.5,  density: 1.9 },
  ],

  // Per-stage enemy tint (re-skin the shared shapes each stage)
  stageTints: [
    null,
    { grunt: 0xff5b5b, weaver: 0xc06cff, gunner: 0xffa23e },
    { grunt: 0xff8a3d, weaver: 0x8f7bff, gunner: 0xffd23e },
    { grunt: 0xff4db8, weaver: 0x6cc0ff, gunner: 0xff7b3e },
    { grunt: 0x9b6cff, weaver: 0x4de1c4, gunner: 0xff5b8a },
    { grunt: 0xff3b3b, weaver: 0xb04dff, gunner: 0xff9500 },
  ],

  /* ---- Bosses (one per stage) --------------------------------
     Each boss has 3 phases entered at 100% / 66% / 33% health.
     A phase is a list of attack "steps"; each step fires its
     pattern on its own `every` (ms) cadence, so slow heavy
     attacks layer over fast light ones.
     Attack fns: spread | aimed | radial | spiral | rain
  ------------------------------------------------------------- */
  bosses: {
    1: {
      name: 'AEGIS INTERCEPTOR', tex: 'boss1', tint: 0xff6b6b,
      healthBase: 130, contactDamage: 18, score: 3000,
      movement: 'sweep', moveSpeed: 90, hoverY: 130,
      phases: [
        { steps: [ { fn: 'spread', count: 5, arc: 40, speed: 200, every: 1300 },
                   { fn: 'aimed',  count: 1, arc: 0,  speed: 220, every: 1700 } ] },
        { steps: [ { fn: 'spread', count: 7, arc: 55, speed: 220, every: 1100 },
                   { fn: 'aimed',  count: 3, arc: 18, speed: 220, every: 1400 } ] },
        { steps: [ { fn: 'spread', count: 7, arc: 70, speed: 240, every: 950 },
                   { fn: 'aimed',  count: 3, arc: 22, speed: 240, every: 1100 },
                   { fn: 'radial', count: 12, speed: 180, every: 2600 } ] },
      ],
    },
    2: {
      name: 'IRON DESTROYER', tex: 'boss2', tint: 0xffa23e,
      healthBase: 180, contactDamage: 20, score: 4000,
      movement: 'sweep', moveSpeed: 105, hoverY: 130,
      phases: [
        { steps: [ { fn: 'aimed',  count: 3, arc: 18, speed: 220, every: 1300 },
                   { fn: 'radial', count: 12, speed: 180, every: 2400 } ] },
        { steps: [ { fn: 'spread', count: 9, arc: 80, speed: 220, every: 1100 },
                   { fn: 'radial', count: 16, speed: 190, every: 2100 } ] },
        { steps: [ { fn: 'radial', count: 18, speed: 200, every: 1500 },
                   { fn: 'aimed',  count: 5, arc: 30, speed: 240, every: 1200 } ] },
      ],
    },
    3: {
      name: 'VORTEX WARSHIP', tex: 'boss3', tint: 0x6cc0ff,
      healthBase: 235, contactDamage: 20, score: 5000,
      movement: 'hover', moveSpeed: 0, hoverY: 125,
      phases: [
        { steps: [ { fn: 'spiral', arms: 3, speed: 180, rot: 9,  every: 130 },
                   { fn: 'aimed',  count: 2, arc: 16, speed: 220, every: 1500 } ] },
        { steps: [ { fn: 'spiral', arms: 4, speed: 190, rot: 12, every: 120 },
                   { fn: 'radial', count: 14, speed: 190, every: 2200 } ] },
        { steps: [ { fn: 'spiral', arms: 5, speed: 200, rot: 15, every: 115 },
                   { fn: 'aimed',  count: 4, arc: 26, speed: 240, every: 1200 } ] },
      ],
    },
    4: {
      name: 'BASTION FORTRESS', tex: 'boss4', tint: 0xc06cff,
      healthBase: 300, contactDamage: 22, score: 6000,
      movement: 'sweep', moveSpeed: 120, hoverY: 128,
      phases: [
        { steps: [ { fn: 'rain',  count: 6,  speed: 210, every: 900 },
                   { fn: 'aimed', count: 3,  arc: 20, speed: 220, every: 1500 } ] },
        { steps: [ { fn: 'rain',  count: 8,  speed: 220, every: 800 },
                   { fn: 'radial', count: 16, speed: 190, every: 2200 } ] },
        { steps: [ { fn: 'rain',  count: 10, speed: 240, every: 700 },
                   { fn: 'aimed', count: 5,  arc: 30, speed: 240, every: 1100 },
                   { fn: 'radial', count: 18, speed: 200, every: 2000 } ] },
      ],
    },
    5: {
      name: 'OMEGA MOTHERSHIP', tex: 'boss5', tint: 0xff3b3b,
      healthBase: 390, contactDamage: 24, score: 10000,
      movement: 'figure8', moveSpeed: 0, hoverY: 130,
      phases: [
        { steps: [ { fn: 'spiral', arms: 4, speed: 190, rot: 11, every: 125 },
                   { fn: 'aimed',  count: 3, arc: 20, speed: 230, every: 1300 } ] },
        { steps: [ { fn: 'spiral', arms: 5, speed: 200, rot: 13, every: 120 },
                   { fn: 'rain',   count: 8, speed: 230, every: 850 },
                   { fn: 'radial', count: 16, speed: 200, every: 2000 } ] },
        { steps: [ { fn: 'spiral', arms: 5, speed: 215, rot: 16, every: 120 },
                   { fn: 'rain',   count: 9, speed: 250, every: 750 },
                   { fn: 'aimed',  count: 5, arc: 30, speed: 250, every: 1050 },
                   { fn: 'radial', count: 18, speed: 210, every: 1800 } ] },
      ],
    },
  },

  // --- Storage keys ---
  storage: {
    highScore: 'skystriker_highscore',
    muted: 'skystriker_muted',
  },

  // --- Palette (flat vector / cartoon) ---
  colors: {
    player:     0x35d0ff,
    playerDark: 0x1a86c9,
    thrust:     0x66ccff,
    bullet:     0xffe14d,
    enemyBullet:0xff7a4d,
    star:       0x9fb3d1,
    powerup:    0x9b5cff,
    pwWeapon:   0xffe14d,
    pwShield:   0x35d0ff,
    pwScore:    0x38e08a,
    shield:     0x35d0ff,
    hpGood:     0x38e08a,
    hpMid:      0xf4c430,
    hpLow:      0xff5b5b,
    uiText:     '#eaf2ff',
    uiAccent:   '#35d0ff',
  },
};
