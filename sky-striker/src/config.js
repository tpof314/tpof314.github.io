/* ============================================================
   Sky Striker — Central Config & Tuning
   ------------------------------------------------------------
   Every "magic number" lives here so gameplay can be tuned
   without hunting through scene code. Values marked (tunable)
   are placeholders we agreed to feel-tune once it's playable.
   ============================================================ */

const CONFIG = {
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
    poolSize: 96,
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
